import { Chip } from "@/components/ui/Chip";
import { HexWatermark } from "@/components/visuals/HexWatermark";
import type { CaseStudy } from "@/lib/data/types";

/**
 * The case study's opening: the story on the left, the specification on the
 * right, split 800 / 640 on the design's 1440.
 *
 * The two halves are deliberately unlike each other. The left is the page's
 * only white ground, carrying the dot field and a 48px uppercase title; the
 * right is the dark gradient panel, and reads as a datasheet — four labelled
 * rows, mono labels over plain values, with the stack as pills.
 *
 * Rows render only when the study has the field. Scope, stack and duration are
 * each optional in the data, and an empty row would leave a labelled blank
 * rather than closing the gap.
 */
const DOT_MASK =
  "linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,1) 83%)";

export function CaseHero({
  study,
  eyebrow,
}: {
  study: CaseStudy;
  eyebrow: string;
}) {
  const website = study.links?.[0];

  return (
    <section className="relative isolate lg:min-h-[600px] lg:grid lg:grid-cols-[800px_1fr]">
      {/* Left — the story */}
      <div className="relative overflow-hidden bg-base px-6 py-14 lg:px-[7.5rem] lg:py-0">
        <div
          aria-hidden
          /* Not `-z-10`: this div sits inside the half that paints `bg-base`,
             so a negative index would put the field behind its own ground and
             render nothing. It stacks under the copy by DOM order instead. */
          className="texture-dots pointer-events-none absolute inset-0"
          style={
            {
              "--texture-ink": "rgba(23,23,23,0.228)",
              /* This hero is 600 tall, not the 540 the other pages use, and
                 its mask sits differently: solved off the design's own ramp,
                 the field runs 0.32 at the top to fully opaque about 83% down,
                 rather than the 0.167 → 0.76 of the shared band. */
              maskImage: DOT_MASK,
              WebkitMaskImage: DOT_MASK,
            } as React.CSSProperties
          }
        />
        <div className="relative flex h-full flex-col justify-center gap-6 lg:max-w-[560px]">
          <p className="font-mono text-tag font-medium uppercase tracking-[0.96px] text-accent">
            {eyebrow}
          </p>
          {/* SemiBold here and nowhere else on the site — the design gives the
              case study's title more weight than any other page headline. */}
          <h1 className="font-display text-[2rem] font-semibold uppercase leading-[1.27] tracking-[1.04px] text-contrast-2 lg:text-[3rem]">
            {study.title}
          </h1>
          <p className="text-lead font-medium text-contrast">{study.summary}</p>
        </div>
      </div>

      {/* Right — the specification */}
      <div className="surface-dark relative overflow-hidden px-6 py-14 lg:px-10 lg:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[354px] top-[360px] h-[329px] w-[337px]"
          style={{ "--watermark-ink": "rgba(255,255,255,0.10)" } as React.CSSProperties}
        >
          <HexWatermark className="h-full w-full" />
        </div>

        <dl className="relative flex flex-col gap-8 lg:max-w-[480px]">
          {study.scope && study.scope.length > 0 && (
            <SpecRow label="Scope">
              <p className="text-body text-base-2">{study.scope.join(" · ")}</p>
            </SpecRow>
          )}

          {study.stack.length > 0 && (
            <SpecRow label="Stack & architecture">
              <ul className="flex flex-wrap gap-0.5">
                {study.stack.map((tool) => (
                  <li key={tool}>
                    <Chip size="stack" tone="dark">
                      {tool}
                    </Chip>
                  </li>
                ))}
              </ul>
            </SpecRow>
          )}

          {study.duration && (
            <SpecRow label="Project duration">
              <p className="text-body text-base-2">{study.duration}</p>
            </SpecRow>
          )}

          {website && (
            <SpecRow label="Website">
              <a
                href={website.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-body text-accent-hi underline underline-offset-4 transition-colors duration-300 hover:text-white"
              >
                {new URL(website.href).host.replace(/^www\./, "")}
              </a>
            </SpecRow>
          )}
        </dl>
      </div>
    </section>
  );
}

function SpecRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-caption font-medium text-[#8d8d8d]">{label}</dt>
      <dd className="mt-2">{children}</dd>
    </div>
  );
}
