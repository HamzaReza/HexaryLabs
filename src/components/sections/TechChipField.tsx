import { HexLattice } from "@/components/visuals/HexLattice";
import { cn } from "@/lib/cn";

/**
 * The technology band: a centred claim over a honeycomb field, with the stack
 * named in chips scattered to either side of it.
 *
 * The previous build answered this section with two long prose blocks naming
 * every framework. The design makes the same point by showing rather than
 * listing — eight chips, drifting, some of them out of focus — so the reader
 * takes "a broad range" as an impression instead of reading an inventory.
 *
 * Positions are the design's own, given on the 1440 frame and expressed here as
 * percentages so they hold their relative placement as the viewport narrows.
 * Two chips deliberately bleed past the gutter, which is why the section clips.
 * Below `lg` the whole scatter is dropped rather than reflowed: overlapping
 * absolute chips have nowhere to go on a phone, and the heading carries the
 * section on its own.
 */

/**
 * `blurred` is the design's depth cue — the far chips are softened and slightly
 * transparent so the near ones read as forward. It is decorative only; every
 * chip is still real text.
 */
type Chip = {
  label: string;
  /** Percentage of the 1440 frame, from the left edge. */
  x: number;
  /** Pixels from the section's top edge, as the design sets them. */
  y: number;
  blur?: "near" | "far";
};

const CHIPS: readonly Chip[] = [
  { label: "Flux LoRA", x: 86 / 14.4, y: 41.5 },
  { label: "PostgreSQL", x: 222 / 14.4, y: 140.5, blur: "far" },
  { label: "Fastify (Node.js)", x: -30 / 14.4, y: 174.5, blur: "near" },
  { label: "Google Cloud Platform", x: 79 / 14.4, y: 282.5 },
  { label: "Laravel 12", x: 1278 / 14.4, y: 44, blur: "near" },
  { label: "Next.js", x: 1197 / 14.4, y: 96 },
  { label: "FastAPI (Python)", x: 1268 / 14.4, y: 230 },
  { label: "ComfyUI", x: 1127 / 14.4, y: 280, blur: "far" },
];

export function TechChipField({
  heading,
  intro,
}: {
  heading: string;
  intro: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-base-2 px-6 py-20 lg:py-[100px]">
      {/* #E0E0E0 on the #F1F1F1 ground — the field is barely there, and is
          meant to be. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ "--lattice-ink": "#e0e0e0" } as React.CSSProperties}
      >
        <HexLattice className="size-full" />
      </div>

      {CHIPS.map((chip) => (
        <p
          key={chip.label}
          aria-hidden
          className={cn(
            "pointer-events-none absolute hidden whitespace-nowrap rounded-[34px] px-6 py-2 lg:block",
            "font-mono text-caption uppercase tracking-[0.96px] text-contrast",
            chip.blur === "far"
              ? "bg-white/70 opacity-80"
              : chip.blur === "near"
                ? "bg-white opacity-80"
                : "bg-white",
          )}
          style={{
            left: `${chip.x}%`,
            top: chip.y,
            filter: chip.blur
              ? `blur(${chip.blur === "near" ? 1 : 1.95}px)`
              : undefined,
          }}
        >
          {chip.label}
        </p>
      ))}

      <div className="relative mx-auto flex max-w-[630px] flex-col gap-6 text-center">
        <h2 className="font-display text-section font-medium uppercase tracking-[1.04px] text-contrast-2">
          {heading}
        </h2>
        <p className="text-lead font-medium text-grey-600">{intro}</p>
      </div>

      {/* The scatter is `aria-hidden` — it is positioned decoration, and it is
          dropped entirely below `lg`, so it cannot be the only place these
          names exist. They are listed here instead, for assistive technology
          and for anything reading the page without styles. */}
      <ul className="sr-only">
        {CHIPS.map((chip) => (
          <li key={chip.label}>{chip.label}</li>
        ))}
      </ul>
    </section>
  );
}
