<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use App\Models\ServiceRequest;
use App\Services\ActivityLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Quotes', [
            'quotes' => Quote::with('request:id,contact_name,service_category,contact_email')
                ->latest()
                ->take(100)
                ->get(),
            'requests' => ServiceRequest::latest()
                ->take(50)
                ->get(['id', 'contact_name', 'service_category', 'description', 'status']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'request_id' => 'required|exists:service_requests,id',
            'amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string|max:5000',
            'status' => 'required|in:draft,sent,accepted,rejected',
        ]);

        $quote = Quote::create($data);

        ServiceRequest::where('id', $data['request_id'])->update(['status' => 'quoted']);

        ActivityLogService::log('quote_created', 'quote', $quote->id, $data);

        return back()->with('status', 'Quote created.');
    }

    public function update(Request $request, Quote $quote): RedirectResponse
    {
        $data = $request->validate([
            'amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string|max:5000',
            'status' => 'required|in:draft,sent,accepted,rejected',
        ]);

        $quote->update($data);

        ActivityLogService::log('quote_updated', 'quote', $quote->id, $data);

        return back()->with('status', 'Quote updated.');
    }
}
