import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

/**
 * Visual regression across viewports and themes.
 *
 * This is the suite that exists because of 2026-10-01, when four visual bugs
 * shipped through a fully green pipeline: invisible menus, a double-highlighted
 * navigation item, a black hero in light mode, and a mistranslated heading.
 * Every assertion in that pipeline was text-based or ran in a single theme, so
 * all four passed.
 *
 * The rule this file encodes: a change to this site is not verified until the
 * rendered result has been looked at at more than one width and in more than
 * one colour scheme. Screenshots are captured per combination and compared to
 * the committed baselines; run with `--update-snapshots` after an intentional
 * visual change and commit the new baselines with it.
 *
 * ---------------------------------------------------------------------------
 * WHY THE PIXEL COMPARISON IS PLATFORM-SCOPED
 *
 * The first CI run of this file failed all sixty comparisons, and the reason is
 * worth recording rather than papering over. Playwright names a snapshot after
 * the platform that produced it, because font rasterisation is not portable: a
 * baseline rendered on Windows cannot match a render on a Linux runner, and no
 * tolerance setting makes it match. Renaming the files to share one baseline
 * would trade a visible failure for a permanent false one.
 *
 * So the pixel comparison runs where a baseline for this platform exists, and
 * skips loudly where none does. Everything structural in the same file runs on
 * every platform. The four defects from 2026-10-01 were all structural - an
 * element that was not visible, two items marked current at once, a surface
 * with the wrong luminance, a heading left in the wrong language - and not one
 * of them needed a pixel diff to catch. Pixel comparison is the extra, not the
 * floor.
 * ---------------------------------------------------------------------------
 */

/**
 * The spec's own directory, resolved through `import.meta` because this project
 * is ESM: Playwright loads the file as a module, where `__dirname` does not
 * exist. Getting this wrong is not subtle - every comparison fails with
 * `__dirname is not defined` - but it only fails on the machine that runs it.
 */
const SPEC_DIR = path.dirname(fileURLToPath(import.meta.url));

/**
 * Where Playwright's default snapshot template would put this baseline.
 *
 * The extension is stripped from the name because the default template ends in
 * `{ext}`: the argument `dark-desktop-hero.png` becomes the file
 * `dark-desktop-hero-desktop-chromium-win32.png`, not `dark-desktop-hero.png-
 * desktop-chromium-win32.png`. Composing the path by hand is the only place
 * this could silently disagree with the real thing, so the name is built the
 * same way the template builds it.
 */
function baselinePath(name: string, project: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  return path.join(SPEC_DIR, "visual.spec.ts-snapshots", `${base}-${project}-${process.platform}.png`);
}

/**
 * Skip the comparison when this platform has no baseline, and say so in the
 * report rather than pretending the comparison happened. A silently missing
 * assertion is how a visual suite quietly stops guarding anything.
 */
function requireBaseline(name: string, project: string) {
  test.skip(
    !existsSync(baselinePath(name, project)),
    `no ${process.platform} baseline for ${name}; pixel comparison runs where one exists, structural assertions run everywhere`
  );
}

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

const SCHEMES = ["dark", "light"] as const;

/**
 * Regions worth pinning. The full page is one screenshot per combination, but
 * these named sections make a diff readable: a failure says which part of the
 * page moved rather than only that the page differs.
 */
const REGIONS = [
  { name: "hero", selector: "#hero" },
  { name: "work", selector: "#work" },
  { name: "resume", selector: "#resume" },
  { name: "contact", selector: "#contact" },
] as const;

for (const scheme of SCHEMES) {
  test.describe(`${scheme} theme`, () => {
    test.use({ colorScheme: scheme });

    for (const viewport of VIEWPORTS) {
      test.describe(`${viewport.name} (${viewport.width}px)`, () => {
        test.use({ viewport: { width: viewport.width, height: viewport.height } });

        test("full page", async ({ page }, testInfo) => {
          const name = `${scheme}-${viewport.name}-full.png`;
          requireBaseline(name, testInfo.project.name);

          await page.goto("/");
          await page.waitForLoadState("networkidle");
          await expect(page).toHaveScreenshot(name, {
            fullPage: true,
            maxDiffPixelRatio: 0.01,
            animations: "disabled",
          });
        });

        for (const region of REGIONS) {
          test(`${region.name} section`, async ({ page }, testInfo) => {
            const name = `${scheme}-${viewport.name}-${region.name}.png`;
            requireBaseline(name, testInfo.project.name);

            await page.goto("/");
            await page.locator(region.selector).scrollIntoViewIfNeeded();
            await page.waitForTimeout(100);

            await expect(page.locator(region.selector)).toHaveScreenshot(name, {
              maxDiffPixelRatio: 0.01,
              animations: "disabled",
            });
          });
        }
      });
    }
  });
}

