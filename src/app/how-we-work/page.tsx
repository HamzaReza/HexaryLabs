import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Annotation } from "@/components/ui/Annotation";
import { ClippedPanel } from "@/components/ui/ClippedPanel";
import { HexCluster } from "@/components/ui/HexCluster";
import { DirectionalMarker } from "@/components/ui/DirectionalMarker";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { cn } from "@/lib/cn";
import { getHowWeWorkContent } from "@/lib/data";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How We Work",
  description:
    "Our engagement process: frame the problem, prove the risky part, build in the open, hand over cleanly. What each step actually looks like week to week.",
  path: "/how-we-work",
});

const breadcrumbJsonLd = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "How We Work", path: "/how-we-work" },
]);

export default async function HowWeWorkPage() {
  const { hero, intro, phases, whatWeAsk, closing } =
    await getHowWeWorkContent();

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

      {phases.map((phase, i) => (
        <Section key={phase.number} tone={i % 2 === 0 ? "muted" : "light"}>
          <Container>
            <div
              className={cn(
                "grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16",
                i % 2 === 1 && "lg:[direction:rtl] lg:[&>*]:[direction:ltr]",
              )}
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="flex items-center gap-4">
                  <HexCluster
                    cells={[
                      {
                        q: 0,
                        r: 0,
                        role: i === phases.length - 1 ? "signal" : "ink",
                      },
                    ]}
                    className="h-10 w-auto"
                  />
                  <Annotation index={phase.number}>
                    Phase {i + 1} of {phases.length}
                  </Annotation>
                </div>
                <h2 className="mt-4 text-[1.625rem] leading-[1.2] md:text-[2.25rem] lg:text-h3">
                  {phase.title}
                </h2>
                <p className="mt-6 text-body-lg text-grey-600">{phase.lead}</p>
                {i < phases.length - 1 && (
                  <p className="mt-8 flex items-center gap-3 text-grey-500">
                    <DirectionalMarker direction="down" />
                    <Annotation>Next: {phases[i + 1].title}</Annotation>
                  </p>
                )}
              </div>

              <div>
                <div className="flex flex-col gap-6 text-body text-grey-600">
                  {phase.detail.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                <Reveal variant="fade-up" className="mt-10">
                  <ClippedPanel
                    clip="md"
                    bordered
                    className={cn("p-6", i % 2 === 0 ? "bg-base" : "bg-base-2")}
                  >
                    <Annotation>{phase.deliverableLabel}</Annotation>
                    <p className="mt-3 text-body-lg text-contrast-2">
                      {phase.deliverable}
                    </p>
                  </ClippedPanel>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="muted">
        <Container>
          <SectionHeader title={whatWeAsk.heading} intro={whatWeAsk.intro} />

          <div className="grid gap-4 md:grid-cols-3">
            {whatWeAsk.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 60} className="h-full">
                <ClippedPanel
                  clip="sm"
                  bordered
                  className="flex h-full flex-col gap-3 bg-base p-8"
                >
                  <Annotation index={String(i + 1).padStart(2, "0")} />
                  <h3 className="text-[1.3125rem] leading-[1.2]">{item.title}</h3>
                  <p className="text-body text-grey-600">{item.body}</p>
                </ClippedPanel>
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
