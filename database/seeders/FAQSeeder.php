<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FAQSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\FAQ::insert([
            [
                'question' => 'What is your return policy?',
                'answer' => 'You can return any item within 30 days of purchase for a full refund.',
            ],
            [
                'question' => 'Do you offer international shipping?',
                'answer' => 'Yes, we ship to most countries worldwide. Shipping fees may vary based on location.',
            ],
            [
                'question' => 'How can I track my order?',
                'answer' => 'Once your order is shipped, you will receive an email with a tracking number and link.',
            ],
            [
                'question' => 'Can I change or cancel my order?',
                'answer' => 'Orders can be changed or canceled within 2 hours of placing them. Please contact our support team for assistance.',
            ],
            [
                'question' => 'What payment methods do you accept?',
                'answer' => 'We accept all major credit cards, PayPal, and Apple Pay.',
            ],
            [
                'question' => 'How do I contact customer support?',
                'answer' => 'You can reach our customer support team via email at support@example.com',
            ],
            [
                'question' => 'Are there any discounts for bulk orders?',
                'answer' => 'Yes, we offer discounts for bulk purchases. Please contact our sales team for more information.',
            ],
            [
                'question' => 'Do you have a physical store?',
                'answer' => 'Currently, we operate exclusively online and do not have a physical storefront.',
            ],
            [
                'question' => 'How do I create an account?',
                'answer' => 'Click on the "Sign Up" button at the top right corner and fill in the required details to create an account.',
            ],
            [
                'question' => 'What should I do if I receive a defective product?',
                'answer' => 'If you receive a defective product, please contact our customer support within 7 days of receipt for a replacement or refund.',
            ],
            [
                'question' => 'Do you offer gift wrapping?',
                'answer' => 'Yes, we offer gift wrapping for an additional fee during the checkout process.',
            ]
        ]);
    }
}
