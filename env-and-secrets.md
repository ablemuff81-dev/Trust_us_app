# Environment variables (NAMES ONLY)

Copy this file to `.env.example` (or `.env.local`) and fill in your own values.
No real secrets are included in this archive.

## Client side (Vite - bundled into the browser)

| Variable | Purpose |
| --- | --- |
| `VITE_CONVEX_URL` | URL of your Convex deployment, e.g. `https://your-deployment.convex.cloud` |
| `VITE_VLY_APP_ID` | Optional. Freebuff/VLY app id used by the instrumentation overlay |
| `VITE_VLY_MONITORING_URL` | Optional. Freebuff/VLY monitoring endpoint |

## Convex CLI

| Variable | Purpose |
| --- | --- |
| `CONVEX_DEPLOYMENT` | Name of the Convex deployment the CLI pushes to (`bunx convex dev`) |

## Convex backend runtime

Set these on the deployment itself with `bunx convex env set NAME value`:

| Variable | Purpose |
| --- | --- |
| `CONVEX_SITE_URL` | HTTP actions URL of the deployment (Convex Auth) |
| `SITE_URL` | Public URL of the hosted app (auth redirects / emails) |
| `JWKS` | Convex Auth JWT verification keys |
| `JWT_PRIVATE_KEY` | Convex Auth JWT signing key |
| `VLY_CONVEX_AUTH_ISSUER` | Optional auth issuer domain (defaults to `https://freebuff.com`) |

## Optional integrations (VLY gateway used by email OTP)

| Variable | Purpose |
| --- | --- |
| `VLY_INTEGRATION_KEY` | Integration key for the AI / email / payments gateway |
| `VLY_INTEGRATION_BASE_URL` | Gateway base URL |
