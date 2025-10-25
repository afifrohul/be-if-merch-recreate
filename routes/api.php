<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\FAQController;
use App\Http\Controllers\API\ProductCategoryController;
use App\Http\Controllers\API\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [App\Http\Controllers\API\AuthController::class, 'register']);
Route::post('/login', [App\Http\Controllers\API\AuthController::class, 'login']);
Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/faqs', [FAQController::class, 'index']);

Route::get('/product-categories', [ProductCategoryController::class, 'index']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);