# QuickHire (Job-Task)

A full-stack job board: **QuickHire** lets users browse jobs, filter by category and location, and submit applications. The backend is a NestJS REST API with JWT auth and MongoDB; the frontend is a Next.js app.

## Project structure

| Directory       | Description |
|----------------|-------------|
| `quick-hire/`  | Backend — NestJS API (auth, jobs, applications, users) |
| `quick-hire-app/` | Frontend — Next.js app (home, job list, job detail, application form) |
| `scripts/`     | Root scripts (e.g. `build-test.sh` for build verification) |

## Run locally

### Option 1: Docker (recommended)

From the repo root:

```bash
# Copy env and adjust if needed (see Environment variables below)
cp quick-hire/.env.example .env

# Start MongoDB, backend, and frontend
docker compose up --build
```

- **Frontend:** http://localhost:2020  
- **Backend API:** http://localhost:2021  
- **Swagger docs:** http://localhost:2021/api/docs  

**Restart policy:** All services use `restart: unless-stopped` so containers restart on failure or after a host reboot, and stay stopped only if you stop them manually. For always-on behaviour you can use `restart: always` instead (both are valid).  

### Option 2: Run backend and frontend separately

**Prerequisites:** Node.js 22+, MongoDB (local or remote).

1. **Backend**

   ```bash
   cd quick-hire
   cp .env.example .env
   # Edit .env: set MONGODB_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET
   npm install
   npm run start:dev
   ```

   API runs at http://localhost:3000 (or the port in your env). Default in Nest is 3000; if you use 3001, set that in the frontend env.

2. **Frontend**

   ```bash
   cd quick-hire-app
   npm install
   # Optional: set NEXT_PUBLIC_API_URL if backend is not at http://localhost:2021/api
   npm run dev
   ```

   App runs at http://localhost:3000 (Next.js default). If the backend is on 2021, set `NEXT_PUBLIC_API_URL=http://localhost:2021/api` (or use the default in code).

3. **Seed jobs (optional)**  
   From `quick-hire/`: `npm run seed:jobs` (requires `MONGODB_URI` in `.env`).

## Environment variables

### Root / Docker

When using Docker Compose, you can put these in a root `.env` (or pass them into compose). The backend and frontend containers read from there.

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes (prod) | MongoDB connection string. Dev default in compose: `mongodb://mongo:27017/quick-hire` |
| `JWT_ACCESS_SECRET` | Yes (prod) | Secret for access JWT (min 32 chars). Dev default in compose is set. |
| `JWT_REFRESH_SECRET` | Yes (prod) | Secret for refresh JWT. Dev default in compose is set. |
| `JWT_ACCESS_EXPIRES` | No | Access token TTL (e.g. `15m`). |
| `JWT_REFRESH_EXPIRES` | No | Refresh token TTL (e.g. `7d`). |
| `NEXT_PUBLIC_API_URL` | For frontend | Public API base URL (e.g. `http://localhost:2021/api`). Used by the browser to call the backend. |

### Backend (`quick-hire/`)

See `quick-hire/README.md` and `quick-hire/.env.example`. Main variables: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`.

### Frontend (`quick-hire-app/`)

See `quick-hire-app/README.md`. Main variable: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:2021/api` if unset).

## Production

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

Set in `.env`: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, and `NEXT_PUBLIC_API_URL` (the **public** API URL users’ browsers will use).

**Restart policy:** Same as dev: `restart: unless-stopped` (or `restart: always` if you prefer).

## Build test

From repo root, run both backend and frontend builds:

```bash
npm run test:build
```

Requires Node 22+ and `npm install` in both `quick-hire` and `quick-hire-app`. For the frontend build, `NEXT_PUBLIC_API_URL` is optional (defaults to `https://api.example.com/api` in the script).

## More details

- **Backend:** [quick-hire/README.md](quick-hire/README.md) — API, auth, RBAC, endpoints.  
- **Frontend:** [quick-hire-app/README.md](quick-hire-app/README.md) — app structure and run instructions.
