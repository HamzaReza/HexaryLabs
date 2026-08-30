/**
 * Runtime schemas for everything the data layer returns.
 *
 * Today these validate the static modules in `src/content/*`, where TypeScript
 * already guarantees the shape — so they mostly catch hand-edit drift. Their real
 * job starts when `source.ts` fetches from an API: validation happens once, at the
 * boundary, so a bad payload fails loudly here instead of rendering as `undefined`
 * three components deep.
 */

import { z } from "zod";

const nonEmpty = z.string().min(1);

/* ---------------------------------------------------------------- site + nav */

export const navLinkSchema = z.object({
  label: nonEmpty,
  href: nonEmpty,
});

export const navItemSchema = navLinkSchema.extend({
  children: z.array(navLinkSchema).optional(),
});

export const footerNavGroupSchema = z.object({
  heading: nonEmpty,
  links: z.array(navLinkSchema),
});

export const siteMetaSchema = z.object({
  name: nonEmpty,
  tagline: nonEmpty,
  description: nonEmpty,
  url: z.string().url(),
  email: z.string().email(),
  phone: nonEmpty,
  social: z.object({ linkedin: z.union([z.literal(""), z.string().url()]) }),
});

export const contactCtaSchema = z.object({
  closerHeading: nonEmpty,
  pageHeading: nonEmpty,
  subtitle: z.array(nonEmpty).min(1),
  submitLabel: nonEmpty,
  submitPendingLabel: nonEmpty,
  successHeading: nonEmpty,
  successBody: nonEmpty,
});

/* ------------------------------------------------------------------ services */

export const serviceStepSchema = z.object({
  number: nonEmpty,
  title: nonEmpty,
  body: nonEmpty,
});

export const serviceFaqSchema = z.object({
  question: nonEmpty,
  answer: nonEmpty,
});

export const comparisonRowSchema = z.object({
  label: nonEmpty,
  inHouse: nonEmpty,
  freelancer: nonEmpty,
  hexary: nonEmpty,
});

export const serviceSchema = z.object({
  slug: nonEmpty,
  title: nonEmpty,
  summary: nonEmpty,
  teaserQuote: nonEmpty,
  teaserBestFor: nonEmpty,
  explore: z.object({
    caseStudySlug: nonEmpty,
    diagram: z.tuple([nonEmpty, nonEmpty, nonEmpty]),
  }),
  heroEyebrow: nonEmpty,
  heroHeadline: nonEmpty,
  heroSubhead: nonEmpty,
  heroCta: nonEmpty,
  whoItsFor: z.array(nonEmpty),
  cost: z.object({ heading: nonEmpty, body: nonEmpty }).optional(),
  included: z.array(nonEmpty),
  approach: z.array(serviceStepSchema),
  comparison: z.array(comparisonRowSchema).optional(),
  illustrativeExample: nonEmpty.optional(),
  outcomes: z.array(nonEmpty),
  outcomesProofLine: nonEmpty.optional(),
  faqs: z.array(serviceFaqSchema),
  closingHeading: nonEmpty,
  closingCta: nonEmpty,
});

/* ---------------------------------------------------------------------- work */

export const workImageSchema = z.object({
  src: nonEmpty,
  alt: nonEmpty,
  size: z.enum(["small", "rectangle", "full"]),
});

export const coverSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("photo"),
    src: nonEmpty,
    alt: nonEmpty,
    objectPosition: z.enum(["top", "center", "left"]).optional(),
  }),
  z.object({
    kind: z.literal("gradient"),
    tone: z.enum(["violet", "slate", "sand"]),
  }),
  z.object({
    kind: z.literal("schematic"),
    diagram: z
      .enum(["halcyon", "eden", "medical-records", "social-lead-capture"])
      .optional(),
  }),
]);

export const metricSchema = z.object({
  value: nonEmpty,
  label: nonEmpty,
});

export const caseSectionSchema = z.object({
  heading: nonEmpty,
  body: z.array(nonEmpty),
  images: z.array(workImageSchema).optional(),
});

export const caseStudySchema = z.object({
  slug: nonEmpty,
  client: nonEmpty,
  title: nonEmpty,
  summary: nonEmpty,
  category: nonEmpty,
  featured: z.boolean().optional(),
  scope: z.array(nonEmpty).optional(),
  cover: coverSchema,
  heroMetric: metricSchema.optional(),
  metrics: z.array(metricSchema),
  challenge: caseSectionSchema,
  approach: caseSectionSchema,
  solution: caseSectionSchema,
  stack: z.array(nonEmpty),
  results: caseSectionSchema,
  quote: z.object({ text: nonEmpty, attribution: nonEmpty }).optional(),
  links: z.array(navLinkSchema).optional(),
});

/* ------------------------------------------------------------- page content */

export const statSchema = z.object({
  value: z.number(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  label: nonEmpty,
});

export const techGroupSchema = z.object({
  heading: nonEmpty,
  items: z.array(nonEmpty),
});

export const processStepSchema = z.object({
  number: nonEmpty,
  title: nonEmpty,
  body: nonEmpty,
});

export const processPhaseSchema = z.object({
  number: nonEmpty,
  title: nonEmpty,
  lead: nonEmpty,
  detail: z.array(nonEmpty),
  deliverableLabel: nonEmpty,
  deliverable: nonEmpty,
});

export const processStepDetailSchema = processStepSchema.extend({
  deliverableLabel: nonEmpty,
  deliverable: nonEmpty,
});

export const platformSchema = z.object({
  name: nonEmpty,
  body: nonEmpty,
  caseStudy: z.object({ label: nonEmpty, slug: nonEmpty }),
});

export const platformGroupSchema = z.object({
  heading: nonEmpty,
  blurb: nonEmpty,
  platforms: z.array(platformSchema),
});

/* -------------------------------------------------------------------- helper */

/**
 * Parse `value` or throw with the entity named, so a failure points at the
 * source rather than at whichever component happened to render it first.
 */
export function parseOrThrow<T>(
  schema: z.ZodType<T>,
  value: unknown,
  entity: string,
): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new Error(
      `[data] ${entity} failed validation:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}
