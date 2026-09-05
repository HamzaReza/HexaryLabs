import { useId } from "react";
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
 * height 80·√3 = 138.6), a 100px chevron connector, and 32px between them, so
 * the badge row repeats on a 324px pitch — the same pitch the text columns
 * below use, which is what keeps each caption under its own hexagon.
 *
 * **The design does not stack this block on a phone — it turns it on its side.**
 * Its 390 frames put a 64px rail down the left of each step, carrying the
 * hexagon at 40% and the connector turned to run downward, with the title and
 * body in a 266px column beside it. The build was centring a full-size 160px
 * hexagon above each caption, which cost 559px on the AI Engineering page alone
 * and was the single largest item left after Phase 7 part one.
 *
 * Between `sm` and `lg` the old two-column stack is kept: there is no artboard
 * for that width, and a 64px rail beside a 300px column reads worse than the
 * stack does.
 */

const S = 80;
const HEX_W = 2 * S;
const HEX_H = S * Math.sqrt(3);
const HEX = [
  [S, HEX_H / 2],
  [S / 2, 0],
  [-S / 2, 0],
  [-S, HEX_H / 2],
  [-S / 2, HEX_H],
  [S / 2, HEX_H],
]
  .map(([x, y]) => `${(x + S).toFixed(2)},${y.toFixed(2)}`)
  .join(" ");

/** 160 × 138.56 on the desktop frames, 64 × 55.43 on the 390 ones — the same
    hexagon at 40%, which is why the size is a class rather than a second shape. */
const BADGE_LG = "h-[138.56px] w-40";

function StepBadge({ number, className }: { number: string; className?: string }) {
  const id = useId();
  const hatch = `${id}-hatch`;

  return (
    <div className={cn("relative shrink-0", className ?? BADGE_LG)}>
      <svg
        viewBox={`0 0 ${HEX_W} ${HEX_H}`}
        fill="none"
        aria-hidden
        className="absolute inset-0 size-full"
      >
        <defs>
          <pattern
            id={hatch}
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="9" stroke="#EDEDED" strokeWidth="1" />
          </pattern>
        </defs>
        <polygon points={HEX} fill={`url(#${hatch})`} />
        <polygon points={HEX} fill="none" stroke="var(--color-accent)" strokeWidth="1" />
      </svg>
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
  return (
    <section className="bg-base py-10 md:py-14 lg:pb-[100px] lg:pt-20">
      <Container>
        <h2 className="text-center text-section uppercase text-contrast-2">
          Our approach
        </h2>

        {/* Badges and captions are two rows of the same 324px rhythm rather
            than one column each, so a long caption never pushes its hexagon
            out of line with the others. */}
        <div className="mt-12 hidden items-center justify-center lg:flex">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center">
              {i > 0 && (
                <ChevronRun
                  count={6}
                  pitch={16.005}
                  className="mx-8 h-[38px] w-[100px] text-grey-200"
                />
              )}
              <StepBadge number={step.number} />
            </div>
          ))}
        </div>

        {/* The captions repeat the badge row's 324px pitch — three 324
            columns centred in the 1280, so each caption sits under its own
            hexagon and its body measures the design's 284.

            Below `sm` this is not a grid at all but the design's rail: a 20px
            gap column of 64px badges beside a 266px text column, one step per
            row on a 20px gap. */}
        <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-10 lg:mx-auto lg:mt-6 lg:w-[972px] lg:grid-cols-3 lg:gap-0">
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
                {/* 38 × 97.5 of chevrons hanging 20 below the hexagon, on every
                    step but the last — the design's own connector, turned. */}
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
