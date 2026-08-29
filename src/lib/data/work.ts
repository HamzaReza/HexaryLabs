/**
 * Case-study queries.
 *
 * Every list-shaping rule that used to live inside a component lives here, so the
 * homepage, `/work` and the tech stack all agree on what "featured" and "listed"
 * mean — and so an API can implement the same rules server-side later.
 */

import { loadCaseStudies, loadWorkIntro } from "./source";
import type { CaseStudy } from "./types";

/**
 * Live at its URL and in the sitemap, but never listed in a grid — shared
 * directly with prospects instead. Was a `Set` inside `work/page.tsx`.
 */
const UNLISTED_SLUGS = new Set(["social-lead-capture-automation"]);

/**
 * Eyebrow label per case study. Was `CLIENT_TAGS` inside `CaseStoryRow`, where a
 * presentational component owned a fact about the client.
 */
const CLIENT_TAGS: Record<string, string> = {
  eden: "Client · Eden Labs",
  keepcoming: "In-house product",
  "medical-records-platform": "Client · Anonymized",
  "social-lead-capture-automation": "Client · Anonymized",
  truecell: "Client · TrueCell",
  kinein: "Client · Kinein",
  "b2b-access": "Client · B2B Access",
};

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return loadCaseStudies();
}

/** `null` when the slug is unknown — routes turn that into `notFound()`. */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return loadCaseStudies().find((study) => study.slug === slug) ?? null;
}

/**
 * Every slug, including unlisted ones — those pages are live at their URL, so
 * `generateStaticParams` must still emit them.
 */
export async function getCaseStudySlugs(): Promise<string[]> {
  return loadCaseStudies().map((study) => study.slug);
}

/** The homepage set. Was `work.filter(s => s.featured)` in `WorkSection`. */
export async function getFeaturedWork(): Promise<CaseStudy[]> {
  return loadCaseStudies().filter((study) => study.featured);
}

/**
 * The `/work` grid: unlisted studies removed, featured first, original order
 * preserved within each band. Was three chained filters in `work/page.tsx`.
 */
export async function getListedWork(): Promise<CaseStudy[]> {
  const listed = loadCaseStudies().filter(
    (study) => !UNLISTED_SLUGS.has(study.slug),
  );
  return [
    ...listed.filter((study) => study.featured),
    ...listed.filter((study) => !study.featured),
  ];
}

/**
 * Slug → eyebrow label, for callers that render a list and want one lookup
 * rather than one call per row. Falls back to `study.client` at the call site.
 */
export async function getClientTags(): Promise<Record<string, string>> {
  return CLIENT_TAGS;
}

export async function getWorkIntro(): Promise<string> {
  return loadWorkIntro();
}

/**
 * The case study a given tool shipped in, so a stack entry can link to its
 * evidence. Matches the tool name exactly, or as the first word of a qualified
 * entry ("PostgreSQL 16", "Redis (queues)"). Was `caseStudyFor` in `TechStack`.
 */
/**
 * Resolve many tools at once into a lookup, so a component rendering a stack grid
 * can do sync lookups inside JSX instead of awaiting per cell.
 */
export async function getToolCaseStudyLinks(
  tools: string[],
): Promise<Record<string, { slug: string; title: string }>> {
  const entries = await Promise.all(
    tools.map(async (tool) => [tool, await getCaseStudyForTool(tool)] as const),
  );
  return Object.fromEntries(
    entries.filter((entry): entry is [string, { slug: string; title: string }] =>
      entry[1] !== null,
    ),
  );
}

export async function getCaseStudyForTool(
  tool: string,
): Promise<{ slug: string; title: string } | null> {
  const normalized = tool.toLowerCase();
  for (const study of loadCaseStudies()) {
    const hit = study.stack.some((entry) => {
      const value = entry.toLowerCase();
      return (
        value === normalized ||
        value.startsWith(`${normalized} `) ||
        value.startsWith(`${normalized}(`)
      );
    });
    if (hit) return { slug: study.slug, title: study.title };
  }
  return null;
}
