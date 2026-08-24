import { useState, useEffect, type ReactNode } from 'react';
import { LanguageContext, type Language, createTranslator } from './index';

const STORAGE_KEY = 'portfolio-lang';

function getInitialLang(): Language {
  // Check URL query param first (for SEO alternate links)
  try {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'en' || urlLang === 'pt') {
      localStorage.setItem(STORAGE_KEY, urlLang);
      return urlLang;
    }
  } catch {}
  // Then check localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'pt') return saved;
  } catch {}
  return 'en';
}

interface Props { children: ReactNode; }

export function LanguageProvider({ children }: Props) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  const setLang = (l: Language) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', l);
    window.history.replaceState({}, '', url.toString());
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, []);

  const t = createTranslator(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
