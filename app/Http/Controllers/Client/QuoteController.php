<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    public function index(): Response
    {
        $quotes = Quote::with('request:id,service_category,description,contact_name')
            ->whereHas('request', fn ($q) => $q->where('user_id', auth()->id()))
            ->whereIn('status', ['sent', 'accepted', 'rejected'])
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Quotes', ['quotes' => $quotes]);
    }

    public function show(Quote $quote): Response
    {
        $this->authorizeQuote($quote);

        $quote->load('request');

        return Inertia::render('Dashboard/QuoteShow', ['quote' => $quote]);
    }

    public function update(Request $request, Quote $quote): RedirectResponse
    {
        $this->authorizeQuote($quote);

        $data = $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        if ($quote->status !== 'sent') {
            return back()->withErrors(['status' => 'This quote can no longer be updated.']);
        }

        $quote->update(['status' => $data['status']]);

        if ($data['status'] === 'accepted') {
            $quote->request?->update(['status' => 'quoted']);
        }

        return redirect()->route('dashboard.quotes.show', $quote)->with('status', 'Quote '.$data['status'].'.');
    }

    private function authorizeQuote(Quote $quote): void
    {
        abort_unless($quote->request?->user_id === auth()->id(), 403);
    }
}
