# Backend (NestJS) — multi-stage optimised build

# ── Stage 1: install ALL deps ──
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── Stage 2: build ──
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ── Stage 3: production-only deps ──
FROM node:22-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ── Stage 4: final runtime image ──
FROM node:22-alpine AS runner
RUN apk add --no-cache netcat-openbsd
WORKDIR /app

# Copy only what's needed at runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder  /app/dist          ./dist
COPY package.json ./
COPY docker-entrypoint.sh ./

EXPOSE 3000

ENTRYPOINT ["sh", "docker-entrypoint.sh"]
CMD ["node", "dist/src/main"]
