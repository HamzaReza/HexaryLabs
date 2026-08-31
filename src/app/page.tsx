import { Hero } from "@/components/sections/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { OutcomeSection } from "@/components/sections/OutcomeSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechStack } from "@/components/sections/TechStack";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Section order is the approved design's, top to bottom. Two changes from the
 * previous build: the outcome block is new — it was designed and had never been
 * built — and `CapabilitiesBand` is gone, because the design does not have it.
 * The six capability cells and the integrated-platforms line it carried are
 * still reachable at `/services` and `/integrations`.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <OutcomeSection />
      <WorkSection />
      <ServicesSection />
      <TechStack />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
