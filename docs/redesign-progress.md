# Figma redesign — progress

Live status board for the `feat/figma-redesign` branch. Updated after every task.
Plan of record: `~/.claude/plans/what-i-meant-by-peppy-pinwheel.md`.

**Legend:** `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked · `[-]` skipped

---

## Now

Phases 0, 2, 1, 3, 4, 5 and 6 are committed (0/2/1 ran in that order — 2 before 1 by
request). **Every designed page is now rebuilt.** Next up: Phase 7, the responsive,
contrast and motion audit — the last one. Nothing is in flight.

Phase 5 was **returned once** before it was accepted — see *A0* under Phase 5 for what was
wrong and why. The short version: it was built from the design's measurements rather than
the design's assets, so every band height matched while the ground the rows sit on, the
hero artwork and five of six row images did not.

**The About photograph is a stock office photo**, not the team — 1240 × 413, placed in the
Figma. It is built in as the placeholder it is. Under a heading reading *"A small, senior
team, on purpose"* it reads as the team, so it still **needs a client decision**, and it is
upscaled into a 1440 × 360 slot. Swapping it is one file.

| Phase | State | Commit | Review page |
|---|---|---|---|
| 0 — Foundations | committed | `a2ace31` | `review/phase-0.html` |
| 2 — Contact closer | committed | `2fc1978` | `review/phase-2.html` |
| 1 — Sitewide chrome | committed | `e06ecd4` | `review/phase-1.html` |
| 3 — Homepage | committed | `dd9e7aa` | `review/phase-3.html` |
| 4 — Services | committed | `c98ec8a` | `review/phase-4.html` |
| 5 — Work | committed | `9e66a58` | `review/phase-5.html` |
| 6 — About | committed | `bbd3900` | `review/phase-6.html` |
| 7 — Audit (part one) | **built, unreviewed** | — | `review/phase-7.html` |

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

## Source-data audit of Phases 1–3 — **committed** `0f5fd51`

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

## Phase 5 — Work + case studies · `feat:` — **committed** `9e66a58`

Source-first throughout, per the method change above: frame metadata, `get_design_context`
for type, and `download_assets` for artwork, all pulled before any code was written.

### A0. Rejected on first review, and why

The first submission was returned with *"does not match at all — does not look like you
have taken anything from figma."* That was fair, and the cause is the same one the audit
above found: the page was built from the design's **measurements** and not from the
design's **assets**. Every band height matched to within 19px while three things that
decide how the page reads were wrong.

| miss | what the design has | what shipped |
|---|---|---|
| The rows' ground | full-bleed **`#171717`** behind the whole block | `bg-base` — the page read white where the design reads black |
| Row corners | square | 16px radius, so the rows read as cards |
| Hero artwork | the **skewed** five-cell cluster, one filled with the accent at 20% | the three regular cells from the services hero |
| Row imagery | five specific images placed in the file | the build's own screenshots and a hand-drawn SVG |

All four are now taken from the file: `download_assets` on each row instance and on the
hero group, rather than a measurement of a render. The lesson is the one already written
above and not yet fully applied — *a render is a cross-check, never a source* — extended:
that includes the **ground a thing sits on**, which no measurement of the thing itself
will ever reveal.

### A. `/work` index — built, geometry verified
- [x] Hero is the shared 540 band, **no CTA** — the design's work hero has none.
      Headline 1 line at 48, which **confirms 40/48 on a third frame**.
- [x] Hero artwork is the **cluster**, not the regular cells. It and the dark service
      heroes are the same drawing at **1.36727×** — proven by reproducing both sets of
      exported paths from one shape and one anchor list to within **0.0025 units** — so
      `HeroHexField` now carries it once as geometry plus a palette.
- [x] The cluster's hatch is **31 explicit lines**, as the design draws it, not an SVG
      `<pattern>`. A tile is rasterised at its own size and repeated, so a 1.34px line on
      a 12.27px tile loses ink to resampling: it rendered at 186 against the design's 151.
      Fixing this also **corrected the four dark service heroes**, whose hatch was in the
      wrong phase and too pale — that hero went from 18,346 mismatched pixels against the
      Figma frame to 10,073.
- [x] The rows sit on a **full-bleed `#171717` band**, 40 above / 80 between / 80 below.
- [x] `CaseRow` — 1280 row, **square corners**, clipped. Panel fixed **540**, artwork takes
      the remaining **740**, sides alternating. Panel `#212121`, `pt-32 pb-40 px-48`,
      `gap-32`.
- [x] Panel type from `get_design_context`, not inferred: title Space Grotesk Medium **28**
      `tracking-0.32`, category mono **14/18** `#8D8D8D` `tracking-0.96` caps, body Inter
      **16/24** `#B4B4B4`, list items **16/24** `#F1F1F1` on `py-8`.
