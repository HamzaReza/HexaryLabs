import type { Metadata } from "next";
import { HeadlineLines, PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ContactSection } from "@/components/sections/ContactSection";
import { getRelatedCaseStudy, getServices, getServicesOverview } from "@/lib/data";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Strategy, design, engineering, and AI. Four ways we help teams build software worth investing in, with the same team from first conversation to shipped system.",
  path: "/services",
});

const breadcrumbJsonLd = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

/** The design shows six chips per card; the case studies carry more. */
const STACK_CHIPS = 6;

export default async function ServicesPage() {
  const [services, overview] = await Promise.all([
    getServices(),
    getServicesOverview(),
  ]);

  /* The stack chips are the related case study's own, which is where the
     design took them from — so they are read here rather than duplicated into
     the service records. */
  const cards = await Promise.all(
    services.map(async (service) => {
      const study = await getRelatedCaseStudy(service);
      return {
        service,
        stack: study?.stack.slice(0, STACK_CHIPS) ?? [],
        href: study ? `/work/${study.slug}` : undefined,
      };
    }),
  );

  const { hero } = overview;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={<HeadlineLines lines={hero.headlineLines} />}
        intro={hero.subhead}
        cta={{ label: hero.cta, href: "/contact" }}
      />

      {/* 40px of lead-in and 80px of run-out, with 48px between cards — the
          design's own rhythm, which is deliberately not symmetric. */}
      <section className="bg-base-2 pb-14 pt-10 lg:pb-20">
        <Container>
          <h2 className="sr-only">All services</h2>
          <div className="flex flex-col gap-6 lg:gap-12">
            {cards.map(({ service, stack, href }, i) => (
              <ServiceCard
                key={service.slug}
                index={i + 1}
                slug={service.slug}
                title={service.title}
                quote={service.teaserQuote}
                bestFor={service.teaserBestFor}
                stack={stack}
                typicalEngagement={service.typicalEngagement}
                relatedWorkLabel={service.relatedWorkLabel}
                relatedWorkHref={href}
              />
            ))}
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
