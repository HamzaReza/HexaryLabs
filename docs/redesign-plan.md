# Hexary Blueprint — Redesign Execution Plan (rev. 2)

Planning document only. No code has been changed. Written against the redesign brief
(2026-08-06), the two designer reviews, a full audit of the current codebase, and — as of
this revision — **the approved proposal itself** ("Website Redesign Proposal_Hexary
Labs.pdf", Slack, uploaded 2026-08-05). Section 1 has been re-verified line-by-line against
the source text; items discovered only on that second pass are marked **[2nd-pass]** and
listed together in §9.

---

## 1. Proposal inventory → phase map

Every distinct recommendation in proposal order, §1 through §8 (the brief asked for 4–7;
§§1–3 and 8 carry scope too, so they are inventoried as well). This is the checklist we
verify at every phase exit and at final review.

### §1 Executive Summary — scope of the redesign

| # | Scope item | Phase |
|---|---|---|
| 1-a | Build on the existing identity (beige-grey / black / purple / angular / hexagonal), do not replace it with a dark aesthetic | Standing constraint, all phases |
| 1-b | Structure and page hierarchy | 2–6 |
| 1-c | Responsive behaviour | Every phase; audited 7 |
| 1-d | Interactions | 1 (rules), 2–6 (per page) |
| 1-e | Reusable components | 1 |
| 1-f | **Developer handoff** | 1 + 7 — two permanent artifacts, see §3 Phase 1 and Gap-3 resolution |

### §2 Project Objectives

| # | Objective | Phase / mechanism |
|---|---|---|
| 2-1 | Communicate engineering & product-development capability | 2 (hero, services, stack), 4 |
| 2-2 | Position as professional long-term partner | Copy carries; presentation 2, 5 |
| 2-3 | **Clearly present expertise in software development, AI automation, SaaS, API integrations, CRM systems, and internal business tools** | **2 + 4.** The first four are already named on the site; **CRM systems and internal business tools are not** — a content gap. Evidence exists, so claims link to proof rather than being invented: CRM → B2B Access (Zoho CRM, `integrations.ts` CRM group) and Medical Records (Litify/Salesforce); internal business tools → Kinein (wholesale order/inventory system) and the Medical Records middleware; AI automation → Social Lead Capture + Medical Records AI backend; SaaS → Eden, KeepComing; API integrations → the whole `/integrations` mesh. Phase 2 names all six in the homepage services/stack layer; Phase 4 folds CRM + internal tools into the relevant service pages (software-engineering, ai-engineering) with case-study links. No new capability claims without evidence (same trust rule as §6). See open decision D9. **[2nd-pass — was unmapped]** |
| 2-4 | Make services and technical capabilities easier to understand | 2 (5.3 disclosure), 4 |
| 2-5 | Case studies more prominent; technical claims connected to real project evidence | 0.5b, 2, 3; claims-to-evidence is a standing rule (stack↔case links, service proof panels, integrations mesh) **[2nd-pass as explicit standing rule]** |
| 2-6 | Visual identity recognizable as Hexary Labs | 1 |
| 2-7 | **Improve visibility and consistency of CTAs** | 2 (5.6), 4 (mid-page CTAs), 6; sitewide CTA consistency audited in 7 **[2nd-pass — was only implicit]** |
| 2-8 | Reusable design system supporting future pages/services/case studies/client-facing work | 1; extensibility check in 7 (see 7-13) |

### §3 Strategic Design Recommendation — the light-and-dark system

| # | Rule | Phase |
|---|---|---|
| 3-a | Warm beige-grey primary canvas | 1 (tokens §4.1) |
| 3-b | Black for structure, typography, high-impact sections | 1 |
| 3-c | Purple as focused signal and interaction colour | 1 |
| 3-d | Selected dark sections for contrast and rhythm | 1 rule (§4.7), applied 2–6, audited 7 |
| 3-e | Subtle technical textures and modular graphics for brand recognition | 1 |
| 3-f | Premium/high-tech without flashy, futuristic, gaming, generic-AI styling | Standing design constraint; checkpoint reviews |

### §4 Creative Direction — the Hexary Blueprint vocabulary

*(Corrected on second pass: §4 is seven vocabulary items + the selectivity principle;
"restrained motion / one focal animation" belongs to §7, where it now appears as 7-10.)*

| # | Element | Phase |
|---|---|---|
| 4-a | Modular hexagonal tiles (evolving the "too isolated, visually understated" hero hexagon) | 1 primitive; used 2, 4, 4b |
| 4-b | Subtle paper-dot and technical-grid textures | 1 utilities |
| 4-c | Connecting lines and directional markers | 1 helpers; used 2–5 |
| 4-d | Architectural annotations | 1 helper; used 2–5 |
| 4-e | Layered diagrams and system maps | 2 (process map), 3, 4, 4b |
| 4-f | Angular frames with one clipped corner | 1 primitive (§4.2 — proposal says "one **upper** corner"; the committed top-right choice conforms) |
| 4-g | Controlled transitions that reveal how separate elements connect | 1 motion rules; 2 hero assemble; line-draws sitewide |
| 4-h | Selective use — "not to decorate every section, but coherent visual logic" | Standing rule (§4.4 placement caps), audited 7 |

### §5 Homepage (Phase 2 unless noted)

| # | Recommendation | Phase |
|---|---|---|
| 5.1-a | Hero retains direct messaging and strong typography | 2 |
| 5.1-b | Hex structure extends through the hero on a subtle dotted blueprint surface; suggests a system being mapped/connected/assembled | 2 |
| 5.1-c | Restrained animation: modules appearing, connecting, shifting into place | 2 (≤1.8s, once, §4.6) |
| 5.1-d | **Hero establishes three things immediately: what Hexary builds, who it builds for, why its engineering approach is credible** — a messaging/layout requirement, not just visual | 2 **[2nd-pass]** |
| 5.2-a | Our Work as a sequence of large horizontal case-study stories; visual and supporting info beside each other (fixes "titles/descriptions disconnected from visuals") | 2 (system shared with 3) |
| 5.2-b | Clipped upper corner as the recognizable pentagonal silhouette across cards, buttons, forms, containers | 1 |
| 5.2-c | Section takes more vertical space — case studies are the strongest proof | 2 |
| 5.2-d | "See All Work" becomes a prominent section-level action | 2 |
| 5.2-e | Featured selection rebalanced for conversion (Designer 2 item A: 3–4 studies incl. Medical Records, TrueCell, B2B Access) | **0.5b** interim, refined in 2 |
| 5.3-a | Replace black-overlay hover with controlled slide-out/expansion | 2 |
| 5.3-b | Expansion reveals: relevant project · product interface · simplified system diagram · short outcome/proof point · technologies used | 2 |
| 5.3-c | Tap-based expansion on mobile, no hover dependency | 2 |
| 5.4-a | Stack as hexagonal category modules, not one conventional table | 2 |
| 5.4-b | Selecting a tool reveals/links to case studies where it was used | 2 (reuses `integrations.ts` mappings) |
| 5.5-a | Process stages across slightly different layers with directional lines/arrows/markers — a process map, not equally weighted columns | 2 |
| 5.6-a | Large CTA statement itself clickable with directional arrow; whole section is the transition into Contact | 2 |
| 5.6-b | **Footer:** named in the 5.6 heading, but the section body prescribes no footer-specific changes beyond the CTA treatment. Recorded deliberately: footer is **token re-skin only** (Phase 1–2), styled to read as part of the dark transition-to-contact moment. Not an oversight. |
| 5-x | Designer 1: more structured homepage content density | 2 |

### §6 Internal pages

| # | Recommendation | Phase |
|---|---|---|
| 6.1-a | Alternating light and dark sections | 4 |
| 6.1-b | More asymmetric content layouts | 4 |
| 6.1-c | Stronger typography and section anchors | 4 |
| 6.1-d | Related project visuals | 4 |
| 6.1-e | Outcome and proof panels | 4 |
| 6.1-f | Hexagonal "Our Approach" modules | 4 |
| 6.1-g | More visible CTAs between content groups | 4 |
| 6.1-h | Technical diagrams where they explain a service | 4 |
| 6.1-i | Clear links between services ↔ technologies ↔ case studies | 4 (+2-3 mesh) |
| 6.1-j | **Consistent template, flexible enough that repeated page types don't feel identical** | 4 done-criterion **[2nd-pass]** |
| 6.2-a | Work page uses the homepage project-presentation system | 3 |
| 6.2-b | More room, clearer categorization, stronger hierarchy, intentional visual/description/tech/outcome relationship | 3 |
| 6.2-c | Filters if the number of case studies supports them | 3 — open decision D1, recommend no at six |
| 6.3-a | Technology **and architecture** information more visible, moved toward the beginning of each case study | 3 |
| 6.4-a | About: asymmetric layouts, selective technical annotations, stronger contrast | 5 |
| 6.4-b | Senior ownership / practical technology selection / production readiness / long-term collaboration as four distinct compositions | 5 |
| 6.5-a | Contact predominantly dark — the deliberate browsing→action transition | 6 |
| 6.5-b | Form inside an angular technical frame | 6 |
| 6.5-c | Expectation-setting info: response time · suitable project types · info helpful for an estimate · what happens after submission | 6 (copy needs client input, D8) |
| 6.5-d | Field structure preserved exactly (client-settled constraint from the brief) | 6 |

**Pages the proposal does not enumerate but the site ships** *(plan-added coverage — Gap 1)*:

| Page | Treatment | Phase |
|---|---|---|
| `/how-we-work` | Full redesign — the layered process-map system (5.5) at page depth with phase deliverables, plus hex "Our Approach" modules (6.1-f) | **4b** |
| `/integrations` | Clipped-panel treatment, connector-line group layouts, annotation labels; the platform→case-study mesh already embodies rule 2-5 | **4b** |
| `/privacy`, `/terms` | **Token inheritance + legibility check only** — they inherit the new palette/typography automatically via `data-tone`/tokens; Phase 7 verifies contrast and reading measure. No structural work. Stated explicitly so it reads as deliberate. | 7 |

### §7 Brand and Interface System — all twelve rules (standing audit table)

*(Rebuilt on second pass: the earlier revision carried five rows; the source lists twelve.)*

| # | Rule | Built in | Audited |
|---|---|---|---|
| 7-1 | Angular buttons and containers with one clipped corner | 1 | 7 |
| 7-2 | Warm beige-grey backgrounds | 1 | 7 |
| 7-3 | Black structural and high-impact sections | 1 | 7 |
| 7-4 | Purple signal and interaction states | 1 | 7 |
| 7-5 | Subtle paper-dot / blueprint textures | 1 | 7 |
| 7-6 | Modular hexagonal elements | 1 | 7 |
| 7-7 | Technical lines, annotations, directional markers | 1 | 7 |
| 7-8 | Strong typography-led hierarchy | 1 | 7 |
| 7-9 | **Asymmetric but controlled layouts** — standing rule sitewide, audited together with the rhythm rule (D1-4): every page checked for both monotone symmetry *and* uncontrolled asymmetry | 2–6 per page | **7 (Gap 4 — now in the audit table)** |
| 7-10 | Restrained motion, one primary focal animation per viewport | 1 (definition §4.6) | 7 |
| 7-11 | Consistent responsive behaviour | 2–6 | 7 |
| 7-12 | Accessible colour contrast and interaction states | 1 (token level) | 7 |
| 7-13 | System supports future services/projects/landing pages/marketing material without losing consistency | 1 | 7 extensibility check: could a new service page be assembled from documented primitives alone? **[2nd-pass]** |

### §8 Proposed Outcome — acceptance criteria for final review **[2nd-pass]**

Understand capabilities quickly (hero what/who/why, 5.3 disclosure) · explore work
confidently (story system, categorization, claims-to-evidence) · remember the brand
(Blueprint vocabulary applied selectively). Used as the closing review lens in Phase 7.

### Designer feedback items

| Item | Phase |
|---|---|
| D1-1 Distinctive visual language | 1 |
| D1-2 Genuine cross-page consistency — system built first, actually shared | 1; verified 7 |
| D1-3 Homepage structured-content density | 2 |
| D1-4 Repetitive-rhythm audit (consecutive identical light sections, repeated tables, equal-weight columns) | Standing rule 2–6; audited 7 with 7-9 |
| D2-A Homepage case-study selection (3–4, conversion-led) | 0.5b |
| D2-B Per-route Open Graph/Twitter tags, every route | 0.5a |

---

## 2. Codebase audit — delete/rebuild vs update in place

Baseline: Next.js 16.2.10 App Router, ~90 files under `src/`, all copy in typed modules
under `src/content/`, design tokens in `src/app/globals.css` `@theme`, motion constants in
`src/lib/motion.ts`, 7 animated case-study heroes on shared `src/lib/heroLoop.ts` infra.

**Rule applied:** where the proposal specifies a fundamentally different structure, the
component is deleted and rebuilt on the new primitives. "Update in place" is reserved for
files whose *behavior* carries forward and only skin changes. Content modules always carry
forward (copy, metrics, client facts) — additive fields only.

### 2.1 Delete and rebuild

| Current file | Replaced by | Phase |
|---|---|---|
| `src/components/sections/Hero.tsx` | New Blueprint hero (hex assembly on dotted surface; what/who/why messaging structure) | 2 |
| `src/components/visuals/HexLattice.tsx` | New `HexAssembly` visual (this is the "too isolated" hexagon; its performance patterns — ref mutation, `<use>` instancing, observer-gated loop — reused as technique, not code) | 2 |
| `src/components/sections/WorkSection.tsx` | Horizontal case-study story system (shared with `/work`) | 2 |
| `src/components/cards/CaseStudyCard.tsx` | Same story system | 2 (grid variant retired in 3) |
| `src/components/sections/ServicesSection.tsx` | Slide-out/expansion services module (tap-based on mobile) | 2 |
| `src/components/cards/ServiceRow.tsx` | Same — the black hover-wipe is the reference site's signature; the proposal explicitly replaces "the simple black overlay" | 2 |
| `src/components/sections/TechStack.tsx` | Hexagonal stack modules with case-study links | 2 |
| `src/components/sections/ProcessSection.tsx` | Layered process map with directional markers | 2 |
| `src/components/sections/CtaBand.tsx` | Clickable-statement CTA (whole section = transition to Contact) | 2 |
| `src/components/sections/ClosingCta.tsx` | Same CTA system, page variant | 2 (consumed by 3–6) |
| `src/components/ui/Button.tsx` | Clipped-corner button (API shape — `variant/size/href/icon` — preserved so call sites survive) | 1 |
| `src/components/sections/PageHero.tsx` | Blueprint page hero (annotated, angular frame) | 1 primitive, adopted 3–6 |
| `src/components/sections/StatsBand.tsx` | Rebuilt proof band — metallic-gradient numerals (`text-metal`, `--gradient-metal`) are Goji-derived and die with the old identity; `CountUp` reused | 2 |
| `src/app/how-we-work/page.tsx` (presentation) | Page-depth process map; content module `how-we-work.ts` carries in full | 4b |
| `src/app/integrations/page.tsx` (presentation) | Clipped-panel group layouts with connector lines; `integrations.ts` carries in full | 4b |
| `src/components/ui/Marquee.tsx` | **Deleted, not replaced** — dead code (zero consumers); its CSS at `globals.css:163-179` and reduced-motion override at `:270-272` go with it | 1 sweep |
| `src/app/opengraph-image.tsx` | Shared OG template (beige canvas, dot texture, hex mark, per-page title) | 0.5a |
| `globals.css` `@theme` color tokens + gradients | New Blueprint token set (§4). Mechanisms survive: `data-tone`, `@utility` pattern, custom-property motion bridge | 1 |
| `src/components/ui/Divider.tsx` fade gradients | Re-tokened; `--gradient-rule-v/h` recolored for beige/ink | 1 |

Also retired in place (small deletions during phase sweeps):
- `CaseStudy.variant.density` (`src/content/work.ts:45`) — set on all 7 entries, read nowhere. Phase 3 sweep.
- Stale Calendly rationale comment in `next.config.ts:15-19` — no Calendly exists in `src/`. Phase 7 (paired with CSP decision D6).
- `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg` — starter leftovers, unreferenced. Phase 1 sweep.

### 2.2 Update in place (high bar — behavior carries, skin changes)

| File(s) | Why kept | Phase touched |
|---|---|---|
| `src/content/*.ts` (all 10 modules) | **Content always carries forward.** Additive only: `featured`/`category` on `work.ts`; CRM/internal-tools capability naming with evidence links (2-3); contact expectation copy | 0.5b, 2, 3, 4, 6 |
| `src/lib/motion.ts`, `useInView.ts`, `heroLoop.ts` | Brief mandates building on existing motion infra. New constants join `motion.ts`; the three drifted observer thresholds (0.15/0.25/0.4) consolidated there | 1 |
| `src/components/ui/Reveal.tsx`, `CountUp.tsx` | Working reveal/count system; Reveal gains a `draw` variant | 1 |
| The 7 animated heroes + scenes under `src/app/work/` (+ `animatedHeroes.tsx`, `CaseCover.tsx` frame) | Explicit carry-forward. Reskin framing (clipped corner, beige canvas); internal SVGs use token classes so they re-color automatically — each gets a contrast check on beige | 3 |
| `src/components/sections/ContactForm.tsx`, `src/app/contact/actions.ts`, `src/components/ui/CountrySelect.tsx`, `src/lib/dialCodes.ts` | Client-approved field structure and validation. Restyle only | 6 |
| `src/components/layout/Header.tsx`, `MobileMenu.tsx`, `Footer.tsx` | Interaction logic (mega-bar hover/focus grace timer, focus trap, scroll lock, route-reset) is solid; re-skin to new tokens + clipped CTA. Footer re-skin-only per 5.6-b | 1–2 |
| `src/components/layout/Logo.tsx`, `src/app/icon.svg` | Brand mark kept (D5); ring re-tokened for beige | 1 |
| `src/components/ui/Section.tsx`, `Container.tsx`, `SectionHeader.tsx` | `data-tone` is the consistency backbone; `Section` gains `texture` prop, `SectionHeader` gains annotation slot | 1 |
| `src/lib/cn.ts`, `truncate.ts`, `jsonld.tsx` | Utilities, unaffected | — |
| `src/proxy.ts`, `src/lib/homepageMarkdown.ts` | Markdown-for-agents mirror; regenerated after homepage rebuild | 2 |
| `src/app/sitemap.ts`, `robots.txt` route, `manifest.ts`, `layout.tsx` metadata | Working SEO layer; `layout.tsx` gains the mono annotation font | 0.5a, 1 |
| `src/app/privacy/page.tsx`, `terms/page.tsx` | Token inheritance only + Phase 7 legibility check (Gap 1) | 7 |
| `src/app/work/WorkImagesGrid.tsx`, icons (`ArrowIcon`, `CheckIcon`, `ChevronDownIcon`) | Fit the system; icons keep the square-cap glyph style | — |

### 2.3 Standing step

**Every phase ends with a dead-code sweep:** grep for orphaned components, unused CSS in
`globals.css`, unused exports/content fields stranded by that phase; `npm run lint` +
`npx tsc --noEmit` + `npm run build` must pass.

---

## 3. Phase breakdown

Ordering follows the brief with **two changes**: (1) Phase 0.5 splits into **0.5a** (OG
tags — unblocked) and **0.5b** (homepage case-study promotion — blocked on §6 metric
verification), so an unanswered client question can't delay a finished fix. (2) A new
**Phase 4b** covers `/how-we-work` and `/integrations` (Gap 1) — placed after Phase 4
because `/how-we-work` consumes the process-map system built in Phase 2 and `/integrations`
consumes the panel/link-mesh patterns built in Phase 4; both dependencies exist by then,
and About/Contact don't depend on it. Numbering of later phases is kept (5 About, 6
Contact, 7 audit) to match the brief's references.

