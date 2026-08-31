import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HexWatermark } from "@/components/visuals/HexWatermark";
import { getHomeHero } from "@/lib/data";

/**
 * The homepage hero, per the approved design.
 *
 * Its structure is a headline block and a baseline row, not a two-column split:
 * an ALL-CAPS headline set in two inks across the top, then the subhead and the
 * two actions sharing one line at the bottom — copy at the left edge, buttons
 * at the right. The hatched hexagon sits behind the headline's right end rather
 * than in a column of its own, which is why it is positioned rather than laid
 * out.
 *
 * Measured off the design's 1440 × 605 frame: 163px of air above the headline,
 * a 900px measure for it, 38px down to the baseline row, 64px below. The
 * watermark is 383 × 374 with its right edge on the 80px gutter.
 *
 * The surface is the design's one warm gradient — white at the header, #ecebe1
 * at the fold. It is also the only place the previous build's beige survives,
 * and it is why the page reads warm at the top and neutral from the stats band
 * down.
 */
export async function Hero() {
  const hero = await getHomeHero();
  const [primary, secondary] = hero.actions;

  return (
    <section className="surface-hero relative overflow-hidden">
      <Container className="relative">
        {/* Positioned, not laid out: the mark is allowed to sit under the
            headline's descenders, and it leaves the flow untouched so the
            headline keeps its full measure. Anchored to the content box, so its
            right edge lands on the same 80px gutter everything else does.
            Hidden below `lg`, where there is no room beside the text for it to
            be anything but noise. */}
        <HexWatermark
          className="pointer-events-none absolute right-0 top-[63px] h-[374px] w-[383px] max-lg:hidden"
        />

        <div className="relative pb-16 pt-16 md:pt-24 lg:pt-[163px]">
          <h1
            className={
              "max-w-[900px] text-[2.25rem] uppercase leading-[1.125] tracking-[0.0173em] md:text-[3rem] lg:text-display"
            }
          >
            {/* `lg:block` is what applies the design's hand-set breaks. Below
                that the runs stay inline and the headline wraps to whatever
                width it has. */}
            {hero.headline.lines.map((line, i) => (
              <span key={i} className="lg:block">
                {line.map((run) => (
                  <span
                    key={run.text}
                    className={
                      run.tone === "lead" ? "text-grey-600" : "text-contrast-2"
                    }
                  >
                    {run.text}{" "}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="mt-10 flex flex-col gap-8 lg:mt-[38px] lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <p className="max-w-[517px] text-lead text-grey-600">
              {hero.subhead.map((line) => (
                <span key={line} className="lg:block">
                  {line}{" "}
                </span>
              ))}
            </p>

            <div className="flex flex-wrap items-center gap-[10px]">
              <Button href={primary.href} variant="solid">
                {primary.label}
              </Button>
              {secondary && (
                <Button href={secondary.href} variant="outline">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
