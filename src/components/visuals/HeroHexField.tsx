import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * The hexagon cluster in the right of every inner-page hero.
 *
 * These are the design's own vectors, exported from the two hero frames and
 * embedded verbatim rather than reconstructed. An earlier pass measured the
 * first hexagon off a render and then *guessed* the other two; the guesses were
 * wrong, and there was no way to tell from the geometry alone which parts were
 * measured and which were invented. Everything below is the artwork.
 *
 * Both fields are authored on the 1440 × 540 frame, so the SVG is drawn at
 * exactly that size and pinned to the right edge instead of scaling: on a
 * narrower viewport the cluster slides out of frame the way the design's own
 * clip does. Purely decorative, and inert to pointer events.
 *
 * The two tones are genuinely different artwork, not one shape recoloured:
 *
 * · `light` — three regular flat-top hexagons of side 138.1, hairline `#939393`
 *   at 0.814. The upper cell carries a hatch and *no* outline.
 * · `dark`  — five rotated hexagons inside a group at 56% opacity: one filled
 *   white at 20%, three stroked white at 2.625 (one of them at 40% opacity),
 *   and one masked cell carrying the hatch.
 *
 * The hatches differ too, and the numbers come from the exported line
 * transforms: the light field runs at 30° off vertical on a 12.73 perpendicular
 * period, the dark one at 40.1° on 16.77.
 *
 * One deliberate departure from the source, on the light field: Figma draws
 * both the outlines and the hatch as sub-pixel strokes (0.814 and 0.753) in
 * `#939393`, and its rasteriser resolves them to crisp 1px lines at about
 * `#A1A1A1`. Chrome instead spreads a 0.8px stroke across two rows at ~40%
 * each, which rendered the outlines at 237 against the design's 202 and made
 * the hatch and the outlines visibly different weights from each other. Both
 * are therefore drawn as a full 1px at the colour Figma actually produces —
 * matching the design's rendered output rather than its source widths, and
 * keeping the three cells the same colour as each other, which is how the
 * design reads.
 */

/**
 * What Figma's rasteriser resolves the light field's 0.8px strokes to, measured
 * as total ink: the design's flat-top edge lays 86 units across two rows, its
 * crisp edges 94 across one. #A5A5A5 at 1px sits at 90, between the two — and
 * it is `grey-400`, already in the palette.
 *
 * The hatch is drawn thicker than nominal, and the number is empirical rather
 * than derived. Comparing like with like — peak ink on the *diagonal* edges,
 * which anti-alias the way the hatch does — the design puts its hatch and its
 * outlines at the same weight: 97 and 94. This build reproduces the outlines at
 * 90, but Figma renders its 0.753px hatch far heavier than nominal, and at that
 * width Chrome gave only 61, leaving the hatched cell visibly paler than the
 * two outlines beside it. 1.7px brings the hatch's peak up to its own outlines'
 * 90, so all three cells read as one colour — which is how the design draws
 * them, and the point of the whole cluster.
 *
 * Width alone could not close it. At 1.7px the hatch peaks at 79 against the
 * outlines' 90, because Chrome spreads a rotated stroke wider than linear
 * scaling predicts and the centre pixel never reaches full coverage. Pushing
 * the width further would have made the lines visibly fatter than the design's,
 * so the last 12% is paid in ink instead: the hatch is nominally darker so that
 * it *renders* the same as the outlines. Rendered output is what the design is
 * being matched against, not the values in the file.
 */
const LIGHT_INK = "#A5A5A5";
const LIGHT_STROKE = 1;
const LIGHT_HATCH_STROKE = 1.7;
/** Darker than `LIGHT_INK` so it renders equal to it once anti-aliased. */
const LIGHT_HATCH_INK = "#999999";

