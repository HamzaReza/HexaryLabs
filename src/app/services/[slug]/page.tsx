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
        className="bg-contrast-2 py-14 lg:pb-[100px] lg:pt-20"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[648px_1fr] lg:gap-0">
            <h2 className="text-section uppercase text-white">
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
            <div className="mt-12">
              <AccentBand heading={service.cost.heading} body={service.cost.body} />
            </div>
          )}
        </Container>
      </section>

      {/* ------------------------------------------------------ what's included */}
      <section className="bg-base py-14 lg:pb-[100px] lg:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[316px_1fr] lg:gap-0">
            <h2 className="text-section uppercase text-contrast-2">
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
      {study && (
        <section className="bg-base-2 py-14 lg:pb-16 lg:pt-10">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[576px_1fr] lg:gap-[64px]">
              <div className="min-w-0">
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
                <h2 className="mt-6 text-section text-contrast-2">{study.title}</h2>
                <p className="mt-6 text-body text-grey-600">{study.summary}</p>
                <Button href={`/work/${study.slug}`} variant="outline" className="mt-8">
                  Read Case Study
                </Button>
              </div>
              <CaseCover
                cover={study.cover}
                title={study.title}
                className="rounded-2xl"
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
      <section className="bg-base py-14 lg:pb-[100px] lg:pt-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[542px_738px] lg:gap-0">
            <h2 className="text-section uppercase text-contrast-2">FAQ</h2>
            <Accordion items={service.faqs} />
          </div>
        </Container>
      </section>

      {/* The illustrative scenario is deliberately unattributed — it is not a
          client, and must never be presented as one. */}
      {service.illustrativeExample && (
        <section className="bg-base-2 py-14">
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
  const base = "flex gap-4 pb-4";
  if (index < columns) return base;
  return `${base} pt-4 border-t ${tone === "dark" ? "border-white/10" : "border-grey-200"}`;
}

/**
 * "Why it matters" — the full-bleed accent band, gradient left to right, with
 * the label and heading in a 580px column and the body behind a hairline rule.
 */
function AccentBand({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="bg-accent-band overflow-hidden rounded-sm">
      <div className="grid gap-6 p-8 lg:grid-cols-[580px_1fr] lg:gap-0 lg:px-12 lg:py-8">
        <div>
          <p className="text-caption uppercase text-white/80">Why it matters</p>
          <p className="mt-3 text-card text-white">{heading}</p>
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
