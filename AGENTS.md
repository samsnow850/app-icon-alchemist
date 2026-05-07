# AGENTS.md

## Cursor Cloud specific instructions

This is a **client-side only** React + Vite + TypeScript web app (App Icon Alchemist / Icon Forge). There is no backend, no database, and no external services. All image processing runs in the browser via the Canvas API.

### Quick reference

- **Dev server:** `npm run dev` — starts Vite on port 8080
- **Tests:** `npm run test` — runs Vitest (currently 1 trivial test)
- **Lint:** `npm run lint` — ESLint 9 with TypeScript-ESLint. Note: the codebase has 3 pre-existing lint errors in shadcn/ui generated files (`command.tsx`, `textarea.tsx`, `tailwind.config.ts`); these are not regressions.
- **Build:** `npm run build` — production build to `dist/`

### Caveats

- The Vite config binds to `host: "::"` (IPv6 any), so `curl http://localhost:8080` works for health checks.
- The `lovable-tagger` dev dependency plugin (`componentTagger`) only activates in development mode; it is harmless.
- The app uses i18n with 11 languages and URL-based locale routing (e.g., `/en/`, `/es/`). The root `/` redirects based on browser language detection.
