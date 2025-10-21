<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Apparel', 'slug' => 'apparel'],
            ['name' => 'Accessories', 'slug' => 'accessories'],
            ['name' => 'Electronics', 'slug' => 'electronics'],
            ['name' => 'HomeGoods', 'slug' => 'homegoods'],
        ];

        foreach ($categories as $category) {
            \App\Models\ProductCategory::firstOrCreate(
                ['slug' => $category['slug']],
                ['name' => $category['name']]
            );
        }
    }
}
