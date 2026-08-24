<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Job;
use App\Models\Payment;
use App\Models\User;
use App\Services\ActivityLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Invoices', [
            'invoices' => Invoice::with(['user:id,name,email'])
                ->latest()
                ->take(100)
                ->get(),
            'clients' => User::where('role', 'client')->orderBy('name')->get(['id', 'name', 'email']),
            'jobs' => Job::with('request:id,contact_name')
                ->whereDoesntHave('invoice')
                ->latest()
                ->take(30)
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'job_id' => 'nullable|exists:jobs,id',
            'quote_id' => 'nullable|exists:quotes,id',
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:draft,sent,paid,overdue,cancelled',
            'due_date' => 'nullable|date',
        ]);

        $invoice = Invoice::create($data);

        ActivityLogService::log('invoice_created', 'invoice', $invoice->id, $data);

        return back()->with('status', 'Invoice created.');
    }

    public function update(Request $request, Invoice $invoice): RedirectResponse
    {
        $data = $request->validate([
            'amount' => 'required|numeric|min:0',
            'status' => 'required|in:draft,sent,paid,overdue,cancelled',
            'due_date' => 'nullable|date',
        ]);

        if ($data['status'] === 'paid' && ! $invoice->paid_at) {
            $data['paid_at'] = now();

            Payment::create([
                'invoice_id' => $invoice->id,
                'amount' => $data['amount'],
                'method' => 'manual',
                'status' => 'completed',
            ]);
        }

        $invoice->update($data);

        ActivityLogService::log('invoice_updated', 'invoice', $invoice->id, $data);

        return back()->with('status', 'Invoice updated.');
    }
}
