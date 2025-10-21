<?php

namespace App\Http\Controllers;

use App\Models\FAQ;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class FAQController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $faqs = FAQ::latest()->get();
            return Inertia::render('FAQ/Index', compact('faqs'));
        } catch (\Exception $e) {
            Log::error('Error loading FAQs: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load FAQs.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('FAQ/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string|max:1000',
        ]);
        
        try {

            FAQ::create($validated);

            return redirect()->route('faqs.index')->with('success', 'FAQ created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing FAQ: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create FAQ.');
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
            $faq = FAQ::findOrFail($id);
            return Inertia::render('FAQ/Edit', compact('faq'));
        } catch (\Exception $e) {
            Log::error('Error loading faq for edit: ' . $e->getMessage());
            return redirect()->route('faqs.index')->with('error', 'FAQ not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string|max:1000',
        ]);

        try {
            $faq = FAQ::findOrFail($id);
            $faq->update($validated);

            return redirect()->route('faqs.index')->with('success', 'FAQ updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating faq: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update faq.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $faq = FAQ::findOrFail($id);
            $faq->delete();

            return redirect()->route('faqs.index')->with('success', 'FAQ deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting faq: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete faq.');
        }
    }
}
