import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { WorkCarousel, type WorkCarouselItem } from "@/components/sections/WorkCarousel";
import { getClientTags, getListedWork } from "@/lib/data";

/**
 * Our Work: a centred heading, a row of category chips, and a full-bleed
 * carousel of case studies.
 *
 * The previous build stacked three featured studies vertically as long
 * alternating rows. The design shows every listed study instead, one card each,
 * reachable by category — so this reads `getListedWork()` rather than
 * `getFeaturedWork()`, and the chips are the studies' own `category` values.
 * The design's six chips are exactly that list, in that order.
 *
 * The carousel is a client component because it holds a position; the pairing
 * of each study with its eyebrow happens here, on the server, so the client
 * receives finished items rather than reaching for content itself.
 */
export async function WorkSection() {
  const [studies, clientTags] = await Promise.all([getListedWork(), getClientTags()]);

  const items: WorkCarouselItem[] = studies.map((study) => ({
    study,
    /* `category · client`. The design also names the product in the third
       segment on the one in-house study; that repeats the card title directly
       beneath it, so it is left off. */
    eyebrow: `${study.category} · ${clientTags[study.slug] ?? study.client}`,
  }));

  return (
    <section className="bg-base pb-10 pt-8 md:py-14 lg:py-20">
      <Container>
        <SectionHead title="Our Work" align="center" className="mb-6 md:mb-12" />
      </Container>

      {/* Only the card track is full-bleed. The chip row is content, so it
          starts on the gutter like everything else and scrolls inside it. */}
      <WorkCarousel items={items} />

      {/* Desktop only. The design's 390 frame closes this band on the dot row
          and carries no "See Our Work" — `/work` is still one tap away in the
          header and the footer, but the loss of the in-band CTA on a phone is a
          real content change and is recorded as one. */}
      <Container className="max-md:hidden">
        <div className="mt-14 flex justify-center">
          <Button href="/work" variant="outline">
            See Our Work
          </Button>
        </div>
      </Container>
    </section>
  );
}
