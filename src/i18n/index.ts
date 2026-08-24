import { createContext, useContext } from 'react';
import en from './en';
import pt from './pt';

export type Language = 'en' | 'pt';

const translations: Record<Language, Record<string, string>> = { en, pt };

export const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}>({ lang: 'en', setLang: () => {}, t: (k) => k });

export function useLanguage() {
  return useContext(LanguageContext);
}

export function createTranslator(lang: Language) {
  return (key: string): string => {
    return translations[lang][key] ?? translations.en[key] ?? key;
  };
}
