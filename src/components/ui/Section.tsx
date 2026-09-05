import { cn } from "@/lib/cn";
import { TONE_CLASS, type Tone } from "@/lib/ui/constants";

/**
 * Vertical rhythm + surface tone. Section padding 40 / 56 / 80px
 * (mobile / tablet / desktop) — the reference runs 80 desktop, 40 mobile off a
 * single breakpoint; we add the middle step.
 *
 * `data-tone` is what descendants (Button, Divider, links) key off, so no
 * component needs a tone prop.
 */
export function Section({
  children,
  tone = "light",
  className,
  id,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn("pb-10 pt-8 md:py-14 lg:py-20", TONE_CLASS[tone], className)}
    >
      {children}
    </section>
  );
}
