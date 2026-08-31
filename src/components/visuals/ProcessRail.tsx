import { cn } from "@/lib/cn";

/**
 * The rail running between the two process columns: one hexagon node per step,
 * joined by hairlines.
 *
 * Measured off the design's 40 × 986 rail — 59px nodes on a 309px pitch, with
 * 226px of line and 12px of air on each side of it between them. The nodes are
 * evenly spaced and do not track the cards they sit beside; the design lets the
 * rail keep its own rhythm, which is what makes it read as a spine rather than
 * as four connectors.
 *
 * Decorative: the sequence it draws is already carried by the numbered cards.
 */
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
      className={cn("flex flex-col items-center gap-3", className)}
    >
      {Array.from({ length: nodes }, (_, i) => (
        <div key={i} className="contents">
          {i > 0 && <span className="h-[226px] w-px bg-grey-600" />}
          <svg
            viewBox="0 0 40 59"
            fill="none"
            focusable="false"
            className="h-[59px] w-10 shrink-0 text-grey-400"
          >
            <path
              d="M20 0.5 39.5 15v29L20 58.5 0.5 44V15Z"
              stroke="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
