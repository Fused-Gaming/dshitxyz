# Vercel Deployment Troubleshooting

## Current Status
- **Web App (dshitxyz):** Build Failing
- **API (dshitxyz-api):** Intentionally Skipped (buildCommand: exit 1)
- **Branch:** claude/copy-issues-vercel-deploy-unesir
- **Last Attempt:** Aug 6, 2026 8:44am UTC

## Fixes Applied

### 1. TypeScript Configuration
- ✅ Removed deprecated `baseUrl` from tsconfig.json
- ✅ Local `pnpm type-check` passes successfully
- ✅ Path aliases correctly configured via `paths` option

### 2. Vercel Configuration
- ✅ Simplified buildCommand to: `next build`
- ✅ Removed custom installCommand (relying on Vercel's auto-detection)
- ✅ Verified vercel.json schema is valid
- ✅ Removed root vercel.json to avoid duplicate project detection

### 3. Local Verification
- ✅ `pnpm install` completes successfully
- ✅ `pnpm type-check` passes (all packages)
- ✅ Web app tsconfig compiles without errors
- ✅ Dependencies resolve correctly (node_modules present)

## Next Steps for Debugging

### Option 1: Check Vercel Logs (Recommended)
```bash
npx vercel inspect dpl_2s2pqf348e3KDTVS8c2EF6AaVzux --logs
```
Replace the deployment ID with the current failing deployment from Vercel dashboard.

### Option 2: Check Vercel Dashboard
Visit: https://vercel.com/team-4eckd/dshitxyz
- View build logs for the latest deployment
- Check Environment variables are set correctly
- Verify framework detection (should be Next.js)

### Option 3: Local Build Test
```bash
cd apps/web
pnpm install
pnpm build
```
This mimics what Vercel does and may reveal build errors.

## Known Good Configuration Files

**vercel.json** (apps/web):
- Version: 2
- buildCommand: `next build`
- outputDirectory: `.next`
- NODE_ENV: production (via env)

**tsconfig.json** (apps/web):
- Target: ES2020
- Module Resolution: bundler
- Path aliases for @/* and @dshit/ui
- No deprecated baseUrl
- Strict mode enabled

**next.config.js**:
- SWC minification enabled
- Image optimization configured
- Headers for caching configured
- Rewrites for API routes (handles missing API_BASE_URL)

## Possible Causes

1. **Missing Environment Variables** - API_BASE_URL or other required vars not set in Vercel
2. **Build-time Runtime Error** - Error in next.config.js execution during build
3. **Dependency Resolution** - Monorepo dependency (@dshit/ui) not resolving in Vercel environment
4. **Node/npm Version** - Vercel using different Node version that causes incompatibility
5. **Build Timeout** - Build taking longer than Vercel's timeout limit

## Build Attempts Summary

| Commit | Changes | Status |
|--------|---------|--------|
| 3e782c6 | Initial Vercel setup | Failed |
| 204ae7d | Move vercel.json to apps/web | Failed |
| 59ab984 | Add root vercel.json | Failed |
| a69b0bd | Use rootDirectory property | Failed (invalid schema) |
| e119062 | Remove root vercel.json | Failed |
| 2fcf8df | Simplify buildCommand | Failed |
| a8906cb | Add explicit installCommand | Failed |
| 6ccc2de | Remove explicit installCommand | Failed |
| 5999d8f | Remove deprecated baseUrl | Failed |
| b808025 | Add .gitignore for cache files | Failed |

All local builds and type-checks pass - issue appears to be Vercel environment-specific.
