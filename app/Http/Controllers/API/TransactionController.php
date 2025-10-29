<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Midtrans\Notification;
use Midtrans\Config;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['items'])->where('user_id', Auth::id())->latest()->get();
        return response()->json($transactions);
    }

    public function show($id)
    {
        $transaction = Transaction::with(['items'])->where('user_id', Auth::id())->findOrFail($id);
        return response()->json($transaction);
    }

    public function store(Request $request, MidtransService $midtrans)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_variant_id' => 'required|integer|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        DB::beginTransaction();
        try {
            $itemsData = [];

            // ambil semua variant sekaligus biar lebih efisien
            $variantIds = collect($request->items)->pluck('product_variant_id');
            $variants = \App\Models\ProductVariant::with('product')
                ->whereIn('id', $variantIds)
                ->get()
                ->keyBy('id');

            $total = 0;

            foreach ($request->items as $item) {
                $variant = $variants[$item['product_variant_id']] ?? null;

                if (!$variant) {
                    throw new \Exception("Product variant not found: ID {$item['product_variant_id']}");
                }

                $subtotal = $variant->price * $item['quantity'];
                $total += $subtotal;

                $itemsData[] = [
                    'variant' => $variant,
                    'quantity' => $item['quantity'],
                    'subtotal' => $subtotal,
                ];
            }

            // buat transaksi
            $transaction = \App\Models\Transaction::create([
                'user_id' => $user->id,
                'invoice_number' => 'INV-' . strtoupper(Str::random(10)),
                'total_amount' => $total,
                'status' => 'pending',
                'payment_status' => 'waiting',
                'midtrans_order_id' => 'ORDER-' . strtoupper(Str::random(10)),
            ]);

            // buat transaction items
            foreach ($itemsData as $item) {
                $variant = $item['variant'];
                $product = $variant->product;

                \App\Models\TransactionItem::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $product->id ?? null,
                    'product_variant_id' => $variant->id,
                    'product_name' => $product->name,
                    'variant_name' => $variant->name ?? null,
                    'sku' => $variant->sku ?? null,
                    'price' => $variant->price,
                    'quantity' => $item['quantity'],
                    'subtotal' => $item['subtotal'],
                    'product_snapshot' => json_encode([
                        'product' => $product->only(['id', 'name', 'description']),
                        'variant' => $variant->only(['id', 'name', 'sku', 'price']),
                    ]),
                ]);
            }

            // buat payload untuk Midtrans
            $payload = [
                'transaction_details' => [
                    'order_id' => $transaction->midtrans_order_id,
                    'gross_amount' => $total,
                ],
                'customer_details' => [
                    'first_name' => $user->name,
                    'email' => $user->email,
                ],
                'item_details' => collect($itemsData)->map(function ($item) {
                    return [
                        'id' => $item['variant']->id,
                        'price' => $item['variant']->price,
                        'quantity' => $item['quantity'],
                        'name' => $item['variant']->product->name . ' - ' . ($item['variant']->name ?? ''),
                    ];
                })->toArray(),
            ];

            $snap = $midtrans->createTransaction($payload);

            $transaction->update([
                'midtrans_snap_token' => $snap->token,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Transaction created successfully.',
                'transaction' => $transaction->load('items'),
                'snap_token' => $snap->token,
                'redirect_url' => $snap->redirect_url,
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create transaction',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function callback(Request $request)
    {
        // Set config Midtrans
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production', false);
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // Dapatkan notifikasi dari Midtrans
        $notif = new Notification();

        $orderId = $notif->order_id;
        $transactionStatus = $notif->transaction_status;
        $paymentType = $notif->payment_type;
        $fraudStatus = $notif->fraud_status;
        $signatureKey = $notif->signature_key ?? null;

        // Log untuk debugging (boleh dihapus nanti)
        Log::info('Midtrans callback received:', [
            'order_id' => $orderId,
            'transaction_status' => $transactionStatus,
            'payment_type' => $paymentType,
            'fraud_status' => $fraudStatus,
        ]);

        // Cari transaksi di DB
        $transaction = Transaction::where('midtrans_order_id', $orderId)->first();

        if (!$transaction) {
            Log::warning("Transaction not found for order_id: $orderId");
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $transaction->payment_method = $notif->issuer ?? null;
        $transaction->payment_type = $notif->payment_type ?? null;
        $transaction->paid_at = $notif->transaction_time ?? now();
        $transaction->midtrans_transaction_id = $notif->transaction_id ?? null;
        $transaction->midtrans_payload = $request->all();

        switch ($transactionStatus) {
            case 'capture':
                if ($paymentType == 'credit_card') {
                    if ($fraudStatus == 'challenge') {
                        $transaction->update([
                            'payment_status' => 'challenge',
                            'status' => 'pending',
                        ]);
                    } else {
                        $transaction->update([
                            'payment_status' => 'paid',
                            'status' => 'completed',
                        ]);
                    }
                }
                break;

            case 'settlement':
                $transaction->update([
                    'payment_status' => 'paid',
                    'status' => 'paid',
                ]);
                break;

            case 'pending':
                $transaction->update([
                    'payment_status' => 'waiting',
                    'status' => 'pending',
                ]);
                break;

            case 'deny':
                $transaction->update([
                    'payment_status' => 'failed',
                    'status' => 'canceled',
                ]);
                break;

            case 'expire':
                $transaction->update([
                    'payment_status' => 'expired',
                    'status' => 'canceled',
                ]);
                break;

            case 'cancel':
                $transaction->update([
                    'payment_status' => 'failed',
                    'status' => 'canceled',
                ]);
                break;

            case 'refund':
                $transaction->update([
                    'payment_status' => 'refunded',
                    'status' => 'canceled',
                ]);
                break;
        }


        return response()->json([
            'message' => 'Callback received successfully',
            'transaction_status' => $transactionStatus,
            'payment_type' => $paymentType,
            'fraud_status' => $fraudStatus,
        ]);
    }

}
