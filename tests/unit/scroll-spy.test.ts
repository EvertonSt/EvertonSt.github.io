import { describe, expect, it } from "vitest";
import { pickActiveId, type SectionRect } from "@/hooks/useScrollSpy";

/**
 * Section selection for the navigation highlight.
 *
 * `pickActiveId` is pure and exported precisely so these cases can be stated
 * directly. A spy tested only by scrolling a rendered page can pass while the
 * boundary conditions - a short section near the bottom, two sections sharing a
 * prefix - are the ones that actually break.
 */

const rect = (id: string, top: number, bottom: number): SectionRect => ({ id, top, bottom });

describe("pickActiveId", () => {
  const sections = [rect("work", 0, 800), rect("focus", 800, 1600), rect("experience", 1600, 2400)];

  it("selects the section containing the reading line", () => {
    expect(pickActiveId(sections, 120)).toBe("work");
    expect(pickActiveId(sections, 900)).toBe("focus");
    expect(pickActiveId(sections, 1700)).toBe("experience");
  });

  it("selects nothing above the first section", () => {
    expect(pickActiveId([rect("work", 400, 1200)], 100)).toBeNull();
  });

  it("falls back to the last section already started when the line is in a gap", () => {
    // Between two sections: the reader has passed the first and not reached the
    // second. Keeping the first highlighted is correct; clearing it makes the
    // nav flicker every time the reader pauses between sections.
    const withGap = [rect("work", 0, 800), rect("focus", 1000, 1800)];

    expect(pickActiveId(withGap, 900)).toBe("work");
  });

  it("keeps a short trailing section reachable instead of shadowing it", () => {
    // The contact section is much shorter than the ones above it. Without the
    // "last section that started" fallback, the short one at the bottom of the
    // page can never become active and its nav link is dead.
    const shortLast = [rect("resume", 0, 4000), rect("contact", 4000, 4300)];

    expect(pickActiveId(shortLast, 4100)).toBe("contact");
    expect(pickActiveId(shortLast, 3900)).toBe("resume");
  });

  it("never highlights two sections when their ids share a prefix", () => {
    // The failure this guards: a startsWith-based match lights up both `work`
    // and `workshop` at the same scroll position, so the nav shows two active
    // items and neither reads as selected.
    const overlapping = [rect("work", 0, 800), rect("workshop", 0, 800)];

    const active = pickActiveId(overlapping, 120);

    expect(active).toBe("work");
    expect(overlapping.filter((s) => s.id === active)).toHaveLength(1);
  });

  it("returns null for an empty section list", () => {
    expect(pickActiveId([], 120)).toBeNull();
  });

  it("treats the offset as belonging to the section it entered, not the one it left", () => {
    // Exactly on the boundary: the section starting there owns the line.
    expect(pickActiveId([rect("a", 0, 800), rect("b", 800, 1600)], 800)).toBe("b");
  });
});
