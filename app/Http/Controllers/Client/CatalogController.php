<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\CatalogItem;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard/Catalog', [
            'items' => CatalogItem::with('addOns')
                ->where('is_retired', false)
                ->orderBy('order')
                ->orderBy('name')
                ->get(),
            'serviceCategories' => collect(config('services_catalog.services'))->pluck('name', 'slug')->all(),
        ]);
    }

    public function retired(): Response
    {
        return Inertia::render('Dashboard/CatalogRetired', [
            'items' => CatalogItem::with('addOns')
                ->where('is_retired', true)
                ->orderBy('name')
                ->get(),
        ]);
    }
}
