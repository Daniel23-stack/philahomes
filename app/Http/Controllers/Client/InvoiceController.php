<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function index(): Response
    {
        $invoices = Invoice::where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Invoices', ['invoices' => $invoices]);
    }
}
