<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Inertia\Inertia;
use Inertia\Response;

class JobController extends Controller
{
    public function index(): Response
    {
        $jobs = Job::with(['request:id,service_category,description', 'quote:id,amount,status'])
            ->whereHas('request', fn ($q) => $q->where('user_id', auth()->id()))
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Jobs', ['jobs' => $jobs]);
    }

    public function show(Job $job): Response
    {
        $this->authorizeJob($job);

        $job->load(['request', 'quote']);

        return Inertia::render('Dashboard/JobShow', ['job' => $job]);
    }

    private function authorizeJob(Job $job): void
    {
        abort_unless($job->request?->user_id === auth()->id(), 403);
    }
}
