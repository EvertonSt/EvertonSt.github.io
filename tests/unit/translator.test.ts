import { describe, expect, it } from "vitest";
import { DEFAULT_LANGUAGE, LANGUAGE_TAGS, LANGUAGES, createTranslator, isLanguage } from "@/i18n/translator";

/**
 * Translator behaviour.
 *
 * The error paths are asserted before the happy paths, deliberately. A test that
 * only checks `t("hero.title")` returns English would pass if `t()` returned the
 * key on every input, and the failure it is guarding against - a missing string
 * rendering as `hero.title` in front of a recruiter - would go unnoticed.
 */

describe("language guards", () => {
  it("exposes exactly en and pt, English first", () => {
    expect(LANGUAGES).toEqual(["en", "pt"]);
    expect(DEFAULT_LANGUAGE).toBe("en");
  });

  it("writes a real BCP 47 tag, not a bare language code", () => {
    expect(LANGUAGE_TAGS.en).toBe("en");
    expect(LANGUAGE_TAGS.pt).toBe("pt-BR");
  });

  it("accepts only known languages", () => {
    expect(isLanguage("en")).toBe(true);
    expect(isLanguage("pt")).toBe(true);
    expect(isLanguage("EN")).toBe(false);
    expect(isLanguage("pt-BR")).toBe(false);
    expect(isLanguage("fr")).toBe(false);
    expect(isLanguage("")).toBe(false);
    expect(isLanguage(null)).toBe(false);
    expect(isLanguage(undefined)).toBe(false);
    expect(isLanguage(42)).toBe(false);
  });
});

describe("createTranslator", () => {
  it("returns prose for a prose key", () => {
    const { t } = createTranslator("en");
    const value = t("hero.roleLine");

    expect(typeof value).toBe("string");
    expect(value.length).toBeGreaterThan(0);
  });

  it("returns a non-empty list for a list key", () => {
    const { tList } = createTranslator("en");
    const value = tList("hero.skills");

    expect(Array.isArray(value)).toBe(true);
    expect(value.length).toBeGreaterThan(3);
    for (const item of value) expect(typeof item).toBe("string");
  });

  it("gives different text per language", () => {
    const en = createTranslator("en");
    const pt = createTranslator("pt");

    expect(en.t("contact.title")).not.toBe(pt.t("contact.title"));
  });

  it("throws when prose is requested for a list key, naming the key", () => {
    const { t } = createTranslator("en");

    // The failure mode this prevents: `t()` on an array key returns the array,
    // React renders it comma-joined, and the hero shows one long sentence
    // instead of a row of tags. Nothing else would catch it.
    expect(() => t("hero.skills")).toThrow(TypeError);
    expect(() => t("hero.skills")).toThrow(/hero\.skills/);
    expect(() => t("hero.skills")).toThrow(/tList/);
  });

  it("throws when a list is requested for a prose key, naming the key", () => {
    const { tList } = createTranslator("en");

    expect(() => tList("hero.title")).toThrow(TypeError);
    expect(() => tList("hero.title")).toThrow(/hero\.title/);
    expect(() => tList("hero.title")).toThrow(/t\(\)/);
  });

  it("throws the same way in both languages, so a gap cannot hide in one locale", () => {
    expect(() => createTranslator("pt").t("hero.skills")).toThrow(TypeError);
    expect(() => createTranslator("pt").tList("hero.title")).toThrow(TypeError);
  });

  it("never returns the key itself for a valid key", () => {
    const translator = createTranslator("en");

    // Every key resolving to itself would mean the lookup silently fell through
    // and the page was showing key names to a recruiter.
    expect(translator.t("hero.title")).not.toBe("hero.title");
    expect(translator.t("contact.emailLabel")).not.toBe("contact.emailLabel");
  });
});
