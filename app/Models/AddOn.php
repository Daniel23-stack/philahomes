<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AddOn extends Model
{
    public $timestamps = false;

    protected $fillable = ['catalog_item_id', 'name', 'price'];

    protected function casts(): array
    {
        return ['price' => 'decimal:2'];
    }

    public function catalogItem(): BelongsTo
    {
        return $this->belongsTo(CatalogItem::class);
    }
}
