/**
 * Service queries.
 *
 * Async by design. The source is synchronous today, but every caller already
 * awaits, so swapping `source.ts` to `fetch` changes no call site.
 */

import { loadCaseStudies, loadServices, loadServicesOverview } from "./source";
import type { CaseStudy, Service } from "./types";

export async function getServices(): Promise<Service[]> {
  return loadServices();
}

/** `null` when the slug is unknown — routes turn that into `notFound()`. */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return loadServices().find((service) => service.slug === slug) ?? null;
}

/** Drives `generateStaticParams` for `/services/[slug]`. */
export async function getServiceSlugs(): Promise<string[]> {
  return loadServices().map((service) => service.slug);
}

export async function getServicesOverview() {
  return loadServicesOverview();
}

/**
 * The case study a service points at for proof.
 *
 * Was `work.find(w => w.slug === service.explore.caseStudySlug)`, duplicated in
 * `ServicesExplorer` and `services/[slug]/page.tsx`.
 */
export async function getRelatedCaseStudy(
  service: Service,
): Promise<CaseStudy | null> {
  return (
    loadCaseStudies().find(
      (study) => study.slug === service.explore.caseStudySlug,
    ) ?? null
  );
}
