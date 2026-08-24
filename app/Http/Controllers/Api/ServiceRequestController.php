<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceRequestController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'serviceCategory' => 'required|string|max:100',
            'subService' => 'nullable|string|max:100',
            'description' => 'required|string|max:5000',
            'contactName' => 'required|string|max:200',
            'contactEmail' => 'required|email|max:320',
            'contactPhone' => 'nullable|string|max:50',
            'imageUrls' => 'nullable|array',
        ]);

        $req = ServiceRequest::create([
            'user_id' => $request->user()?->id,
            'service_category' => $validated['serviceCategory'],
            'sub_service' => $validated['subService'] ?? null,
            'description' => $validated['description'],
            'contact_name' => $validated['contactName'],
            'contact_email' => $validated['contactEmail'],
            'contact_phone' => $validated['contactPhone'] ?? null,
            'image_urls' => $validated['imageUrls'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json(['ok' => true, 'id' => $req->id]);
    }
}
