import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { services, servicesOverview } from "@/content/services";
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

export default function ServicesPage() {
  const { hero, notSure, closing } = servicesOverview;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.headline}
        intro={hero.subhead}
        cta={{ label: hero.cta, href: "/contact" }}
      />

      {/* Small, sits right under the hero — not a full Section. */}
      <div className="border-b-[0.8px] border-grey-100 bg-base">
        <Container>
          <div className="clip-corner [--clip:18px] p-hairline bg-grey-200">
            <div className="clip-corner flex flex-col items-start gap-6 [--clip:18px] bg-base-2 p-8 py-10 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-h4 font-medium text-contrast-2">
                {notSure.heading}
              </h2>
              <p className="mt-2 max-w-[540px] text-body text-grey-600">{notSure.body}</p>
            </div>
            <Button href="/contact" variant="secondary" className="shrink-0">
              {notSure.cta}
            </Button>
            </div>
          </div>

          <p className="pb-10 pt-6 text-body text-grey-600">
            Looking for a specific platform integration?{" "}
            <Link
              href="/integrations"
              className="group inline-flex items-center gap-2 text-contrast-2 underline underline-offset-4 transition-colors duration-300 hover:text-accent"
            >
              See the platforms we integrate with
              <ArrowIcon className="size-3" />
            </Link>
          </p>
        </Container>
      </div>

      <Section tone="muted">
        <Container>
          <h2 className="sr-only">All services</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 60} className="h-full">
                <div className="clip-corner h-full [--clip:18px] p-hairline bg-grey-200 transition-colors duration-300 hover:bg-accent">
                <Link
                  href={`/services/${service.slug}`}
                  className="clip-corner group flex h-full flex-col gap-6 [--clip:18px] bg-base p-8"
                >
                  <h3 className="text-[1.3125rem] leading-[1.2] lg:text-h3">
                    {service.title}
                  </h3>
                  <p className="text-body-lg text-grey-600">
                    &ldquo;{service.teaserQuote}&rdquo;
                  </p>
                  <p className="mt-auto text-body text-grey-600">
                    <span className="font-display font-medium text-contrast-2">
                      Best for:
                    </span>{" "}
                    {service.teaserBestFor}
                  </p>
                  <span className="inline-flex items-center gap-3 font-display text-body font-medium text-contrast-2 transition-colors duration-300 group-hover:text-accent">
                    Learn more
                    <ArrowIcon className="size-3.5" />
                  </span>
                </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingCta heading={closing.heading} cta={{ label: closing.cta, href: "/contact" }} />
    </>
  );
}
