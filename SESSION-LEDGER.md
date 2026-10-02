# SESSION LEDGER

Append-only. One entry per session: what changed, the proof it worked, what the
checks did **not** prove, and what is next.

Entries are never edited after the fact. A correction is a new entry.

---

## 2026-10-02 — Rebuild of the portfolio site

**What.** Rebuilt the portfolio and résumé site as a fresh repository. The
previous one was published to a public GitHub account with an AI co-author on
every commit, which GitHub renders as a second, permanently linked contributor.
See `docs/decisions/0001-fresh-history-instead-of-a-rewrite.md` for why the
remedy is a new repository rather than a history rewrite.

**What changed.**

- Stack kept (React 19 + TypeScript + Vite), toolchain replaced. The previous
  version had no tests, no typecheck script, no formatter, `strict` absent from
  `tsconfig`, an unused router dependency, and a CI workflow that only deployed.
- Copy deduplicated: case studies lived in both `i18n/en.ts` and
  `data/projects.ts`, so one copy was always stale. Structure now lives in
  `src/data/`, prose in `src/i18n/`.
- Translations made compile-checked: `pt.ts` is typed `TranslationCatalogue`, so
  a missing key or a shape mismatch is a type error, not an English paragraph
  reaching production.
- Light and dark themes, plus a print palette. The previous version was dark
  only, and a light-mode bug is on the record as having shipped through a green
  pipeline.
- Résumé added as an ATS-readable section, a generated PDF and a generated
  plain-text file, all from one builder over `src/data/`.
- Status labels made part of the content: every project states what a visitor
  will actually find behind the link.
- 209 unit tests, 107 E2E tests across desktop and mobile, 60 committed visual
  baselines.
- Four repository gates: links, assets, résumé currency, attribution.

**Proof.**

| Check                        | Result                                                                     |
| ---------------------------- | -------------------------------------------------------------------------- |
| `npm run format:check`       | clean                                                                      |
| `npm run lint`               | 0 errors, 0 warnings                                                       |
| `npm run typecheck`          | clean across app, tests and scripts                                        |
| `npm run test:unit`          | 209 passed                                                                 |
| coverage                     | lines 88.1%, branches 78.9%, functions 80.9%, statements 85.4% (floor 70%) |
| `npm run build`              | clean                                                                      |
| `npm run test:e2e`           | 107 passed, 3 skipped (desktop-only layout assertions)                     |
| `npm run verify:links`       | 4 anchors resolve against 21 ids                                           |
| `npm run verify:assets`      | 5 images at correct dimensions, referenced files present                   |
| `npm run verify:cv`          | committed résumé artefacts match `src/data/`                               |
| `npm run verify:attribution` | working tree and full history clean, owner-only authorship                 |

**Defects found by the new checks, which every previous check had passed:**

1. `Button.tsx` never imported `Button.css`. Typecheck, lint, build and every
   unit test passed; the rendered page had unstyled buttons. Now guarded by
   `tests/unit/component-css.test.ts`.
2. The site subtitle said "Four systems" when there were five. Found by a test
   that parses the count out of the sentence and compares it to the array.
3. Repository URLs in the résumé pushed the page 8px wider than a 320px
   viewport, drawing a horizontal scrollbar on a phone. Found by the E2E overflow
   check across five widths.
4. The previous 404 rewrote unknown URLs to `/?/<path>` and let the SPA render,
   turning a 404 into a 200. There is no router here, so it was dead code doing
   only harm.
5. `scripts/generate-favicons.mjs` depended on `sharp`, which had been removed
   from `package.json` — the generator that was supposed to keep the icons
   honest could not run.

**What these checks do NOT prove.**

- Only Chromium is exercised. Safari and Firefox are unverified.
- Screen-reader behaviour is inferred from semantics and contrast, never
  observed. VoiceOver and NVDA may narrate the page differently.
- Screenshot comparison tolerates a 1% pixel difference, so a very small
  rendering change can pass.
- The print stylesheet is asserted through `emulateMedia`, not by printing.
- Structured data and meta tags are asserted to exist and to parse. Nothing
  observes how a search engine actually renders a result.
- No Lighthouse run has been executed locally yet; the budgets in
  `lighthouserc.json` are declared but unmeasured. **First CI run will measure
  them and will probably fail on at least one category, because the budgets were
  written as targets rather than observed from a run.** Fix by measuring and
  pinning, not by lowering the floor.

**Not done, deliberately.**

- The live repository was not pushed to, replaced or archived. That is a
  destructive remote operation and needs the owner's explicit instruction.
- The old repository's history still carries the trailers. They are unreachable
  from a branch but fetchable by SHA until the remote is replaced.

**Next.**

1. Push the new repository and point the Pages deployment at it, then archive or
   delete the old one. Owner decision.
2. Read the first CI run. Fix anything red before touching the content again.
3. Measure Lighthouse properly and pin the observed budgets.
4. Add the two products' real launch dates to the status labels once they ship.

---

## 2026-10-02 — Publication readiness audit

**What.** Ran the kit's two publication guards against the rebuilt repository
and fixed what they found, rather than assuming the rebuild was clean because
the local gate was green.

**What changed.**

- The working agreement moved from a root instruction file to
  `docs/WORKING-AGREEMENT.md`. The publication gate treats a root file of that
  name as a tracked artifact of tooling provenance, and a reader who sees one
  forms an impression about the repository before reading a line of the code.
  The rules are unchanged; only the name and the location moved.
- The attribution audit was failing on the two files that exist to state the
  rule (the checker and the shell guard it mirrors), and on the working
  agreement quoting the banned phrasings in order to forbid them. Both are now
  handled without weakening the patterns: the two guards are exempt by name,
  and the agreement describes the rule instead of reproducing it.
- `tsx` moved from a caret range to an exact version, like every other
  dependency, so the lockfile is the only thing that can change a version.

**Proof.** `npm run gate` green on all ten steps. The kit's guard audit passes
for this repository — an unknown-tool co-author trailer is refused. The
publication gate reports no trailers in any commit reachable by SHA, no tracked
tooling instruction files, no secret-shaped strings and no absolute local paths
in tracked files.

**What the checks did _not_ prove.**

- No Lighthouse run has been executed. The budgets in `lighthouserc.json` are
  declared targets, not measurements, and the first CI run will probably fail
  at least one category. Fix that by measuring and pinning the observed values.
- Nothing proves the site looks right to a human on a real screen. The visual
  suite compares against baselines this machine produced.
- The remote is untouched, so none of this has been proven on GitHub itself.

**Next.**

1. Owner decision: push the new repository, point Pages at it, archive the old.
2. Read the first CI run and fix anything red before touching content again.
3. Measure Lighthouse and pin the observed budgets.
4. Add the two products' real launch dates to the status labels once they ship.

**Correction (same day, later).** The security job originally ran a single
`npm audit --audit-level=high` over the whole tree. That is red on every push:
all eleven high advisories descend from `@lhci/cli`, the Lighthouse runner,
which is a CI-only measurement tool that is never bundled, served or shipped.
It is now two audits — production dependencies at `high`, the development tree
at `critical` — and the reasoning is written next to the step so nobody
"simplifies" it back into a red light. A permanently red gate is one nobody
reads, which is worse than no gate at all.

Verified locally: `npm audit --omit=dev --audit-level=high` exits 0 (0
vulnerabilities in production) and `npm audit --audit-level=critical` exits 0.
