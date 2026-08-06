# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Quick Start Commands

```bash
# Install dependencies
pnpm install

# Start development servers (web + API in parallel)
pnpm dev

# Build all packages
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint

# Clean build artifacts and node_modules
pnpm clean
```

---

## Project Architecture

**dshitxyz** is a pnpm monorepo for a brutalist Web3 meme platform with the following structure:

### Workspace Organization

- **`apps/web`** (`@dshit/web`): Next.js 14 frontend deployed on Vercel
  - App Router with TypeScript
  - Wallet integration (RainbowKit, Wagmi)
  - Tailwind CSS + custom design system (see DESIGN_SYSTEM.md)
  - i18n support (en, de, es, fr)
  - Sentry error tracking

- **`apps/api`** (`@dshit/api`): Node.js/Fastify backend (separate Vercel deployment)
  - TypeScript with tsc compilation
  - PostgreSQL via Drizzle ORM
  - JWT authentication
  - CORS + security headers

- **`apps/bots/`**: Discord and Telegram bot integrations (not yet deployed)

- **`packages/ui`**: Shared component library with design system components
  - Button, Card, Alert, StatBox, Mascot
  - CSS Modules for styling
  - Storybook stories for each component

- **`packages/config`**: Shared TypeScript and ESLint configuration

- **`packages/contracts`**: Solidity smart contracts (ERC-20 token on Base L2)

### Monorepo Dependencies

The workspace uses path aliases defined in each app's tsconfig.json:
- **Web app:** `@dshit/ui` → `../../packages/ui/src/index.ts`
- **API:** No direct package imports

Packages are built independently during the workspace build; ensure any changes to shared packages are reflected in dependents.

---

## Development Workflow

### Running Development Servers

```bash
# Terminal 1: Start all dev servers
pnpm dev

# This runs in parallel:
# - apps/web: Next.js on http://localhost:3000
# - apps/api: Fastify on http://localhost:3001
```

### Making Changes

1. **Frontend (apps/web):** Changes hot-reload via Next.js dev server
2. **Shared UI (packages/ui):** Changes require restart of web dev server
3. **API (apps/api):** Changes require restart (tsx watch handles file changes)
4. **Components:** Reference DESIGN_SYSTEM.md for styling guidelines

### Testing

```bash
# Type checking (all packages)
pnpm type-check

# Linting (all packages)
pnpm lint

# Note: E2E tests infrastructure being configured (see playwright.config.ts)
```

---

## Vercel Deployment Configuration

The repository uses **per-project vercel.json** files to manage monorepo deployments:

### Web App Deployment (`apps/web/vercel.json`)

- **buildCommand:** `next build`
- **outputDirectory:** `.next`
- **Environment:** NODE_ENV=production
- **Special handling:** Caching headers for static assets, API rewrites

Vercel automatically:
1. Installs dependencies at workspace root (pnpm install)
2. Sets up monorepo context (resolves @dshit/* packages)
3. Runs buildCommand to build Next.js app

### API Deployment (`apps/api/vercel.json`)

- **buildCommand:** `exit 1` (intentionally fails)
- **Purpose:** Prevents Vercel from treating API as separate deployable project
- **Note:** API is deployed separately or kept as backend service

### Root Configuration

- **Root vercel.json:** DELETED (removed to avoid Vercel auto-detecting multiple projects)
- **Monorepo detection:** Vercel detects via pnpm-workspace.yaml
- **Deployment strategy:** Per-project configuration in each apps/* directory

---

## Build System Details

### Root Build Script

```bash
# Root pnpm build orchestration
"build": "pnpm run pre-build && pnpm -r --parallel run build"
```

This runs:
1. **pre-build script** (`scripts/clean-install.js`): Validates package.json hash and performs clean install if needed
2. **Parallel builds:** All workspace packages build in parallel

### Application-Specific Builds

- **Web:** `next build` → compiles React/TypeScript → `.next/` directory
- **API:** `tsc` → compiles TypeScript → `dist/` directory
- **UI Package:** Built on-demand by dependents during their build

### Development vs Production

- **Dev:** TypeScript with source maps, hot reload enabled
- **Production:** Optimized builds, minified output, disabled source maps (see next.config.js)

---

## Design System Reference

All frontend UI should follow the **brutalist, raw aesthetic** defined in DESIGN_SYSTEM.md:

- **Color Palette:** Shit Yellow (#F4D03F), Poop Brown (#8B4513), Glitch Red, Toxic Green, etc.
- **Typography:** Bebas Neue (display), Space Mono (body), Permanent Marker (accents)
- **Animations:** Glitch effects, shakes, pulses (CSS in DESIGN_SYSTEM.md)
- **Philosophy:** "Ugly is beautiful. The dump is the way."

Reference `DESIGN_SYSTEM.md` and `shitcoin_protocol_v2_poopy.html` for visual guidelines when building new components or pages.

---

## Environment Variables

### Web App (apps/web)

- `API_BASE_URL`: Backend API endpoint (used in next.config.js rewrites)
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry error tracking
- `NODE_ENV`: Set to "production" by Vercel during deployment

### API (apps/api)

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Token signing key
- `PORT`: Server port (default 3001)
- `NODE_ENV`: Runtime environment

---

## Troubleshooting

### Vercel Build Failures

If deployment fails:
1. Check that apps/web/vercel.json exists and is valid JSON
2. Verify pnpm-workspace.yaml defines both "apps/*" and "packages/*"
3. Ensure Next.js build works locally: `cd apps/web && pnpm build`
4. Check Vercel dashboard logs for specific compilation errors

### Monorepo Dependency Issues

If `@dshit/ui` or other packages aren't resolving:
1. Run `pnpm install` at workspace root
2. Verify path aliases in tsconfig.json point to correct locations
3. Restart dev server if files were added to packages/

### TypeScript Errors

Run `pnpm type-check` to catch errors in all packages before committing.

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `pnpm-workspace.yaml` | Defines monorepo workspace scope |
| `apps/web/vercel.json` | Web app deployment configuration |
| `apps/api/vercel.json` | API deployment configuration (intentional failure) |
| `DESIGN_SYSTEM.md` | Complete visual design system and component specs |
| `ROADMAP.md` | Autonomous development roadmap |
| `shitcoin_protocol_v2_poopy.html` | Reference design prototype |

---

## References

- **README.md:** Project overview, tech stack, tokenomics
- **DESIGN_SYSTEM.md:** Complete design system with CSS and component library
- **ROADMAP.md:** Development roadmap and autonomous tasks
- **Next.js Docs:** https://nextjs.org/docs
- **Fastify Docs:** https://www.fastify.io/docs/latest/
- **pnpm Workspaces:** https://pnpm.io/workspaces
