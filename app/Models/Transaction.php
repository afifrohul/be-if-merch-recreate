<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id', 'invoice_number', 'total_amount', 'status',
        'payment_method', 'payment_status', 'payment_type',
        'paid_at', 'canceled_at', 'completed_at', 'notes',
        'midtrans_payload', 'midtrans_order_id', 'midtrans_transaction_id', 'midtrans_snap_token',
    ];

    protected $casts = [
        'midtrans_payload' => 'array',
        'paid_at' => 'datetime',
        'canceled_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
