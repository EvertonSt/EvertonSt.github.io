import { createWriteStream, mkdirSync } from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { buildCv, cvHeadings, type CvDocument } from "./cv-content";
import { OUTPUT_PATHS } from "./cv-paths";

/**
 * Write the résumé as a PDF.
 *
 * Built with pdfkit's standard Helvetica rather than an embedded font on
 * purpose: the text layer is plain and extractable, which is the property that
 * matters for an applicant tracking system. An embedded subset font can render
 * beautifully and parse as nothing.
 *
 * Document metadata names the owner. The Author field is read by some parsers
 * and by anyone who inspects the file, so it carries the same rule as a commit
 * message: no tool, no stamp.
 */

const PAGE_MARGIN = 50;
const PAGE_WIDTH = 595.28; // A4 at 72dpi
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;
const FOOTER_RESERVED = 34;

const INK = "#111111";
const MUTED = "#555555";
const RULE = "#cccccc";

const cv = buildCv("en");
const headings = cvHeadings("en");

const doc = new PDFDocument({
  size: "A4",
  margin: PAGE_MARGIN,
  bufferPages: true,
  /*
   * Uncompressed on purpose. pdfkit deflates content streams by default, which
   * means the text layer sits behind zlib and cannot be inspected without a PDF
   * library - so `verify:cv` could not actually confirm there is a text layer,
   * and the check would have been decorative. The file is a few tens of
   * kilobytes either way.
   */
  compress: false,
  info: {
    Title: `${cv.name} — ${cv.role}`,
    Author: cv.name,
    Subject: "Résumé: QA automation, AI/LLM test tooling and CI/CD quality gates",
    Keywords: "Software Engineer in Test, SDET, QA Automation, Playwright, CI/CD Quality Gates",
    Creator: cv.name,
  },
});

mkdirSync(path.dirname(OUTPUT_PATHS.pdf), { recursive: true });
const stream = createWriteStream(OUTPUT_PATHS.pdf);
doc.pipe(stream);

function heading(text: string) {
  if (doc.y > doc.page.height - FOOTER_RESERVED - 60) doc.addPage();
  doc.moveDown(0.9);
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(text.toUpperCase(), PAGE_MARGIN, y, {
    characterSpacing: 1.1,
    lineBreak: false,
  });
  doc
    .moveTo(PAGE_MARGIN, doc.y + 3)
    .lineTo(PAGE_MARGIN + CONTENT_WIDTH, doc.y + 3)
    .lineWidth(0.6)
    .strokeColor(RULE)
    .stroke();
  doc.moveDown(0.5);
}

function body(text: string, options: { indent?: number; color?: string } = {}) {
  const { indent = 0, color = INK } = options;
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(color)
    .text(text, PAGE_MARGIN + indent, doc.y, { width: CONTENT_WIDTH - indent, align: "left" });
}

// ---------------------------------------------------------------- header --

doc.font("Helvetica-Bold").fontSize(20).fillColor(INK).text(cv.name, PAGE_MARGIN, PAGE_MARGIN, {
  lineBreak: false,
});
doc.moveDown(0.15);
doc.font("Helvetica").fontSize(10).fillColor(MUTED).text(cv.role, { lineBreak: false });
doc.moveDown(0.35);
doc.font("Helvetica").fontSize(8.5).fillColor(MUTED).text(cv.contact.join("  ·  "));

// --------------------------------------------------------------- summary --

heading(headings.summary);
for (const paragraph of cv.headline) {
  doc.moveDown(0.35);
  body(paragraph);
}

// ------------------------------------------------------------ experience --

heading(headings.experience);
for (const entry of cv.experience as CvDocument["experience"]) {
  if (doc.y > doc.page.height - FOOTER_RESERVED - 90) doc.addPage();
  doc.moveDown(0.5);
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(INK)
    .text(`${entry.title} — ${entry.organisation}`, PAGE_MARGIN, doc.y, { lineBreak: false });
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(MUTED)
    .text(`${entry.period}  ·  ${entry.location}`, { lineBreak: false });
  for (const bullet of entry.bullets) {
    doc.moveDown(0.25);
    body(`•  ${bullet}`, { indent: 10 });
  }
}

// -------------------------------------------------------------- projects --

heading(headings.projects);
for (const project of cv.projects) {
  if (doc.y > doc.page.height - FOOTER_RESERVED - 60) doc.addPage();
  doc.moveDown(0.45);
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(INK)
    .text(`${project.name} (${project.status})`, PAGE_MARGIN, doc.y, { lineBreak: false });
  body(project.summary, { color: MUTED });
  for (const link of project.links) {
    body(link, { indent: 10, color: MUTED });
  }
}

// ----------------------------------------------------------------- skills --

heading(headings.skills);
for (const group of cv.skills) {
  doc.moveDown(0.3);
  doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(`${group.category}: `, {
    continued: false,
    lineBreak: false,
  });
  doc.font("Helvetica").fontSize(9).fillColor(INK).text(group.items.join(", "));
}

// ----------------------------------------------------------------- footer --

const range = doc.bufferedPageRange();
for (let index = 0; index < range.count; index += 1) {
  doc.switchToPage(range.start + index);
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor(MUTED)
    .text(
      `${cv.name}  ·  ${cv.contact[0]}  ·  page ${index + 1} of ${range.count}`,
      PAGE_MARGIN,
      doc.page.height - 34,
      {
        width: CONTENT_WIDTH,
        align: "center",
        lineBreak: false,
      }
    );
}

doc.end();

stream.on("finish", () => {
  console.log(`resume PDF written: ${OUTPUT_PATHS.pdf} (${range.count} page(s))`);
});
