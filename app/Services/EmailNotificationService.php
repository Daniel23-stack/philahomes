<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class EmailNotificationService
{
    public function send(string $subject, string $text): bool
    {
        $apiKey = config('resend.key');
        if (! $apiKey) {
            return false;
        }

        try {
            $response = Http::withToken($apiKey)->post('https://api.resend.com/emails', [
                'from' => env('EMAIL_FROM', 'Okuhle Homes <onboarding@resend.dev>'),
                'to' => config('site.email'),
                'subject' => $subject,
                'text' => $text,
            ]);

            if (! $response->successful()) {
                Log::warning('Resend error', ['status' => $response->status(), 'body' => $response->body()]);
                return false;
            }

            return true;
        } catch (\Throwable $e) {
            Log::error('Email send failed', ['error' => $e->getMessage()]);
            return false;
        }
    }
}
