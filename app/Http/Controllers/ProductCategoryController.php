<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $productCategories = ProductCategory::latest()->get();
            return Inertia::render('ProductCategory/Index', compact('productCategories'));
        } catch (\Exception $e) {
            Log::error('Error loading product categories: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load product categories.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ProductCategory/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:12',
        ]);
        
        try {

            $validated['slug'] = \Str::slug($validated['name']);
            ProductCategory::create($validated);

            return redirect()->route('product-categories.index')->with('success', 'Product category created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing product category: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create product category.');
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
            $productCategory = ProductCategory::findOrFail($id);
            return Inertia::render('ProductCategory/Edit', compact('productCategory'));
        } catch (\Exception $e) {
            Log::error('Error loading product category for edit: ' . $e->getMessage());
            return redirect()->route('product-categories.index')->with('error', 'Product category not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:12',
        ]);

        try {
            $productCategory = ProductCategory::findOrFail($id);

            $validated['slug'] = \Str::slug($validated['name']);
            $productCategory->update($validated);

            return redirect()->route('product-categories.index')->with('success', 'Product category updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating product category: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update product category.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $productCategory = ProductCategory::findOrFail($id);
            $productCategory->delete();

            return redirect()->route('product-categories.index')->with('success', 'Product category deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting product category: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete product category.');
        }
    }
}
