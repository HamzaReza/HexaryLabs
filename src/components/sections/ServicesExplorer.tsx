"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Annotation } from "@/components/ui/Annotation";
import { ClippedPanel } from "@/components/ui/ClippedPanel";
import { HexCluster } from "@/components/ui/HexCluster";
import { CaseCover } from "@/app/work/CaseCover";
import { cn } from "@/lib/cn";
import type { CaseStudy, Service } from "@/lib/data/types";

/** A service paired with the case study it points at for proof. */
export type ServiceWithProof = { service: Service; study: CaseStudy | null };

/* 5.3: gradual disclosure instead of the old hover wipe. Click/tap-driven so
   mobile needs no hover; one panel open at a time. Everything revealed is
   pulled from the linked case study — no free-standing claims.

   Client component: the service/case-study join is done by the server parent
   and handed over as props. */
export function ServicesExplorer({ items }: { items: ServiceWithProof[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <ul className="border-t-[0.8px] border-grey-200">
      {items.map(({ service, study }, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <li key={service.slug} className="border-b-[0.8px] border-grey-200">
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="grid w-full cursor-pointer items-center gap-x-8 gap-y-2 py-7 text-left transition-colors duration-300 md:grid-cols-[3rem_1.2fr_1fr_2rem]"
              >
                <Annotation index={String(i + 1).padStart(2, "0")}>
                  {""}
                </Annotation>
                <span
                  className={cn(
                    "font-display text-[1.3125rem] font-medium leading-[1.2] transition-colors duration-300 lg:text-h3",
                    isOpen ? "text-accent" : "text-contrast-2",
                  )}
                >
                  {service.title}
                </span>
                <span className="text-body text-grey-600 max-md:hidden">
                  {service.summary}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "justify-self-end font-display text-h4 text-grey-600 transition-transform duration-300",
                    isOpen && "rotate-45 text-accent",
                  )}
                >
                  +
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-[400ms] ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                {study && (
                  <div className="grid gap-8 pb-10 pt-2 lg:grid-cols-[1fr_1fr] lg:gap-14">
                    <div>
                      <Annotation>Related work — {study.title}</Annotation>
                      <p className="mt-3 text-body-lg text-grey-600">
                        {study.summary}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {study.stack.slice(0, 6).map((tool) => (
                          <li
                            key={tool}
                            className="border-[0.8px] border-grey-200 bg-base px-3 py-1 font-mono text-small text-grey-600"
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                        <Link
                          href={`/work/${study.slug}`}
                          className="inline-flex items-center gap-3 font-display text-body font-medium text-contrast-2 transition-colors duration-300 hover:text-accent"
                        >
                          Read the case study
                          <ArrowIcon className="size-3.5" />
                        </Link>
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-3 font-display text-body font-medium text-contrast-2 transition-colors duration-300 hover:text-accent"
                        >
                          About {service.title}
                          <ArrowIcon className="size-3.5" />
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <ClippedPanel clip="md" bordered className="bg-base" as="figure">
                        <CaseCover
                          cover={study.cover}
                          title={study.title}
                          aspect="aspect-[1.9]"
                          sizes="(min-width: 1024px) 560px, 100vw"
                        />
                      </ClippedPanel>
                      <div className="flex items-center gap-4">
                        <HexCluster
                          cells={service.explore.diagram.map((label, j) => ({
                            q: j,
                            r: j === 2 ? -1 : 0,
                            role: j === 1 ? "signal" : "outline",
                            label,
                          }))}
                          label={`Simplified ${service.title} system diagram: ${service.explore.diagram.join(", ")}`}
                          className="h-24 w-auto"
                        />
                        <Annotation>{service.teaserBestFor}</Annotation>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
