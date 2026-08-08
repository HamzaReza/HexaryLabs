import { useId } from "react";
import { ClippedPanel } from "@/components/ui/ClippedPanel";

const S = 48;
const H = S * Math.sqrt(3) * 0.5;

type Role = "outline" | "ink" | "signal" | "textured";

const CELLS: { q: number; r: number; role: Role }[] = [
  { q: 0, r: 0, role: "ink" },
  { q: 1, r: -1, role: "outline" },
  { q: 1, r: 0, role: "signal" },
  { q: 0, r: 1, role: "outline" },
  { q: -1, r: 1, role: "textured" },
  { q: -1, r: 0, role: "outline" },
  { q: 2, r: -1, role: "textured" },
  { q: 2, r: 0, role: "outline" },
];

const STEP_MS = 120;
const roleClass: Record<Role, string> = {
  outline: "fill-none stroke-grey-300",
  ink: "fill-contrast",
  signal: "fill-accent",
  textured: "stroke-grey-300",
};

const center = (q: number, r: number) => ({
  x: 1.5 * S * q,
  y: Math.sqrt(3) * S * (r + q / 2),
});

/* The homepage hero visual: a system being assembled on a dotted blueprint
   surface. Plays once on load (5.1-c) — reduced motion shows the finished
   assembly via the .hexa-* overrides in globals.css. */
export function HexAssembly() {
  const id = useId();
  const hexId = `${id}-hex`;
  const dotsId = `${id}-dots`;

  return (
    <ClippedPanel clip="lg" bordered className="texture-dots bg-base p-4 sm:p-6">
      <svg
        viewBox="-150 -110 384 302"
        role="img"
        aria-label="Modular hexagonal system diagram assembling itself: outlined, filled, and textured modules connecting into one structure"
        className="h-auto w-full"
      >
        <defs>
          <polygon
            id={hexId}
            points={`${S},0 ${S / 2},${H} ${-S / 2},${H} ${-S},0 ${-S / 2},${-H} ${S / 2},${-H}`}
          />
          <pattern id={dotsId} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.5" fill="var(--texture-ink)" />
          </pattern>
        </defs>

        {CELLS.map((cell, i) => {
          const { x, y } = center(cell.q, cell.r);
          return (
            <use
              key={`${cell.q},${cell.r}`}
              href={`#${hexId}`}
              transform={`translate(${x} ${y})`}
              strokeWidth={0.8}
              fill={cell.role === "textured" ? `url(#${dotsId})` : undefined}
              className={`hexa-cell ${roleClass[cell.role]}`}
              style={{ "--hexa-delay": `${i * STEP_MS}ms` } as React.CSSProperties}
            />
          );
        })}

        <g
          className="stroke-grey-500"
          fill="none"
          strokeWidth={0.8}
          strokeLinecap="square"
        >
          <path
            d="M -120 -62 L -96 -62 L -84 -41.5"
            className="hexa-line"
            style={
              {
                "--hexa-delay": "960ms",
                "--draw-length": 60,
              } as React.CSSProperties
            }
          />
          <path
            d="M 192 41.5 L 168 41.5 L 156 62"
            className="hexa-line"
            style={
              {
                "--hexa-delay": "1080ms",
                "--draw-length": 60,
              } as React.CSSProperties
            }
          />
        </g>

        <text
          x="188"
          y="-88"
          textAnchor="end"
          fontSize="11"
          letterSpacing="1.5"
          className="hexa-note fill-grey-600 font-mono uppercase"
          style={{ "--hexa-delay": "1200ms" } as React.CSSProperties}
        >
          Hexary — 001
        </text>
      </svg>
    </ClippedPanel>
  );
}
