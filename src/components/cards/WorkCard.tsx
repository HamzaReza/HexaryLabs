import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CaseCover } from "@/app/work/CaseCover";
import { AnimatedCaseHero, hasAnimatedHero } from "@/app/work/animatedHeroes";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/lib/data/types";

/**
 * A case study as a carousel card: a preview plate over a copy footer.
 *
 * The card the carousel has centred is the `active` one, and the design fills
 * its footer with the accent. That is a position state, not a hover state —
 * which is why it is a prop rather than a `:hover` rule, and why it survives
 * keyboard scrolling and touch.
 *
 * Measured off the design's 600 × 624 card: a 360px plate, then a 264px footer
 * on 32px of side padding and 24px of top. The plate keeps the warm canvas the
 * rest of the site retired — in the design that beige is the material a product
 * screenshot sits on, and it is the only place it still appears.
 *
 * The whole card is one link. The "Read Case Study" line is a span, not a
 * second anchor, so screen readers and tab order see one destination.
 */
export function WorkCard({
  study,
  eyebrow,
  active = false,
}: {
  study: CaseStudy;
  eyebrow: string;
  active?: boolean;
}) {
  return (
    <article className="h-full">
      <Link
        href={`/work/${study.slug}`}
        className="group flex h-full flex-col focus-visible:outline-offset-4"
      >
        {/* 350 × 200 on the 390 frame — a slightly wider plate than the 5:3 the
            desktop card uses. */}
        <div className="aspect-[1.75] overflow-hidden bg-canvas-warm p-4 md:aspect-[5/3] sm:p-6">
          {hasAnimatedHero(study.slug) ? (
            <AnimatedCaseHero
              slug={study.slug}
              aspect="h-full"
              sizes="(min-width: 1024px) 600px, 85vw"
            />
          ) : (
            <CaseCover
              cover={study.cover}
              title={study.title}
              aspect="h-full"
              sizes="(min-width: 1024px) 600px, 85vw"
            />
          )}
        </div>

        <div
          data-tone={active ? "dark" : undefined}
          className={cn(
            /* 16 of padding and 8 between every element at 390, against the
               desktop 24/32 and 12/24. */
            "flex flex-1 flex-col px-4 pb-5 pt-4 transition-colors duration-300 md:px-6 md:pb-8 md:pt-6 lg:px-8",
            active ? "bg-accent" : "bg-base-2",
          )}
        >
          <p
            className={cn(
              "font-mono text-caption uppercase",
              active ? "text-grey-300" : "text-accent",
            )}
          >
            {eyebrow}
          </p>

          <h3
            className={cn(
              "mt-2 font-display text-card font-medium md:mt-3",
              active ? "text-white" : "text-contrast",
            )}
          >
            {study.title}
          </h3>

          <p
            className={cn(
              "mt-2 line-clamp-3 text-body md:mt-3",
              active ? "text-accent-soft" : "text-grey-600",
            )}
          >
            {study.summary}
          </p>

          <span
            className={cn(
              /* 16, not `text-body`: a control, and the mobile ramp is prose. */
              "mt-4 inline-flex items-center gap-3 self-start font-display text-[1rem] font-medium md:mt-6",
              "transition-colors duration-300",
              active
                ? "text-white group-hover:text-grey-300"
                : "text-contrast group-hover:text-accent",
            )}
          >
            Read Case Study
            <ArrowIcon className="size-4 shrink-0" />
          </span>
        </div>
      </Link>
    </article>
  );
}
