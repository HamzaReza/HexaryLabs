import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
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

export default function ContactPage() {
  return (
    <Section tone="light">
      <JsonLd data={breadcrumbJsonLd} />
      <Container>
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <h1 className="text-[2.125rem] leading-[1.2] tracking-[0.02em] md:text-[3rem] lg:text-h1">
            Let&rsquo;s Get Started.
          </h1>
          <p className="mx-auto mt-8 max-w-[52ch] text-body-lg text-grey-600">
            Tell us what you&rsquo;re building. We&rsquo;ll get back to you
            within a business day.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-[42rem] lg:mt-16">
          <ContactForm />

          <p className="mt-8 text-center text-body text-grey-600">
            Prefer email or phone? Reach us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-contrast-2 underline underline-offset-4 transition-colors duration-300 hover:text-accent"
            >
              {site.email}
            </a>{" "}
            or{" "}
            <a
              href={`tel:+${site.phone.replace(/\D/g, "")}`}
              className="text-contrast-2 underline underline-offset-4 transition-colors duration-300 hover:text-accent"
            >
              {site.phone}
            </a>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
