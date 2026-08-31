/**
 * Homepage copy.
 *
 * These strings used to be typed directly into `Hero.tsx`, which meant the
 * homepage was the one page whose words could not be changed without changing
 * a component. They live here now, on the same footing as every other page's
 * content, so the API swap covers them too.
 */

/**
 * The hero headline: two sentences the design paints in two different inks —
 * the first mid-grey, the second near-black — broken across four lines by hand.
 *
 * The breaks are stored rather than left to the browser because they are the
 * designer's, not a consequence of the measure: the widest of the four lines is
 * 692px inside a 900px column, so nothing about the column width would produce
 * them. Set free, the same words wrap to three lines and the hero comes out
 * 72px short.
 *
 * Note that the ink change and the line breaks are independent — the second
 * sentence starts partway through the third line — which is why each line is a
 * list of runs rather than a string with a tone.
 *
 * Below `lg` the runs are joined and wrap to the viewport; the hand-set breaks
 * only apply where the design's column exists. Authored in sentence case and
 * rendered uppercase.
 */
export const homeHero = {
  headline: {
    lines: [
      [{ text: "From ambitious", tone: "lead" }],
      [{ text: "idea to production", tone: "lead" }],
      [
        { text: "system.", tone: "lead" },
        { text: "Built by one", tone: "emphasis" },
      ],
      [{ text: "team, end to end.", tone: "emphasis" }],
    ],
  },
  /**
   * The subhead's breaks are stored for a different reason than the
   * headline's: in the design these fall naturally inside a 517px box, but the
   * browser sets Inter fractionally narrower than Figma does, so the same box
   * fits one more word on the first line and the break lands a word late.
   * Holding the design's two lines is a rendering correction, not a design
   * decision — which is why it applies only where the design's column exists.
   */
  subhead: [
    "We’re a technology partner for founders, product",
    "leaders, and enterprises building serious software.",
  ],
  actions: [
    { label: "Start a Project", href: "/contact" },
    { label: "See Our Work", href: "/work" },
  ],
} as const;

/**
 * The proof line beside the stats. Client names are stored as slugs rather than
 * as pre-written links so the copy can't drift from the case studies it points
 * at — a renamed or unpublished study becomes a build-time failure in the data
 * layer instead of a 404 on the homepage.
 */
export const homeProof = {
  prefix: "The team behind",
  clients: [
    { label: "TrueCell", slug: "truecell" },
    { label: "Kinein", slug: "kinein" },
    { label: "B2B Access", slug: "b2b-access" },
  ],
} as const;

/**
 * The outcome block — designed, and absent from the previous build entirely.
 *
 * The diagram is a still export of the design's system-architecture
 * illustration. It is drawn in perspective across roughly forty nested layers,
 * so it ships as an image rather than as markup: reproducing it in the DOM
 * would be a large amount of non-semantic code for something that is a picture.
 */
export const homeOutcome = {
  heading: "Software built by people who own the outcome",
  body: "Hexary Labs is a software development studio: engineers, designers, and product specialists who take products from a rough idea to a system your own team can run without us.",
  diagram: {
    src: "/home/architecture.png",
    alt: "A system architecture diagram: a Next.js front end and a Fastify API feeding an AI orchestration layer, which in turn drives training pipelines, autonomous agents and community workflows.",
    width: 1638,
    height: 1052,
  },
} as const;
