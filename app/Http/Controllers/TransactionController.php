<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function pending()
    {
        try {
            $transactions = Transaction::with(['user', 'items'])->where('payment_status', 'waiting')->latest()->get();
            return Inertia::render('Transaction/Pending', compact('transactions'));
        } catch (\Exception $e) {
            Log::error('Error loading transactions: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load transactions.');
        }
    }
    public function failed()
    {
        try {
            $transactions = Transaction::with(['user'])->where('payment_status', 'failed')->latest()->get();
            return Inertia::render('Transaction/Failed', compact('transactions'));
        } catch (\Exception $e) {
            Log::error('Error loading transactions: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load transactions.');
        }
    }
    public function success()
    {
        try {
            $transactions = Transaction::with(['user'])->where('payment_status', 'success')->latest()->get();
            return Inertia::render('Transaction/Success', compact('transactions'));
        } catch (\Exception $e) {
            Log::error('Error loading transactions: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load transactions.');
        }
    }

    public function show($id)
    {
        try {
            $transaction = Transaction::with(['user', 'car', 'discount'])->findOrFail($id);
            return Inertia::render('Transaction/Detail', compact('transaction'));
        } catch (\Exception $e) {
            Log::error('Error loading transaction detail: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load transaction detail.');
        }
    }
}
