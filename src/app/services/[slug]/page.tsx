import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { Annotation } from "@/components/ui/Annotation";
import { ClippedPanel } from "@/components/ui/ClippedPanel";
import { HexCluster } from "@/components/ui/HexCluster";
import { DirectionalMarker } from "@/components/ui/DirectionalMarker";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { CaseCover } from "@/app/work/CaseCover";
import { CLIENT_TAGS } from "@/components/cards/CaseStoryRow";
import { cn } from "@/lib/cn";
import {
  services,
  type Service,
  type ServiceStep,
  type ComparisonRow,
  type ServiceFaq,
} from "@/content/services";
import { work } from "@/content/work";
import { site } from "@/content/site";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
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
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const seo = SEO_META[service.slug];

  return pageMetadata({
    title: seo?.title ?? service.title,
    description: seo?.description ?? service.heroSubhead,
    path: `/services/${service.slug}`,
  });
}

const contentHeading = "text-[1.3125rem] leading-[1.2] md:text-[1.625rem] lg:text-h3";

function CheckList({
  heading,
  items,
  flip,
}: {
  heading: string;
  items: string[];
  flip?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16",
        flip && "lg:[direction:rtl] lg:[&>*]:[direction:ltr]",
      )}
    >
      <h2 className="text-h2 max-md:text-[1.625rem] md:text-[2.25rem] lg:sticky lg:top-28 lg:self-start lg:text-h2">
        {heading}
      </h2>
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 border-b-[0.8px] border-grey-200 py-4"
          >
            <CheckIcon className="mt-1.5 size-3.5 shrink-0 text-accent" />
            <span className="text-body-lg text-grey-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CostCallout({ heading, body }: { heading: string; body: string }) {
  return (
    <ClippedPanel clip="md" bordered className="bg-base p-8 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div>
          <Annotation>Why it matters</Annotation>
          <h2 className={cn(contentHeading, "mt-3")}>{heading}</h2>
        </div>
        <p className="border-l-2 border-accent pl-6 text-body-lg text-grey-600">
          {body}
        </p>
      </div>
    </ClippedPanel>
  );
}

function ApproachHexSteps({
  steps,
  diagram,
  diagramLabel,
}: {
  steps: ServiceStep[];
  diagram: [string, string, string];
  diagramLabel: string;
}) {
  return (
    <>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
        <h2 className="text-h2 max-md:text-[1.625rem] md:text-[2.25rem] lg:text-h2">
          Our approach
        </h2>
        <HexCluster
          cells={diagram.map((label, j) => ({
            q: j,
            r: j === 2 ? -1 : 0,
            role: j === 1 ? "signal" : "outline",
            label,
          }))}
          label={diagramLabel}
          className="h-24 w-auto"
        />
      </div>

      <ol className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
        {steps.map((step, i) => (
          <li key={step.number} className="contents">
            {i > 0 && (
              <div
                aria-hidden="true"
                className="flex justify-center py-2 text-grey-500 lg:items-center lg:px-3"
              >
                <DirectionalMarker direction="down" className="lg:hidden" />
                <DirectionalMarker className="max-lg:hidden" />
              </div>
            )}
            <Reveal delay={i * 100} className="min-w-0 flex-1">
              <ClippedPanel clip="md" bordered className="flex h-full flex-col gap-4 bg-base p-7">
                <span className="flex items-center gap-3">
                  <HexCluster
                    cells={[{ q: 0, r: 0, role: i === steps.length - 1 ? "signal" : "ink" }]}
                    className="h-8 w-auto"
                  />
                  <Annotation index={step.number} />
                </span>
                <h3 className="text-[1.3125rem] leading-[1.2]">{step.title}</h3>
                <p className="text-body text-grey-600">{step.body}</p>
              </ClippedPanel>
            </Reveal>
          </li>
        ))}
      </ol>
    </>
  );
}

function MidCta({ label }: { label: string }) {
  return (
    <div className="border-y-[0.8px] border-grey-200 bg-base-2">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <p className="font-display text-h4 font-medium text-contrast-2">
            Sound like the help you need?
          </p>
          <Button href="/contact" className="shrink-0">
            {label}
          </Button>
        </div>
      </Container>
    </div>
  );
}

