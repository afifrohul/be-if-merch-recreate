<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductCategory;
use App\Traits\ApiResponseTrait;

class ProductCategoryController extends Controller
{
    use ApiResponseTrait;
    public function index()
    {
        $productCategories = ProductCategory::get();
        return $this->successResponse($productCategories, 'Product categories fetched successfully.');
    }
}
