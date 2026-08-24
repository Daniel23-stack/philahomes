# Okuhle Homes

Home services web application — **Laravel 11 + Vue 3 (Inertia.js)** + PostgreSQL.

Plumbing, electrical, renovations, interior design, bricklaying, general maintenance, welding, and solar PV in Johannesburg.

## Stack

| Layer | Technology |
|-------|------------|
| Backend | Laravel 11, Eloquent, PostgreSQL |
| Frontend | Vue 3, Inertia.js, Tailwind CSS, Vite |
| Auth | Session-based login (client + admin roles) |

## First-time setup

**Requires PHP 8.2+ and Composer**, or **Docker Desktop** (running).

```powershell
.\setup.ps1
copy .env.example .env
# Edit .env if needed (DB credentials match docker-compose.yml)
docker compose up -d db
php artisan migrate --seed
```

## Run locally

Terminal 1 — frontend assets:

```powershell
npm install
npm run dev
```

Terminal 2 — Laravel server:

```powershell
php artisan serve
```

Open **http://localhost:8000**

**Admin login (after seed):** `admin@philahomes.co.za` / `admin123`

## API endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/contact` | Save contact message + optional email |
| POST | `/api/newsletter` | Newsletter subscribe |
| POST | `/api/requests` | Quote / service request |
| POST | `/api/chat` | AI support chat (needs `OPENAI_API_KEY`) |

## Project structure

```
app/                  Controllers, Models, Services
resources/js/         Vue pages & components (Inertia)
routes/web.php        Public + auth + dashboard + admin
routes/api.php        JSON APIs
database/migrations/  PostgreSQL schema
config/site.php       Business contact details
config/services_catalog.php  Static services list
```

## Notes

- This project **no longer uses Next.js**. The previous React/Prisma stack has been removed.
- Use a **fresh PostgreSQL database** for Laravel (snake_case columns, bigint IDs).
- See `docs/Okuhle-Homes-Web-App-Plan.md` for the original product plan.
