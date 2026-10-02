import { expect, test } from "@playwright/test";

/**
 * End-to-end: the money paths on the production build.
 *
 * These run against `dist/` served by a static file server rather than the dev
 * server, for two reasons. The dev server transforms modules on request and
 * would hide a broken production build; and Lighthouse numbers measured against
 * a dev server are not the numbers a recruiter's browser sees.
 */

test.describe("first impression", () => {
  test("leads with the role, the claim and a way to act", async ({ page }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("test infrastructure");

    // The role line is the thing a recruiter screens for. Scoped to the hero
    // because the same string also appears in the header, where it is hidden on
    // desktop - a page-wide text match resolves to the hidden one first.
    await expect(page.locator(".hero__role")).toHaveText(
      "Software Engineer in Test · QA Automation · AI/LLM Test Tooling"
    );

    // Three ways to act, all above the fold.
    await expect(page.getByRole("link", { name: /see the work/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /download résumé/i }).first()).toBeVisible();
  });

  test("shows availability and location without scrolling to the bottom", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText(/open to remote qa automation and sdet roles/i)).toBeVisible();
    await expect(page.getByText(/paripiranga, bahia/i).first()).toBeVisible();
  });

  test("has no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // A static site has nowhere to surface a runtime failure except the console
    // nobody opens, so this is the only place a broken render would announce
    // itself automatically.
    expect(errors).toEqual([]);
  });
});

test.describe("navigation", () => {
  test("moves between sections and marks the current one", async ({ page }) => {
    await page.goto("/");

    /*
     * The navigation has two layouts: an inline list above 900px and a panel
     * below it. Rather than skipping one, follow whichever is on screen - so
     * the assertion runs in both the desktop and mobile projects instead of
     * quietly covering half the matrix.
     */
    const inlineNav = page.locator(".navbar__links");
    const usePanel = !(await inlineNav.isVisible());

    if (usePanel) {
      await page.locator(".navbar__hamburger").click();
      await page.getByRole("dialog").getByRole("link", { name: "Work", exact: true }).click();
      await expect(page.getByRole("dialog")).toHaveCount(0);
    } else {
      await inlineNav.getByRole("link", { name: "Work", exact: true }).click();
    }

    await expect(page.locator("#work")).toBeInViewport();

    // Exactly one item is marked current. Two at once is the recorded
    // double-highlight bug, from an id-prefix match that lit up two links.
    if (!usePanel) {
      await page.waitForTimeout(300);
      const current = page.locator('.navbar__link[aria-current="true"]');
      await expect(current).toHaveCount(1);
      await expect(current).toHaveText("Work");
    }
  });

  test("exposes the skip link as the first stop for a keyboard user", async ({ page }) => {
    await page.goto("/");

    const skip = page.getByRole("link", { name: /skip to content/i });
    /*
     * Wait for the link to exist before pressing Tab. The page is a React app:
     * `goto` resolves on the document, and on a loaded CI runner the bundle has
     * not finished mounting yet. A Tab pressed into an empty document focuses
     * the body, and the assertion then fails for a reason that has nothing to
     * do with the skip link. The first CI run failed exactly that way.
     */
    await expect(skip).toBeAttached();

    await page.keyboard.press("Tab");

    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
  });
});

test.describe("language", () => {
  test("switches to Portuguese and keeps the choice on reload", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /mudar para português/i }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("infraestrutura de testes");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");

    await page.reload();
    // Storage, not just the query string, is what makes this stick.
    await expect(page.getByRole("heading", { level: 1 })).toContainText("infraestrutura de testes");
  });

  test("honours the language in the URL on a first visit", async ({ page }) => {
    await page.goto("/?lang=pt");

    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.getByText(/aberto a vagas remotas/i)).toBeVisible();
  });

  test("translates the work section, not just the hero", async ({ page }) => {
    await page.goto("/?lang=pt");

    // Scoped per section: the résumé legitimately carries its own "Experiência"
    // and "Projetos" headings, and a page-wide name match resolves to both.
    await expect(page.locator("#work").getByRole("heading", { name: "Projetos selecionados" })).toBeVisible();
    await expect(page.locator("#experience").getByRole("heading", { name: "Experiência" })).toBeVisible();
    await expect(
      page.locator("#focus").getByRole("heading", { name: "Para que me contratam" })
    ).toBeVisible();
  });
});

