# SellerSim

An interactive seller-operations dashboard simulator for exploring inventory, pricing, advertising, orders, reports, payments, and account health.

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

The simulator provides a seller-operations workspace with navigation across catalog, inventory, pricing, advertising, orders, reports, payments, performance, growth, brands, and settings.

## User preferences

Naming: this app must never reference Amazon, Amazon Seller Central, or Seller Central by name, anywhere — not in UI copy, code comments, variable/component names, file names, replit.md, or any other project file. This is an original app inspired by common patterns in marketplace seller dashboards generally, not a replica or clone of any specific real product. Use generic terms instead: "the platform", "the marketplace", "fulfillment center" (not "Amazon"/"FBA"), "product ID" (not "ASIN"), "Sponsored Listings" (not "Sponsored Products"), etc. Do not reintroduce these terms in future edits, refactors, or auto-generated documentation, even if older code or docs elsewhere in the repo still contain them.

## Gotchas

- Use the managed artifact workflows for previews; they provide the required `PORT` and `BASE_PATH` values.
- Install workspace dependencies with `pnpm install --frozen-lockfile` after a fresh import.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
