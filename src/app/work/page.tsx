import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CaseRow } from "@/components/cards/CaseRow";
import { WorkCta } from "@/components/sections/WorkCta";
import { caseStudyDisplayName, getListedWork, getWorkIntro } from "@/lib/data";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Six engagements that show what we build: AI-native products, SaaS running in production, PHI-safe enterprise platforms, and the integration work that connects the tools our clients already depend on.",
  path: "/work",
});

const breadcrumbJsonLd = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
]);

export default async function WorkPage() {
  /* Unlisted studies filtered and featured-first ordering both live in the data
     layer now, so the homepage and this page can't disagree about either. */
  const [ordered, workIntro] = await Promise.all([getListedWork(), getWorkIntro()]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {/* The design's work hero carries no button — the case rows are the
          call to action, and the band at the foot of the page closes it.

          It also carries different artwork from the services heroes: the
          skewed cluster, in dark ink on the white band, with the accent
          showing through one cell at 20%. */}
      <PageHero
        eyebrow="Work"
        title="What we Build"
        intro={workIntro}
        art="cluster"
      />

      {/* The rows do not sit on the page's own ground: the design runs a
          full-bleed #171717 band behind the whole block, 40 above the first row
          and 80 below the last, with 80 between them. That is what makes the
          rows read as full-bleed compositions rather than cards — they have no
          corner radius and no edge of their own, only the ground showing
          through the gaps. */}
      <section data-tone="dark" className="bg-contrast-2 pb-10 pt-8 md:pb-20 md:pt-10">
        <Container>
          <h2 className="sr-only">All case studies</h2>
          {/* 32 between rows at mobile, the design's own; 80 from `lg`. */}
          <div className="flex flex-col gap-8 lg:gap-20">
            {ordered.map((study, i) => (
              <Reveal key={study.slug} variant="fade-up">
                <CaseRow
                  study={study}
                  displayName={caseStudyDisplayName(study)}
                  index={i}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <WorkCta
        heading="Building something in this shape?"
        body="From AI platforms to enterprise integrations to production SaaS, this is the range we work across. If any of the work above looks like what you're trying to build, we should talk."
        cta={{ label: "Start a Project", href: "/contact" }}
      />
    </>
  );
}
