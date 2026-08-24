<?php

use App\Http\Controllers\Admin\ActivityLogController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\CatalogController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\JobController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\Admin\QuoteController;
use App\Http\Controllers\Admin\RequestController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BlogController as PublicBlogController;
use App\Http\Controllers\Client\CatalogController as ClientCatalogController;
use App\Http\Controllers\Client\DashboardController as ClientDashboardController;
use App\Http\Controllers\Client\InvoiceController as ClientInvoiceController;
use App\Http\Controllers\Client\JobController as ClientJobController;
use App\Http\Controllers\Client\MessageController as ClientMessageController;
use App\Http\Controllers\Client\QuoteController as ClientQuoteController;
use App\Http\Controllers\Client\RequestController as ClientRequestController;
use App\Http\Controllers\HomeController;
use App\Http\Middleware\EnsureAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::redirect('/about', '/#about');
Route::redirect('/contact', '/#contact');
Route::redirect('/how-it-works', '/#how-it-works');
Route::redirect('/portfolio', '/#portfolio');
Route::redirect('/request-quote', '/#quote');
Route::redirect('/services', '/#services');
Route::get('/services/{slug}', fn (string $slug) => redirect('/#services'));

Route::redirect('/blog', '/#blog');
Route::get('/blog/{slug}', [PublicBlogController::class, 'show'])->name('blog.show');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

Route::middleware(['auth', 'client'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [ClientDashboardController::class, 'index'])->name('index');

    Route::get('/requests', [ClientRequestController::class, 'index'])->name('requests.index');

    Route::get('/catalog', [ClientCatalogController::class, 'index'])->name('catalog.index');
    Route::get('/catalog/retired', [ClientCatalogController::class, 'retired'])->name('catalog.retired');

    Route::get('/quotes', [ClientQuoteController::class, 'index'])->name('quotes.index');
    Route::get('/quotes/{quote}', [ClientQuoteController::class, 'show'])->name('quotes.show');
    Route::patch('/quotes/{quote}', [ClientQuoteController::class, 'update'])->name('quotes.update');

    Route::get('/jobs', [ClientJobController::class, 'index'])->name('jobs.index');
    Route::get('/jobs/{job}', [ClientJobController::class, 'show'])->name('jobs.show');

    Route::get('/invoices', [ClientInvoiceController::class, 'index'])->name('invoices.index');

    Route::get('/messages', [ClientMessageController::class, 'index'])->name('messages.index');
    Route::post('/messages', [ClientMessageController::class, 'store'])->name('messages.store');
    Route::get('/messages/{conversation}', [ClientMessageController::class, 'show'])->name('messages.show');
    Route::post('/messages/{conversation}/reply', [ClientMessageController::class, 'reply'])->name('messages.reply');
});

Route::middleware(['auth', EnsureAdmin::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::get('/analytics', [DashboardController::class, 'analytics'])->name('analytics');

    Route::get('/requests', [RequestController::class, 'index'])->name('requests.index');
    Route::patch('/requests/{serviceRequest}', [RequestController::class, 'update'])->name('requests.update');

    Route::get('/quotes', [QuoteController::class, 'index'])->name('quotes.index');
    Route::post('/quotes', [QuoteController::class, 'store'])->name('quotes.store');
    Route::patch('/quotes/{quote}', [QuoteController::class, 'update'])->name('quotes.update');

    Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
    Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');
    Route::patch('/jobs/{job}', [JobController::class, 'update'])->name('jobs.update');

    Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
    Route::post('/catalog', [CatalogController::class, 'store'])->name('catalog.store');
    Route::patch('/catalog/{catalogItem}', [CatalogController::class, 'update'])->name('catalog.update');
    Route::delete('/catalog/{catalogItem}', [CatalogController::class, 'destroy'])->name('catalog.destroy');

    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{conversation}', [MessageController::class, 'show'])->name('messages.show');
    Route::post('/messages/{conversation}/reply', [MessageController::class, 'reply'])->name('messages.reply');

    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::post('/invoices', [InvoiceController::class, 'store'])->name('invoices.store');
    Route::patch('/invoices/{invoice}', [InvoiceController::class, 'update'])->name('invoices.update');

    Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
    Route::get('/blog/create', [BlogController::class, 'create'])->name('blog.create');
    Route::post('/blog', [BlogController::class, 'store'])->name('blog.store');
    Route::get('/blog/{post}/edit', [BlogController::class, 'edit'])->name('blog.edit');
    Route::patch('/blog/{post}', [BlogController::class, 'update'])->name('blog.update');
    Route::delete('/blog/{post}', [BlogController::class, 'destroy'])->name('blog.destroy');

    Route::get('/contacts', [ContactMessageController::class, 'index'])->name('contacts.index');
    Route::patch('/contacts/{contactMessage}', [ContactMessageController::class, 'update'])->name('contacts.update');

    Route::get('/newsletter', [NewsletterController::class, 'index'])->name('newsletter.index');

    Route::get('/users', [UserController::class, 'index'])->name('users.index');

    Route::get('/logs', [ActivityLogController::class, 'index'])->name('logs.index');
});
