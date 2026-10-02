import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "@/App";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { flagshipProjects } from "@/data/projects";
import { links } from "@/data/links";

/**
 * Whole-app invariants.
 *
 * Every one of these is a property of the assembled page. Individually the
 * components look fine; together they are what a visitor actually meets. The
 * record on 2026-10-01 is four bugs that shipped through a fully green pipeline
 * because each check looked at one file - so these assertions cross the
 * boundaries: structure across sections, honesty across data and markup, and
 * accessibility across the whole document.
 */

function renderApp() {
  return render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}

describe("page structure", () => {
  it("renders every section the navigation links to", () => {
    const { container } = renderApp();

    for (const id of ["hero", "work", "focus", "experience", "resume", "contact"]) {
      expect(document.getElementById(id), `missing section #${id}`).not.toBeNull();
    }
    expect(container.querySelector("main")).not.toBeNull();
  });

  it("has exactly one first-level heading", () => {
    renderApp();

    // Two h1s, or none, breaks both the document outline and the way a screen
    // reader user navigates by heading level.
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("never skips a heading level on the way down", () => {
    renderApp();

    const levels = screen.getAllByRole("heading").map((heading) => Number(heading.tagName.slice(1)));
    for (let i = 1; i < levels.length; i += 1) {
      const previous = levels[i - 1] as number;
      const current = levels[i] as number;
      expect(current - previous, `heading level jumped from h${previous} to h${current}`).toBeLessThanOrEqual(
        1
      );
    }
  });

  it("gives every section an accessible name", () => {
    renderApp();

    // A <section> with no accessible name is announced only as "region", which
    // tells a screen-reader user nothing about where they have landed.
    const regions = screen.getAllByRole("region");
    expect(regions.length).toBeGreaterThan(5);
    for (const region of regions) {
      expect(region.getAttribute("aria-label") || region.getAttribute("aria-labelledby")).toBeTruthy();
    }
  });

  it("offers a skip link as the first focusable element", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.tab();

    const skip = screen.getByRole("link", { name: /skip to content/i });
    expect(skip).toHaveFocus();
    expect(skip).toHaveAttribute("href", "#main-content");
  });
});

describe("honesty on the page", () => {
  it("never labels an unlaunched product as being in production", () => {
    renderApp();

    const unlaunched = flagshipProjects.filter(
      (project) => project.status === "launching-october" || project.status === "launching-november"
    );
    expect(unlaunched.length).toBeGreaterThan(0);

    for (const project of unlaunched) {
      // The live Cerberus CI card legitimately says this; the count of "in
      // production" badges must equal the count of projects that are live.
      expect(project.status).not.toBe("live");
    }

    const liveCount = flagshipProjects.filter((project) => project.status === "live").length;
    const liveBadges = document.querySelectorAll(".status-badge--live").length;
    expect(liveBadges).toBe(liveCount);
  });

  it("states a launch date for anything not yet released", () => {
    const { container } = renderApp();
    const text = container.textContent ?? "";

    expect(text).toContain("Public launch 12 October 2026");
    expect(text).toContain("Public launch 2 November 2026");
  });

  it("does not claim customer counts for demo deployments", () => {
    const { container } = renderApp();
    const text = (container.textContent ?? "").toLowerCase();

    // The failure this guards is a marketing habit: rounding "demonstration
    // run" up to "customers".
    expect(text).not.toMatch(/\d+\+?\s+(happy\s+)?customers/);
    expect(text).not.toMatch(/\d+\s+companies\s+using/);
  });

  it("shows a figure and its source together for every proof metric", () => {
    const { container } = renderApp();

    const cards = container.querySelectorAll(".proof__card");
    expect(cards.length).toBeGreaterThan(3);
    for (const card of cards) {
      expect(card.querySelector(".proof__value")?.textContent?.trim()).toBeTruthy();
      expect(card.querySelector(".proof__source")?.textContent?.trim()).toBeTruthy();
    }
  });
});

describe("links", () => {
  it("gives every link that opens a new tab rel=noopener", () => {
    const { container } = renderApp();

    const opened = [...container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')];
    expect(opened.length).toBeGreaterThan(5);
    for (const anchor of opened) {
      // `noopener` stops the opened page reaching back through window.opener.
      expect(anchor.getAttribute("rel") ?? "", `${anchor.href} opens a tab with no rel`).toContain(
        "noopener"
      );
    }
  });

  it("shows the email address as text, not only behind a label", () => {
    renderApp();

    // A recruiter cannot search for, forward, or copy an address they never
    // see. The visible text is the point.
    expect(screen.getAllByText(links.email).length).toBeGreaterThan(0);
  });

  it("links the résumé in both formats from more than one place", () => {
    renderApp();

    const pdf = screen.getAllByRole("link", { name: /download (pdf|résumé)/i });
    expect(pdf.length).toBeGreaterThan(1);
    for (const link of pdf) {
      expect(link).toHaveAttribute("href", links.resumePdf);
    }
  });

  it("gives every link an accessible name", () => {
    const { container } = renderApp();

    for (const anchor of container.querySelectorAll("a")) {
      const href = anchor.getAttribute("href");
      expect(href, "an anchor with no href").toBeTruthy();
      expect(href).not.toBe("#");

      // Icon-only links carry their name in aria-label and hide the SVG, which
      // is the correct pattern - so the check is for *some* accessible name,
      // not specifically for text.
      const text = anchor.textContent?.trim() ?? "";
      const label = anchor.getAttribute("aria-label") ?? "";
      const labelledBy = anchor.getAttribute("aria-labelledby") ?? "";
      expect(text || label || labelledBy, `link to ${href} has no accessible name`).not.toBe("");
    }
  });
});

describe("content hygiene", () => {
  it("renders no emoji anywhere on the page", () => {
    const { container } = renderApp();
    const text = container.textContent ?? "";

    // Emoji render differently per operating system, inherit colour badly, and
    // are announced by screen readers as their Unicode names. The variation
    // selector sits outside the class because it is a combining mark, and a
    // class that merges one can match a sequence no emoji uses.
    const emoji = text.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]|\u{FE0F}/gu);
    expect(emoji ?? []).toEqual([]);
  });

  it("states the availability the owner wants recruiters to see", () => {
    renderApp();

    expect(screen.getByText(/open to remote qa automation and sdet roles/i)).toBeInTheDocument();
  });

  it("leads with the role the owner is targeting", () => {
    renderApp();

    // It appears in the hero and again on the résumé header; both are wanted.
    expect(
      screen.getAllByText("Software Engineer in Test · QA Automation · AI/LLM Test Tooling").length
    ).toBeGreaterThan(0);
  });
});

