# Deploy PhilaHomes on Vercel

**Free production stack (recommended):** **[Vercel](https://vercel.com)** (Hobby plan — free for personal projects) + **[Neon](https://neon.tech)** or **[Supabase](https://supabase.com)** (free Postgres). This app needs Postgres; SQLite cannot run reliably on Vercel.

Vercel runs Next.js in serverless functions. **SQLite does not work** for production (the filesystem is ephemeral), so this project uses **PostgreSQL** via `DATABASE_URL`.

## Already imported the repo on Vercel?

Do this in order:

1. **Create a Postgres database** (e.g. [Neon](https://neon.tech) — free) and copy the connection string (use **pooled** URL if offered).
2. In Vercel: **Project → Settings → Environment Variables** — add `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` (see table below). Scope: **Production** (and **Preview** if you use previews with a DB).
3. **Redeploy** after saving env vars: **Deployments → … on latest → Redeploy** (or push a commit). Builds need `DATABASE_URL` during `prisma migrate deploy`.
4. Open your **`.vercel.app`** URL. If login fails, confirm `NEXTAUTH_URL` matches that URL exactly (no trailing slash).
5. **Optional:** run `npm run seed` locally with production `DATABASE_URL` to create the admin user (`admin@philahomes.co.za` / `admin123` unless you set `ADMIN_PASSWORD` when seeding).

## 1. Create a Postgres database

Use any hosted Postgres. Common choices:

- **[Neon](https://neon.tech)** — free tier, works well with Vercel and Prisma.
- **[Supabase](https://supabase.com)** — Postgres + extras.
- **[Vercel Postgres](https://vercel.com/storage/postgres)** — if available on your plan.

Create a database and copy the **connection string**. It usually looks like:

```txt
postgresql://USER:PASSWORD@HOST.region.aws.neon.tech/DBNAME?sslmode=require
```

Use the **pooled** / **transaction** URL if the provider offers one (recommended for serverless).

## 2. Push the project to GitHub

Connect the repo to Vercel: **Import Project** → select the repository → Framework Preset: **Next.js**.

## 3. Environment variables (Vercel → Project → Settings → Environment Variables)

Add for **Production** (and Preview if you want a staging DB):

| Name | Example / notes |
|------|------------------|
| `DATABASE_URL` | Your Postgres URL. Use SSL (`?sslmode=require` if not already in the string). See [Neon quick steps](#neon-quick-steps) below. |
| `NEXTAUTH_SECRET` | Random string, e.g. `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Your production site URL, e.g. `https://your-project.vercel.app` (no trailing slash). Update this when you add a custom domain. |
| `OPENAI_API_KEY` | Optional; only if you use the AI chat feature. |

### Neon quick steps

1. Create a free account at **[neon.tech](https://neon.tech)**.
2. **Create a project** → open **Dashboard → Connection details**.
3. Copy **`DATABASE_URL`** (use the **pooled** / **transaction** string if Neon offers two; it works better with serverless on Vercel).
4. Add that value to Vercel → **Environment variables** as `DATABASE_URL` (Production), then **Redeploy**.

**Important:** After the first deployment, set `NEXTAUTH_URL` to the **exact** URL Vercel assigns (or your custom domain). Mismatched URLs cause login/callback issues.

## 4. Deploy

Trigger a deployment. The build runs:

```bash
prisma generate && prisma migrate deploy && next build
```

`prisma migrate deploy` applies migrations to Postgres, so `DATABASE_URL` must be set **before** the build completes.

## 5. Seed data (optional)

From your machine (with production `DATABASE_URL` in env, or using Neon’s SQL editor only for manual inserts):

```bash
set DATABASE_URL=postgresql://...   # Windows PowerShell: $env:DATABASE_URL="..."
npm run seed
```

This creates the admin user and demo data. Default admin password comes from `ADMIN_PASSWORD` or `admin123` (see `prisma/seed.js`).

## 6. Custom domain (optional)

In Vercel → **Domains**, add your domain, then set `NEXTAUTH_URL` to `https://yourdomain.com`.

## Troubleshooting

- **Build fails on `prisma migrate deploy`:** Check `DATABASE_URL` is valid and the database allows connections from Vercel’s IPs (Neon/Supabase usually allow all by default with SSL).
- **Login redirects wrong:** Fix `NEXTAUTH_URL` to match the URL in the browser.
- **Prisma connection errors at runtime:** Use a **pooled** connection string for serverless, or enable [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) if you hit connection limits.
