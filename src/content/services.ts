/**
 * Service offerings.
 *
 * Structure (4 services) is final — it drives the nav dropdown, the homepage
 * Services section (via ServicesExplorer + `summary`), and the /services/[slug]
 * routes. `title` and `summary` are also consumed by the homepage, so their
 * values are left as-is here; everything else below is specific to the
 * /services pages themselves.
 */

export type ServiceStep = { number: string; title: string; body: string };
export type ServiceFaq = { question: string; answer: string };
export type ComparisonRow = {
  label: string;
  inHouse: string;
  freelancer: string;
  hexary: string;
};

export type Service = {
  slug: string;
  title: string;
  /** Short teaser — nav dropdown, footer, and the homepage services rows. */
  summary: string;

  /** /services overview page teaser card. */
  teaserQuote: string;
  teaserBestFor: string;

  /** Homepage services expansion (5.3): related evidence + mini diagram. */
  explore: {
    caseStudySlug: string;
    diagram: [string, string, string];
  };

  /** /services/[slug] hero. */
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  heroCta: string;

  whoItsFor: string[];
  /** "The real cost of skipping this" / "Why most AI projects stall" — optional, not every service has this beat. */
  cost?: { heading: string; body: string };
  included: string[];
  approach: ServiceStep[];
  /** Software Engineering only. */
  comparison?: ComparisonRow[];
  /**
   * AI Engineering only. Deliberately unnamed/generic (no invented company) —
   * an illustrative scenario, not a real client or case study. Do not present
   * as a real client anywhere in UI copy.
   */
  illustrativeExample?: string;
  outcomes: string[];
  /** Software Engineering only — a supporting proof line below the outcomes grid. */
  outcomesProofLine?: string;
  faqs: ServiceFaq[];
  closingHeading: string;
  closingCta: string;
};