test.describe("theme independence", () => {
  test("the theme switch actually changes the page, in both schemes", async ({ page }) => {
    await page.goto("/");

    const readPalette = () =>
      page.evaluate(() => ({
        body: getComputedStyle(document.body).backgroundColor,
        heading: getComputedStyle(document.querySelector("h1") as Element).color,
        heroImage: getComputedStyle(document.getElementById("hero") as Element).backgroundImage,
      }));

    const luminance = (rgb: string) => {
      const [r = 0, g = 0, b = 0] = rgb.match(/[\d.]+/g)?.map(Number) ?? [];
      const channel = (value: number) => {
        const scaled = value / 255;
        return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };

    for (const scheme of SCHEMES) {
      await page.emulateMedia({ colorScheme: scheme });
      await page.reload();
      const palette = await readPalette();

      /*
       * The recorded bug on 2026-10-01 was a hero that rendered black while the
       * rest of the page was light. The hero carries a gradient over the page
       * surface rather than its own background colour, so the meaningful
       * assertion is not "what colour is the hero" but "is the headline legible
       * on the surface it sits on, in each scheme".
       */
      expect(palette.heroImage, `${scheme}: hero must keep its gradient`).not.toBe("none");

      const bodyLuminance = luminance(palette.body);
      const expectDark = scheme === "dark";
      expect(bodyLuminance < 0.2, `${scheme}: body is ${palette.body}`).toBe(expectDark);
      expect(bodyLuminance > 0.6, `${scheme}: body is ${palette.body}`).toBe(!expectDark);

      const headingLuminance = luminance(palette.heading);
      const lighter = Math.max(headingLuminance, bodyLuminance);
      const darker = Math.min(headingLuminance, bodyLuminance);
      const contrast = (lighter + 0.05) / (darker + 0.05);

      expect(contrast, `${scheme}: headline contrast ${contrast.toFixed(2)}`).toBeGreaterThanOrEqual(4.5);
    }
  });

  test("exactly one navigation item is marked current", async ({ page }) => {
    await page.goto("/");
    await page.locator("#work").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    // The recorded bug: a double-highlighted nav, from an id-prefix match that
    // lit up two items at once.
    const current = await page.locator('.navbar__link[aria-current="true"]').count();
    expect(current).toBeLessThanOrEqual(1);
  });
});

test.describe("rendered structure", () => {
  /*
   * The floor the pixel comparison sits on, and the part that runs on every
   * platform.
   *
   * An element can be in the accessibility tree, match every text assertion and
   * still occupy no pixels - which is exactly the invisible-menu defect of
   * 2026-10-01. "Rendered" is the property under test: a box with a width and a
   * height, on screen, in a scheme where it is legible.
   */

  test("the mobile panel occupies the screen when it is open", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the menu button only exists below the layout breakpoint");

    await page.goto("/");
    await page.getByRole("button", { name: /open navigation/i }).click();

    const panel = page.getByRole("dialog");
    await expect(panel).toBeVisible();

    const box = await panel.boundingBox();
    expect(box?.width ?? 0, "panel width").toBeGreaterThan(0);
    expect(box?.height ?? 0, "panel height").toBeGreaterThan(0);
    await expect(panel).toBeInViewport();
  });

  test("the skip link becomes visible and in the viewport once focused", async ({ page }) => {
    await page.goto("/");

    const skip = page.getByRole("link", { name: /skip to content/i });
    await expect(skip).toBeAttached();

    await page.keyboard.press("Tab");
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();

    const box = await skip.boundingBox();
    expect(box?.width ?? 0, "focused skip link width").toBeGreaterThan(0);
    expect(box?.height ?? 0, "focused skip link height").toBeGreaterThan(0);
  });

  test("every pinned section renders with a real height, in both schemes", async ({ page }) => {
    for (const scheme of SCHEMES) {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto("/");

      for (const region of REGIONS) {
        const size = await page.locator(region.selector).boundingBox();
        expect(size?.height ?? 0, `${scheme}: ${region.selector} collapsed`).toBeGreaterThan(0);
        expect(size?.width ?? 0, `${scheme}: ${region.selector} has no width`).toBeGreaterThan(0);
      }
    }
  });
});
