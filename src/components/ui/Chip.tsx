import { cn } from "@/lib/cn";

/**
 * The design's pill. Three sizes, all fully rounded mono uppercase:
 *
 * · `tag` — 45px tall on 32px of padding, the stack section's technology names.
 *   On the design's 390 frames it steps down to the `stack` shape, which is what
 *   lets a whole group's chips run in one line rather than wrapping to four.
 * · `filter` — 34px tall, the work carousel's category switches. Its 94px of
 *   horizontal padding is measured, not a guess: every filter pill in the
 *   design is exactly its label plus 188px. It steps down below `lg`, where
 *   94px each side would leave almost no room for the label.
 * · `stack` — 34px tall on 24px of padding, the service cards' technology
 *   names. Same height as `filter` but sized to its label: every stack pill in
 *   the design measures exactly its 14px mono label plus 48px.
 *
 * `active` inverts to the ink surface. Rendered as a `<span>`; the carousel
 * wraps it in the button that owns the behaviour.
 */
export function Chip({
  children,
  size = "tag",
  tone = "light",
  active = false,
  className,
}: {
  children: React.ReactNode;
  size?: "tag" | "filter" | "stack";
  /**
   * `dark` is the case study's spec panel: a `grey-600` fill under `base-2`
   * text. A prop rather than a passed class because `cn` is a plain join, so an
   * incoming `bg-*` would not reliably beat the one set here.
   */
  tone?: "light" | "dark";
  active?: boolean;
  className?: string;
}) {
  const shape =
    size === "tag"
      ? "h-[34px] pl-6 pr-[calc(1.5rem-0.966px)] text-caption md:h-[45px] md:px-8 md:text-tag"
      : size === "stack"
        /* CSS puts a tracking unit after the *last* glyph; Figma does not. Left
           unpaid, that one pixel per pill pushed the fourth chip onto a second
           row. The right padding gives it back so the pill measures exactly the
           design's label + 48. */
        ? "h-[34px] pl-6 pr-[calc(1.5rem-0.966px)] text-caption"
        : "h-[34px] px-8 text-caption md:px-14 lg:px-[5.875rem]";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-mono uppercase",
        "transition-colors duration-300 ease-in-out",
        shape,
        tone === "dark"
          ? "bg-grey-600 text-base-2"
          : active
            ? "bg-contrast text-base-2"
            : "bg-base-2 text-contrast",
        className,
      )}
    >
      {children}
    </span>
  );
}
