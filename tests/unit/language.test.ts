import { describe, expect, it } from "vitest";
import {
  LANGUAGE_QUERY_PARAM,
  STORAGE_KEY,
  applyLanguageToDocument,
  languageUrl,
  readLanguageFromSearch,
  readStoredLanguage,
  resolveInitialLanguage,
  writeStoredLanguage,
} from "@/i18n/language";

/**
 * Language persistence.
 *
 * Storage access genuinely throws: private mode throws a quota error on write,
 * and a browser with site data blocked throws on both. The previous version of
 * this code had two bare `catch {}` blocks, which is how a site can end up
 * forgetting a reader's language choice with nothing in the console. The defined
 * behaviour is that an unreadable store means "no preference".
 */

describe("readStoredLanguage", () => {
  it("reads a stored language", () => {
    window.localStorage.setItem(STORAGE_KEY, "pt");
    expect(readStoredLanguage()).toBe("pt");
  });

  it("returns null when nothing is stored", () => {
    expect(readStoredLanguage()).toBeNull();
  });

  it("returns null for a value that is not a known language", () => {
    window.localStorage.setItem(STORAGE_KEY, "fr");
    expect(readStoredLanguage()).toBeNull();
  });

  it("returns null when storage throws, rather than propagating", () => {
    // Replace the whole store rather than spying on the prototype: happy-dom
    // does not route localStorage through `Storage.prototype`, so a prototype
    // spy silently leaves the real implementation in place and this test would
    // pass without the guard ever running.
    const original = window.localStorage;
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: () => {
          throw new DOMException("blocked", "SecurityError");
        },
        setItem: () => undefined,
        removeItem: () => undefined,
        clear: () => undefined,
        key: () => null,
        length: 0,
      },
    });

    try {
      expect(readStoredLanguage()).toBeNull();
    } finally {
      Object.defineProperty(window, "localStorage", { configurable: true, value: original });
    }
  });
});

describe("writeStoredLanguage", () => {
  it("persists a language and reports success", () => {
    expect(writeStoredLanguage("pt")).toBe(true);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("pt");
  });

  it("reports failure instead of throwing when storage is blocked", () => {
    const original = window.localStorage;
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: () => null,
        setItem: () => {
          throw new DOMException("quota", "QuotaExceededError");
        },
        removeItem: () => undefined,
        clear: () => undefined,
        key: () => null,
        length: 0,
      },
    });

    try {
      // A throw here would escape the click handler and leave the reader with
      // a theme that changed but a preference that was never saved.
      expect(writeStoredLanguage("en")).toBe(false);
    } finally {
      Object.defineProperty(window, "localStorage", { configurable: true, value: original });
    }
  });
});

describe("readLanguageFromSearch", () => {
  it("reads the language from the query string", () => {
    expect(readLanguageFromSearch("?lang=pt")).toBe("pt");
    expect(readLanguageFromSearch("lang=en&other=1")).toBe("en");
  });

  it("returns null for a missing or unknown value", () => {
    expect(readLanguageFromSearch("")).toBeNull();
    expect(readLanguageFromSearch("?other=1")).toBeNull();
    expect(readLanguageFromSearch("?lang=fr")).toBeNull();
    expect(readLanguageFromSearch("?lang=pt-BR")).toBeNull();
  });

  it("does not match a parameter that merely starts with the name", () => {
    expect(readLanguageFromSearch("?language=pt")).toBeNull();
  });

  it("uses the parameter name the HTML alternates also use", () => {
    // If these drift apart, the hreflang links in index.html stop working and
    // nothing else notices, because both sides still look correct.
    expect(LANGUAGE_QUERY_PARAM).toBe("lang");
  });
});

describe("resolveInitialLanguage", () => {
  it("prefers the URL over the stored preference", () => {
    expect(resolveInitialLanguage("?lang=pt", "en")).toBe("pt");
  });

  it("falls back to storage when the URL says nothing", () => {
    expect(resolveInitialLanguage("", "pt")).toBe("pt");
  });

  it("falls back to English when neither is present", () => {
    expect(resolveInitialLanguage("", null)).toBe("en");
  });

  it("ignores an unknown language in the URL rather than trusting it", () => {
    expect(resolveInitialLanguage("?lang=fr", "pt")).toBe("pt");
  });
});

describe("applyLanguageToDocument", () => {
  it("writes the BCP 47 tag, not the bare code", () => {
    applyLanguageToDocument(document, "pt");
    expect(document.documentElement.lang).toBe("pt-BR");

    applyLanguageToDocument(document, "en");
    expect(document.documentElement.lang).toBe("en");
  });
});

describe("languageUrl", () => {
  it("sets the language while preserving the rest of the URL", () => {
    const result = languageUrl("https://evertonst.github.io/#resume", "pt");

    expect(result).toContain("lang=pt");
    expect(result).toContain("#resume");
  });

  it("replaces an existing language rather than appending a second one", () => {
    const result = languageUrl("https://evertonst.github.io/?lang=en", "pt");

    expect(result).toContain("lang=pt");
    expect(result).not.toContain("lang=en");
    expect(result.match(/lang=/g)).toHaveLength(1);
  });
});
