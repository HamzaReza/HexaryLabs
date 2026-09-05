import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

/* Page-specific closing band on the CtaBand pattern: the heading itself is
   the primary link (5.6), with the CTA label as its caption. */
export function ClosingCta({
  heading,
  body,
  cta,
  secondaryCta,
}: {
  heading: string;
  body?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section
      data-tone="dark"
      className="bg-contrast-2 pb-10 pt-8 text-white md:pb-14 md:pt-14 lg:pb-20 lg:pt-20"
    >
      <Container>
        <div className="flex flex-col items-center gap-10 text-center">
          <Link href={cta.href} className="group flex flex-col items-center gap-6">
            <span className="text-h2 font-display font-medium max-md:text-[1.625rem] md:text-[2.25rem] lg:text-h2 transition-colors duration-300 group-hover:text-accent-hi">
              {heading}
            </span>
            {body && (
              <span className="mx-auto max-w-[60ch] text-body-lg font-normal text-grey-300">
                {body}
              </span>
            )}
            <span className="inline-flex items-center gap-4 border-[0.8px] border-grey-700 px-6 py-3 font-display text-body-lg font-medium leading-none text-grey-300 transition-colors duration-300 group-hover:border-accent-hi group-hover:text-accent-hi">
              {cta.label}
              <ArrowIcon />
            </span>
          </Link>
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
