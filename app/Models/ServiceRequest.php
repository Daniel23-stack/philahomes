<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceRequest extends Model
{
    protected $fillable = [
        'user_id', 'service_category', 'sub_service', 'description',
        'contact_name', 'contact_email', 'contact_phone', 'status', 'image_urls',
    ];

    protected function casts(): array
    {
        return ['image_urls' => 'array'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class, 'request_id');
    }

    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class, 'request_id');
    }
}
