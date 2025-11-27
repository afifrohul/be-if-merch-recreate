<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\FAQ;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductGallery;
use App\Models\ProductVariant;
use App\Models\Transaction;
use App\Models\TransactionItem;

class DashboardController extends Controller
{
    public function index()
    {
        $customerCount = User::where('role', 'customer')->count();
        $categoryCount = ProductCategory::count();
        $productCount = Product::count();
        $variantCount = ProductVariant::count();
        $galleryCount = ProductGallery::count();
        $faqCount = FAQ::count();
        $transactionCount = Transaction::count();
        $transactionIncome = Transaction::where('payment_status', 'paid')->sum('total_amount');

        $transactionByCategory = TransactionItem::query()
            ->join('products', 'transaction_items.product_id', '=', 'products.id')
            ->join('product_categories', 'products.product_category_id', '=', 'product_categories.id')
            ->select(
                'product_categories.name as category',
                \DB::raw('CAST(SUM(transaction_items.quantity) AS UNSIGNED) as total_quantity')
            )
            ->whereHas('transaction', function ($query) {
                $query->where('payment_status', 'paid');
            })
            ->groupBy('product_categories.name')
            ->get();

        $transactionByYear = Transaction::query()
            ->select(
                \DB::raw('YEAR(created_at) as year'),
                \DB::raw('SUM(total_amount) as total_income')
            )
            ->where('payment_status', 'paid')
            ->groupBy(\DB::raw('YEAR(created_at)'))
            ->orderBy('year', 'asc')
            ->get();

        return Inertia::render('dashboard', compact(
            'customerCount',
            'categoryCount',
            'productCount',
            'variantCount',
            'galleryCount',
            'faqCount',
            'transactionCount',
            'transactionIncome',
            'transactionByCategory',
            'transactionByYear'
        ));
    }
}
