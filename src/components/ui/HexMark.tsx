import { cn } from "@/lib/cn";

/**
 * The wordmark's hexagon — an outer ring with a solid core — at the size the
 * design sets it inline: 26.661 × 26.
 *
 * The design uses one glyph in two places, and they are the same two vectors:
 * beside the figure in a case-study stat callout, and above each principle on
 * the About page. It lives here rather than in either of them so the two cannot
 * drift apart.
 *
 * Both fills are `currentColor`, so the caller sets the colour once on the
 * element. The design draws it in `accent-hi` in both places.
 */
export function HexMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 26.6609 26"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-[26px] w-[26.661px] shrink-0", className)}
    >
      <path
        d="M8.91519 13.2797L11.816 8.23011H17.6177L20.5185 13.2797L17.6177 18.3293H11.816L8.91519 13.2797Z"
        fill="currentColor"
      />
      <path
        d="M20.3103 0.00200927C21.4189 0.0390525 22.4339 0.644344 22.992 1.60876L26.6609 7.9507H21.696L19.5829 4.29784H9.4984L4.46383 13L9.4984 21.7022H19.5829L21.696 18.0493H26.6609L22.992 24.3912L22.9371 24.483C22.3689 25.3939 21.3833 25.9621 20.3103 25.998L20.2025 26H8.87887C7.76436 26 6.73146 25.4243 6.14425 24.483L6.08933 24.3912L0.433224 14.6141C-0.144408 13.6156 -0.144408 12.3844 0.433224 11.3859L6.08933 1.60876C6.66548 0.613153 7.72856 4.55985e-05 8.87887 0H20.2025L20.3103 0.00200927Z"
        fill="currentColor"
      />
    </svg>
  );
}
