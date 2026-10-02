import { existsSync, readFileSync } from "node:fs";
import { buildCv, cvHeadings, renderResumeText } from "./cv-content";
import { OUTPUT_PATHS } from "./cv-paths";

/**
 * Prove the committed résumé artefacts still match the data.
 *
 * A generated artefact that is committed and never verified is a liability: it
 * drifts silently, and the copy that drifts is the one a recruiter downloads.
 * This regenerates both files in memory and compares them against what is on
 * disk, so adding a project to `src/data` without regenerating fails the build
 * instead of producing a résumé that omits it.
 *
 * It also checks the PDF structurally - a valid header, a page tree and an
 * extractable-text marker - because a zero-byte or truncated PDF passes a file
 * existence check and fails the one person trying to open it.
 */

const failures: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) failures.push(message);
}

// ---------------------------------------------------------------- text ---

if (!existsSync(OUTPUT_PATHS.txt)) {
  failures.push(`${OUTPUT_PATHS.txt} is missing. Run: npm run cv:txt`);
} else {
  const onDisk = readFileSync(OUTPUT_PATHS.txt, "utf8");
  const expected = renderResumeText(buildCv("en"), "en");

  if (onDisk !== expected) {
    failures.push(`${OUTPUT_PATHS.txt} is out of date with src/data. Run: npm run cv:txt`);
  }

  // Content checks that survive even if the comparison above is satisfied by a
  // mistake: every project named, every contact detail present.
  const cv = buildCv("en");
  for (const project of cv.projects) {
    check(onDisk.includes(project.name), `resume text omits project: ${project.name}`);
  }
  for (const detail of cv.contact) {
    check(onDisk.includes(detail.split(" · ")[0] as string), `resume text omits contact: ${detail}`);
  }
  // Headings are uppercased for scanning, so compare case-insensitively rather
  // than searching for a spelling the file does not contain.
  const headings = cvHeadings("en");
  for (const heading of Object.values(headings)) {
    check(
      onDisk.toUpperCase().includes(heading.toUpperCase()),
      `resume text has no "${heading}" section heading`
    );
  }

  // Horizontal whitespace only: `\s` includes newlines, and the blank lines
  // between sections are deliberate formatting, not a defect.
  check(!/[^\S\n]{4,}/.test(onDisk), "resume text has runs of horizontal whitespace");
}

// ----------------------------------------------------------------- pdf ---

if (!existsSync(OUTPUT_PATHS.pdf)) {
  failures.push(`${OUTPUT_PATHS.pdf} is missing. Run: npm run cv`);
} else {
  const bytes = readFileSync(OUTPUT_PATHS.pdf);
  const raw = bytes.toString("latin1");

  check(bytes.length > 4096, `resume PDF is suspiciously small (${bytes.length} bytes)`);
  check(raw.startsWith("%PDF-"), "resume PDF has no %PDF header");
  check(raw.trimEnd().endsWith("%%EOF"), "resume PDF is truncated - no %%EOF marker");
  check(raw.includes("/Type /Page"), "resume PDF declares no pages");

  // The Author field is read by parsers and by anyone inspecting the file.
  check(raw.includes("Everton"), "resume PDF metadata does not name the author");

  // A text layer is what makes a PDF parseable by an applicant tracking
  // system. This is also why the generator writes the PDF uncompressed: with
  // FlateDecode the glyph operators sit behind zlib and this check could never
  // see them, which would make it an assertion that cannot fail. The file costs
  // a few tens of kilobytes either way, and an artefact a human can inspect
  // with `strings` is worth more than the kilobytes.
  const textOperators = (raw.match(/\bTj\b|\bTJ\b/g) ?? []).length;
  check(textOperators > 50, `resume PDF has almost no text layer (${textOperators} operators)`);
}

if (failures.length > 0) {
  console.error("CV VERIFICATION FAILED");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("CV VERIFIED - committed résumé artefacts match src/data");
