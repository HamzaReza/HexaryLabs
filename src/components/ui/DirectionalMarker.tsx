import { cn } from "@/lib/cn";

type Direction = "right" | "down" | "left" | "up";

const rotations: Record<Direction, string> = {
  right: "",
  down: "rotate-90",
  left: "rotate-180",
  up: "-rotate-90",
};

interface DirectionalMarkerProps {
  direction?: Direction;
  className?: string;
}

export function DirectionalMarker({
  direction = "right",
  className,
}: DirectionalMarkerProps) {
  return (
    <svg
      viewBox="0 0 24 12"
      aria-hidden="true"
      className={cn("h-3 w-6 shrink-0", rotations[direction], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="square"
    >
      <line x1="1" y1="6" x2="21" y2="6" />
      <path d="M16 1.5 L21 6 L16 10.5" />
    </svg>
  );
}
