# Dhaka Tesla Pool

An MVP car-pooling app with a PostgreSQL database, Express/Prisma API, and Next.js web app.

## Run with Docker

From the repository root:

```powershell
docker compose up --build
```

The web app is at `http://localhost:3000`, the API is at `http://localhost:4000`, and Postgres is published on `localhost:5433`. The API waits for Postgres, applies migrations, and runs the idempotent demo seed before starting. The web image receives `NEXT_PUBLIC_API_URL` at build time.

Stop the stack with `docker compose down`. Add `-v` to also reset the database volume.

## Run Locally

Start Postgres with `docker compose up -d postgres`. Copy `.env.example` to `apps/api/.env` if needed, then run:

```powershell
Set-Location apps/api
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

In a second terminal:

```powershell
Set-Location apps/web
npm run dev
```

The API defaults to port 4000; Next.js defaults to port 3000. `NEXT_PUBLIC_API_URL` can override the web app's API base URL.

## Demo Accounts

All seeded accounts use password `pass1234`:

| Name | Role | Email | Password |
|---|---|---|---|
| Jashim | DRIVER | jashim@example.com | pass1234 |
| Nusrat | PASSENGER | nusrat@example.com | pass1234 |
| Rafiq | PASSENGER | rafiq@example.com | pass1234 |
| Shirin | PASSENGER | shirin@example.com | pass1234 |

Jashim's seeded vehicle has capacity 3 and is online. The Prisma `Vehicle` model has no name field, so “Bullet” is a demo label and is not stored in the database.
