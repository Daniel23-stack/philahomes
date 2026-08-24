<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Inertia\Inertia;
use Inertia\Response;

class NewsletterController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Newsletter', [
            'subscribers' => NewsletterSubscriber::latest('created_at')->take(500)->get(),
        ]);
    }
}
