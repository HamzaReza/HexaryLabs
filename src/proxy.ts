import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { buildHomepageMarkdown } from "@/lib/homepageMarkdown";

/**
 * "Markdown for Agents" content negotiation for the homepage: an agent that
 * sends `Accept: text/markdown` gets a markdown mirror of the page instead
 * of the HTML response. Browsers (which send `text/html,...`) are unaffected
 * — HTML stays the default.
 *
 * `Vary: Accept` is set on the markdown response (so caches don't serve it
 * for a plain HTML request). On the pass-through branch we also append it,
 * but Next's App Router sets its own `Vary` later for RSC purposes and
 * overwrites it there — a caching nicety we don't control, not a
 * correctness issue: the negotiation itself is per-request and unaffected.
 *
 * Scoped to `/` only for now (see matcher below); the same pattern can be
 * extended to other routes with per-page markdown builders later.
 */
export async function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";

  if (accept.includes("text/markdown")) {
    const markdown = await buildHomepageMarkdown();
    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        "x-markdown-tokens": String(Math.ceil(markdown.length / 4)),
      },
    });
  }

  const response = NextResponse.next();
  response.headers.append("Vary", "Accept");
  return response;
}

export const config = {
  matcher: "/",
};
