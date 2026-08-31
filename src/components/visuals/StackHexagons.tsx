import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * The three-hexagon cluster that bleeds off the left edge of the stack section:
 * one hatched, two outlined, stepping down and to the left.
 *
 * All three silhouettes are the design's own vectors. The hatching is a
 * pattern rather than the 31 individual line nodes the export contains — the
 * design draws its fills at 30.1° off vertical on a 9.7px perpendicular period,
 * which is what the pattern reproduces.
 *
 * Purely decorative, so it is `aria-hidden` and hidden outright below `lg`,
 * where the stack section becomes a single column and there is no edge for it
 * to bleed off.
 */
export function StackHexagons({ className }: { className?: string }) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 503.131 498.394"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("text-grey-200", className)}
    >
      <defs>
        <pattern
          id={id}
          width="9.7"
          height="9.7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-30.1)"
        >
          <line x1="0" y1="0" x2="0" y2="9.7" stroke="currentColor" strokeWidth="0.75" />
        </pattern>
      </defs>

      <path
        fill={`url(#${id})`}
        d="M502.661 119.97L433.613 239.533H295.518L226.47 119.97L295.518 0.406869H433.613L502.661 119.97Z"
      />
      <g stroke="currentColor" strokeWidth="0.814">
        <path d="M276.661 248.97L207.613 368.533H69.5176L0.469842 248.97L69.5176 129.407H207.613L276.661 248.97Z" />
        <path d="M501.288 378.424L432.24 497.988H294.145L225.097 378.424L294.145 258.861H432.24L501.288 378.424Z" />
      </g>
    </svg>
  );
}
