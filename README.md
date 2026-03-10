# Project Delivery Manager

A monorepo for managing project delivery — track projects, deadlines, and tasks.

## Structure

```
project-delivery-manager/
├── backend/    # NestJS API (port 3000)
└── frontend/   # Next.js app (port 3001)
```

## Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) v10+ (`npm install -g pnpm`)

## Getting started

Install all dependencies from the root:

```bash
pnpm install
```

## Running the project

### Both apps at once (recommended)

```bash
pnpm dev
```

This uses Turborepo to start both the backend and frontend in parallel.

### Individually

```bash
# Backend only (http://localhost:3000)
cd backend && pnpm run start:dev

# Frontend only (http://localhost:3001)
cd frontend && pnpm run dev
```

## Other commands

Run from the **root** to apply across all packages:

```bash
pnpm build   # Build backend and frontend
pnpm test    # Run all tests
pnpm lint    # Lint all packages
```

Or scope to a single package:

```bash
pnpm --filter @pdm/backend test
pnpm --filter my-app lint
```
