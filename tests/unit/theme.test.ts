import { describe, expect, it, vi } from "vitest";
import { THEME_STORAGE_KEY, applyTheme, isThemePreference, readStoredTheme } from "@/hooks/useTheme";

/**
 * Theme preference.
 *
 * The behaviour that actually matters here is the "system" case. Writing
 * `data-theme="system"` instead of removing the attribute would look correct in
 * the DOM and quietly break the operating-system preference permanently, because
 * the attribute selector in `variables.css` matches `"system"` and pins the
 * theme forever. That is the kind of bug a visual check misses, so it is
 * asserted here.
 */

describe("isThemePreference", () => {
  it("accepts the three real preferences", () => {
    expect(isThemePreference("system")).toBe(true);
    expect(isThemePreference("light")).toBe(true);
    expect(isThemePreference("dark")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isThemePreference("auto")).toBe(false);
    expect(isThemePreference("Dark")).toBe(false);
    expect(isThemePreference("")).toBe(false);
    expect(isThemePreference(null)).toBe(false);
    expect(isThemePreference(undefined)).toBe(false);
  });
});

describe("readStoredTheme", () => {
  it("reads a stored preference", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "light");
    expect(readStoredTheme()).toBe("light");
  });

  it("defaults to system when nothing is stored", () => {
    expect(readStoredTheme()).toBe("system");
  });

  it("defaults to system when the stored value is not a preference", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "sepia");
    expect(readStoredTheme()).toBe("system");
  });

  it("defaults to system when storage throws", () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });

    expect(readStoredTheme()).toBe("system");

    getItem.mockRestore();
  });
});

describe("applyTheme", () => {
  it("sets an explicit theme on the root element", () => {
    const root = document.createElement("html");

    applyTheme("light", root);
    expect(root.getAttribute("data-theme")).toBe("light");

    applyTheme("dark", root);
    expect(root.getAttribute("data-theme")).toBe("dark");
  });

  it("removes the attribute for system so the OS preference applies again", () => {
    const root = document.createElement("html");
    root.setAttribute("data-theme", "dark");

    applyTheme("system", root);

    expect(root.hasAttribute("data-theme")).toBe(false);
  });
});
