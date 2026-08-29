import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicesExplorer } from "@/components/sections/ServicesExplorer";
import { getRelatedCaseStudy, getServices } from "@/lib/data";

export async function ServicesSection() {
  /* The service → case-study join happens here, on the server, so the client
     explorer receives finished pairs instead of importing content itself. */
  const services = await getServices();
  const items = await Promise.all(
    services.map(async (service) => ({
      service,
      study: await getRelatedCaseStudy(service),
    })),
  );

  return (
    <Section tone="muted">
      <Container>
        <SectionHeader
          title="Our Services"
          action={{ label: "See all Services", href: "/services" }}
        />
        <ServicesExplorer items={items} />
      </Container>
    </Section>
  );
}
