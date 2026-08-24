<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Services\ActivityLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/ContactMessages', [
            'messages' => ContactMessage::latest('created_at')->take(100)->get(),
        ]);
    }

    public function update(Request $request, ContactMessage $contactMessage): RedirectResponse
    {
        $data = $request->validate([
            'status' => 'required|in:new,read,replied,archived',
        ]);

        $contactMessage->update($data);

        ActivityLogService::log('contact_message_updated', 'contact_message', $contactMessage->id, $data);

        return back()->with('status', 'Message updated.');
    }
}
