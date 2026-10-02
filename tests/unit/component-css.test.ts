import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Every stylesheet sitting next to a component must be imported by that
 * component.
 *
 * This exists because it already went wrong once, in a way no other check
 * noticed: `Button.tsx` shipped without importing `Button.css`. The typecheck
 * passed, the linter passed, the build succeeded, every test passed, and the
 * rendered page had unstyled buttons - because a stylesheet that is never
 * imported is not an error, it is simply never applied.
 *
 * That is the whole class of bug in one line: a check that passes while the
 * page is wrong. The check here is cheap and mechanical, so the fix is to have
 * it rather than to remember.
 */
const COMPONENT_DIR = path.resolve(import.meta.dirname, "../../src/components");

function listComponents(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return listComponents(full);
    return entry.endsWith(".tsx") ? [full] : [];
  });
}

describe("component stylesheets", () => {
  const components = listComponents(COMPONENT_DIR);

  it("finds the components to check", () => {
    // Without this the suite would pass vacuously if the walk ever broke and
    // returned nothing - the failure mode this file exists to prevent.
    expect(components.length).toBeGreaterThan(10);
  });

  it.each(components)("%s imports its sibling stylesheet", (component) => {
    const stylesheet = component.replace(/\.tsx$/, ".css");
    if (!statSync(stylesheet, { throwIfNoEntry: false })) return;

    const source = readFileSync(component, "utf8");
    const imported = source.includes(`"./${path.basename(stylesheet)}"`);

    expect(
      imported,
      `${path.basename(component)} has a sibling ${path.basename(stylesheet)} that it never imports, so those styles are never applied`
    ).toBe(true);
  });
});
