#!/usr/bin/env bash
# Build test for both backend and frontend. Exit non-zero if any build fails.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo ">>> Building backend (quick-hire)..."
cd quick-hire
npm run test:build
cd "$ROOT"

echo ">>> Building frontend (quick-hire-app)..."
cd quick-hire-app
NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-https://api.example.com/api}" npm run test:build
cd "$ROOT"

echo ">>> Both builds passed."
