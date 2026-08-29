/**
 * Page-level content queries — the copy blocks that aren't services or case studies.
 */

import {
  loadAboutContent,
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
  PlatformGroup,
  ProcessPhase,
  ProcessStepDetail,
  Stat,
  TechGroup,
} from "./types";

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

/**
 * Every integrated platform name, flattened. Was computed inline in
 * `CapabilitiesBand`.
 */
export async function getPlatformNames(): Promise<string[]> {
  return loadPlatformGroups().flatMap((group) =>
    group.platforms.map((platform) => platform.name),
  );
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
