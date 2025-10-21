<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\ProductCategoryController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/faqs', [FAQController::class, 'index'])->name('faqs.index');
    Route::get('/faqs/create', [FAQController::class, 'create'])->name('faqs.create');
    Route::post('/faqs', [FAQController::class, 'store'])->name('faqs.store');
    Route::get('/faqs/{id}/edit', [FAQController::class, 'edit'])->name('faqs.edit');
    Route::put('/faqs/{id}', [FAQController::class, 'update'])->name('faqs.update');
    Route::delete('/faqs/{id}', [FAQController::class, 'destroy'])->name('faqs.destroy');
    Route::get('/faqs', [FAQController::class, 'index'])->name('faqs.index');

    Route::get('/product-categories', [ProductCategoryController::class, 'index'])->name('product-categories.index');
    Route::get('/product-categories/create', [ProductCategoryController::class, 'create'])->name('product-categories.create');
    Route::post('/product-categories', [ProductCategoryController::class, 'store'])->name('product-categories.store');
    Route::get('/product-categories/{id}/edit', [ProductCategoryController::class, 'edit'])->name('product-categories.edit');
    Route::put('/product-categories/{id}', [ProductCategoryController::class, 'update'])->name('product-categories.update');
    Route::delete('/product-categories/{id}', [ProductCategoryController::class, 'destroy'])->name('product-categories.destroy');
});

require __DIR__.'/settings.php';
