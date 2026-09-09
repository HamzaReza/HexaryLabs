import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { Accordion } from "@/components/ui/Accordion";
import { ChevronRun } from "@/components/visuals/ChevronRun";
import { HexWatermark } from "@/components/visuals/HexWatermark";
import { isServiceHexSlug } from "@/components/visuals/HeroHexField";
import { ServiceApproach } from "@/components/sections/ServiceApproach";
import { ServiceOutcomes } from "@/components/sections/ServiceOutcomes";
import { ServiceComparison } from "@/components/sections/ServiceComparison";
import { ContactSection } from "@/components/sections/ContactSection";
import { CaseCover } from "@/app/work/CaseCover";
import {
  getRelatedCaseStudy,
  getServiceBySlug,
  getServiceSlugs,
  getSiteMeta,
} from "@/lib/data";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams() {
  return (await getServiceSlugs()).map((slug) => ({ slug }));
}

const SEO_META: Record<string, { title: string; description: string }> = {
  "product-strategy": {
    title: "Product Strategy",
    description:
      "Validated roadmaps and technical feasibility for founders and product leaders. Know what to build before you spend a cent building it.",
  },
  "product-design": {
    title: "Product Design & UX",
    description:
      "Research, interface design, and design systems for software products. UX that holds up once real users touch it, not just in the demo.",
  },
  "software-engineering": {
    title: "Custom Software Development",
    description:
      "Web, mobile, and backend systems built to scale. Node.js, TypeScript, Python, .NET, PHP, on AWS, Azure, or GCP. Chosen for your business, not our defaults.",
  },
  "ai-engineering": {
    title: "AI Development Services",
    description:
      "AI agents, RAG systems, LLM integrations, and intelligent automation built to work in production. Evaluated, grounded in your data, monitored after launch.",
  },
};

// Next 16: `params` is a Promise — synchronous access was removed.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  const seo = SEO_META[service.slug];

  return pageMetadata({
    title: seo?.title ?? service.title,
    description: seo?.description ?? service.heroSubhead,
    path: `/services/${service.slug}`,
  });
}

/**
 * All four service pages render through this one composition.
 *
 * Differences live in the data: step counts (3 vs 4), outcome counts (3 vs 4),
 * and optional bands (`cost`, `comparison`, `illustrativeExample`,
 * `outcomesProofLine`). Section order follows the Figma frames — comparison
 * sits between approach and related work when present.
 *
 * Section rhythm is the design's: 80px of lead-in, 100px of run-out, and 48px
 * from a heading to the block it introduces.
 */
