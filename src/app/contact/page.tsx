import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { getContactCta } from "@/lib/data";
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

/**
 * The contact page is the closer composition on its own — same headline block
 * and form, a different headline, and the dot texture the design carries across
 * the whole surface here rather than the hex watermark used on the closers.
 */
export default async function ContactPage() {
  const contact = await getContactCta();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ContactSection heading={contact.pageHeading} className="texture-dots" />
    </>
  );
}
