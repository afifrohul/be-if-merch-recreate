<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\FAQController;
use App\Http\Controllers\API\V1\ProductCategoryController;
use App\Http\Controllers\API\V1\ProductController;
use App\Http\Controllers\API\V1\CartController;
use App\Http\Controllers\API\V1\TransactionController;
use App\Http\Controllers\API\V1\ProfileController;

Route::prefix('V1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    
    Route::get('/faqs', [FAQController::class, 'index']);
    
    Route::get('/product-categories', [ProductCategoryController::class, 'index']);
    
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/product/{slug}', [ProductController::class, 'show']);
    
    Route::middleware(['auth:sanctum'])->group(function () {
    
        Route::get('/user', [ProfileController::class, 'index']);
        Route::post('/profile', [ProfileController::class, 'store']);
        
        Route::get('/cart', [CartController::class, 'index']);
        Route::post('/cart', [CartController::class, 'store']);
        Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    
        Route::get('/transactions', [TransactionController::class, 'index']);
        Route::get('/transaction/{id}', [TransactionController::class, 'show']);
        Route::post('/transactions', [TransactionController::class, 'store']);
    });
    
    Route::post('/midtrans/callback', [TransactionController::class, 'callback']);
});
