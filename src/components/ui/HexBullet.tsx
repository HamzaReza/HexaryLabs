import { cn } from "@/lib/cn";

/**
 * The list marker on the work rows: a small pointy-top hexagon rather than a
 * disc, so the bullet carries the same shape as the logo and the page
 * ornaments.
 *
 * The path is the design's own `Polygon 15`, 10.392 × 12 — a regular hexagon,
 * since 12 × √3/2 = 10.392. Colour comes from `currentColor` so the row can
 * alternate it without this component knowing why.
 */
export function HexBullet({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10.3923 12"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn("h-3 w-[10.392px] shrink-0", className)}
    >
      <path d="M5.19615 0L10.3923 3V9L5.19615 12L0 9V3L5.19615 0Z" />
    </svg>
  );
}
