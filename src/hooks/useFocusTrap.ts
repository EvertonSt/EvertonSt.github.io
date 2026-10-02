import { useEffect, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Keep keyboard focus inside a container while it is open.
 *
 * `aria-modal="true"` only changes what a screen reader announces. It does
 * nothing about the keyboard: without a trap, Tab walks straight out of the
 * dialog and into the page behind it, which is invisible to the sighted user
 * who cannot see where focus went.
 *
 * Three behaviours, all of which a dialog needs and most hand-rolled ones miss:
 * focus moves into the panel on open, Tab wraps at both ends instead of
 * escaping, and focus returns to whatever opened it on close.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  onDismiss: () => void
): void {
  useEffect(() => {
    if (!active) return;

    const container = containerRef.current;
    if (!container) return;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusable = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onDismiss();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      // Only intervene at the two ends. In the middle, the browser's own
      // behaviour is already correct and overriding it breaks Shift+Tab.
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [active, containerRef, onDismiss]);
}
