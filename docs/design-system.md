# Hexary Blueprint — Design System

The developer-handoff companion to the living reference at `/styleguide` (noindex,
excluded from sitemap and robots). Source of truth for values is `src/app/globals.css`;
this document explains the rules. Scope decisions live in `docs/redesign-plan.md` §4.

## Colour tokens

All colors are `@theme` tokens in `globals.css` — never hardcode a hex in a component.
Measured WCAG ratios (from the Phase 1 validation pass):

| Token | Value | Role | Measured contrast |
|---|---|---|---|
| `base` | `#F5F3EE` | warm paper canvas | ink on base 16.8:1 |
| `base-2` | `#EBE8DF` | alternate sections | ink on base-2 15.2:1 |
| `contrast` | `#14130F` | ink — text + structure | — |
| `contrast-2` | `#0C0B09` | dark section background | base on it 17.7:1 |
| `surface-dark` | `#191813` | cards/panels on dark | — |
| `accent` | `#5B45F5` | purple signal | 5.2:1 on base, 4.7:1 on base-2 ✓ AA |
| `accent-hi` | `#8B7BFF` | signal on dark | 6.0:1 on contrast-2, 5.4:1 on surface-dark |
| `grey-100` | `#E2DDD1` | hairlines on light | decorative |
| `grey-200` | `#D1CCBE` | hairlines/fills on light | decorative |
| `grey-300` | `#B5AF9F` | body text on dark | 9.0:1 on contrast-2, 8.1:1 on surface-dark |
| `grey-500` | `#8A8577` | muted on dark **only** | 5.3:1 on contrast-2 ✓ / **3.3:1 on base ✗ — forbidden on light** |
| `grey-600` | `#5C5849` | muted text on light | 6.4:1 on base, 5.8:1 on base-2 |
| `grey-700` | `#35332A` | hairlines on dark | decorative |
| `success` | `#2F7A43` | results accents, light surfaces only | 4.8:1 on base |

Rules:
- Tone is ambient, not a prop: `Section` stamps `data-tone`, descendants re-color with
  `[[data-tone=dark]_&]:` variants. New components must follow this — no `tone` props.
- Buttons/text on `accent` use white (5.8:1). `text-base` is ambiguous with the font-size
  utility — for beige *text* on dark use `text-white` or `fill-base` (SVG); backgrounds
  (`bg-base`) are unambiguous.
- `--gradient-metal` / `text-metal` are legacy (Goji-derived), consumed only by
  StatsBand/CtaBand, and are deleted with the Phase 2 homepage rebuild. Do not use in new work.

## The pentagonal silhouette

One clipped corner, always **top-right**, cut at 45°. Utility: `clip-corner` + a `--clip`
size (`[--clip:10px]` etc.).

| `--clip` | Use |
|---|---|
| 10px | buttons, chips, form fields |
| 18px | cards, panels |
| 28px | heroes, section frames, the contact form frame |

- Never a bottom corner; nested clipped elements clip the same corner.
- Borders cannot follow `clip-path`. Bordered pentagons are two stacked clipped layers —
  outer layer is the border color, inner inset by `p-hairline` (0.8px). Use
  `ClippedPanel bordered` or copy `Button`'s secondary variant; don't invent a third way.
- `Button` `block` variant intentionally keeps square corners.

## Hex modules (`HexCluster`)

Flat-top hexagons on a shared-edge axial lattice; cell width 96px at natural scale
(matches the 96px `texture-grid` so grids and hexes register).

- Roles: `outline` (default) · `ink` · `signal` (**max one per composition**) · `textured`.
- No floating hexes — every cell shares at least one edge in (q, r) lattice space.
- Connecting lines exit edge midpoints at 0°/60°/120°; annotations attach to lines, not tiles.
- Pass `label` for an accessible `role="img"` name; omit it only for pure decoration.

## Textures

`texture-dots` (24px dot grid) and `texture-grid` (96px hairline grid), pure CSS,
tone-aware via `--texture-ink`. Rules: section backgrounds only · never behind body copy
longer than ~3 lines · at most one textured surface per viewport · the 8px sub-grid
variant is reserved for the homepage hero (Phase 2).

## Annotation voice

`Annotation` — IBM Plex Mono (`--font-mono`), 12px, uppercase, 0.08em tracking, grey-600
light / grey-300 dark; optional accent index (`<Annotation index="01">`). Used for
eyebrows, diagram labels, section indexes, marker captions. It is a labeling voice, not a
third body font — if it's a full sentence, it isn't an Annotation.

Markers: `DirectionalMarker` (square-cap arrow), `ConnectorLine` (hairline with optional
arrowhead/crosshairs). Stroke inherits `currentColor`.

## Motion

Constants live in `src/lib/motion.ts` — CSS reads them via custom properties (Tailwind
can't read JS constants at build time).

- Hover/color: `0.3s ease-in-out` (`duration-300`), sitewide master timing.
- Structural reveals: 500–700ms; blueprint easing `--ease-blueprint`
  (`cubic-bezier(0.22,1,0.36,1)`), exported as `EASE_BLUEPRINT`.
- Line draw: `Reveal variant="draw"` + `data-draw` + `--draw-length` on SVG strokes;
  `LINE_DRAW` = 600ms/segment, 80ms stagger.
- Observer thresholds are `THRESHOLD.{reveal,countUp,heroLoop}` — never a literal.
- **One focal animation per viewport** (focal = looping or >400ms; `Reveal` fade-ups
  don't count). The case-study heroes are the only looping animations on the site.
- `prefers-reduced-motion` collapses everything to meaningful end states — every new
  animation must define its end state, not just stop.

## Dark sections

At most two dark moments per light page — one mid-page proof section plus the closing CTA
band — never adjacent, at most one per viewport. Contact (Phase 6) is the only page-level
dark surface. Dark sections: `tone="dark"` → `contrast-2` bg, `surface-dark` panels,
`accent-hi` signals, grid texture allowed at dark opacity.

## Building a new page from primitives

1. `PageHero` (annotated eyebrow, dot texture) → `Section` blocks alternating
   light/muted per the rhythm rule (no two adjacent sections with the same tone + layout
   pattern), dark reserved per the rule above.
2. Cards and frames are `ClippedPanel` (18px); interactive affordances are `Button`.
3. Diagrams: `HexCluster` for module maps, `ConnectorLine`/`DirectionalMarker` for flow,
   `Annotation` for labels; hand-authored SVG follows the existing schematic grammar
   (token classes on SVG attributes, 0.8 stroke, square caps).
4. Copy lives in `src/content/*` — components never carry copy.
5. Definition of done: `npm run lint` · `npx tsc --noEmit` · `npm run build` ·
   390/768/1440 check · reduced-motion check · contrast spot-check for any new pairing.
