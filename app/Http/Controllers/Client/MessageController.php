<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\ServiceRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        $conversations = Conversation::with(['messages' => fn ($q) => $q->latest()->limit(1)])
            ->where('user_id', auth()->id())
            ->latest('updated_at')
            ->get()
            ->map(function (Conversation $c) {
                $last = $c->messages->first();

                return [
                    'id' => $c->id,
                    'request_id' => $c->request_id,
                    'last_message' => $last?->body,
                    'last_sender' => $last?->sender_role,
                    'updated_at' => $c->updated_at,
                ];
            });

        $requests = ServiceRequest::where('user_id', auth()->id())
            ->latest()
            ->get(['id', 'service_category', 'description']);

        return Inertia::render('Dashboard/Messages', [
            'conversations' => $conversations,
            'requests' => $requests,
        ]);
    }

    public function show(Conversation $conversation): Response
    {
        $this->authorizeConversation($conversation);

        $conversation->load('messages');

        return Inertia::render('Dashboard/MessagesShow', [
            'conversation' => $conversation,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'body' => 'required|string|max:10000',
            'request_id' => 'nullable|exists:service_requests,id',
        ]);

        if ($data['request_id'] ?? null) {
            abort_unless(
                ServiceRequest::where('id', $data['request_id'])->where('user_id', auth()->id())->exists(),
                403
            );
        }

        $conversation = Conversation::create([
            'user_id' => auth()->id(),
            'request_id' => $data['request_id'] ?? null,
        ]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_role' => 'client',
            'body' => $data['body'],
        ]);

        return redirect()->route('dashboard.messages.show', $conversation)->with('status', 'Message sent.');
    }

    public function reply(Request $request, Conversation $conversation): RedirectResponse
    {
        $this->authorizeConversation($conversation);

        $data = $request->validate([
            'body' => 'required|string|max:10000',
        ]);

        Message::create([
            'conversation_id' => $conversation->id,
            'sender_role' => 'client',
            'body' => $data['body'],
        ]);

        $conversation->touch();

        return back()->with('status', 'Message sent.');
    }

    private function authorizeConversation(Conversation $conversation): void
    {
        abort_unless($conversation->user_id === auth()->id(), 403);
    }
}
