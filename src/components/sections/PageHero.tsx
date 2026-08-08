import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Annotation } from "@/components/ui/Annotation";
import { cn } from "@/lib/cn";
import { heroStaggerStyle } from "@/lib/motion";

function heroDelayStyle(staggerReveal: boolean, index: number): React.CSSProperties | undefined {
  return staggerReveal ? heroStaggerStyle(index) : undefined;
}

/** Shared hero for inner pages — same type ramp as the homepage h1. */
export function PageHero({
  eyebrow,
  title,
  intro,
  cta,
  staggerReveal = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  cta?: { label: string; href: string };
  staggerReveal?: boolean;
}) {
  let index = 0;

  return (
    <section className="texture-dots border-b-[0.8px] border-grey-100 bg-base pb-14 pt-12 lg:pb-20 lg:pt-18">
      <Container>
        {eyebrow && (
          <p
            className={cn("mb-6", staggerReveal && "hero-stagger-item")}
            style={heroDelayStyle(staggerReveal, index++)}
          >
            <Annotation>{eyebrow}</Annotation>
          </p>
        )}
        <h1
          className={cn(
            "max-w-[20ch] text-[2.125rem] leading-[1.2] tracking-[0.02em] md:text-[3rem] lg:text-h1",
            staggerReveal && "hero-stagger-item",
          )}
          style={heroDelayStyle(staggerReveal, index++)}
        >
          {title}
        </h1>
        {intro && (
          <p
            className={cn(
              "mt-8 max-w-[60ch] text-body-lg text-grey-600",
              staggerReveal && "hero-stagger-item",
            )}
            style={heroDelayStyle(staggerReveal, index++)}
          >
            {intro}
          </p>
        )}
        {cta &&
          (staggerReveal ? (
            <div
              className="hero-stagger-item mt-8"
              style={heroDelayStyle(staggerReveal, index++)}
            >
              <Button href={cta.href} size="lg">
                {cta.label}
              </Button>
            </div>
          ) : (
            <Button href={cta.href} size="lg" className="mt-8">
              {cta.label}
            </Button>
          ))}
      </Container>
    </section>
  );
}
