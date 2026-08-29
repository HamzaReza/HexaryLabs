import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Annotation } from "@/components/ui/Annotation";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { getPlatformNames } from "@/lib/data";

/* Objective 2-3: name all six capability areas, each linking to the page
   that proves it, plus the platform mesh from /integrations. Content
   density with structure, not decoration. */
const capabilities = [
  { label: "Software development", href: "/services/software-engineering" },
  { label: "AI automation", href: "/services/ai-engineering" },
  { label: "SaaS platforms", href: "/work" },
  { label: "API integrations", href: "/integrations" },
  { label: "CRM systems", href: "/integrations" },
  { label: "Internal business tools", href: "/work/kinein" },
];

export async function CapabilitiesBand() {
  const platforms = await getPlatformNames();

  return (
    <Section tone="muted">
      <Container>
        <SectionHeader
          title="What we cover"
          action={{ label: "See all integrations", href: "/integrations" }}
        />

        <ul className="grid gap-px border-[0.8px] border-grey-200 bg-grey-200 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <li key={cap.label} className="bg-base">
              <Link
                href={cap.href}
                className="group flex items-center justify-between gap-4 p-6 transition-colors duration-300"
              >
                <span className="flex flex-col gap-1">
                  <Annotation index={String(i + 1).padStart(2, "0")}>{""}</Annotation>
                  <span className="font-display text-body-lg font-medium text-contrast-2 transition-colors duration-300 group-hover:text-accent">
                    {cap.label}
                  </span>
                </span>
                <ArrowIcon className="size-3.5 shrink-0 text-grey-600 transition-colors duration-300 group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 border-t-[0.8px] border-grey-200 pt-6 text-body text-grey-600">
          <span className="font-mono text-small uppercase tracking-[0.08em]">
            Platforms we&rsquo;ve integrated:{" "}
          </span>
          {platforms.map((name, i) => (
            <span key={name}>
              {i > 0 && " · "}
              <Link
                href="/integrations"
                className="transition-colors duration-300 hover:text-accent"
              >
                {name}
              </Link>
            </span>
          ))}
        </p>
      </Container>
    </Section>
  );
}
