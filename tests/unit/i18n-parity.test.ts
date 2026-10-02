import { describe, expect, it } from "vitest";
import { en } from "@/i18n/en";
import pt from "@/i18n/pt";

/**
 * Translation integrity.
 *
 * `pt.ts` is typed `TranslationCatalogue`, so the compiler already refuses a
 * missing key or a string where English has a list. That covers the mistakes you
 * make while typing. It does not cover a key that is present and empty, a key
 * left as the English text by accident, or a catalogue that someone widens to
 * `Record<string, string>` to get past an error - at which point the type stops
 * protecting anything.
 *
 * So these assertions check the same properties at runtime, from the actual
 * objects, rather than trusting the annotation.
 */

const enKeys = Object.keys(en).sort();
const ptKeys = Object.keys(pt).sort();

describe("EN/PT parity", () => {
  it("exposes the same keys in both catalogues", () => {
    expect(ptKeys).toEqual(enKeys);
  });

  it("has no empty or whitespace-only values in either locale", () => {
    const blank: string[] = [];
    for (const [locale, catalogue] of [
      ["en", en],
      ["pt", pt],
    ] as const) {
      for (const [key, value] of Object.entries(catalogue)) {
        if (typeof value === "string" && value.trim() === "") blank.push(`${locale}:${key}`);
        if (Array.isArray(value) && value.length === 0) blank.push(`${locale}:${key} (empty list)`);
      }
    }
    expect(blank).toEqual([]);
  });

  it("gives every list key the same number of items in both locales", () => {
    const mismatched: string[] = [];
    for (const [key, value] of Object.entries(en)) {
      if (!Array.isArray(value)) continue;
      const translated = (pt as Record<string, unknown>)[key];
      if (!Array.isArray(translated)) continue;
      if (translated.length !== value.length) mismatched.push(key);
    }
    expect(mismatched).toEqual([]);
  });

  it("matches the value shape per key: prose stays prose, lists stay lists", () => {
    const wrongShape: string[] = [];
    for (const key of enKeys) {
      const source = (en as Record<string, unknown>)[key];
      const translated = (pt as Record<string, unknown>)[key];
      if (Array.isArray(source) !== Array.isArray(translated)) wrongShape.push(key);
    }
    expect(wrongShape).toEqual([]);
  });

  it("keeps Portuguese text out of the English catalogue and vice versa", () => {
    // A short list of function words that indicate one language was pasted into
    // the other file. Not exhaustive - it is a tripwire, not a language test.
    const portugueseMarkers = ["obrigatóriamente", "você", "usuário", "página", "sistema"];
    const englishMarkers = ["the ", " and ", " with "];

    const leaked: string[] = [];
    for (const key of enKeys) {
      const value = (en as Record<string, unknown>)[key];
      if (typeof value !== "string") continue;
      if (portugueseMarkers.some((marker) => value.toLowerCase().includes(marker))) leaked.push(`en:${key}`);
    }
    for (const key of ptKeys) {
      const value = (pt as Record<string, unknown>)[key];
      if (typeof value !== "string") continue;
      if (englishMarkers.some((marker) => value.toLowerCase().includes(marker))) leaked.push(`pt:${key}`);
    }
    expect(leaked).toEqual([]);
  });

  it("covers every key a component can ask for", () => {
    // The keys the UI reaches for at runtime, collected by hand from the
    // components. A key used in a component but absent from both catalogues
    // would render as the raw key text.
    const keysUsedInUi = [
      "hero.title",
      "hero.subtitle",
      "hero.roleLine",
      "hero.availability",
      "hero.languages",
      "hero.workAuth",
      "hero.skills",
      "hero.primaryCta",
      "hero.resumeCta",
      "work.title",
      "work.subtitle",
      "work.readCaseStudy",
      "work.hideCaseStudy",
      "work.visitRepo",
      "work.liveDemo",
      "work.npmPackage",
      "focus.title",
      "focus.subtitle",
      "projects.title",
      "projects.subtitle",
      "experience.title",
      "experience.subtitle",
      "resume.title",
      "resume.subtitle",
      "resume.downloadPdf",
      "resume.downloadTxt",
      "stack.title",
      "stack.subtitle",
      "about.title",
      "contact.title",
      "contact.subtitle",
      "footer.tagline",
      "doc.skipToContent",
    ];

    const missing = keysUsedInUi.filter((key) => !(key in en) || !(key in pt));
    expect(missing).toEqual([]);
  });
});
