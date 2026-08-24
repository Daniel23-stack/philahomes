<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Job;
use App\Models\Quote;
use App\Models\ServiceRequest;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
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
            ],
        ]);
    }

    public function requests(): Response
    {
        return Inertia::render('Admin/Requests', [
            'requests' => ServiceRequest::latest()->take(50)->get(),
        ]);
    }
}
