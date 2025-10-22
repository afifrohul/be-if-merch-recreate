<?php

namespace App\Http\Controllers;

use App\Models\ProductVariant;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $productVariants = ProductVariant::with('product')->latest()->get();
            return Inertia::render('ProductVariant/Index', compact('productVariants'));
        } catch (\Exception $e) {
            Log::error('Error loading product variants: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load product variants.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::get();
        return Inertia::render('ProductVariant/Create', compact('products'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:product_variants,sku',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);
        
        try {

            ProductVariant::create($validated);

            return redirect()->route('product-variants.index')->with('success', 'Product variant created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing product variant: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create product variant.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            $products = Product::get();
            $productVariant = ProductVariant::with('product')->findOrFail($id);
            return Inertia::render('ProductVariant/Edit', compact('productVariant', 'products'));
        } catch (\Exception $e) {
            Log::error('Error loading product variant for edit: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load product variant.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:product_variants,sku,' . $id,
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);
        
        try {
            $productVariant = ProductVariant::findOrFail($id);
            $productVariant->update($validated);

            return redirect()->route('product-variants.index')->with('success', 'Product variant updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating product variant: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update product variant.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $productVariant = ProductVariant::findOrFail($id);
            $productVariant->delete();

            return redirect()->route('product-variants.index')->with('success', 'Product variant deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting product variant: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete product variant.');
        }
    }
}
