/**
 * The two commercial products keep their repositories private, and this
 * repository is public: their repository paths are assembled here, once, and
 * nowhere else.
 *
 * Everything that needs them imports this module instead of repeating the
 * address - the page guards (`tests/unit/app.test.tsx`, `e2e/site.spec.ts`) and
 * the shipped-artefact guard (`tests/unit/data-integrity.test.ts`) alike. The
 * module is not part of the build (`tsconfig.app.json` includes only `src`), so
 * neither a shipped file nor a piece of prose carries the full path. The page
 * still names both products; the names are public, the repositories behind
 * them are not (docs/decisions/0005).
 */
const ORGANISATION = "EvertonSt";
const REPOSITORIES = ["sitecheckin", "aitendimento"] as const;

/** The full paths, assembled from the facts above - spelled out nowhere else. */
export const privateRepositoryPaths: readonly string[] = REPOSITORIES.map(
  (repository) => `github.com/${ORGANISATION}/${repository}`
);
