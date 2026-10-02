import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

/**
 * "system" is a real state, not an absence of one. Collapsing it to
 * light/dark on load means a reader who deliberately followed their operating
 * system cannot get back to it once they press the toggle.
 */
export type ThemePreference = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "everton-portfolio:theme";

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

/** Read the stored preference; an unreadable store means "no preference". */
export function readStoredTheme(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

function persist(preference: ThemePreference): boolean {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
    return true;
  } catch {
    // Storage can be blocked entirely - site data disabled, or private mode. The
    // theme still applies for this visit; only the preference is lost.
    return false;
  }
}

/**
 * Reflect the preference onto the document.
 *
 * `system` removes the attribute rather than setting it, which is what hands the
 * decision back to the `prefers-color-scheme` block in `variables.css`. Writing
 * `data-theme="system"` instead would pin the theme and silently break the OS
 * preference for good.
 */
export function applyTheme(preference: ThemePreference, root: HTMLElement): void {
  if (preference === "system") {
    root.removeAttribute("data-theme");
    return;
  }
  root.setAttribute("data-theme", preference);
}

export interface ThemeControls {
  preference: ThemePreference;
  setPreference: (next: ThemePreference) => void;
  /** What the page is actually showing right now, resolved against the OS. */
  resolved: "light" | "dark";
}

export function useTheme(): ThemeControls {
  const [preference, setPreferenceState] = useState<ThemePreference>(readStoredTheme);
  const systemDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    applyTheme(preference, document.documentElement);
  }, [preference]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    persist(next);
  }, []);

  const resolved: "light" | "dark" = preference === "system" ? (systemDark ? "dark" : "light") : preference;

  return { preference, setPreference, resolved };
}
