#!/bin/bash
set -e

echo "==> Installing dependencies..."
pnpm install --no-frozen-lockfile

echo "==> Building project..."
cd artifacts/project-kritagyata
./node_modules/.bin/vite build --config vite.config.ts
cd ../..

echo "==> Copying output to dist/..."
mkdir -p dist
cp -r artifacts/project-kritagyata/dist/. dist/

echo "==> Build complete. Output:"
ls dist/
