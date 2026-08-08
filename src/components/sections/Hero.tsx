import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Annotation } from "@/components/ui/Annotation";
import { HexAssembly } from "@/components/visuals/HexAssembly";

export function Hero() {
  return (
    <section className="bg-base pb-6 pt-10 md:pb-8 md:pt-14 lg:pb-8 lg:pt-18">
      <Container>
        <div className="grid items-center gap-x-16 gap-y-8 lg:grid-cols-2">
          <h1 className="text-[1.875rem] leading-[1.2] tracking-[0.02em] md:text-[2.5rem] lg:col-start-1 lg:row-start-1 lg:text-[3.25rem]">
            From ambitious idea to production system. Built by one team, end to
            end<span className="text-accent">.</span>
          </h1>

          <div className="lg:col-start-2 lg:row-span-4 lg:row-start-1">
            <HexAssembly />
          </div>

          <p className="text-body-lg text-grey-600 lg:col-start-1 lg:row-start-2">
            We&rsquo;re a technology partner for founders, product leaders, and
            enterprises building serious software: SaaS platforms, AI-powered
            products, business systems, and the integrations that hold them
            together.
          </p>

          <div className="flex flex-wrap items-center gap-4 lg:col-start-1 lg:row-start-3">
            <Button href="/contact" size="lg">
              Start a Project
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              See Our Work
            </Button>
          </div>

          <p className="border-t-[0.8px] border-grey-100 pt-4 lg:col-start-1 lg:row-start-4">
            <Annotation>
              The team behind TrueCell, Kinein, and B2B Access
            </Annotation>
          </p>
        </div>
      </Container>
    </section>
  );
}
