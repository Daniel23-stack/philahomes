<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    public $timestamps = false;

    protected $fillable = ['name', 'contact', 'query', 'status'];

    protected function casts(): array
    {
        return ['created_at' => 'datetime'];
    }
}
