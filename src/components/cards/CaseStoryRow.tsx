import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CheckIcon } from "@/components/ui/CheckIcon";
import { Annotation } from "@/components/ui/Annotation";
import { ClippedPanel } from "@/components/ui/ClippedPanel";
import { CaseCover } from "@/app/work/CaseCover";
import { AnimatedCaseHero, hasAnimatedHero } from "@/app/work/animatedHeroes";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/lib/data/types";

const VISUAL_ASPECT = "aspect-[4/3] sm:aspect-[1.7]";

interface CaseStoryRowProps {
  study: CaseStudy;
  index: number;
  flip?: boolean;
  eyebrow?: string;
  sizes?: string;
  className?: string;
}

/* The 5.2 story system: one focused horizontal composition per project,
   visual and supporting information beside each other, pentagonal frame.
   Shared by the homepage Work section and /work (Phase 3). */
export function CaseStoryRow({
  study,
  index,
  flip = false,
  eyebrow,
  sizes = "(min-width: 1024px) 640px, 100vw",
  className,
}: CaseStoryRowProps) {
  const scope = (study.scope ?? []).slice(0, 4);

  return (
    <article
      className={cn(
        "group relative grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14",
        className,
      )}
    >
      <ClippedPanel
        clip="lg"
        bordered
        className={cn("bg-base", flip && "lg:col-start-2")}
        as="figure"
      >
        {hasAnimatedHero(study.slug) ? (
          <AnimatedCaseHero slug={study.slug} aspect={VISUAL_ASPECT} sizes={sizes} />
        ) : (
          <CaseCover
            cover={study.cover}
            title={study.title}
            aspect={VISUAL_ASPECT}
            sizes={sizes}
          />
        )}
      </ClippedPanel>

      <div className={cn(flip && "lg:col-start-1 lg:row-start-1")}>
        <Annotation index={String(index + 1).padStart(2, "0")}>
          {eyebrow ?? study.client}
        </Annotation>

        <h3 className="mt-4 text-[1.625rem] leading-[1.2] lg:text-h3">
          <Link
            href={`/work/${study.slug}`}
            className="before:absolute before:inset-0"
          >
            {study.title}
          </Link>
        </h3>

        <p className="mt-4 text-body-lg text-grey-600">{study.summary}</p>

        {scope.length > 0 && (
          <ul className="mt-6 border-t-[0.8px] border-grey-200">
            {scope.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b-[0.8px] border-grey-200 py-2.5 last:border-b-0"
              >
                <CheckIcon className="size-3.5 shrink-0 text-accent" />
                <span className="text-body text-grey-600">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <span className="mt-6 inline-flex items-center gap-3 font-display text-body font-medium text-contrast-2 transition-colors duration-300 group-hover:text-accent">
          Read Case Study
          <ArrowIcon className="size-3.5" />
        </span>
      </div>
    </article>
  );
}
