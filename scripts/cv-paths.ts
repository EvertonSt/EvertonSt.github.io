import path from "node:path";
import { fileURLToPath } from "node:url";

/** Repository root, resolved from this file rather than from process.cwd(). */
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Where the generated résumé artefacts live.
 *
 * Centralised because three scripts need to agree: the two generators write
 * here, and the verifier reads from here. A path typed separately in each would
 * let the verifier pass against a file nobody ships.
 */
export const OUTPUT_PATHS = {
  pdf: path.join(ROOT, "public/everton-s-andrade-resume.pdf"),
  txt: path.join(ROOT, "public/everton-s-andrade-resume.txt"),
} as const;
