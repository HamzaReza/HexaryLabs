import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { getServices } from "@/lib/data";

/**
 * Our Services: a flat 2 × 2 grid on the dark gradient.
 *
 * This replaces `ServicesExplorer`, the click-to-expand accordion that revealed
 * a related project, an interface preview, a hex diagram, a proof line and a
 * technology list per service. The approved design has none of that — four
 * cards, each a numeral, a title, one line, and a link. The detail it used to
 * surface all still exists, on `/services` and the four service pages, which is
 * where the design puts it.
 *
 * Measured off the 1440 × 664 frame: 634 × 189 cards on a 12px gap, 32px of
 * padding, an 80px numeral column with 24px to the copy. Card surfaces are 4%
 * white, so the section's gradient reads through them.
 *
 * The numerals are Light 300 at 56px and are decorative — they index the grid
 * visually and are already implied by reading order, so they are hidden from
 * assistive technology rather than announced as content.
 */
export async function ServicesSection() {
  const services = await getServices();

  return (
    <section
      data-tone="dark"
      className="surface-dark pb-10 pt-8 text-white md:py-14 lg:pb-[100px] lg:pt-20"
    >
      <Container>
        <SectionHead
          title="Our Services"
          action={{ label: "See all Services", href: "/services" }}
          className="mb-12"
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {services.map((service, i) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full gap-6 bg-white/[0.04] p-8 transition-colors duration-300 hover:bg-white/[0.08]"
              >
                {/* Fixed 80px column, so the copy starts on the design's
                    136px line whatever the numeral is. */}
                <span
                  aria-hidden="true"
                  className="w-20 shrink-0 font-display text-numeral font-light leading-none text-grey-600"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="flex-1">
                  <span className="block font-display text-card font-medium text-white">
                    {service.title}
                  </span>
                  <span className="mt-2 block text-body text-grey-300">
                    {service.summary}
                  </span>
                  <span className="mt-4 inline-flex h-[46px] items-center gap-[14px] font-display text-body font-medium text-accent-hi transition-colors duration-300 group-hover:text-white">
                    Learn more
                    <ArrowIcon className="size-4 shrink-0" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
