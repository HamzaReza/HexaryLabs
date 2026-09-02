import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * The three-hexagon cluster that bleeds off the left edge of the stack section:
 * one hatched, two outlined, stepping down and to the left.
 *
 * This is the same artwork as the inner-page hero field — identical paths,
 * identical viewBox, identical line nodes — drawn in the design's cool
 * `#C2C1CC` rather than the hero's neutral `#939393`. See `HeroHexField`.
 *
 * All the numbers come from the export's own nodes. An earlier pass measured
 * them off a render and got two of the three wrong: the hatch ran on a 9.7px
 * period against the real 12.73 (24% too dense), and its rotation was mirrored,
 * leaning the fill the opposite way to the design.
 *
 * Stroke widths depart from the source for the reason set out in
 * `HeroHexField`: the SVG is drawn at 502 × 498 against a 503 × 498 viewBox, so
 * effectively 1:1, and Chrome spreads the design's sub-pixel strokes (0.814 and
 * 0.753) across two device pixels and renders them far too pale. Both are drawn
 * a full pixel wide instead, with the colours scaled by the widths they replace
 * so the rendered weight matches the design and the hatch matches the outlines.
 *
 * Purely decorative, so it is `aria-hidden` and hidden outright below `lg`,
 * where the stack section becomes a single column and there is no edge for it
 * to bleed off.
 */

/** `#C2C1CC` scaled by the 0.814 stroke it replaces. */
const OUTLINE_INK = "#CDCDD6";
/** Darker again, so a 1.7px line at 30° peaks level with the outlines. */
const HATCH_INK = "#C6C6D0";

const HATCH_PERIOD = 12.73;

export function StackHexagons({ className }: { className?: string }) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 503.131 498.394"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn(className)}
    >
      <defs>
        <pattern
          id={id}
          width={HATCH_PERIOD}
          height={HATCH_PERIOD}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(30)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={HATCH_PERIOD}
            stroke={HATCH_INK}
            strokeWidth="1.7"
          />
        </pattern>
      </defs>

      <path
        fill={`url(#${id})`}
        d="M502.661 119.97L433.613 239.533H295.518L226.47 119.97L295.518 0.406869H433.613L502.661 119.97Z"
      />
      <g stroke={OUTLINE_INK} strokeWidth="1">
        <path d="M276.661 248.97L207.613 368.533H69.5176L0.469842 248.97L69.5176 129.407H207.613L276.661 248.97Z" />
        <path d="M501.288 378.424L432.24 497.988H294.145L225.097 378.424L294.145 258.861H432.24L501.288 378.424Z" />
      </g>
    </svg>
  );
}
