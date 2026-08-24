<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'posts' => Post::published()->latest('published_at')->take(3)->get(['title', 'slug', 'excerpt']),
            'services' => config('services_catalog.services'),
        ]);
    }
}
