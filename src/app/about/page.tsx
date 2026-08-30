import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Annotation } from "@/components/ui/Annotation";
import { ClippedPanel } from "@/components/ui/ClippedPanel";
import { HexCluster } from "@/components/ui/HexCluster";
import { ConnectorLine } from "@/components/ui/ConnectorLine";
import { ContactSection } from "@/components/sections/ContactSection";
import { cn } from "@/lib/cn";
import { getAboutContent } from "@/lib/data";
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

export default async function AboutPage() {
  const { whyWeExist, whosBehind, whereExpertiseRanges, whyChooseUs } =
    await getAboutContent();

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

      {/* 01 — Why we exist: annotated prose split */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_1.25fr]">
            <div className="md:sticky md:top-28 md:self-start">
              <Annotation index="01">Why we exist</Annotation>
              <h2 className={cn(contentHeading, "mt-3")}>{whyWeExist.heading}</h2>
              <p className="mt-6 hidden text-grey-500 md:block">
                <ConnectorLine length={96} arrow crosshair="start" />
              </p>
            </div>
            <div className="flex flex-col gap-6 text-body-lg text-grey-600">
              {whyWeExist.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 02 — Senior ownership: hex-anchored principle panels + proof rail */}
      <Section tone="muted">
        <Container>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <div>
              <Annotation index="02">Who&rsquo;s behind the work</Annotation>
              <h2 className="mt-3 text-h2 max-md:text-[1.625rem] md:text-[2.25rem] lg:text-h2">
                {whosBehind.heading}
              </h2>
            </div>
            <p className="max-w-[480px] text-body-lg text-grey-600">
              {whosBehind.intro}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whosBehind.principles.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 60} className="h-full">
                <ClippedPanel
                  clip="md"
                  bordered
                  className="flex h-full flex-col gap-4 bg-base p-7"
                >
                  <HexCluster
                    cells={[
                      { q: 0, r: 0, role: i === 2 ? "signal" : "ink" },
                    ]}
                    className="h-8 w-auto"
                  />
                  <p className="font-display text-body-lg font-medium text-contrast-2">
                    {principle.title}
                  </p>
                  <p className="text-body text-grey-600">{principle.body}</p>
                </ClippedPanel>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 max-w-[70ch] border-l-2 border-accent pl-6 text-body-lg text-grey-600">
            {whosBehind.proofLine}
          </p>
        </Container>
      </Section>

      {/* 03 — Practical technology selection: alternating asymmetric area rows */}
      <Section tone="light">
        <Container>
          <SectionHeader
            title={whereExpertiseRanges.heading}
            intro={whereExpertiseRanges.intro}
          />

          <div className="flex flex-col gap-10">
            {whereExpertiseRanges.areas.map((area, i) => (
              <Reveal key={area.heading} variant="fade-up">
                <div
                  className={cn(
                    "grid items-start gap-8 lg:grid-cols-[1fr_1.8fr] lg:gap-16",
                    i % 2 === 1 && "lg:[direction:rtl] lg:[&>*]:[direction:ltr]",
                  )}
                >
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <Annotation index={`03.${i + 1}`} />
                    <h3 className={cn(contentHeading, "mt-3")}>{area.heading}</h3>
                  </div>
                  <ClippedPanel clip="md" bordered className="texture-dots bg-base-2 p-8">
                    <p className="text-body-lg text-grey-600">{area.body}</p>
                  </ClippedPanel>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 max-w-[70ch] text-body-lg text-grey-600">
            {whereExpertiseRanges.closing}
          </p>
        </Container>
      </Section>

      {/* 04 — What it means for you: annotated module grid */}
      <Section tone="muted">
        <Container>
          <div className="mb-14">
            <Annotation index="04">Working with us</Annotation>
            <h2 className="mt-3 text-h2 max-md:text-[1.625rem] md:text-[2.25rem] lg:text-h2">
              {whyChooseUs.heading}
            </h2>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.items.map((item, i) => (
              <ClippedPanel
                key={item.title}
                clip="sm"
                bordered
                className="flex h-full flex-col gap-2 bg-base p-6"
                as="li"
              >
                <Annotation index={String(i + 1).padStart(2, "0")} />
                <p className="font-display text-body-lg font-medium text-contrast-2">
                  {item.title}
                </p>
                <p className="text-body text-grey-600">{item.body}</p>
              </ClippedPanel>
            ))}
          </ul>
        </Container>
      </Section>

      <ContactSection />
    </>
  );
}
