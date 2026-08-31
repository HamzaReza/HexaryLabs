import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { HexLattice } from "@/components/visuals/HexLattice";
import { getHomeProof, getStats } from "@/lib/data";

/**
 * The stats band: the proof line on the left, three bordered figures on the
 * right, over a honeycomb field.
 *
 * The previous build ran the three figures full width with fading vertical
 * rules between them and carried the proof line up in the hero. The design
 * makes them cards and brings the proof line down here, where the claim and its
 * evidence sit on one row.
 *
 * Measured off the 1440 × 275 frame: cards are 283 × 155 on an 8px gap, right
 * aligned to the gutter, 25px of padding, 60px of air above and below. Card
 * surfaces are translucent white — 12% fill, 20% border — so the section's
 * gradient and the lattice both read through them rather than being covered.
 */
export async function StatsBand() {
  const [stats, proof] = await Promise.all([getStats(), getHomeProof()]);

  return (
    <section data-tone="dark" className="surface-dark relative isolate overflow-hidden text-white">
      <HexLattice className="absolute inset-0 -z-10 h-full w-full" />

      <Container>
        <div className="flex flex-col gap-10 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-[60px]">
          <p className="max-w-[301px] text-lead text-base-2">
            {proof.prefix}{" "}
            {proof.clients.map((client, i) => (
              <span key={client.href}>
                <Link
                  href={client.href}
                  className="underline underline-offset-4 transition-colors duration-300 hover:text-accent-hi"
                >
                  {client.label}
                </Link>
                {/* Oxford-comma join, built here rather than baked into the
                    copy so the list can grow or shrink in content alone. */}
                {i < proof.clients.length - 2 ? ", " : null}
                {i === proof.clients.length - 2 ? ", and " : null}
              </span>
            ))}
          </p>

          <ul className="grid gap-2 sm:grid-cols-3 lg:w-[866px] lg:shrink-0">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-md border border-white/20 bg-white/12 px-[25px] pb-[29px] pt-[25px] text-center"
              >
                <p className="font-display text-figure font-medium text-base-2">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-2 font-mono text-caption uppercase text-grey-300">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
