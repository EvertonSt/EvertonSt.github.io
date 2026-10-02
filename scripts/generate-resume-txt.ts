import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { renderResumeText, buildCv } from "./cv-content";
import { OUTPUT_PATHS } from "./cv-paths";

/**
 * Write the plain-text résumé.
 *
 * Plain text is not a fallback. Applicant tracking systems frequently parse a
 * `.txt` more reliably than a PDF, and a human can always read it. It is the
 * lowest-fidelity copy of the same data, which makes it the best canary: if the
 * text file is correct, the content pipeline is correct.
 *
 * Output is committed, because a generated artefact nobody ships is decoration.
 * `npm run verify:cv` regenerates in memory and fails if the committed file no
 * longer matches.
 */
const cv = buildCv("en");
const text = renderResumeText(cv, "en");

mkdirSync(path.dirname(OUTPUT_PATHS.txt), { recursive: true });
writeFileSync(OUTPUT_PATHS.txt, text, "utf8");

const lines = text.split("\n").length;
console.log(`resume text written: ${OUTPUT_PATHS.txt} (${lines} lines, ${text.length} bytes)`);
