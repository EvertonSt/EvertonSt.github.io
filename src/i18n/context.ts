import { createContext, useContext } from "react";
import type { Translator } from "./translator";
import type { Language } from "./translator";

export interface LanguageContextValue extends Translator {
  language: Language;
  setLanguage: (language: Language) => void;
}

const fallback: LanguageContextValue = {
  language: "en",
  setLanguage: () => undefined,
  t: (key) => key,
  tList: () => [],
};

export const LanguageContext = createContext<LanguageContextValue>(fallback);

/**
 * Access the active language.
 *
 * The fallback context is safe rather than throwing, so a component rendered
 * outside the provider (an isolated unit test, a future storybook) degrades to
 * visible keys instead of taking down the tree.
 */
export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
