import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Annotation } from "@/components/ui/Annotation";
import { ClippedPanel } from "@/components/ui/ClippedPanel";
import { DirectionalMarker } from "@/components/ui/DirectionalMarker";
import { process } from "@/content/process";
import { phases } from "@/content/how-we-work";

const STEP_OFFSETS = ["lg:mt-0", "lg:mt-10", "lg:mt-20", "lg:mt-30"];

/* 5.5: a process map, not a row of equally weighted columns — stages step
   down across layers with directional markers carrying the flow. Each stage
   also surfaces its deliverable from the full process page's content. */
export function ProcessSection() {
  return (
    <Section tone="light">
      <Container>
        <SectionHeader
          title={
            <>
              How We
              <span className="text-accent"> Work</span>
            </>
          }
          action={{ label: "See the full process", href: "/how-we-work" }}
        />

        <ol className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-0">
          {process.map((step, i) => {
            const deliverable = phases[i]?.deliverable;
            return (
              <li key={step.number} className="contents">
                {i > 0 && (
                  <div
                    aria-hidden="true"
                    className={`flex justify-center py-2 text-grey-500 lg:px-3 lg:pt-24 ${STEP_OFFSETS[i - 1]}`}
                  >
                    <DirectionalMarker direction="down" className="lg:hidden" />
                    <DirectionalMarker className="max-lg:hidden" />
                  </div>
                )}
                <Reveal
                  delay={i * 100}
                  className={`h-full ${STEP_OFFSETS[i]}`}
                >
                  <ClippedPanel clip="md" bordered className="flex h-full flex-col gap-4 bg-base-2 p-7">
                    <Annotation index={step.number}>Step</Annotation>
                    <h3 className="text-[1.3125rem] leading-[1.2]">{step.title}</h3>
                    <p className="text-body text-grey-600">{step.body}</p>
                    {deliverable && (
                      <p className="mt-auto border-t-[0.8px] border-grey-200 pt-4 text-body text-grey-600">
                        <span className="font-display font-medium text-contrast-2">
                          You end up with:{" "}
                        </span>
                        {deliverable}
                      </p>
                    )}
                  </ClippedPanel>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