export function HeroHexField({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const id = useId();
  const hatchId = `${id}-hatch`;
  const clipId = `${id}-clip`;

  return (
    <svg
      aria-hidden
      width={1440}
      height={540}
      viewBox="0 0 1440 540"
      fill="none"
      className={cn(
        "pointer-events-none absolute right-0 top-0 -z-10 h-[540px] w-[1440px]",
        className,
      )}
    >
      {tone === "dark" ? (
        <DarkField hatchId={hatchId} clipId={clipId} />
      ) : (
        <LightField hatchId={hatchId} clipId={clipId} />
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------- light */

/** Hexagon group origin on the frame, solved from the two outlined cells. */
const LIGHT_ORIGIN = "translate(937.7 84.3)";

const LIGHT_HATCHED =
  "M502.661 119.97L433.613 239.533H295.518L226.47 119.97L295.518 0.406869H433.613L502.661 119.97Z";
const LIGHT_OUTLINES = [
  "M276.661 248.97L207.613 368.533H69.5176L0.469842 248.97L69.5176 129.407H207.613L276.661 248.97Z",
  "M501.288 378.424L432.24 497.988H294.145L225.097 378.424L294.145 258.861H432.24L501.288 378.424Z",
];

function LightField({ hatchId, clipId }: { hatchId: string; clipId: string }) {
  return (
    <>
      <defs>
        <pattern
          id={hatchId}
          width="12.73"
          height="12.73"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(30)"
        >
          <line x1="0" y1="0" x2="0" y2="12.73" stroke={LIGHT_HATCH_INK} strokeWidth={LIGHT_HATCH_STROKE} />
        </pattern>
        <clipPath id={clipId}>
          <path d={LIGHT_HATCHED} transform={LIGHT_ORIGIN} />
        </clipPath>
      </defs>

      {/* The hatched cell is a mask in the design — it carries the fill and no
          stroke, which is what keeps it reading as texture rather than a third
          outlined hexagon. */}
      <g clipPath={`url(#${clipId})`}>
        <path d={LIGHT_HATCHED} transform={LIGHT_ORIGIN} fill={`url(#${hatchId})`} />
      </g>

      <g transform={LIGHT_ORIGIN}>
        {LIGHT_OUTLINES.map((d) => (
          <path key={d} d={d} stroke={LIGHT_INK} strokeWidth={LIGHT_STROKE} fill="none" />
        ))}
      </g>
    </>
  );
}

/* -------------------------------------------------------------------- dark */

/** The exported paths are in frame coordinates offset by -709.998. */
const DARK_ORIGIN = "translate(709.998 0)";

const DARK_HATCHED =
  "M504.448 329.951L419.197 430.802L517.619 558.342L701.291 585.031L786.541 484.18L688.12 356.64L504.448 329.951Z";
const DARK_FILLED =
  "M498.647 89.3373L413.396 190.189L511.818 317.729L695.49 344.418L780.741 243.566L682.319 116.026L498.647 89.3373Z";
const DARK_STROKED =
  "M211.159 169.943L125.908 270.795L224.33 398.335L408.002 425.024L493.252 324.172L394.831 196.632L211.159 169.943Z";
const DARK_STROKED_FAINT =
  "M206.202 225.513L120.951 326.365L219.373 453.905L403.045 480.594L488.295 379.742L389.874 252.202L206.202 225.513Z";
const DARK_STROKED_UPPER =
  "M498.764 32.0803L413.514 132.932L511.935 260.472L695.607 287.161L780.858 186.309L682.436 58.7692L498.764 32.0803Z";

function DarkField({ hatchId, clipId }: { hatchId: string; clipId: string }) {
  return (
    <>
      <defs>
        <pattern
          id={hatchId}
          width="16.77"
          height="16.77"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(40.07)"
        >
          <line x1="0" y1="0" x2="0" y2="16.77" stroke="white" strokeWidth="1.83725" />
        </pattern>
        <clipPath id={clipId}>
          <path d={DARK_HATCHED} transform={DARK_ORIGIN} />
        </clipPath>
      </defs>

      {/* The design groups the whole cluster at 56% rather than fading each
          shape, so the relative weights inside it stay as drawn. */}
      <g opacity="0.56">
        <g clipPath={`url(#${clipId})`}>
          <path d={DARK_HATCHED} transform={DARK_ORIGIN} fill={`url(#${hatchId})`} />
        </g>
        <g transform={DARK_ORIGIN}>
          <path d={DARK_FILLED} fill="white" fillOpacity="0.2" />
          <path d={DARK_STROKED} stroke="white" strokeWidth="2.62465" fill="none" />
          <path
            d={DARK_STROKED_FAINT}
            stroke="white"
            strokeOpacity="0.4"
            strokeWidth="2.62465"
            fill="none"
          />
          <path d={DARK_STROKED_UPPER} stroke="white" strokeWidth="2.62465" fill="none" />
        </g>
      </g>
    </>
  );
}
