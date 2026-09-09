import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChevronRun } from "@/components/visuals/ChevronRun";
import { cn } from "@/lib/cn";
import type { ServiceStep } from "@/lib/data/types";

/**
 * "Our approach" — the run of hatched hexagons with chevron connectors, then a
 * title and body under each.
 *
 * Measured off the service frames: a flat-top hexagon 160 × 138 (side 80,
 * height 80·√3 = 138.6), a 100px chevron connector, and either 32px (3 steps)
 * or 24px (4 steps) between them. Caption columns follow the same pitch —
 * 324px when there are three steps, 308px when there are four — so each body
 * sits under its own hexagon.
 *
 * Badge artwork is the Figma export (node `111:23102` / Strategy twin): a
 * purple flat-top outline with the logo-shaped (#DADADA) hatch inset — not a
 * solid hex filled with a diagonal pattern.
 *
 * **The design does not stack this block on a phone — it turns it on its side.**
 * Its 390 frames put a 64px rail down the left of each step, carrying the
 * hexagon at 40% and the connector turned to run downward, with the title and
 * body in a 266px column beside it.
 *
 * Between `sm` and `lg` the two-column stack is kept: there is no artboard
 * for that width, and a 64px rail beside a 300px column reads worse than the
 * stack does.
 */

/** 160 × 138.56 on the desktop frames, 64 × 55.43 on the 390 ones — the same
    hexagon at 40%, which is why the size is a class rather than a second shape. */
const BADGE_LG = "h-[138.56px] w-40";

/**
 * Inset of the logo hatch inside the 160×138 outline, taken from Figma
 * (`left 12 / top 8.94 / 124×121` on the Design approach badge).
 */
const HATCH_INSET =
  "absolute left-[7.5%] top-[6.5%] h-[87.5%] w-[77.5%]";

function StepBadge({ number, className }: { number: string; className?: string }) {
  return (
    <div className={cn("relative shrink-0", className ?? BADGE_LG)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static Figma SVG ornaments */}
      <img
        src="/ornaments/approach-hex-outline.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 size-full"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- static Figma SVG ornaments */}
      <img
        src="/ornaments/approach-hex-hatch.svg"
        alt=""
        aria-hidden
        draggable={false}
        className={HATCH_INSET}
      />
      <span className="absolute inset-0 grid place-items-center text-card text-accent">
        {number}
      </span>
    </div>
  );
}

export function ServiceApproach({
  steps,
  cta,
}: {
  steps: readonly ServiceStep[];
  cta: { label: string; href: string };
}) {
  const count = steps.length;
  const fourUp = count >= 4;
  /* 3-step frames use a 32px gutter and 324px caption columns (972 total).
     4-step frames tighten to 24px and 308px columns (1232 total). */
  const badgeGap = fourUp ? "gap-6" : "gap-8";
  const captionGrid = fourUp
    ? "lg:mx-auto lg:mt-6 lg:w-[1232px] lg:max-w-full lg:grid-cols-4 lg:gap-0"
    : "lg:mx-auto lg:mt-6 lg:w-[972px] lg:max-w-full lg:grid-cols-3 lg:gap-0";

  return (
    <section className="bg-base py-10 md:py-14 lg:pb-[100px] lg:pt-20">
      <Container>
        <h2 className="text-center text-section uppercase text-contrast-2">
          Our approach
        </h2>

        <div className={cn("mt-12 hidden items-center justify-center lg:flex", badgeGap)}>
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              {i > 0 && (
                <ChevronRun
                  count={6}
                  pitch={16.005}
                  className="h-[38px] w-[100px] text-grey-200"
                />
              )}
              <StepBadge number={step.number} />
            </Fragment>
          ))}
        </div>

        <div
          className={cn(
            "mt-8 flex flex-col gap-5 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-10",
            captionGrid,
          )}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex gap-5 sm:block lg:px-5 lg:py-2 lg:text-center"
            >
              <div className="flex shrink-0 flex-col items-center max-sm:w-16 sm:mb-6 lg:hidden">
                <StepBadge
                  number={step.number}
                  className="h-[55.43px] w-16 sm:h-[138.56px] sm:w-40"
                />
                {i < steps.length - 1 && (
                  <ChevronRun
                    count={6}
                    pitch={16.005}
                    orientation="down"
                    className="mt-5 h-[97.5px] w-[38px] sm:hidden"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1 sm:contents">
                <h3 className="text-card text-contrast-2">{step.title}</h3>
                <p className="mt-3 text-body text-grey-600 sm:mt-6">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-12">
          <Button href={cta.href} variant="solid" className="max-sm:w-full max-sm:justify-center">
            {cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
