import { Hero } from "@/components/sections/Hero";
import { StatsBand } from "@/components/sections/StatsBand";
import { WorkSection } from "@/components/sections/WorkSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TechStack } from "@/components/sections/TechStack";
import { CapabilitiesBand } from "@/components/sections/CapabilitiesBand";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <WorkSection />
      <ServicesSection />
      <TechStack />
      <CapabilitiesBand />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
