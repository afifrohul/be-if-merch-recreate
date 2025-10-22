<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductGallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProductGalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $productGallery = ProductGallery::with(['product'])->latest()->get();
            return Inertia::render('ProductGallery/Index', compact('productGallery'));
        } catch (\Exception $e) {
            Log::error('Error loading product galleries: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load product galleries.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $product = Product::get();
        return Inertia::render('ProductGallery/Create', compact('product'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'image' => 'required|image|max:2048',
        ]);
        
        try {

            $file =  $request->file('image');
            $filename = now()->format('Ymd_His') . '_' . \Str::random(8) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('product-galleries', $filename, 'public');

            ProductGallery::create([
                'product_id' => $validated['product_id'],
                'image' => $path,
            ]);

            return redirect()->route('product-galleries.index')->with('success', 'Product gallery created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing product gallery: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create product gallery.');
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

            $product = Product::get();

            $productGallery = ProductGallery::findOrFail($id);
            return Inertia::render('ProductGallery/Edit', compact('product', 'productGallery'));
        } catch (\Exception $e) {
            Log::error('Error loading product gallery for edit: ' . $e->getMessage());
            return redirect()->route('product-galleries.index')->with('error', 'Product gallery not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'image' => 'nullable|image|max:2048',
        ]);

        try {
            $productGallery = ProductGallery::findOrFail($id);

            if ($request->hasFile('image')) {
                if ($productGallery->image && \Storage::disk('public')->exists($productGallery->image)) {
                    \Storage::disk('public')->delete($productGallery->image);
                }

                $file =  $request->file('image');
                $filename = now()->format('Ymd_His') . '_' . \Str::random(8) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('product-galleries', $filename, 'public');

                $productGallery->update([
                    'product_id' => $validated['product_id'],
                    'image' => $path,
                ]);
            } else {
                $productGallery->update([
                    'product_id' => $validated['product_id'],
                ]);
            }

            return redirect()->route('product-galleries.index')->with('success', 'Product gallery updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating product gallery: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update product gallery.');
        };
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $productGallery = ProductGallery::findOrFail($id);

            if ($productGallery->image && \Storage::disk('public')->exists($productGallery->image)) {
                \Storage::disk('public')->delete($productGallery->image);
            }

            $productGallery->delete();

            return redirect()->route('product-galleries.index')->with('success', 'Product gallery deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting product gallery: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete product gallery.');
        };
    }
}
