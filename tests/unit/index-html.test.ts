import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The document head.
 *
 * Everything here lives outside the bundle, so nothing in the application can
 * assert it. `index.html` is the one file whose regressions are invisible until
 * a crawler, a share preview or a security scanner reads it - so it gets the
 * same treatment as the code.
 */

const ROOT = path.resolve(import.meta.dirname, "../..");
const html = readFileSync(path.join(ROOT, "index.html"), "utf8");

const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
  (match) => JSON.parse(match[1] as string) as Record<string, unknown>
);

describe("document head", () => {
  it("declares the language", () => {
    expect(html).toMatch(/<html lang="[a-z-]+">/);
  });

  it("has a title that names the role", () => {
    const title = /<title>([^<]+)<\/title>/.exec(html)?.[1];

    expect(title).toBeTruthy();
    // A recruiter arriving from search sees this string, not the page.
    expect(title).toContain("Everton S. Andrade");
    expect(title?.toLowerCase()).toContain("test");
  });

  it("has a meta description inside the length search engines will show", () => {
    const description = /<meta\s+name="description"\s+content="([^"]+)"/.exec(html)?.[1];

    expect(description).toBeTruthy();
    // Roughly 155 characters before Google truncates it.
    expect(description?.length).toBeGreaterThan(80);
    expect(description?.length).toBeLessThan(180);
  });

  it("carries the recruiter search keywords", () => {
    const keywords = /<meta\s+name="keywords"\s+content="([^"]+)"/.exec(html)?.[1];

    expect(keywords).toBeTruthy();
    for (const term of ["Software Engineer in Test", "QA Automation", "Playwright", "CI/CD Quality Gates"]) {
      expect(keywords, `missing keyword: ${term}`).toContain(term);
    }
  });

  it("points a canonical URL at the live site", () => {
    expect(html).toContain('<link rel="canonical" href="https://evertonst.github.io/"');
  });

  it("declares both language alternates and an x-default", () => {
    expect(html).toMatch(/hreflang="en"/);
    expect(html).toMatch(/hreflang="pt-BR"/);
    expect(html).toMatch(/hreflang="x-default"/);
  });

  it("has Open Graph and Twitter card tags", () => {
    for (const property of ["og:title", "og:description", "og:url", "og:image", "og:type"]) {
      expect(html, `missing ${property}`).toContain(property);
    }
    expect(html).toContain('name="twitter:card"');
  });

  it("ships a Content-Security-Policy", () => {
    const csp = /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/.exec(html)?.[1];

    expect(csp, "GitHub Pages cannot set response headers, so the meta tag is the policy").toBeTruthy();
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    // The external scripts are all emitted by the build from this origin.
    expect(csp).toMatch(/script-src 'self'/);
    // A policy that lets the page frame itself is not a policy.
    expect(csp).not.toContain("frame-ancestors");
  });

  it("keeps the strict header policy for hosts that can set headers", () => {
    const headers = readFileSync(path.join(ROOT, "public/_headers"), "utf8");

    expect(headers).toContain("Content-Security-Policy:");
    expect(headers).toContain("frame-ancestors 'none'");
    expect(headers).toContain("form-action 'none'");
    expect(headers).toContain("X-Content-Type-Options: nosniff");
    expect(headers).toContain("Strict-Transport-Security:");
  });

  it("links every icon the browser will ask for", () => {
    expect(html).toContain('rel="icon" type="image/svg+xml" href="/favicon.svg"');
    expect(html).toContain('rel="apple-touch-icon"');
  });

  it("has exactly one mount point", () => {
    expect(html.match(/id="root"/g)).toHaveLength(1);
  });

  it("provides the skip link target", () => {
    // The skip link is rendered by the app; this asserts the landmark it points
    // at is what the link promises, rather than an id that no longer exists.
    const app = readFileSync(path.join(ROOT, "src/App.tsx"), "utf8");
    expect(app).toContain('href="#main-content"');
    expect(app).toContain('id="main-content"');
  });
});

describe("structured data", () => {
  it("parses as JSON", () => {
    expect(structuredData.length).toBeGreaterThan(0);
  });

  it("describes the person with the contact details a recruiter needs", () => {
    const graph = (structuredData[0]?.["@graph"] ?? []) as Record<string, unknown>[];
    const person = graph.find((node) => node["@type"] === "Person");

    expect(person).toBeDefined();
    expect(person?.name).toBe("Everton S. Andrade");
    expect(person?.email).toBe("mailto:everton_st@outlook.com");
    expect(JSON.stringify(person?.sameAs)).toContain("github.com/EvertonSt");
  });

  it("lists the projects it names in the copy", () => {
    const graph = (structuredData[0]?.["@graph"] ?? []) as Record<string, unknown>[];
    const list = graph.find((node) => node["@type"] === "ItemList") as
      { numberOfItems: number; itemListElement: { position: number; item: { name: string } }[] } | undefined;

    expect(list).toBeDefined();
    const names = list?.itemListElement.map((entry) => entry.item.name) ?? [];

    // The count in the structured data must match the count on the page, or a
    // search result promises projects the page does not show.
    expect(list?.numberOfItems).toBe(names.length);

    const data = readFileSync(path.join(ROOT, "src/data/projects.ts"), "utf8");
    const dataIds = [...data.matchAll(/^\s*id: "([^"]+)",$/gm)].map((match) => match[1]);
    const flagshipCount = dataIds.filter((id) =>
      ["sitecheckin", "aitendimento", "argus", "cerberus-ci", "enlace"].includes(id as string)
    ).length;

    expect(names.length).toBe(flagshipCount);
  });
});

describe("public assets referenced by the head", () => {
  it("references only files that exist in public/", () => {
    const referenced = [
      ...html.matchAll(/(?:href|content)="(?:https:\/\/evertonst\.github\.io)?\/([^"?]+)"/g),
    ]
      .map((match) => match[1] as string)
      .filter((file) => !file.startsWith("#") && !file.includes("."));

    // A path that is a directory or missing file returns 404 on the one request
    // a social preview makes, and the preview silently renders without an image.
    expect(referenced).toEqual([]);
  });
});