- [x] `HexBullet` — the design's own `Polygon 15`, a 10.392 × 12 pointy-top hexagon.
      Alternates **`#9B8DFF`** / **`#F04E23`** by row position, not by study — new token
      `--color-accent-warm`.
- [x] Panel watermark is `HexWatermark` at 405 × 395 in `#434343` — the same artwork scaled
      1.058×, which is why the hatch period matches without a second component.
- [x] `WorkCta` — the design keeps a CTA band here rather than the contact closer. Two
      columns 634 / 16 / 630, white chevrons on `#F1F1F1`, solid `#2B2B2B` button.
      **Confirms `ChevronRun`'s `HEAD_WIDTH = 38.874`** — it is the hexagon head, 24
      chevrons at pitch 15.005.
- [x] `displayName?` added to `CaseStudy` — the design heads rows with the client, but two
      studies have no usable client name and one is headed by the studio. One override
      (Eden) rather than sniffing prose in a component.
- [x] Scope capped at **4** in the row; the studies carry 5–6 and the design shows 4
      everywhere. Presentational — the full scope still shows on the case study.
- [x] **Row imagery is the design's own**, pulled per row instance rather than reused from
      the previous build. `rowCover` now carries five files: the architecture diagram,
      TrueCell's product page, the full B2B Access homepage, the KeepComing stamp card and
      Kinein's order-template editor. Eden's was already correct. Each is left at its
      native aspect so the design's crop falls out of `object-cover` rather than being
      hand-positioned.
- [x] `WorkCta`'s headline is typeset in **333**, not the 634 its column gives it, so it
      breaks over two lines above the chevrons.

| band | design | build | |
|---|---|---|---|
| Hero | 540 | 540 | exact |
| Rows block | 3724 | 3743 | +19 |
| CTA band | 308 | 308 | exact |
| **document** | **5241** | **5259** | **+18** |

Row heights 472 / 553 / 592 / 544 / 520 / 544 against 472 / 556 / 568 / 544 / 520 / 544 —
three exact, one within 3. The +24 on TrueCell is its summary wrapping one line further
than the design's, whose copy runs "everyunit" as one word.

Hero artwork verified against the frame rather than by eye: ink extent 21,63→502,467
against the design's 21,62→504,467; the hatch peaks at 156 against 151; the lilac cell
samples `(237,234,254)` against `(236,234,254)`.

### B. `/work/[slug]` — collapsed to one template
- [x] `CaseHero` — 800/640 split. Left is the page's only white ground with the dot field;
      right is the `surface-dark` gradient spec panel: Scope, Stack & architecture, Project
      duration, Website. Labels mono 14 `#8D8D8D`, values `#F1F1F1`, link `#9B8DFF`.
- [x] Title is Space Grotesk **SemiBold 48 / +1.04 uppercase** — the only SemiBold on the
      site. Read from the type panel, not inferred.
- [x] `Chip` gains `tone="dark"` (grey-600 fill) — a prop, not a passed class, because `cn`
      is a plain join and an incoming `bg-*` would not reliably win.
- [x] The architecture diagram is the **design's own image**, square-cornered, replacing
      `MedicalRecordsSchematic`. The design places it as a raster, so matching it means
      using that raster: reproducing it as SVG would be a measurement of a render, which
      is the mistake this phase was returned for. It is 1446px for a 1200px slot, so it is
      slightly soft on retina — **ask the designer for a 2× export**.
- [x] `StatCallout` — `#E1DDFF`, 16/24/20/16 padding, figure 24/28 +0.32, caption Inter
      *italic* 14/24, corner cut 32px via `clip-path` rather than the design's white triangle.
- [x] Body is four fixed beats on 480 / 80 / 640, callout set against the **foot** of each
      section so the number lands after the argument.
- [x] **All layout branching gone**: `SectionedBody`, `TwoColumnBody`, `NarrativeBody`,
      `SidebarBody`, the hero-variant branch and both `metrics` branches deleted; `variant`
      removed from the type and all 7 entries. `HeroVariant` / `BodyVariant` /
      `MetricVariant` retired. **526 lines → 163.**
- [x] `rowCover?` added so Eden can front its row with a screenshot and keep its diagram.
- [x] `duration?` added — optional, and **no values exist**; see Blocked.

| band | design | build | |
|---|---|---|---|
| Case hero | 600 | 600 | exact |
| Case body | 2939.7 | 2936 | −4 |
| Closer | 985 | 987 | +2 (the Phase 2 form residue) |
| **document** | **5193** | **5191** | **−2** |

