import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * The honeycomb field behind the stats band.
 *
 * Geometry is the design's own cell vector, not an inference from its layer
 * boxes: a regular flat-top hexagon of side 47.94 — 95.88 wide, 83.43 tall —
 * on a 77.58px column pitch, with alternate columns dropped half a row. That
 * pitch is about 7.5% wider than a touching honeycomb of this size would need,
 * so the cells sit just apart rather than sharing edges. The gap is small
 * enough to read as a honeycomb and is the reason the field looks woven rather
 * than solid.
 *
 * (An earlier version of this took the 173 × 172 layer box in the design's
 * metadata to be one hexagon. It is three, and hexagons drawn at that size on
 * that pitch overlap into a field of stars. Worth stating: the layer box was
 * not wrong, it just wasn't a cell.)
 *
 * One SVG pattern rather than a CSS background, because gradients cannot draw
 * a hexagon. The tile is a full period in both axes and the cell is instanced
 * around its edges, since SVG patterns clip to their tile — without the
 * wrapped copies the field would be full of cut-off hexagons.
 */

/** Flat-top regular hexagon, side 47.94, drawn about its own centre. */
const HEX = "M-47.94 0 L-23.97 -41.71 H23.97 L47.94 0 L23.97 41.71 H-23.97 Z";

const COLUMN_PITCH = 77.58;
const ROW_PITCH = 89.06;

export function HexLattice({ className }: { className?: string }) {
  const id = useId();
  const cell = `${id}-cell`;

  /* Two columns and two rows make one full period; the -1 and +1 copies cover
     the cells that straddle a tile edge. */
  const centres: [number, number][] = [];
  for (let column = -1; column <= 2; column++) {
    for (let row = -1; row <= 2; row++) {
      centres.push([
        column * COLUMN_PITCH,
        row * ROW_PITCH + (Math.abs(column % 2) === 1 ? ROW_PITCH / 2 : 0),
      ]);
    }
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn("text-[color:var(--lattice-ink)]", className)}
    >
      <defs>
        <path id={cell} d={HEX} />
        <pattern
          id={id}
          width={COLUMN_PITCH * 2}
          height={ROW_PITCH}
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.08">
            {centres.map(([x, y]) => (
              <use key={`${x}-${y}`} href={`#${cell}`} x={x} y={y} />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