function RelatedWork({ service, flip }: { service: Service; flip?: boolean }) {
  const study = work.find((w) => w.slug === service.explore.caseStudySlug);
  if (!study) return null;

  return (
    <div
      className={cn(
        "grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14",
        flip && "lg:[direction:rtl] lg:[&>*]:[direction:ltr]",
      )}
    >
      <div>
        <Annotation>
          Related work · {study.category} · {CLIENT_TAGS[study.slug] ?? study.client}
        </Annotation>
        <h2 className={cn(contentHeading, "mt-4")}>{study.title}</h2>
        <p className="mt-4 text-body-lg text-grey-600">{study.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {study.stack.slice(0, 6).map((tool) => (
            <li
              key={tool}
              className="border-[0.8px] border-grey-200 bg-base px-3 py-1 font-mono text-small text-grey-600"
            >
              {tool}
            </li>
          ))}
        </ul>

        <Link
          href={`/work/${study.slug}`}
          className="mt-6 inline-flex items-center gap-3 font-display text-body font-medium text-contrast-2 transition-colors duration-300 hover:text-accent"
        >
          Read the case study
          <ArrowIcon className="size-3.5" />
        </Link>
      </div>

      <ClippedPanel clip="lg" bordered className="bg-base" as="figure">
        <CaseCover
          cover={study.cover}
          title={study.title}
          aspect="aspect-[1.7]"
          sizes="(min-width: 1024px) 620px, 100vw"
        />
      </ClippedPanel>
    </div>
  );
}

/** "How this compares" — Software Engineering only. Built from the site's hairline/no-shadow primitives. */
function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="overflow-x-auto border-[0.8px] border-grey-200">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b-[0.8px] border-grey-200">
            <th className="p-4" />
            <th className="p-4 font-display text-body font-medium text-grey-600">
              Typical in-house hire
            </th>
            <th className="p-4 font-display text-body font-medium text-grey-600">
              Freelance contractor
            </th>
            <th className="border-l-[0.8px] border-t-2 border-t-accent border-grey-200 bg-base-2 p-4 font-display text-body font-medium text-contrast-2">
              Hexary Labs
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b-[0.8px] border-grey-200 last:border-b-0">
              <th
                scope="row"
                className="p-4 text-left align-top font-display text-body font-medium text-contrast-2"
              >
                {row.label}
              </th>
              <td className="p-4 align-top text-body text-grey-600">{row.inHouse}</td>
              <td className="p-4 align-top text-body text-grey-600">{row.freelancer}</td>
              <td className="border-l-[0.8px] border-grey-200 bg-base-2 p-4 align-top text-body text-contrast-2">
                {row.hexary}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Static hairline-divided Q&A list (no collapse behavior, matching the site's mostly-static approach). */
function FaqList({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <div className="flex flex-col border-t-[0.8px] border-grey-200">
      {faqs.map((faq) => (
        <div key={faq.question} className="border-b-[0.8px] border-grey-200 py-8">
          <h3 className="font-display text-body-lg font-medium text-contrast-2">
            {faq.question}
          </h3>
          <p className="mt-3 max-w-[70ch] text-body text-grey-600">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

type Block = {
  key: string;
  label: string;
  tone?: "dark";
  content: React.ReactNode;
};

/** Builds the content blocks present for this service, in order. Light/muted
 * alternation is assigned by position after filtering; `flip` varies the
 * asymmetric compositions per service so repeated page types don't feel
 * identical (6.1-j). The outcomes block is the page's one dark proof moment. */
function buildBlocks(service: Service, flip: boolean): Block[] {
  const blocks: Block[] = [
    {
      key: "who",
      label: "Who it's for",
      content: (
        <CheckList
          heading="This is probably you if"
          items={service.whoItsFor}
          flip={flip}
        />
      ),
    },
  ];

  if (service.cost) {
    blocks.push({
      key: "cost",
      label: "Why it matters",
      content: <CostCallout heading={service.cost.heading} body={service.cost.body} />,
    });
  }

  blocks.push({
    key: "included",
    label: "What's included",
    content: (
      <>
        <SectionHeader title="What's included" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {service.included.map((item, i) => (
            <ClippedPanel
              key={item}
              clip="sm"
              bordered
              className="flex h-full items-start gap-4 bg-base p-6"
              as="li"
            >
              <Annotation index={String(i + 1).padStart(2, "0")} className="mt-1 shrink-0" />
              <span className="font-display text-body-lg text-contrast-2">{item}</span>
            </ClippedPanel>
          ))}
        </ul>
      </>
    ),
  });

  blocks.push({
    key: "approach",
    label: "Approach",
    content: (
      <ApproachHexSteps
        steps={service.approach}
        diagram={service.explore.diagram}
        diagramLabel={`Simplified ${service.title} system diagram: ${service.explore.diagram.join(", ")}`}
      />
    ),
  });

  if (service.comparison) {
    blocks.push({
      key: "comparison",
      label: "Compare",
      content: (
        <>
          <SectionHeader title="How this compares" />
          <ComparisonTable rows={service.comparison} />
        </>
      ),
    });
  }

  if (service.illustrativeExample) {
    blocks.push({
      key: "illustrative",
      label: "Example",
      content: (
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr]">
          <h2 className={contentHeading}>Illustrative example</h2>
          <p className="text-body-lg text-grey-600">{service.illustrativeExample}</p>
        </div>
      ),
    });
  }

  blocks.push({
    key: "related-work",
    label: "Related work",
    content: <RelatedWork service={service} flip={!flip} />,
  });

  blocks.push({
    key: "outcomes",
    label: "Outcomes",
    tone: "dark",
    content: (
      <>
        <SectionHeader title="What you walk away with" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {service.outcomes.map((item, i) => (
            <ClippedPanel
              key={item}
              clip="md"
              bordered
              className="flex h-full items-start gap-4 bg-surface-dark p-7"
              as="li"
            >
              <Annotation index={String(i + 1).padStart(2, "0")} className="mt-1 shrink-0" />
              <span className="font-display text-body-lg text-white">{item}</span>
            </ClippedPanel>
          ))}
        </ul>
        {service.outcomesProofLine && (
          <p className="mt-12 max-w-[70ch] border-t-[0.8px] border-grey-700 pt-8 text-body text-grey-300">
            {service.outcomesProofLine}
          </p>
        )}
      </>
    ),
  });

  blocks.push({
    key: "faq",
    label: "FAQ",
    content: (
      <>
        <SectionHeader title="FAQ" />
        <FaqList faqs={service.faqs} />
      </>
    ),
  });

  return blocks;
}

function AnchorNav({ blocks }: { blocks: Block[] }) {
  return (
    <nav
      aria-label="On this page"
      className="border-b-[0.8px] border-grey-100 bg-base-2"
    >
      <Container>
        <ul className="flex gap-x-8 overflow-x-auto py-4">
          {blocks.map((block, i) => (
            <li key={block.key} className="shrink-0">
              <a
                href={`#${block.key}`}
                className="font-mono text-small font-medium uppercase tracking-[0.08em] text-grey-600 transition-colors duration-300 hover:text-accent"
              >
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>{" "}
                {block.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const flip = services.indexOf(service) % 2 === 1;
  const blocks = buildBlocks(service, flip);
  const midCtaAfter = "approach";

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

  let lightIndex = 0;

  return (
    <>
      <JsonLd data={[serviceJsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])]} />
      <PageHero
        eyebrow={service.heroEyebrow}
        title={service.heroHeadline}
        intro={service.heroSubhead}
        cta={{ label: service.heroCta, href: "/contact" }}
      />
      <AnchorNav blocks={blocks} />

      {blocks.map((block) => {
        const tone = block.tone ?? (lightIndex++ % 2 === 0 ? "light" : "muted");
        return (
          <div key={block.key} className="contents">
            <Section id={block.key} tone={tone} className="scroll-mt-24">
              <Container>{block.content}</Container>
            </Section>
            {block.key === midCtaAfter && <MidCta label={service.heroCta} />}
          </div>
        );
      })}

      <ClosingCta
        heading={service.closingHeading}
        cta={{ label: service.closingCta, href: "/contact" }}
      />
    </>
  );
}
