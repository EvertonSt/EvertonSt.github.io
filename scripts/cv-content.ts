import { links } from "../src/data/links";
import { profile } from "../src/data/site";
import { experience } from "../src/data/experience";
import { skillCategories } from "../src/data/skills";
import { flagshipProjects, STATUS_LABEL_KEYS } from "../src/data/projects";
import { createTranslator, type Language } from "../src/i18n/translator";

/**
 * The résumé, as data.
 *
 * One builder, three consumers: the PDF, the plain-text file, and the verifier
 * that compares the two committed artefacts against what this function returns.
 * Three hand-written copies of a résumé drift the moment one of them is edited,
 * and the one that drifts is whichever nobody re-reads - usually the file a
 * recruiter actually downloads.
 *
 * It reads the same `src/data/` modules the site renders, so a project added to
 * the page is in the CV on the next run, and `npm run verify:cv` fails until
 * someone regenerates.
 */
export interface CvEntry {
  title: string;
  organisation: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface CvProject {
  name: string;
  status: string;
  summary: string;
  links: string[];
}

export interface CvDocument {
  name: string;
  role: string;
  contact: string[];
  headline: string[];
  experience: CvEntry[];
  projects: CvProject[];
  skills: { category: string; items: string[] }[];
}

/**
 * Section headings, named rather than indexed.
 *
 * A `Record<string, string>` would let `headings.summary` type as `string |
 * undefined` under `noUncheckedIndexedAccess`, which is a `toUpperCase()` on a
 * value that may not be there - and the résumé would print "undefined" in the
 * place of a section title instead of failing the build.
 */
export interface CvHeadings {
  summary: string;
  experience: string;
  projects: string;
  skills: string;
}

export function buildCv(language: Language = "en"): CvDocument {
  const { t } = createTranslator(language);

  return {
    name: profile.name,
    role: t("hero.roleLine"),
    contact: [
      profile.email,
      links.github.replace("https://", ""),
      "linkedin.com/in/everton-s-andrade",
      `${profile.city}, ${profile.region}, ${profile.country} · ${profile.timezone}`,
    ],
    headline: [t("about.p1"), t("about.p3"), t("about.p4")],
    experience: experience.map((entry) => ({
      title: t(entry.titleKey),
      organisation: t(entry.companyKey),
      period: entry.period,
      location: entry.location,
      bullets: entry.achievementKeys.map((key) => t(key)),
    })),
    projects: flagshipProjects.map((project) => ({
      name: t(project.titleKey),
      status: t(STATUS_LABEL_KEYS[project.status]),
      summary: t(project.subtitleKey),
      links: project.links.map((link) => link.url),
    })),
    skills: skillCategories.map((category) => ({
      category: t(category.titleKey),
      items: category.skills,
    })),
  };
}

/** Section headings, kept beside the document so PDF and text cannot disagree. */
export function cvHeadings(language: Language = "en"): CvHeadings {
  const { t } = createTranslator(language);
  return {
    summary: t("resume.summaryLabel"),
    experience: t("resume.experienceLabel"),
    projects: t("resume.projectsLabel"),
    skills: t("resume.stackLabel"),
  };
}

/** Render the plain-text résumé. Two-space indent, no markup, no wrapping tricks. */
export function renderResumeText(cv: CvDocument, language: Language = "en"): string {
  const headings = cvHeadings(language);
  const lines: string[] = [];

  lines.push(cv.name);
  lines.push(cv.role);
  lines.push(cv.contact.join(" | "));
  lines.push("");

  lines.push(headings.summary.toUpperCase());
  for (const paragraph of cv.headline) {
    lines.push("", paragraph);
  }

  lines.push("", headings.experience.toUpperCase());
  for (const entry of cv.experience) {
    lines.push("", `${entry.title} — ${entry.organisation}`);
    lines.push(`${entry.period} · ${entry.location}`);
    for (const bullet of entry.bullets) {
      lines.push(`  - ${bullet}`);
    }
  }

  lines.push("", headings.projects.toUpperCase());
  for (const project of cv.projects) {
    lines.push("", `${project.name} (${project.status})`);
    lines.push(`  ${project.summary}`);
    for (const link of project.links) {
      lines.push(`  ${link}`);
    }
  }

  lines.push("", headings.skills.toUpperCase());
  for (const group of cv.skills) {
    lines.push(`${group.category}: ${group.items.join(", ")}`);
  }

  return `${lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd()}\n`;
}
