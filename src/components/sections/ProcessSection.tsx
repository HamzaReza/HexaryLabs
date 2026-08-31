import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessRail } from "@/components/visuals/ProcessRail";
import type { ProcessStepDetail } from "@/lib/data/types";
import { getProcessSteps } from "@/lib/data";

/**
 * How We Work: four step cards staggered down two columns, joined by a rail of
 * hexagon nodes, with hatched blocks filling the empty half of each row.
 *
 * The previous build ran the four steps as a horizontal staircase of equal
 * panels. The design turns it on its side — steps 1 and 3 on the left, 2 and 4
 * on the right, each starting where the one before it ends, so the eye zig-zags
 * down the rail.
 *
 * The stagger is not absolute positioning. Both columns are ordinary stacks on
 * a 32px gap, and the offsets come from the hatched blocks, which are real
 * boxes of measured height. That is why the composition survives copy that runs
 * longer than the design's: a taller card pushes its own column down and
 * nothing overlaps.
 *
 * Below `lg` the blocks and the rail are dropped — one column has nothing to
 * stagger and nothing to join — and the columns collapse to a single stack. The
 * two column elements become `display: contents` there so all four cards land
 * in one flex container, and `order` restores 01 → 04 on screen.
 *
 * Known trade-off: because the columns are independent stacks, the cards sit in
 * the document as 01, 03, 02, 04. A screen reader hears them in that order on
 * every viewport. Each card leads with its own number, so the sequence is still
 * followable, but it is a real ordering difference and is recorded as one.
 */

/**
 * Filler heights, in the order each column meets them, from the design's frame.
 * These are what set the vertical offset between the two columns.
 */
const LEFT_FILLERS = [150, 250];
const RIGHT_FILLERS = [250, 150];

export async function ProcessSection() {
  const steps = await getProcessSteps();

  return (
    <section className="bg-base-2 py-14 lg:pb-[100px] lg:pt-20">
      <Container>
        <SectionHead
          title="How We Work"
          action={{ label: "See the full process", href: "/how-we-work" }}
          className="mb-12"
        />

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[601fr_40px_601fr] lg:items-start lg:gap-x-[19px]">
          <Column
            steps={steps.filter((_, i) => i % 2 === 0)}
            positions={[0, 2]}
            fillers={LEFT_FILLERS}
          />
          <ProcessRail nodes={steps.length} className="max-lg:hidden" />
          <Column
            steps={steps.filter((_, i) => i % 2 === 1)}
            positions={[1, 3]}
            fillers={RIGHT_FILLERS}
            leading
          />
        </div>
      </Container>
    </section>
  );
}

/** One staggered column: cards interleaved with the hatched filler blocks. */
function Column({
  steps,
  positions,
  fillers,
  leading = false,
}: {
  steps: ProcessStepDetail[];
  /** Each card's place in the real sequence, so `order` can restore it. */
  positions: number[];
  fillers: number[];
  /** The right column opens with a filler; the left one opens with a card. */
  leading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-8 max-lg:contents">
      {leading && <Filler height={fillers[0]} />}
      {steps.map((step, i) => (
        <div key={step.number} className="contents">
          <StepCard step={step} position={positions[i]} />
          {leading
            ? i < steps.length - 1 && <Filler height={fillers[i + 1]} />
            : <Filler height={fillers[i]} />}
        </div>
      ))}
    </div>
  );
}

function Filler({ height }: { height: number }) {
  return (
    <div
      aria-hidden="true"
      className="texture-hatch shrink-0 max-lg:hidden"
      style={{ height }}
    />
  );
}

function StepCard({
  step,
  position,
}: {
  step: ProcessStepDetail;
  position: number;
}) {
  return (
    <Reveal
      variant="fade-up"
      delay={position * 100}
      className="max-lg:[order:var(--step-order)]"
      style={{ "--step-order": position } as React.CSSProperties}
    >
      <article className="bg-base p-6 pt-4">
        <p
          aria-hidden="true"
          className="font-display text-numeral font-light leading-[1.27] text-accent"
        >
          {step.number}
        </p>

        <h3 className="mt-4 font-display text-card font-medium text-contrast-2">
          {step.title}
        </h3>

        <p className="mt-4 text-body text-grey-600">{step.body}</p>

        <div className="mt-8 bg-contrast p-5 text-white">
          <p className="font-display text-lead font-medium">You end up with:</p>
          <p className="mt-4 text-body text-grey-300">{step.deliverable}</p>
        </div>
      </article>
    </Reveal>
  );
}
