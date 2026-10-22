# Source export - how to rebuild and run this project

This archive contains the complete application source minus local secrets,
build output and installed dependencies.

## What is inside

```
src/                     React 19 + Vite frontend and Convex backend
  src/convex/            Convex schema, queries, mutations, auth
  src/components/        UI (shadcn/ui primitives in components/ui)
  src/pages/, hooks/, lib/
public/                  static assets (logo, web manifest)
index.html               Vite entry HTML
vite.config.ts           Vite + Tailwind v4 config
tsconfig*.json           TypeScript configs
components.json          shadcn/ui config
convex.json              Convex functions directory config
package.json             dependencies and scripts
bun.lock, package-lock.json
eslint.config.js, postcss.config.cjs, .prettierrc, .prettierignore, .gitignore
main.ts                  optional Deno static-file server for the built `dist/`
EXPORT-README.md          this file
env-and-secrets.md        environment variable NAMES only (rename to .env.example)
```

Excluded on purpose: `node_modules/`, `dist/`, `isolate/`, `.git/`, and every
`.env*` file (including `.env.local`). No API keys, tokens or passwords are
present.

## Setup

1. Install Bun (https://bun.sh) - or use npm with `npm install`.
2. `bun install`
3. Create your environment file from the template:
   `cp env-and-secrets.md .env.example` then copy it to `.env.local` and fill in
   the values (at minimum `CONVEX_DEPLOYMENT` and `VITE_CONVEX_URL`).
4. Link a Convex deployment: `bunx convex dev --once` (authenticates the CLI and
   generates `src/convex/_generated/`).
5. Set the backend variables listed in `env-and-secrets.md` with
   `bunx convex env set NAME value`.
6. Start the app: `bun run dev` (Vite dev server + Convex dev watcher).

## Production build

`bun run build` runs `tsc -b && vite build` and writes to `dist/`.
Any static host works for `dist/` (SPA fallback to `index.html`), or run the
bundled `main.ts` with Deno to serve `dist/` plus the SPA fallback.

## Notes

- The generated Convex client (`src/convex/_generated/`) is committed, but
  running `bunx convex dev --once` regenerates it against your own deployment.
- Auth uses Convex Auth with email OTP; `SITE_URL` must match the deployed URL
  for OTP sign-in to work.
