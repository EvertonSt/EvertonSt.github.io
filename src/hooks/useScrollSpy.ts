import { useEffect, useState } from "react";

export interface SectionRect {
  id: string;
  /** Distance from the top of the viewport, in pixels. */
  top: number;
  bottom: number;
}

/**
 * Decide which section the reading line is in.
 *
 * Pure and exported so the decision can be tested directly rather than inferred
 * from a rendered nav. Three rules, in order:
 *
 * 1. If the offset line falls inside a section, that section wins.
 * 2. Otherwise the last section that has already started is active - this is
 *    what makes a short section near the bottom of the page reachable instead
 *    of permanently shadowed by the long one above it.
 * 3. Otherwise nothing is active, which is correct above the first section.
 *
 * Rule 1 is a containment test on real geometry rather than a `startsWith` on
 * the id, because two ids can share a prefix (`work` and `workshop`) and a
 * prefix match highlights both at once.
 */
export function pickActiveId(rects: readonly SectionRect[], offset: number): string | null {
  for (const rect of rects) {
    if (rect.top <= offset && rect.bottom > offset) {
      return rect.id;
    }
  }

  let candidate: string | null = null;
  for (const rect of rects) {
    if (rect.top <= offset) {
      candidate = rect.id;
    }
  }
  return candidate;
}

/**
 * Track which section is currently in view.
 *
 * The id list is usually an array literal at the call site, which is a new
 * reference on every render. Depending on it directly would re-subscribe to the
 * scroll listener on every render, so the effect is keyed on the joined value
 * instead: same ids, no churn.
 */
export function useScrollSpy(ids: readonly string[], offset = 120): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const sections = key.split("|");

    const update = () => {
      const rects: SectionRect[] = [];
      for (const id of sections) {
        const element = document.getElementById(id);
        if (!element) continue;
        const { top, bottom } = element.getBoundingClientRect();
        rects.push({ id, top, bottom });
      }
      setActiveId((previous) => {
        const next = pickActiveId(rects, offset);
        return next === previous ? previous : next;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [key, offset]);

  return activeId;
}
