import { Container } from "@/components/ui/Container";
import { HexLattice } from "@/components/visuals/HexLattice";
import { cn } from "@/lib/cn";

/**
 * "What you walk away with" — outcome cards on the honeycomb field, each led
 * by an oversized ghost numeral.
 *
 * Column count follows `outcomes.length` so a three-card service fills the
 * row (Design) instead of leaving an empty fourth slot under a hard-coded
 * `lg:grid-cols-4`. Cards stretch equally across the 1280 with a 20px gutter;
 * each is padded 20 with the numeral set 56/48 and the body 16px below it.
 */
export function ServiceOutcomes({
  outcomes,
  proofLine,
}: {
  outcomes: readonly string[];
  proofLine?: string;
}) {
  const count = outcomes.length;
  const desktopCols =
    count === 3
      ? "lg:grid-cols-3"
      : count === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-4";

  return (
    <section
      data-tone="dark"
      className="relative isolate overflow-hidden bg-contrast-2 py-10 md:py-14 lg:pb-[100px] lg:pt-20"
    >
      <HexLattice className="pointer-events-none absolute inset-0 -z-10 size-full text-[var(--lattice-ink)] max-lg:hidden" />

      <Container>
        <h2 className="text-center text-section uppercase text-white">
          What you walk away with
        </h2>

        <div
          className={cn(
            "mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2",
            desktopCols,
          )}
        >
          {outcomes.map((outcome, i) => (
            <div
              key={outcome}
              className="rounded-lg bg-white/[0.04] px-4 py-5 sm:p-5 lg:min-h-[200px]"
            >
              <p
                aria-hidden
                className="font-display text-numeral font-light leading-[40px] text-grey-600 sm:leading-[48px]"
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
