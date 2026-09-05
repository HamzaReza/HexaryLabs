/** Canonical origin for metadata / sitemap. Empty env values must not win over
 *  the default — Vercel often injects `NEXT_PUBLIC_SITE_URL=""` which breaks
 *  `z.string().url()` during build (`??` only skips null/undefined). */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "https://hexarylabs.com";
}

export const site = {
  name: "Hexary Labs",
  tagline: "From ambitious idea to production system.",
  description:
    "Hexary Labs is a technology partner for founders, product leaders, and enterprises building serious software: SaaS platforms, AI-powered products, business systems, and the integrations that hold them together.",

  url: resolveSiteUrl(),

  email: "hello@hexarylabs.com",
  phone: "+1 (407) 735-6142",

  /* The design's footer carries a LinkedIn glyph. No URL exists anywhere in
     the project and inventing one would ship a broken link, so the icon is
     rendered only once this is filled in. */
  social: {
    linkedin: "",
  },
} as const;

/**
 * The contact closer — one composition that ends the home, services, service
 * detail, about and case-study pages, and is the whole of /contact. Only the
 * headline differs between the two uses, so both live here rather than being
 * passed in from each page.
 *
 * Headings are authored in sentence case and rendered uppercase by the
 * component, so the copy stays readable in a CMS and the casing stays a design
 * decision.
 */
export const contactCta = {
  closerHeading: "Let’s talk",
  pageHeading: "Let’s get started.",
  subtitle: [
    "Tell us what you’re building.",
    "We’ll get back to you within a business day.",
  ],
  submitLabel: "Start a project",
  submitPendingLabel: "Sending…",
  successHeading: "Message sent.",
  successBody: "We’ll get back to you within a business day.",
} as const;
