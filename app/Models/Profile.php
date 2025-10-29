<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id', 'gender', 'address', 'phone_number'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
