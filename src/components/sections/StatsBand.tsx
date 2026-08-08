import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Annotation } from "@/components/ui/Annotation";
import { stats } from "@/content/stats";

export function StatsBand() {
  return (
    <section
      data-tone="dark"
      className="texture-grid bg-contrast-2 py-10 md:py-14 lg:py-20"
    >
      <Container>
        <ul className="grid sm:grid-cols-3">
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className={
                i > 0
                  ? "relative py-10 text-center max-sm:border-t-[0.8px] max-sm:border-grey-700 sm:py-0"
                  : "relative py-10 text-center sm:py-0"
              }
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="rule-fade-v absolute left-0 top-0 hidden h-full w-px sm:block"
                />
              )}

              <p className="text-stat font-display font-medium text-white">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-3">
                <Annotation index={String(i + 1).padStart(2, "0")}>
                  {stat.label}
                </Annotation>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
