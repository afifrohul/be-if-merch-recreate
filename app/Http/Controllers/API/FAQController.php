<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FAQ;
use App\Traits\ApiResponseTrait;

class FAQController extends Controller
{
    use ApiResponseTrait;
    public function index()
    {
        $faqs = FAQ::get();
        return $this->successResponse($faqs, 'FAQs fetched successfully.');
    }
}
