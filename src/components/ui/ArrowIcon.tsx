/**
 * The ↗ glyph used on every CTA. Inherits currentColor.
 *
 * The default box is 16 × 16 with the glyph occupying the middle 9.5 — so a
 * `size-4` arrow draws about 9px of ink inside 3.5px of air on each side. That
 * air is invisible but it is real spacing, and the approved design does not
 * have it: its buttons put a measured 14px between the label and the arrow's
 * ink, which the padded box turns into 17px and 6px of extra button width.
 *
 * `tight` crops the viewBox to the ink, so `size-*` then means the size you
 * see and the gap beside it is the gap you set. Used by the design's `solid`
 * and `outline` buttons; the untrimmed default is left alone for the pages
 * still on the previous build's controls.
 */
export function ArrowIcon({
  className,
  tight = false,
}: {
  className?: string;
  tight?: boolean;
}) {
  return (
    <svg
      viewBox={tight ? "3.25 3.25 9.5 9.5" : "0 0 16 16"}
      fill="none"
      aria-hidden="true"
      className={className ?? "size-4 shrink-0"}
    >
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
