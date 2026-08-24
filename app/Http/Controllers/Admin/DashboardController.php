<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Conversation;
use App\Models\Invoice;
use App\Models\Job;
use App\Models\NewsletterSubscriber;
use App\Models\Quote;
use App\Models\ServiceRequest;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Index', [
            'stats' => [
                'users' => User::count(),
                'requests' => ServiceRequest::count(),
                'quotes' => Quote::count(),
                'jobs' => Job::count(),
                'invoices' => Invoice::count(),
                'messages' => Conversation::count(),
                'contacts' => ContactMessage::count(),
                'subscribers' => NewsletterSubscriber::count(),
            ],
        ]);
    }

    public function analytics(): Response
    {
        $requestsByCategory = ServiceRequest::query()
            ->selectRaw('service_category, count(*) as total')
            ->groupBy('service_category')
            ->orderByDesc('total')
            ->get();

        $requestsByStatus = ServiceRequest::query()
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->get();

        $revenuePaid = Invoice::where('status', 'paid')->sum('amount');
        $revenuePending = Invoice::whereIn('status', ['sent', 'draft', 'overdue'])->sum('amount');

        return Inertia::render('Admin/Analytics', [
            'summary' => [
                'totalUsers' => User::where('role', 'client')->count(),
                'activeJobs' => Job::whereIn('status', ['scheduled', 'in_progress'])->count(),
                'pendingRequests' => ServiceRequest::where('status', 'pending')->count(),
                'revenuePaid' => $revenuePaid,
                'revenuePending' => $revenuePending,
            ],
            'requestsByCategory' => $requestsByCategory,
            'requestsByStatus' => $requestsByStatus,
            'recentSignups' => User::where('role', 'client')->latest()->take(5)->get(['id', 'name', 'email', 'created_at']),
        ]);
    }
}
