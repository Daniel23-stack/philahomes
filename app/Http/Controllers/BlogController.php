<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Blog/Index', [
            'posts' => Post::published()->latest('published_at')->get(['id', 'title', 'slug', 'excerpt', 'published_at', 'category']),
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::published()->where('slug', $slug)->firstOrFail();

        return Inertia::render('Blog/Show', ['post' => $post]);
    }
}
