import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { LanguageContext } from "./context";
import { createTranslator, type Language } from "./translator";
import {
  applyLanguageToDocument,
  readStoredLanguage,
  resolveInitialLanguage,
  writeStoredLanguage,
} from "./language";

interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Owns the active language and keeps three things in step: the rendered copy,
 * the `<html lang>` attribute, and the stored preference.
 *
 * Storage failures are handled rather than swallowed: if the write fails the
 * URL still carries the choice for this visit, and the site keeps working with
 * storage blocked instead of throwing inside an event handler.
 */
export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() =>
    resolveInitialLanguage(window.location.search, readStoredLanguage())
  );

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    applyLanguageToDocument(document, next);
    writeStoredLanguage(next);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(window.history.state, "", url.toString());
  }, []);

  useEffect(() => {
    applyLanguageToDocument(document, language);
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, ...createTranslator(language) }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
