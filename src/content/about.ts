/** About page copy. */

export type FailureMode = { title: string; body: string };

/**
 * The design turns this from three paragraphs of prose into a claim with two
 * named failure modes either side of it, so the copy is authored in that shape
 * rather than being split by the component.
 *
 * The build's third paragraph — on working as an embedded partner rather than a
 * vendor answering tickets — has no place in the design's composition and is
 * not carried over. It is worth re-homing rather than losing.
 */
export const whyWeExist = {
  heading: "Two ways software projects go wrong",
  intro:
    "Most software engagements fail in one of two directions — and the gap between them is the whole reason this studio exists.",
  modes: [
    {
      title: "Over-invested in strategy",
      body: "Months of workshops and decks that never turn into a working product. The thinking is sound; nothing ships.",
    },
    {
      title: "No strategy at all",
      body: "The wrong thing shipped quickly and confidently, then twice as long spent unwinding it.",
    },
  ] as FailureMode[],
  markerLabel: "Where we sit",
  closing:
    "Our team thinks in product terms and builds in engineering terms, in the same room, on the same timeline. The person scoping your roadmap is often the person who ends up shipping it, which removes the translation loss that happens when strategy, design and engineering live in separate teams talking through documents.",
};

export type TeamPrinciple = { title: string; body: string };

export const whosBehind = {
  heading: "A small, senior team, on purpose",
  intro:
    "Every client works directly with the engineers and designers building their software, never an account manager relaying requests. That's a deliberate constraint, not a limitation we're working around.",
  principles: [
    {
      title: "Every project, senior engineers",
      body: "No junior bench learning on your engagement.",
    },
    {
      title: "One team, start to finish",
      body: "The people who scope the work are the people who build it.",
    },
    {
      title: "A deliberate limit",
      body: "We cap how many engagements we take on at once, so attention doesn't get diluted.",
    },
  ] as TeamPrinciple[],
  proofLine:
    "The team behind Hexary Labs has shipped backend-heavy, integration-heavy systems: the inventory and marketplace-sync platform behind TrueCell, the bidirectional accounting integration behind Kinein, and the retailer-verification marketplace behind B2B Access.",
};

export type ExpertiseArea = { heading: string; body: string };

/**
 * The design answers this section with the stack scattered as chips rather than
 * described in prose, so `areas` and `closing` below are no longer rendered.
 * They are kept, not deleted: they are the only long-form statement of what the
 * studio builds with, and they are worth re-homing — on `/how-we-work`, or as
 * the body of a service page — rather than losing.
 */
export const whereExpertiseRanges = {
  heading: "The right technology for your business, not the one we'd default to",
  intro:
    "We don't push a favorite stack. We build around what a client's existing systems, team, and constraints actually require, and that means working across a genuinely broad range of technology.",
  areas: [
    {
      heading: "Modern software engineering",
      body: "Our engineering work spans web platforms, mobile applications, and the enterprise backend systems that run underneath them, across ecosystems including Node.js and TypeScript, React and Next.js, PHP and Laravel, .NET and C#, and Python and Django, with data layers built on PostgreSQL, MySQL, MongoDB, and Redis, deployed on AWS, Azure, or Google Cloud, and containerized with Docker and Kubernetes where scale demands it. That range matters in practice: it means a legacy system can be modernized in place instead of rebuilt from scratch when that's the more responsible path, and a new integration can be built in whatever ecosystem a client's existing team already works in, rather than forcing a rewrite just to match our preferences.",
    },
    {
      heading: "AI, built to hold up in production",
      body: "We help businesses adopt AI in ways that actually reduce work, not just in ways that demo well. That includes custom AI solutions built around a specific business process, integrations with leading AI providers such as OpenAI and Anthropic, retrieval-augmented systems that ground AI in a company's own data instead of generic answers, AI agents that carry out multi-step workflows, intelligent document processing, and chatbots wired into the platforms a business already runs on, from CRMs like Salesforce and HubSpot to internal tools and support systems. The emphasis throughout is on AI that removes real manual work from an existing process, not a feature added because AI was expected.",
    },
  ] as ExpertiseArea[],
  closing:
    "That range is what lets the same team move between a logistics inventory platform, a B2B commerce integration, and an AI-powered automation project, without a client needing a different vendor for each one.",
};

export type WhyChooseUsItem = { title: string; body: string };

export const whyChooseUs = {
  heading: "What that actually means for you",
  items: [
    {
      title: "Direct access to the team",
      body: "You work with the engineers and designers building your software, not an account manager relaying messages.",
    },
    {
      title: "Engineering rigour from day one",
      body: "Tests, observability, and CI are built in from the first sprint, not added before handover.",
    },
    {
      title: "Clean handovers, by design",
      body: "Documentation and a team walkthrough are part of every engagement, never an afterthought.",
    },
    {
      title: "Honest scoping",
      body: "If requested scope doesn't serve the goal, we say so before it's built, not after.",
    },
    {
      title: "We say no when we're not the fit",
      body: "We'd rather decline a project than learn on your budget.",
    },
    {
      title: "We fit around your stack",
      body: "Extending a system, building something new, or adding AI to a manual workflow, we adapt to what's there instead of starting over.",
    },
  ] as WhyChooseUsItem[],
};
