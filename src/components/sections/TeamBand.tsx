import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HexMark } from "@/components/ui/HexMark";

/**
 * "A small, senior team, on purpose" — the three principles, the proof line,
 * and the full-bleed photograph that closes the band.
 *
 * Measured off the 1440 × 994 frame: 634 of content on 80 padding with 48
 * between its three rows, then 360 of photograph running the full width with no
 * gutter. The principles are equal thirds on a 24 gap, each a `#F1F1F1` panel
 * with the wordmark's hexagon above the copy.
 *
 * The proof line is set against a 2px accent rule on its left rather than in a
 * panel — the design marks it as testimony, not another card — and the button
 * sits on the same baseline at the far end of the row.
 */
export function TeamBand({
  heading,
  intro,
  principles,
  proofLine,
  cta,
  photo,
}: {
  heading: string;
  intro: string;
  principles: readonly { title: string; body: string }[];
  proofLine: string;
  cta: { label: string; href: string };
  photo: { src: string; alt: string };
}) {
  return (
    <section className="bg-base">
      <Container>
        <div className="flex flex-col gap-12 py-20">
          <div className="flex max-w-[746px] flex-col gap-6">
            <h2 className="font-display text-section font-medium uppercase tracking-[1.04px] text-contrast-2">
              {heading}
            </h2>
            <p className="text-lead font-medium text-grey-600">{intro}</p>
          </div>

          <ul className="flex flex-col gap-6 lg:flex-row">
            {principles.map((principle) => (
              <li
                key={principle.title}
                className="flex flex-1 flex-col gap-4 overflow-hidden bg-base-2 p-6"
              >
                <HexMark className="text-accent-hi" />
                <div className="flex flex-col gap-1">
                  <p className="text-lead font-medium text-contrast">
                    {principle.title}
                  </p>
                  <p className="text-body text-grey-600">{principle.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[728px] border-l-2 border-accent pl-6 text-body text-contrast">
              {proofLine}
            </p>
            <Button href={cta.href} variant="outline" className="w-fit shrink-0">
              {cta.label}
            </Button>
          </div>
        </div>
      </Container>

      {/* Full bleed, and outside the container: the design runs it edge to edge
          under the copy with no gutter of its own. */}
      <div className="relative h-[240px] w-full lg:h-[360px]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
