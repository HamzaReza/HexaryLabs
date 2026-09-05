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

/**
 * The design's 390 card is the same card re-laid: the icon moves from the right
 * of the row to the top-left with the numeral opposite it, the two field pairs
 * become one column, and every step of type drops — the label to 12/16, its
 * value to 14/20, the numeral to 24 and the title to 24/31.
 */
const LABEL =
  "font-mono text-[0.75rem] leading-4 text-grey-600 md:text-[0.875rem] md:leading-6";
const VALUE = "text-body leading-5 md:leading-6";

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
    <article className="rounded-2xl bg-base p-4 md:p-6 lg:p-8">
      {/* One DOM order, two layouts. Below `md` the row wraps: the icon and the
          numeral share the first line and the content takes the second, which is
          what `basis-full` and the three `order`s buy — no duplicated icon. */}
      <div className="flex flex-wrap items-start gap-5 md:flex-nowrap md:gap-6 lg:gap-8">
        {/* The numeral column is fixed at 120px so all four titles start on the
            same x, regardless of how wide the digits render. */}
        <p
          className="font-display text-[1.5rem] font-normal leading-8 text-accent max-md:order-2 max-md:ml-auto md:text-[2.25rem] md:w-[120px] md:shrink-0"
          aria-hidden
        >
          {String(index).padStart(2, "0")}
        </p>

        <div className="min-w-0 flex-1 max-md:order-3 max-md:basis-full">
          <h2 className="text-[1.5rem] leading-[1.2917] text-contrast-2 md:text-section">
            {title}
          </h2>
          <p className="mt-5 text-lead text-contrast md:mt-6">
            &ldquo;{quote}&rdquo;
          </p>

          {/* One column at 390 on a 20px rhythm; the design's two-by-two grid
              from `sm`, whose 32/24 gaps are the desktop's unchanged. */}
          <div className="mt-5 flex flex-col gap-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
            <Field label="Best for">
              <p className={cn(VALUE, "text-contrast")}>{bestFor}</p>
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
            <Field label="Typical engagement">
              <p className={cn(VALUE, "text-contrast")}>{typicalEngagement}</p>
            </Field>
            <Field label="Related work">
              {relatedWorkHref ? (
                <Link
                  href={relatedWorkHref}
                  className={cn(
                    VALUE,
                    "text-accent underline underline-offset-4",
                    "transition-colors duration-300 hover:text-contrast-2",
                  )}
                >
                  {relatedWorkLabel}
                </Link>
              ) : (
                <p className={cn(VALUE, "text-contrast")}>{relatedWorkLabel}</p>
              )}
            </Field>
          </div>

          <Button
            href={`/services/${slug}`}
            variant="outline"
            className="mt-6 max-md:w-full max-md:justify-center md:mt-8"
          >
            About {title}
          </Button>
        </div>

        {/* Top-left at 390, where the design puts it; right of the row above. */}
        <ServiceIcon
          slug={slug}
          className="shrink-0 self-start text-accent max-md:order-1 max-md:size-16"
        />
      </div>
    </article>
  );
}
