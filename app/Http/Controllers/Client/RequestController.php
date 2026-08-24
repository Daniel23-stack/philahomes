<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use Inertia\Inertia;
use Inertia\Response;

class RequestController extends Controller
{
    public function index(): Response
    {
        $requests = ServiceRequest::where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Requests', [
            'requests' => $requests,
        ]);
    }
}
