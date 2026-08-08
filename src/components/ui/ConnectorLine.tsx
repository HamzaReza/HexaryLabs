import { cn } from "@/lib/cn";

type Orientation = "h" | "v";
type CrosshairPosition = "none" | "start" | "end" | "both";

interface ConnectorLineProps {
  orientation?: Orientation;
  length?: number;
  arrow?: boolean;
  crosshair?: CrosshairPosition;
  className?: string;
}

function Crosshair({ x, y }: { x: number; y: number }) {
  return (
    <>
      <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
      <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
    </>
  );
}

export function ConnectorLine({
  orientation = "h",
  length = 64,
  arrow = false,
  crosshair = "none",
  className,
}: ConnectorLineProps) {
  const thickness = 12;
  const horizontal = orientation === "h";
  const width = horizontal ? length : thickness;
  const height = horizontal ? thickness : length;
  const mid = thickness / 2;
  const lineEnd = arrow ? length - 6 : length - 1;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className={cn("shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.8}
      strokeLinecap="square"
    >
      <g transform={horizontal ? undefined : `rotate(90 ${mid} ${mid})`}>
        <line x1={1} y1={mid} x2={lineEnd} y2={mid} />
        {arrow ? (
          <path
            d={`M${length - 6} ${mid - 4} L${length - 1} ${mid} L${length - 6} ${mid + 4}`}
            strokeWidth={1.2}
          />
        ) : null}
        {crosshair === "start" || crosshair === "both" ? (
          <Crosshair x={1} y={mid} />
        ) : null}
        {crosshair === "end" || crosshair === "both" ? (
          <Crosshair x={length - 1} y={mid} />
        ) : null}
      </g>
    </svg>
  );
}
