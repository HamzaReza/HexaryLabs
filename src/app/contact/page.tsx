import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Annotation } from "@/components/ui/Annotation";
import { ClippedPanel } from "@/components/ui/ClippedPanel";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/content/site";
import { JsonLd, breadcrumbList } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell Hexary Labs what you're building. We'll get back to you within a business day.",
  path: "/contact",
});

const breadcrumbJsonLd = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

/* Expectation-setting copy (6.5-c), each line grounded in claims that already
   exist elsewhere on the site — response time from the form's own success
   message, project types from site.description, estimate guidance from the
   message placeholder, next steps from the Frame-the-problem deliverable. */
const expectations = [
  {
    label: "Response time",
    body: "We'll get back to you within a business day.",
  },
  {
    label: "What we take on",
    body: "SaaS platforms, AI-powered products, business systems, and the integrations that hold them together.",
  },
  {
    label: "For a useful estimate",
    body: "Tell us what you're building, the core problem it solves, and any key constraints — budget ceilings, deadlines, systems we'd have to work with.",
  },
  {
    label: "What happens next",
    body: "A short call to understand the problem, then a written scope: the goal in measurable terms, the constraints, and the one risk we'd prove first.",
  },
];

export default function ContactPage() {
  return (
    <Section tone="dark" className="texture-grid min-h-full">
      <JsonLd data={breadcrumbJsonLd} />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <Annotation>Contact</Annotation>
            <h1 className="mt-4 text-[2.125rem] leading-[1.2] tracking-[0.02em] md:text-[3rem] lg:text-h1">
              Let&rsquo;s Get Started.
            </h1>
            <p className="mt-8 max-w-[52ch] text-body-lg text-grey-300">
              Tell us what you&rsquo;re building. We&rsquo;ll get back to you
              within a business day.
            </p>

            <ul className="mt-12 flex flex-col gap-6 border-t-[0.8px] border-grey-700 pt-10">
              {expectations.map((item, i) => (
                <li key={item.label}>
                  <Annotation index={String(i + 1).padStart(2, "0")}>
                    {item.label}
                  </Annotation>
                  <p className="mt-2 max-w-[48ch] text-body text-grey-300">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-10 border-t-[0.8px] border-grey-700 pt-8 text-body text-grey-300">
              Prefer email or phone?{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-accent-hi"
              >
                {site.email}
              </a>{" "}
              or{" "}
              <a
                href={`tel:+${site.phone.replace(/\D/g, "")}`}
                className="text-white underline underline-offset-4 transition-colors duration-300 hover:text-accent-hi"
              >
                {site.phone}
              </a>
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ClippedPanel clip="lg" bordered className="bg-surface-dark">
              <ContactForm />
            </ClippedPanel>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
