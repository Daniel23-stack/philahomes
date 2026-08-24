<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    protected $fillable = [
        'user_id', 'quote_id', 'job_id', 'amount', 'status', 'due_date', 'paid_at', 'pdf_url',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'datetime',
            'paid_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