### Phase 0.5a — Per-route Open Graph tags · size S · no dependencies
Every route gets its own `openGraph` + `twitter` metadata and a generated OG image from one
shared `ImageResponse` template: static `opengraph-image.tsx` per top-level route, dynamic
per-slug for `/services/[slug]` and `/work/[slug]`. Reuses the per-slug
`SEO_META`/`SEO_DESCRIPTION` tables; adds the missing `eden` entry.
**Done:** sharing any route previews that page's own title/description/image; validated
with a link-preview debugger against all 15 indexable URLs.

### Phase 0.5b — Homepage case-study selection · size S · blocked by §6 confirmation
Featured set (4): **Medical Records**, **TrueCell**, **B2B Access**, **Eden**; KeepComing
demoted to `/work` (an in-house product shouldn't occupy half the homepage proof).
Implemented as a `featured` flag in `work.ts` read by the *current* `WorkSection` (interim
presentation; Phase 2 rebuilds around the same flag).
**Done:** homepage shows the 4 studies with metrics; client confirmed the set (D7/D3) and
the metrics (§6).

### Phase 1 — Shared design system · size L · Section 1 verification now complete
The whole Blueprint vocabulary as tokens/primitives/utilities (Designer 1's consistency
requirement — built once, actually shared):
- **Tokens:** §4.1 color set replacing the current `@theme` palette; mono annotation font;
  texture and clip custom properties.
- **Primitives:** `ClippedPanel` (plain + hairline-bordered), rebuilt `Button`, rebuilt
  `PageHero`, `HexModule`/`HexCluster`, `ConnectorLine`, `Annotation`, `DirectionalMarker`.
- **Utilities:** `texture-dots`, `texture-grid` (§4.4); focus ring re-tokened.
- **Motion:** constants and easings into `motion.ts`; `Reveal` gains `draw`; thresholds
  consolidated; one-focal-animation rule documented in the file header.
- **Chrome re-skin:** Header/MobileMenu/Footer/Logo on new tokens.
- Sweep: delete `Marquee` + CSS, starter SVGs, old gradient tokens.
- **Developer handoff artifacts (Gap 3 — decision: both, permanent):**
  1. **`/dev/blueprint` becomes `/styleguide` and is permanent** — living reference
     rendering every primitive/token/texture in all tones at 390/768/1440. `noindex`,
     excluded from `sitemap.ts`, `Disallow: /styleguide` in robots. Not deleted in Phase 7.
  2. **`docs/design-system.md`** — written companion: token table with measured contrast
     ratios, clip/hex/texture/motion rules (§4 of this plan graduates into it), composition
     do/don'ts, and "how to add a page from existing primitives" (rule 7-13).
**Done:** styleguide page renders everything in light/muted/dark at 3 widths; contrast
table documented; `docs/design-system.md` exists and matches; build/lint/types clean.

### Phase 2 — Homepage · size XL · depends on 1
Implements 5.1–5.6 plus Designer 1 density plus objective 2-3's capability naming. Hero
carries the what/who/why structure (5.1-d). Density plan, structured not decorative:
featured work grows to 4 story rows; services expansion surfaces project + interface +
diagram + proof + technologies per service (5.3-b); stack modules link every tool to its
case study; process map carries phase deliverables from `how-we-work.ts`; an integrations
proof strip links to `/integrations`; **all six §2-3 capability areas (incl. CRM systems,
internal business tools) named and evidence-linked**. Rhythm rule + 7-9 applied.
`homepageMarkdown.ts` regenerated.
**Done:** all 5.x rows in §1 live; six capability areas present with links to proof; no
two adjacent sections share tone+layout; hero assemble ≤1.8s once, reduced-motion safe;
Lighthouse perf ≥95; markdown mirror matches.

### Phase 3 — Work page & case studies · size L · depends on 2
`/work` on the homepage story system with category eyebrows (additive `category` field)
and curated hierarchy. Filters: recommend **no** (D1). Case pages: reskin the four body
layouts on new primitives, **move technology + architecture above the fold on every
variant** (6.3-a), keep all seven animated heroes with clipped framing, verify each hero's
SVG contrast on beige. Sweep: retire `variant.density`, retire old grid card.
**Done:** stack/architecture visible without scrolling past the hero at 1440 and 390; all
7 heroes loop on the new canvas; unlisted `social-lead-capture-automation` behavior kept.

### Phase 4 — Services pages · size L · depends on 1 (3 useful for cross-links)
All of 6.1-a…j across the four service pages: alternating light/dark per §4.7, asymmetric
compositions, anchor sub-nav, related case-study visuals, outcome/proof panels, hexagonal
"Our Approach" modules, mid-page CTAs, one technical diagram per service (new SVGs in the
schematic style), service ↔ technology ↔ case-study mesh, **CRM systems and internal
business tools named where evidence supports** (2-3). `ComparisonTable`/`FaqList`
re-skinned (comparison stays exclusive to software-engineering).
**Done (incl. 6.1-j):** four pages on one template, each visually distinct in composition
— reviewed side-by-side to confirm they don't feel identical; every service links to ≥1
case study and ≥1 stack category; FAQ JSON-LD intact.

### Phase 4b — How We Work & Integrations · size M · depends on 2 (process map) and 4 (panels) — Gap 1
`/how-we-work`: full-page layered process map — each of the four phases as a stepped
composition with connector lines and deliverable panels in clipped frames; `whatWeAsk` as
annotated modules. This page is linked from the redesigned homepage process section and
Work-page closing CTA, so it cannot lag the pages that point at it. `/integrations`:
platform groups as clipped panels with connector lines to their proving case studies,
annotation labels, `approach` grid on the new primitives. Content modules unchanged.
**Done:** neither page contains any pre-Blueprint component; visual continuity from the
homepage process section into `/how-we-work` (same map grammar at greater depth); every
integration panel links to its case study.

### Phase 5 — About · size M · depends on 1
6.4: the four themes (senior ownership, practical technology selection, production
readiness, long-term collaboration) recomposed from existing `about.ts` copy into four
structurally different compositions (annotated portrait block, hex-module grid, stat/proof
panel, timeline band — final mapping at checkpoint). Selective annotations; one dark proof
moment per §4.7. Copy gaps escalated, not invented.
**Done:** four distinct compositions, no consecutive text blocks; existing copy fully
reused.

### Phase 6 — Contact · size M · depends on 1
6.5: page-level dark treatment (the one dark page — the browsing→action transition).
Form restyled inside an angular technical frame — **fields untouched**: First/Last Name,
Company Email, Company Name, optional Phone + country selector, message; no dropdowns.
Expectation panel: response time, suitable project types, what to include for an estimate,
what happens next — drafted in-phase for client approval (response time needs client
confirmation, D8). Validation/action/`CountrySelect` behavior untouched; dark-tone focus
and error states verified.
**Done:** form submits identically; AA contrast on all form states on dark; client
approved expectation copy.

### Phase 7 — Consistency, responsive, accessibility, motion audit · size M · depends on 2–6 + 4b
The full §7 twelve-rule audit (table in §1), page by page — including **7-9 asymmetric-
but-controlled audited together with the D1-4 rhythm rule**, and the 7-13 extensibility
check (assemble a hypothetical new service page from documented primitives only).
Responsive 320→1920, no horizontal overflow; contrast + interaction states light and dark;
one focal animation per viewport verified; `prefers-reduced-motion` full pass; **`/privacy`
+ `/terms` legibility/contrast check on inherited tokens** (Gap 1). CTA visibility and
consistency swept sitewide (2-7). §8 outcome used as the closing review lens.
**Styleguide is verified current, not deleted** (Gap 3); `docs/design-system.md` updated to
final state. Final dead-code sweep. Fold in pre-existing debts: Kinein hero accessible
name, CSP decision (D6), JSON-LD `site.name` hard-codes.
**Done:** §1 inventory ticked item-by-item against the proposal PDF; every row mapped to a
shipped artifact; build/lint/types clean; Lighthouse a11y 100 on all routes.

---

## 4. Committed visual decisions

No designer, no Figma — concrete calls decided now. Each gets a screenshot checkpoint at
first implementation; adjustments happen there, not ad hoc.

### 4.1 Color tokens

| Token | Value | Role |
|---|---|---|
| `base` | `#F5F3EE` | warm paper canvas (page background) |
| `base-2` | `#EBE8DF` | deeper beige, alternate sections |
| `contrast` | `#14130F` | warm near-black — text and structural black |
| `contrast-2` | `#0C0B09` | dark section background |
| `surface-dark` | `#191813` | cards/panels on dark |
| `accent` | `#5B45F5` | purple signal — unchanged; ~5.6:1 on `base`, AA. Interaction + selective emphasis only |
| `accent-hi` | `#8B7BFF` | accent on dark — unchanged, 6.8:1 on near-black |
| `grey-100` | `#E2DDD1` | hairlines on light |
| `grey-200` | `#D1CCBE` | secondary hairlines/fills on light |
| `grey-300` | `#B5AF9F` | body/muted text on dark |
| `grey-500` | `#8A8577` | muted on dark only — **forbidden on light** (fails AA), rule documented in-token |
| `grey-600` | `#5C5849` | muted/secondary text on light (≥5:1 on `base`) |
| `grey-700` | `#35332A` | hairlines on dark |
| `success` | `#3E8A52` | results arrows (deepened for beige AA) |

Deleted: `--gradient-metal` (+ `text-metal`), cool-grey ramp, pure white/black bases. Kept
mechanisms: `data-tone` self-recoloring, 0.8px hairlines, radius 0 outside the clip system,
global 2px accent `:focus-visible` ring (accent-hi on dark). Rule gradients recolored to
ink-on-beige. Logo inner hex `#5B5BF0` stays the one brand constant. Phase 1 measures and
documents every pair's ratio in `globals.css` comments (existing convention carries).

### 4.2 Clipped-corner (pentagonal) silhouette

- **Top-right corner, 45°** — conforms to the proposal's "one upper corner" (5.2-b).
  Always exactly one clipped corner; never a bottom corner; nested elements clip the same corner.
- Sizes (`--clip`): **10px** buttons/chips/fields · **18px** cards/panels · **28px** heroes, section frames, the contact form frame.
- `clip-path: polygon(0 0, calc(100% - var(--clip)) 0, 100% var(--clip), 100% 100%, 0 100%)`.
- Bordered variant (borders don't follow clip-path): two stacked clipped layers — outer carries border color, inner inset by the 0.8px hairline. Pure CSS, any size.
- Buttons keep the current API; `block` variant keeps square corners (footer CTA rows read as structure, not objects).

### 4.3 Hexagonal module system

- **Flat-top hexagons**, aspect 1 : 0.866. `--hex-w`: 96px desktop / 72px tablet / 56px mobile.
- Four tile roles: `outline` (0.8px hairline, default) · `ink` · `signal` (accent — **max one per composition**) · `textured` (dot fill).
- Composition rules: tiles snap to a shared-edge lattice (no floating hexes — the fix for "too isolated"); clusters of 3–7; connecting lines exit edge midpoints at 0°/60°/120°; annotations attach to lines, not tiles.
- One `<defs>` polygon + `<use>` instances (HexLattice technique, kept).

### 4.4 Blueprint textures

- **Paper-dot:** `radial-gradient(circle, <ink> 1px, transparent 1px)`, 24px grid; `rgba(20,19,15,0.07)` light / `rgba(245,243,238,0.06)` dark.
- **Technical grid:** 1px hairlines every 96px (locked to `--hex-w` so grid and hexes register) at `rgba(20,19,15,0.05)`; an 8px sub-grid at half opacity **only** in the homepage hero.
- Pure CSS via `@utility texture-dots` / `texture-grid` — zero requests, zero raster.
- Placement rule (4-h selectivity): section backgrounds only; never behind body copy longer than ~3 lines; at most one textured surface per viewport.

### 4.5 Annotation & typography

- Display **Space Grotesk** + body **Inter** carry forward (proposal 5.1-a praises the current typography; the repositioned voice lives in the copy).
- **Annotation role: IBM Plex Mono** 400/500 via `next/font/google` (D4), 11–12px, uppercase, 0.08em tracking, `grey-600` light / `grey-300` dark. For eyebrows, diagram labels, markers, section indexes ("01 / Work"). Sparingly — the architectural-annotation voice, not a third body font.
- Markers: crosshair `+` at line intersections, 6px square-cap arrowheads (matching existing hero SVG grammar), anchors as mono index numbers.

### 4.6 Motion rules

- Master hover/color timing stays **0.3s ease-in-out**.
- Structural/reveal easing: `--ease-blueprint: cubic-bezier(0.22, 1, 0.36, 1)`, 500ms.
- Line draw: `stroke-dashoffset`, 600ms per segment, 80ms stagger — same `pct()` technique as the case heroes.
- Homepage hero assemble: ≤1800ms total, plays **once** (case heroes remain the only loops sitewide).
- **One focal animation per viewport** (7-10) — focal = anything looping or >400ms; `Reveal` fade-ups don't count. Enforced per phase, audited in 7.
- All constants in `src/lib/motion.ts`; reduced-motion collapses to meaningful end states.

### 4.7 Dark-section treatment (rule — D2)

On light pages, **at most two dark moments — one mid-page proof section plus the closing
CTA band — never adjacent, at most one per viewport at any scroll position.** Contact is
the only page-level dark surface. Dark sections use `contrast-2` + `surface-dark` panels +
`accent-hi`; grid texture allowed at dark opacity.

### 4.8 OG image template (Phase 0.5a)

1200×630: beige `base` canvas, dot texture at 7%, hex mark top-left, mono eyebrow (route
category), Space Grotesk title (2 lines max, word-truncated), purple signal rule
bottom-left. One `ImageResponse` template; per-route title/eyebrow inputs.

---

## 5. Open decisions needing client input

| # | Decision | Recommendation | Needed before |
|---|---|---|---|
| D1 | Work-page filters at six studies (6.2-c) | **No filters.** Six items across ~4 categories yields 1–2-card filter states that read as empty (Designer 1's complaint). Category eyebrows + curated order; revisit at 9+. | Phase 3 |
| D2 | Dark-section frequency | Adopt §4.7 rule. | Phase 1 |
| D3 | Featured homepage set | Medical Records, TrueCell, B2B Access, Eden; KeepComing to `/work`. | Phase 0.5b |
| D4 | Mono annotation font (IBM Plex Mono, self-hosted woff2) | Yes — one subset font file. | Phase 1 |
| D5 | Logo mark | Keep unchanged (ring re-tokened). The proposal evolves the *hero* hexagon, not the mark. Confirm out of scope. | Phase 1 |
| D6 | CSP | Stated blocker (Calendly) doesn't exist in code. Add CSP in Phase 7, report-only first. Flagged, not fixed. | Phase 7 |
| D7 | Beige swatch sign-off | `#F5F3EE` committed; client reviews at Phase 1 checkpoint screenshots. | Phase 1 exit |
| D8 | Contact expectation copy — response-time promise, suitable project types | Client supplies/confirms response time; we draft the rest for approval. | Phase 6 |
| D9 | **How CRM systems + internal business tools are named** (objective 2-3): as named sub-capabilities inside Software Engineering / AI Engineering (recommended — evidence-linked, no new service pages), or as homepage-level capability labels only | Sub-capabilities with case-study links; no new service pages at current content depth. | Phase 2 |

---

## 6. Verification items to escalate (blocking Phase 0.5b)

Live on the site today but never confirmed real by the client. Phase 0.5b promotes the
first two sets to the homepage — **confirm, don't remove, don't invent replacements**:

1. TrueCell: **"99.7% inventory accuracy"**, **"14 min/day to reconcile"** (`src/content/work.ts`).
2. B2B Access: **"2,400+ verified shops"**, **"80+ vetted brands"**, **"verified in under 24 hours"** (`src/content/work.ts`).
3. Homepage stack (`src/content/tech.ts`, still carrying its own `⚠️ PLACEHOLDER` marker): **"Go"**, **"Java"**; minor: **"Tailwind CSS"** in the Product row.

Related (design-spec launch blockers, same client conversation): stats-band figures
(50+ products, 10M+ users, $100M+ raised) were flagged PLACEHOLDER in `stats.ts`; Phase 2
re-presents them. Objective 2-5 (claims connected to evidence) makes all of these
promotion-blocking, not cosmetic.

---

## 7. What carries forward (explicit)

All written copy and case-study content (`src/content/*` — additive edits only) · the
seven animated case-study diagrams and `heroLoop` infrastructure · the repositioned brand
voice · per-page meta descriptions and canonicals · the contact form's field structure,
validation, and server action · the stats-band figures (pending §6) · the motion
infrastructure (`useInView`, `motion.ts`, `Reveal`, `CountUp`, `heroLoop.ts`) · `data-tone`
sections, `Container`, hairline grammar, focus-ring discipline, skip link, JSON-LD layer,
sitemap/robots/manifest, markdown-for-agents proxy · Space Grotesk + Inter.

## 8. Noted in passing (not fixed, per instructions)

- Contact action: no spam protection; Resend failures swallowed in a bare `catch {}`
  (`actions.ts:123`) — honeypot + logging proposed as a Phase 6 rider if approved.
- `KineinStoryHero` has no accessible name (all scenes `aria-hidden`, wrapper unlabeled) — Phase 7.
- `SEO_DESCRIPTION` missing `eden` (`work/[slug]/page.tsx`) — folded into Phase 0.5a.
- JSON-LD hard-codes "Hexary Labs" instead of `site.name` in two places — Phase 7 sweep.

## 9. Changed in this revision (rev. 2)

**The five briefed gaps:**
1. `/how-we-work`, `/integrations`, `/privacy`, `/terms` now covered — new Phase 4b for the
   first two (placed after Phase 4; rationale in §3), legal pages explicitly
   token-inheritance + Phase 7 legibility check.
2. Objective 2-3 (CRM systems, internal business tools) inventoried and assigned to
   Phases 2 + 4 with an evidence map and no-invention rule; new decision D9.
3. Developer handoff resolved as **both** artifacts: permanent `/styleguide` (noindex,
   out of sitemap) + `docs/design-system.md`; Phase 1 "done" and Phase 7 updated — the
   styleguide is verified, not deleted.
4. "Asymmetric but controlled layouts" is now rule 7-9 in a rebuilt twelve-rule §7 audit
   table, checked alongside the D1-4 rhythm rule in Phase 7.
5. 5.6 re-read at source: heading says "Final CTA and Footer" but the body prescribes no
   footer-specific change; footer recorded as deliberate re-skin-only (row 5.6-b).

**Additional items found reading the proposal directly (beyond the five):**
6. **5.1-d** — the hero must establish what Hexary builds / who for / why credible
   *immediately*: a messaging-structure requirement now in the inventory and Phase 2.
7. **2-7** — "improve visibility and consistency of CTAs" is a sitewide objective, not
   just 5.6/6.1; added as an inventory row and a Phase 7 sweep.
8. **2-5** — "connect technical claims to real project evidence" promoted to an explicit
   standing rule (it also reclassifies the §6 metric confirmations as promotion-blocking).
9. **6.1-j** — consistent template that still prevents repeated page types from feeling
   identical; now an inventory row and a Phase 4 done-criterion.
10. **7-13** — the system must support future pages/materials; added an extensibility
    check to Phase 7 (new page assemblable from documented primitives alone).
11. **§8** — the proposal's outcome statement adopted as Phase 7's closing review lens.
12. Correction: the motion-restraint rule was misattributed to proposal §4 in rev. 1; it
    belongs to §7 (now 7-10). §4's inventory now matches the source's seven bullets +
    selectivity principle exactly.
13. Confirmation: the proposal specifies "one **upper** corner" for the clip — the
    committed top-right choice conforms (noted in §4.2).
