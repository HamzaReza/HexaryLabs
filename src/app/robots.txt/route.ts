import { site } from "@/content/site";

export function GET() {
  const body = `User-Agent: *
Content-Signal: search=yes, ai-train=no, ai-input=yes
Allow: /
Disallow: /privacy
Disallow: /terms
Disallow: /styleguide

Sitemap: ${site.url}/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
