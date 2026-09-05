import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { Accordion } from "@/components/ui/Accordion";
import { ChevronRun } from "@/components/visuals/ChevronRun";
import { ServiceApproach } from "@/components/sections/ServiceApproach";
import { ServiceOutcomes } from "@/components/sections/ServiceOutcomes";
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
 * The previous route carried per-service layout branching; the approved design
 * gives every service the same seven beats, so the differences are entirely in
 * the data. Two beats are genuinely optional because only some services have
 * the content: the accent band needs `cost`, and the proof line under the
 * outcomes is Software Engineering's alone.
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
        eyebrow={`Services / ${service.title}`}
        title={service.heroHeadline}
        titleClassName="lg:max-w-[630px]"
        intro={service.heroSubhead}
        cta={{ label: service.heroCta, href: "/contact" }}
      />

      {/* ---------------------------------------------- this is probably you */}
      <section
        data-tone="dark"
        className="bg-contrast-2 py-10 md:py-14 lg:pb-[100px] lg:pt-20"
      >
        <Container>
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[648px_1fr] lg:gap-0">
            {/* Centred on the 390 frames, left in the desktop grid. The design
                centres every section heading on a phone except the
                related-work band's, which stays left under its label. */}
            <h2 className="text-center text-section uppercase text-white lg:text-left">
              This is probably you if
            </h2>
            {/* Two columns of 300 on a 32px gutter, with a rule between rows —
                the design pairs the items rather than running one long list. */}
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

      {/* ---------------------------------------------------------- related work */}
      {/* The one band on the page the design gives no vertical padding of its
          own at 390: the cover bleeds to the left, right and bottom edges, and
          the copy above it carries the 32/32. */}
      {study && (
        <section className="bg-base-2 md:py-14 lg:pb-16 lg:pt-10">
          <Container>
            <div className="grid items-center gap-8 lg:grid-cols-[576px_1fr] lg:gap-[64px]">
              <div className="min-w-0 pt-8 md:pt-0">
                <div className="flex items-center gap-8">
                  <p className="text-caption uppercase text-accent">Related work</p>
                  {/* Ornament only, and an expensive one on a narrow screen: an
                      SVG with a fixed height and a 467-unit viewBox keeps its
                      intrinsic width against `flex-1`, which sized the grid
                      column to 553px inside a 390 viewport. It earns its place
                      at `lg`, where there is room for the full run. */}
                  <ChevronRun
                    count={30}
                    className="hidden h-[38px] min-w-0 flex-1 text-white lg:block"
                  />
                </div>
                <h2 className="mt-4 text-section text-contrast-2 sm:mt-6">
                  {study.title}
                </h2>
                <p className="mt-4 text-body text-grey-600 sm:mt-6">{study.summary}</p>
                <Button
                  href={`/work/${study.slug}`}
                  variant="outline"
                  className="mt-8 max-sm:w-full max-sm:justify-center"
                >
                  Read Case Study
                </Button>
              </div>
              {/* `-mx-5` is exactly the container gutter, so the cover reaches
                  both edges without a `w-screen` that would overflow the page. */}
              <CaseCover
                cover={study.cover}
                title={study.title}
                aspect="aspect-[1.95] md:aspect-[1.6]"
                className="max-md:-mx-5 max-md:rounded-none md:rounded-2xl"
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
          <div className="grid gap-8 lg:grid-cols-[542px_738px] lg:gap-0">
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
 * "Why it matters" — the full-bleed accent band, gradient left to right, with
 * the label and heading in a 580px column and the body behind a hairline rule.
 */
function AccentBand({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="bg-accent-band overflow-hidden rounded-sm">
      {/* 16 of padding on the 390 frames, not 32 — which also puts the body on
          the design's own 318px measure instead of 286, where it sets in seven
          lines rather than nine. */}
      <div className="grid gap-[18px] p-4 sm:gap-6 sm:p-8 lg:grid-cols-[580px_1fr] lg:gap-0 lg:px-12 lg:py-8">
        <div>
          <p className="text-caption uppercase text-white/80">Why it matters</p>
          <p className="mt-2 text-card text-white sm:mt-3">{heading}</p>
        </div>
        {/* The design sets this text 26px clear of the rule in a 578px measure,
            where it fills exactly four lines. Chrome renders Inter about 0.55%
            wider than Figma does, which is enough to orphan a fifth line and
            leave the band 24px too tall. Six pixels of the gap buy the measure
            back: a text start 6px closer to the rule is far less visible than a
            band that is a whole line too deep. */}
        <p className="text-body text-white lg:border-l lg:border-white/25 lg:pl-5">
          {body}
        </p>
      </div>
    </div>
  );
}
