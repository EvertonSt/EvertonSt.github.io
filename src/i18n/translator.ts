import { en } from "./en";
import pt from "./pt";
import type { TranslationKey, TranslationValue } from "./en";

/** The languages the site ships, in menu order. */
export const LANGUAGES = ["en", "pt"] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "en";

/** BCP 47 tags written to `<html lang>`; Portuguese is not a bare `pt`. */
export const LANGUAGE_TAGS: Record<Language, string> = {
  en: "en",
  pt: "pt-BR",
};

const catalogues: Record<Language, Record<TranslationKey, TranslationValue>> = { en, pt };

/** Narrowing guard. Used wherever a value crosses a boundary (URL, storage). */
export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
}

export interface Translator {
  /** Prose. Throws if the key holds a list. */
  t: (key: TranslationKey) => string;
  /** List of items. Throws if the key holds prose. */
  tList: (key: TranslationKey) => readonly string[];
}

/**
 * Build the accessors for one language.
 *
 * The two accessors are separate on purpose. `t()` on a list key would hand a
 * component an array where it expects a string and render `a,b,c`; `tList()` on
 * a prose key would render a single bullet. Both are programming errors that a
 * type error would normally catch, but the catalogues are built from data and
 * a bad cast can still get through - so each one names the mistake it found.
 */
export function createTranslator(language: Language): Translator {
  const catalogue = catalogues[language];

  const lookup = (key: TranslationKey): TranslationValue => {
    const value = catalogue[key];
    if (value === undefined) {
      throw new Error(`Missing translation for key "${key}" in language "${language}"`);
    }
    return value;
  };

  return {
    t: (key) => {
      const value = lookup(key);
      if (typeof value !== "string") {
        throw new TypeError(`Key "${key}" holds a list in "${language}"; use tList() instead of t().`);
      }
      return value;
    },
    tList: (key) => {
      const value = lookup(key);
      if (typeof value === "string") {
        throw new TypeError(`Key "${key}" holds prose in "${language}"; use t() instead of tList().`);
      }
      return value;
    },
  };
}
