<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CatalogItem extends Model
{
    protected $fillable = [
        'service_category', 'name', 'description', 'base_price', 'is_retired', 'order',
    ];

    protected function casts(): array
    {
        return [
            'base_price' => 'decimal:2',
            'is_retired' => 'boolean',
        ];
    }

    public function addOns(): HasMany
    {
        return $this->hasMany(AddOn::class);
    }
}
