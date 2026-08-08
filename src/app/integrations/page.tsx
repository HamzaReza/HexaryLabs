import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";
import {
  hero,
  intro,
  groups,
  scopeNote,
  approach,
  closing,
} from "@/content/integrations";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Integrations & API Development",
  description:
    "We connect the tools your business already runs on, from Amazon and Shopify to Fishbowl, QuickBooks, and Zoho CRM. Real integrations, no duct tape.",
  path: "/integrations",
});

const breadcrumbJsonLd = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "Integrations", path: "/integrations" },
]);

export default function IntegrationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.headline}
        intro={hero.intro}
        cta={{ label: hero.cta, href: "/contact" }}
      />

      <Section tone="light">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.25fr]">
            <div className="md:sticky md:top-28 md:self-start">
              <h2 className="text-[1.3125rem] leading-[1.2] md:text-[1.625rem] lg:text-h3">
                {intro.heading}
              </h2>
            </div>
            <div className="flex flex-col gap-6 text-body-lg text-grey-600">
              {intro.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <h2 className="sr-only">Platforms we&rsquo;ve integrated</h2>

          <div className="flex flex-col gap-16">
            {groups.map((group) => (
              <div
                key={group.heading}
                className="grid gap-8 lg:grid-cols-[1fr_1.8fr] lg:gap-16"
              >
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <h3 className="text-[1.3125rem] leading-[1.2] md:text-[1.625rem] lg:text-h3">
                    {group.heading}
                  </h3>
                  <p className="mt-3 text-body text-grey-600">{group.blurb}</p>
                </div>

                <ul className="flex flex-col gap-px border-[0.8px] border-grey-200 bg-grey-200">
                  {group.platforms.map((platform, i) => (
                    <li key={platform.name} className="bg-base">
                      <Reveal delay={i * 60}>
                        <div className="flex flex-col gap-3 p-8 sm:flex-row sm:gap-10">
                          <div className="sm:w-[10rem] sm:shrink-0">
                            <h4 className="font-display text-h4 font-medium text-contrast-2">
                              {platform.name}
                            </h4>
                            <Link
                              href={`/work/${platform.caseStudy.slug}`}
                              className="mt-2 inline-block text-body text-grey-600 underline underline-offset-4 transition-colors duration-300 hover:text-accent"
                            >
                              {platform.caseStudy.label}
                            </Link>
                          </div>
                          <p className="text-body text-grey-600">{platform.body}</p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-14 max-w-[70ch] border-t-[0.8px] border-grey-200 pt-8 text-body-lg text-grey-600">
            {scopeNote}
          </p>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeader title={approach.heading} intro={approach.intro} />

          <div className="grid gap-px border-[0.8px] border-grey-200 bg-grey-200 md:grid-cols-2">
            {approach.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 60} className="h-full">
                <div className="flex h-full flex-col gap-4 bg-base-2 p-8">
                  <h3 className="text-[1.3125rem] leading-[1.2]">{item.title}</h3>
                  <p className="text-body text-grey-600">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingCta
        heading={closing.heading}
        cta={{ label: closing.cta, href: "/contact" }}
      />
    </>
  );
}
