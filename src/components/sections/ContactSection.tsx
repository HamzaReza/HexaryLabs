import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { HexWatermark } from "@/components/visuals/HexWatermark";
import { getContactCta } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * The page closer of the approved design: an oversized uppercase headline over
 * a two-line promise on the left, the whole enquiry form on the right. It ends
 * the home, services, service-detail, about and case-study pages, and is the
 * entirety of `/contact` — only the headline differs, which is why both live in
 * `src/content/site.ts` rather than at each call site.
 *
 * Grid measured from the design's Contact frame: a 494px column, a 48px gutter
 * and a 738px panel inside 1280px of content — 1 : 1.494 with a 48px gap.
 */
export async function ContactSection({
  heading,
  pageHeadline = false,
  className,
}: {
  /** Defaults to the closer headline; `/contact` passes the page headline. */
  heading?: string;
  /**
   * `/contact` sets its headline a step smaller than the closer's.
   *
   * That is the design's own choice, not an inconsistency to normalise: its 390
   * frames set "LET'S TALK" at 54 on a 69px line, one line, and "LET'S GET
   * STARTED." at 40 on 51, over two — 38px and 28px of measured cap ink against
   * a 0.70em cap height. Every closer on the site is the 54; the contact page
   * alone is the 40.
   */
  pageHeadline?: boolean;
  className?: string;
}) {
  const contact = await getContactCta();

  return (
    <Section tone="dark" className={className}>
      <Container>
        {/* 32 from the copy to the form at 390, per the design's frames. */}
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1.494fr] lg:gap-12">
          <Reveal className="flex flex-col">
            <h2
              className={cn(
                pageHeadline
                  ? "text-[2.5rem] leading-[1.275]"
                  : "text-[3.375rem] leading-[1.2778]",
                "uppercase tracking-[0.02em]",
                "md:text-[3rem] md:leading-[1.2] lg:text-h1",
                /* The headline is a left-to-right light-to-mid grey ramp in the
                   design, painted through the glyphs. Falls back to a flat
                   colour where forced colours are in effect. */
                "bg-gradient-to-r from-grey-300 to-grey-500 bg-clip-text text-transparent",
                "forced-colors:bg-none forced-colors:text-white",
              )}
            >
              {heading ?? contact.closerHeading}
            </h2>
            {/* 16/26 at mobile — the design sets the subtitle a step below the
                lead it uses from `md` up, which is what keeps both authored
                lines to one line each at 350 wide. */}
            <p className="mt-6 text-[1rem] leading-[1.625] text-grey-300 md:text-body-lg md:leading-[1.4]">
              {contact.subtitle.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            {/* The design fills the rest of the left column with the hatched
                hexagon, its bottom edge on the form panel's. `mt-auto` is what
                pins it there, so it holds however tall the form gets. Dropped
                below `lg`, where the column is no longer beside anything and
                the mark would only push the form down the page. */}
            <HexWatermark className="mt-auto w-full max-lg:hidden" />
          </Reveal>

          <Reveal delay={120}>
            <ContactForm
              submitLabel={contact.submitLabel}
              submitPendingLabel={contact.submitPendingLabel}
              successHeading={contact.successHeading}
              successBody={contact.successBody}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
