import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * The hexagon artwork in the right of every inner-page hero.
 *
 * These are the design's own vectors, exported from the hero frames and
 * embedded verbatim rather than reconstructed. An earlier pass measured one
 * hexagon off a render and then *guessed* the rest; the guesses were wrong, and
 * there was no way to tell from the geometry alone which parts were measured
 * and which were invented. Everything below is the artwork.
 *
 * All three fields are authored on the 1440 × 540 frame, so the SVG is drawn at
 * exactly that size and pinned to the right edge instead of scaling: on a
 * narrower viewport the artwork slides out of frame the way the design's own
 * clip does. Purely decorative, and inert to pointer events.
 *
 * The design uses two different pieces of artwork, not one shape recoloured:
 *
 * · `hexagons` — three regular flat-top cells, hairline `#939393`. The upper
 *   cell carries a hatch and *no* outline. This is the services index and the
 *   service-detail pages.
 * · `cluster` — five *skewed* cells drawn in near-isometric perspective: one
 *   filled, three stroked (one of them faint), and one masked cell carrying a
 *   hatch, all inside a group at 56%. `/work` and the dark service heroes.
 *
 * The two cluster placements are the same drawing at two scales — the dark one
 * is 1.36727× the light one, and every anchor, stroke width and hatch period
 * below reproduces both to within 0.01 units of the exported paths. That is why
 * the cluster is expressed once as a shape plus a palette rather than twice as
 * ten hard-coded paths: the equivalence is a fact about the design, and writing
 * it out twice would let the two drift apart.
 */

export type HexFieldArt = "hexagons" | "cluster";

export function HeroHexField({
  tone = "light",
  art = "hexagons",
  className,
}: {
  tone?: "light" | "dark";
  /** Which of the design's two drawings this hero carries. */
  art?: HexFieldArt;
  className?: string;
}) {
  const id = useId();

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
      {art === "cluster" ? (
        <HexCluster id={id} palette={tone === "dark" ? DARK : LIGHT} />
      ) : (
        <RegularHexagons id={id} />
      )}
    </svg>
  );
}

/* ------------------------------------------------- three regular hexagons */

/** Hexagon group origin on the frame, solved from the two outlined cells. */
const HEXAGONS_ORIGIN = "translate(937.7 84.3)";

const HEXAGONS_HATCHED =
  "M502.661 119.97L433.613 239.533H295.518L226.47 119.97L295.518 0.406869H433.613L502.661 119.97Z";
const HEXAGONS_OUTLINED = [
  "M276.661 248.97L207.613 368.533H69.5176L0.469842 248.97L69.5176 129.407H207.613L276.661 248.97Z",
  "M501.288 378.424L432.24 497.988H294.145L225.097 378.424L294.145 258.861H432.24L501.288 378.424Z",
];

/**
 * One deliberate departure from the source. Figma draws both the outlines and
 * the hatch as sub-pixel strokes (0.814 and 0.753) in `#939393`, and its
 * rasteriser resolves them to crisp 1px lines at about `#A1A1A1`. Chrome
 * instead spreads a 0.8px stroke across two rows at ~40% each, which rendered
 * the outlines at 237 against the design's 202 and made the hatch and the
 * outlines visibly different weights from each other. Both are therefore drawn
 * as a full 1px at the colour Figma actually produces — matching the design's
 * rendered output rather than its source widths, and keeping the three cells
 * the same colour as each other, which is how the design reads.
 *
 * The hatch is drawn thicker than nominal, and the number is empirical rather
 * than derived: at 1.7px its peak still sat at 79 against the outlines' 90,
 * because Chrome spreads a rotated stroke wider than linear scaling predicts.
 * The last 12% is paid in ink instead — nominally darker so that it *renders*
 * the same as the outlines beside it.
 */
const HEXAGONS_INK = "#A5A5A5";
const HEXAGONS_HATCH_INK = "#999999";

function RegularHexagons({ id }: { id: string }) {
  const hatchId = `${id}-hatch`;
  const clipId = `${id}-clip`;

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
          <line x1="0" y1="0" x2="0" y2="12.73" stroke={HEXAGONS_HATCH_INK} strokeWidth={1.7} />
        </pattern>
        <clipPath id={clipId}>
          <path d={HEXAGONS_HATCHED} transform={HEXAGONS_ORIGIN} />
        </clipPath>
      </defs>

      {/* The hatched cell is a mask in the design — it carries the fill and no
          stroke, which is what keeps it reading as texture rather than a third
          outlined hexagon. */}
      <g clipPath={`url(#${clipId})`}>
        <path d={HEXAGONS_HATCHED} transform={HEXAGONS_ORIGIN} fill={`url(#${hatchId})`} />
      </g>

      <g transform={HEXAGONS_ORIGIN}>
        {HEXAGONS_OUTLINED.map((d) => (
          <path key={d} d={d} stroke={HEXAGONS_INK} strokeWidth={1} fill="none" />
        ))}
      </g>
    </>
  );
}

/* --------------------------------------------------- the skewed hex cluster */

/**
 * The cluster's cell, as the six offsets that walk it, at the light field's
 * scale. Every one of the five cells is this shape translated — the design
 * draws it once and moves it, and so does this.
 */
const CELL: readonly (readonly [number, number])[] = [
  [0, 0],
  [-62.3515, 73.762],
  [9.633, 167.0432],
  [143.9685, 186.5622],
  [206.3201, 112.8012],
  [134.3355, 19.5199],
];

