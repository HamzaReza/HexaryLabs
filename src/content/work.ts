export const WORK_INTRO =
  "Six engagements that show what we build: AI-native products, SaaS running in production, PHI-safe enterprise platforms, and the integration and automation work that connects the tools our clients already depend on. Different scales, different stacks, one team behind all of them.";

export type WorkImageSize = "small" | "rectangle" | "full";
export type WorkImage = { src: string; alt: string; size: WorkImageSize };

export type GradientTone = "violet" | "slate" | "sand";

export type Cover =
  | { kind: "photo"; src: string; alt: string; objectPosition?: "top" | "center" | "left" }
  | { kind: "gradient"; tone: GradientTone }
  | {
      kind: "schematic";
      diagram?: "halcyon" | "eden" | "medical-records" | "social-lead-capture";
    };

export type Metric = { value: string; label: string };

export type CaseSection = {
  heading: string;
  body: string[];
  images?: WorkImage[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  /**
   * What the work is called on `/work`. Defaults to `title`; set only where the
   * design shows something else — Eden's row is headed by the studio's name
   * rather than the product's.
   */
  displayName?: string;
  summary: string;
  category: string;
  featured?: boolean;
  scope?: string[];
  /** The case study's own visual — usually its architecture diagram. */
  cover: Cover;
  /**
   * The image the `/work` row uses, when that differs from `cover`. The design
   * fronts most rows with a product screenshot but keeps the diagram on the
   * study itself; only Eden needs both.
   */
  rowCover?: Cover;
  /** "4-8 weeks". Shown in the study's spec panel; omitted where unknown. */
  duration?: string;
  heroMetric?: Metric;
  metrics: Metric[];
  challenge: CaseSection;
  approach: CaseSection;
  solution: CaseSection;
  stack: string[];
  results: CaseSection;
  quote?: { text: string; attribution: string };
  links?: { label: string; href: string }[];
};

export const work: CaseStudy[] = [
  {
    slug: "eden",
    category: "AI Platform",
    featured: true,
    client: "Eden Labs",
    title: "Eden",
    displayName: "Eden Labs",
    summary:
      "A studio for autonomous creative AI, where agents make art, video, and stories with people and with each other.",
    scope: [
      "Web application (Next.js)",
      "Backend API (Fastify)",
      "AI orchestration layer (FastAPI)",
      "Custom model training pipeline",
      "Community workflow ecosystem",
      "Autonomous agent runtime",
    ],
    cover: { kind: "schematic", diagram: "eden" },
    rowCover: {
      kind: "photo",
      src: "/work/eden.webp",
      alt: "The Eden agents directory, showing featured autonomous creative agents with their authors, descriptions and chat counts",
    },
    metrics: [
      {
        value: "Live",
        label: "Public product at app.eden.art — agents, custom model training, multi-modal generation",
      },
      {
        value: "Open",
        label: "Open-source foundation, a developer SDK, and a documented API at docs.eden.art",
      },
      { value: "Active", label: "Community across Discord, X, and Instagram" },
    ],
    challenge: {
      heading: "Challenge",
      body: [
        "The generative AI space is dominated by single-shot prompt-and-response tools: type a prompt, get an image, close the tab. Eden set out to build something more ambitious: a platform where creators could build persistent, autonomous AI agents with their own personalities, their own custom-trained visual models, and the ability to collaborate with humans and with each other on multi-step creative work.",
        "That meant solving problems the space doesn't have textbook answers for yet. Training custom visual models on user-provided samples at reasonable cost. Running a workflow ecosystem where community-contributed tools (ComfyUI pipelines) could be called autonomously by agents and earn their creators revenue when used. Giving agents context, tools, and identity that persist across sessions. And building all of it on an open-source foundation so the platform stays extensible.",
      ],
    },
    approach: {
      heading: "Approach",
      body: [
        "Eden is a research-shaped product: a lot of what we built wasn't yet standard practice in the industry when we built it. We approached it the way we approach any AI system that has to hold up in production: treat the model as software, not as magic. Build a testable, observable pipeline. Ship in small, working increments so the team can see what's working and what needs to be reshaped, not wait for a big-bang reveal at the end.",
        "The model training pipeline was the highest-risk piece. We built it first, isolated on GCP, and proved it end-to-end (sample images in, custom model out, usable in the agent runtime) before wiring it into the platform proper.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "A creative studio in the browser. The core experience at app.eden.art is a Next.js application where creators build agents, train custom visual models, and generate multi-modal work (image, video, audio). We built the frontend and the Fastify (Node.js) backend that powers it.",
        "An AI orchestration API. A FastAPI (Python) service handles the actual generation and agent execution: model calls, tool use, workflow orchestration. This is what turns \"run this agent\" into \"the agent uses these ComfyUI workflows in this order and returns this output.\"",
        "A custom model training pipeline on GCP. Users can train their own visual models on their own sample images using our Flux LoRA training pipeline deployed on Google Cloud. This is what makes Eden feel personal: the agents are creating in a style trained on the creator's own work, not a generic model's default.",
        "A workflow ecosystem for contributors. ComfyUI workflows contributed by the community become tools that any agent on the platform can use, and contributors earn revenue when their workflows get called. This is the piece that turns Eden from a product into a platform.",
        "Autonomous agents. Named agents like Eve (Eden's flagship creative agent) can hold conversations, use the full workflow toolchain, and produce multi-step creative outputs, art, video, stories, without the user prompting at every step.",
      ],
    },
    stack: [
      "Next.js",
      "Fastify (Node.js)",
      "FastAPI (Python)",
      "Google Cloud Platform",
      "ComfyUI",
      "Flux LoRA",
      "Stable Diffusion pipelines",
    ],
    results: {
      heading: "Results",
      body: [
        "Eden is live at app.eden.art with public agents, custom model training, and multi-modal generation available to creators today.",
        "The platform runs on an open-source foundation, with an SDK developers can use to build on top of, and a documented API at docs.eden.art.",
        "The ComfyUI workflow ecosystem lets community contributors earn revenue when their tools get used by agents on the platform.",
        "Active community across Discord, X, and Instagram.",
      ],
    },
    links: [
      { label: "Live platform", href: "https://app.eden.art" },
      { label: "Marketing site", href: "https://eden.art" },
      { label: "Documentation", href: "https://docs.eden.art" },
      { label: "GitHub organization", href: "https://github.com/edenartlab" },
      { label: "Agent runtime (open source)", href: "https://github.com/edenartlab/eve" },
      { label: "LoRA trainer (open source)", href: "https://github.com/edenartlab/flux-trainer" },
    ],
  },
  {
    slug: "keepcoming",
    category: "SaaS Product",
    client: "In-house Hexary product",
    title: "KeepComing",
    summary:
      "A loyalty platform for cafes, restaurants, and independent shops, with real Apple Wallet and Google Wallet integration, a public developer API, and a partners program for third-party integrations.",
    scope: [
      "Multi-tenant SaaS platform",
      "Apple Wallet & Google Wallet integration",
      "Real-time card updates",
      "Birthday & reward automations",
      "Developer API & docs",
      "Partners program",
    ],
    cover: {
      kind: "photo",
      src: "/work/keepcoming.png",
      alt: "KeepComing's marketing key art, showing the KeepComing logo and a loyalty card in Apple Wallet",
      objectPosition: "left",
    },
    rowCover: {
      kind: "photo",
      src: "/work/keepcoming-row.webp",
      alt: "A KeepComing digital loyalty card at four of five stamps, beside the QR code a customer scans to earn the next one",
    },
    metrics: [
      { value: "Live", label: "Paid customers in production at www.keepcoming.app" },
      { value: "3 plans", label: "$19–$79/mo, with a 14-day trial that requires no credit card" },
      { value: "Platform", label: "Public developer API and partners program for third-party integrations" },
    ],
    challenge: {
      heading: "Challenge",
      body: [
        "Small independent businesses, cafes, restaurants, salons, barbers, retail shops, run on regulars. The paper punch card is the oldest, most reliable retention tool in that world, and it's also the most fragile: cards get lost, forgotten, or thrown in a drawer. Every existing digital alternative asked customers to download yet another app, which is exactly the friction that kills adoption at the counter.",
        "We wanted to build something a customer could opt into in under fifteen seconds, with no download, no account setup, and no card to lose, using infrastructure they already carry: Apple Wallet and Google Wallet. And we wanted to do it for a segment (independent shops) that most SaaS loyalty tools ignore because average revenue per customer is too small for enterprise sales motions.",
      ],
    },
    approach: {
      heading: "Approach",
      body: [
        "The two hardest technical pieces (real Apple Wallet and Google Wallet integration, and reliable real-time updates to cards already installed on customer phones) are exactly the pieces most SMB loyalty tools skip. We built those first, proved them end to end, and made them the foundation of the product rather than a nice-to-have.",
        "Zero-download onboarding was a design constraint we refused to compromise. Every friction point in the signup path was measured against a single question: does a customer complete this in under fifteen seconds with no help from staff. Anything that didn't clear that bar got cut or redesigned.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "KeepComing is a multi-tenant SaaS platform for digital loyalty programs. The core experience is deliberately simple: a shop signs up in minutes, sets a reward (say, a free coffee after five stars), and gets a QR code. Customers scan it, add the card to Apple Wallet or Google Wallet in one tap, and every visit updates the card on their phone in real time.",
        "Under that surface is the harder work: real integrations with Apple PassKit and Google Wallet APIs, push updates to cards that already live on the customer's phone, multi-channel delivery (QR, link, WhatsApp, email), and a multi-tenant architecture that keeps each shop's customers, staff accounts, and analytics fully isolated.",
        "Additional capability: birthday and reward automations that fire on their own once the shop sets the rules, staff scan pages that work from any phone camera without extra hardware, and an analytics view for shop owners to see visits, top customers, and redemption patterns. KeepComing also ships as a native mobile app, so shop owners can manage their loyalty program on the go.",
        "KeepComing is also designed as an ecosystem, not a closed product. A public developer API (documented at www.keepcoming.app/docs) lets third parties integrate loyalty into their own tools: POS systems, e-commerce platforms, marketing stacks, whatever a shop already runs on. And a partners program at www.keepcoming.app/partners opens the door for agencies, resellers, and technology partners to bring KeepComing into their own client work. Building for external integration from day one meant designing clean, versioned APIs and treating our own frontend as one client among many, which is why KeepComing can grow horizontally, into other businesses' workflows, instead of only vertically, into more features.",
      ],
    },
    stack: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Apple PassKit",
      "Google Wallet API",
      "WhatsApp Business API",
    ],
    results: {
      heading: "Results",
      body: [
        "Live at www.keepcoming.app with paid customers in production.",
        "Real Apple Wallet and Google Wallet integration, working on both iPhone and Android with real-time card updates.",
        "Public developer API and documentation, meaning third-party integrations are supported rather than blocked.",
        "Three-plan pricing model (Basic $19/mo, Pro $39/mo, Business $79/mo) with a 14-day trial that requires no credit card, a signal of confidence in the onboarding experience.",
      ],
    },
    links: [
      { label: "Live product", href: "https://www.keepcoming.app" },
      { label: "Pricing", href: "https://www.keepcoming.app/pricing" },
      { label: "Developer documentation", href: "https://www.keepcoming.app/docs" },
      { label: "Partners program", href: "https://www.keepcoming.app/partners" },
    ],
  },
  {
    slug: "medical-records-platform",
    category: "Enterprise Integration",
    featured: true,
    client: "A US-based medical records retrieval company (anonymized)",
    title: "Medical Records Integration & AI Platform",
    summary:
      "A PHI-safe integration platform connecting three case-management systems, with an AI backend that surfaces operational patterns from years of historical support tickets.",
    scope: [
      "Enterprise integration middleware",
      "AI engineering",
      "HIPAA-adjacent architecture",
      "Legal & healthcare tech",
      "Multi-system middleware",
    ],
    cover: {
      kind: "photo",
      src: "/work/medical-architecture.webp",
      alt: "System architecture: Litify (Salesforce), Filevine and Zendesk each connect to an integration middleware built on Laravel; Zendesk's tickets also feed an AI backend on Bedrock and Textract, which surfaces suggestions to staff tools",
    },
    rowCover: {
      kind: "photo",
      src: "/work/medical-architecture-row.webp",
      alt: "System architecture: three case-management systems connecting through an integration middleware to an AI backend and staff tools",
    },
    metrics: [
      { value: "87%", label: "Test coverage across roughly 380 automated tests" },
      { value: "Audited", label: "PHI-safe architecture reviewed by an external security firm, all findings remediated" },
      { value: "3 → 1", label: "Case-management systems (Litify, Filevine, Zendesk) unified into one workflow" },
      { value: "Suggest-only", label: "The AI backend never writes to a live ticket without human approval" },
    ],
    challenge: {
      heading: "Challenge",
      body: [
        "The client operates in a specialized corner of healthcare and legal services: retrieving patient medical records at scale for law firms handling personal-injury and malpractice cases. Their operations ran across three separate case-management systems, Litify on Salesforce for legal operations, Filevine for case management, and Zendesk for support and customer communication, and none of them talked to each other. Staff manually reconciled record requests, statuses, and updates across all three, several times a day, per record.",
        "Everything about the work is regulated. Patient data flowing through their systems includes Social Security numbers, dates of birth, medical records, and other protected health information. Any integration built for them had to hold up to HIPAA-adjacent standards: PHI redacted from stored payloads, excluded from queue serialization, hidden on model instances, and kept out of internal dashboards. Nothing in the design could depend on operators promising to look away.",
        "Separately, the client had accumulated years of closed Zendesk tickets full of operational signal, slow providers, failing fax numbers, recurring complaint categories, that no one had time to mine manually. A previous prototype had tried and failed: it fabricated dozens of fake medical records and hallucinated vendor performance scorecards from tiny sample sets. Whatever replaced it had to be architecturally incapable of that class of failure.",
      ],
    },
    approach: {
      heading: "Approach",
      body: [
        "PHI-safe by design, not by review. Redaction is enforced structurally: patient data is stripped from payloads at ingest, excluded from queue serialization, and hidden from model instances so it can't accidentally appear in a log line or a debug print. The internal operator dashboard uses a column allowlist, so a field has to be explicitly permitted to render, meaning a new database column can't accidentally expose PHI on a screen someone forgot to lock down. This was audited by an external security firm; two critical findings were remediated, plus a round of general hardening.",
        "The AI never sees Social Security numbers: they're redacted at the input boundary on every call before anything reaches the model, a code-level enforcement rather than a policy. And the AI backend was rebuilt from the failed prototype with the same rigor as the middleware: clear input boundaries, safety flags on any suggestion that might mutate production data, a human-in-the-loop gate on anything that reaches a real ticket, and a two-switch launch model, safe read-only tools first, generative outputs second, gated on a review UI being ready.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "A single connected platform in two parts. The integration middleware is a PHP 8.2 / Laravel 12 service connecting Litify (Salesforce), Filevine, and Zendesk into a coherent record-request workflow: records requested in one system propagate automatically to the others, with statuses reconciled and updates delivered without a human touching three tabs. It runs on PostgreSQL for durable storage, Redis-backed queues for asynchronous processing, and Docker for consistent deployment. Auth into Zendesk uses OAuth client_credentials, built ahead of Zendesk's own sunset of API token auth, with all field mappings and status enumerations verified against the client's production configuration.",
        "The AI backend reads closed Zendesk tickets and surfaces operational patterns for the client's staff. It runs on AWS Bedrock (Claude), keeping model calls inside the client's own AWS account so PHI never leaves their infrastructure, AWS Textract for OCR on document attachments, and AWS Lambda for the compute layer, with Supabase (PostgreSQL) for structured storage of the mined patterns. Staff access is gated through Cloudflare Access with Microsoft Entra SSO. The AI runs in suggest-only mode: it surfaces observations and recommendations to human staff, but never writes to live tickets without explicit human approval, controlled by a config flag only the client's operations lead can change.",
        "The middleware ships with 87% test coverage across roughly 380 tests, static analysis via Larastan, style enforcement via Pint, and Trivy security scanning in CI, with a minimum coverage threshold enforced on every pull request.",
      ],
    },
    stack: [
      "PHP 8.2",
      "Laravel 12",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS Bedrock",
      "AWS Textract",
      "AWS Lambda",
      "Supabase",
      "Cloudflare Access",
      "Microsoft Entra SSO",
      "Litify, Filevine & Zendesk APIs",
    ],
    results: {
      heading: "Results",
      body: [
        "Integration platform deployed to the client's own AWS environment, connecting three previously-disconnected case management systems, and eliminating manual reconciliation across Litify, Filevine, and Zendesk from daily staff workflow.",
        "The PHI-safe architecture passed an external security audit, with all findings remediated. The AI backend deployed with SSO gating, PHI redaction at the input boundary, and human-in-the-loop safety controls, with historical Zendesk ticket data mined for operational patterns (provider performance, communication failures, recurring complaint categories) available to staff through Zendesk sidebar tools.",
        "Client details are anonymized to protect patient data and honor confidentiality.",
      ],
    },
  },
  {
    slug: "social-lead-capture-automation",
    category: "Automation",
    client: "Anonymized client",
    title: "Social Lead Capture Automation",
    summary:
      "A keyword-triggered Instagram DM funnel that turns comments into subscribers, rebuilt end to end for reliability.",
    scope: [
      "Marketing automation",
      "No-code integration",
      "Workflow automation",
      "Keyword-triggered lead flows",
      "Webhook rebuild & diagnostics",
      "Failure monitoring",
    ],
    cover: { kind: "schematic", diagram: "social-lead-capture" },
    metrics: [
      {
        value: "4 of 4",
        label: "Keyword-triggered flows live end to end, up from three that weren't delivering",
      },
      {
        value: "Real time",
        label: "From the initial comment through to a correctly delivered subscriber",
      },
      {
        value: "Root cause",
        label: "Webhook trigger fault resolved at the source, not patched at the app connection",
      },
      {
        value: "Monitored",
        label: "Failure alerts on every automation, so a break surfaces instead of losing leads",
      },
    ],
    challenge: {
      heading: "Challenge",
      body: [
        "The client runs lead capture directly through social comments: someone replies to a post with one of several keyword triggers, an automated DM flow collects their email address, and that email is meant to land in the right email-marketing group for follow-up. On paper, a pipeline like this should run itself once it's built.",
        "In practice, only three of the four required flows had ever been built, and the ones that did exist weren't reliably getting new subscriber data through to the email platform at all. Every test came back with stale, cached results instead of live data, even after the most obvious remedy, reconnecting the app authorization between the automation tools, had already been tried. Leads were being collected at the front of the funnel and quietly lost before the end of it.",
      ],
    },
    approach: {
      heading: "Approach",
      body: [
        "Reconnecting an app authorization is a two-minute change that looks like a fix and often isn't. We diagnosed the actual failure point first, the webhook trigger itself, rather than assuming the obvious cause was the real one. That distinction is what separates a lasting fix from one that quietly breaks again a week later.",
        "Before considering the work done, we ran a live end-to-end test across all four flows individually, rather than checking a single happy path and calling the pipeline healthy.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "We built the pipeline end to end rather than patching around the symptom. The real fault sat past the app connection, in the automation's own webhook configuration: the outbound trigger wasn't correctly wired to fire live events, so it was silently falling back to cached results instead of actually delivering new leads.",
        "We rebuilt that webhook so new subscriber events post live, republished every automation against the corrected configuration, and rebuilt the field mapping across all four flows so each one delivers to its correct destination group.",
        "The fourth flow, which had never existed, was built from scratch to match the working structure of the other three, so all four lead segments now run on the same proven pattern.",
        "Failure monitoring was added across all four automations, so any future break gets flagged immediately instead of silently losing leads.",
      ],
    },
    stack: ["ManyChat", "Zapier", "MailerLite", "Webhook configuration & diagnostics"],
    results: {
      heading: "Results",
      body: [
        "All four lead-capture automations, previously three with one flow missing entirely, now run end to end, from the initial comment through to a correctly delivered subscriber, in real time.",
        "The webhook fault that was silently discarding new leads is resolved at the root, not patched around.",
        "Failure alerts now flag any future break in the pipeline immediately, rather than it going unnoticed while leads go missing.",
        "The rebuilt structure means adding another flow in the future follows an established, working pattern rather than starting from an unreliable base.",
        "Client details are anonymized at the client's request, and this engagement has no public-facing asset to link to.",
      ],
    },
  },
  {
    slug: "truecell",
    category: "Commerce & Inventory",
    featured: true,
    client: "TrueCell",
    title: "TrueCell",
    summary:
      "An inventory OS for high-volume electronics resellers: marketplace sync across Amazon, eBay, Back Market and more, demand forecasting, a rules engine that routes every unit without overselling it, and the accounting integrations to keep the books in agreement with the warehouse.",
    scope: [
      "Marketplace sync (Amazon, eBay, Back Market, Shopify)",
      "Demand forecasting & dynamic pricing",
      "Rules & routing engine",
      "AI-assisted risk detection",
      "Logistics integrations",
      "Accounting & BI integrations",
    ],
    cover: { kind: "photo", src: "/work/truecell.webp", alt: "The TrueCell inventory dashboard, showing marketplace sync status and inventory metrics" },
    rowCover: {
      kind: "photo",
      src: "/work/truecell-row.webp",
      alt: "TrueCell's product page: the inventory brain, one-click automation workflows, and a daily sell-through chart",
    },
    metrics: [
      { value: "99.7%", label: "Inventory accuracy reported across connected channels" },
      { value: "14 min/day", label: "To reconcile inventory, down from hours of manual cross-checking" },
      { value: "9+", label: "Marketplaces and sales channels kept in sync" },
      { value: "GMV-based", label: "Pricing that scales with the reseller, not per-seat licensing" },
    ],
    challenge: {
      heading: "Challenge",
      body: [
        "High-volume electronics resellers were tracking inventory, marketplace listings, and diagnostics across separate tools, with no single system deciding where a unit should go without the risk of overselling it across channels like Amazon, eBay, and Back Market.",
        "Every workaround touched the books eventually: a unit sold twice, a listing that didn't reflect the warehouse, a reconciliation that only happened at month-end instead of continuously. The fix couldn't just be a nicer inventory spreadsheet, it had to be a system of record that marketplaces, logistics, and accounting all trusted equally.",
      ],
    },
    approach: {
      heading: "Approach",
      body: [
        "As with every Hexary engagement, the riskiest technical assumption was identified and proven first: could inventory state be reconciled across many marketplaces in near real time without double-selling a unit. That sync and rules engine was built and stress-tested before anything else, then the system was extended outward in short, working increments rather than delivered as one big reveal at the end.",
        "Pricing was built to scale with the reseller's volume (GMV-based tiers) rather than per-seat, so the platform stays usable for a small pilot operation and a high-volume one without a re-negotiation at every growth stage.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "The result is a command center for device resale: demand forecasting, marketplace sync across Amazon, eBay, Back Market, Shopify and more, serial-level reconciliation, and a rules engine that decides where every unit goes without overselling it.",
        "An AI-assisted layer flags anomalies and risk (a listing drifting from its warehouse state, a channel behaving unusually) before they become a chargeback or an oversold unit, and dynamic pricing keeps listings competitive across channels without someone manually repricing SKUs.",
        "Logistics integrations connect the platform to shipping and fulfillment providers, so a sale doesn't just update a spreadsheet, it kicks off the actual fulfillment path. Accounting and BI integrations keep operational numbers and the books in agreement, instead of reconciled by hand once a month.",
      ],
    },
    stack: [
      "Amazon",
      "eBay",
      "Back Market",
      "Shopify",
      "QuickBooks",
      "NetSuite",
      "Snowflake",
      "Shipping & 3PL integrations",
    ],
    results: {
      heading: "Results",
      body: [
        "The platform now reports 99.7% inventory accuracy across connected channels, with reconciliation down to about 14 minutes a day, replacing what used to be hours of manual cross-checking between marketplaces and the warehouse.",
        "Nine or more marketplaces and sales channels stay in sync from a single system, with GMV-based pricing so the platform scales with the reseller instead of penalizing growth with per-seat costs.",
      ],
    },
    links: [{ label: "Live product", href: "https://truecell.net" }],
  },
  {
    slug: "kinein",
    category: "B2B Commerce",
    client: "Kinein",
    title: "Kinein",
    summary:
      "A wholesale storefront for distributors and manufacturers where inventory, customer-specific pricing and orders move both ways between the site and Fishbowl, Acumatica, QuickBooks, Microsoft Business Central, NetSuite or Xero — no middleware, no re-keying.",
    scope: [
      "Native ERP & accounting sync",
      "Multi-warehouse inventory",
      "Sales rep portal",
      "Customer self-service portal",
      "Order templates & reordering",
      "Admin dashboard & sync monitoring",
    ],
    cover: { kind: "photo", src: "/work/kinein.webp", alt: "The Kinein B2B e-commerce storefront, showing bidirectional sync between the storefront and connected accounting systems" },
    rowCover: {
      kind: "photo",
      src: "/work/kinein-row.webp",
      alt: "Kinein's order-template editor, showing a saved bike build with per-line stock status, pricing and quantities",
    },
    metrics: [
      { value: "1,000+", label: "Distributors, wholesalers, and manufacturers on the platform" },
      { value: "99.9%", label: "Platform uptime" },
      { value: "6", label: "Native accounting/ERP integrations, with no middleware layer" },
      { value: "8–16 wks", label: "Typical implementation, base package to a fully custom build" },
    ],
    challenge: {
      heading: "Challenge",
      body: [
        "Distributors, wholesalers, and manufacturers running B2B storefronts often keep their commerce platform and their accounting system out of sync: orders, inventory, and customer-specific pricing re-keyed by hand between the two, or handed off to middleware that adds its own point of failure.",
        "That disconnect is exactly what pushes people toward a system like this in the first place. It's a familiar story in the distribution world: run a manufacturing or wholesale business long enough, cycle through a few storefront rebuilds that all left the accounting system as an afterthought, and end up needing a platform built around the books rather than bolted onto them.",
      ],
    },
    approach: {
      heading: "Approach",
      body: [
        "As with every engagement in this space, the riskiest technical assumption was proven first: that inventory, pricing, and orders could sync bidirectionally with a live accounting or ERP system, in both directions, with zero manual re-keying and zero middleware in between. That sync engine came first; the storefront, sales rep portal, and self-service features were layered on once it held.",
        "Multi-warehouse support and customer-specific pricing were treated as first-class requirements rather than edge cases, since a distributor with two warehouses and one with twenty need the same sync guarantees, just at different scale.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "The result is a wholesale storefront where inventory, customer-specific pricing, and orders move both ways between the site and the connected accounting system, Fishbowl, Acumatica, QuickBooks, Microsoft Business Central, NetSuite, or Xero, with no middleware and no re-keying. An order placed on the storefront becomes a native sales order in the accounting system automatically: line items, pricing, customer info, and ship-to address included.",
        "A sales rep portal lets reps place orders on a customer's behalf using that customer's own pricing, payment terms, and product catalog. A customer self-service portal gives buyers order history, invoices, and reorder tools, including saved order templates and one-click reordering from past purchases.",
        "An admin dashboard surfaces order trends, customer activity, and sync health at a glance, including task-level detail on exactly what synced and when, so a sync issue is a notification rather than a discovery made days later.",
      ],
    },
    stack: [
      "Fishbowl",
      "Acumatica",
      "QuickBooks",
      "Microsoft Business Central",
      "NetSuite",
      "Xero",
    ],
    results: {
      heading: "Results",
      body: [
        "The platform now runs for 1,000+ distributors, wholesalers, and manufacturers, syncing natively with six major accounting and ERP systems at 99.9% uptime, with no middleware layer to maintain or fail.",
        "A base implementation typically goes live in about eight weeks; fully custom storefront builds run twelve to sixteen.",
      ],
    },
    links: [{ label: "Live product", href: "https://kinein.com" }],
  },
  {
    slug: "b2b-access",
    category: "B2B Marketplace",
    featured: true,
    client: "B2B Access",
    title: "B2B Access",
    summary:
      "The wholesale platform built for smoke shops, c-stores, and the brands they carry: a vetted brand catalog, ordering with tracking, par-level restock alerts and full invoice history — with tiered pricing, MOQs and buyer analytics on the brand side.",
    scope: [
      "Two-sided B2B marketplace",
      "Retailer verification",
      "Order management & tracking",
      "Par-level restock alerting",
      "Brand analytics & buyer insights",
      "Shopify & Zoho CRM sync",
    ],
    cover: {
      kind: "photo",
      src: "/work/b2b-access.webp",
      alt: "The B2B Access wholesale marketplace homepage, showing platform metrics and calls to action for shops and brands",
    },
    rowCover: {
      kind: "photo",
      src: "/work/b2b-access-row.webp",
      alt: "The B2B Access homepage in full, from the header down to the platform metrics band",
    },
    metrics: [
      { value: "2,400+", label: "Verified retail shops on the platform" },
      { value: "80+", label: "Wholesale brands listed" },
      { value: "$4.2M", label: "Wholesale orders processed" },
      { value: "48h", label: "Average order fulfillment time" },
    ],
    challenge: {
      heading: "Challenge",
      body: [
        "Wholesale relationships between smoke shops, c-stores, and the brands they carry were run over text chains, email threads, and phone calls with no paper trail. A shop's orders were scattered across a dozen different vendor contacts, with no single source of truth, no visibility into what was ordered three months ago or what price was negotiated, and no alert when a top-selling SKU was about to run out.",
        "Brands had the mirror-image problem: reaching new retail accounts meant trade shows and cold outreach, slow and expensive with no guarantee of a return, and once an account existed, fulfilling and tracking its orders meant the same scattered communication the retailers were stuck with.",
      ],
    },
    approach: {
      heading: "Approach",
      body: [
        "The platform had to work for two different audiences with two different incentives at once: retailers who needed the marketplace to be free and frictionless to adopt, and brands who needed enough control (their own pricing, their own minimum order quantities, their own account relationships) to trust putting their wholesale business on a platform they didn't own. Getting that balance right, rather than the storefront mechanics themselves, was the riskiest part of the build, so it was the first thing validated.",
        "Retailer verification was treated as a first-class flow rather than a formality, since a marketplace for a specialty category like this only works if both sides trust who they're transacting with.",
      ],
    },
    solution: {
      heading: "Solution",
      body: [
        "The result is a two-sided wholesale marketplace connecting verified retailers with vetted brands. Shops browse a curated catalog at private wholesale pricing, place orders in seconds instead of over a phone call, and get every order, invoice, and delivery log in one place. Par-level restock alerts notify a shop before a top SKU runs out, rather than after it's already missed at the register.",
        "On the brand side, sellers control their own pricing tiers and minimum order quantities, see sales analytics and buyer insights (which regions are ordering, which SKUs move fastest), and manage every order from a single dashboard synced with their existing inventory and CRM.",
        "Verification and onboarding for both shops and brands typically completes in under 24 hours. Enterprise brand accounts get a white-label buyer portal, a custom subdomain, and API and webhook integrations, including native sync with Shopify and Zoho CRM.",
      ],
    },
    stack: ["Shopify sync", "Zoho CRM sync", "REST API & webhooks", "White-label buyer portals"],
    results: {
      heading: "Results",
      body: [
        "The platform now runs 2,400+ verified retail shops and 80+ wholesale brands, with $4.2M in wholesale orders processed and an average order fulfillment time of 48 hours.",
        "Shop access remains free, funded entirely by flat brand subscriptions rather than per-order fees or commissions, so retailers have no cost barrier to adoption and brands keep their full wholesale margin.",
      ],
    },
    links: [{ label: "Live product", href: "https://b2baccess.us" }],
  },
];
