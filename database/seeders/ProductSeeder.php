<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Product::insert([
            [
                'product_category_id' => 1,
                'name' => 'Sample Product 1',
                'slug' => 'sample-product-1',
                'description' => 'This is a description for Sample Product 1.',
                'status' => 'released',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_category_id' => 2,
                'name' => 'Sample Product 2',
                'slug' => 'sample-product-2',
                'description' => 'This is a description for Sample Product 2.',
                'status' => 'unreleased',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_category_id' => 1,
                'name' => 'Sample Product 3',
                'slug' => 'sample-product-3',
                'description' => 'This is a description for Sample Product 3.',
                'status' => 'released',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_category_id' => 3,
                'name' => 'Sample Product 4',
                'slug' => 'sample-product-4',
                'description' => 'This is a description for Sample Product 4.',
                'status' => 'unreleased',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_category_id' => 2,
                'name' => 'Sample Product 5',
                'slug' => 'sample-product-5',
                'description' => 'This is a description for Sample Product 5.',
                'status' => 'released',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_category_id' => 3,
                'name' => 'Sample Product 6',
                'slug' => 'sample-product-6',
                'description' => 'This is a description for Sample Product 6.',
                'status' => 'unreleased',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
