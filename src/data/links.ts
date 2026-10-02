/**
 * Every outbound URL on the site, in one place.
 *
 * A link that lives in a component is a link nobody updates when a repository
 * is renamed, and `tests/unit/data-integrity.test.ts` asserts each entry is an
 * absolute https URL so a stray relative path cannot reach production.
 */
export const links = {
  github: "https://github.com/EvertonSt",
  linkedin: "https://www.linkedin.com/in/everton-s-andrade-760407128/",
  site: "https://evertonst.github.io/",

  email: "everton_st@outlook.com",
  emailHref: "mailto:everton_st@outlook.com",

  resumePdf: "/everton-s-andrade-resume.pdf",
  resumeTxt: "/everton-s-andrade-resume.txt",

  argus: "https://github.com/EvertonSt/argus",
  argusDashboard: "https://argus-dashboard-jade.vercel.app/",
  cerberusCi: "https://github.com/EvertonSt/cerberus-ci",
  cerberusSite: "https://everton-cerberus-site.vercel.app/",
  cerberusNpm: "https://www.npmjs.com/package/cerberus-ci",
  sitecheckin: "https://github.com/EvertonSt/sitecheckin",
  aitendimento: "https://github.com/EvertonSt/aitendimento",
  enlace: "https://github.com/EvertonSt/enlace",
  enlaceDemo: "https://enlace-desktop-b9dq.vercel.app/dashboard",

  qaTestingSuite: "https://github.com/EvertonSt/qa-testing-suite",
  localQaCopilot: "https://github.com/EvertonSt/local-qa-copilot",
  aiTestCaseGenerator: "https://github.com/EvertonSt/ai-test-case-generator",
  bugReportGenerator: "https://github.com/EvertonSt/bug-report-generator",
  aiContentTesting: "https://github.com/EvertonSt/ai-content-testing",
  forgePro: "https://github.com/EvertonSt/forge-pro",
  aiopedia: "https://github.com/EvertonSt/aiopedia",
  localAiWebsite: "https://github.com/EvertonSt/local-ai-website",
  projetoErp: "https://github.com/EvertonSt/projeto-erp",
} as const;

/** Repository URLs, keyed by project id, for the link checker and the CV. */
export const repositoryUrls = {
  argus: links.argus,
  "cerberus-ci": links.cerberusCi,
  sitecheckin: links.sitecheckin,
  aitendimento: links.aitendimento,
  enlace: links.enlace,
  "qa-testing-suite": links.qaTestingSuite,
  "local-qa-copilot": links.localQaCopilot,
  "ai-test-case-generator": links.aiTestCaseGenerator,
  "bug-report-generator": links.bugReportGenerator,
  "ai-content-testing": links.aiContentTesting,
  "forge-pro": links.forgePro,
  aiopedia: links.aiopedia,
  "local-ai-website": links.localAiWebsite,
} as const;
