import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicesExplorer } from "@/components/sections/ServicesExplorer";

export function ServicesSection() {
  return (
    <Section tone="muted">
      <Container>
        <SectionHeader
          title="Our Services"
          action={{ label: "See all Services", href: "/services" }}
        />
        <ServicesExplorer />
      </Container>
    </Section>
  );
}
