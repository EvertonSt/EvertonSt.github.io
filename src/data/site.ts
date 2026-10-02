import { links } from "./links";

/**
 * Who this site belongs to, and what the owner is available for.
 *
 * Everything a recruiter needs to decide whether to reply is here, so the
 * answer does not depend on which section they happen to scroll to. The CV
 * generator and the JSON-LD builder both read from this object rather than
 * repeating the details, which is how a phone number ends up correct on the
 * page and wrong on the résumé.
 *
 * The role line and the keyword set follow the owner's own LinkedIn
 * positioning, word for word where it matters. Recruiters filter on
 * "Software Engineer in Test" and "QA Automation" far more often than on
 * "Quality Engineer", and a page that leads with different words reads as a
 * different specialism than the one being advertised.
 */
export const profile = {
  name: "Everton S. Andrade",
  shortName: "Everton Andrade",
  role: "Software Engineer in Test · QA Automation · AI/LLM Test Tooling",
  email: links.email,
  city: "Paripiranga",
  region: "Bahia",
  country: "Brazil",
  countryCode: "BR",
  timezone: "UTC−3",
  languages: ["Portuguese (native)", "English (native-level)"],
  github: links.github,
  linkedin: links.linkedin,
  site: links.site,

  /** Roles being actively sought. Specific enough to filter on. */
  targetRoles: ["Software Engineer in Test (SDET)", "QA Automation Engineer", "Quality Engineer"],
  remotePreference: "Brazil-based · Remote-ready (LATAM, US and EU hours)",
} as const;

/**
 * The terms a recruiter's search box is likely to contain.
 *
 * Used by the meta keywords tag and the structured data. Kept as a list rather
 * than free text so it cannot drift into prose nobody searches for.
 */
export const searchKeywords = [
  "Software Engineer in Test",
  "SDET",
  "QA Automation Engineer",
  "QA Automation",
  "Playwright",
  "Cypress",
  "TypeScript",
  "AI/LLM Test Tooling",
  "CI/CD Quality Gates",
  "Test Automation",
  "API Testing",
  "GitHub Actions",
  "Remote",
] as const;

/** The headline the hero and the structured data both use. */
export const siteMetadata = {
  title: "Everton S. Andrade — Software Engineer in Test & QA Automation",
  description:
    "Software Engineer in Test and QA Automation Engineer. Six years of test automation, AI/LLM test tooling and CI/CD quality gates with Playwright and TypeScript. Remote-ready.",
  locale: "en",
  alternateLocale: "pt-BR",
  themeColor: "#0b0b12",
} as const;
