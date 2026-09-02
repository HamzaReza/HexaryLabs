# Figma redesign — progress

Live status board for the `feat/figma-redesign` branch. Updated after every task.
Plan of record: `~/.claude/plans/what-i-meant-by-peppy-pinwheel.md`.

**Legend:** `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked · `[-]` skipped

---

## Now

Phases 0, 2, 1, 3 and 4 are committed (0/2/1 ran in that order — 2 before 1 by request).
**Next up: Phase 5, the work index and collapsing the case studies to one template.**
Nothing is in flight.

**Open decisions carried into Phase 5** — see *Blocked / waiting*: whether to re-audit
Phases 1–3 against Figma's source data before continuing, and whether `/privacy`,
`/terms` and `/work` should keep the 540px hero the shared band now gives them.

| Phase | State | Commit | Review page |
|---|---|---|---|
| 0 — Foundations | committed | `a2ace31` | `review/phase-0.html` |
| 2 — Contact closer | committed | `2fc1978` | `review/phase-2.html` |
| 1 — Sitewide chrome | committed | `e06ecd4` | `review/phase-1.html` |
| 3 — Homepage | committed | `dd9e7aa` | `review/phase-3.html` |
| 4 — Services | committed | `c98ec8a` | `review/phase-4.html` |

**Read before resuming:** the open asks in *Blocked / waiting*, and the *Environment
gotchas* section — every trap in there cost real time.

---

## Setup

- [x] Cut branch `feat/figma-redesign` from `main` @ `91580f2`
- [x] `chore:` sync `package-lock.json`, ignore `/review` — commit `8383d35`
- [x] Capture harness (17 routes × desktop 1440 / mobile 390) — `capture.sh` in Phase 0,
      replaced by `review/shoot.mjs` in Phase 2 after the 390 captures proved wrong
- [x] Pixel-diff harness `review/diff.py`
- [x] Review-page generator `review/build-review.py` (self-contained, base64 WebP,
      optional `reference` block for design-frame-beside-build pairs)
- [x] Harness forced to reduced motion — without it, the same code captured twice
      differed 2.2% on the homepage, so the gate was measuring animation frames

---

## Phase 0 — Foundations · `refactor:` — **committed** `a2ace31`

### A. Data-access layer (`src/lib/data/`) — the API seam
- [x] `types.ts` — domain types re-exported
- [x] `schemas.ts` — zod schema per entity + `parseOrThrow`
- [x] `source.ts` — the only module importing `@/content/*`, loaders memoised
- [x] `services.ts` — getServices · getServiceBySlug · getServiceSlugs · getRelatedCaseStudy · getServicesOverview
- [x] `work.ts` — getCaseStudies · getCaseStudyBySlug · getCaseStudySlugs · getFeaturedWork · getListedWork · getCaseStudyForTool · getToolCaseStudyLinks · getClientTags · getWorkIntro
- [x] `site.ts` — getSiteMeta · getSiteMetaSync · getNav · getHeaderCta · getFooterNav · getContactCta
- [x] `content.ts` — getStats · getTechGroups · getTechIntro · getProcessSteps · getProcessPhases · getIntegrationGroups · getPlatformNames · getAboutContent · getHowWeWorkContent · getIntegrationsContent
- [x] `index.ts` — barrel
- [x] All 31 `@/content/*` importers migrated to the barrel
- [x] 12 hand-rolled queries moved into the layer
- [x] Data threaded as props into the 3 client components (`Header`, `MobileMenu`, `ServicesExplorer`)
- [x] ESLint `no-restricted-imports` bans `@/content/*` outside `src/lib/data/**` — rule verified to actually fire

### B. Shared constants (`src/lib/ui/constants.ts`)
- [x] `TONE` / `TONE_CLASS`, `CLIP` / `CLIP_CLASS`, `HEX_ROLE`, `BUTTON_VARIANT`, `BUTTON_SIZE`
- [x] `Section`, `ClippedPanel`, `Button`, `HexCluster` now read from them

### C. Token drift
- [x] `manifest.ts` `#ffffff` → `#f5f3ee` (superseded in Phase 1, which made it `#ffffff` again
      — this time matching a white canvas rather than drifting from a beige one)
- [x] `Container.tsx` → `max-w-content` / `max-w-wide` from the existing `--container-*` tokens
- [x] `globals.css` `#4b4839` → `--rule-ink` channels, shared by both rule gradients
- [x] `Logo.tsx` `#1F2937` / `#5B5BF0` — resolved in Phase 1, which replaced the logo entirely
- [x] `MobileMenu.tsx` `top-[72px]` — resolved in Phase 1 via `--header-h-sm`

### D. De-duplicate
- [x] StatsBand raw `<section data-tone="dark">` → `<Section tone="dark">`
- [-] The other 4 dark surfaces — three different padding rhythms, one is a `<footer>`;
      Phases 1/2/5 replace four of the five
- [x] `services/page.tsx` raw clipped panels — resolved in Phase 1, which removed the chamfer
- [-] `Button` `...rest` on `href` path — needs a discriminated props union; latent, no call site hits it
- [-] `ArrowIcon` className merge — `cn()` is a plain join, not tailwind-merge; merging would regress

### Verify
- [x] `npx tsc --noEmit`, `npm run lint`, `npm run build` clean — 36/36 static pages
- [x] Rendered text byte-identical on every route vs the pre-phase commit
- [x] DOM node counts identical (900→900 `/`, 195→195 `/about`, 654→654 `/work`, 122→122 `/contact`)
- [x] All 3 class changes individually verified to have no CSS effect
- [x] Committed as `refactor: add API data layer, shared UI constants, de-duplicate primitives`

---

## Phase 2 — Contact closer · `feat:` — **committed** `2fc1978`

### A. The closer
- [x] `ContactSection` — measured from the Contact frame; grid finalised in Phase 1 at 494 / 48 / 738
- [x] Replaces `CtaBand` on home + case study, `ClosingCta` on services, service detail, About
- [x] `/work` keeps its own CTA band — the approved design has one there
- [x] `/contact` is the same block with the page headline and the dot texture
- [x] `CtaBand.tsx` deleted (no callers left)
- [x] Headline gradient painted through the glyphs, sampled `#BFBFBF` → `#878787` horizontally

### B. The form
- [x] Underline fields; mono-uppercase label rests on the value baseline, floats when
      focused or filled — CSS-only via `:placeholder-shown`, no extra client state
- [x] `UnderlineField` / `UnderlineFieldRow` / `FieldError` in `src/components/ui/`
- [x] Company name before company email, both full width
- [x] Textarea keeps a static label over a bordered 8px-radius box
- [x] Submit is a square white `Start a project`, no arrow
- [x] Autofill suppressed — a transparent field over a dark panel otherwise gets a white box
- [x] Server action, zod validation and every field `name` untouched
- [x] `CountrySelect` **trigger** restyled to sit on an underline row; behaviour untouched
      (the plan said "untouched" — flagged as a deviation)

### C. Tokens and primitives
- [x] `--text-caption` — 14/18/+0.96, the design's mono caption step
- [x] `Button` gains `clip` so a call site can opt out of the chamfer; defaults unchanged
- [x] `contactCta` in `src/content/site.ts`, read through `getContactCta()`
- [x] `UnderlineField` added to `/styleguide` in resting, filled and error states

### Content removed, by design — confirm with the client
- [!] `/contact` lost the four-point expectation panel (01 Response time / 02 What we take
      on / 03 For a useful estimate / 04 What happens next) and the "Prefer email or phone?"
      line. Neither is in the approved design. Email and phone remain in the footer.

### Verify
- [x] `npx tsc --noEmit`, `npm run lint`, `npm run build` clean — 36/36 static pages
- [x] `/work`, `/how-we-work`, `/integrations`, `/privacy`, `/terms` byte-identical at 1440 and 390
- [x] No horizontal overflow on any of the 17 routes at 390 or 1440
- [x] Form round trip driven for real: field error + `aria-invalid` + values preserved;
      send-failure banner renders (no `RESEND_API_KEY` locally, so the success panel is untested)
- [x] Committed as `feat: make the contact form the page closer sitewide`

### Harness — rewritten, and a Phase 0 correction
- [x] `review/capture.sh` deleted. macOS Chrome clamps a window to 500px wide, so
      `--window-size=390` laid every page out at 500 and cropped the PNG to 390 —
      **every mobile image on the Phase 0 review page was that.** Phase 0's conclusions
      stand; they rested on rendered-text and DOM comparisons, not those images.
- [x] `review/shoot.mjs` — sets the viewport over the DevTools Protocol, grows it to the
      full page height rather than using `captureBeyondViewport` (which relaid out
      mid-capture and intermittently rendered at the wrong breakpoint), and refuses to
      capture if the page laid out at any width but the requested one
- [x] Captures run against a production build, not the dev server — no dev indicator,
      no chunk race. Two runs of the same build: 17/17 desktop routes byte-identical.

---

## Phase 1 — Sitewide chrome · `feat:` — **committed** `e06ecd4`

### A. Palette — the headline change
- [x] Canvas `#f5f3ee` → `#ffffff`, alt surface `#ebe8df` → `#f1f1f1`
- [x] Ink `#14130f` → `#2b2b2b`, dark sections `#0c0b09` → `#171717`, dark cards → `#222222`
- [x] Warm grey ramp → neutral; `--rule-ink` neutralised; accent-hi `#8b7bff` → `#9b8dff`
- [x] Contrast re-measured for every changed pair — all AA or better
- [!] **The plan said the canvases were near-identical. That was wrong** — it read the
      homepage render, whose hero sits under a warm gradient. The design's pages are white.
      This is the single biggest visual change in the project. It is one `@theme` block in
      `globals.css`; reverting to the warm identity is that same block and nothing else.
- [-] `grey-500` is `#8a8a8a`, not the design's `#5a5a5a` — that value is 2.6:1 on dark,
      below AA for text and below 3:1 as a control boundary. `#5a5a5a` is kept as
      `grey-600`, where the design actually uses it: on light, at 6.9:1.

### B. Logo and watermark
- [x] `Wordmark` — the approved lowercase lockup with the hexagon in the "e", pulled as
      vector, single-colour, drawn in `currentColor`
- [x] `Logo` wraps it; the old hexagon-plus-`HexaryLabs` mark is gone
- [x] Footer watermark is the same shape at full content width
- [x] `LinkedInIcon` built from the design's glyph
- [x] `icon.svg` rebuilt on the new palette; `#5B5BF0` drift gone from it and `ogImage`
- [-] OG templates still draw the old lockup — colours updated, mark not redrawn

### C. Header
- [x] Outlined square CTA; four plain links; 84px; 1px `grey-200` rule
- [x] **Mega-menu removed** — the design has no dropdown. The four service routes are still
      reached from the services index, the footer and the mobile menu, and `NavItem.children`
      still drives the mobile accordion.
- [x] `--header-h-sm: 72px` replaces the two hardcoded 72s (Phase 0 deferred this)

### D. Footer
- [x] Four equal columns: brand + contact, then the three nav groups
- [x] Hairline cell grid, "Start a Project" row and bottom bar all removed
- [!] LinkedIn icon built but not rendered — `site.social.linkedin` is empty, no URL exists

### E. Page heroes and shape
- [x] `PageHero` headlines ALL-CAPS; dot texture removed (design's light pages are plain white)
- [x] `CLIP` → 0/0/0, so the chamfer is gone sitewide from one place
- [x] The four hardcoded `[--clip:18px]` in `services/page.tsx` now go through the scale
- [x] Container 1200 → 1280; dot texture 1px/24px → 4px/34.6px
- [x] `ContactSection` grid tightened to the design's exact 494 / 48 / 738
- [x] `/contact` keeps `min-h-full` — `main` is `flex-1`, so without it the body's white
      shows between the dark closer and the dark footer on the one short page

### Verify
- [x] `npx tsc --noEmit`, `npm run lint`, `npm run build` clean — 36/36 static pages
- [x] All 17 routes captured at 1440 and 390 from a production build
- [x] `grep '[--clip:'` returns nothing outside `src/lib/ui/constants.ts`
- [x] Committed as `feat: rebuild sitewide chrome on the approved design`

---

## Phase 3 — Homepage · `feat:` — **committed** `dd9e7aa`

Verified section by section against the design's own frames, at 1:1.

### Section heights vs the design
| Section | Design | Build | |
|---|---|---|---|
| Hero | 605 | 605 | exact |
| Stats | 275 | 275 | exact |
| Outcome | 566 | 566 | exact |
| Our Work | 1046 | 1047 | +1 |
| Services | 664 | 664 | exact |
| Stack | 740 | 743 | +3 — three real 1px rules the design draws as zero-height lines |
| How We Work | 1586 | 1562 | −24 — **correct**: the design's four cards share one placeholder paragraph, ours carry the real steps |
| Contact closer | 985 | 987 | +2, inside the Phase 2 form |

### Built
- [x] Hero — two-tone ALL-CAPS 64/72 on the warm gradient, hatched hexagon, copy/actions baseline row
- [x] `StatsBand` — bordered 12%-white cards over the honeycomb; proof line moved down from the hero
- [x] **`OutcomeSection` — new**, the designed block that had never existed
- [x] `WorkCarousel` + `WorkCard` — chips and track as one control, native scroll-snap
- [x] `ServicesSection` — flat 2×2 dark grid; `ServicesExplorer` accordion deleted
- [x] `TechStack` — numbered chip rows + the bleeding hexagon cluster
- [x] `ProcessSection` + `ProcessRail` — staggered two-column map with hatch fillers
- [x] `CapabilitiesBand` deleted; `getPlatformNames()` went with its last caller
- [x] Hex watermark added to the contact closer — **reaches every page carrying it**
- [x] Homepage copy moved to `src/content/home.ts`, behind the data layer
- [x] New primitives: `HexWatermark`, `HexLattice`, `ChevronRun`, `StackHexagons`,
      `ProcessRail`, `Chip`, `SectionHead`, `WorkCard`, `WorkCarousel`
- [x] `Button` gains the design's `solid` / `outline` at its 46px geometry;
      `ArrowIcon` gains `tight`, cropping the box to the ink

### Corrections made during the phase — worth remembering
- [!] **The design's headline breaks are hand-set.** Widest line 692px inside a 900px box,
      so no measure reproduces them. Left to wrap it lost a line and the hero came out 72px
      short. Stored in content as lines of inked runs, applied from `lg`.
- [!] **Section headings are weight 500, not Bold.** Derived Bold from stem-to-size ratios;
      measuring build against design with one method gave 47px cap and 7px stems in both at
      500. **Ratio-based weight inference does not work here — measure both sides instead.**
- [!] **The honeycomb cell is three hexagons, not one.** The 173×172 layer box holds three;
      drawing one hexagon at that size on that pitch gives a field of stars.
- [!] **The hatch ran the wrong way** — the CSS gradient angle was 90° out.
- [-] The design's type scale is not the build's. Added under its own names
      (`text-display/section/card/figure/lead/tag/numeral`) rather than retuning `--text-h*`,
      which would have resized headings on six pages Phases 4–6 have yet to rebuild.
      **Both scales exist on purpose. Phase 7 merges them.**

### Verify
- [x] `npx tsc --noEmit`, `npm run lint`, `npm run build` clean — 36/36 static pages
- [x] All 17 routes captured at 1440 and diffed against Phase 1: homepage −1269px / 39.3%
      changed, **every other route identical in height, 0.00–0.09% of pixels** — all of it
      the closer's new watermark
- [x] No horizontal overflow at 390, 768 or 1440 (one real overflow found and fixed: the
      chevron ornament held 402px at every size)
- [x] Committed as `feat: rebuild the homepage on the approved design`

### Harness bugs found while verifying — both produced convincing false results
- [x] A capture clip combined with a full-height emulated viewport makes Chrome **silently
      rescale** the page. Section diffs read 28% and 49% for code that was correct.
      Fixed: capture the page whole, slice locally, assert the width.
- [x] `shoot.mjs` gave lazy images 400ms after growing the viewport. A below-fold image
      missing from one route looked exactly like a regression (2.35% on a service page).
      Fixed: wait for images that will be in frame to decode, with an 8s ceiling — scoped to
      visible ones, since the carousel's off-screen cards stay lazy forever by design.

---

## Phase 4 — Services · `feat:` — **built, awaiting review**

Frames: index `81:5724`, Product Strategy `95:11809` (the one detail page measured
end to end; the other three share its template).

### A. The index page
- [x] `PageHero` rebuilt to the design: a 540px band, content **bottom**-anchored 64px
      clear of the edge, 738px column, uniform 24px gaps. The block grows upward as the
      headline takes more lines — 335px at three, 287px at two, both ending on the same
      baseline
- [x] `--text-page-title` — Space Grotesk **Medium 40/48, +1.04px**, read off the Figma
      type panel. Phase 1 had this at 64px (`text-h1`), which was the homepage display
      step borrowed for want of a measurement
- [x] `HeadlineLines` — the designer's breaks, kept in content. Each hero typesets in a box
      sized to its own widest line (521 index, 630 service), so no single shared max-width
      reproduces both
- [x] `ServiceCard` — 1280 card, 32px padding, 120px numeral column, 952 content, 80px
      icon, all gaps 32. Radius 16, white on `#F1F1F1`, no border, no shadow
- [x] `ServiceIcon` — the four glyphs pulled as vectors; per-icon size is part of the
      artwork (49.23 for the line marks, 61.54 for the dense ones)
- [x] `Chip` gains a third size, `stack` — 34px on 24px padding, 2px gaps
- [x] Two additive content fields, `typicalEngagement` and `relatedWorkLabel`. **The stack
      chips are not stored**: they are the first six of the related case study's own
      `stack`, which is exactly what the design shows on all four cards
- [x] "Not sure which one fits?" band and the integrations link removed — neither is in the
      approved design
- [x] Hero **540** and cards block **2040** — both exactly the design, first try

### B. The four service pages, one template
- [x] 568 lines → ~270. All per-service layout branching gone; the four pages differ only
      in data. Two beats stay conditional because only some services have the content:
      the accent band needs `cost`, the proof line is Software Engineering's alone
- [x] Dark hero on the `#484848 → #A8A8A8` ramp — horizontal, not diagonal: sampled at
      three heights, every column is constant
- [x] `Accordion` (client) for the FAQs — one open at a time, panels kept mounted so
      in-page search finds closed answers
- [x] `ServiceApproach` — flat-top hexagons 160×138 (side 80) on a 324px pitch, chevron
      connectors, captions repeating the same pitch so each sits under its hexagon
- [x] `ServiceOutcomes` — ghost numerals on the honeycomb field
- [x] `ChevronRun` gains a `pitch` prop (15.005 for long runs, 16.005 for the connectors)
- [x] Product Strategy measures **5549 against the design's 5547**; seven of eight sections
      exact, `approach` +1, `faq` −1, closer +2 (the known Phase 2 delta)

### Corrections to earlier phases, found by measuring
- [!] **The dot texture was on the wrong pitch sitewide.** Phase 3 set 34.6px from a render
      that was not 1:1. Two independent sources now agree on **32px**: the ellipse nodes
      step by exactly 32 in x (31.94 in y), and a native 1:1 render measures 32.0 between
      centres. ~8% error, compounding to a visibly drifted field across a page. **This
      changes the homepage, which was already approved** — the top band of the services
      hero, which is pure texture, now diffs at 0.00%.
- [!] **Inner-page heroes are 40px, not 64.** Confirmed on two frames. Every route using
      `PageHero` inherits it — Work and About get their own frames in Phases 5–6, which is
      where this gets confirmed a third and fourth time.

### Known deviations, deliberate
- [-] Related-work panel diffs at 11.8%: the design shows a mockup, the build shows the
      real case-study cover from `public/work/`. Structure matches; the artwork differs on
      purpose.
- [-] Accent-band body set 6px nearer its rule than the design's 26px. Chrome renders Inter
      ~0.55% wider than Figma, enough to orphan a fifth line and leave the band 24px too
      deep. Six pixels of gap buys the measure back; a band a whole line too tall is the
      more visible error.
- [-] The index headline keeps the build's comma. The Figma reads "…the right thing. and
      build it well." — a full stop and a lowercase "and". That is a copy error, not a
      design decision; only the breaks were taken from the design.

### Verify
- [x] `npx tsc --noEmit`, `npm run lint` clean
- [x] One real mobile bug found and fixed: the related-work chevron run kept its intrinsic
      width against `flex-1` and sized the grid column to 553px inside a 390 viewport
- [x] All 17 routes captured at 1440 **and 390** into `review/phase4`, and diffed against
      the Phase 3 captures
- [x] Review page `review/phase-4.html` — 42 comparisons, 8 of them Figma beside build
- [!] **Correction to the claim above: the dot-pitch fix does not visibly change the
      homepage.** Diffed at a threshold low enough to see the dots at all, home moves
      0.01%, contact 0.92%, styleguide 0.10%, and none of them crosses the visible
      threshold. The pitch was wrong and is fixed — 32.00 in the build against the design's
      31.95, with `background-size:32px 32px` in the compiled CSS — but it only matters
      where the dot field is prominent, which is the inner-page heroes. Stated twice as
      "this changes the homepage"; it does not.
- [!] **The 540px hero grows four undesigned routes.** privacy and terms 277 → 539, work
      495 → 539. About was already 623 → 624, which is independent support for the band:
      the design's own About hero is 540. On routes the designer never covered this is our
      call, not theirs.

---

## Source-data audit of Phases 1–3 — **committed** `PENDING`

Run before Phase 5, after Phase 4 found that ornaments had been reconstructed from
renders rather than pulled from Figma. Every ornament and every homepage type value
shipped in Phases 1–3 was re-checked against `download_assets` / node metadata.

### Verified correct — no change needed
- [x] `HexWatermark` silhouette — exported mask path and viewBox `384.367 × 374.507` identical
- [x] `HexLattice` — 3-hexagon cell, side 47.94, pitches **77.58 / 89.06**, stroke 1.08: exact
- [x] `StackHexagons` outlines — exact; same artwork as the services hero
- [x] `ChevronRun` — pitch 15.005, height 38 correct (run 77.45 vs 78.03, ignorable)
- [x] **Homepage type scale** — hero 64/72 over 4 lines, section heads 28/36, stat figures
      60/73, lead 18/26. All correct; the 40px error was confined to `PageHero`.

### Defects found and fixed
- [!] `HexWatermark` hatch — period **13.2 → 14.065**, stroke **1.1 → 1**, ink
      `rgba(23,23,23,0.19)` (rendered `#D3D3D3`) → **`#C8C8C8`**. Ships on every page via
      the closer. Verified after: renders `rgb(200,200,200)` at a 14.00 period.
- [!] `StackHexagons` hatch — period **9.7 → 12.73** (24% too dense) **and the rotation was
      mirrored**, `-30.1 → 30`. The doc comment asserted 9.7 as measured; it was not.
- [!] `ProcessRail` — the node was a **pointy-top 39 × 58** hexagon against the design's
      **flat-top 32 × 27**: rotated a quarter turn and twice the height. The 309 pitch still
      measured right because the oversized node was offset by too little air.

### Not audited
- [-] `Wordmark` (real bezier paths, low risk), the footer watermark, and the **dark-tone**
      watermark on the closer — no source pulled for the dark variant, still unverified.
- [-] `HexCluster` — pre-Figma legacy on `/about` and `/how-we-work`; Phase 6 replaces it.
- [-] Work / case-study / About frames — Phases 5–6 rebuild them from source anyway.

### Method change adopted for Phases 5–7
Source-first, no exceptions: `download_assets` before drawing any ornament, the type panel
before setting any type, the export SVG before setting any fill or mask. Measuring a render
is a cross-check, never a source. Anything unsourceable is flagged explicitly, not guessed.

### Also
- [-] `HexAssembly` is dead code — no importers. Left in place pending instruction.
- [x] No layout moved: all 8 homepage sections identical to the Phase 3 approved numbers.

---

## Upcoming

- [ ] **Phase 5** — Work index + collapse case studies to one template
- [ ] **Phase 6** — About
- [ ] **Phase 7** — Responsive, contrast, motion audit. Includes rewriting
      `docs/design-system.md`, which still describes the warm beige system in prose and
      carries a contrast table for the retired pairs.

---

## Blocked / waiting

- [!] **LinkedIn URL** — the design's footer has the glyph; no URL exists anywhere in the
  project. `site.social.linkedin` is `""` and the icon renders the moment it is filled in.
  Needed from the client.
- [!] **About team photograph** — full-bleed, ideally ≥2880px wide. Not in `public/`, which
  holds only case-study images. Check whether it is placed in the Figma first; otherwise
  needed from the client. Blocks Phase 6.
- [ ] **Decision pending: is white right?** Phase 1 replaced the warm beige identity with
  the design's neutral one. The client approved the design, but they have only ever seen the
  build in beige. Worth confirming explicitly before launch rather than at launch.
- [x] **Branching** — one commit per phase, straight onto `feat/figma-redesign`.
- [-] `/how-we-work`, `/integrations`, `/privacy`, `/terms` — out of scope per O1, kept live.

---

## Figma access — resolved, with a caveat

The MCP rate limit is charged to the plan of the team that **owns** the file, not to the
caller's own plan. The original `HexaryLabs-Website` lives in a Starter team
(`1671650441008435094`, 20 calls/month, exhausted); the Dev seat is on a different team
(`1302742348984274135`), so the Pro upgrade did nothing for it.

**Fix in use:** a "Save to drafts" copy owned by the account holder.

- **File key: `2jkOmVIcKIYzv0PCgf2SLp`** (`HexaryLabs-Website (Copy)`)
- Quota now bills to the Pro plan — 200 calls/day, 10/min
- **Node IDs are preserved**, so every cached reference still resolves
- Vectors survived — `download_assets` returns real SVG, no raster embeds
- Moving the file into a team project needs a Full seat, which is why it lives in drafts

**Caveat: the copy is a fork.** If the designer edits the original, this snapshot goes stale
silently. Re-duplicate whenever the source moves.

**Trap — the Variants page is stale.** `95:6566` is an *exploration* board: four homepage
concepts (V1–V4), a colour strip, the type spec, and three logo chips. Its Logo section
(`95:7702` / `95:7709` / `95:7716`) still shows the **old** `HexaryLabs` mark, not the
approved wordmark. The plan's asset manifest pointed at those nodes and was wrong. The real
lockup is on the **Design** page, in the page headers and the footer watermark.

This is the second time layer metadata on this file has disagreed with the pixels (the first
was the footer's stale layer names). **Render a node before trusting it.**

### Assets still to pull (now unblocked)
- [ ] Hatched hexagon watermark — homepage hero and the closers (Phase 3)
- [ ] Four service line icons (Phase 4)
- [ ] Three About hex glyphs (Phase 6)

---

## Environment gotchas

Both of these cost real time and will recur.

- **Never run `next dev` over a `.next` left by `next build`.** Dev comes up on the
  production route manifest and every route except `/` returns 404 in ~40ms — fast enough
  that it clearly is not a failed compile. Delete `.next` when switching between
  `npm run dev` and `npm run build` / `next start`.
- **Tailwind v4 scans everything in the repo that is not gitignored.** Parking a build
  output as `.next-stale-…` made the scanner read binary chunks as source text and emit
  corrupted class names (`top: var(--Y\u{6}-h-sm)`), which broke CSS parsing outright.
  Keep scratch directories outside the repo, or gitignored.
- **`cz-shortcut-listen` hydration warning is ColorZilla, not the code.** Verified: the
  attribute appears 0 times in the SSR output, and a clean headless browser reports 0
  console errors and `document.body` with only `class`. `suppressHydrationWarning` on
  `<body>` would silence it; not applied, since it is not a defect.

---

## Debt noticed, not fixed

- OG image templates (`src/lib/ogImage.tsx`) still draw the previous hexagon-and-
  `HexaryLabs` lockup. Colours are on the new palette, but link previews disagree with the
  site until the wordmark is redrawn there — Satori can render SVG paths, it just needs
  doing carefully.
- `cn()` is a plain join; adopting `tailwind-merge` would let components merge rather than
  replace incoming `className`, which several currently can't do safely.
- `Button`'s props type conflates button and anchor attributes, so `...rest` is dropped on
  the `href` path.
- Container gutters below 1328px are still 24px, not proportional to the design's 80px.
  Above that width the content column is exactly the design's 1280.
- The country dropdown in `CountrySelect` is still a light popover over the dark contact
  form. Pre-existing, not introduced by the redesign.
- The mobile menu's CTA is still a filled bar; the design has no mobile frame readable for
  it, and the header's outlined treatment does not obviously transfer to a full-width row.