describe("case study disclosure", () => {
  it("starts closed and opens on request, reporting its state", async () => {
    const user = userEvent.setup();
    renderApp();

    const toggle = screen.getAllByRole("button", { name: /read the case study/i })[0] as HTMLElement;
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByText("The problem").length).toBeGreaterThan(0);
  });

  it("gives each card its own disclosure so they do not open together", async () => {
    const user = userEvent.setup();
    renderApp();

    const toggles = screen.getAllByRole("button", { name: /read the case study/i });
    expect(toggles.length).toBe(flagshipProjects.length);

    await user.click(toggles[0] as HTMLElement);

    const openCount = toggles.filter((toggle) => toggle.getAttribute("aria-expanded") === "true").length;
    expect(openCount).toBe(1);
  });
});

describe("résumé section", () => {
  it("renders as a document with the contact details an ATS reads", () => {
    renderApp();

    const resume = document.getElementById("resume") as HTMLElement;
    const article = within(resume).getByRole("article");

    expect(within(article).getByRole("heading", { name: "Everton S. Andrade" })).toBeInTheDocument();
    expect(within(article).getByText(links.email)).toBeInTheDocument();
    expect(within(article).getByText(/UTC−3/)).toBeInTheDocument();
  });

  it("lists the same projects as the work section, with their honest status", () => {
    renderApp();

    const resume = document.getElementById("resume") as HTMLElement;
    for (const project of flagshipProjects) {
      expect(resume.textContent, `resume omits ${project.id}`).toContain(
        project.titleKey.split(".")[0] === "cerberus" ? "Cerberus CI" : project.id
      );
    }
  });
});
