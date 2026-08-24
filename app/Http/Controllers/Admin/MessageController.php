<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Services\ActivityLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        $conversations = Conversation::with(['user:id,name,email', 'messages' => fn ($q) => $q->latest()->limit(1)])
            ->latest('updated_at')
            ->take(100)
            ->get()
            ->map(function (Conversation $c) {
                $last = $c->messages->first();

                return [
                    'id' => $c->id,
                    'user' => $c->user,
                    'last_message' => $last?->body,
                    'last_sender' => $last?->sender_role,
                    'updated_at' => $c->updated_at,
                ];
            });

        return Inertia::render('Admin/Messages', [
            'conversations' => $conversations,
        ]);
    }

    public function show(Conversation $conversation): Response
    {
        $conversation->load(['user:id,name,email', 'messages']);

        return Inertia::render('Admin/MessagesShow', [
            'conversation' => $conversation,
        ]);
    }

    public function reply(Request $request, Conversation $conversation): RedirectResponse
    {
        $data = $request->validate([
            'body' => 'required|string|max:10000',
        ]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_role' => 'admin',
            'body' => $data['body'],
        ]);

        $conversation->touch();

        ActivityLogService::log('message_sent', 'conversation', $conversation->id);

        return back()->with('status', 'Reply sent.');
    }
}
