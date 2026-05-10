
## Live Icon Preview Playground

A new interactive section sits between the hero and the generator. It loads a built-in sample icon (or the user's uploaded icon, if any), and lets visitors play with three controls while watching real platform tiles update in real time.

### Layout

```text
┌──────────────────────── Section: "See it live" ───────────────────────┐
│  Kicker · Title · One-line subtitle                                   │
│                                                                       │
│  ┌── Controls (left, 2/5) ──┐   ┌── Live tiles (right, 3/5) ──────┐  │
│  │ Background color swatches │   │  iOS  │ Android │ macOS │ Web   │  │
│  │ Padding slider (0–25%)    │   │ ▢ rounded   ◯ circle   ▭ tile  │  │
│  │ Corner radius slider      │   │ Tiles animate on every change   │  │
│  │ "Use sample / Use mine"   │   │ Subtle device chrome around each│  │
│  │ "Send to generator" CTA   │   │                                 │  │
│  └───────────────────────────┘   └─────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────┘
```

### Behavior

- On mount: load a bundled sample SVG/PNG icon. If `img` from the generator is present, default to "Use mine".
- Controls (all client-side, no backend):
  - Background: 6 preset swatches + transparent.
  - Padding: 0–25% (safe-area inset around the icon).
  - Corner radius: 0–50% (visual mask only; doesn't change export).
- Tiles re-render via a single `<canvas>` per platform mask shape (squircle / circle / rounded-square / square). Use `requestAnimationFrame` debounce so dragging sliders stays smooth.
- Each tile sits inside a minimal device frame (CSS only) to feel tactile: iPhone home-screen tile, Android adaptive circle, macOS dock squircle, favicon-on-browser-tab.
- "Send to generator" scrolls to `#generator` and, if the user has uploaded an icon, the playground state is purely visual (export uses the original icon untouched). If no upload, it triggers the file picker.
- Reduced motion: respect `prefers-reduced-motion` — fade only, no scale bounce.

### Visual style

- Reuse existing tokens: `bg-card`, `border-border`, `rounded-[2rem]`, `font-display`, primary CTA pill matching hero.
- Subtle entrance: tiles fade/scale in with a small stagger when the section enters viewport (IntersectionObserver, no new dependency).
- Dark/light themes work via existing semantic tokens.

### i18n

Add a new `demo.*` namespace to the translation files used by `useTranslation()` (kicker, title, subtitle, control labels, CTA). Mirror the existing key style in `src/lib/i18n.ts`.

### Technical details

- New component: `src/components/IconPlayground.tsx` (self-contained, no props required; optional `sourceImg?: HTMLImageElement` so `Index.tsx` can pass the user's uploaded image).
- New helper: `src/lib/playgroundRender.ts` with `drawTile(ctx, { img, bg, padding, radius, mask })` reusing the canvas patterns from `src/lib/iconGenerator.ts` (no duplication of platform sizing logic — masks only).
- Bundled sample asset: `src/assets/sample-icon.png` (1024×1024) imported as ES module.
- Mount in `src/pages/Index.tsx` directly after `<header>` and before the `#generator` grid; pass `img ?? undefined`.
- State: local `useState` for `bg`, `padding`, `radius`, `useUserIcon`. No global state, no new packages.
- Performance: a single shared `OffscreenCanvas` (fallback to regular canvas) renders the base composite once per change; tile canvases just blit + apply their mask.

### Out of scope

- No changes to the export/zip pipeline — playground is preview-only.
- No new routes, no backend, no analytics.
