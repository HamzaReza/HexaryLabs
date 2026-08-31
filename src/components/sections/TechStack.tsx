import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { StackHexagons } from "@/components/visuals/StackHexagons";
import { getTechGroups, getTechIntro, getToolCaseStudyLinks } from "@/lib/data";

/**
 * Our Stack: an intro column against four numbered rows of technology chips,
 * hairline-ruled between them.
 *
 * The previous build boxed each group in a bordered panel with a hex cluster
 * beside it. The design flattens that to a single list — a numbered label in a
 * fixed column, chips flowing beside it — and moves the hexagons out of the
 * groups and into one piece of artwork bleeding off the left edge.
 *
 * Measured off the 1440 × 740 frame: a 385px intro, rows starting at 513 and
 * running 847 wide, a 240px label column, 92px of chips, then 32px to the rule
 * and 32px to the next row.
 *
 * Tools that shipped in a case study stay linked to it — capability tied to
 * evidence. That behaviour is carried over from the previous build; the design
 * draws the chips plain, and the underline is ours.
 */
export async function TechStack() {
  const [tech, techIntro] = await Promise.all([getTechGroups(), getTechIntro()]);
  const links = await getToolCaseStudyLinks(tech.flatMap((group) => group.items));

  return (
    <section className="relative overflow-hidden bg-base py-14 lg:pb-[100px] lg:pt-20">
      <StackHexagons className="pointer-events-none absolute left-[-78px] top-[269px] hidden h-[498px] w-[502px] lg:block" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[385fr_847fr] lg:gap-12">
          <div>
            <h2 className="font-display text-section uppercase">Our Stack</h2>
            <p className="mt-6 text-lead text-grey-600">{techIntro}</p>
          </div>

          <ul>
            {tech.map((group, i) => (
              <li
                key={group.heading}
                className="border-grey-200 py-8 first:pt-0 last:pb-0 [&:not(:last-child)]:border-b"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
                  <p className="font-display text-lead font-medium lg:w-[240px] lg:shrink-0">
                    <span className="text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    <span className="text-grey-600">/</span> {group.heading}
                  </p>

                  <ul className="flex flex-wrap gap-0.5">
                    {group.items.map((item) => {
                      const linked = links[item] ?? null;
                      return (
                        <li key={item}>
                          {linked ? (
                            <Link
                              href={`/work/${linked.slug}`}
                              title={`Used in ${linked.title}`}
                              className="rounded-full focus-visible:outline-offset-4"
                            >
                              <Chip className="underline decoration-grey-300 underline-offset-4 hover:bg-accent hover:text-white hover:decoration-transparent">
                                {item}
                              </Chip>
                            </Link>
                          ) : (
                            <Chip>{item}</Chip>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
