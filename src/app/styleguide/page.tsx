import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ClippedPanel } from "@/components/ui/ClippedPanel";
import { Annotation } from "@/components/ui/Annotation";
import { ConnectorLine } from "@/components/ui/ConnectorLine";
import { DirectionalMarker } from "@/components/ui/DirectionalMarker";
import { HexCluster, type HexCell } from "@/components/ui/HexCluster";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { UnderlineField } from "@/components/ui/UnderlineField";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Hexary Blueprint design system reference.",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "base", cls: "bg-base", note: "canvas" },
  { name: "base-2", cls: "bg-base-2", note: "alt section" },
  { name: "contrast", cls: "bg-contrast", note: "ink / text" },
  { name: "contrast-2", cls: "bg-contrast-2", note: "dark sections" },
  { name: "surface-dark", cls: "bg-surface-dark", note: "cards on dark" },
  { name: "accent", cls: "bg-accent", note: "signal" },
  { name: "accent-hi", cls: "bg-accent-hi", note: "signal on dark" },
  { name: "grey-100", cls: "bg-grey-100", note: "hairline light" },
  { name: "grey-200", cls: "bg-grey-200", note: "hairline light 2" },
  { name: "grey-300", cls: "bg-grey-300", note: "body on dark" },
  { name: "grey-500", cls: "bg-grey-500", note: "muted on dark only" },
  { name: "grey-600", cls: "bg-grey-600", note: "muted on light" },
  { name: "grey-700", cls: "bg-grey-700", note: "hairline dark" },
  { name: "success", cls: "bg-success", note: "results, light only" },
];

const clusterDemo: HexCell[] = [
  { q: 0, r: 0, role: "ink" },
  { q: 1, r: 0, role: "signal" },
  { q: 0, r: 1, role: "outline" },
  { q: 1, r: -1, role: "textured" },
  { q: -1, r: 1, role: "outline" },
];

const labeledCluster: HexCell[] = [
  { q: 0, r: 0, role: "ink", label: "Core" },
  { q: 1, r: 0, role: "outline", label: "API" },
  { q: 0, r: 1, role: "outline", label: "Data" },
];

function Swatch({ name, cls, note }: (typeof swatches)[number]) {
  return (
    <li className="flex flex-col gap-2">
      <div className={`h-16 border-[0.8px] border-grey-200 ${cls}`} />
      <p className="font-mono text-small text-grey-600 [[data-tone=dark]_&]:text-grey-300">
        {name}
        <span className="block">{note}</span>
      </p>
    </li>
  );
}

function ButtonMatrix() {
  return (
    <div className="flex flex-col gap-6">
      {(["primary", "secondary", "accent"] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-4">
          <Annotation className="w-24">{variant}</Annotation>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Button key={size} variant={variant} size={size}>
              Start a Project
            </Button>
          ))}
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <Annotation>block</Annotation>
        <Button variant="block">Start a Project</Button>
      </div>
    </div>
  );
}

function PanelRow() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <ClippedPanel clip="sm" className="bg-base-2 p-6">
        <Annotation index="01">clip sm / 10px</Annotation>
        <p className="mt-3 text-body">Buttons, chips, form fields.</p>
      </ClippedPanel>
      <ClippedPanel clip="md" bordered className="bg-base p-6">
        <Annotation index="02">clip md / 18px</Annotation>
        <p className="mt-3 text-body">Cards and panels, bordered variant.</p>
      </ClippedPanel>
      <ClippedPanel clip="lg" bordered className="texture-dots bg-base p-6">
        <Annotation index="03">clip lg / 28px</Annotation>
        <p className="mt-3 text-body">Heroes, section frames, textured.</p>
      </ClippedPanel>
    </div>
  );
}

