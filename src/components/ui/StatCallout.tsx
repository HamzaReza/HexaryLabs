import { cn } from "@/lib/cn";
import { HexMark } from "@/components/ui/HexMark";

/**
 * A result pulled out of a case study's prose and set in the left gutter beside
 * it — the number first, then what it means.
 *
 * The design's own values: an `#E1DDFF` panel on 16/24/20/16 padding, the mark
 * and the text 16 apart, the figure Space Grotesk Medium 24/28 at +0.32, and
 * the line under it Inter *italic* 14/24. The italic is deliberate — it is the
 * only italic on the page, and it keeps the caption from reading as body copy.
 *
 * The corner is cut rather than covered. The design draws a 32px white triangle
 * over the top right, which works because the page behind it is white; a
 * `clip-path` produces the same shape without assuming what it sits on.
 */

const CUT_CORNER = "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)";

export function StatCallout({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      /* 12/20/12/12 at 390, where the design draws the panel tighter. */
      className={cn(
        "relative flex items-start gap-3 py-3 pl-3 pr-5",
        "md:gap-4 md:pb-5 md:pl-4 md:pr-6 md:pt-4",
        className,
      )}
      style={{ background: "#e1ddff", clipPath: CUT_CORNER }}
    >
      <HexMark className="text-accent-hi" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="font-display text-[1.5rem] font-medium leading-[28px] tracking-[0.32px] text-contrast-2">
          {value}
        </p>
        <p className="text-[0.875rem] italic leading-6 text-contrast">{label}</p>
      </div>
    </div>
  );
}
