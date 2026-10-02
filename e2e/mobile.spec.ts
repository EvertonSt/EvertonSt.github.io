import { expect, test } from "@playwright/test";

/**
 * Mobile and keyboard.
 *
 * The hamburger panel is the part of a site most likely to ship broken: a hidden
 * element that is still focusable, a dialog that does not close on Escape, or
 * focus that walks out into the page behind it. All three produce a site that
 * looks correct in a screenshot and is unusable with a keyboard.
 */

test.describe("mobile navigation", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) > 900, "desktop layout has no hamburger");

  test("opens the panel, traps focus and closes on Escape", async ({ page }) => {
    await page.goto("/");

    // By class, not by accessible name: the label flips from "open navigation"
    // to "close navigation" the moment the panel opens, so a name-based locator
    // stops matching the very button under test.
    const hamburger = page.locator(".navbar__hamburger");
    await expect(hamburger).toHaveAttribute("aria-label", /open navigation/i);
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");

    await hamburger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(hamburger).toHaveAttribute("aria-expanded", "true");

    // Focus moves into the panel rather than staying behind it.
    await expect(dialog.getByRole("link").first()).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    // ...and comes back to the control that opened it.
    await expect(hamburger).toBeFocused();
  });

  test("is not in the tab order while closed", async ({ page }) => {
    await page.goto("/");

    // The "invisible menu" bug on 2026-10-01 was exactly this: the element was
    // present and focusable while off screen.
    await expect(page.getByRole("dialog")).toHaveCount(0);

    for (let i = 0; i < 12; i += 1) {
      await page.keyboard.press("Tab");
      const insideDialog = await page.evaluate(() =>
        Boolean(document.activeElement?.closest('[role="dialog"]'))
      );
      expect(insideDialog, `focus entered the closed panel at step ${i}`).toBe(false);
    }
  });

  test("navigates from the panel and closes it", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /open navigation/i }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Contact" }).click();
    await expect(page.locator("#contact")).toBeInViewport();

    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("#contact")).toBeInViewport();
  });
});

test.describe("no horizontal overflow", () => {
  test("fits the viewport at every width that matters", async ({ page }) => {
    await page.goto("/");

    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(120);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );

      // A horizontal scrollbar on a phone reads as a broken site, and it is
      // the most common layout defect no text assertion would ever see.
      expect(overflow, `horizontal overflow of ${overflow}px at ${width}px`).toBeLessThanOrEqual(1);
    }
  });
});

test.describe("theme", () => {
  test("toggles between light and dark and remembers the choice", async ({ page }) => {
    await page.goto("/");

    const body = page.locator("body");
    const initialBackground = await body.evaluate((node) => getComputedStyle(node).backgroundColor);

    await page.getByRole("button", { name: /switch (to light|to dark) theme/i }).click();
    const toggledBackground = await body.evaluate((node) => getComputedStyle(node).backgroundColor);

    expect(toggledBackground, "the theme toggle must actually change the background").not.toBe(
      initialBackground
    );

    await page.reload();
    const afterReload = await body.evaluate((node) => getComputedStyle(node).backgroundColor);
    expect(afterReload).toBe(toggledBackground);
  });

  test("keeps text legible against its background in both themes", async ({ page }) => {
    await page.goto("/");

    const luminance = (rgb: string) => {
      const [r = 0, g = 0, b = 0] = rgb.match(/\d+/g)?.map(Number) ?? [];
      const channel = (value: number) => {
        const scaled = value / 255;
        return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };

    for (const scheme of ["dark", "light"] as const) {
      await page.emulateMedia({ colorScheme: scheme });
      await page.reload();

      const { text, background } = await page
        .locator("body p")
        .first()
        .evaluate((node) => {
          const style = getComputedStyle(node);
          return { text: style.color, background: getComputedStyle(document.body).backgroundColor };
        });

      const lighter = Math.max(luminance(text), luminance(background));
      const darker = Math.min(luminance(text), luminance(background));
      const ratio = (lighter + 0.05) / (darker + 0.05);

      // WCAG AA for body text. Both themes are checked because the light one
      // is the theme a text-only suite never renders.
      expect(ratio, `${scheme}: contrast ratio ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(4.5);
    }
  });
});

test.describe("print", () => {
  test("renders the résumé without the site chrome", async ({ page }) => {
    await page.goto("/");
    await page.emulateMedia({ media: "print" });

    await expect(page.locator(".navbar")).toBeHidden();
    await expect(page.locator(".hero")).toBeHidden();
    await expect(page.locator(".footer")).toBeHidden();
    await expect(page.locator(".resume__body")).toBeVisible();

    // Links printed without their URL are a dead end on paper.
    const linkText = await page
      .locator('.resume a[href^="http"]')
      .first()
      .evaluate((node) => {
        const style = getComputedStyle(node, "::after");
        return style.content;
      });
    expect(linkText).toContain("http");
  });
});
