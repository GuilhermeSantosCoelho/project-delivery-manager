# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A NestJS backend application for project delivery management. Currently in initial scaffold state — the domain logic is yet to be built on top of the NestJS foundation.

This projects was made to create projects and manage the tasks deadlines

## Commands

All commands run from the `backend/` directory using `pnpm`.

```bash
# Development
pnpm run start:dev       # Start with watch mode

# Build
pnpm run build           # Compile TypeScript

# Testing
pnpm run test            # Run unit tests
pnpm run test:watch      # Run unit tests in watch mode
pnpm run test:cov        # Run with coverage
pnpm run test:e2e        # Run end-to-end tests

# Code quality
pnpm run lint            # ESLint with auto-fix
pnpm run format          # Prettier formatting
```

To run a single test file:
```bash
pnpm run test -- path/to/file.spec.ts
```

## Architecture

**Framework:** NestJS v11 with TypeScript (ES2023 target)

**Module structure:** NestJS modules with dependency injection. Each feature should be organized as a NestJS module containing a controller, service, and optional DTOs/entities.

**Entry point:** `backend/src/main.ts` — bootstraps the NestJS app on port 3000 (overridable via `PORT` env var).

**Root module:** `backend/src/app.module.ts` — import all feature modules here.

**Testing:**
- Unit tests: `*.spec.ts` files alongside source files, configured in `package.json`
- E2E tests: `backend/test/` directory, configured in `test/jest-e2e.json`
- Uses `ts-jest` for TypeScript compilation during tests

**Code style:** Single quotes, trailing commas (enforced by Prettier via `.prettierrc`). ESLint uses flat config (`eslint.config.mjs`) with TypeScript and Prettier integration.
