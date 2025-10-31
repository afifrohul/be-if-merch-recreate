<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Traits\ApiResponseTrait;

class ProductController extends Controller
{
    use ApiResponseTrait;

    public function index(Request $request)
    {
        $search = $request->get('search');

        $products = Product::with(['category', 'variants', 'galleries'])->where('status', 'released');

        if ($search) {
            $products->where('name', 'like', '%' . $search . '%');
        }

        $products = $products->get();

        if ($products->isEmpty()) {
            return $this->errorResponse('No products found.', null, 404);
        }

        return $this->successResponse($products, 'Products fetched successfully.');
    }

    public function show($id)
    {
        $product = Product::with(['category', 'variants', 'galleries'])->find($id);

        if (!$product) {
            return $this->errorResponse('Product not found.', null, 404);
        }

        return $this->successResponse($product, 'Product fetched successfully.');
    }
}
