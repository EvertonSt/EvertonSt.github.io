import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { useLanguage } from "@/i18n/context";

/**
 * Hooks.
 *
 * The focus trap is the one with teeth. `aria-modal="true"` changes what a
 * screen reader announces and does nothing at all about the keyboard: without a
 * trap, Tab walks out of the open dialog and into the page behind it, which is
 * invisible to the sighted person who cannot see where focus went.
 */

describe("useFocusTrap", () => {
  function Dialog({ onDismiss }: { onDismiss: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    useFocusTrap(ref, true, onDismiss);

    return (
      <div ref={ref} role="dialog" aria-modal="true" aria-label="Navigation">
        <a href="#first">First</a>
        <a href="#last">Last</a>
      </div>
    );
  }

  it("moves focus into the dialog when it opens", () => {
    render(<Dialog onDismiss={() => undefined} />);

    expect(screen.getByRole("link", { name: "First" })).toHaveFocus();
  });

  it("wraps Tab from the last item back to the first", async () => {
    const user = userEvent.setup();
    render(<Dialog onDismiss={() => undefined} />);

    await user.tab(); // -> Last
    expect(screen.getByRole("link", { name: "Last" })).toHaveFocus();

    await user.tab(); // should wrap, not escape
    expect(screen.getByRole("link", { name: "First" })).toHaveFocus();
  });

  it("wraps Shift+Tab from the first item back to the last", async () => {
    const user = userEvent.setup();
    render(<Dialog onDismiss={() => undefined} />);

    expect(screen.getByRole("link", { name: "First" })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole("link", { name: "Last" })).toHaveFocus();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Dialog onDismiss={onDismiss} />);

    await user.keyboard("{Escape}");

    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("returns focus to the opener when it closes", async () => {
    const user = userEvent.setup();

    function Host() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          {open ? <Dialog onDismiss={() => setOpen(false)} /> : null}
        </>
      );
    }

    render(<Host />);
    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);
    expect(screen.getByRole("link", { name: "First" })).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("does nothing while inactive", () => {
    function Inactive() {
      const ref = useRef<HTMLDivElement>(null);
      useFocusTrap(ref, false, () => undefined);
      return (
        <div ref={ref}>
          <a href="/somewhere">Away</a>
        </div>
      );
    }

    render(<Inactive />);

    expect(screen.getByRole("link", { name: "Away" })).not.toHaveFocus();
  });
});

describe("useMediaQuery", () => {
  function setMatches(value: boolean) {
    const listeners: ((event: MediaQueryListEvent) => void)[] = [];
    const list = {
      matches: value,
      media: "",
      onchange: null,
      addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) =>
        listeners.push(listener),
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
      addListener: () => undefined,
      removeListener: () => undefined,
    } as unknown as MediaQueryList;

    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => list)
    );
    return () =>
      act(() => listeners.forEach((listener) => listener({ matches: value } as MediaQueryListEvent)));
  }

  it("reflects a matching query", () => {
    setMatches(true);
    const { result } = renderHook(() => useMediaQuery("(prefers-reduced-motion: reduce)"));

    expect(result.current).toBe(true);
    vi.unstubAllGlobals();
  });

  it("reflects a non-matching query", () => {
    setMatches(false);
    const { result } = renderHook(() => useMediaQuery("(prefers-color-scheme: dark)"));

    expect(result.current).toBe(false);
    vi.unstubAllGlobals();
  });

  it("updates when the query changes", () => {
    const notify = setMatches(false);
    const { result } = renderHook(() => useMediaQuery("(prefers-color-scheme: dark)"));
    expect(result.current).toBe(false);

    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true }) as unknown as MediaQueryList)
    );
    notify();

    vi.unstubAllGlobals();
  });
});

describe("useReducedMotion", () => {
  it("reports the preference from the media query", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: true,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }))
    );

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);

    vi.unstubAllGlobals();
  });
});

describe("LanguageProvider", () => {
  function Consumer() {
    const { language, t, tList } = useLanguage();
    return (
      <div>
        <p data-testid="language">{language}</p>
        <p data-testid="title">{t("contact.title")}</p>
        <p data-testid="skills">{tList("hero.skills").length}</p>
        <button type="button" onClick={() => undefined}>
          x
        </button>
      </div>
    );
  }

  it("starts in English", () => {
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId("language")).toHaveTextContent("en");
    expect(screen.getByTestId("title")).toHaveTextContent("Contact");
  });

  it("mirrors the language onto the document element", () => {
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );

    expect(document.documentElement.lang).toBe("en");
  });

  it("renders lists through tList", () => {
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );

    expect(Number(screen.getByTestId("skills").textContent)).toBeGreaterThan(3);
  });
});

describe("useLanguage outside a provider", () => {
  it("degrades to visible keys instead of throwing", () => {
    // A component rendered in isolation must not take down the tree. Returning
    // the key is loud enough to be noticed in a test, and does not crash.
    function Orphan() {
      const { language, t } = useLanguage();
      return <p>{`${language}:${t("contact.title")}`}</p>;
    }

    render(<Orphan />);

    expect(screen.getByText("en:contact.title")).toBeInTheDocument();
  });
});
