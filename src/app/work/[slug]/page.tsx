import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StatCallout } from "@/components/ui/StatCallout";
import { ContactSection } from "@/components/sections/ContactSection";
import { CaseHero } from "@/components/sections/CaseHero";
import { CaseCover } from "../CaseCover";
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
  getClientTags,
  getSiteMeta,
} from "@/lib/data";
import type { CaseSection, CaseStudy, Metric } from "@/lib/data/types";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams() {
  return (await getCaseStudySlugs()).map((slug) => ({ slug }));
}

const SEO_DESCRIPTION: Record<string, string> = {
  eden:
    "A studio for autonomous creative AI, where agents make art, video, and stories with people and with each other. Built with Eden Labs from frontend to GPU pipeline.",
  keepcoming:
    "A loyalty platform for cafes, restaurants, and independent shops, with real Apple Wallet and Google Wallet integration and a public developer API.",
  "medical-records-platform":
    "A PHI-safe integration platform connecting three case-management systems, with an AI backend that surfaces operational patterns from historical support tickets.",
  "social-lead-capture-automation":
    "A keyword-triggered social DM funnel rebuilt end to end: four lead-capture flows delivering subscribers in real time, with failure monitoring across the pipeline.",
  truecell:
    "An inventory operating system for a cell-phone refurbisher: diagnostics, grading, purchasing, pricing and shipping in one workflow instead of fragile spreadsheets.",
  kinein:
    "A B2B commerce platform with bidirectional sync between the storefront and the accounting systems the business already runs on.",
  "b2b-access":
    "A wholesale marketplace connecting verified retailers to brands, with one login and zero friction.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};

  return pageMetadata({
    title: study.title,
    description: SEO_DESCRIPTION[study.slug] ?? study.summary,
    path: `/work/${study.slug}`,
  });
}

/**
 * One case study.
 *
 * This route used to carry four body layouts, two metric layouts and five hero
 * treatments, selected per study by a `variant` object that lived in the
 * content. All of it is gone: every study now renders through the single
 * composition the design draws, and they differ only by their data — which is
 * also the shape the API swap needs, since an API should not be shipping layout
 * variant names.
 *
 * The body is four fixed beats — Challenge, Approach, Solution, Results — laid
 * out on the design's 1200 column as a 480 gutter, 80 of air, and 640 of prose.
 * Each beat takes one of the study's metrics as a callout in the gutter, set
 * against the *foot* of the section so the number lands after the argument it
 * belongs to rather than before it.
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [study, clientTags, site] = await Promise.all([
    getCaseStudyBySlug(slug),
    getClientTags(),
    getSiteMeta(),
  ]);
  if (!study) notFound();

  const eyebrow = `${study.category} · ${clientTags[study.slug] ?? study.client}`;

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    creator: { "@type": "Organization", name: site.name },
  };

  const breadcrumbJsonLd = breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: study.title, path: `/work/${study.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[creativeWorkJsonLd, breadcrumbJsonLd]} />
      <CaseHero study={study} eyebrow={eyebrow} />
      <CaseBody study={study} />
      <ContactSection />
    </>
  );
}

function CaseBody({ study }: { study: CaseStudy }) {
  /* Four beats, and however many metrics the study happens to carry — some have
     three. `at()` leaves the gutter empty rather than reusing one. */
  const beats: { section: CaseSection; metric?: Metric }[] = [
    { section: study.challenge, metric: study.metrics.at(0) },
    { section: study.approach, metric: study.metrics.at(1) },
    { section: study.solution, metric: study.metrics.at(2) },
    { section: study.results, metric: study.metrics.at(3) },
  ];

  return (
    <div className="bg-base pb-10 pt-10 md:pb-24">
      {/* 20 of gutter at 390, matching `Container` and the design's own x=20. */}
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-6 lg:px-0">
        <CaseCover
          cover={study.cover}
          title={study.title}
          aspect="aspect-[2.38]"
          sizes="(min-width: 1200px) 1200px, 100vw"
          eager
        />

        {/* 48 between the beats at 390, against the desktop 80. */}
        <div className="mt-12 flex flex-col gap-12 md:mt-20 md:gap-20">
          {beats.map(({ section, metric }) => (
            <section
              key={section.heading}
              className="flex flex-col gap-6 md:gap-10 lg:flex-row lg:gap-20"
            >
              {/* The gutter is reserved even when there is no metric, so the
                  prose column stays on the same axis down the page. Below `lg`
                  the design puts the callout *after* the prose, not before it. */}
              <div className="max-lg:order-2 max-lg:empty:hidden lg:flex lg:w-[480px] lg:shrink-0 lg:flex-col lg:justify-end">
                {metric && <StatCallout value={metric.value} label={metric.label} />}
              </div>

              <div className="lg:w-[640px] lg:shrink-0">
                <h2 className="font-display text-section font-medium uppercase text-contrast-2">
                  {section.heading}
                </h2>
                <div className="mt-6 flex flex-col gap-6 md:mt-8">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-body text-contrast">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
