import "@testing-library/jest-dom/vitest";

import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

/*
 * happy-dom does not implement matchMedia. Without this stub every hook that
 * consults a media query would take its default branch in tests, and the
 * reduced-motion and theme paths would never run - a suite that passes without
 * exercising the code it claims to cover.
 *
 * Tests that need a *true* result override this per test; the point here is
 * that the listener plumbing exists so `addEventListener` is not undefined.
 */
function stubMatchMedia(query: string): MediaQueryList {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
}

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: stubMatchMedia,
  });
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
