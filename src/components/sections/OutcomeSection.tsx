import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ChevronRun } from "@/components/visuals/ChevronRun";
import { getHomeOutcome } from "@/lib/data";

/**
 * "Software built by people who own the outcome" — a designed block that the
 * previous build did not have at all, in any form.
 *
 * A narrow left column carrying the chevron ornament, the heading and one
 * paragraph, against a wide system-architecture still. Measured off the
 * 1440 × 566 frame: a 413px column, 48px of gutter, an 819px plate. The plate
 * starts 124px higher than the text does, which is what gives the block its
 * off-axis feel; that offset is the composition, not a rounding error.
 *
 * Below `lg` the two stack and the diagram keeps its aspect ratio. It stays
 * legible because it is one image rather than a layout — it simply gets
 * smaller, and its content is carried by the `alt` text for anyone who cannot
 * see it.
 */
export async function OutcomeSection() {
  const outcome = await getHomeOutcome();

  return (
    <section className="bg-base py-14 lg:py-5">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[413fr_819fr] lg:gap-12">
          <div className="lg:my-[124px]">
            {/* Fixed 402px in the design's 413px column. Below that it scales
                rather than overflowing — a fixed height with `w-auto` pushed
                the document 27px wider than the viewport at 390. */}
            <ChevronRun count={24} head className="h-auto w-[402px] max-w-full" />

            <h2 className="mt-8 font-display text-section uppercase">
              {outcome.heading}
            </h2>

            <p className="mt-8 text-lead text-grey-600">{outcome.body}</p>
          </div>

          <Image
            src={outcome.diagram.src}
            alt={outcome.diagram.alt}
            width={outcome.diagram.width}
            height={outcome.diagram.height}
            sizes="(min-width: 1328px) 819px, (min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </Container>
    </section>
  );
}
