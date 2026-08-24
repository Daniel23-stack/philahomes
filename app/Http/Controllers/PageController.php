<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('About');
    }

    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    public function howItWorks(): Response
    {
        return Inertia::render('HowItWorks');
    }

    public function portfolio(): Response
    {
        return Inertia::render('Portfolio');
    }

    public function requestQuote(): Response
    {
        return Inertia::render('RequestQuote', [
            'services' => config('services_catalog.services'),
        ]);
    }

    public function servicesIndex(): Response
    {
        return Inertia::render('Services/Index', [
            'services' => config('services_catalog.services'),
        ]);
    }

    public function servicesShow(string $slug): Response
    {
        $service = collect(config('services_catalog.services'))->firstWhere('slug', $slug);
        abort_unless($service, 404);

        return Inertia::render('Services/Show', ['service' => $service]);
    }
}
