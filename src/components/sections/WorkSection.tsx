import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStoryRow } from "@/components/cards/CaseStoryRow";
import { work } from "@/content/work";

export function WorkSection() {
  const featured = work.filter((study) => study.featured);

  return (
    <Section tone="light">
      <Container>
        <SectionHeader
          title="Our Work"
          action={{ label: "See all Work", href: "/work" }}
        />

        <div className="flex flex-col gap-16 lg:gap-24">
          {featured.map((study, i) => (
            <Reveal key={study.slug} variant="fade-up">
              <CaseStoryRow study={study} index={i} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 lg:mt-24">
          <Button href="/work" variant="block">
            See All Work
          </Button>
        </div>
      </Container>
    </Section>
  );
}
