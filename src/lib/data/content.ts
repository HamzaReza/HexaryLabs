/**
 * Page-level content queries — the copy blocks that aren't services or case studies.
 */

import {
  loadAboutContent,
  loadCaseStudies,
  loadHomeHero,
  loadHomeOutcome,
  loadHomeProof,
  loadHowWeWorkContent,
  loadIntegrationsContent,
  loadPlatformGroups,
  loadProcessPhases,
  loadProcessSteps,
  loadStats,
  loadTechGroups,
  loadTechIntro,
} from "./source";
import type {
  HomeHero,
  HomeOutcome,
  HomeProof,
  PlatformGroup,
  ProcessPhase,
  ProcessStepDetail,
  Stat,
  TechGroup,
} from "./types";

/* ------------------------------------------------------------------ homepage */

export async function getHomeHero(): Promise<HomeHero> {
  return loadHomeHero();
}

export async function getHomeOutcome(): Promise<HomeOutcome> {
  return loadHomeOutcome();
}

/**
 * The proof line, with each client name resolved to its case study.
 *
 * The join happens here rather than in the component for the same reason the
 * process steps are joined here: a slug that no longer exists should stop the
 * build, not render a link to a 404 that nobody clicks until launch.
 */
export async function getHomeProof(): Promise<HomeProof> {
  const proof = loadHomeProof();
  const studies = loadCaseStudies();

  return {
    prefix: proof.prefix,
    clients: proof.clients.map((client) => {
      const study = studies.find((s) => s.slug === client.slug);
      if (!study) {
        throw new Error(
          `[data] homepage proof line names "${client.label}" (${client.slug}), which is not a case study`,
        );
      }
      return { label: client.label, href: `/work/${study.slug}` };
    }),
  };
}

export async function getStats(): Promise<Stat[]> {
  return loadStats();
}

export async function getTechGroups(): Promise<TechGroup[]> {
  return loadTechGroups();
}

export async function getTechIntro(): Promise<string> {
  return loadTechIntro();
}

/**
 * The four process steps, each already carrying its deliverable.
 *
 * `ProcessSection` used to pair `process[i]` with `phases[i].deliverable` by array
 * index, so reordering either file would have silently mismatched them. Joined on
 * `number` instead, and a missing counterpart throws here rather than rendering
 * `undefined` on the homepage.
 */
export async function getProcessSteps(): Promise<ProcessStepDetail[]> {
  const phases = loadProcessPhases();
  return loadProcessSteps().map((step) => {
    const phase = phases.find((p) => p.number === step.number);
    if (!phase) {
      throw new Error(
        `[data] process step ${step.number} ("${step.title}") has no matching phase in how-we-work`,
      );
    }
    return {
      ...step,
      deliverableLabel: phase.deliverableLabel,
      deliverable: phase.deliverable,
    };
  });
}

export async function getProcessPhases(): Promise<ProcessPhase[]> {
  return loadProcessPhases();
}

export async function getIntegrationGroups(): Promise<PlatformGroup[]> {
  return loadPlatformGroups();
}

export async function getAboutContent() {
  return loadAboutContent();
}

export async function getHowWeWorkContent() {
  return loadHowWeWorkContent();
}

export async function getIntegrationsContent() {
  return loadIntegrationsContent();
}
