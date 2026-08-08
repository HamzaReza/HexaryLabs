import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

/* The closing moment (5.6): the oversized statement itself is the link —
   the whole band is the transition into /contact. */
export function CtaBand() {
  return (
    <section
      data-tone="dark"
      className="bg-contrast-2 pb-14 pt-14 text-white lg:pb-20 lg:pt-20"
    >
      <Container>
        <Link
          href="/contact"
          className="group flex flex-col items-center gap-8 text-center"
        >
          <span className="flex items-baseline gap-4 text-mega font-display font-medium text-white transition-colors duration-300 group-hover:text-accent-hi">
            Let&rsquo;s Talk
            <ArrowIcon className="size-[0.5em] shrink-0 text-accent transition-colors duration-300 group-hover:text-accent-hi" />
          </span>
          <span className="inline-flex items-center gap-4 border-[0.8px] border-grey-700 px-6 py-3 font-display text-body-lg font-medium leading-none text-grey-300 transition-colors duration-300 group-hover:border-accent-hi group-hover:text-accent-hi">
            Start a Project
          </span>
        </Link>
      </Container>
    </section>
  );
}
