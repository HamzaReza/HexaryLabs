import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FailureModes } from "@/components/sections/FailureModes";
import { TeamBand } from "@/components/sections/TeamBand";
import { TechChipField } from "@/components/sections/TechChipField";
import { ContactSection } from "@/components/sections/ContactSection";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { getAboutContent, getStats } from "@/lib/data";
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

/**
 * About, on the approved design.
 *
 * The page is five bands and the contact closer. Two of them are unlike
 * anything else on the site — the indigo failure-modes band, and the technology
 * field where the stack is scattered rather than listed — and both are the
 * reason this page reads as an argument rather than a profile.
 *
 * What the previous build had here and the design does not: numbered section
 * annotations (`01 / WHY WE EXIST`), the sticky-heading prose split, the
 * two long expertise essays, and a 3 × 2 grid where the design has a
 * disclosure list. The copy those blocks carried is kept in `src/content` and
 * flagged for re-homing rather than deleted.
 */
export default async function AboutPage() {
  const [{ whyWeExist, whosBehind, whereExpertiseRanges, whyChooseUs }, stats] =
    await Promise.all([getAboutContent(), getStats()]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      {/* The design's About hero carries no hexagons: the three figures take
          the space the artwork occupies on every other inner page. */}
      <PageHero
        eyebrow="About"
        title="Software built by people who own the outcome."
        intro="Hexary Labs is a software development studio: engineers, designers, and product specialists who take products from a rough idea to a system your own team can run without us."
        art="none"
        /* The stats hug their widest label and are set `nowrap` in the design.
           At a fixed 196 the longest of the three wraps, which costs the block
           a line and breaks the bottom edge it shares with the copy. */
        aside={
          <dl className="flex flex-col gap-6 lg:whitespace-nowrap">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="font-display text-[2.5rem] font-medium leading-[1.275] tracking-[-0.746px] text-accent">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </dt>
                <dd className="font-mono text-caption font-medium uppercase text-grey-600">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      <FailureModes
        heading={whyWeExist.heading}
        intro={whyWeExist.intro}
        modes={whyWeExist.modes}
        markerLabel={whyWeExist.markerLabel}
        closing={whyWeExist.closing}
      />

      <TeamBand
        heading={whosBehind.heading}
        intro={whosBehind.intro}
        principles={whosBehind.principles}
        proofLine={whosBehind.proofLine}
        cta={{ label: "See Our Work", href: "/work" }}
        photo={{
          src: "/about-team.webp",
          alt: "The team at work: engineers at multi-monitor desks in an open studio",
        }}
      />

      <TechChipField
        heading={whereExpertiseRanges.heading}
        intro={whereExpertiseRanges.intro}
      />

      <section className="bg-base pb-[100px] pt-20">
        <Container>
          {/* 369 and 738 with the rest of the 1280 between them, which is the
              design's 173. They are maxima rather than fixed widths: at 1024
              the two together are wider than the container, and a fixed pair
              pushes the page into a horizontal scroll. */}
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
            <h2 className="font-display text-section font-medium uppercase tracking-[1.04px] text-contrast-2 lg:max-w-[369px] lg:flex-1">
              {whyChooseUs.heading}
            </h2>
            <Accordion
              checkmarks
              items={whyChooseUs.items.map((item) => ({
                question: item.title,
                answer: item.body,
              }))}
              className="lg:max-w-[738px] lg:flex-1"
            />
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
