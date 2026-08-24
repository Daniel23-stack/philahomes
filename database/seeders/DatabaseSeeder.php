<?php

namespace Database\Seeders;

use App\Models\ActivityLog;
use App\Models\CatalogItem;
use App\Models\ContactMessage;
use App\Models\Conversation;
use App\Models\Invoice;
use App\Models\Job;
use App\Models\Message;
use App\Models\NewsletterSubscriber;
use App\Models\Post;
use App\Models\Quote;
use App\Models\ServiceRequest;
use App\Models\User;
use App\Services\ActivityLogService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $adminPassword = env('ADMIN_PASSWORD', 'admin123');

        $admin = User::updateOrCreate(
            ['email' => 'admin@philahomes.co.za'],
            [
                'name' => 'Admin',
                'password' => Hash::make($adminPassword),
                'role' => 'admin',
            ]
        );

        $client = User::updateOrCreate(
            ['email' => 'sarah.m@email.com'],
            [
                'name' => 'Sarah M',
                'password' => Hash::make('demo123'),
                'role' => 'client',
            ]
        );

        $request = ServiceRequest::updateOrCreate(
            ['contact_email' => 'sarah.m@email.com', 'description' => 'Demo kitchen leak repair request.'],
            [
                'user_id' => $client->id,
                'service_category' => 'plumbing',
                'contact_name' => 'Sarah M',
                'contact_phone' => '+27 82 111 2233',
                'status' => 'quoted',
            ]
        );

        Post::updateOrCreate(
            ['slug' => 'welcome-to-okuhle-homes'],
            [
                'title' => 'Welcome to Okuhle Homes',
                'excerpt' => 'Tips and updates from our team.',
                'body' => "Welcome to the Okuhle Homes blog. We'll share maintenance tips, project highlights, and company news here.",
                'published_at' => now()->subDays(3),
                'category' => 'News',
            ]
        );

        CatalogItem::firstOrCreate(
            ['name' => 'Standard leak repair'],
            [
                'service_category' => 'plumbing',
                'description' => 'Diagnosis and repair of common household leaks.',
                'base_price' => 850,
                'order' => 1,
            ]
        );

        CatalogItem::firstOrCreate(
            ['name' => 'Electrical fault inspection'],
            [
                'service_category' => 'electrical',
                'description' => 'On-site inspection and quote for electrical faults.',
                'base_price' => 650,
                'order' => 2,
            ]
        );

        CatalogItem::firstOrCreate(
            ['name' => 'Legacy geyser replacement'],
            [
                'service_category' => 'plumbing',
                'description' => 'No longer offered — replaced by full plumbing packages.',
                'base_price' => 4500,
                'is_retired' => true,
                'order' => 99,
            ]
        );

        $quote = Quote::updateOrCreate(
            ['request_id' => $request->id],
            ['amount' => 1250, 'notes' => 'Includes parts and labour.', 'status' => 'accepted']
        );

        $request->update(['status' => 'quoted']);

        $job = Job::firstOrCreate(
            ['quote_id' => $quote->id],
            [
                'request_id' => $request->id,
                'status' => 'scheduled',
                'scheduled_date' => now()->addDays(5),
                'notes' => 'Client prefers morning slot.',
            ]
        );

        Invoice::firstOrCreate(
            ['user_id' => $client->id, 'job_id' => $job->id],
            [
                'quote_id' => $quote->id,
                'amount' => 1250,
                'status' => 'sent',
                'due_date' => now()->addDays(14),
            ]
        );

        $conversation = Conversation::firstOrCreate(
            ['user_id' => $client->id, 'request_id' => $request->id],
            ['quote_id' => $quote->id]
        );

        Message::firstOrCreate(
            ['conversation_id' => $conversation->id, 'body' => 'Hi, when can someone come out for the leak?'],
            ['sender_role' => 'client']
        );

        Message::firstOrCreate(
            ['conversation_id' => $conversation->id, 'body' => 'We can schedule a visit for next Tuesday morning.'],
            ['sender_role' => 'admin']
        );

        ContactMessage::firstOrCreate(
            ['contact' => 'john@example.com', 'query' => 'Do you work in Pretoria east?'],
            ['name' => 'John K', 'status' => 'new']
        );

        NewsletterSubscriber::firstOrCreate(['email' => 'updates@example.com']);

        if (! ActivityLog::exists()) {
            ActivityLogService::log('admin_seeded', 'system', null, ['note' => 'Demo data loaded'], $admin);
        }
    }
}
