import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./cv-paths";

/**
 * Verify the static assets by reading their bytes.
 *
 * The previous favicon generator used `sharp`, a native dependency, and was left
 * in the repository after `sharp` was removed from package.json - so the script
 * that was supposed to keep the icons honest could not run at all. This checks
 * the committed files directly instead.
 *
 * A PNG's width and height live in the IHDR chunk, so the dimensions are a
 * sixteen-byte read. That is the whole dependency story: no image library, no
 * native build step, and a check that can actually fail.
 */

const PUBLIC = path.join(ROOT, "public");

interface Expectation {
  file: string;
  width: number;
  height: number;
  why: string;
}

/**
 * The sizes that matter, and why each one matters:
 * a wrong apple-touch-icon is what a phone shows on the home screen, a wrong OG
 * image is what a link looks like when someone shares it, and a favicon that
 * is not square renders distorted in the tab.
 */
const EXPECTED: Expectation[] = [
  { file: "favicon-16x16.png", width: 16, height: 16, why: "browser tab, small size" },
  { file: "favicon-32x32.png", width: 32, height: 32, why: "browser tab, default size" },
  { file: "favicon-48x48.png", width: 48, height: 48, why: "browser tab, large size" },
  { file: "apple-touch-icon.png", width: 180, height: 180, why: "iOS home screen" },
  { file: "og-image.png", width: 1200, height: 630, why: "link preview on social platforms" },
];

const PNG_SIGNATURE = "89504e470d0a1a0a";

function pngDimensions(file: string): { width: number; height: number } | null {
  const bytes = readFileSync(file);
  if (bytes.subarray(0, 8).toString("hex") !== PNG_SIGNATURE) return null;

  // Bytes 16-23 of the IHDR chunk are width and height, big-endian.
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

const failures: string[] = [];

for (const expectation of EXPECTED) {
  const file = path.join(PUBLIC, expectation.file);

  if (!existsSync(file)) {
    failures.push(`${expectation.file} is missing (${expectation.why})`);
    continue;
  }

  const dimensions = pngDimensions(file);
  if (!dimensions) {
    failures.push(`${expectation.file} is not a valid PNG`);
    continue;
  }

  if (dimensions.width !== expectation.width || dimensions.height !== expectation.height) {
    failures.push(
      `${expectation.file} is ${dimensions.width}x${dimensions.height}, expected ${expectation.width}x${expectation.height} (${expectation.why})`
    );
  }
}

// The share image and the icons should not be so large that the page pays for
// them on every load. A favicon at 200KB is a real performance regression.
const MAX_ICON_BYTES = 16 * 1024;
for (const expectation of EXPECTED) {
  const file = path.join(PUBLIC, expectation.file);
  if (!existsSync(file)) continue;

  const size = statSync(file).size;
  if (expectation.file.startsWith("favicon") && size > MAX_ICON_BYTES) {
    failures.push(
      `${expectation.file} is ${(size / 1024).toFixed(1)}KB, over the ${MAX_ICON_BYTES / 1024}KB budget`
    );
  }
}

// The files the document head actually references must exist.
const html = readFileSync(path.join(ROOT, "index.html"), "utf8");
const referenced = [...html.matchAll(/(?:href|content)="https:\/\/evertonst\.github\.io\/([^"?]+)"/g)]
  .map((match) => match[1] as string)
  .filter((file) => /\.(png|svg|xml|txt|pdf)$/.test(file));

if (referenced.length === 0) {
  failures.push("no static assets referenced from index.html; the extraction pattern is probably wrong");
}

for (const file of new Set(referenced)) {
  if (!existsSync(path.join(PUBLIC, file))) {
    failures.push(`index.html references ${file}, which does not exist in public/`);
  }
}

// robots.txt and sitemap.xml must at least be well-formed enough to parse.
const robots = path.join(PUBLIC, "robots.txt");
if (!existsSync(robots)) {
  failures.push("robots.txt is missing");
} else if (!/^Sitemap:\s*https?:\/\/\S+/m.test(readFileSync(robots, "utf8"))) {
  failures.push("robots.txt does not declare a sitemap");
}

const sitemap = path.join(PUBLIC, "sitemap.xml");
if (!existsSync(sitemap)) {
  failures.push("sitemap.xml is missing");
} else {
  const xml = readFileSync(sitemap, "utf8");
  if (!xml.includes("<urlset") || !xml.includes("<loc>")) {
    failures.push("sitemap.xml is not a parseable urlset");
  }
  if (!xml.includes("evertonst.github.io")) {
    failures.push("sitemap.xml does not list the production origin");
  }
}

// Any PNG that nobody references is dead weight in the deploy.
const pngFiles = readdirSync(PUBLIC).filter((name) => name.endsWith(".png"));
const orphans = pngFiles.filter((name) => !referenced.includes(name) && !name.includes("resume"));

if (failures.length > 0) {
  console.error("ASSET VERIFICATION FAILED");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(
  `ASSETS OK - ${EXPECTED.length} image(s) at the right dimensions; ${referenced.length} referenced file(s) present; ${
    orphans.length === 0 ? "no orphan PNGs" : `unreferenced: ${orphans.join(", ")}`
  }`
);
