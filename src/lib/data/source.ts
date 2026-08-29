/**
 * The data source. **This is the only module in the app that reads `src/content/*`.**
 *
 * Swapping to an API means changing the loaders here — `fetch` instead of a module
 * import, plus a mapper into the domain shapes — and nothing else. Every caller goes
 * through `src/lib/data/index.ts`, so no page or component needs to know where the
 * data came from. The `no-restricted-imports` rule in `eslint.config.mjs` enforces
 * that; adding a `@/content/*` import anywhere else is a lint error.
 *
 * Caching lives here too. Static modules need none, so the loaders memoise. Once
 * these become `fetch` calls, the `next: { revalidate }` policy is configured in this
 * file rather than scattered across routes.
 */

import { services as rawServices, servicesOverview as rawServicesOverview } from "@/content/services";
import { work as rawWork, WORK_INTRO as rawWorkIntro } from "@/content/work";
import { site as rawSite } from "@/content/site";
import { nav as rawNav, headerCta as rawHeaderCta, footerNav as rawFooterNav } from "@/content/nav";
import { stats as rawStats } from "@/content/stats";
import { tech as rawTech, techIntro as rawTechIntro } from "@/content/tech";
import { process as rawProcess } from "@/content/process";
import {
  phases as rawPhases,
  hero as rawHowWeWorkHero,
  intro as rawHowWeWorkIntro,
  whatWeAsk as rawWhatWeAsk,
  closing as rawHowWeWorkClosing,
} from "@/content/how-we-work";
import {
  groups as rawGroups,
  hero as rawIntegrationsHero,
  intro as rawIntegrationsIntro,
  scopeNote as rawScopeNote,
  approach as rawApproach,
  closing as rawIntegrationsClosing,
} from "@/content/integrations";
import {
  whyWeExist as rawWhyWeExist,
  whosBehind as rawWhosBehind,
  whereExpertiseRanges as rawWhereExpertiseRanges,
  whyChooseUs as rawWhyChooseUs,
} from "@/content/about";

import { z } from "zod";
import {
  caseStudySchema,
  footerNavGroupSchema,
  navItemSchema,
  navLinkSchema,
  parseOrThrow,
  platformGroupSchema,
  processPhaseSchema,
  processStepSchema,
  serviceSchema,
  siteMetaSchema,
  statSchema,
  techGroupSchema,
} from "./schemas";
import type {
  CaseStudy,
  FooterNavGroup,
  NavItem,
  NavLink,
  Platform,
  PlatformGroup,
  ProcessPhase,
  ProcessStep,
  Service,
  SiteMeta,
  Stat,
  TechGroup,
} from "./types";

/** Run `fn` once and reuse the result — validation should not repeat per request. */
function once<T>(fn: () => T): () => T {
  let value: T;
  let called = false;
  return () => {
    if (!called) {
      value = fn();
      called = true;
    }
    return value;
  };
}

/**
 * Validate, then return the original well-typed value.
 *
 * We deliberately discard zod's parsed output: it would widen tuples and strip the
 * keys a schema doesn't yet describe. The parse is the guard; the module's own
 * TypeScript types remain the contract.
 */
function checked<T>(schema: z.ZodType, value: T, entity: string): T {
  parseOrThrow(schema, value, entity);
  return value;
}

/* --------------------------------------------------------------------- loaders */

export const loadServices = once((): Service[] =>
  checked(z.array(serviceSchema), rawServices, "services"),
);

export const loadServicesOverview = once(() => rawServicesOverview);

export const loadCaseStudies = once((): CaseStudy[] =>
  checked(z.array(caseStudySchema), rawWork, "work"),
);

export const loadWorkIntro = once((): string => rawWorkIntro);

export const loadSiteMeta = once((): SiteMeta =>
  checked(siteMetaSchema, rawSite as SiteMeta, "site"),
);

export const loadNav = once((): NavItem[] =>
  checked(z.array(navItemSchema), rawNav as NavItem[], "nav"),
);

export const loadHeaderCta = once((): NavLink =>
  checked(navLinkSchema, rawHeaderCta as NavLink, "headerCta"),
);

export const loadFooterNav = once((): FooterNavGroup[] =>
  checked(z.array(footerNavGroupSchema), rawFooterNav as FooterNavGroup[], "footerNav"),
);

export const loadStats = once((): Stat[] =>
  checked(z.array(statSchema), rawStats, "stats"),
);

export const loadTechGroups = once((): TechGroup[] =>
  checked(z.array(techGroupSchema), rawTech, "tech"),
);

export const loadTechIntro = once((): string => rawTechIntro);

export const loadProcessSteps = once((): ProcessStep[] =>
  checked(z.array(processStepSchema), rawProcess, "process"),
);

export const loadProcessPhases = once((): ProcessPhase[] =>
  checked(z.array(processPhaseSchema), rawPhases, "phases"),
);

export const loadPlatformGroups = once((): PlatformGroup[] =>
  checked(z.array(platformGroupSchema), rawGroups, "integrations"),
);

/* --------------------------------------------------- whole-page copy blocks */

/**
 * These pages read a bundle of prose objects rather than a list of records, so
 * they load as one block each. Shapes are page-specific and validated by
 * TypeScript at the source; no zod schema buys anything until they come from an
 * API, at which point they get one.
 */

export const loadAboutContent = once(() => ({
  whyWeExist: rawWhyWeExist,
  whosBehind: rawWhosBehind,
  whereExpertiseRanges: rawWhereExpertiseRanges,
  whyChooseUs: rawWhyChooseUs,
}));

export const loadHowWeWorkContent = once(() => ({
  hero: rawHowWeWorkHero,
  intro: rawHowWeWorkIntro,
  phases: loadProcessPhases(),
  whatWeAsk: rawWhatWeAsk,
  closing: rawHowWeWorkClosing,
}));

export const loadIntegrationsContent = once(() => ({
  hero: rawIntegrationsHero,
  intro: rawIntegrationsIntro,
  groups: loadPlatformGroups(),
  scopeNote: rawScopeNote,
  approach: rawApproach,
  closing: rawIntegrationsClosing,
}));

export type { Platform };