test.describe("case studies", () => {
  test("opens and closes a case study", async ({ page }) => {
    await page.goto("/");

    /*
     * Scoped to the card rather than matched by label. A locator holding
     * `getByRole("button", { name: /read the case study/ })` is re-resolved
     * after every action: the moment the first card opens, its label changes to
     * "Hide the case study", the old locator stops matching it, and `.first()`
     * silently moves to the *next* card - which is still closed. The test then
     * reports a failure on a working disclosure.
     */
    const card = page.locator(".fp").first();
    const toggle = card.getByRole("button");

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveText(/read the case study/i);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveText(/hide the case study/i);
    await expect(card.getByRole("heading", { name: "The problem" })).toBeVisible();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("keeps each card's disclosure independent", async ({ page }) => {
    await page.goto("/");

    const cards = page.locator(".fp");
    await expect(cards).toHaveCount(5);

    await cards.first().getByRole("button").click();

    const expanded = await page.locator('.fp__toggle[aria-expanded="true"]').count();
    expect(expanded, "opening one card must not open the others").toBe(1);
  });
});

test.describe("contact", () => {
  test("shows a working email address and links both résumé formats", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const email = page.getByRole("link", { name: "everton_st@outlook.com" }).first();
    await expect(email).toBeVisible();
    await expect(email).toHaveAttribute("href", "mailto:everton_st@outlook.com");

    await expect(page.getByRole("link", { name: /download pdf/i }).first()).toHaveAttribute(
      "href",
      "/everton-s-andrade-resume.pdf"
    );
    await expect(page.getByRole("link", { name: /plain text/i })).toHaveAttribute(
      "href",
      "/everton-s-andrade-resume.txt"
    );
  });

  test("serves the résumé files that the page advertises", async ({ request }) => {
    // A link to a file that was never generated is the one defect a recruiter
    // discovers, and nothing else in the build would have caught it.
    for (const path of ["/everton-s-andrade-resume.pdf", "/everton-s-andrade-resume.txt"]) {
      const response = await request.get(path);
      expect(response.status(), `${path} should be served`).toBe(200);
      expect((await response.body()).length).toBeGreaterThan(500);
    }
  });

  test("serves the 404 page with a real 404 status", async ({ request }) => {
    const response = await request.get("/no-such-page");
    expect(response.status()).toBe(404);
    expect(await response.text()).toContain("This page does not exist");
  });
});

test.describe("honesty", () => {
  test("does not claim production for a product that has not launched", async ({ page }) => {
    await page.goto("/");

    const body = (await page.locator("body").innerText()).toLowerCase();

    // "In production" appears once, on Cerberus CI. The two 2026 launches must
    // not carry it.
    const productionClaims = await page.locator(".status-badge--live").count();
    expect(productionClaims).toBe(1);

    expect(body).not.toMatch(/\d+\+?\s+(happy\s+)?customers/);
  });

  test("names the launch date for everything not yet released", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Public launch 12 October 2026")).toBeVisible();
    await expect(page.getByText("Public launch 2 November 2026")).toBeVisible();
  });

  test("labels demo deployments as synthetic data", async ({ page }) => {
    await page.goto("/");

    const synthetic = page.getByText("Synthetic data, no real customers");
    await expect(synthetic.first()).toBeVisible();
    // Argus and Enlace both run on synthetic data.
    expect(await synthetic.count()).toBeGreaterThanOrEqual(2);
  });
});
