<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductVariantController;
use App\Http\Controllers\ProductGalleryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\DocumentationAPIController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::get('/product-categories', [ProductCategoryController::class, 'index'])->name('product-categories.index');
    Route::get('/product-categories/create', [ProductCategoryController::class, 'create'])->name('product-categories.create');
    Route::post('/product-categories', [ProductCategoryController::class, 'store'])->name('product-categories.store');
    Route::get('/product-categories/{id}/edit', [ProductCategoryController::class, 'edit'])->name('product-categories.edit');
    Route::put('/product-categories/{id}', [ProductCategoryController::class, 'update'])->name('product-categories.update');
    Route::delete('/product-categories/{id}', [ProductCategoryController::class, 'destroy'])->name('product-categories.destroy');

    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');

    Route::get('/product-variants', [ProductVariantController::class, 'index'])->name('product-variants.index');
    Route::get('/product-variants/create', [ProductVariantController::class, 'create'])->name('product-variants.create');
    Route::post('/product-variants', [ProductVariantController::class, 'store'])->name('product-variants.store');
    Route::get('/product-variants/{id}/edit', [ProductVariantController::class, 'edit'])->name('product-variants.edit');
    Route::put('/product-variants/{id}', [ProductVariantController::class, 'update'])->name('product-variants.update');
    Route::delete('/product-variants/{id}', [ProductVariantController::class, 'destroy'])->name('product-variants.destroy');

    Route::get('/product-galleries', [ProductGalleryController::class, 'index'])->name('product-galleries.index');
    Route::get('/product-galleries/create', [ProductGalleryController::class, 'create'])->name('product-galleries.create');
    Route::post('/product-galleries', [ProductGalleryController::class, 'store'])->name('product-galleries.store');
    Route::get('/product-galleries/{id}/edit', [ProductGalleryController::class, 'edit'])->name('product-galleries.edit');
    Route::put('/product-galleries/{id}', [ProductGalleryController::class, 'update'])->name('product-galleries.update');
    Route::delete('/product-galleries/{id}', [ProductGalleryController::class, 'destroy'])->name('product-galleries.destroy');

    Route::get('/faqs', [FAQController::class, 'index'])->name('faqs.index');
    Route::get('/faqs/create', [FAQController::class, 'create'])->name('faqs.create');
    Route::post('/faqs', [FAQController::class, 'store'])->name('faqs.store');
    Route::get('/faqs/{id}/edit', [FAQController::class, 'edit'])->name('faqs.edit');
    Route::put('/faqs/{id}', [FAQController::class, 'update'])->name('faqs.update');
    Route::delete('/faqs/{id}', [FAQController::class, 'destroy'])->name('faqs.destroy');
    Route::get('/faqs', [FAQController::class, 'index'])->name('faqs.index');
    
    Route::get('/pending-transactions', [TransactionController::class, 'pending'])->name('transaction.pending');
    Route::get('/failed-transactions', [TransactionController::class, 'failed'])->name('transaction.failed');
    Route::get('/success-transactions', [TransactionController::class, 'success'])->name('transaction.success');
    Route::get('/transaction/{id}/show', [TransactionController::class, 'show'])->name('transaction.show');
    
    Route::get('/docs/api', [DocumentationAPIController::class, 'index'])->name('apis.index');

});

require __DIR__.'/settings.php';
