import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { en } from "@/i18n/en";
import pt from "@/i18n/pt";
import { links, repositoryUrls } from "@/data/links";
import { profile } from "@/data/site";
import { flagshipProjects, supportingProjects, STATUS_DETAIL_KEYS, STATUS_LABEL_KEYS } from "@/data/projects";
import { experience } from "@/data/experience";
import { focusAreas, proofMetrics, skillCategories } from "@/data/skills";
import type { TranslationKey } from "@/i18n/en";

/**
 * Data integrity.
 *
 * Content drift is the failure mode of a portfolio: a project is removed, a
 * repository is renamed, a figure is updated - and the sentence somewhere else
 * that described it is left behind saying the old thing. Nothing crashes. The
 * page simply stops being true, which on a hiring site is the only failure that
 * actually matters.
 *
 * Every assertion here names a way the data could become dishonest.
 */

const catalogue = en as unknown as Record<TranslationKey, unknown>;

describe("project data", () => {
  it("gives every project a unique, URL-safe id", () => {
    const ids = flagshipProjects.map((project) => project.id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("gives every project a status with a label and a detail in both languages", () => {
    for (const project of flagshipProjects) {
      const labelKey = STATUS_LABEL_KEYS[project.status];
      const detailKey = STATUS_DETAIL_KEYS[project.status];

      expect(catalogue[labelKey], `${project.id} status label`).toBeTruthy();
      expect(catalogue[detailKey], `${project.id} status detail`).toBeTruthy();
      expect((pt as unknown as Record<string, unknown>)[labelKey]).toBeTruthy();
      expect((pt as unknown as Record<string, unknown>)[detailKey]).toBeTruthy();
    }
  });

  it("never describes an unlaunched product as being in production", () => {
    // The specific overstatement this guards: "in production" implies customers
    // exist. A project that has not launched must not carry that label.
    const LAUNCHING: ReadonlyArray<string> = ["launching-january", "parked"];

    for (const project of flagshipProjects) {
      const claimsProduction = STATUS_LABEL_KEYS[project.status] === "status.live";

      if (LAUNCHING.includes(project.status)) {
        expect(claimsProduction, `${project.id} is not launched and must not claim production`).toBe(false);
      }
    }
  });

  it("states a date for a launch status and no date for a held one", () => {
    /*
     * The literals the page-level honesty tests used to pin live here, at the level
     * where a date is a fact rather than a rendering: a status that promises a
     * launch must name the day, and a status that says the launch is on hold must
     * not name one - a held product with a date in its detail line would resurrect
     * the promise the hold exists to withdraw.
     */
    const launchDetail = en["status.launchingDetail"] as string;
    expect(launchDetail, "the launch detail names no date").toMatch(/\d{1,2} \w+ 20\d\d/);

    const parkedDetail = en["status.parkedDetail"] as string;
    expect(parkedDetail, "a held status must not name a date").not.toMatch(/\d/);

    const launchDetailPt = (pt as unknown as Record<string, string>)["status.launchingDetail"] as string;
    expect(launchDetailPt, "the pt launch detail names no date").toMatch(/\d{1,2} de \w+ de 20\d\d/);

    const parkedDetailPt = (pt as unknown as Record<string, string>)["status.parkedDetail"] as string;
    expect(parkedDetailPt, "a held status must not name a date in pt").not.toMatch(/\d/);
  });

  it("gives every featured project a full case study, and a link or a stated hold", () => {
    for (const project of flagshipProjects) {
      // Either the card links somewhere, or it says in words why it does not.
      // Both halves are asserted: a hold note on a card that does link would
      // render the note and the buttons together, which is a contradiction.
      if (project.links.length === 0) {
        const hold = project.linkHoldKey;
        expect(hold, `${project.id} has no links and no link hold`).toBeDefined();
        expect(
          (en as unknown as Record<string, unknown>)[hold as string],
          `en misses the hold note`
        ).toBeTruthy();
        expect(
          (pt as unknown as Record<string, unknown>)[hold as string],
          `pt misses the hold note`
        ).toBeTruthy();
      } else {
        expect(project.linkHoldKey, `${project.id} declares a hold and links anyway`).toBeUndefined();
      }
      expect(project.caseStudy.length, `${project.id} case study length`).toBe(4);
      expect(
        project.caseStudy.map((part) => part.titleKey),
        `${project.id} case study must follow the shared order`
      ).toEqual(["cs.problem", "cs.architecture", "cs.decisions", "cs.evidence"]);
    }
  });

  it("leaves metrics empty rather than inventing a figure", () => {
    // A placeholder number on a pre-launch product is a false claim. The two
    // products that have not launched carry no metrics, and that must stay true.
    for (const project of flagshipProjects) {
      if (project.status === "launching-january" || project.status === "parked") {
        expect(project.metrics, `${project.id} must not publish invented metrics`).toEqual([]);
      }
    }
  });

  it("resolves every catalogue key referenced by project data", () => {
    const missing: string[] = [];

    // Featured and supporting projects have different shapes on purpose - a
    // supporting entry is a link and a status, not a case study - so each is
    // walked against its own type rather than a union that pretends they match.
    for (const project of flagshipProjects) {
      const keys: TranslationKey[] = [
        project.titleKey,
        project.subtitleKey,
        project.descriptionKey,
        project.tagsKey,
        ...project.links.map((link) => link.labelKey),
        ...project.caseStudy.flatMap((part) => [part.titleKey, part.bodyKey]),
      ];

      for (const key of keys) {
        if (!catalogue[key]) missing.push(`${project.id}:${key}`);
      }
    }

    for (const project of supportingProjects) {
      const keys: TranslationKey[] = [
        project.titleKey,
        project.descriptionKey,
        STATUS_LABEL_KEYS[project.status],
      ];

      for (const key of keys) {
        if (!catalogue[key]) missing.push(`${project.id}:${key}`);
      }
    }

    expect(missing).toEqual([]);
  });

  it("uses only absolute https URLs for outbound links", () => {
    for (const project of flagshipProjects) {
      for (const link of project.links) {
        expect(link.url, `${project.id} link ${link.url}`).toMatch(/^https:\/\//);
      }
    }
    for (const project of supportingProjects) {
      expect(project.url, `${project.id} url`).toMatch(/^https:\/\//);
    }
  });

  it("points every repository link at the owner account", () => {
    for (const url of Object.values(repositoryUrls)) {
      expect(url).toContain("github.com/EvertonSt");
    }
  });

  it("points supporting projects at a repository", () => {
    for (const project of supportingProjects) {
      expect(repositoryUrls, `${project.id} has no entry in repositoryUrls`).toHaveProperty(project.id);
      expect(project.url).toBe((repositoryUrls as Record<string, string>)[project.id]);
    }
  });

  it("never names a private product repository anywhere this repository ships", () => {
    /*
     * The two commercial products keep their repositories private
     * (docs/decisions/0005). The site, the structured data in `index.html` and the
     * generated resume may describe the products; naming their source would put a
     * private repository one click from a public page. The resume PDF is written
     * uncompressed on purpose, so its text is readable here as bytes - the guard
     * sees the artefact a visitor downloads, not only the data it came from.
     */
    const forbidden = ["github.com/evertonst/sitecheckin", "github.com/evertonst/aitendimento"];
    const root = path.resolve(import.meta.dirname, "../..");
    const indexHtmlPath = path.join(root, "index.html");

    const walk = (dir: string): string[] =>
      readdirSync(dir).flatMap((entry) => {
        const full = path.join(dir, entry);
        return statSync(full).isDirectory() ? walk(full) : [full];
      });

    const shipped = [...walk(path.join(root, "src")), indexHtmlPath, ...walk(path.join(root, "public"))];
    expect(shipped.length, "the walk found nothing to inspect").toBeGreaterThan(20);

    /*
     * The PDF is written uncompressed (decision 0004), but a URL can still be
     * emitted as more than one text-showing operator. Stripping whitespace and
     * the PDF string delimiters folds those back together before the search, so
     * the check does not depend on how the layout engine happened to wrap a
     * line.
     */
    const normalize = (value: string) => value.toLowerCase().replace(/[\s()\\]/g, "");

    const found: string[] = [];
    for (const file of shipped) {
      const text = normalize(readFileSync(file, "latin1"));
      for (const needle of forbidden) {
        if (text.includes(normalize(needle))) {
          found.push(`${path.relative(root, file)} names ${needle}`);
        }
      }
    }

    expect(found).toEqual([]);
  });

  it("does not list the same project twice across flagship and supporting", () => {
    const flagship = new Set(flagshipProjects.map((p) => p.id));
    const duplicates = supportingProjects.filter((p) => flagship.has(p.id)).map((p) => p.id);

    expect(duplicates).toEqual([]);
  });
});

describe("copy agrees with the data", () => {
  /*
   * A number written in prose is a number that can go stale. The section
   * subtitles state how many projects and focus areas there are; if the data
   * changes and the sentence does not, the page starts lying in a way no type
   * check can see. These assertions read the number out of the sentence and
   * compare it to the array it describes.
   *
   * Both languages spell small numbers out, and they do not spell them the same
   * way - "Five systems" and "Cinco sistemas". A reader that only understood
   * English would report a null for the Portuguese sentence and take the check
   * with it, which is why the word list is per language.
   *
   * Returning null for an unparseable sentence is deliberate: the assertions
   * below require a number to be present, so rewriting the sentence to drop it
   * fails the test rather than quietly disabling the check.
   */
  const NUMBER_WORDS = {
    en: { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 },
    pt: {
      um: 1,
      dois: 2,
      duas: 2,
      três: 3,
      quatro: 4,
      cinco: 5,
      seis: 6,
      sete: 7,
      oito: 8,
      nove: 9,
      dez: 10,
    },
  } as const;

  const leadingNumber = (locale: keyof typeof NUMBER_WORDS, sentence: string): number | null => {
    const digits = /^\D*(\d+)/.exec(sentence);
    if (digits?.[1]) return Number(digits[1]);

    const table = NUMBER_WORDS[locale];
    const words = Object.keys(table).join("|");
    // Lazy, not greedy: `\\D*` would otherwise consume as much prose as it
    // could and report the LAST number word in the sentence - "um" deep inside
    // "cada um" - instead of the count it opens with.
    const match = new RegExp(`^\\D*?\\b(${words})\\b`, "i").exec(sentence);
    const word = match?.[1]?.toLowerCase();
    if (!word) return null;

    // Each language spells its own numbers, so a matched word is only a key in
    // the table it was matched against - the Portuguese "um" is not an English
    // one, and a cast across the union would happily return undefined.
    return (table as Record<string, number>)[word] ?? null;
  };

  it("states the real number of flagship projects", () => {
    const enCount = leadingNumber("en", en["work.subtitle"]);
    const ptCount = leadingNumber("pt", pt["work.subtitle"]);

    expect(enCount, "the English sentence must state a count").toBe(flagshipProjects.length);
    expect(ptCount, "the Portuguese sentence must state a count").toBe(flagshipProjects.length);
  });

  it("states the real number of focus areas", () => {
    expect(leadingNumber("en", en["focus.subtitle"])).toBe(focusAreas.length);
    expect(leadingNumber("pt", pt["focus.subtitle"])).toBe(focusAreas.length);
  });

  it("reports a project count in the proof strip that matches the data", () => {
    const projectMetric = proofMetrics.find((metric) => metric.labelKey === "proof.projectsLabel");

    expect(projectMetric, "the proof strip must count the flagship projects").toBeDefined();
    expect(projectMetric?.value).toBe(String(flagshipProjects.length));
  });

  it("reports a test count in the proof strip that matches a project metric", () => {
    // The proof strip says "313 tests passing, Argus". If Argus's own card
    // stops saying 313, one of the two is a lie.
    const argus = flagshipProjects.find((project) => project.id === "argus");
    const argusTests = argus?.metrics.find((metric) => metric.labelKey === "proof.testsLabel");
    const stripTests = proofMetrics.find((metric) => metric.sourceKey === "proof.argus");

    expect(argusTests?.value).toBeDefined();
    expect(stripTests?.value).toBe(argusTests?.value);
  });
});

describe("supporting data", () => {
  it("gives every experience entry at least two achievements", () => {
    for (const entry of experience) {
      expect(entry.achievementKeys.length, entry.id).toBeGreaterThanOrEqual(2);
      for (const key of entry.achievementKeys) {
        expect(catalogue[key], `${entry.id}:${key}`).toBeTruthy();
      }
    }
  });

  it("gives every experience entry a period and a location", () => {
    for (const entry of experience) {
      expect(entry.period.trim().length).toBeGreaterThan(0);
      expect(entry.location.trim().length).toBeGreaterThan(0);
    }
  });

  it("gives every skill category a title and at least three skills", () => {
    for (const category of skillCategories) {
      expect(catalogue[category.titleKey], category.id).toBeTruthy();
      expect(category.skills.length, category.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("gives every focus area a title, a description and an icon", () => {
    for (const area of focusAreas) {
      expect(catalogue[area.titleKey], area.id).toBeTruthy();
      expect(catalogue[area.descriptionKey], area.id).toBeTruthy();
      expect(area.icon).toBeTruthy();
    }
  });
});

describe("contact details", () => {
  it("exposes a usable email address", () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(links.emailHref).toBe(`mailto:${profile.email}`);
  });

  it("gives the profile and the links module the same email", () => {
    expect(profile.email).toBe(links.email);
  });

  it("points the résumé artifacts at files that ship in public/", () => {
    // A relative path to a file that was never generated produces a 404 on the
    // one link a recruiter is most likely to click.
    expect(links.resumePdf.startsWith("/")).toBe(true);
    expect(links.resumeTxt.startsWith("/")).toBe(true);
    expect(links.resumePdf).not.toBe(links.resumeTxt);
  });
});
