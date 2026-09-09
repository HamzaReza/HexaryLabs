import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";
import type { ComparisonRow } from "@/lib/data/types";

/**
 * "How this compares" — Software Engineering only.
 *
 * Desktop is a four-column table (criterion + in-house + freelancer + Hexary)
 * with the Hexary column painted accent. Mobile keeps the same columns but
 * scrolls horizontally: a sticky 100px label rail on the left, comparison
 * cells at 240px, and a scrollbar track under the scroller — matching the
 * 390 frame rather than stacking rows.
 */

function InHouseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M7 3.5h7.5L19 8v12.5H7V3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M14.5 3.5V8H19" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 12h6M10 15.5h6M10 19h3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function FreelanceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 19.5c.8-3.2 3.2-5 6.5-5s5.7 1.8 6.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ServiceComparison({
  rows,
}: {
  rows: readonly ComparisonRow[];
}) {
  return (
    <section className="bg-base py-10 md:py-14 lg:pb-[100px] lg:pt-20">
      <Container>
        <h2 className="text-center text-section uppercase text-contrast">
          How this compares
        </h2>

        {/* Desktop — full four-column table. */}
        <div className="mt-8 hidden overflow-hidden sm:mt-12 lg:block">
          <div className="grid grid-cols-4">
            <div className="p-6" />
            <div className="flex items-center gap-3 p-6">
              <InHouseIcon className="size-8 shrink-0 text-grey-500" />
              <p className="text-body-lg font-medium text-contrast">
                Typical in-house hire
              </p>
            </div>
            <div className="flex items-center gap-3 p-6">
              <FreelanceIcon className="size-8 shrink-0 text-grey-500" />
              <p className="text-body-lg font-medium text-contrast">
                Freelance contractor
              </p>
            </div>
            <div className="flex items-center bg-accent p-6">
              <Wordmark className="h-6 w-[130px] text-white" title="hexarylabs" />
            </div>

            {rows.map((row, i) => {
              const zebra = i % 2 === 0;
              return (
                <div key={row.label} className="contents">
                  <div
                    className={cn(
                      "flex items-start p-6",
                      zebra ? "bg-[#f7f7f7]" : "bg-base",
                    )}
                  >
                    <p className="text-body-lg font-medium text-contrast">
                      {row.label}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "flex items-start p-6",
                      zebra ? "bg-[#f7f7f7]" : "bg-base",
                    )}
                  >
                    <p className="text-body text-grey-600">{row.inHouse}</p>
                  </div>
                  <div
                    className={cn(
                      "flex items-start p-6",
                      zebra ? "bg-[#f7f7f7]" : "bg-base",
                    )}
                  >
                    <p className="text-body text-grey-600">{row.freelancer}</p>
                  </div>
                  <div
                    className={cn(
                      "flex items-start p-6",
                      zebra ? "bg-[#4e36f1]" : "bg-accent",
                    )}
                  >
                    <p className="text-body text-white">{row.hexary}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet — horizontally scrollable comparison. */}
        <div className="mt-8 lg:hidden">
          <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:thin]">
            <div className="relative min-w-[820px]">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[100px] bg-base shadow-[2px_0_0_rgba(0,0,0,0.1)]" />
              <div className="grid grid-cols-[100px_240px_240px_240px]">
                <div className="sticky left-0 z-20 bg-base p-4" />
                <div className="flex items-center gap-3 p-4">
                  <InHouseIcon className="size-6 shrink-0 text-grey-500" />
                  <p className="text-body font-medium text-contrast">
                    Typical in-house hire
                  </p>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <FreelanceIcon className="size-6 shrink-0 text-grey-500" />
                  <p className="text-body font-medium text-contrast">
                    Freelance contractor
                  </p>
                </div>
                <div className="flex items-center bg-accent p-4">
                  <Wordmark
                    className="h-6 w-[130px] text-white"
                    title="hexarylabs"
                  />
                </div>

                {rows.map((row) => (
                  <div key={row.label} className="contents">
                    <div className="sticky left-0 z-20 bg-base py-4 pr-2">
                      <p className="text-small font-medium text-contrast">
                        {row.label}
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-[14px] leading-6 text-grey-600">
                        {row.inHouse}
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-[14px] leading-6 text-grey-600">
                        {row.freelancer}
                      </p>
                    </div>
                    <div className="bg-accent p-4">
                      <p className="text-[14px] leading-6 text-white">
                        {row.hexary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
