# PhilaHomes

Web application for PhilaHomes — plumbing, electrical, renovations, interior design, bricklaying, general maintenance, welding, and solar PV in Johannesburg.

## Stack

- **Next.js 14** (App Router), TypeScript, Tailwind CSS
- **Prisma** (SQLite for dev; switch to PostgreSQL for production)
- **NextAuth.js** (credentials; client + admin roles)

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
3. Create database: `npx prisma db push`
4. (Optional) Seed an admin user: `npm run seed`

## Run

- Development: `npm run dev`
- Build: `npm run build`
- Start (production): `npm start`

## Features

- **Public**: Homepage (hero, highlights, services overview, testimonials), Services (list + per-service pages), About, Contact (map, form, social links), How it works, Portfolio, Blog, Request a quote (dynamic form, image upload)
- **Client**: Register/Login, Dashboard (overview, catalog, messages, invoices), quote and job detail pages
- **Admin**: Dashboard, Requests, Quotes, Jobs, Catalog, Messages, Invoices, Analytics, Logs, Blog

See `docs/PhilaHomes-Web-App-Plan.md` for the full plan.
