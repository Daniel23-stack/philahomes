<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Users', [
            'users' => User::withCount(['serviceRequests', 'invoices'])
                ->latest()
                ->take(200)
                ->get(['id', 'name', 'email', 'role', 'created_at']),
        ]);
    }
}
