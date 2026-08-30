# Figma redesign — progress

Live status board for the `feat/figma-redesign` branch. Updated after every task.
Plan of record: `~/.claude/plans/what-i-meant-by-peppy-pinwheel.md`.

**Legend:** `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked · `[-]` skipped

---

## Now

**Phase 0 approved and committed** — `a2ace31`. Review page: `review/phase-0.html`
**Phase 2 done — awaiting your approval before committing.** Review page: `review/phase-2.html`
Phase 1 (sitewide chrome) is deferred, not dropped; it runs next.

---

## Setup

- [x] Cut branch `feat/figma-redesign` from `main` @ `91580f2`
- [x] `chore:` sync `package-lock.json`, ignore `/review` — commit `8383d35`
- [x] Capture harness (17 routes × desktop 1440 / mobile 390) — `capture.sh` in Phase 0,
      replaced by `review/shoot.mjs` in Phase 2 after the 390 captures proved wrong
- [x] Pixel-diff harness `review/diff.py`
- [x] Review-page generator `review/build-review.py` (self-contained, base64 WebP)
- [x] Harness forced to reduced motion — without it, the same code captured twice
      differed 2.2% on the homepage, so the gate was measuring animation frames

## Phase 0 — Foundations · `refactor:` — **done, awaiting approval**

### A. Data-access layer (`src/lib/data/`) — the API seam
- [x] `types.ts` — domain types re-exported
- [x] `schemas.ts` — zod schema per entity + `parseOrThrow`
- [x] `source.ts` — the only module importing `@/content/*`, loaders memoised
- [x] `services.ts` — getServices · getServiceBySlug · getServiceSlugs · getRelatedCaseStudy · getServicesOverview
- [x] `work.ts` — getCaseStudies · getCaseStudyBySlug · getCaseStudySlugs · getFeaturedWork · getListedWork · getCaseStudyForTool · getToolCaseStudyLinks · getClientTags · getWorkIntro
- [x] `site.ts` — getSiteMeta · getSiteMetaSync · getNav · getHeaderCta · getFooterNav
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
- [x] `manifest.ts` `#ffffff` → `#f5f3ee` (matches `--color-base` and `layout.tsx` themeColor)
- [x] `Container.tsx` → `max-w-content` / `max-w-wide` from the existing `--container-*` tokens
- [x] `globals.css` `#4b4839` → `--rule-ink` channels, shared by both rule gradients
- [-] `Logo.tsx` `#1F2937` / `#5B5BF0` — **deferred to Phase 1**, which replaces the logo entirely
- [-] `MobileMenu.tsx` `top-[72px]` → `--header-h` — **deferred to Phase 1**; the token is 87px
      (desktop) but the mobile header is 72px, so it needs a responsive definition first

### D. De-duplicate
- [x] StatsBand raw `<section data-tone="dark">` → `<Section tone="dark">`
- [-] The other 4 dark surfaces — three different padding rhythms, one is a `<footer>`;
      Phases 1/2/5 replace four of the five
- [-] `services/page.tsx` raw clipped panels — `ClippedPanel` adds `h-full`; Phase 4 deletes the band
- [-] `Button` `...rest` on `href` path — needs a discriminated props union; latent, no call site hits it
- [-] `ArrowIcon` className merge — `cn()` is a plain join, not tailwind-merge; merging would regress

### Verify
- [x] `npx tsc --noEmit` clean
- [x] `npm run lint` clean
- [x] `npm run build` clean — 36/36 static pages
- [x] Rendered text byte-identical on every route vs the pre-phase commit
- [x] DOM node counts identical (900→900 `/`, 195→195 `/about`, 654→654 `/work`, 122→122 `/contact`)
- [x] All 3 class changes individually verified to have no CSS effect
- [x] `review/phase-0.html` built
- [x] **Approved** — committed as `refactor: add API data layer, shared UI constants, de-duplicate primitives`

---

## Phase 2 — Contact closer · `feat:` — **done, awaiting approval**

### A. The closer
- [x] `ContactSection` — 1 : 1.48 grid, 40px gutter, measured from the Contact frame
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

### Verify
- [x] `npx tsc --noEmit`, `npm run lint`, `npm run build` clean — 36/36 static pages
- [x] `/work`, `/how-we-work`, `/integrations`, `/privacy`, `/terms` byte-identical at 1440 and 390
- [x] No horizontal overflow on any of the 17 routes at 390 or 1440
- [x] Form round trip driven for real: field error + `aria-invalid` + values preserved;
      send-failure banner renders (no `RESEND_API_KEY` locally, so the success panel is untested)
- [x] `review/phase-2.html` built, with the design frame beside the build
- [ ] **Your approval**, then commit

### Harness — rewritten, and a Phase 0 correction
- [x] `review/capture.sh` deleted. macOS Chrome clamps a window to 500px wide, so
      `--window-size=390` laid every page out at 500 and cropped the PNG to 390 —
      **every mobile image on the Phase 0 review page was that.** Phase 0's conclusions
      stand; they rested on rendered-text and DOM comparisons, not those images.
- [x] `review/shoot.mjs` — sets the viewport over the DevTools Protocol, grows it to the
      full page height rather than using `captureBeyondViewport` (which relaid out
      mid-capture and intermittently rendered at the wrong breakpoint), and refuses to
      capture if the page laid out at any width but the requested one
- [x] Captures now run against a production build, not the dev server — no dev indicator,
      no chunk race. Two runs of the same build: 17/17 desktop routes byte-identical.

---

## Upcoming

- [ ] **Phase 1** — Sitewide chrome (`Logo`, `Footer`, `Header`, `PageHero`, corner treatment,
      dark-palette retone, 1280px container, 4px/32px dot texture, the hex `Watermark`)
- [ ] **Phase 3** — Homepage
- [ ] **Phase 4** — Services index + 4 service pages
- [ ] **Phase 5** — Work index + collapse case studies to one template
- [ ] **Phase 6** — About
- [ ] **Phase 7** — Responsive, contrast, motion audit

---

## Blocked / waiting

- [!] **Figma quota is spent — and the Pro upgrade does not apply to this file.** The
  rate limit is charged to the plan of the team that *owns* the file. `HexaryLabs-Website`
  lives in team `1671650441008435094` (Starter, 20 calls/month, exhausted); the Dev seat
  is on `1302742348984274135`, a different team. To pull assets we need either the file
  moved into the upgraded team, or a Dev/Full seat on the owning team, or the owner to
  export the vectors for us. Blocks: the hex watermark and the logo lockup (Phase 1), the
  four service icons (Phase 4), the About hex glyphs (Phase 6).
- [!] **About team photograph** — not in `public/`. Will check whether it's placed in the
  Figma (then `download_assets` pulls it); otherwise needed from the client. Blocks Phase 6.
- [x] **Branching decided** — one commit per phase, straight onto `feat/figma-redesign`.
- [!] **Figma access** — Dev seat is on the wrong team; see the quota entry above.
- [-] `/how-we-work`, `/integrations`, `/privacy`, `/terms` — out of scope per O1, kept live.

## Debt noticed, not fixed

- `Logo.tsx` and `lib/ogImage.tsx` disagree on the brand purple (`#5B5BF0` vs `#5B45F5`),
  within the same file in `ogImage`'s case.
- `cn()` is a plain join; adopting `tailwind-merge` would let components merge rather than
  replace incoming `className`, which several currently can't do safely.
- `Button`'s props type conflates button and anchor attributes, so `...rest` is dropped on
  the `href` path.