export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [site, study] = await Promise.all([
    getSiteMeta(),
    getRelatedCaseStudy(service),
  ]);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.heroSubhead,
    provider: { "@type": "Organization", name: site.name },
    areaServed: "Worldwide",
  };

  const faqJsonLd =
    service.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const breadcrumbJsonLd = breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ]);

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />

      <PageHero
        tone="dark"
        hexVariant={
          isServiceHexSlug(service.slug) ? service.slug : "product-design"
        }
        eyebrow={`Services / ${service.title}`}
        title={service.heroHeadline}
        titleClassName="lg:max-w-[630px]"
        intro={service.heroSubhead}
        cta={{ label: service.heroCta, href: "/contact" }}
      />

      {/* ---------------------------------------------- this is probably you */}
      <section
        data-tone="dark"
        className="relative isolate overflow-hidden bg-contrast-2 py-10 md:py-14 lg:pb-[100px] lg:pt-20"
      >
        {/* Hatched hex watermark — desktop frames only; the 390 frames carry
            the list and the accent band with no ornament.
            Must sit at z-0 (not -z-10): `isolate` makes a stacking context, so
            a negative z-index paints *behind* the section's opaque fill and
            the mark disappears. Content stays above via the Container. */}
        <HexWatermark
          className="pointer-events-none absolute left-[-52px] top-[210px] z-0 h-[441px] w-[452px] max-lg:hidden"
        />
        <div className="relative z-10">
        <Container>
          {/* Side-by-side (648 + list) is the 1280/1440 composition. At `lg`
              (1024) a fixed 648px column crushes the list into ~328px — stack
              until `xl` so the two-col checklist keeps full container width. */}
          <div className="grid gap-8 sm:gap-10 xl:grid-cols-[648px_1fr] xl:gap-0">
            <h2 className="text-center text-section uppercase text-white xl:text-left">
              This is probably you if
            </h2>
            <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {service.whoItsFor.map((item, i) => (
                <li key={item} className={cnRow(i, 2, "dark")}>
                  <CheckIcon className="mt-0.5 size-6 shrink-0 text-accent" />
                  <span className="text-body text-grey-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.cost && (
            <div className="mt-8 sm:mt-12">
              <AccentBand heading={service.cost.heading} body={service.cost.body} />
            </div>
          )}
        </Container>
        </div>
      </section>

      {/* ------------------------------------------------------ what's included */}
      <section className="bg-base py-10 md:py-14 lg:pb-[100px] lg:pt-20">
        <Container>
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[316px_1fr] lg:gap-0">
            <h2 className="text-center text-section uppercase text-contrast-2 lg:text-left">
              What&rsquo;s included
            </h2>
            <ol className="grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
              {service.included.map((item, i) => (
                <li key={item} className={cnRow(i, 3, "light")}>
                  <span
                    aria-hidden
                    className="shrink-0 text-lead text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body text-contrast">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <ServiceApproach
        steps={service.approach}
        cta={{ label: service.heroCta, href: "/contact" }}
      />

      {service.comparison && service.comparison.length > 0 && (
        <ServiceComparison rows={service.comparison} />
      )}

      {/* ---------------------------------------------------------- related work */}
      {study && (
        <section className="bg-base-2 md:py-14 lg:pb-16 lg:pt-10">
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-[576px_1fr] lg:gap-[64px]">
              <div className="min-w-0 pt-8 md:pt-0">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-caption uppercase text-accent">Related work</p>
                  {/* White chevrons on #F1F1F1 read as a groove cut into the
                      surface — same treatment as WorkCta. Hidden below `lg`
                      where the column is too narrow for the run. */}
                  <ChevronRun
                    count={30}
                    className="hidden h-[38px] min-w-0 flex-1 text-white lg:block"
                  />
                </div>
                <h2 className="mt-4 text-section text-contrast-2 sm:mt-5">
                  {study.displayName ?? study.title}
                </h2>
                <p className="mt-4 text-body text-grey-600 sm:mt-5">{study.summary}</p>
                <Button
                  href={`/work/${study.slug}`}
                  variant="outline"
                  className="mt-8 max-sm:w-full max-sm:justify-center"
                >
                  Read Case Study
                </Button>
              </div>
              {/* Product plate, not the study's architecture diagram — same
                  preference as `/work` rows (`rowCover ?? cover`). Figma pairs
                  KeepComing wallet, Eden agents, TrueCell product page, and the
                  Medical Records diagram respectively. Aspect 640×400 = 1.6. */}
              <CaseCover
                cover={study.rowCover ?? study.cover}
                title={study.displayName ?? study.title}
                aspect="aspect-[1.95] md:aspect-[1.6]"
                className="max-md:-mx-5 max-md:rounded-none md:rounded-lg"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>
          </Container>
        </section>
      )}

      <ServiceOutcomes
        outcomes={service.outcomes}
        proofLine={service.outcomesProofLine}
      />

      {/* ------------------------------------------------------------------ faq */}
      <section className="bg-base py-10 md:py-14 lg:pb-[100px] lg:pt-20">
        <Container>
          {/* Fixed 542+738 matches the 1280 content column — at `lg` (1024)
              that 1280 track overflows the page (~280px), so dark full-bleed
              bands look inset next to the wider FAQ. Use fr tracks (same
              ratio) so the grid stays inside Container at every width. */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,542fr)_minmax(0,738fr)] lg:gap-0">
            <h2 className="text-center text-section uppercase text-contrast-2 lg:text-left">
              FAQ
            </h2>
            <Accordion items={service.faqs} />
          </div>
        </Container>
      </section>

      {/* The illustrative scenario is deliberately unattributed — it is not a
          client, and must never be presented as one. */}
      {service.illustrativeExample && (
        <section className="bg-base-2 py-10 md:py-14">
          <Container>
            <p className="mx-auto max-w-[880px] text-center text-lead text-grey-600">
              {service.illustrativeExample}
            </p>
          </Container>
        </section>
      )}

      <ContactSection />
    </>
  );
}

/**
 * Rows after the first in a column carry the design's divider.
 *
 * The rule is drawn per item rather than on the list, because the design rules
 * each *column* independently — a two-column grid gets a rule above items 3
 * and up, a three-column grid above items 4 and up.
 */
function cnRow(index: number, columns: number, tone: "dark" | "light") {
  /* Written out rather than composed, because Tailwind scans source text: a
     class assembled at runtime is never generated. */
  const dark = tone === "dark";
  const base = "flex gap-4 pb-3 sm:pb-4";
  /* Below `sm` the list is one column whatever `columns` says, so the rule and
     the top padding belong on every row but the first — and the design pads
     these rows 12, not 16. */
  const stacked =
    index > 0
      ? dark
        ? "max-sm:border-t max-sm:border-white/10 max-sm:pt-3"
        : "max-sm:border-t max-sm:border-grey-200 max-sm:pt-3"
      : "";
  const columned =
    index < columns
      ? ""
      : dark
        ? "sm:border-t sm:border-white/10 sm:pt-4"
        : "sm:border-t sm:border-grey-200 sm:pt-4";
  return [base, stacked, columned].filter(Boolean).join(" ");
}

/**
 * "Why it matters" — full-bleed accent band.
 *
 * Desktop: label + heading share a horizontal row with the body (items-
 * centered), separated by a lavender rule; the band itself is clipped on the
 * top-right corner. Mobile: the same copy stacks, label still ink on the
 * gradient (not white).
 */
function AccentBand({ heading, body }: { heading: string; body: string }) {
  return (
    <div
      className="bg-accent-band overflow-hidden"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)",
      }}
    >
      <div className="grid gap-[18px] p-4 sm:gap-6 sm:p-8 lg:grid-cols-[1fr_604px] lg:items-center lg:gap-0 lg:px-12 lg:py-8">
        <div className="flex flex-col gap-2 lg:gap-[13.5px]">
          <p className="font-mono text-caption uppercase text-contrast-2 max-lg:text-[12px]">
            Why it matters
          </p>
          <p className="text-card text-white max-lg:font-sans max-lg:text-body-lg max-lg:font-medium max-lg:leading-[26px] max-lg:tracking-normal">
            {heading}
          </p>
        </div>
        <p className="text-body text-grey-200 max-lg:text-[14px] lg:border-l-2 lg:border-accent-hi lg:pl-6">
          {body}
        </p>
      </div>
    </div>
  );
}
