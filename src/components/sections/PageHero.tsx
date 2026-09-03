import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroHexField, type HexFieldArt } from "@/components/visuals/HeroHexField";
import { cn } from "@/lib/cn";

/**
 * The design masks the dot field with a vertical 0 → 1 ramp over a box that
 * starts 152px above the frame and ends 218px below it, so inside the hero the
 * dots run from 16.7% to 76%. It is not a flat wash, and without the ramp the
 * top of the field is visibly too heavy.
 */
const DOT_MASK =
  "linear-gradient(180deg, rgba(0,0,0,0.167) 0%, rgba(0,0,0,0.76) 100%)";

/**
 * The inner-page hero, measured off the Services and service-detail frames.
 *
 * Geometry the design repeats on both: a 540px band whose content is anchored
 * to the *bottom*, 64px clear of the edge, in a 738px column on the 80px
 * gutter. Every gap in the stack is 24px, so the block grows upward as the
 * headline takes more lines — 335px tall at three lines, 287px at two, both
 * ending on the same baseline. That is why this is `justify-end` on a fixed
 * height rather than symmetric padding: the bottom edge is the fixed point.
 *
 * Type is Space Grotesk Medium 40/48 with +1.04px, read off the Figma type
 * panel rather than inferred — `text-page-title`. Phase 1 had this at 64px,
 * which was the homepage's display step borrowed for want of a measurement.
 *
 * Two tones. `light` is white under the dot field; `dark` is the horizontal
 * #484848 → #A8A8A8 ramp the four service pages open on. `data-tone="dark"`
 * re-colours the button through the rules already in `Button`.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  cta,
  tone = "light",
  art,
  aside,
  titleClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  cta?: { label: string; href: string };
  tone?: "light" | "dark";
  /**
   * Which hexagon drawing the hero carries. The tone does not decide it: the
   * services pages open on three regular cells and `/work` opens on the skewed
   * cluster, both on the same white band. Defaults to the cluster on dark,
   * because that is the only artwork the design puts on the ramp.
   */
  art?: HexFieldArt;
  /**
   * Content set against the right gutter, sharing the copy block's bottom
   * edge. About puts its three figures here, in the space the other heroes
   * give to the hexagons — which is why `art` and this are separate: the
   * design swaps one for the other rather than stacking them.
   */
  aside?: React.ReactNode;
  /** Where the headline is allowed to wrap, when the design sets a box for it
      rather than hand-breaking the lines — the service pages typeset theirs in
      630px. */
  titleClassName?: string;
}) {
  const dark = tone === "dark";

  return (
    <section
      data-tone={dark ? "dark" : undefined}
      className={cn(
        "relative isolate overflow-hidden",
        "flex flex-col justify-end pb-14 pt-12 lg:min-h-[540px] lg:pb-16 lg:pt-0",
        dark ? "bg-hero-ramp" : "border-b border-grey-200 bg-base",
      )}
    >
      {/* The dot field runs the full bleed under everything, including the
          hexagons — in the design the dots read through the outlines.

          It is not a flat wash: the design masks it with a vertical gradient
          that runs 0 → 1 over a box reaching 152px above the frame and 218px
          below it, so within the hero the dots ramp from 17% to 76%. Without
          the mask the top of the field is noticeably too heavy. */}
      <div
        aria-hidden
        className="texture-dots pointer-events-none absolute inset-0 -z-10"
        style={
          {
            /* The hero's own dot ink, solved from the render rather than
               inherited. The sitewide `--texture-ink` is three times lighter
               than this, which left the field almost invisible here. Solving
               the ramp at top and bottom independently gives the same answer —
               #CACACA on light, white at 19% on dark — which is what confirms
               the mask below is the right shape. Overridden locally so the
               homepage's field, which has not been measured against its own
               frame, is left exactly as approved. */
            "--texture-ink": dark
              ? "rgba(255,255,255,0.19)"
              : "rgba(23,23,23,0.228)",
            maskImage: DOT_MASK,
            WebkitMaskImage: DOT_MASK,
          } as React.CSSProperties
        }
      />
      <HeroHexField tone={tone} art={art ?? (dark ? "cluster" : "hexagons")} />

      <Container>
        {/* The copy and the aside share a bottom edge — in the design both
            blocks end 64 above the band's foot, whatever height they are. */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-[738px]">
          {eyebrow && (
            <p
              className={cn(
                "text-tag uppercase",
                dark ? "text-grey-300" : "text-grey-600",
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "mt-6 uppercase text-[2rem] leading-[1.2] tracking-[0.026em]",
              "md:text-[2.25rem] lg:text-page-title",
              dark ? "text-white" : "text-contrast-2",
              titleClassName,
            )}
          >
            {title}
          </h1>
          {intro && (
            <p
              className={cn(
                "mt-6 text-lead",
                dark ? "text-grey-300" : "text-grey-600",
              )}
            >
              {intro}
            </p>
          )}
          {cta && (
            <div className="mt-6">
              <Button href={cta.href} variant="outline">
                {cta.label}
              </Button>
            </div>
          )}
        </div>

          {aside && <div className="lg:shrink-0">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}

/**
 * A headline whose line breaks are the designer's, not the browser's.
 *
 * Both hero frames typeset their headline in a box sized to its own widest
 * line — 521px on the index, 630px on the service pages — so a single shared
 * `max-width` cannot reproduce both. Below `lg` the lines run together and wrap
 * naturally, which is what the mobile frames show.
 */
export function HeadlineLines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className="lg:block">
          {line}
          {i < lines.length - 1 && <span className="lg:hidden"> </span>}
        </span>
      ))}
    </>
  );
}
