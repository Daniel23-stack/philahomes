<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Job;
use App\Models\Quote;
use App\Models\ServiceRequest;
use App\Models\Conversation;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $userId = auth()->id();

        $requests = ServiceRequest::where('user_id', $userId)->latest()->take(5)->get();

        $stats = [
            'requests' => ServiceRequest::where('user_id', $userId)->count(),
            'pending' => ServiceRequest::where('user_id', $userId)->whereIn('status', ['pending', 'reviewing'])->count(),
            'active_jobs' => Job::whereHas('request', fn ($q) => $q->where('user_id', $userId))
                ->whereIn('status', ['scheduled', 'in_progress'])->count(),
            'quotes' => Quote::whereHas('request', fn ($q) => $q->where('user_id', $userId))
                ->where('status', 'sent')->count(),
            'invoices' => Invoice::where('user_id', $userId)->whereIn('status', ['sent', 'overdue'])->count(),
            'messages' => Conversation::where('user_id', $userId)->count(),
        ];

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'requests' => $requests,
        ]);
    }
}
