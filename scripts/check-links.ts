import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./cv-paths";

/**
 * Every internal link must point at something that exists.
 *
 * Two different things break here and they need different checks:
 *
 *  1. A source-level anchor (`href="#work"`) can name an id no component
 *     renders. Grep finds the `href` but cannot know whether the id is there.
 *  2. A link to a file in `public/` can name a file that was never generated.
 *
 * A dead `#anchor` is the defect that survives every other check on a site with
 * no router: nothing 404s, nothing logs an error, and the navigation link
 * simply does nothing.
 */

const SRC = path.join(ROOT, "src");

function walk(dir: string, extensions: string[]): string[] {
  if (!existsSync(dir)) return [];

  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full, extensions);
    return extensions.some((extension) => entry.endsWith(extension)) ? [full] : [];
  });
}

/*
 * Both extensions matter. Anchors live in components; the paths to generated
 * artefacts live in the data modules, and a broken `/resume.pdf` reference in
 * `links.ts` is exactly as dead as a broken `#anchor` in a component.
 */
const sourceFiles = walk(SRC, [".tsx", ".ts"]);

if (sourceFiles.length === 0) {
  console.error("LINK CHECK FAILED\n  - no sources found under src/; the walk is broken");
  process.exit(1);
}

const sources = sourceFiles.map((file) => ({ file, text: readFileSync(file, "utf8") }));
const html = readFileSync(path.join(ROOT, "index.html"), "utf8");

/** Ids the application renders, from `id="..."` in JSX. */
const declaredIds = new Set<string>();
for (const { text } of sources) {
  for (const match of text.matchAll(/\bid="([A-Za-z][\w-]*)"/g)) {
    declaredIds.add(match[1] as string);
  }
}

/** Anchors that link to another place on this page. */
const anchors = new Set<string>();
for (const { text } of sources) {
  for (const match of text.matchAll(/href="?\{?"?#([A-Za-z][\w-]*)/g)) {
    anchors.add(match[1] as string);
  }
}
/*
 * Anchors written as absolute URLs in the head, e.g.
 * href="https://evertonst.github.io/?lang=en".
 *
 * `href` is required in the pattern on purpose. Without it the scan also picks
 * up the `@id` fragments inside the JSON-LD block - "#person", "#website" -
 * which are schema.org node identifiers and have nothing to do with navigating
 * this page. A guard that cries wolf about identifiers is a guard that gets
 * switched off.
 */
for (const match of html.matchAll(/href="https:\/\/evertonst\.github\.io\/?\??[^"]*?#([A-Za-z][\w-]*)"/g)) {
  anchors.add(match[1] as string);
}

/** Files the page links to directly under the site root. */
const fileReferences = new Set<string>();
for (const { text } of sources) {
  for (const match of text.matchAll(
    /["'`](\/[a-z0-9][\w.-]*\.(?:pdf|txt|xml|txt|json|svg|png|css|js))["'`]/g
  )) {
    fileReferences.add(match[1] as string);
  }
}

const failures: string[] = [];

for (const anchor of anchors) {
  if (!declaredIds.has(anchor)) {
    failures.push(`anchor #${anchor} has no matching id in src/`);
  }
}

for (const reference of fileReferences) {
  if (!existsSync(path.join(ROOT, "public", reference.replace(/^\//, "")))) {
    failures.push(`public file ${reference} is linked but does not exist`);
  }
}

if (anchors.size === 0) {
  failures.push("no internal anchors found; the extraction pattern is probably wrong");
}

if (failures.length > 0) {
  console.error("LINK CHECK FAILED");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `LINKS OK - ${anchors.size} anchor(s) resolve against ${declaredIds.size} ids; ${fileReferences.size} file reference(s) exist`
);
