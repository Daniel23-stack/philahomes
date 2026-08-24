<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ChatPromptService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function store(Request $request, ChatPromptService $prompts): JsonResponse
    {
        $apiKey = config('openai.key');
        if (! $apiKey) {
            return response()->json([
                'error' => 'Chat is not configured. Please use the contact form or request a quote.',
            ], 503);
        }

        $validated = $request->validate([
            'messages' => 'required|array|min:1',
            'messages.*.role' => 'required|in:user,assistant,system',
            'messages.*.content' => 'required|string|max:4000',
        ]);

        $messages = array_merge(
            [['role' => 'system', 'content' => $prompts->systemPrompt()]],
            $validated['messages']
        );

        $response = Http::withToken($apiKey)->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini',
            'messages' => $messages,
            'max_tokens' => 512,
            'temperature' => 0.6,
        ]);

        if (! $response->successful()) {
            return response()->json([
                'error' => 'Sorry, the assistant is temporarily unavailable. Please try the contact form.',
            ], 502);
        }

        $content = trim($response->json('choices.0.message.content') ?? '')
            ?: "I couldn't generate a response. Please try the contact form or request a quote.";

        return response()->json(['message' => $content]);
    }
}
