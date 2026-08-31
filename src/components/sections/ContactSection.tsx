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
  className,
}: {
  /** Defaults to the closer headline; `/contact` passes the page headline. */
  heading?: string;
  className?: string;
}) {
  const contact = await getContactCta();

  return (
    <Section tone="dark" className={className}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.494fr] lg:gap-12">
          <Reveal className="flex flex-col">
            <h2
              className={cn(
                "text-[2.125rem] uppercase leading-[1.2] tracking-[0.02em]",
                "md:text-[3rem] lg:text-h1",
                /* The headline is a left-to-right light-to-mid grey ramp in the
                   design, painted through the glyphs. Falls back to a flat
                   colour where forced colours are in effect. */
                "bg-gradient-to-r from-grey-300 to-grey-500 bg-clip-text text-transparent",
                "forced-colors:bg-none forced-colors:text-white",
              )}
            >
              {heading ?? contact.closerHeading}
            </h2>
            <p className="mt-6 text-body-lg text-grey-300">
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
