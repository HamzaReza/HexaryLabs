/**
 * Domain types for the data layer.
 *
 * These are the contract every component codes against. Today they are satisfied
 * by the static modules in `src/content/*`; when the API lands, responses are
 * mapped into these same shapes so nothing downstream changes.
 *
 * Only files under `src/lib/data/**` may import from `@/content/*` — see the
 * `no-restricted-imports` rule in `eslint.config.mjs`.
 */

export type {
  Service,
  ServiceStep,
  ServiceFaq,
  ComparisonRow,
} from "@/content/services";

export type {
  CaseStudy,
  CaseSection,
  Cover,
  GradientTone,
  Metric,
  WorkImage,
  WorkImageSize,
} from "@/content/work";

export type { Stat } from "@/content/stats";
export type { TechGroup } from "@/content/tech";
export type { ProcessStep } from "@/content/process";
export type { ProcessPhase } from "@/content/how-we-work";
export type { Platform, PlatformGroup } from "@/content/integrations";
export type { TeamPrinciple, ExpertiseArea, WhyChooseUsItem } from "@/content/about";

/** A single navigation destination. */
export type NavLink = { label: string; href: string };

/** Top-level nav entry; `children` drives the header's services group. */
export type NavItem = NavLink & { children?: NavLink[] };

/** One titled column in the footer. */
export type FooterNavGroup = { heading: string; links: NavLink[] };

/** Site-wide identity and contact details. */
export type SiteMeta = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  /** Empty strings mean "not published yet" — callers skip the link. */
  social: { linkedin: string };
};

/**
 * Copy for the contact closer that ends five page types and forms the whole of
 * `/contact`. Headings are authored in sentence case; the component uppercases.
 */
export type ContactCta = {
  closerHeading: string;
  pageHeading: string;
  subtitle: readonly string[];
  submitLabel: string;
  submitPendingLabel: string;
  successHeading: string;
  successBody: string;
};

/**
 * A process step already joined to its deliverable.
 *
 * Replaces the positional `process[i]` ↔ `phases[i].deliverable` coupling that
 * used to live in `ProcessSection`. Joined on `number`, so reordering either
 * source can no longer silently mismatch them.
 */
export type ProcessStepDetail = {
  number: string;
  title: string;
  body: string;
  deliverableLabel: string;
  deliverable: string;
};

/* ------------------------------------------------------------------ homepage */

/**
 * The hero headline, as hand-set lines of inked runs. `lead` is the design's
 * mid-grey, `emphasis` its near-black; the tone changes partway through a line,
 * so the two structures are separate.
 */
export type HeadlineRun = { text: string; tone: "lead" | "emphasis" };

export type HomeHero = {
  headline: { lines: readonly (readonly HeadlineRun[])[] };
  subhead: readonly string[];
  actions: readonly NavLink[];
};

/**
 * The proof line beside the stats, with each client name already resolved to
 * the case study it links to — the raw content stores slugs, and the data layer
 * turns them into destinations so a dead slug fails at build rather than in the
 * browser.
 */
export type HomeProof = {
  prefix: string;
  clients: readonly NavLink[];
};

/** The outcome block: a heading, a paragraph, and the architecture still. */
export type HomeOutcome = {
  heading: string;
  body: string;
  diagram: { src: string; alt: string; width: number; height: number };
};