/** Where each cell sits, relative to the front outlined one. */
const CELLS = {
  hatched: [214.506, 117.027],
  filled: [210.265, -58.9543],
  outlined: [0, 0],
  faint: [-3.627, 40.643],
  upper: [210.349, -100.8312],
} as const;

const CLUSTER_STROKE = 1.91964;

/**
 * The hatch, as the design draws it: thirty-one separate lines swept across the
 * masked cell, not a tiled `<pattern>`.
 *
 * That distinction is not pedantry. A pattern tile is rasterised once at the
 * tile's own size and then repeated, so a 1.34px line on a 12.27px tile lands
 * on a fractional grid and loses ink to resampling — the tiled version rendered
 * at 186 against the design's 151, a hatch visibly paler than the outlines it
 * sits beside. Drawn as real lines it is exact, and thirty-one of them cost
 * nothing.
 *
 * Every number is out of the exported line transforms. Figma applies the
 * matrix to the stroke as well as the geometry, which widens the nominal
 * 1.34374 to 1.5176 perpendicular to the line — that scaling is why the design
 * renders its hatch at the same weight as its 1.92 outlines.
 */
const HATCH = {
  count: 31,
  /** First line's start, relative to the cluster's anchor. */
  start: [369.652, 441.8] as const,
  /** Along the line, from start to end. */
  run: [198.08, -235.416] as const,
  /** From one line to the next. Perpendicular period 12.27, at 40.07°. */
  step: [-10.805, -6.2132] as const,
  stroke: 1.5176,
};

type ClusterPalette = {
  /** Multiplies every length: the dark hero draws the same art 1.36727× up. */
  scale: number;
  /** Frame position of the front outlined cell's first vertex. */
  anchor: readonly [number, number];
  ink: string;
  /** The design draws the rearmost cell in its own, lighter ink — not the
      outline ink faded — so it is a separate value rather than an opacity. */
  faintInk: string;
  faintOpacity: number;
  fill: string;
  fillOpacity: number;
  hatchInk: string;
};

/** `/work`: dark ink on the white band, with the accent showing through at 20%. */
const LIGHT: ClusterPalette = {
  scale: 1,
  anchor: [904.442, 163.952],
  ink: "#393939",
  faintInk: "#939393",
  faintOpacity: 0.4,
  fill: "#5B45F5",
  fillOpacity: 0.2,
  hatchInk: "#393939",
};

/** The four service-detail heroes: the same drawing in white on the ramp. */
const DARK: ClusterPalette = {
  scale: 1.36727,
  anchor: [921.157, 169.943],
  ink: "#FFFFFF",
  faintInk: "#FFFFFF",
  faintOpacity: 0.4,
  fill: "#FFFFFF",
  fillOpacity: 0.2,
  hatchInk: "#FFFFFF",
};

/** The cell as an SVG path, placed at `offset` and scaled about the anchor. */
function cellPath(
  [ax, ay]: readonly [number, number],
  [ox, oy]: readonly [number, number],
  scale: number,
): string {
  const points = CELL.map(
    ([x, y]) => `${round(ax + (ox + x) * scale)} ${round(ay + (oy + y) * scale)}`,
  );
  return `M${points.join("L")}Z`;
}

/** Six decimals is well past what a 1440-wide frame can resolve. */
function round(n: number): number {
  return Math.round(n * 1e4) / 1e4;
}

function HexCluster({ id, palette }: { id: string; palette: ClusterPalette }) {
  const clipId = `${id}-clip`;
  const { scale, anchor, ink, fill, fillOpacity, faintInk, faintOpacity, hatchInk } =
    palette;

  const path = (offset: readonly [number, number]) => cellPath(anchor, offset, scale);
  const stroke = CLUSTER_STROKE * scale;

  const hatch = Array.from({ length: HATCH.count }, (_, i) => {
    const x = anchor[0] + (HATCH.start[0] + HATCH.step[0] * i) * scale;
    const y = anchor[1] + (HATCH.start[1] + HATCH.step[1] * i) * scale;
    return {
      x1: round(x),
      y1: round(y),
      x2: round(x + HATCH.run[0] * scale),
      y2: round(y + HATCH.run[1] * scale),
    };
  });

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <path d={path(CELLS.hatched)} />
        </clipPath>
      </defs>

      {/* The design groups the whole cluster at 56% rather than fading each
          shape, so the relative weights inside it stay as drawn. */}
      <g opacity="0.56">
        {/* The hatched cell is a mask in the design: it carries the lines and
            no outline of its own. */}
        <g
          clipPath={`url(#${clipId})`}
          stroke={hatchInk}
          strokeWidth={round(HATCH.stroke * scale)}
        >
          {hatch.map((line) => (
            <line key={line.x1} {...line} />
          ))}
        </g>
        <path d={path(CELLS.filled)} fill={fill} fillOpacity={fillOpacity} />
        <path d={path(CELLS.outlined)} stroke={ink} strokeWidth={stroke} fill="none" />
        <path
          d={path(CELLS.faint)}
          stroke={faintInk}
          strokeOpacity={faintOpacity}
          strokeWidth={stroke}
          fill="none"
        />
        <path d={path(CELLS.upper)} stroke={ink} strokeWidth={stroke} fill="none" />
      </g>
    </>
  );
}
