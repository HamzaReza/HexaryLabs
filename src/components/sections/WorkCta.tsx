import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ChevronRun } from "@/components/visuals/ChevronRun";

/**
 * The band that closes `/work`. The approved design keeps a call to action
 * here rather than the contact form every other page ends on, so this is the
 * one page that does not use `ContactSection`.
 *
 * Two columns on the design's 1280: a 634 headline column carrying the chevron
 * run beneath it, 16 of gutter, then a 630 column of copy over the button. The
 * narrow gutter is the design's, not a mistake — the two columns are read as
 * one sentence, so they sit closer than the page's usual rhythm.
 *
 * The chevrons are white on the `#F1F1F1` ground, which reads as a groove cut
 * into the surface rather than a mark drawn on it.
 */
export function WorkCta({
  heading,
  body,
  cta,
}: {
  heading: string;
  body: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="bg-base-2 py-20">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-4">
          <div className="lg:w-[634px] lg:shrink-0">
            {/* The design typesets the headline in 333 rather than the 634 the
                column gives it, so it breaks after "something" and sits two
                lines deep over the chevrons. Left to the full column it runs
                on one line and the block collapses. */}
            <h2 className="font-display text-section font-medium uppercase text-contrast-2 lg:max-w-[333px]">
              {heading}
            </h2>
            <ChevronRun
              count={24}
              head
              className="mt-8 h-auto w-[402px] max-w-full text-white"
            />
          </div>

          <div className="lg:w-[630px] lg:shrink-0">
            <p className="text-lead text-contrast">{body}</p>
            <Button href={cta.href} variant="solid" className="mt-6">
              {cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
