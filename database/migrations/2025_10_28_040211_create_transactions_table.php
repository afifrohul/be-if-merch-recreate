<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();

        $table->string('invoice_number')->unique();
        $table->decimal('total_amount', 12, 2);
        $table->enum('status', ['pending', 'paid', 'canceled', 'completed'])->default('pending');

        $table->string('payment_method')->nullable();
        $table->enum('payment_status', ['waiting', 'paid', 'failed', 'expired', 'refunded'])->default('waiting');
        $table->string('payment_type')->nullable();

        $table->timestamp('paid_at')->nullable();
        $table->timestamp('canceled_at')->nullable();
        $table->timestamp('completed_at')->nullable();
        $table->text('notes')->nullable();

        $table->json('midtrans_payload')->nullable();
        $table->string('midtrans_order_id')->unique()->nullable();
        $table->string('midtrans_transaction_id')->nullable();
        $table->string('midtrans_snap_token')->nullable();

        $table->timestamps();

        $table->index(['user_id', 'status', 'payment_status']);
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
