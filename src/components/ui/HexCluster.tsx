import { useId } from "react";
import { cn } from "@/lib/cn";

export type { HexRole } from "@/lib/ui/constants";
import type { HexRole } from "@/lib/ui/constants";

export interface HexCell {
  q: number;
  r: number;
  role?: HexRole;
  label?: string;
}

interface HexClusterProps {
  cells: HexCell[];
  label?: string;
  className?: string;
}

const HEX_SIZE = 48;
const HEX_W = HEX_SIZE;
const HEX_H = HEX_SIZE * Math.sqrt(3) * 0.5;

const roleClasses: Record<HexRole, string> = {
  outline: "fill-none stroke-grey-300 [[data-tone=dark]_&]:stroke-grey-700",
  ink: "fill-contrast [[data-tone=dark]_&]:fill-base",
  signal: "fill-accent",
  textured: "stroke-grey-300 [[data-tone=dark]_&]:stroke-grey-700",
};

const labelClasses: Record<HexRole, string> = {
  outline: "fill-contrast [[data-tone=dark]_&]:fill-base",
  ink: "fill-base [[data-tone=dark]_&]:fill-contrast",
  signal: "fill-white",
  textured: "fill-contrast [[data-tone=dark]_&]:fill-base",
};

const center = (cell: HexCell) => ({
  x: 1.5 * HEX_SIZE * cell.q,
  y: Math.sqrt(3) * HEX_SIZE * (cell.r + cell.q / 2),
});

/* Cells snap to a shared-edge flat-top lattice in axial (q, r) coordinates —
   no floating hexes. At most one `signal` cell per composition (§4.3). */
export function HexCluster({ cells, label, className }: HexClusterProps) {
  const id = useId();
  const hexId = `${id}-hex`;
  const dotsId = `${id}-dots`;

  const centers = cells.map(center);
  const minX = Math.min(...centers.map((c) => c.x)) - HEX_W - 1;
  const maxX = Math.max(...centers.map((c) => c.x)) + HEX_W + 1;
  const minY = Math.min(...centers.map((c) => c.y)) - HEX_H - 1;
  const maxY = Math.max(...centers.map((c) => c.y)) + HEX_H + 1;

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      width={maxX - minX}
      height={maxY - minY}
      className={cn("shrink-0", className)}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <defs>
        <polygon
          id={hexId}
          points={`${HEX_W},0 ${HEX_W / 2},${HEX_H} ${-HEX_W / 2},${HEX_H} ${-HEX_W},0 ${-HEX_W / 2},${-HEX_H} ${HEX_W / 2},${-HEX_H}`}
        />
        <pattern id={dotsId} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1.5" fill="var(--texture-ink)" />
        </pattern>
      </defs>

      {cells.map((cell) => {
        const { x, y } = center(cell);
        const role = cell.role ?? "outline";
        return (
          <g key={`${cell.q},${cell.r}`} transform={`translate(${x} ${y})`}>
            <use
              href={`#${hexId}`}
              strokeWidth={0.8}
              fill={role === "textured" ? `url(#${dotsId})` : undefined}
              className={roleClasses[role]}
            />
            {cell.label ? (
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={12}
                className={cn("font-mono uppercase", labelClasses[role])}
              >
                {cell.label}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
