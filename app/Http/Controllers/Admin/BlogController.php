<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Services\ActivityLogService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Blog', [
            'posts' => Post::latest()->take(100)->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/BlogForm', [
            'post' => null,
        ]);
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('Admin/BlogForm', [
            'post' => $post,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $post = Post::create($data);

        ActivityLogService::log('blog_post_created', 'post', $post->id, ['title' => $post->title]);

        return redirect()->route('admin.blog.index')->with('status', 'Post published.');
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $data = $this->validated($request, $post);
        $post->update($data);

        ActivityLogService::log('blog_post_updated', 'post', $post->id, ['title' => $post->title]);

        return redirect()->route('admin.blog.index')->with('status', 'Post updated.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $id = $post->id;
        $title = $post->title;
        $post->delete();

        ActivityLogService::log('blog_post_deleted', 'post', $id, ['title' => $title]);

        return back()->with('status', 'Post deleted.');
    }

    private function validated(Request $request, ?Post $post = null): array
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('posts', 'slug')->ignore($post?->id)],
            'excerpt' => 'nullable|string|max:1000',
            'body' => 'required|string',
            'category' => 'nullable|string|max:100',
            'published_at' => 'nullable|date',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        return $data;
    }
}
