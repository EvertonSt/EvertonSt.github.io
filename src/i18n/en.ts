/**
 * English copy. This file is the single source of truth for every
 * user-visible string on the site, including the case studies - the previous
 * layout kept the same sentences in both `i18n/en.ts` and `data/projects.ts`,
 * which is two places to update and one of them was always stale.
 *
 * `TranslationKey` is derived from this object, so `pt.ts` is typed
 * `Record<TranslationKey, ...>` and a missing Portuguese key is a compile
 * error rather than an English paragraph that reaches production.
 *
 * Values are either a string or a list of strings. `t()` and `tList()` are the
 * two accessors, and each rejects the other's shape at runtime rather than
 * returning something the component cannot render.
 */
export const en = {
  "meta.siteTitle": "Everton S. Andrade — Software Engineer in Test & QA Automation",
  "meta.siteTagline": "QA automation, AI/LLM test tooling and CI/CD quality gates.",

  /* Navigation */
  "nav.work": "Work",
  "nav.focus": "Focus",
  "nav.experience": "Experience",
  "nav.resume": "Résumé",
  "nav.contact": "Contact",
  "nav.primaryCta": "Hire me",
  "nav.skipToContent": "Skip to content",
  "nav.openMenu": "Open navigation",
  "nav.closeMenu": "Close navigation",
  "nav.menuLabel": "Site navigation",
  "nav.mobileMenu": "Navigation",
  "nav.theme": "Switch colour theme",
  "nav.themeToLight": "Switch to light theme",
  "nav.themeToDark": "Switch to dark theme",

  /* Hero */
  "hero.availability": "Open to remote QA automation and SDET roles",
  "hero.roleLine": "Software Engineer in Test · QA Automation · AI/LLM Test Tooling",
  "hero.title": "I build the test infrastructure that decides whether a team can ship.",
  "hero.subtitle":
    "Six years of automated test systems, CI quality gates and LLM evaluation tooling — including the part most teams skip: making the verdict deterministic, so the same commit always gets the same answer.",
  "hero.primaryCta": "See the work",
  "hero.resumeCta": "Download résumé",
  "hero.githubCta": "GitHub",
  "hero.linkedinCta": "LinkedIn",
  "hero.location": "Paripiranga, Bahia, Brazil · UTC−3",
  "hero.workAuth": "Open to remote (LATAM, US and EU overlap)",
  "hero.languages": "Portuguese native · English native-level",
  "hero.skills": [
    "Playwright",
    "TypeScript",
    "CI/CD",
    "CI quality gates",
    "LLM evaluation",
    "API testing",
    "GitHub Actions",
  ],

  /* Proof strip */
  "proof.title": "The numbers behind the work",
  "proof.note": "Figures are taken from each project's own test suite and CI, not estimated.",
  "proof.testsLabel": "tests passing",
  "proof.coverageLabel": "line coverage",
  "proof.publishedLabel": "published package",
  "proof.languagesLabel": "interface languages",
  "proof.yearsLabel": "building test systems",
  "proof.projectsLabel": "systems built end to end",
  "proof.stagesLabel": "pipeline stages",
  "proof.modelStagesLabel": "stages using a model",
  "proof.providersLabel": "model providers",
  "proof.clientsLabel": "client applications",
  "proof.sharedLabel": "shared service cores",
  "proof.argus": "Argus",
  "proof.cerberus": "Cerberus CI",
  "proof.enlace": "Enlace",
  "proof.self": "Track record",

  /* Work */
  "work.title": "Selected work",
  "work.subtitle":
    "Five systems, each written and shipped end to end. Every status label below states what a visitor will actually find when they click through.",
  "work.readCaseStudy": "Read the case study",
  "work.hideCaseStudy": "Hide the case study",
  "work.caseStudyLabel": "Case study for",
  "work.visitRepo": "Repository",
  "work.liveDemo": "Live demo",
  "work.npmPackage": "npm package",

  /* Case study headings. These are labels, not sentences, and are shared by
     every project so the four sections read identically across the section. */
  "cs.problem": "The problem",
  "cs.architecture": "Architecture",
  "cs.decisions": "Key decisions",
  "cs.evidence": "Evidence",

  /* Status labels. Deliberately precise: a portfolio that overstates its own
     status is worth less to a hiring manager than one that admits what is not
     finished yet. */
  "status.live": "In production",
  "status.liveDetail": "Running with real data",
  "status.demo": "Demo data",
  "status.demoDetail": "Synthetic data, no real customers",
  "status.launching": "Launching October 2026",
  "status.launchingDetail": "Public launch 12 October 2026",
  "status.planned": "Launching November 2026",
  "status.plannedDetail": "Public launch 2 November 2026",
  "status.inDevelopment": "In development",
  "status.inDevelopmentDetail": "Built but not yet deployed",
  "status.reference": "Reference project",

  /* Argus */
  "argus.title": "Argus",
  "argus.subtitle": "Autonomous QA agent with a deterministic verdict",
  "argus.description":
    "A QA agent that discovers an application's features, writes Playwright tests for them, runs them, triages the failures and files deduplicated GitHub issues. The agent proposes; a deterministic rule set decides whether the build passes.",
  "argus.tags": [
    "TypeScript",
    "Playwright",
    "LLM test planning",
    "Deterministic codegen",
    "Failure triage",
    "Duplicate detection",
    "GitHub Issues",
    "Severity gates",
  ],
  "argus.cs.problem":
    "Teams need coverage that keeps pace with the codebase, but the two available answers both fail. Fully manual testing is slow and always behind. Fully model-driven testing is fast and produces a different answer on every run, so a red build becomes noise and the team learns to ignore the gate.",
  "argus.cs.architecture":
    "Seven stages: ingest the application, plan coverage, generate tests from templates, execute with Playwright, triage failures, file issues, report. Only two stages call a model. The remaining five are ordinary deterministic code, which is what makes the verdict reproducible.",
  "argus.cs.decisions":
    "Four decisions did the work. First, the model never decides pass or fail — a severity rule set does, so the same commit always produces the same verdict. Second, templates before generation, so the common cases are covered by code anyone can review. Third, no automatic fix, because a self-healing suite that silently changes what it asserts is not a test suite. Fourth, a SHA-256 verdict cache, which removes roughly 60% of repeat calls without changing any result.",
  "argus.cs.evidence":
    "313 tests passing across four covered features. The dashboard runs on Vercel and shows a full demonstration run; the data in it is synthetic, and the interface says so.",

  /* Cerberus CI */
  "cerberus.title": "Cerberus CI",
  "cerberus.subtitle": "CI gate that separates a flaky test from a real regression",
  "cerberus.description":
    "A GitHub Action that classifies every failing test, catches performance regressions before they compound, and publishes a quality summary on the pull request in plain language.",
  "cerberus.tags": [
    "Three-tier triage",
    "Flaky detection",
    "Performance regression",
    "GitHub Actions",
    "PR reports",
    "Provider-agnostic",
    "npm package",
  ],
  "cerberus.cs.problem":
    "A flaky test costs more than a missing one, because it teaches the team to re-run instead of investigate. Performance regressions are worse and quieter: they are invisible for two to four weeks and are usually discovered by a customer.",
  "cerberus.cs.architecture":
    "Three tiers, cheapest first. Rules run in under a millisecond and catch the deterministic failures. A SQLite cache answers repeat questions in under five milliseconds. Only what survives both reaches the model, so a typical run spends a small fraction of its budget on inference.",
  "cerberus.cs.decisions":
    "The model never decides pass or fail here either — it classifies, and a rule set decides. That keeps the gate stable when a provider is slow, rate-limited or changes its output. The adapter accepts any OpenAI-compatible endpoint, which is what let it run against four providers without a rewrite. And a zero-cost mock mode means the whole suite runs offline in CI.",
  "cerberus.cs.evidence":
    "237 tests at 88% line coverage, published to npm, wrapped as a GitHub Action, and running on my own repositories as a dogfood test.",

  /* SiteCheckIn */
  "sitecheckin.title": "SiteCheckIn",
  "sitecheckin.subtitle": "Guest check-in and revenue tracking for short-stay accommodation",
  "sitecheckin.description":
    "A production SaaS for hosts and small operators: guest self check-in, automated messaging, and a live view of occupancy and revenue per property. Multi-language from the first commit, because the customers are not in one country.",
  "sitecheckin.tags": ["Next.js", "PostgreSQL", "Multi-tenant", "i18n", "LGPD", "Stripe", "GitHub Actions"],
  "sitecheckin.cs.problem":
    "Small accommodation operators run on a spreadsheet, a messaging app and a lockbox. Check-in instructions get sent by hand, every time, and nobody can say at a glance which properties are actually earning.",
  "sitecheckin.cs.architecture":
    "Next.js front end, PostgreSQL with tenant isolation on every query, Stripe for billing, and a messaging layer with delivery state tracked per message rather than per request.",
  "sitecheckin.cs.decisions":
    "Tenant isolation is enforced at the data layer rather than filtered in application code, so a missing where-clause fails loudly instead of leaking one customer's rows to another. Compliance work for Brazilian LGPD and international guests is designed in from the start — data export and deletion are product features, not a legal afterthought.",
  "sitecheckin.cs.evidence":
    "Public launch on 12 October 2026. Built and tested ahead of launch rather than demonstrated as if it were already serving customers.",

  /* AItendimento */
  "aitendimento.title": "AItendimento",
  "aitendimento.subtitle": "WhatsApp-first customer service automation",
  "aitendimento.description":
    "A production WhatsApp automation platform for businesses that answer on their phone: intent detection, handover to a human when it matters, and a conversation log a manager can actually read.",
  "aitendimento.tags": ["WhatsApp", "Node.js", "Automation", "Human handover", "Audit trail"],
  "aitendimento.cs.problem":
    "Customer service for a small business is a WhatsApp thread. Automating it naively is worse than not automating it: a wrong answer sent from the business number costs a customer.",
  "aitendimento.cs.architecture":
    "WhatsApp as the only channel, by design. Intent detection and scripted replies, with an explicit handover path and an opt-out honoured on every message.",
  "aitendimento.cs.decisions":
    "The governing decision is that no message ever sends without explicit approval at the point it would go out. Automation that cannot be audited is not deployable in a channel where the business identity is the trust.",
  "aitendimento.cs.evidence": "Public launch on 2 November 2026.",

  /* Enlace */
  "enlace.title": "Enlace",
  "enlace.subtitle": "Operations platform for an internet service provider",
  "enlace.description":
    "Four applications against one shared core: a customer portal, a network operations console, a mobile app, and a triage service for incoming incidents.",
  "enlace.tags": ["Fastify", "React", "Tauri", "Expo", "WebSocket", "PostgreSQL", "Railway", "Vercel"],
  "enlace.cs.problem":
    "An ISP runs on ticket volume and phone calls. Incidents get handled twice, and the customer hears about an outage after the operator does.",
  "enlace.cs.architecture":
    "A monorepo with four clients over a shared core: React and Vite for the web portal, Tauri for the operations console, Expo for mobile, and Fastify with PostgreSQL and WebSockets for the service.",
  "enlace.cs.decisions":
    "One shared domain core rather than four implementations. The cost is a stricter contract between clients and core; the return is that a business rule is written once instead of four times, which is the difference between a fix and a project.",
  "enlace.cs.evidence":
    "Phase one complete and deployed. All data in the demo deployment is synthetic, and the interface labels it as such.",

  /* Engineering focus */
  "focus.title": "What I am hired for",
  "focus.subtitle": "The six problems I get asked about, and what I do about each one.",
  "focus.qualityGates": "CI quality gates",
  "focus.qualityGatesDesc":
    "A gate that only fails for real reasons, so the team keeps trusting it. Deterministic verdicts, severity tiers, and no automatic test rewriting.",
  "focus.automation": "Test automation at scale",
  "focus.automationDesc":
    "Playwright and API suites that a team can extend without inheriting a framework nobody understands.",
  "focus.llmEvaluation": "LLM evaluation and guardrails",
  "focus.llmEvaluationDesc":
    "Model output treated as something to be measured: provider-agnostic adapters, offline mocks, and rules that decide rather than the model.",
  "focus.reliability": "Debugging and triage",
  "focus.reliabilityDesc":
    "Finding the real cause behind a red build or a duplicate defect report, and encoding it so it does not come back.",
  "focus.fullStack": "Full-stack delivery",
  "focus.fullStackDesc":
    "React, Fastify, Tauri and Expo, so the quality system and the product it protects are built by the same person.",
  "focus.shipping": "Shipping in public",
  "focus.shippingDesc":
    "npm packages, GitHub Actions and live deployments — work that has to survive being used by somebody else.",

  /* Additional projects */
  "projects.title": "Supporting work",
  "projects.subtitle": "Smaller tools that fill a specific gap in the workflow above.",
  "projects.qaTestingSuite": "QA Testing Suite",
  "projects.qaTestingSuiteDesc": "Automated API and UI suite covering a sample service end to end.",
  "projects.localQaCopilot": "Local QA Copilot",
  "projects.localQaCopilotDesc":
    "Self-hosted test assistant running on a local model, with a deterministic fallback when the model is unavailable.",
  "projects.aiTestCaseGenerator": "AI Test Case Generator",
  "projects.aiTestCaseGeneratorDesc":
    "Turns a plain-language feature description into structured test cases and a runnable scaffold.",
  "projects.bugReportGenerator": "Bug Report Generator",
  "projects.bugReportGeneratorDesc":
    "Command-line tool that captures environment detail, suggests a severity and flags duplicate reports.",
  "projects.aiContentTesting": "AI Content Testing",
  "projects.aiContentTestingDesc": "Readability, grammar and structure scoring for content before it ships.",
  "projects.forgePro": "Forge-Pro",
  "projects.forgeProDesc": "Template marketplace with an automated quality gate on every submission.",
  "projects.aiopedia": "AIopedia",
  "projects.aiopediaDesc": "Reference site cataloguing models, benchmarks and evaluation practice.",
  "projects.localAiWebsite": "Local AI Website",
  "projects.localAiWebsiteDesc": "Directory of models and hardware suitable for self-hosted inference.",

  /* Experience */
  "experience.title": "Experience",
  "experience.subtitle": "Where the work above was built and shipped.",
  "experience.independentTitle": "Independent QA Automation Engineer and Tooling Developer",
  "experience.independentCompany": "Self-employed",
  "experience.independentPeriod": "August 2020 — Present",
  "experience.independent1":
    "Designed and shipped Argus, an autonomous QA agent with a 313-test suite that generates Playwright tests, triages failures and files deduplicated issues.",
  "experience.independent2":
    "Built and published Cerberus CI to npm and the GitHub Marketplace: a CI quality gate with 237 tests and 88% line coverage, running provider-agnostic across four model providers.",
  "experience.independent3":
    "Built Enlace, an ISP operations platform spanning a Fastify service, React portal, Tauri console and Expo app, deployed on Railway and Vercel.",
  "experience.independent4":
    "Built SiteCheckIn and AItendimento, two commercial products shipping in 2026, covering multi-tenant SaaS, billing, WhatsApp automation and the compliance work that goes with both.",
  "experience.internTitle": "Software Development Intern",
  "experience.internCompany": "Ages",
  "experience.internPeriod": "June 2019 — June 2020",
  "experience.intern1":
    "University internship on a C# and .NET desktop ERP built by a six-person team in a three-layer architecture (business logic, data access, GUI and model) on SQL Server.",
  "experience.intern2":
    "Owned business-logic and data-access work, database integration, and version control alongside the rest of the team. Worked in Java during the internship.",
  "experience.arrangementRemote": "Remote",
  "experience.arrangementOnsite": "On-site · Internship",

  /* Stack */
  "stack.title": "Technical stack",
  "stack.subtitle": "Tools I have shipped with, not tools I have read about.",
  "stack.testing": "Testing and quality",
  "stack.languages": "Languages",
  "stack.ai": "Models and evaluation",
  "stack.fullStack": "Full-stack",
  "stack.infrastructure": "Infrastructure",

  /* About */
  "about.title": "About",
  "about.p1":
    "I like finding out why software fails and then building the thing that makes the next occurrence cheap to catch.",
  "about.p2":
    "Most of my work sits at the seam between quality and engineering: I write the tests, the CI wiring, the triage rules and the reporting. That range is deliberate. A gate written by the person who wrote the feature understands what the feature is supposed to do, and a gate written by someone who only sees the symptoms tends to become a blocker people route around.",
  "about.p3":
    "The through-line in everything above is a preference for deterministic verdicts. Models are genuinely useful inside a test or triage system, and genuinely dangerous as the thing that decides whether a build passes. I have used them in both positions and the difference in reliability is not subtle.",
  "about.p4":
    "I am based in Paripiranga, Bahia, on UTC−3, fluent in English, and comfortable working with teams in the US and Europe. I am looking for a remote QA automation or SDET role where the test infrastructure is treated as a product rather than a chore.",

  /* Résumé */
  "resume.title": "Résumé",
  "resume.subtitle":
    "The same content as a single printable column, for applicant tracking systems and for saving as a PDF.",
  "resume.downloadPdf": "Download PDF",
  "resume.downloadTxt": "Plain text",
  "resume.print": "Print this page",
  "resume.summaryLabel": "Summary",
  "resume.experienceLabel": "Experience",
  "resume.projectsLabel": "Projects",
  "resume.stackLabel": "Technical skills",
  "resume.contactLabel": "Contact",
  "resume.publishedLabel": "Published",
  "resume.projectLabel": "Project",

  /* Contact */
  "contact.title": "Contact",
  "contact.subtitle":
    "Hiring for QA automation or SDET, or have a pipeline problem worth diagnosing? Email is the fastest route.",
  "contact.emailLabel": "Email",
  "contact.responseTime": "Typically answered within one business day.",
  "contact.openRoles": "What I am looking for",
  "contact.role1": "Remote QA Automation Engineer or SDET, permanent or contract.",
  "contact.role2": "A team where test infrastructure is a product, not a reporting obligation.",
  "contact.role3": "English-speaking, with overlap into US or European working hours.",
  "contact.githubLabel": "GitHub",
  "contact.linkedinLabel": "LinkedIn",

  /* Footer */
  "footer.tagline": "Software Engineer in Test · QA Automation · CI/CD Quality Gates",
  "footer.builtWith": "Built with React, TypeScript and Vite. No trackers, no cookies.",
  "footer.sourceNote": "Source and build pipeline are public.",
  "footer.rights": "All rights reserved.",

  /* Language switcher */
  "lang.switch": "Language",
  "lang.en": "English",
  "lang.pt": "Português",
  "lang.toEn": "Switch to English",
  "lang.toPt": "Mudar para Português",

  /* Document */
  "doc.skipToContent": "Skip to content",
} as const;

/** Every key the interface may ask for, derived from the English copy. */
export type TranslationKey = keyof typeof en;

/** A translation is either prose or a list of items, never both. */
export type TranslationValue = string | readonly string[];

/** Widen a literal type so another locale can supply its own text. */
type Widen<T> = T extends string ? string : T extends readonly string[] ? readonly string[] : never;

/**
 * The contract every locale must satisfy.
 *
 * `Record<TranslationKey, TranslationValue>` would force every key to be
 * present but would still accept a string where English has a list, which is
 * how a tag row silently renders one string instead of five. This mapped type
 * preserves the shape per key, so both mistakes are compile errors.
 */
export type TranslationCatalogue = { [K in TranslationKey]: Widen<(typeof en)[K]> };
