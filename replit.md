# Amazon Seller Central Simulator

An interactive Amazon Seller Central-style dashboard simulator for exploring seller operations, inventory, pricing, advertising, orders, reports, payments, and account health.

## Run & Operate

- `pnpm --filter @workspace/seller-central run dev` — run the main web app
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/mockup-sandbox run dev` — run the component preview sandbox
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Database-backed features require `DATABASE_URL`; the current simulator dashboard can load without it.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/seller-central` — main React/Vite web application
- `artifacts/api-server` — Express API server mounted at `/api`
- `artifacts/mockup-sandbox` — isolated component preview app
- `lib/api-spec/openapi.yaml` — API contract source
- `lib/db` — Drizzle/PostgreSQL package
- `attached_assets` — imported visual assets

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

The simulator reproduces a seller operations workspace with navigation across catalog, inventory, pricing, advertising, orders, reports, payments, performance, growth, brands, and settings.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Use the managed artifact workflows for previews; they provide the required `PORT` and `BASE_PATH` values.
- Install workspace dependencies with `pnpm install --frozen-lockfile` after a fresh import.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
