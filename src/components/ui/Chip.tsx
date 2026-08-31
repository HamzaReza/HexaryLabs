import { cn } from "@/lib/cn";

/**
 * The design's pill. Two sizes, both fully rounded mono uppercase:
 *
 * · `tag` — 45px tall on 32px of padding, the stack section's technology names.
 * · `filter` — 34px tall, the work carousel's category switches. Its 94px of
 *   horizontal padding is measured, not a guess: every filter pill in the
 *   design is exactly its label plus 188px. It steps down below `lg`, where
 *   94px each side would leave almost no room for the label.
 *
 * `active` inverts to the ink surface. Rendered as a `<span>`; the carousel
 * wraps it in the button that owns the behaviour.
 */
export function Chip({
  children,
  size = "tag",
  active = false,
  className,
}: {
  children: React.ReactNode;
  size?: "tag" | "filter";
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-mono uppercase",
        "transition-colors duration-300 ease-in-out",
        size === "tag"
          ? "h-[45px] px-8 text-tag"
          : "h-[34px] px-8 text-caption md:px-14 lg:px-[5.875rem]",
        active ? "bg-contrast text-base-2" : "bg-base-2 text-contrast",
        className,
      )}
    >
      {children}
    </span>
  );
}
