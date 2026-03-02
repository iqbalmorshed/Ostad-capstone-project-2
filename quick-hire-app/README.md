# QuickHire — Frontend

Next.js app for the QuickHire job board: browse jobs, filter by category and location, view job details, and submit applications.

## What this project does

- **Home:** Hero, search, companies, categories, featured jobs, latest jobs.
- **Job list:** Paginated list with search, category, and location filters.
- **Job detail:** Single job page with “Apply” and application form.
- **Application form:** Name, email, resume link, cover note; submits to the backend API.
- **Footer:** Links and newsletter sign-up (UI).

The app talks to the QuickHire NestJS backend via `NEXT_PUBLIC_API_URL`.

## Run locally

**Prerequisites:** Node.js 22+. The backend API should be running (see [quick-hire/README.md](../quick-hire/README.md)).

```bash
# From quick-hire-app/
npm install
npm run dev
```

Open **http://localhost:3000**. The app will call the API at the URL set in `NEXT_PUBLIC_API_URL` (default below).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | No (has default) | Backend API base URL. Must include the path prefix `/api` (e.g. `http://localhost:2021/api`). Used in the browser for all API requests. |

**Default:** If `NEXT_PUBLIC_API_URL` is not set, the app uses `http://localhost:2021/api`. With Docker Compose (root), the backend is on port 2021, so you can run without a `.env`.

**Example `.env.local`:**

```env
NEXT_PUBLIC_API_URL=http://localhost:2021/api
```

For production, set this to the **public** API URL (e.g. `https://api.yourdomain.com/api`). It is baked in at build time.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (default port 3000). |
| `npm run build` | Production build. |
| `npm run start` | Run production build (after `npm run build`). |
| `npm run test:build` | Build only (for CI / build test). Needs `NEXT_PUBLIC_API_URL` set for a real URL, or leave unset to use default. |
| `npm run lint` | Lint. |

## Tech stack

- **Framework:** Next.js 16 (App Router)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS 4  
- **Icons:** lucide-react  

## Project structure

- `app/` — App Router: `page.tsx` (home), `jobs/` (list + `[id]` detail), layout, globals.
- `app/components/` — Shared UI: banner, category, featured/latest jobs, jobs (filters, card, application form), common (Button, Input, Footer, etc.).
- `services/` — API client (`api.ts`, `index.ts` for jobs, categories, applications).
- `types/` — Shared TypeScript types.

## Running with the backend

- **Option 1 — Docker:** From repo root, `docker compose up --build`. Frontend is at http://localhost:2020 and uses the backend at http://localhost:2021/api. All services use **`restart: unless-stopped`** (or you can set **`restart: always`** in `docker-compose.yml`).
- **Option 2 — Manual:** Start the backend (e.g. `cd quick-hire && npm run start:dev`), then here run `npm run dev`. Set `NEXT_PUBLIC_API_URL` to your backend URL (e.g. `http://localhost:2021/api`) if needed.

For full setup, env vars, and restart policy, see the root [README.md](../README.md).
