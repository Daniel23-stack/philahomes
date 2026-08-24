<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CatalogItem;
use App\Services\ActivityLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Catalog', [
            'items' => CatalogItem::with('addOns')->orderBy('order')->orderBy('name')->get(),
            'serviceCategories' => collect(config('services_catalog.services'))->pluck('name', 'slug')->all(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'service_category' => 'required|string|max:100',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
            'base_price' => 'nullable|numeric|min:0',
            'is_retired' => 'boolean',
            'order' => 'integer|min:0',
        ]);

        $item = CatalogItem::create($data);

        ActivityLogService::log('catalog_item_created', 'catalog_item', $item->id, $data);

        return back()->with('status', 'Catalog item added.');
    }

    public function update(Request $request, CatalogItem $catalogItem): RedirectResponse
    {
        $data = $request->validate([
            'service_category' => 'required|string|max:100',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
            'base_price' => 'nullable|numeric|min:0',
            'is_retired' => 'boolean',
            'order' => 'integer|min:0',
        ]);

        $catalogItem->update($data);

        ActivityLogService::log('catalog_item_updated', 'catalog_item', $catalogItem->id, $data);

        return back()->with('status', 'Catalog item updated.');
    }

    public function destroy(CatalogItem $catalogItem): RedirectResponse
    {
        $id = $catalogItem->id;
        $catalogItem->delete();

        ActivityLogService::log('catalog_item_deleted', 'catalog_item', $id);

        return back()->with('status', 'Catalog item removed.');
    }
}
