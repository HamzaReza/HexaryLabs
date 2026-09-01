import { useId } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChevronRun } from "@/components/visuals/ChevronRun";
import type { ServiceStep } from "@/lib/data/types";

/**
 * "Our approach" — the three-step run of hatched hexagons with chevron
 * connectors, then a title and body under each.
 *
 * Measured off the service frames: a flat-top hexagon 160 × 138 (side 80,
 * height 80·√3 = 138.6), a 100px chevron connector, and 32px between them, so
 * the badge row repeats on a 324px pitch — the same pitch the text columns
 * below use, which is what keeps each caption under its own hexagon.
 *
 * The connectors are decorative and drop out below `lg`, where the steps stack.
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

function StepBadge({ number }: { number: string }) {
  const id = useId();
  const hatch = `${id}-hatch`;

  return (
    <div className="relative shrink-0" style={{ width: HEX_W, height: HEX_H }}>
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
    <section className="bg-base py-14 lg:pb-[100px] lg:pt-20">
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
            hexagon and its body measures the design's 284. */}
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:mx-auto lg:mt-6 lg:w-[972px] lg:grid-cols-3 lg:gap-0">
          {steps.map((step) => (
            <div key={step.number} className="lg:px-5 lg:py-2 lg:text-center">
              <div className="mb-6 flex justify-center lg:hidden">
                <StepBadge number={step.number} />
              </div>
              <h3 className="text-card text-contrast-2">{step.title}</h3>
              <p className="mt-6 text-body text-grey-600">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href={cta.href} variant="solid">
            {cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
