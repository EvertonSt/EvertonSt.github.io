import type { TranslationKey } from "../i18n/en";
import type { IconName } from "../types/icon";
import { links } from "./links";

/**
 * Project structure. Every user-visible sentence lives in `src/i18n/`, so the
 * prose exists once and renders in both languages.
 *
 * The status vocabulary is deliberately narrow, and each value carries a detail
 * line saying what a visitor will actually find behind the link. A portfolio
 * that overstates its own status is worth less to a hiring manager than one
 * that admits what is not finished - and `tests/unit/data-integrity.test.ts`
 * fails the build if a featured project ships without a status, a case study
 * and at least one link.
 *
 * `metrics` is empty for the two products that have not launched. There is no
 * honest number to put there yet, and a placeholder figure would be the exact
 * kind of claim the status labels exist to avoid.
 */
export type ProjectStatus =
  "live" | "demo" | "launching-october" | "launching-november" | "in-development" | "reference";

export const STATUS_LABEL_KEYS: Record<ProjectStatus, TranslationKey> = {
  live: "status.live",
  demo: "status.demo",
  "launching-october": "status.launching",
  "launching-november": "status.planned",
  "in-development": "status.inDevelopment",
  reference: "status.reference",
};

export const STATUS_DETAIL_KEYS: Record<ProjectStatus, TranslationKey> = {
  live: "status.liveDetail",
  demo: "status.demoDetail",
  "launching-october": "status.launchingDetail",
  "launching-november": "status.plannedDetail",
  "in-development": "status.inDevelopmentDetail",
  reference: "status.inDevelopmentDetail",
};

export interface Metric {
  /** The figure itself, e.g. "313". Never a sentence. */
  value: string;
  labelKey: TranslationKey;
}

export interface ProjectLink {
  labelKey: TranslationKey;
  url: string;
  icon: IconName;
}

export interface CaseStudyPart {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
}

export interface Project {
  /** URL-safe and unique; also the JSON-LD identifier suffix. */
  id: string;
  /** Title, subtitle, description and tags are prose, so they live in the catalogue. */
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  descriptionKey: TranslationKey;
  tagsKey: TranslationKey;
  status: ProjectStatus;
  /** Featured projects get the full case-study treatment. */
  featured: boolean;
  metrics: Metric[];
  links: ProjectLink[];
  caseStudy: CaseStudyPart[];
}

const CASE_STUDY_ORDER = ["cs.problem", "cs.architecture", "cs.decisions", "cs.evidence"] as const;

/**
 * The four-part spine every flagship case study follows, with each project
 * supplying only its own prose. Built here so a project cannot quietly ship a
 * two-section case study and break the reading rhythm of the section.
 */
function caseStudy(...bodies: [TranslationKey, TranslationKey, TranslationKey, TranslationKey]) {
  return CASE_STUDY_ORDER.map((titleKey, index) => ({ titleKey, bodyKey: bodies[index] as TranslationKey }));
}