export const services: Service[] = [
  {
    slug: "product-strategy",
    explore: { caseStudySlug: "keepcoming", diagram: ["Idea", "Risks", "Roadmap"] },
    title: "Product Strategy",
    summary: "Know what to build before you spend a cent building it.",

    teaserQuote:
      "For when you need to know what to build before you spend a cent building it.",
    teaserBestFor:
      "founders and product leads with an idea, a messy backlog, or a board that wants a plan before approving budget.",

    heroEyebrow: "Product Strategy",
    heroHeadline: "Know what to build before you spend a cent building it",
    heroSubhead:
      "We turn a rough idea or a messy backlog into a validated, fundable plan, before the expensive part starts.",
    heroCta: "Start With a Strategy Call",

    whoItsFor: [
      "You have an idea, but no one outside your own team has validated it yet",
      "You're deciding between multiple possible directions (a redesign, a new product, a pivot) and need to know which one is actually worth the investment",
      "Your last build went over budget because scope kept shifting mid-project",
      "You're raising, and investors want a credible technical plan, not just a pitch deck",
      "You've got a backlog with fifty items on it and no confident way to rank them",
      "You inherited a roadmap you don't fully trust",
    ],
    cost: {
      heading: "The real cost of skipping this",
      body: "Teams that skip strategy rarely fail because they picked a bad idea. They fail because they built the wrong version of a good one, at full engineering cost, and only found out after launch. A week spent validating the riskiest assumption is cheap. Discovering it was wrong six months into a build is not.",
    },
    included: [
      "Stakeholder and user interviews to surface the real problem, not just the requested feature",
      "A competitive and market scan: what exists, what's actually working, for whom",
      "A technical feasibility pass on the one or two assumptions the whole plan rests on",
      "A prioritized roadmap with an explicit build, buy, or skip call on every major piece of scope",
      "A recommended team shape and rough budget range for execution, so the plan comes with a realistic sense of what delivering it will actually take",
      "A written strategy document with phased effort estimates, built to hand to any engineering team, ours or someone else's",
    ],
    approach: [
      {
        number: "01",
        title: "Discover",
        body: "Interviews with your team and, where useful, your users, plus a scan of what's already working for comparable products.",
      },
      {
        number: "02",
        title: "Validate",
        body: "We test the riskiest assumption in the plan before anyone commits engineering budget to it. Cheap to check now, expensive to discover wrong later.",
      },
      {
        number: "03",
        title: "Plan",
        body: "A phased roadmap with a clear answer to what ships first, what waits, and what gets cut, backed by effort estimates you can actually budget against.",
      },
    ],
    outcomes: [
      "A roadmap you can defend to a board, an investor, or your own team",
      "Engineering estimates grounded in a feasibility check, not a guess",
      "A confident answer to \"what do we build first\"",
      "If you continue into Software Engineering with us, this document becomes sprint one, no re-scoping needed",
    ],
    faqs: [
      {
        question: "How is this different from a technical audit?",
        answer:
          "An audit reviews what already exists. This is forward-looking: it's for deciding what to build next, whether that's a new product or the next phase of one you already have.",
      },
      {
        question: "Will you build what you plan, or is this standalone?",
        answer:
          "Either. Some clients take the roadmap to their own team, others continue straight into our Software Engineering service. The document is built to work either way.",
      },
      {
        question: "We already have a partial roadmap. Can you just validate the risky parts?",
        answer:
          "Yes. We regularly come in mid-stream to stress-test an existing plan rather than starting from zero.",
      },
      {
        question: "How long does this take?",
        answer: "Typically one to three weeks, depending on how much groundwork already exists.",
      },
    ],
    closingHeading: "Get a plan you can actually budget against",
    closingCta: "Start With a Strategy Call",
  },
  {
    slug: "product-design",
    explore: { caseStudySlug: "eden", diagram: ["Research", "Flows", "UI"] },
    title: "Product Design",
    summary: "Design that holds up once real users touch it.",

    teaserQuote:
      "For when the product works but doesn't yet look, feel, or convert like it should.",
    teaserBestFor:
      "teams with a working product that needs consistency, or a new product that needs to get the first impression right.",

    heroEyebrow: "Product Design",
    heroHeadline: "Design that holds up once real users touch it",
    heroSubhead:
      "Research, interface design, and a design system built for the product you'll have in a year, not just the version shipping next week.",
    heroCta: "Start a Design Engagement",

    whoItsFor: [
      "Your product works, but users get lost or drop off in flows that should be simple",
      "Every new feature looks like it was designed by a different team",
      "You're about to launch or raise, and the product doesn't yet look as credible as the business behind it",
      "Your engineering team ships faster than your design keeps up, and it shows",
    ],
    cost: {
      heading: "The real cost of skipping this",
      body: "An inconsistent interface erodes trust even when the backend behind it is solid, users judge reliability by what they can see. And shipping a design straight from an internal opinion, without testing it against real users first, means finding out what doesn't work after it's already built.",
    },
    included: [
      "User research: interviews, usability testing on existing flows, or a competitive UX audit",
      "Wireframes and information architecture for new flows",
      "High-fidelity UI design",
      "Accessibility and responsive behavior considered from the start, not patched in after launch",
      "A design system: reusable components, tokens, and documentation, so new screens stay consistent without a designer reviewing every one",
      "A clickable prototype, tested with real users before engineering starts building it",
    ],
    approach: [
      {
        number: "01",
        title: "Research",
        body: "Understand where users actually get stuck, not where we assume they do.",
      },
      {
        number: "02",
        title: "Design",
        body: "Wireframes through to high-fidelity UI, grounded in the research, not a visual refresh layered on top of it.",
      },
      {
        number: "03",
        title: "Validate",
        body: "Test the prototype with real users before a single line of production code gets written against it.",
      },
      {
        number: "04",
        title: "Systemize",
        body: "Turn the result into a component library, so consistency holds as the product grows, with or without a designer in the room for every new screen.",
      },
    ],
    outcomes: [
      "Fewer redesigns after launch, because the risky assumptions were tested before the build, not after",
      "A design system your own team (or ours) can extend without redesigning from scratch each time",
      "Higher completion rates on the flows that actually matter to the business",
    ],
    faqs: [
      {
        question: "Do you design in Figma, or straight into code?",
        answer:
          "Figma first, always tested as a prototype before anything gets built. That's cheaper to change than production code.",
      },
      {
        question: "Can you work with our existing brand instead of starting over?",
        answer:
          "Yes, most engagements build on an existing brand rather than replacing it. We'll tell you honestly if something is actively working against you, but we don't redesign for its own sake.",
      },
      {
        question: "Do you test with real users, or just internally?",
        answer:
          "Real users, wherever possible. Internal opinions are useful but they're not a substitute for watching someone unfamiliar with the product try to use it.",
      },
      {
        question: "Can this run alongside an engineering team we already have?",
        answer:
          "Yes. Design and engineering don't have to be the same vendor, we hand off design systems that are built to be implemented by any competent engineering team.",
      },
    ],
    closingHeading: "Let's make the product match the business behind it",
    closingCta: "Start a Design Engagement",
  },
  {
    slug: "software-engineering",
    explore: { caseStudySlug: "truecell", diagram: ["API", "Data", "Deploy"] },
    title: "Software Engineering",
    summary: "Software that's still easy to change a year from now.",

    teaserQuote: "For building, scaling, or connecting the systems your business actually runs on.",
    teaserBestFor:
      "teams ready to build, rebuild past a system that's outgrown itself, or connect tools that were never meant to talk to each other.",

    heroEyebrow: "Software Engineering",
    heroHeadline: "Software that's still easy to change a year from now",
    heroSubhead:
      "Web, mobile, and backend platforms built to scale, with the tests, observability, and documentation that keep it maintainable long after we've handed it over.",
    heroCta: "Start Building",

    whoItsFor: [
      "Your current system can't handle the growth you're actually planning for",
      "You've outgrown a no-code tool or an early MVP that was never meant to scale",
      "Two or more of your business systems don't talk to each other, and someone is manually reconciling the gap",
      "A previous engineering partner left you a system only they understood",
      "You need an honest technical opinion on a system someone else built, before committing further budget to it",
      "You need to move faster without quietly cutting corners on quality",
    ],
    included: [
      "Web platforms, mobile apps, and backend systems, built in whichever ecosystem fits what you already run, whether that's a Node.js and TypeScript stack, a PHP and Laravel codebase, a .NET environment, or a Python-based platform, chosen for what serves your team and your growth plans, not for what we'd default to",
      "System integrations that connect the tools your business already depends on, so data stops needing to be manually reconciled between them",
      "Test coverage, CI/CD pipelines, and observability from day one, not a cleanup pass added before handover",
      "Infrastructure setup and management across AWS, Azure, or Google Cloud, containerized with Docker and orchestrated with Kubernetes where scale actually calls for it",
      "Documentation written for the team that inherits the system, not just for us",
    ],
    approach: [
      {
        number: "01",
        title: "Frame the problem",
        body: "Agree in writing on what success looks like, what constraints are real, and what we're deliberately not building.",
      },
      {
        number: "02",
        title: "Prove the risky part first",
        body: "Every project has one piece most likely to sink it: an unproven integration, a performance question that only shows up at scale. We build that piece first, while it's still cheap to change course.",
      },
      {
        number: "03",
        title: "Build in the open",
        body: "Working software every week, not a status update about it. Feedback happens in days, not at the end of a silent six-week sprint.",
      },
      {
        number: "04",
        title: "Hand over cleanly",
        body: "Tests, documentation, and a walkthrough with your team are part of the engagement, not an optional add-on at the end.",
      },
    ],
    comparison: [
      {
        label: "Ramp-up time",
        inHouse: "Weeks to months before full productivity",
        freelancer: "Fast start, but variable depth",
        hexary: "Fast start, senior from day one",
      },
      {
        label: "Seniority on the work",
        inHouse: "Depends who you hire",
        freelancer: "Depends who you find",
        hexary: "Senior engineers on every engagement, by design",
      },
      {
        label: "Accountability if something breaks",
        inHouse: "Sits with one person",
        freelancer: "Often ends when the contract does",
        hexary: "Sits with the team that built it, documented for handover",
      },
      {
        label: "Documentation and handover",
        inHouse: "Varies by individual habits",
        freelancer: "Frequently the first thing skipped",
        hexary: "Built into every engagement, not optional",
      },
      {
        label: "Range of disciplines available",
        inHouse: "Whatever that hire specializes in",
        freelancer: "Usually one discipline at a time",
        hexary: "Strategy, design, engineering, and AI, on the same team",
      },
    ],
    outcomes: [
      "A system that scales without needing a rebuild in a year",
      "Integrations that stop requiring a person to manually reconcile the gap between two tools",
      "Faster release cycles, because tests and CI were built in from the start, not bolted on afterward",
      "A team that can actually maintain what we built, without calling us every time something breaks",
    ],
    outcomesProofLine:
      "The same team behind this service has built the inventory and marketplace-sync platform behind TrueCell, the bidirectional accounting integration behind Kinein, and the retailer-verification marketplace behind B2B Access, the kind of connective, integration-heavy work this service is built around.",
    faqs: [
      {
        question: "Do you work with our existing codebase, or only greenfield builds?",
        answer:
          "Both. A large share of our work is extending or modernizing an existing system rather than starting from zero.",
      },
      {
        question: "We already have an in-house team. Can you work alongside them?",
        answer: "Yes, regularly. We're used to plugging into an existing team's workflow rather than replacing it.",
      },
      {
        question: "What does \"clean handover\" actually include?",
        answer:
          "Tests, documentation written for your team specifically (not generic README notes), and a live walkthrough before we consider the engagement closed.",
      },
      {
        question: "How do you handle support after launch?",
        answer:
          "That's scoped per engagement, from a defined warranty period to an ongoing retainer, depending on what the project actually needs.",
      },
    ],
    closingHeading: "Tell us what you're trying to build",
    closingCta: "Start Building",
  },
  {
    slug: "ai-engineering",
    explore: { caseStudySlug: "medical-records-platform", diagram: ["Data", "Model", "Evals"] },
    title: "AI Engineering",
    summary: "AI that works in production, not just in the demo.",

    teaserQuote: "For AI that survives contact with real users, not just a demo.",
    teaserBestFor:
      "teams with a specific process (support, document handling, internal ops) they want to make faster with AI that's actually been evaluated.",

    heroEyebrow: "AI Engineering",
    heroHeadline: "AI that works in production, not just in the demo",
    heroSubhead:
      "We treat AI features as software: evaluated before we build, grounded in your own data, and monitored after we ship, not judged on how good the demo looked.",
    heroCta: "Talk to Us About AI",

    whoItsFor: [
      "Your team spends real hours every week on a task that's mostly pattern recognition: support triage, document review, categorization",
      "You tried an AI pilot that looked great in testing and fell apart the moment real users touched it",
      "You're sitting on valuable internal data that nobody's actually using to speed up decisions",
      "You want AI in your product, but not a feature that confidently makes things up in front of a customer",
    ],
    cost: {
      heading: "Why most AI projects stall",
      body: "Building an AI demo is easy. Building an AI feature that holds up under real, messy, adversarial usage is not. Most AI projects that stall don't fail because of the model, they fail because nobody defined what \"good enough to ship\" actually meant before building started, so there was no way to know if it was ready.",
    },
    included: [
      "Problem scoping: an honest read on whether this is actually an AI problem, or a data or workflow problem wearing an AI costume",
      "Retrieval-augmented systems that ground answers in your own data, instead of a generic model guessing at your business",
      "AI agents that carry out multi-step workflows, not just single-turn responses",
      "An evaluation harness built before the feature, so \"is this good enough to ship\" has a real, tested answer",
      "Production deployment behind feature flags, with monitoring and a fallback path for when the model is wrong",
      "Integrations with leading AI providers such as OpenAI and Anthropic, and with the business platforms you already run on, from CRMs like Salesforce and HubSpot to internal tools and support systems",
      "Intelligent document processing that turns unstructured files (PDFs, scanned forms, emails) into structured, usable data",
      "Chatbots and conversational interfaces, built on the same grounding and evaluation approach as everything else here, not treated as a lesser afterthought feature",
    ],
    approach: [
      {
        number: "01",
        title: "Scope",
        body: "Confirm this is genuinely an AI-shaped problem before writing any code.",
      },
      {
        number: "02",
        title: "Ground",
        body: "Connect the feature to your actual data and systems, so it answers from what's true for your business.",
      },
      {
        number: "03",
        title: "Evaluate",
        body: "Build a labeled evaluation set before the feature exists, so shipping is a judgment backed by evidence, not a guess.",
      },
      {
        number: "04",
        title: "Ship and monitor",
        body: "Deploy behind a feature flag with a fallback path, then tune based on real usage, not just launch-day performance.",
      },
    ],
    illustrativeExample:
      "A mid-market logistics operation manually sorting hundreds of incoming vendor invoices a week can move to automatic extraction and routing, with low-confidence cases flagged for a human instead of guessed at, cutting a multi-day manual process down to hours.",
    outcomes: [
      "An AI feature that's been tested against a real evaluation set, not just a demo script",
      "A monitored production deployment with a defined fallback when the model is uncertain",
      "Less manual time spent on the process the AI now handles",
      "A system that's honest about its own limits, instead of one that confidently gets things wrong",
    ],
    faqs: [
      {
        question: "Which AI providers do you work with?",
        answer:
          "We integrate with leading providers such as OpenAI and Anthropic, and choose based on what fits the specific task, cost profile, and data sensitivity of your project, not a single default.",
      },
      {
        question: "How do you keep it from hallucinating in front of customers?",
        answer:
          "Grounding the feature in your actual data, building an evaluation set before launch, and keeping a human-in-the-loop fallback for low-confidence cases. None of that is optional in how we build these.",
      },
      {
        question: "We already have an AI feature that isn't working well. Can you fix it instead of starting over?",
        answer: "Often, yes. A lot of AI engagements start as a diagnosis of an existing feature rather than a rebuild from scratch.",
      },
      {
        question: "How long before we see something in production?",
        answer:
          "Typically three to eight weeks for a first version, depending on how ready your data is and how complex the integration is.",
      },
    ],
    closingHeading: "Let's figure out if this is actually an AI problem",
    closingCta: "Talk to Us About AI",
  },
];

/** /services overview page — hero, "not sure which one" callout, closing CTA. */
export const servicesOverview = {
  hero: {
    eyebrow: "Services",
    headline: "Four ways we help you build the right thing, and build it well",
    subhead:
      "Most engagements start with one of these and pull in the others as the project needs them. Here's what each one actually solves.",
    cta: "Start a Project",
  },
  notSure: {
    heading: "Not sure which one fits?",
    body: "Tell us where you're stuck and we'll tell you honestly what you actually need, even when that's less than what you asked about.",
    cta: "Start a Project",
  },
  closing: {
    heading: "Tell us what you're building",
    cta: "Start a Project",
  },
};
