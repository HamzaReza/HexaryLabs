import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * The oversized hexagon watermark, hatched rather than filled — the design's
 * one large decorative mark. It sits behind the homepage hero and beside the
 * contact closer's headline, and it is the same silhouette as the hexagon in
 * the wordmark's "e", so the page and the logo carry one shape.
 *
 * Pulled as vector from the design rather than redrawn: the outline is the
 * exported path, and the hatching is a pattern instead of the 34 individual
 * line nodes the export contains — same result, a hundredth of the markup, and
 * it stays crisp at any size.
 *
 * Hatch geometry is taken from the export's own line nodes, not measured off a
 * render: the 34 lines sit 15.10° off vertical on a 14.065px perpendicular
 * period, stroke 1, in `#C8C8C8`. Because the pattern is declared in user
 * space, that period scales with the viewBox — the mark keeps its texture
 * density however large it is drawn.
 *
 * An earlier pass had 13.2 / 1.1, measured off a render, which ran the texture
 * 6% dense. Solving the period from two adjacent line nodes gives it exactly.
 *
 * Decorative by definition, so it is always `aria-hidden`.
 */
export function HexWatermark({ className }: { className?: string }) {
  /* Pattern ids are document-global. Two watermarks on one page (home hero and
     its contact closer) would otherwise share, and the second would win. */
  const id = useId();

  return (
    <svg
      viewBox="0 0 384.367 374.507"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("text-[color:var(--watermark-ink)]", className)}
    >
      <defs>
        <pattern
          id={id}
          width="14.065"
          height="14.065"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(15.1)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="14.065"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M292.267 0.527344C308.196 1.05806 322.781 9.7571 330.799 23.6152L383.499 114.712H312.176L281.819 62.2363H136.955L64.6316 187.253L136.955 312.271H281.819L312.177 259.793H383.5L330.799 350.892L330.003 352.215C321.839 365.302 307.683 373.466 292.267 373.979L290.721 374.007H128.053C112.042 374.007 97.2072 365.738 88.7712 352.215L87.9753 350.892L6.72339 210.44C-1.57447 196.097 -1.57445 178.41 6.72339 164.066L87.9753 23.6152C96.2518 9.30979 111.526 0.500195 128.053 0.5H290.721L292.267 0.527344ZM292.744 187.235L251.071 259.776H167.726L126.054 187.235L167.726 114.695H251.071L292.744 187.235Z"
      />
    </svg>
  );
}
