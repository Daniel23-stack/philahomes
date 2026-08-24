<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Inertia\Inertia;
use Inertia\Response;

class ActivityLogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Logs', [
            'logs' => ActivityLog::with('user:id,name,email')
                ->latest('created_at')
                ->take(200)
                ->get(),
        ]);
    }
}
