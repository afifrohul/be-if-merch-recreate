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

        $products = Product::with(['category', 'variants'])->where('status', 'released')->orderBy('name', 'asc');

        if ($search) {
            $products->where('name', 'like', '%' . $search . '%');
        }

        $products = $products->get();

        if ($products->isEmpty()) {
            return $this->errorResponse('No products found.', null, 404);
        }

        $products = $products->map(function ($product) {
        return [
            'id' => $product->id,
            'product_category_id' => $product->product_category_id,
            'image' => $product->image,
            'name' => $product->name,
            'slug' => $product->slug,
            'description' => $product->description,
            'status' => $product->status,
            'created_at' => $product->created_at,
            'updated_at' => $product->updated_at,
            'category' => $product->category->name,
            'price' => optional($product->variants->first())->price,
        ];
    });

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