export const flagshipProjects: Project[] = [
  {
    id: "sitecheckin",
    titleKey: "sitecheckin.title",
    subtitleKey: "sitecheckin.subtitle",
    descriptionKey: "sitecheckin.description",
    tagsKey: "sitecheckin.tags",
    status: "launching-october",
    featured: true,
    metrics: [],
    links: [{ labelKey: "work.visitRepo", url: links.sitecheckin, icon: "github" }],
    caseStudy: caseStudy(
      "sitecheckin.cs.problem",
      "sitecheckin.cs.architecture",
      "sitecheckin.cs.decisions",
      "sitecheckin.cs.evidence"
    ),
  },
  {
    id: "aitendimento",
    titleKey: "aitendimento.title",
    subtitleKey: "aitendimento.subtitle",
    descriptionKey: "aitendimento.description",
    tagsKey: "aitendimento.tags",
    status: "launching-november",
    featured: true,
    metrics: [],
    links: [{ labelKey: "work.visitRepo", url: links.aitendimento, icon: "github" }],
    caseStudy: caseStudy(
      "aitendimento.cs.problem",
      "aitendimento.cs.architecture",
      "aitendimento.cs.decisions",
      "aitendimento.cs.evidence"
    ),
  },
  {
    id: "argus",
    titleKey: "argus.title",
    subtitleKey: "argus.subtitle",
    descriptionKey: "argus.description",
    tagsKey: "argus.tags",
    status: "demo",
    featured: true,
    metrics: [
      { value: "313", labelKey: "proof.testsLabel" },
      { value: "7", labelKey: "proof.stagesLabel" },
      { value: "2", labelKey: "proof.modelStagesLabel" },
    ],
    links: [
      { labelKey: "work.visitRepo", url: links.argus, icon: "github" },
      { labelKey: "work.liveDemo", url: links.argusDashboard, icon: "live" },
    ],
    caseStudy: caseStudy(
      "argus.cs.problem",
      "argus.cs.architecture",
      "argus.cs.decisions",
      "argus.cs.evidence"
    ),
  },
  {
    id: "cerberus-ci",
    titleKey: "cerberus.title",
    subtitleKey: "cerberus.subtitle",
    descriptionKey: "cerberus.description",
    tagsKey: "cerberus.tags",
    status: "live",
    featured: true,
    metrics: [
      { value: "237", labelKey: "proof.testsLabel" },
      { value: "88%", labelKey: "proof.coverageLabel" },
      { value: "4", labelKey: "proof.providersLabel" },
    ],
    links: [
      { labelKey: "work.visitRepo", url: links.cerberusCi, icon: "github" },
      { labelKey: "work.npmPackage", url: links.cerberusNpm, icon: "npm" },
      { labelKey: "work.liveDemo", url: links.cerberusSite, icon: "live" },
    ],
    caseStudy: caseStudy(
      "cerberus.cs.problem",
      "cerberus.cs.architecture",
      "cerberus.cs.decisions",
      "cerberus.cs.evidence"
    ),
  },
  {
    id: "enlace",
    titleKey: "enlace.title",
    subtitleKey: "enlace.subtitle",
    descriptionKey: "enlace.description",
    tagsKey: "enlace.tags",
    status: "demo",
    featured: true,
    metrics: [
      { value: "4", labelKey: "proof.clientsLabel" },
      { value: "1", labelKey: "proof.sharedLabel" },
    ],
    links: [
      { labelKey: "work.visitRepo", url: links.enlace, icon: "github" },
      { labelKey: "work.liveDemo", url: links.enlaceDemo, icon: "live" },
    ],
    caseStudy: caseStudy(
      "enlace.cs.problem",
      "enlace.cs.architecture",
      "enlace.cs.decisions",
      "enlace.cs.evidence"
    ),
  },
];

/**
 * Supporting work. Rendered as compact cards: the value here is breadth, and a
 * full case study for each would bury the projects above.
 */
export interface SupportingProject {
  id: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  status: ProjectStatus;
  url: string;
}

export const supportingProjects: SupportingProject[] = [
  {
    id: "qa-testing-suite",
    titleKey: "projects.qaTestingSuite",
    descriptionKey: "projects.qaTestingSuiteDesc",
    status: "reference",
    url: links.qaTestingSuite,
  },
  {
    id: "local-qa-copilot",
    titleKey: "projects.localQaCopilot",
    descriptionKey: "projects.localQaCopilotDesc",
    status: "reference",
    url: links.localQaCopilot,
  },
  {
    id: "ai-test-case-generator",
    titleKey: "projects.aiTestCaseGenerator",
    descriptionKey: "projects.aiTestCaseGeneratorDesc",
    status: "reference",
    url: links.aiTestCaseGenerator,
  },
  {
    id: "bug-report-generator",
    titleKey: "projects.bugReportGenerator",
    descriptionKey: "projects.bugReportGeneratorDesc",
    status: "reference",
    url: links.bugReportGenerator,
  },
  {
    id: "ai-content-testing",
    titleKey: "projects.aiContentTesting",
    descriptionKey: "projects.aiContentTestingDesc",
    status: "reference",
    url: links.aiContentTesting,
  },
  {
    id: "forge-pro",
    titleKey: "projects.forgePro",
    descriptionKey: "projects.forgeProDesc",
    status: "in-development",
    url: links.forgePro,
  },
  {
    id: "aiopedia",
    titleKey: "projects.aiopedia",
    descriptionKey: "projects.aiopediaDesc",
    status: "reference",
    url: links.aiopedia,
  },
  {
    id: "local-ai-website",
    titleKey: "projects.localAiWebsite",
    descriptionKey: "projects.localAiWebsiteDesc",
    status: "reference",
    url: links.localAiWebsite,
  },
];

/** Look up a project by id. Returns undefined rather than throwing. */
export function findProject(id: string): Project | undefined {
  return flagshipProjects.find((project) => project.id === id);
}
