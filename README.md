# PhilaHomes

Web application for PhilaHomes — plumbing, electrical, renovations, interior design, bricklaying, general maintenance, welding, and solar PV in Johannesburg.

## Stack

- **Next.js 14** (App Router), TypeScript, Tailwind CSS
- **Prisma** + **PostgreSQL** (required for local and production; use Neon/Supabase/etc. for hosted DB)
- **NextAuth.js** (credentials; client + admin roles)

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set `DATABASE_URL` (Postgres), `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
3. Start Postgres locally (optional): `docker compose up -d` and use the `DATABASE_URL` from `.env.example` comments, or use [Neon](https://neon.tech) / another host
4. Apply schema: `npx prisma migrate dev` (local) or `npx prisma migrate deploy` (CI/production)
5. (Optional) Seed an admin user: `npm run seed`

### Deploy on Vercel

See **[docs/vercel-deploy.md](docs/vercel-deploy.md)** for Postgres setup, env vars, and troubleshooting.

## Run

- Development: `npm run dev`
- Production build: `npm run build` (runs migrations; requires valid `DATABASE_URL`)
- Start (production): `npm start`

## Features

- **Public**: Homepage (hero, highlights, services overview, testimonials), Services (list + per-service pages), About, Contact (map, form, social links), How it works, Portfolio, Blog, Request a quote (dynamic form, image upload)
- **Client**: Register/Login, Dashboard (overview, catalog, messages, invoices), quote and job detail pages
- **Admin**: Dashboard, Requests, Quotes, Jobs, Catalog, Messages, Invoices, Analytics, Logs, Blog

See `docs/PhilaHomes-Web-App-Plan.md` for the full plan.
