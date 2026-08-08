import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Annotation } from "@/components/ui/Annotation";
import { ClippedPanel } from "@/components/ui/ClippedPanel";
import { HexCluster } from "@/components/ui/HexCluster";
import { tech, techIntro } from "@/content/tech";
import { work } from "@/content/work";

/* 5.4: categories as hexagonal modules; every tool that appears in a shipped
   case study's stack links to that case study — capability tied to evidence,
   derived at render time so it can't drift from work.ts. Names stay text
   marks (no vendor logos, no trademarks). */
function caseStudyFor(tool: string): { slug: string; title: string } | null {
  const normalized = tool.toLowerCase();
  for (const study of work) {
    if (
      study.stack.some((s) => {
        const entry = s.toLowerCase();
        return entry === normalized || entry.startsWith(`${normalized} `) || entry.startsWith(`${normalized}(`);
      })
    ) {
      return { slug: study.slug, title: study.title };
    }
  }
  return null;
}

export function TechStack() {
  return (
    <Section tone="light">
      <Container>
        <SectionHeader align="center" title="Our Stack" intro={techIntro} />

        <div className="grid gap-6 md:grid-cols-2">
          {tech.map((group, gi) => (
            <ClippedPanel key={group.heading} clip="md" bordered className="bg-base p-8">
              <div className="flex items-center gap-5">
                <HexCluster
                  cells={[
                    { q: 0, r: 0, role: gi % 2 === 0 ? "ink" : "signal" },
                    { q: 1, r: 0, role: "outline" },
                    { q: 0, r: 1, role: "textured" },
                  ]}
                  className="h-14 w-auto"
                />
                <div>
                  <Annotation index={String(gi + 1).padStart(2, "0")}>
                    {group.heading}
                  </Annotation>
                </div>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {group.items.map((item) => {
                  const linked = caseStudyFor(item);
                  return (
                    <li key={item} className="font-display text-body text-contrast-2">
                      {linked ? (
                        <Link
                          href={`/work/${linked.slug}`}
                          title={`Used in ${linked.title}`}
                          className="underline decoration-grey-300 underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent"
                        >
                          {item}
                        </Link>
                      ) : (
                        item
                      )}
                    </li>
                  );
                })}
              </ul>
            </ClippedPanel>
          ))}
        </div>

        <p className="mt-8 text-center">
          <Annotation>Underlined tools link to the case study they shipped in</Annotation>
        </p>
      </Container>
    </Section>
  );
}
