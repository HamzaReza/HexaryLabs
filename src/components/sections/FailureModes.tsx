import { Container } from "@/components/ui/Container";
import { ChevronHead, ChevronRun } from "@/components/visuals/ChevronRun";

/**
 * The one band on the site that is neither the canvas nor the dark surface: a
 * horizontal ramp out of `#171717` through a deep indigo at the midpoint and
 * back, carrying the two ways an engagement fails and the studio's position
 * between them.
 *
 * The composition is an argument, so the geometry says it: two cards of equal
 * weight, and between them a run of chevrons closing in on the hexagon from
 * both sides under the words "where we sit". The marker is the point of the
 * section — without it this is a list of two problems rather than a claim about
 * where the answer is.
 *
 * Measured off the 1440 × 698 frame. 80 above, 100 below, 48 between the three
 * rows. The card row is 1000 wide, centred, on a 16 gap; the cards take the
 * remaining width equally and the marker column sits at its natural size.
 */

/**
 * `#080041` at the midpoint. It appears nowhere else in the palette — it is
 * this section's own colour, so it is written here rather than promoted to a
 * token that would imply reuse.
 */
const BAND =
  "linear-gradient(270deg, #171717 0%, #080041 50%, #171717 100%)";

/**
 * The design lights each card from inside twice over: a hard shadow under the
 * top edge, and a wide accent bloom off all four. Together they lift the card
 * off a ground it otherwise shares a colour with.
 */
const CARD_GLOW =
  "inset 0 2px 24.9px rgba(0,0,0,0.25), inset 0 0 24px rgba(155,141,255,0.2)";

export function FailureModes({
  heading,
  intro,
  modes,
  markerLabel,
  closing,
}: {
  heading: string;
  intro: string;
  modes: readonly { title: string; body: string }[];
  markerLabel: string;
  closing: string;
}) {
  return (
    <section
      data-tone="dark"
      className="relative isolate overflow-hidden pb-10 pt-8 md:pb-14 md:pt-14 lg:pb-[100px] lg:pt-20"
      style={{ background: BAND }}
    >
      <Container>
        <div className="flex flex-col items-center gap-12">
          <div className="flex max-w-[844px] flex-col gap-6 text-center">
            <h2 className="font-display text-[1.75rem] font-medium uppercase leading-[1.2857] tracking-[1.04px] text-white md:text-[2.25rem]">
              {heading}
            </h2>
            <p className="text-lead font-medium text-base-2">{intro}</p>
          </div>

          <div className="flex w-full max-w-[1000px] flex-col items-center gap-4 lg:flex-row lg:items-stretch">
            <Mode index={1} {...modes[0]} />

            {/* The marker is the fixed point: the cards flex around it. */}
            <div className="flex shrink-0 flex-col items-center justify-center gap-4">
              {/* Three pieces on a 4px gap — 78.026 + 38.874 + 78.026 — so the
                  two runs converge on one hexagon rather than each carrying its
                  own. The head is white-ringed here, not ink. */}
              <div className="flex items-center justify-center gap-1">
                <ChevronRun
                  count={5}
                  direction="left"
                  className="h-[38px] w-[78.026px] text-accent-hi"
                />
                <ChevronHead className="text-white" coreClassName="fill-accent-hi" />
                <ChevronRun count={5} className="h-[38px] w-[78.026px] text-accent-hi" />
              </div>
              <p className="font-mono text-caption font-medium uppercase text-white">
                {markerLabel}
              </p>
            </div>

            <Mode index={2} {...modes[1]} />
          </div>

          <p className="max-w-[630px] text-center text-body text-grey-300">
            {closing}
          </p>
        </div>
      </Container>
    </section>
  );
}

function Mode({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <div
      className="relative flex flex-1 flex-col gap-4 rounded-lg border border-accent-hi bg-contrast-2 p-5 text-center"
      style={{ boxShadow: CARD_GLOW }}
    >
      {/* Regular, not Medium — the design sets the numeral lighter than the
          heading it sits above, which is what keeps it reading as an index. */}
      <p className="font-display text-[2.25rem] leading-8 text-accent-hi">
        {String(index).padStart(2, "0")}
      </p>
      <p className="text-lead font-medium text-white">{title}</p>
      <p className="text-body text-grey-300">{body}</p>
    </div>
  );
}
