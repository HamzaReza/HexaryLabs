import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { cn } from "@/lib/cn";

/**
 * A service on the index page: one wide white card carrying everything a
 * reader needs to choose without opening the page.
 *
 * Geometry is the design's, measured at 1:1 on the 1440 frame — a 1280 card on
 * 32px of padding, split into a 120px numeral column, a 952px content column
 * and an 80px icon, each separated by the same 32px. Inside the content column
 * every gap is 24px until the button, which sits 32px clear.
 *
 * The numeral is Space Grotesk *Regular* 36/32, not Medium — read off the Figma
 * type panel. Its line box is deliberately shorter than its glyphs.
 *
 * The four labels are mono 14 on a 24px line with no tracking, which is what
 * separates them from the chips: those are the same face and size but carry the
 * 6.9% tracking of `text-caption`. Both are in the design; they are not the
 * same style.
 */

const LABEL = "font-mono text-[0.875rem] leading-6 text-grey-600";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className={LABEL}>{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function ServiceCard({
  index,
  slug,
  title,
  quote,
  bestFor,
  stack,
  typicalEngagement,
  relatedWorkLabel,
  relatedWorkHref,
}: {
  index: number;
  slug: string;
  title: string;
  quote: string;
  bestFor: string;
  stack: readonly string[];
  typicalEngagement: string;
  relatedWorkLabel: string;
  relatedWorkHref?: string;
}) {
  return (
    <article className="rounded-2xl bg-base p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* The numeral column is fixed at 120px so all four titles start on the
            same x, regardless of how wide the digits render. */}
        <p
          className="font-display text-[2.25rem] font-normal leading-8 text-accent md:w-[120px] md:shrink-0"
          aria-hidden
        >
          {String(index).padStart(2, "0")}
        </p>

        <div className="min-w-0 flex-1">
          <h2 className="text-section text-contrast-2">{title}</h2>
          <p className="mt-6 text-lead text-contrast">&ldquo;{quote}&rdquo;</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
            <Field label="Best for">
              <p className="text-body text-contrast">{bestFor}</p>
            </Field>
            <Field label="Stack">
              {/* 2px gaps, exactly as the design sets them — the pills read as
                  one block of stack rather than six separate objects. */}
              <div className="flex flex-wrap gap-0.5">
                {stack.map((tool) => (
                  <Chip key={tool} size="stack">
                    {tool}
                  </Chip>
                ))}
              </div>
            </Field>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-8">
            <Field label="Typical engagement">
              <p className="text-body text-contrast">{typicalEngagement}</p>
            </Field>
            <Field label="Related work">
              {relatedWorkHref ? (
                <Link
                  href={relatedWorkHref}
                  className={cn(
                    "text-body text-accent underline underline-offset-4",
                    "transition-colors duration-300 hover:text-contrast-2",
                  )}
                >
                  {relatedWorkLabel}
                </Link>
              ) : (
                <p className="text-body text-contrast">{relatedWorkLabel}</p>
              )}
            </Field>
          </div>

          <Button href={`/services/${slug}`} variant="outline" className="mt-8">
            About {title}
          </Button>
        </div>

        <ServiceIcon slug={slug} className="shrink-0 self-start text-accent max-md:hidden" />
      </div>
    </article>
  );
}
