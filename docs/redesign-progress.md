# Figma redesign — progress

Live status board for the `feat/figma-redesign` branch. Updated after every task.
Plan of record: `~/.claude/plans/what-i-meant-by-peppy-pinwheel.md`.

**Legend:** `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked · `[-]` skipped

---

## Now

Phases 0, 2 and 1 are done and committed, in that order — 2 ran before 1 by request.
**Next up: Phase 3, the homepage.** Nothing is in flight.

| Phase | State | Commit | Review page |
|---|---|---|---|
| 0 — Foundations | committed | `a2ace31` | `review/phase-0.html` |
| 2 — Contact closer | committed | `2fc1978` | `review/phase-2.html` |
| 1 — Sitewide chrome | committed | latest on branch | `review/phase-1.html` |
| 3 — Homepage | not started | — | — |

**Read before resuming Phase 3:** the two open asks in *Blocked / waiting*, and the
*Environment gotchas* section — both of the traps in there cost an hour each.

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

## Phase 1 — Sitewide chrome · `feat:` — **committed**

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

## Upcoming

- [ ] **Phase 3** — Homepage. The largest single phase. Against the design frame, what is
      still wrong on `/`:
      - hero is sentence case in the old layout; the design has a **two-tone ALL-CAPS**
        headline (first sentence mid-grey, second near-black), copy bottom-left with the
        buttons bottom-right, on a **warm gradient** rather than flat white, with a hatched
        hexagon watermark top-right
      - stats band should be bordered cards on a hex-lattice surface
      - the **"Software built by people who own the outcome"** block with the system
        architecture diagram is **missing entirely**
      - Our Work should be filter chips + a peeking-card carousel, not a vertical stack
      - Services should be a flat 2×2 dark grid, not the click-to-expand accordion
      - tech stack and process use different layouts
      - `CapabilitiesBand` is not in the design and comes out
      - the closer is already correct (Phase 2)
- [ ] **Phase 4** — Services index + 4 service pages
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
