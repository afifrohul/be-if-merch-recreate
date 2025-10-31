<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentationAPIController extends Controller
{
    public function index()
    {
        return Inertia::render('DocumentationAPI/Index');
    }
}
