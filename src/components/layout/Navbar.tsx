import { useCallback, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../i18n/context";
import { languageUrl } from "../../i18n/language";
import type { TranslationKey } from "../../i18n/en";
import { links } from "../../data/links";
import "./Navbar.css";

interface NavItem {
  id: string;
  labelKey: TranslationKey;
}

/**
 * Declared outside the component so the array keeps one identity across
 * renders. An array literal here would be a new reference on every render, and
 * the scroll spy keys its effect on the joined ids precisely so that does not
 * matter - but a stable constant costs nothing and documents the intent.
 */
const NAV_ITEMS: NavItem[] = [
  { id: "work", labelKey: "nav.work" },
  { id: "focus", labelKey: "nav.focus" },
  { id: "experience", labelKey: "nav.experience" },
  { id: "resume", labelKey: "nav.resume" },
  { id: "contact", labelKey: "nav.contact" },
];

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const { language, t } = useLanguage();
  const { setPreference, resolved } = useTheme();
  const activeId = useScrollSpy(NAV_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useFocusTrap(panelRef, menuOpen, closeMenu);

  const scrollTo = (id: string) => {
    closeMenu();
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  const nextThemeLabel = resolved === "dark" ? t("nav.themeToLight") : t("nav.themeToDark");

  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label={t("nav.menuLabel")}>
        <a className="navbar__brand" href="#hero" onClick={(event) => event.preventDefault()}>
          <span className="navbar__brand-name">Everton S. Andrade</span>
          <span className="navbar__brand-role">{t("hero.roleLine")}</span>
        </a>

        <ul className="navbar__links">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                className="navbar__link"
                href={`#${item.id}`}
                aria-current={activeId === item.id ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(item.id);
                }}
              >
                {t(item.labelKey)}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <a
            className="navbar__lang"
            href={languageUrl(window.location.href, language === "en" ? "pt" : "en")}
            hrefLang={language === "en" ? "pt-BR" : "en"}
            aria-label={language === "en" ? t("lang.toPt") : t("lang.toEn")}
          >
            {language === "en" ? t("lang.pt") : t("lang.en")}
          </a>

          <button
            type="button"
            className="theme-toggle"
            onClick={() => setPreference(resolved === "dark" ? "light" : "dark")}
            aria-label={nextThemeLabel}
            title={nextThemeLabel}
          >
            <Icon name={resolved === "dark" ? "sun" : "moon"} size={18} />
          </button>

          <a
            className="navbar__social"
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Icon name="github" size={20} />
          </a>

          <Button
            variant="primary"
            size="sm"
            href="#contact"
            onClick={() => scrollTo("contact")}
            className="navbar__cta"
          >
            {t("nav.primaryCta")}
          </Button>

          <button
            type="button"
            className="navbar__hamburger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </nav>

      {/*
        Rendered only while open. Keeping a hidden dialog in the DOM and toggling
        a class is what produced the "invisible menu" bug on 2026-10-01: the
        element was present, focusable and announced, but off-screen. Removing it
        means it cannot be in the tab order while closed.
      */}
      {menuOpen ? (
        <div
          className="navbar__panel"
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.mobileMenu")}
        >
          <ul className="navbar__panel-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  className="navbar__panel-link"
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo(item.id);
                  }}
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__panel-actions">
            <Button
              variant="primary"
              size="lg"
              href="#contact"
              onClick={() => scrollTo("contact")}
              className="navbar__panel-cta"
            >
              {t("nav.primaryCta")}
            </Button>
            <div className="navbar__panel-social">
              <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Icon name="github" size={22} />
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icon name="linkedin" size={22} />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
