<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use App\Services\ActivityLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RequestController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Requests', [
            'requests' => ServiceRequest::latest()->take(100)->get(),
        ]);
    }

    public function update(Request $request, ServiceRequest $serviceRequest): RedirectResponse
    {
        $data = $request->validate([
            'status' => 'required|in:pending,reviewing,quoted,in_progress,completed,cancelled',
        ]);

        $serviceRequest->update($data);

        ActivityLogService::log('request_status_updated', 'service_request', $serviceRequest->id, $data);

        return back()->with('status', 'Request updated.');
    }
}
