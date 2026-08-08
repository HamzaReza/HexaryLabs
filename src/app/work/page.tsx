import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { work, WORK_INTRO } from "@/content/work";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { REVEAL_STAGGER_MS } from "@/lib/motion";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Selected engagements and in-house products, from an AI-native creative studio to PHI-safe enterprise platforms and production SaaS.",
  path: "/work",
});

const breadcrumbJsonLd = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
]);

/** Reachable at its own URL and still in the sitemap — just not surfaced in this grid. */
const UNLISTED_SLUGS = new Set(["social-lead-capture-automation"]);

export default function WorkPage() {
  const listed = work.filter((study) => !UNLISTED_SLUGS.has(study.slug));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageHero
        eyebrow="Work"
        title={
          <>
            Selected
            <span className="text-accent"> Work</span>
          </>
        }
        intro={WORK_INTRO}
        staggerReveal
      />

      <Section tone="light">
        <Container>
          <h2 className="sr-only">All case studies</h2>

          <div className="grid gap-8 lg:grid-cols-2">
            {listed.map((study, i) => (
              <Reveal
                key={study.slug}
                variant="fade-up"
                delay={i * REVEAL_STAGGER_MS}
                className="h-full"
              >
                <CaseStudyCard
                  study={study}
                  sizes="(min-width: 1024px) 620px, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Reveal variant="fade-up">
        <ClosingCta
          heading="Building something in this shape?"
          body="From AI platforms to enterprise integrations to production SaaS, this is the range we work across. If any of the work above looks like what you're trying to build, we should talk."
          cta={{ label: "Start a Project", href: "/contact" }}
          secondaryCta={{ label: "See How We Work", href: "/how-we-work" }}
        />
      </Reveal>
    </>
  );
}
