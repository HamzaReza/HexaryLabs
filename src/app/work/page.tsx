import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { CaseStoryRow } from "@/components/cards/CaseStoryRow";
import { getClientTags, getListedWork, getWorkIntro } from "@/lib/data";
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

export default async function WorkPage() {
  /* Unlisted studies filtered and featured-first ordering both live in the data
     layer now, so the homepage and this page can't disagree about either. */
  const [ordered, clientTags, WORK_INTRO] = await Promise.all([
    getListedWork(),
    getClientTags(),
    getWorkIntro(),
  ]);

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
                  eyebrow={`${study.category} · ${clientTags[study.slug] ?? study.client}`}
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
