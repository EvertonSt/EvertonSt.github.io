import { DEFAULT_LANGUAGE, isLanguage, LANGUAGE_TAGS, type Language } from "./translator";

/**
 * Where the chosen language is remembered. Scoped to this site, and the name
 * is versioned so a future copy of the site cannot collide with it.
 */
export const STORAGE_KEY = "everton-portfolio:lang";

/** Query parameter used by the hreflang links in index.html. */
export const LANGUAGE_QUERY_PARAM = "lang";

/**
 * Read a stored language.
 *
 * Storage access genuinely throws: Safari private mode throws a quota error on
 * `setItem`, and a browser with site data blocked throws on both. That is why
 * the previous version had two bare `catch {}` blocks - and why the failure was
 * invisible. The defined behaviour is: an unreadable preference is treated as
 * no preference, and the site falls back to the URL and then to English.
 */
export function readStoredLanguage(): Language | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** Persist a language, reporting whether it stuck so the caller can stop trying. */
export function writeStoredLanguage(language: Language): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read the language from a query string. Pure, so it can be tested without a
 * DOM and reused by the static generator.
 */
export function readLanguageFromSearch(search: string): Language | null {
  const requested = new URLSearchParams(search).get(LANGUAGE_QUERY_PARAM);
  return isLanguage(requested) ? requested : null;
}

/**
 * Resolve the language on first paint.
 *
 * The URL wins over storage so a shared link does something predictable: a
 * reader who follows `?lang=pt` sees Portuguese even on a machine where someone
 * else chose English. Storage wins over the default so the choice survives a
 * reload.
 */
export function resolveInitialLanguage(search: string, stored: Language | null): Language {
  return readLanguageFromSearch(search) ?? stored ?? DEFAULT_LANGUAGE;
}

/** Mirror the language onto `<html lang>` so assistive tech reads the right voice. */
export function applyLanguageToDocument(documentRef: Document, language: Language): void {
  documentRef.documentElement.lang = LANGUAGE_TAGS[language];
}

/**
 * Build the URL for the other language, preserving the path and hash.
 * Used by the language buttons so switching does not reset the scroll target.
 */
export function languageUrl(href: string, language: Language): string {
  const url = new URL(href);
  url.searchParams.set(LANGUAGE_QUERY_PARAM, language);
  return url.toString();
}
