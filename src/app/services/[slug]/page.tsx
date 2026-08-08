import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { cn } from "@/lib/cn";
import {
  services,
  type Service,
  type ServiceStep,
  type ComparisonRow,
  type ServiceFaq,
} from "@/content/services";
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

function BulletGrid({ items }: { items: string[] }) {
  const cols = items.length === 3 ? "grid-cols-1 md:grid-cols-3" : "sm:grid-cols-2";

  return (
    <ul className={cn("grid gap-px border-[0.8px] border-grey-200 bg-grey-200", cols)}>
      {items.map((item) => (
        <li key={item} className="bg-base p-6 font-display text-body-lg text-contrast-2">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Heading beside prose — "The real cost of skipping this" / "Illustrative example". */
function TwoColProse({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr]">
      <h2 className={contentHeading}>{heading}</h2>
      <p className="text-body-lg text-grey-600">{body}</p>
    </div>
  );
}

function StepGrid({ steps }: { steps: ServiceStep[] }) {
  const cols = steps.length === 3 ? "grid-cols-1 md:grid-cols-3" : "sm:grid-cols-2";

  return (
    <ol className={cn("grid gap-px border-[0.8px] border-grey-200 bg-grey-200", cols)}>
      {steps.map((step, i) => (
        <li key={step.number} className="bg-base">
          <Reveal delay={i * 60} className="h-full">
            <div className="flex h-full flex-col gap-4 p-8">
              <span className="font-display text-h4 font-medium text-accent">
                {step.number}
              </span>
              <h3 className="text-[1.3125rem] leading-[1.2]">{step.title}</h3>
              <p className="text-body text-grey-600">{step.body}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** "How this compares" — Software Engineering only. No existing table pattern to extend; built from the site's hairline/no-shadow primitives. */
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
            <th className="border-l-[0.8px] border-grey-200 bg-base-2 p-4 font-display text-body font-medium text-contrast-2">
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

/** "FAQ" — no existing FAQ/accordion pattern to extend; a static hairline-divided Q&A list (no collapse behavior, matching the site's mostly-static approach). */
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

/** Builds the content blocks present for this service, in order — tone alternation is assigned by position after filtering, so any combination of optional sections still alternates cleanly. */
function buildBlocks(service: Service) {
  const blocks: { key: string; content: React.ReactNode }[] = [
    {
      key: "who",
      content: (
        <>
          <SectionHeader title="This is probably you if" />
          <BulletGrid items={service.whoItsFor} />
        </>
      ),
    },
  ];

  if (service.cost) {
    blocks.push({
      key: "cost",
      content: <TwoColProse heading={service.cost.heading} body={service.cost.body} />,
    });
  }

  blocks.push({
    key: "included",
    content: (
      <>
        <SectionHeader title="What's included" />
        <BulletGrid items={service.included} />
      </>
    ),
  });

  blocks.push({
    key: "approach",
    content: (
      <>
        <SectionHeader title="Our approach" />
        <StepGrid steps={service.approach} />
      </>
    ),
  });

  if (service.comparison) {
    blocks.push({
      key: "comparison",
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
      content: <TwoColProse heading="Illustrative example" body={service.illustrativeExample} />,
    });
  }

  blocks.push({
    key: "outcomes",
    content: (
      <>
        <SectionHeader title="What you walk away with" />
        <BulletGrid items={service.outcomes} />
        {service.outcomesProofLine && (
          <p className="mt-12 max-w-[70ch] border-t-[0.8px] border-grey-200 pt-8 text-body text-grey-600">
            {service.outcomesProofLine}
          </p>
        )}
      </>
    ),
  });

  blocks.push({
    key: "faq",
    content: (
      <>
        <SectionHeader title="FAQ" />
        <FaqList faqs={service.faqs} />
      </>
    ),
  });

  return blocks;
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const blocks = buildBlocks(service);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.heroSubhead,
    provider: { "@type": "Organization", name: "Hexary Labs" },
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
      <JsonLd data={[serviceJsonLd, breadcrumbJsonLd, ...(faqJsonLd ? [faqJsonLd] : [])]} />
      <PageHero
        eyebrow={service.heroEyebrow}
        title={service.heroHeadline}
        intro={service.heroSubhead}
        cta={{ label: service.heroCta, href: "/contact" }}
      />

      {blocks.map((block, i) => (
        <Section key={block.key} tone={i % 2 === 0 ? "light" : "muted"}>
          <Container>{block.content}</Container>
        </Section>
      ))}

      <ClosingCta
        heading={service.closingHeading}
        cta={{ label: service.closingCta, href: "/contact" }}
      />
    </>
  );
}
