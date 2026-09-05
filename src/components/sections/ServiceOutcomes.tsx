import { Container } from "@/components/ui/Container";
import { HexLattice } from "@/components/visuals/HexLattice";

/**
 * "What you walk away with" — four cards on the honeycomb field, each led by an
 * oversized ghost numeral.
 *
 * The design's grid is four 305px cards on 20px gaps inside the 1280 column,
 * each 200 tall with 20px of padding, the numeral set 56/48 and the body 16/24
 * starting 84px down. The numeral is drawn low-contrast on purpose — it indexes
 * the card without competing with the sentence, which is why it is `aria-hidden`
 * rather than real list numbering.
 */
export function ServiceOutcomes({
  outcomes,
  proofLine,
}: {
  outcomes: readonly string[];
  proofLine?: string;
}) {
  return (
    <section
      data-tone="dark"
      className="relative isolate overflow-hidden bg-contrast-2 py-10 md:py-14 lg:pb-[100px] lg:pt-20"
    >
      <HexLattice className="pointer-events-none absolute inset-0 -z-10 size-full text-[var(--lattice-ink)]" />

      <Container>
        <h2 className="text-center text-section uppercase text-white">
          What you walk away with
        </h2>

        {/* 20 above the numeral, 16 to the sentence, 20 below, on a 20px gap —
            the design's 390 cards, which set the numeral on a 40px line rather
            than the 48 the 1440 cards use and pad 16 at the sides, not 20. */}
        <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome, i) => (
            <div
              key={outcome}
              className="rounded-xl bg-white/[0.04] px-4 py-5 sm:p-5 lg:min-h-[200px]"
            >
              <p
                aria-hidden
                className="font-display text-numeral font-normal leading-[40px] text-white/15 sm:leading-[48px]"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 text-body text-grey-200">{outcome}</p>
            </div>
          ))}
        </div>

        {proofLine && (
          <p className="mt-10 text-center text-body text-grey-400">{proofLine}</p>
        )}
      </Container>
    </section>
  );
}
