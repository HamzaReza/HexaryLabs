# Figma redesign — progress

Live status board for the `feat/figma-redesign` branch. Updated after every task.
Plan of record: `~/.claude/plans/what-i-meant-by-peppy-pinwheel.md`.

**Legend:** `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked · `[-]` skipped

---

## Now

**Phase 0 approved and committed.** Review page: `review/phase-0.html`
**Phase 2 in progress** — the contact form as the sitewide page closer.
Phase 1 (sitewide chrome) is deferred, not dropped; it runs after Phase 2.

---

## Setup

- [x] Cut branch `feat/figma-redesign` from `main` @ `91580f2`
- [x] `chore:` sync `package-lock.json`, ignore `/review` — commit `8383d35`
- [x] Capture harness `review/capture.sh` (17 routes × desktop 1440 / mobile 390)
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

## Upcoming

- [ ] **Phase 1** — Sitewide chrome (`Logo`, `Footer`, `Header`, `PageHero`, corner treatment)
- [ ] **Phase 2** — Contact form as the page closer
- [ ] **Phase 3** — Homepage
- [ ] **Phase 4** — Services index + 4 service pages
- [ ] **Phase 5** — Work index + collapse case studies to one template
- [ ] **Phase 6** — About
- [ ] **Phase 7** — Responsive, contrast, motion audit

---

## Blocked / waiting

- [!] **About team photograph** — not in `public/`. Will check whether it's placed in the
  Figma (then `download_assets` pulls it); otherwise needed from the client. Blocks Phase 6.
- [x] **Branching decided** — one commit per phase, straight onto `feat/figma-redesign`.
- [x] **Figma access** — upgraded to Pro / Dev seat, 200 calls/day. Assets pull directly.
- [-] `/how-we-work`, `/integrations`, `/privacy`, `/terms` — out of scope per O1, kept live.

## Debt noticed, not fixed

- `Logo.tsx` and `lib/ogImage.tsx` disagree on the brand purple (`#5B5BF0` vs `#5B45F5`),
  within the same file in `ogImage`'s case.
- `cn()` is a plain join; adopting `tailwind-merge` would let components merge rather than
  replace incoming `className`, which several currently can't do safely.
- `Button`'s props type conflates button and anchor attributes, so `...rest` is dropped on
  the `href` path.
