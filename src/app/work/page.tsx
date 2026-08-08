import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { CaseStoryRow, CLIENT_TAGS } from "@/components/cards/CaseStoryRow";
import { work, WORK_INTRO } from "@/content/work";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

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

/* Live at its URL and in the sitemap, but not listed in the grid — shared
   directly with prospects instead. */
const UNLISTED_SLUGS = new Set(["social-lead-capture-automation"]);

export default function WorkPage() {
  const listed = work.filter((study) => !UNLISTED_SLUGS.has(study.slug));
  const ordered = [
    ...listed.filter((s) => s.featured),
    ...listed.filter((s) => !s.featured),
  ];

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
          <div className="flex flex-col gap-16 lg:gap-24">
            {ordered.map((study, i) => (
              <Reveal key={study.slug} variant="fade-up">
                <CaseStoryRow
                  study={study}
                  index={i}
                  flip={i % 2 === 1}
                  eyebrow={`${study.category} · ${CLIENT_TAGS[study.slug] ?? study.client}`}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingCta
        heading="Building something in this shape?"
        body="From AI platforms to enterprise integrations to production SaaS, this is the range we work across. If any of the work above looks like what you're trying to build, we should talk."
        cta={{ label: "Start a Project", href: "/contact" }}
        secondaryCta={{ label: "See How We Work", href: "/how-we-work" }}
      />
    </>
  );
}
