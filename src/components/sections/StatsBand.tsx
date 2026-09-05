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
        <div className="flex flex-col gap-6 pb-10 pt-8 md:gap-10 md:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-[60px]">
          {/* Centred across the full column at 390, and on a 24px line rather
              than the 26 the lead step carries elsewhere — the design sets this
              one paragraph tighter, in exactly two lines. */}
          <p className="text-center text-lead leading-6 text-base-2 md:max-w-[301px] md:text-left md:leading-[1.4444]">
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

          <ul className="grid gap-4 sm:grid-cols-3 sm:gap-2 lg:w-[866px] lg:shrink-0">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-md border border-white/20 bg-white/12 px-[25px] pb-[25px] pt-[25px] text-center sm:pb-[29px]"
              >
                {/* 38/46 at 390 against the desktop 60/73 — 27px of measured cap
                    ink at a 0.70em cap height. */}
                <p className="font-display text-[2.375rem] font-medium leading-[1.2167] text-base-2 md:text-figure">
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
