import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { HexBullet } from "@/components/ui/HexBullet";
import { HexWatermark } from "@/components/visuals/HexWatermark";
import { CaseCover } from "@/app/work/CaseCover";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/lib/data/types";

/**
 * A case study on `/work`: one full-width row, artwork on one side and a dark
 * panel of copy on the other, alternating sides down the page.
 *
 * Every measurement is the design's own. The row is 1280 × auto with square
 * corners, sitting directly on the section's #171717 ground; the panel is a
 * fixed 540 and the artwork takes whatever remains, which is 740 at the design
 * width. Rows are not a fixed height — they grow with the copy, which is why
 * the design's six run between 472 and 568.
 *
 * The bullet marker alternates with the row: the accent on rows whose panel
 * sits right, and the warm counterpart on the ones that flip. That is the
 * design's only use of a second hue, and it tracks position rather than
 * anything about the study, so it is derived from the index here rather than
 * stored as data.
 *
 * Below `lg` the two halves stack — artwork first, then the panel at full
 * width — because a 540px panel beside anything is not readable on a phone.
 */
/**
 * The design lists four scope lines in every row, where the studies carry five
 * or six. It is a presentational cap, not a content edit — the full scope still
 * appears on the case study itself, and rows stay a consistent height, which is
 * what the four were chosen for.
 */
const SCOPE_SHOWN = 4;

export function CaseRow({
  study,
  displayName,
  index,
}: {
  study: CaseStudy;
  displayName: string;
  index: number;
}) {
  const flipped = index % 2 === 1;

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden lg:flex-row",
        flipped && "lg:flex-row-reverse",
      )}
    >
      {/* `min-w-0` keeps the artwork from forcing the row wider than the grid
          when its intrinsic size is larger than the space it is given. */}
      <div className="relative min-w-0 flex-1 self-stretch">
        <CaseCover
          /* The row fronts the work with a product screenshot where there is
             one; the study itself keeps the architecture diagram. */
          cover={study.rowCover ?? study.cover}
          title={study.title}
          aspect="aspect-[1.57] lg:h-full lg:aspect-auto"
          sizes="(min-width: 1024px) 740px, 100vw"
          className="h-full"
        />
      </div>

      {/* #212121 is a shade off `surface-dark`, and it is the value the design
          uses for every one of these panels. */}
      <div className="relative flex flex-col gap-8 overflow-hidden bg-[#212121] px-12 pb-10 pt-8 lg:w-[540px] lg:shrink-0">
        {/* The panel carries the watermark at 405 × 395, bled off its lower
            right. Same artwork as the hero mark — the pattern is declared in
            user space, so drawing it larger scales the hatch with it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[289px] top-[284px] h-[395px] w-[405px]"
          style={{ "--watermark-ink": "#434343" } as React.CSSProperties}
        >
          <HexWatermark className="h-full w-full" />
        </div>

        <div className="relative flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-[1.75rem] font-medium leading-[1.2] tracking-[0.32px] text-white">
              {displayName}
            </h3>
            <p className="font-mono text-caption font-medium uppercase text-[#8d8d8d]">
              {study.category}
            </p>
          </div>

          <p className="text-body text-[#b4b4b4]">{study.summary}</p>

          {study.scope && study.scope.length > 0 && (
            <ul className="flex flex-col">
              {study.scope.slice(0, SCOPE_SHOWN).map((item) => (
                <li key={item} className="flex items-center gap-3 py-2">
                  <HexBullet
                    className={flipped ? "text-accent-warm" : "text-accent-hi"}
                  />
                  <span className="text-body text-base-2">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href={`/work/${study.slug}`}
          className={cn(
            "relative inline-flex w-fit items-center gap-2.5 border border-white py-3.5 pl-6 pr-5",
            "font-display text-body font-medium leading-[1.125] text-white",
            "transition-colors duration-300 ease-in-out hover:bg-white/10",
          )}
        >
          Read Case Study
          <ArrowIcon tight className="size-[9.5px] shrink-0" />
        </Link>
      </div>
    </article>
  );
}
