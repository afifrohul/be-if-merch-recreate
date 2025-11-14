<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use App\Traits\ApiResponseTrait;

class CartController extends Controller
{
    use ApiResponseTrait;
    public function index()
    {
        $cart = Cart::with(['product', 'variant'])->where('user_id', Auth::id())->latest()->get();

        return $this->successResponse($cart, 'Cart fetched successfully.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required',
            'product_variant_id' => 'required',
            'quantity' => 'required'
        ]);

        $user = Auth::user();

        try {

            $cart = new Cart();
            $cart->user_id = $user->id;
            $cart->product_id = $request->product_id;
            $cart->product_variant_id = $request->product_variant_id;
            $cart->quantity = $request->quantity;
            $cart->save();

            return response()->json([
                'message' => 'Product successfully added to cart.',
            ]);
            
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to add to cart',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function updateCheck(Request $request, $id)
    {
        try {
            $cart = Cart::findOrFail($id);

            if ( $cart->is_checked == false) {
                $cart->is_checked = true;
            } else {
                $cart->is_checked = false;
            }

            $cart->save();

            return response()->json([
                'message' => 'Cart successfully updated',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to update cart',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function updateQty(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required'
        ]);

        try {
            $cart = Cart::findOrFail($id);
            $cart->quantity = $request->quantity;
            $cart->save();

            return response()->json([
                'message' => 'Cart successfully updated',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to update cart',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
    
    public function destroy($id)
    {
        try {
            $cart = Cart::findOrFail($id);
            $cart->delete();

            return response()->json([
                'message' => 'Product successfully removed from cart',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to remove from cart',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
