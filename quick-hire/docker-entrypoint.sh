#!/bin/sh
# Wait for MongoDB to be reachable before starting Nest (avoids getaddrinfo EAI_AGAIN race).
set -e
echo "Waiting for MongoDB at ${MONGO_HOST:-mongo}:${MONGO_PORT:-27017}..."
while ! nc -z "${MONGO_HOST:-mongo}" "${MONGO_PORT:-27017}" 2>/dev/null; do
  sleep 2
done
echo "MongoDB is up. Starting backend..."
exec "$@"
