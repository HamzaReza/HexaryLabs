import { cn } from "@/lib/cn";

/**
 * The chevron ornament: a run of stacked arrowheads, optionally led by a
 * hexagon. The design uses it twice on the homepage — flanking the centred
 * "Our Work" heading, where five chevrons fade outward on each side, and as a
 * long unfaded run above the outcome block, headed by the hexagon.
 *
 * Both the chevron and the hexagon are the design's own vectors. The run is
 * generated rather than exported as 24 repeated paths: one shape, translated on
 * the measured 15.005px pitch.
 */

/** A single chevron, 17.43 × 38, drawn from its own origin. */
const CHEVRON =
  "M17.4316 16.8018C18.1963 18.1676 18.1963 19.8325 17.4316 21.1982L8.02246 38H0L10.6396 19L0 0H8.02246L17.4316 16.8018Z";

/** The hexagon head: outer ring plus the accent core, 38.87 × 37.91. */
const HEX_RING =
  "M29.6141 0.00292969C31.2305 0.0569419 32.7105 0.939507 33.5243 2.3457L38.8739 11.5928H31.6346L28.5536 6.2666H13.8495L6.50863 18.9551L13.8495 31.6436H28.5536L31.6346 26.3174H38.8739L33.5243 35.5645L33.4442 35.6982C32.6157 37.0264 31.1786 37.8549 29.6141 37.9072L29.4569 37.9102H12.9461C11.3211 37.9101 9.81503 37.0708 8.95883 35.6982L8.87875 35.5645L0.631676 21.3086C-0.210559 19.8527 -0.210559 18.0574 0.631676 16.6016L8.87875 2.3457C9.71883 0.894029 11.2689 6.64864e-05 12.9461 0H29.4569L29.6141 0.00292969Z";
const HEX_CORE =
  "M13 19.3627L17.2296 12H25.6889L29.9186 19.3627L25.6889 26.7254H17.2296L13 19.3627Z";

const PITCH = 15.005;
const HEAD_WIDTH = 38.874;
const HEIGHT = 38;

export function ChevronRun({
  count,
  head = false,
  direction = "right",
  /** Step the run down to 20% opacity away from the head. */
  fade = false,
  /** Centre-to-centre spacing. The design uses 15.005 for the long runs and
      16.005 for the short connectors between the approach hexagons. */
  pitch = PITCH,
  className,
}: {
  count: number;
  head?: boolean;
  direction?: "left" | "right";
  fade?: boolean;
  pitch?: number;
  className?: string;
}) {
  const headOffset = head ? HEAD_WIDTH : 0;
  const width = headOffset + (count - 1) * pitch + 17.432;

  return (
    <svg
      viewBox={`0 0 ${width} ${HEIGHT}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("text-grey-200", direction === "left" && "-scale-x-100", className)}
    >
      {head && (
        <>
          <path d={HEX_RING} fill="currentColor" />
          <path d={HEX_CORE} className="fill-accent" />
        </>
      )}
      {Array.from({ length: count }, (_, i) => (
        <path
          key={i}
          d={CHEVRON}
          fill="currentColor"
          /* The design steps whole chevrons rather than applying a gradient, so
             the ramp is per-shape opacity: 1 down to 0.2 across the run. */
          opacity={fade ? 1 - i / count : undefined}
          transform={`translate(${headOffset + i * pitch} 0)`}
        />
      ))}
    </svg>
  );
}

/**
 * The hexagon on its own, 38.874 × 37.91.
 *
 * About's "where we sit" marker converges two runs on a single hexagon, so the
 * head cannot be attached to either of them — it is a third element between the
 * two, and it is drawn from the same vectors rather than a second copy of them.
 *
 * The ring takes `currentColor` and the core is a class, because the design
 * uses two different pairs: ink ring over an accent core on the homepage,
 * white ring over `accent-hi` here.
 */
export function ChevronHead({
  className,
  coreClassName = "fill-accent",
}: {
  className?: string;
  coreClassName?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${HEAD_WIDTH} 37.9102`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-[37.91px] w-[38.874px] shrink-0", className)}
    >
      <path d={HEX_RING} fill="currentColor" />
      <path d={HEX_CORE} className={coreClassName} />
    </svg>
  );
}
