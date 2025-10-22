<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductVariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\ProductVariant::insert([
            [
                'product_id' => 1,
                'name' => 'Red - Small',
                'sku' => 'TSHIRT-RED-SM',
                'price' => 1999,
                'stock' => 50,
            ],
            [
                'product_id' => 1,
                'name' => 'Red - Medium',
                'sku' => 'TSHIRT-RED-MD',
                'price' => 1999,
                'stock' => 30,
            ],
            [
                'product_id' => 1,
                'name' => 'Blue - Small',
                'sku' => 'TSHIRT-BLUE-SM',
                'price' => 1999,
                'stock' => 20,
            ],
            [
                'product_id' => 2,
                'name' => 'Black - 16GB',
                'sku' => 'MUG-BLACK-16GB',
                'price' => 1499,
                'stock' => 100,
            ],
            [
                'product_id' => 2,
                'name' => 'White - 32GB',
                'sku' => 'MUG-WHITE-32GB',
                'price' => 1599,
                'stock' => 80,
            ],
            [
                'product_id' => 3,
                'name' => 'Sticker Pack - Set of 5',
                'sku' => 'STICKER-PACK-5',
                'price' => 499,
                'stock' => 200,
            ],
            [
                'product_id' => 3,
                'name' => 'Sticker Pack - Set of 10',
                'sku' => 'STICKER-PACK-10',
                'price' => 899,
                'stock' => 150,
            ],
        ]);
    }
}
