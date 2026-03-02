# QuickHire — Backend

NestJS REST API for the QuickHire job board: authentication (JWT), role-based access, jobs CRUD, and job applications.

## What this project does

- **Auth:** Register, login, refresh token, logout (JWT access + refresh).
- **Roles:** `user`, `admin`, `super-admin` with route guards.
- **Jobs:** Public-style list/detail (with search, category, location); create/delete (admin).
- **Applications:** Submit application for a job (authenticated user).
- **Users:** List, get, update role, delete (super-admin).
- **Rate limiting:** Throttler with per-route limits; public job routes relaxed for search.
- **API docs:** Swagger at `/api/docs`.

## Run locally

**Prerequisites:** Node.js 22+, MongoDB running (local or remote).

```bash
# From quick-hire/
cp .env.example .env
# Edit .env: set MONGODB_URI and JWT_* secrets (see below)

npm install
npm run start:dev
```

API runs at **http://localhost:3000** by default (or the port you set). Global prefix is `/api` (e.g. `http://localhost:3000/api/jobs`).

**Seed fake jobs (optional):**

```bash
npm run seed:jobs
```

Uses `MONGODB_URI` from `.env` and inserts sample jobs into MongoDB.

## Environment variables

Create a `.env` from `.env.example`. Main variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string (e.g. `mongodb://localhost:27017/quick-hire`). |
| `JWT_ACCESS_SECRET` | Yes | Secret for signing access tokens (min 32 characters). |
| `JWT_REFRESH_SECRET` | Yes | Secret for signing refresh tokens (different from access). |
| `JWT_ACCESS_EXPIRES` | No | Access token TTL (default `15m`). |
| `JWT_REFRESH_EXPIRES` | No | Refresh token TTL (default `7d`). |
| `PORT` | No | Server port (default `3000`). |
| `NODE_ENV` | No | e.g. `development` or `production`. |

Example `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/quick-hire
JWT_ACCESS_SECRET=your-access-secret-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-different-from-access
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Run with watch mode. |
| `npm run build` | Production build → `dist/`. |
| `npm run start:prod` | Run production build (`node dist/main`). |
| `npm run test` | Unit tests. |
| `npm run test:build` | Build only (for CI / build test). |
| `npm run seed:jobs` | Insert fake jobs into MongoDB. |
| `npm run lint` | Lint and fix. |

## Tech stack

- **Runtime:** Node.js  
- **Framework:** NestJS 11 (Express)  
- **Language:** TypeScript 5  
- **Database:** MongoDB (Mongoose 9)  
- **Auth:** JWT (Passport), bcrypt  
- **Validation:** class-validator, ValidationPipe  
- **Docs:** Swagger/OpenAPI 3  
- **Rate limit:** @nestjs/throttler  

## API overview

| Area | Endpoints | Auth / Role |
|------|-----------|-------------|
| **Auth** | `POST /api/auth/register`, `login`, `refresh`, `logout` | Public / body |
| **Users** | `GET /api/users`, `GET /api/users/:id`, `PATCH .../role`, `DELETE ...` | Bearer, super-admin |
| **Jobs** | `GET /api/jobs` (list/search), `GET /api/jobs/featured`, `GET /api/jobs/latest`, `GET /api/jobs/:id` | Public (no strict throttle) |
| **Jobs** | `POST /api/jobs`, `DELETE /api/jobs/:id` | Bearer, admin+ |
| **Applications** | `POST /api/applications` | Bearer, user+ |

**Swagger UI:** `GET /api/docs` (set Bearer token in the UI for protected routes).

## Docker / Restart policy

When run via Docker Compose (see root [README.md](../README.md)), the backend service uses **`restart: unless-stopped`**: the container restarts on failure or after a host reboot, and stays stopped only if you stop it manually. You can use **`restart: always`** instead if you prefer (both are valid).

## Structure

- `src/auth/` — Register, login, refresh, JWT strategy and guard.  
- `src/users/` — User CRUD and role update.  
- `src/job/` — Job entity, repository, service, controller (list, featured, latest, by id, create, delete).  
- `src/application/` — Application submit.  
- `src/common/` — Base repository, `@Roles()`, RolesGuard.  

For full architecture and security notes, see the root [README.md](../README.md) and the sections above.
