<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Services\EmailNotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request, EmailNotificationService $email): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'contact' => 'required|string|max:200',
            'query' => 'required|string|max:5000',
        ]);

        $message = ContactMessage::create([
            ...$validated,
            'status' => 'new',
            'created_at' => now(),
        ]);

        $email->send(
            "New contact inquiry from {$validated['name']}",
            "Name: {$validated['name']}\nContact: {$validated['contact']}\n\n{$validated['query']}\n\nMessage ID: {$message->id}"
        );

        return response()->json(['ok' => true]);
    }
}