function LineRow() {
  return (
    <div className="flex flex-wrap items-center gap-8 text-grey-600 [[data-tone=dark]_&]:text-grey-300">
      <ConnectorLine length={96} />
      <ConnectorLine length={96} arrow />
      <ConnectorLine length={96} arrow crosshair="start" />
      <ConnectorLine length={96} crosshair="both" />
      <ConnectorLine orientation="v" length={64} arrow />
      <DirectionalMarker />
      <DirectionalMarker direction="down" />
      <Reveal variant="draw">
        <svg width="120" height="12" viewBox="0 0 120 12" aria-hidden="true">
          <line
            x1="1"
            y1="6"
            x2="119"
            y2="6"
            data-draw
            style={{ "--draw-length": 118 } as React.CSSProperties}
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </svg>
      </Reveal>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Section tone="light" className="texture-grid">
        <Container>
          <Annotation index="00">Hexary Blueprint</Annotation>
          <h1 className="mt-4 text-[2.125rem] leading-[1.2] md:text-[3rem] lg:text-h1">
            Design system reference
          </h1>
          <p className="mt-6 max-w-[60ch] text-body-lg text-grey-600">
            Living reference for the Blueprint system: tokens, primitives,
            textures, and motion, rendered in every tone. Internal only —
            noindex, excluded from the sitemap.
          </p>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <h2 className="text-h3">Colour</h2>
          <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
            {swatches.map((s) => (
              <Swatch key={s.name} {...s} />
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <h2 className="text-h3">Type</h2>
          <div className="mt-8 flex flex-col gap-6">
            <p className="text-h1">Heading one</p>
            <p className="text-h2">Heading two</p>
            <p className="text-h3">Heading three</p>
            <p className="text-h4 font-display">Heading four</p>
            <p className="max-w-[60ch] text-body-lg text-grey-600">
              Body large — Inter 18px. The quick brown fox jumps over the lazy
              dog while the deploy pipeline stays green.
            </p>
            <p className="max-w-[60ch] text-body text-grey-600">
              Body — Inter 16px. The quick brown fox jumps over the lazy dog
              while the deploy pipeline stays green.
            </p>
            <Annotation index="01">Annotation — IBM Plex Mono</Annotation>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <h2 className="text-h3">Buttons</h2>
          <div className="mt-8">
            <ButtonMatrix />
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <h2 className="text-h3">Clipped panels</h2>
          <div className="mt-8">
            <PanelRow />
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <h2 className="text-h3">Hex modules</h2>
          <div className="mt-8 flex flex-wrap items-center gap-16">
            <HexCluster
              cells={clusterDemo}
              label="Demo cluster: ink, signal, outline, and textured tiles on a shared-edge lattice"
            />
            <HexCluster
              cells={labeledCluster}
              label="Labeled cluster: core, API, and data tiles"
            />
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <h2 className="text-h3">Lines, markers, draw</h2>
          <div className="mt-8">
            <LineRow />
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <h2 className="text-h3">Textures</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="texture-dots h-40 border-[0.8px] border-grey-200 bg-base" />
            <div className="texture-grid h-40 border-[0.8px] border-grey-200 bg-base" />
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <h2 className="text-h3">Dark tone</h2>
          <p className="mt-4 max-w-[60ch] text-body-lg text-grey-300">
            Every primitive re-colours itself under{" "}
            <span className="font-mono">data-tone=&quot;dark&quot;</span> — no
            tone props.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <ClippedPanel clip="md" bordered className="bg-surface-dark p-6">
              <Annotation index="04">panel on dark</Annotation>
              <p className="mt-3 text-body text-grey-300">
                Bordered clipped panel on a dark section.
              </p>
            </ClippedPanel>
            <div className="texture-dots flex items-center justify-center border-[0.8px] border-grey-700 bg-surface-dark p-6">
              <HexCluster
                cells={[
                  { q: 0, r: 0, role: "ink" },
                  { q: 1, r: 0, role: "signal" },
                  { q: 0, r: 1, role: "outline" },
                ]}
                label="Dark-tone cluster demo"
              />
            </div>
          </div>
          <div className="mt-10 rounded-lg bg-surface-dark p-6 sm:p-8">
            <Annotation index="05">form fields</Annotation>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-6">
              <UnderlineField
                id="sg-empty"
                label="Empty — label at rest"
                name="sg-empty"
              />
              <UnderlineField
                id="sg-filled"
                label="Filled — label floated"
                name="sg-filled"
                defaultValue="Hexary Labs"
              />
              <UnderlineField
                id="sg-error"
                label="Error"
                name="sg-error"
                error="Enter a valid email address."
              />
            </div>
          </div>

          <p className="mt-10 font-display text-stat font-medium">
            <CountUp value={99} suffix="%" />
          </p>
        </Container>
      </Section>
    </>
  );
}
