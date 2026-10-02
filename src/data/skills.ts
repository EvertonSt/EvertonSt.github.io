import type { TranslationKey } from "../i18n/en";
import type { IconName } from "../types/icon";

/**
 * Skill groups and the focus areas they support.
 *
 * The subtitle deliberately says "shipped with, not read about", which is the
 * claim a hiring manager will test by clicking a repository link. Each category
 * names tools that appear in one of the projects above rather than a wish list
 * of the whole industry.
 */
export interface SkillCategory {
  id: string;
  titleKey: TranslationKey;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "testing",
    titleKey: "stack.testing",
    skills: [
      "Playwright",
      "Cypress",
      "API testing",
      "Deterministic test generation",
      "Failure triage",
      "Duplicate-defect detection",
      "Accessibility testing",
      "Regression budgets",
    ],
  },
  {
    id: "languages",
    titleKey: "stack.languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "C#", "Java"],
  },
  {
    id: "ai",
    titleKey: "stack.ai",
    skills: [
      "LLM evaluation",
      "Model routing",
      "Prompt design",
      "Structured output",
      "Guardrails",
      "Offline inference",
    ],
  },
  {
    id: "fullStack",
    titleKey: "stack.fullStack",
    skills: ["React", "Next.js", "Fastify", "Express", "WebSockets", "Tauri", "Expo", "REST APIs"],
  },
  {
    id: "infrastructure",
    titleKey: "stack.infrastructure",
    skills: [
      "GitHub Actions",
      "CI/CD pipelines",
      "Docker",
      "Vercel",
      "Railway",
      "PostgreSQL",
      "SQLite",
      "npm publishing",
    ],
  },
];

/** The four areas a hiring manager is choosing between. */
export interface FocusArea {
  id: string;
  icon: IconName;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
}

export const focusAreas: FocusArea[] = [
  {
    id: "quality-gates",
    icon: "gauge",
    titleKey: "focus.qualityGates",
    descriptionKey: "focus.qualityGatesDesc",
  },
  {
    id: "automation",
    icon: "beaker",
    titleKey: "focus.automation",
    descriptionKey: "focus.automationDesc",
  },
  {
    id: "llm-evaluation",
    icon: "shield",
    titleKey: "focus.llmEvaluation",
    descriptionKey: "focus.llmEvaluationDesc",
  },
  {
    id: "triage",
    icon: "search",
    titleKey: "focus.reliability",
    descriptionKey: "focus.reliabilityDesc",
  },
  {
    id: "full-stack",
    icon: "layers",
    titleKey: "focus.fullStack",
    descriptionKey: "focus.fullStackDesc",
  },
  {
    id: "shipping",
    icon: "package",
    titleKey: "focus.shipping",
    descriptionKey: "focus.shippingDesc",
  },
];

/**
 * The proof strip.
 *
 * Every figure below is read from a project's own test suite or package record.
 * The source of each one is named in `source`, and the test suite checks that
 * the figure still appears in the project data - so a metric cannot outlive the
 * claim it came from.
 */
export interface ProofMetric {
  value: string;
  labelKey: TranslationKey;
  sourceKey: TranslationKey;
}

export const proofMetrics: ProofMetric[] = [
  { value: "313", labelKey: "proof.testsLabel", sourceKey: "proof.argus" },
  { value: "237", labelKey: "proof.testsLabel", sourceKey: "proof.cerberus" },
  { value: "88%", labelKey: "proof.coverageLabel", sourceKey: "proof.cerberus" },
  { value: "5", labelKey: "proof.projectsLabel", sourceKey: "proof.self" },
  { value: "6", labelKey: "proof.yearsLabel", sourceKey: "proof.self" },
  { value: "2", labelKey: "proof.languagesLabel", sourceKey: "proof.self" },
];
