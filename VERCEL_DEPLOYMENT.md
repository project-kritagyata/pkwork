# Vercel Deployment Guide — Project Kritagyata

## Overview

This is a **pure static React + Vite SPA** (no backend). Vercel serves the built output as a static site with client-side routing via rewrites.

---

## Quick Deploy

### Option A — Vercel Dashboard (recommended)

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel will auto-detect `vercel.json` at the root and apply all settings automatically.
4. Click **Deploy** — no extra configuration needed.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Exact Vercel Project Settings

These match what `vercel.json` sets — no manual changes needed in the dashboard:

| Setting | Value |
|---|---|
| **Framework Preset** | Other (None) |
| **Root Directory** | `.` (repository root) |
| **Build Command** | `pnpm --filter @workspace/project-kritagyata run build` |
| **Output Directory** | `artifacts/project-kritagyata/dist/public` |
| **Install Command** | `pnpm install` |
| **Node.js Version** | 20.x or 22.x |

---

## Environment Variables

This project has **no required environment variables** for production.

The Vite config uses these with sensible defaults:

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | Dev server port only — not used in production builds |
| `BASE_PATH` | `/` | Vite `base` config — use `/` for Vercel root deployment |

If you ever deploy to a sub-path (e.g. `https://example.com/kritagyata/`), set `BASE_PATH=/kritagyata/` in Vercel's environment variables.

---

## SPA Routing

The `vercel.json` includes a rewrite rule so direct URL access and page refreshes work:

```json
{ "source": "/(.*)", "destination": "/index.html" }
```

This handles all routes: `/our-work`, `/gallery`, `/contact`, `/project/:id`, etc.

---

## File Structure for Vercel

```
/ (repository root)
├── vercel.json                         ← Vercel config (build + routing)
├── pnpm-workspace.yaml                 ← pnpm monorepo config
├── package.json                        ← workspace root scripts
├── artifacts/
│   └── project-kritagyata/
│       ├── package.json                ← frontend dependencies
│       ├── vite.config.ts              ← Vite config (no Replit deps)
│       ├── tsconfig.json               ← TypeScript config
│       ├── index.html                  ← HTML entry point
│       ├── public/                     ← static assets (images, QR code, logo)
│       └── src/                        ← React source code
│           ├── main.tsx
│           ├── App.tsx
│           ├── index.css
│           ├── data/projects.ts
│           ├── components/
│           └── pages/
└── lib/                                ← shared workspace libs (unused by frontend)
```

---

## What Was Changed to Make It Vercel-Compatible

### `artifacts/project-kritagyata/vite.config.ts`
**Before:** threw `Error: PORT environment variable is required` and `Error: BASE_PATH environment variable is required` — this crashed the Vercel build immediately.  
**After:** both vars are optional with defaults (`PORT=3000`, `BASE_PATH=/`). Removed three Replit-only plugins:
- `@replit/vite-plugin-runtime-error-modal` — Replit overlay, not useful on Vercel
- `@replit/vite-plugin-cartographer` — Replit dev tool, Vercel-incompatible
- `@replit/vite-plugin-dev-banner` — Replit UI component, not needed

### `artifacts/project-kritagyata/package.json`
**Removed devDependencies:**
- `@replit/vite-plugin-cartographer` — Replit-only, removed from imports
- `@replit/vite-plugin-dev-banner` — Replit-only, removed from imports
- `@replit/vite-plugin-runtime-error-modal` — Replit-only, removed from imports
- `@workspace/api-client-react` — workspace lib not imported anywhere in source; removing it avoids an unnecessary dependency chain

**Scripts:** unchanged — `build` already calls `vite build --config vite.config.ts` which works correctly now that env vars are optional.

### `artifacts/project-kritagyata/tsconfig.json`
**Removed** the `references` block pointing to `../../lib/api-client-react` — the frontend source imports nothing from that lib, so the reference was dead weight that required building an extra library before typechecking.

### `vercel.json` (new file)
Created at repository root. Tells Vercel:
- Which package to build and where its output goes
- To use `pnpm install` (monorepo-aware)
- SPA rewrite rule for client-side routing

### `pnpm-lock.yaml`
Updated automatically after `pnpm install` to reflect the three removed Replit devDependencies.

---

## Custom Domain

1. In the Vercel dashboard → **Settings → Domains**.
2. Add your domain (e.g. `projectkritagyata.org`).
3. Update your DNS with the CNAME/A records Vercel provides.
4. SSL is provisioned automatically.

---

## Verify Build Locally Before Pushing

```bash
# Install deps
pnpm install

# Build (exactly what Vercel runs)
pnpm --filter @workspace/project-kritagyata run build

# Preview the built output locally
cd artifacts/project-kritagyata && npx serve dist/public
```

Expected output:
```
✓ 52 modules transformed.
dist/public/index.html
dist/public/assets/index-*.css
dist/public/assets/index-*.js
✓ built in ~2.5s
```
