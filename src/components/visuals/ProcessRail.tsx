import { cn } from "@/lib/cn";

/**
 * The rail running between the two process columns: one hexagon node per step,
 * joined by hairlines.
 *
 * Every number is from the design's exported 40 × 986 rail. Its nodes sit on a
 * 309px pitch, and that pitch divides as 27 of hexagon, 28 of air, 226 of line,
 * 28 of air. Both the node and the line are a 1px `#5A5A5A`.
 *
 * An earlier pass drew this as a *pointy-top* hexagon at 39 × 58 — rotated a
 * quarter turn from the design's flat-top 32 × 27, and more than twice as tall.
 * The 309 pitch still came out right because the oversized node was
 * compensated with too little air, so the rail measured correctly while
 * looking wrong.
 *
 * The nodes are evenly spaced and do not track the cards they sit beside; the
 * design lets the rail keep its own rhythm, which is what makes it read as a
 * spine rather than as four connectors.
 *
 * Decorative: the sequence it draws is already carried by the numbered cards.
 */

/** The export's hexagon, lifted 15.5 so it clears the viewBox with its stroke. */
const NODE = "M36 14L28 27.5H12L4 14L12 0.5H28L36 14Z";

export function ProcessRail({
  nodes,
  className,
}: {
  nodes: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      /* 27.5 rather than 28: the node box carries half a pixel of clearance at
         each end for the stroke, so the air either side gives back the same. */
      className={cn("flex flex-col items-center gap-[27.5px]", className)}
    >
      {Array.from({ length: nodes }, (_, i) => (
        <div key={i} className="contents">
          {i > 0 && <span className="h-[226px] w-px bg-grey-600" />}
          <svg
            viewBox="0 0 40 28"
            fill="none"
            focusable="false"
            className="h-7 w-10 shrink-0 text-grey-600"
          >
            <path d={NODE} stroke="currentColor" />
          </svg>
        </div>
      ))}
    </div>
  );
}
