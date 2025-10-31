<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $products = Product::with('category', 'variants', 'galleries')->latest()->get();
            return Inertia::render('Product/Index', compact('products'));
        } catch (\Exception $e) {
            Log::error('Error loading products: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load products.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $productCategory = ProductCategory::get();
        return Inertia::render('Product/Create', compact('productCategory'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_category_id' => 'required|exists:product_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'status' => 'required|in:released,unreleased',
            'image' => 'required|image|max:2048',
        ]);
        
        try {

            $file =  $request->file('image');
            $filename = now()->format('Ymd_His') . '_' . \Str::random(8) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('products', $filename, 'public');

            Product::create([
                'product_category_id' => $validated['product_category_id'],
                'name' => $validated['name'],
                'slug' => \Str::slug($validated['name']),
                'description' => $validated['description'],
                'status' => $validated['status'],
                'image' => $path
            ]);

            return redirect()->route('products.index')->with('success', 'Product created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing product: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create product.');
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
            $product = Product::with('category')->findOrFail($id);
            $productCategory = ProductCategory::get();
            return Inertia::render('Product/Edit', compact('product', 'productCategory'));
        } catch (\Exception $e) {
            Log::error('Error loading product for edit: ' . $e->getMessage());
            return redirect()->route('products.index')->with('error', 'Product not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'product_category_id' => 'required|exists:product_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'status' => 'required|in:released,unreleased',
            'image' => 'nullable|image|max:2048',
        ]);

        try {

            $product = Product::findOrFail($id);

            if ($request->hasFile('image')) {
                if ($product->image && \Storage::disk('public')->exists($product->image)) {
                    \Storage::disk('public')->delete($product->image);
                }

                $file =  $request->file('image');
                $filename = now()->format('Ymd_His') . '_' . \Str::random(8) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('products', $filename, 'public');

                $product->update([
                    'product_category_id' => $validated['product_category_id'],
                    'name' => $validated['name'],
                    'slug' => \Str::slug($validated['name']),
                    'description' => $validated['description'],
                    'status' => $validated['status'],
                    'image' => $path,
                ]);
            } else {
                $product->update([
                    'product_category_id' => $validated['product_category_id'],
                    'name' => $validated['name'],
                    'slug' => \Str::slug($validated['name']),
                    'description' => $validated['description'],
                    'status' => $validated['status'],
                ]);
            }

            return redirect()->route('products.index')->with('success', 'Product updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update product.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);

            if ($product->image && \Storage::disk('public')->exists($product->image)) {
                \Storage::disk('public')->delete($product->image);
            }

            $product->delete();
            
            return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete product.');
        }
    }
}
