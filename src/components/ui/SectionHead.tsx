import { Button } from "./Button";
import { ChevronRun } from "@/components/visuals/ChevronRun";
import { cn } from "@/lib/cn";

/**
 * The approved design's section heading: an ALL-CAPS 28px title with an
 * optional outlined action opposite it, and 48px of air down to the content.
 *
 * Two arrangements, both from the design:
 * · `split` — title left, action right. Services, stack, process.
 * · `center` — title centred between two runs of five chevrons that fade
 *   outward. Used once, on Our Work.
 *
 * Titles are authored in sentence case in `src/content/*` and uppercased here,
 * so the copy stays readable at the source and the casing stays a design
 * decision — same rule the page heroes follow.
 *
 * This is deliberately not an edit to `SectionHeader`: that component renders
 * the previous build's 48px heading and still heads five pages that Phases 4–6
 * have yet to rebuild. It retires when its last caller does.
 */
export function SectionHead({
  title,
  action,
  align = "split",
  className,
}: {
  title: string;
  action?: { label: string; href: string };
  align?: "split" | "center";
  className?: string;
}) {
  const heading = (
    <h2 className="font-display text-section uppercase">{title}</h2>
  );

  if (align === "center") {
    return (
      <div className={cn("flex items-center justify-center gap-8", className)}>
        <ChevronRun count={5} direction="left" fade className="h-[38px] max-sm:hidden" />
        {heading}
        <ChevronRun count={5} fade className="h-[38px] max-sm:hidden" />
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-wrap items-center justify-between gap-6", className)}
    >
      {heading}
      {action && (
        <Button href={action.href} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
}
