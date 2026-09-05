# Hexary Blueprint — Design System

The developer-handoff companion to the living reference at `/styleguide` (noindex,
excluded from sitemap and robots). Source of truth for values is `src/app/globals.css`;
this document explains the rules. Scope decisions live in `docs/redesign-plan.md` §4.

## Colour tokens

All colors are `@theme` tokens in `globals.css` — never hardcode a hex in a component.
Measured WCAG ratios, **re-measured in the Phase 7 audit** against the neutral palette
that replaced the warm beige system. Every text pairing the build actually renders meets
AA; the two that did not are recorded under *Corrections* below.

| Token | Value | Role | Measured contrast (Phase 7 audit) |
|---|---|---|---|
| `base` | `#FFFFFF` | page canvas | contrast on it 14.2:1 · contrast-2 17.9:1 |
| `base-2` | `#F1F1F1` | alternate sections | contrast 12.5:1 · contrast-2 15.9:1 |
| `contrast` | `#2B2B2B` | body text on light | 14.2:1 on base · 12.5:1 on base-2 |
| `contrast-2` | `#171717` | headings; dark sections | 17.9:1 on base · white on it 17.9:1 |
| `surface-dark` | `#222222` | panels on dark | white on it 15.9:1 |
| `accent` | `#5B45F5` | purple signal | 5.8:1 on base · 5.1:1 on base-2 |
| `accent-hi` | `#9B8DFF` | signal on dark | 6.5:1 on contrast-2 · 5.8:1 on surface-dark |
| `accent-soft` | `#E8E4FF` | copy on an accent fill | 4.7:1 on accent ✓ AA |
| `accent-warm` | `#F04E23` | alternating row bullet | decorative |
| `grey-100` | `#EDEDED` | hairlines on light | decorative |
| `grey-200` | `#DADADA` | hairlines/fills on light | decorative |
| `grey-300` | `#DADADA` | body text on dark | 12.8:1 on contrast-2 · 11.4:1 on surface-dark |
| `grey-400` | `#A5A5A5` | decorative outlines only | 2.5:1 on base — never text |
| `grey-500` | `#8A8A8A` | muted text on dark only | 5.2:1 on contrast-2 · 4.6:1 on surface-dark · 3.5:1 on base FAIL |
| `grey-600` | `#5A5A5A` | muted text on light only | 6.9:1 on base · 6.1:1 on base-2 · 2.3:1 on surface-dark FAIL |
| `grey-700` | `#333333` | hairlines on dark | decorative — below 3:1 on #222, never a control boundary |
| `success` | `#2F7A43` | results accents, light only | 5.3:1 on base |

Rules:
- Tone is ambient, not a prop: `Section` stamps `data-tone`, descendants re-color with
  `[[data-tone=dark]_&]:` variants. New components must follow this — no `tone` props.
- Buttons/text on `accent` use white (5.8:1). `text-base` is ambiguous with the font-size
  utility — for beige *text* on dark use `text-white` or `fill-base` (SVG); backgrounds
  (`bg-base`) are unambiguous.
- **Never `grey-500` on light, never `grey-600` on dark.** The two are mirror images and
  swapping them is the easiest contrast mistake to make here: each fails AA on the other's
  surface.
- `grey-700` is a decorative hairline only. It measures 1.26:1 on `surface-dark`, so it can
  never be the visible boundary of a control — WCAG 1.4.11 wants 3:1.

### Corrections made in the Phase 7 audit

Two pairings the build shipped were below AA and are now fixed. Both are recorded here
because both were *documented as passing* and were not:

| what | was | now | why |
|---|---|---|---|
| `accent-soft`, body copy on the active work card | `#DED9FF` — **4.28:1** | `#E8E4FF` — 4.7:1 | the token's own comment claimed 4.9:1; it never measured that |
| Message-box border on the contact form | `grey-700` — **1.26:1** | `grey-500` — 4.6:1 | a control's visible boundary needs 3:1 (WCAG 1.4.11). The design's own `#404040` measures 1.53 and fails too |

The field underlines were already on `grey-500` from an earlier phase, so the message box
now matches the fields around it instead of disappearing beside them.

Where the design's own value fails AA, the design loses: `grey-500` is deliberately not the
design's `#5A5A5A` on dark, and the message-box border is deliberately not `#404040`. Both
are flagged to the client rather than silently applied.

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