### Verify
- [x] `npx tsc --noEmit`, `npm run lint`, `npm run build` clean — 36/36 static pages
- [x] `grep -r "variant\." src/app/work` returns nothing — plan check 9 passes
- [x] All 17 routes diffed against Phase 4: **13 unchanged in height**, 0.00–0.20% of pixels
      (that residue is the audit's watermark fix, not this phase). Only `/work` and the
      three case studies moved, as intended.
- [x] No horizontal overflow at **390 or 768** on any route
- [x] `review/phase-5.html` — 31.7 MB, 34 comparisons, 4 design-vs-build pairs
- [ ] **Awaiting review.** Not committed.

### Dead code left in place (deletion needs instruction)
- [-] `CaseStoryRow.tsx` — `/work` was its only caller
- [-] `WorkImagesGrid.tsx` — the body variants were its only callers
- [-] `HexAssembly.tsx` — flagged in the audit, still unused
- [-] The 7 animated case heroes still build and are still used by the homepage carousel,
      but no longer appear on the case studies — the design has no animated hero there.

---

## Phase 6 — About · `feat:` — **committed** `bbd3900`

The most-changed page of the redesign. Source-first throughout: `get_design_context` on all
five bands before a line was written, `download_assets` for the photograph and the glyphs.

### A. What the build never had
- [x] **Hero figures** — 50+ / 10M+ / $100M+ against the right gutter, Space Grotesk Medium
      40 at `-0.746` over mono 14/18 captions. `PageHero` gains an `aside` slot; the two
      blocks share a bottom edge because the design ends both 64 above the band's foot.
- [x] **The hero carries no hexagons.** The figures take that space, so `HexFieldArt` gains
      `"none"` as a real value rather than a hack.
- [x] **The indigo band** — `#171717 → #080041 → #171717` across, two `#9B8DFF`-bordered
      cards on a double inset glow, and the *where we sit* marker between them. The marker
      is three pieces on a 4 gap — run, hexagon, run — so both sides converge on **one**
      hexagon; `ChevronRun` gains a `ChevronHead` export rather than a second copy of the
      vectors.
- [x] **Full-bleed photograph**, 360 tall, outside the container.

### B. What the design replaces rather than restyles
- [x] Two long expertise essays → **eight stack chips scattered over the honeycomb**, at the
      design's own coordinates, two blurred as a depth cue. Reuses `HexLattice`.
- [x] A 3 × 2 card grid → **a disclosure list**. `Accordion` gains `checkmarks`, which adds
      the accent tick and rules under each row instead of between them. Defaults untouched,
      so the service FAQs did not move a pixel.
- [x] Section annotations (`01 / WHY WE EXIST`) and the sticky-heading prose split: gone.

### C. Refactors this phase paid for
- [x] `HexMark` — the wordmark hexagon the design uses above each principle is byte-identical
      to the one in the case-study stat callouts. One component now; the case pages did not
      move a pixel, which is the proof.

| band | design | build | |
|---|---|---|---|
| Hero | 539 | 540 | +1 |
| Two ways software projects go wrong | 698 | 698 | **exact** |
| A small, senior team + photograph | 994 | 994 | **exact** |
| Technology field | 374 | 374 | **exact** |
| What that actually means for you | 670 | 670 | **exact** |
| Contact closer | 985 | 987 | +2 |
| **document** | **4928** | **4931** | **+3** |

Failure-mode cards measure **383** against the design's 382.537.

**Containment: 16 of 17 routes pixel-identical at 0.00%.** Only `/about` moved, 5458 → 4931.
No horizontal overflow at 390, 768 or 1024 — the checklist's 369 / 738 columns are maxima
rather than fixed widths, because a fixed pair overflows the container at 1024.

- [x] Committed as `feat: rebuild the About page`.

---

## Phase 7 — Responsive, contrast, motion audit · `fix:` — **part one built, awaiting review**

The first pass over the **mobile** frames. No earlier phase had ever been checked against
them — every phase verified 1440 against a desktop frame and only checked that 390 did not
overflow. All ten pages were 16–30% taller than the design at 390.

### A. Five systematic causes, fixed sitewide
- [x] **The hero hexagons do not exist at 390.** All six mobile hero frames — work,
      services, the four service pages and the case study — carry the dot field, the text
      and nothing else. Drawn at 1440 and pinned right, the cluster reached back across the
      headline on a phone, which is how it was spotted. `HeroHexField` is now `max-lg:hidden`;
      one change covers every hero.
- [x] **The hero's own mobile rhythm**: 32 top / 32 bottom, 24 between every element, and
      the eyebrow steps down to 14/18. The work, services and about 390 frames all agree.
- [x] **Header 73 → 57.** The burger loses its box for the design's bare three-bar glyph,
      but keeps a 44px hit area: a 24px target is below the accessible minimum, and the box
      was the only thing making it big enough.
- [x] **Footer 1021 → 793.** The design turns each nav column into a label-beside-links
      *row*; the build stacked everything in one column. One DOM for both layouts —
      `max-lg:contents` on the brand block plus `order`, so no link is duplicated.
- [x] **Gutter 16 → 20.** Every section on the design's 390 frames starts at x=20.
- [x] **Section rhythm 56–80 → 32 / 40** across 20 sections. The single largest cause.
- [x] **The contact closer** (~13 routes): form padding, field rhythm 32 → 20, message box
      232 → 151, headline 40/51, subtitle 16/26 — all measured off the 390 frame.
- [x] **The work rows**: image aspect 1.57 → 1.458, panel padding 48 → 16, gap 80 → 32.

| route | design | before | now | |
|---|---|---|---|---|
| contact | 1934 | 2247 | 1869 | −3.4% |
| work | 6130 | 7685 | 6326 | +3.2% |
| about | 5954 | 7071 | 6190 | +4.0% |
| svc-software-engineering | 7246 | 8412 | 7783 | +7.4% |
| services | 5188 | 6138 | 5666 | +9.2% |
| svc-product-design | 6587 | 7963 | 7296 | +10.8% |
| case-medical-records | 6656 | 7899 | 7389 | +11.0% |
| svc-product-strategy | 6552 | 8156 | 7534 | +15.0% |
| home | 7795 | 9921 | 9341 | +19.8% |
| svc-ai-engineering | 6970 | 9087 | 8476 | +21.6% |
| **total excess** | | **+13,567** | **+6,858** | **−49%** |

**All seventeen desktop routes byte-identical**, apart from the two deliberate contrast
fixes below.

### B. Contrast — 19 pairings re-measured
- [x] Every text pairing the build *renders* meets AA. Two shipped below it and are fixed —
      both had been **documented as passing**:
      · `accent-soft` `#DED9FF` on the accent fill measured **4.28:1** where its own token
        comment claimed 4.9. Now `#E8E4FF`, 4.7:1.
      · The message box's border was `grey-700` on `#222` — **1.26:1**, where WCAG 1.4.11
        wants 3:1 for a control boundary. The design's own `#404040` is 1.53 and fails too.
        Now `grey-500`, 4.6:1, matching the field underlines. **Deliberate departure.**
- [x] `docs/design-system.md` colour section rewritten to the neutral palette with the
      re-measured table and a *Corrections* record.

### C. Motion and routes
- [x] `prefers-reduced-motion` clean on 5 of 6 sampled pages; the sixth is the homepage's
      case-study loop, whose hidden elements are inactive carousel slides — correct.
- [x] All 21 routes and every footer link resolve (200).

### Not done — this phase is explicitly partial
- [ ] Six pages still over the design at 390; causes are page-specific (AI Engineering
      renders **nine** bands where the design has eight). Work, About and Contact are within 5%.
- [ ] About's three hero figures are still desktop-sized at 390 — the design's mobile block
      is 186 tall against the build's 246. Not measured, so not guessed.
- [ ] Tablet (768) unverified — the design has no tablet artboard.
- [ ] `/styleguide` not updated with the components added since Phase 0.
- [ ] `docs/design-system.md` clipped-corner, hex-module and texture sections still
      describe the retired system.
- [ ] **Awaiting review.** Not committed.

---

## Upcoming

- [ ] **Phase 7 part two** — the six remaining mobile pages, `/styleguide`, and the rest of
      `docs/design-system.md`, which still describes the warm beige system in prose and
      carries a contrast table for the retired pairs.

---

## Blocked / waiting

- [!] **LinkedIn URL** — the design's footer has the glyph; no URL exists anywhere in the
  project. `site.social.linkedin` is `""` and the icon renders the moment it is filled in.
  Needed from the client.
- [!] **Case study durations** — the design's spec panel shows "Project duration"; no such
  field exists in the content and durations for real client engagements cannot be invented.
  `duration?` is in the type and schema; the row appears the moment values arrive.
  Needed from the client.
- [x] ~~**About team photograph** blocks Phase 6~~ — **it does not.** Checked the Figma, as
  this entry said to: the image is placed, and it is a **stock office photo** (1240 × 413),
  not the team. Phase 6 can proceed on it. Still worth a client decision, because on a
  section headed *"A small, senior team, on purpose"* a stock photo reads as the team —
  recommendation is to ship the design's image as the placeholder it is and swap one file
  when a real photograph exists. Note the export is 1240 wide for a full-bleed slot, so it
  will be soft; **ask the designer for a larger export** either way.
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
