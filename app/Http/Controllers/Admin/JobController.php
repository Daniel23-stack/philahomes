<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\Quote;
use App\Services\ActivityLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Jobs', [
            'jobs' => Job::with(['request:id,contact_name,service_category', 'quote:id,amount,status'])
                ->latest()
                ->take(100)
                ->get(),
            'acceptedQuotes' => Quote::where('status', 'accepted')
                ->whereDoesntHave('jobs')
                ->with('request:id,contact_name,service_category')
                ->latest()
                ->take(30)
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'quote_id' => 'required|exists:quotes,id',
            'scheduled_date' => 'nullable|date',
            'notes' => 'nullable|string|max:5000',
        ]);

        $quote = Quote::findOrFail($data['quote_id']);

        $job = Job::create([
            'quote_id' => $quote->id,
            'request_id' => $quote->request_id,
            'status' => 'scheduled',
            'scheduled_date' => $data['scheduled_date'] ?? null,
            'notes' => $data['notes'] ?? null,
        ]);

        ActivityLogService::log('job_created', 'job', $job->id, ['quote_id' => $quote->id]);

        return back()->with('status', 'Job scheduled.');
    }

    public function update(Request $request, Job $job): RedirectResponse
    {
        $data = $request->validate([
            'status' => 'required|in:scheduled,in_progress,completed,cancelled',
            'scheduled_date' => 'nullable|date',
            'notes' => 'nullable|string|max:5000',
        ]);

        if ($data['status'] === 'completed') {
            $data['completed_at'] = now();
        }

        $job->update($data);

        ActivityLogService::log('job_updated', 'job', $job->id, $data);

        return back()->with('status', 'Job updated.');
    }
}
