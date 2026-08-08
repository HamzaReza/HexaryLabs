import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import {
  whyWeExist,
  whosBehind,
  whereExpertiseRanges,
  whyChooseUs,
} from "@/content/about";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "A small, senior technology partner. Engineers, designers, and product specialists building software worth investing in, from strategy through production.",
  path: "/about",
});

const breadcrumbJsonLd = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

const contentHeading = "text-[1.3125rem] leading-[1.2] md:text-[1.625rem] lg:text-h3";

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        eyebrow="About"
        title={
          <>
            Software built by people who own the
            <span className="text-accent"> outcome</span>.
          </>
        }
        intro="Hexary Labs is a software development studio: engineers, designers, and product specialists who take products from a rough idea to a system your own team can run without us."
      />

      {/* Why we exist */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.25fr]">
            <div className="md:sticky md:top-28 md:self-start">
              <h2 className={contentHeading}>{whyWeExist.heading}</h2>
            </div>
            <div className="flex flex-col gap-6 text-body-lg text-grey-600">
              {whyWeExist.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Who's behind the work */}
      <Section tone="muted">
        <Container>
          <SectionHeader title={whosBehind.heading} intro={whosBehind.intro} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whosBehind.principles.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 60} className="h-full">
                <div className="h-full border-[0.8px] border-grey-200 bg-base p-6">
                  <p className="font-display text-body-lg font-medium text-contrast-2">
                    {principle.title}
                  </p>
                  <p className="mt-2 text-body text-grey-600">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 max-w-[70ch] border-t-[0.8px] border-grey-200 pt-8 text-body text-grey-600">
            {whosBehind.proofLine}
          </p>
        </Container>
      </Section>

      {/* Where our expertise ranges */}
      <Section tone="light">
        <Container>
          <SectionHeader
            title={whereExpertiseRanges.heading}
            intro={whereExpertiseRanges.intro}
          />

          <div className="grid gap-px border-[0.8px] border-grey-200 bg-grey-200 sm:grid-cols-2">
            {whereExpertiseRanges.areas.map((area, i) => (
              <Reveal key={area.heading} delay={i * 60} className="h-full">
                <div className="flex h-full flex-col gap-4 bg-base-2 p-8">
                  <h3 className="text-[1.3125rem] leading-[1.2]">{area.heading}</h3>
                  <p className="text-body text-grey-600">{area.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 max-w-[70ch] text-body-lg text-grey-600">
            {whereExpertiseRanges.closing}
          </p>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeader title={whyChooseUs.heading} />

          <ul className="grid gap-px border-[0.8px] border-grey-200 bg-grey-200 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.items.map((item) => (
              <li key={item.title} className="bg-base p-6">
                <p className="font-display text-body-lg font-medium text-contrast-2">
                  {item.title}
                </p>
                <p className="mt-2 text-body text-grey-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="flex flex-col items-center gap-10 text-center">
            <h2 className="text-h2 max-md:text-[1.625rem] md:text-[2.25rem] lg:text-h2">
              Let&rsquo;s talk about what you&rsquo;re building
            </h2>
            <Button href="/contact" variant="accent" size="lg">
              Start a Project
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
