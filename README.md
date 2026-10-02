# everton-portfolio

The portfolio and résumé site for Everton S. Andrade — Software Engineer in
Test / QA Automation.

A static site built with React, TypeScript and Vite, published to GitHub Pages.
It exists to do one job: let a recruiter or hiring manager understand, in about
thirty seconds, what this person would be hired to do, and give them a résumé
they can forward without asking.

**Live:** <https://evertonst.github.io/>

## What is on the page

| Section             | Why it is there                                                           |
| ------------------- | ------------------------------------------------------------------------- |
| Hero                | The role being targeted, one claim, and three ways to act                 |
| Proof strip         | Figures taken from each project's own test suite, with the source named   |
| Selected work       | Five systems, each with an honest status label and a four-part case study |
| What I am hired for | The six problems this person gets asked about                             |
| Supporting work     | Breadth, rendered compactly                                               |
| Experience          | Employment history with measurable achievements                           |
| Résumé              | ATS-readable single column, plus PDF and plain-text downloads             |
| Technical stack     | Tools shipped with, not tools read about                                  |
| About               | The reasoning behind the approach                                         |
| Contact             | Email, social profiles, and the roles being sought                        |

Both an English and a Brazilian Portuguese version. The choice is remembered,
and the URL carries it so a shared link does something predictable.

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
```

The dev port is pinned in `vite.config.ts` with `strictPort`, so a port clash
fails loudly instead of silently moving to another port and leaving a test
pointing at nothing.

## Commands

| Command                           | What it does                                         |
| --------------------------------- | ---------------------------------------------------- |
| `npm run dev`                     | Development server on 4321                           |
| `npm run build`                   | Typecheck and build to `dist/`                       |
| `npm run preview`                 | Serve the built site on 4400                         |
| `npm run typecheck`               | `tsc -b` across app, tests and scripts               |
| `npm run lint`                    | ESLint, type-aware rules                             |
| `npm run format:check` / `:write` | Prettier                                             |
| `npm run test:unit`               | Vitest                                               |
| `npm run test:unit:coverage`      | Vitest with the 70% coverage floor                   |
| `npm run test:e2e`                | Playwright, desktop and mobile projects              |
| `npm run gate`                    | The whole local gate, in order, with real exit codes |
| `npm run verify`                  | Link, asset, résumé and attribution checks           |
| `npm run cv` / `npm run cv:txt`   | Regenerate the résumé PDF / plain text               |
| `npm run lighthouse`              | Lighthouse budgets against the production build      |

**Measured, not promised.** The first CI run of the production build scored
**100 / 100 / 100 / 100** — performance, accessibility, best practices and SEO
— across three runs on 2 October 2026. `lighthouserc.json` holds the budgets
those runs were checked against, so a regression fails the build instead of
being noticed later.

`npm run gate` is the command that matters locally. It runs formatter, linter,
typechecker, unit tests, build, the repository verifiers and the E2E suite, and
prints each step's verdict separately. The separation exists because
`npx tsc -b | tail -20; echo $?` reports the exit status of `tail`, not of
`tsc` — a pipeline that can print green on a broken build is worse than no
pipeline.

## Repository gates

Four checks sit between a change and a deploy. Each exists because something
specific got past everything else.

| Gate                         | What it catches                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run verify:links`       | `#anchor` links naming an id no component renders; links to files in `public/` that were never generated |
| `npm run verify:assets`      | Wrong favicon or share-image dimensions, read from the PNG header; referenced files that do not exist    |
| `npm run verify:cv`          | The committed résumé PDF and text file drifting from `src/data/`                                         |
| `npm run verify:attribution` | Any AI attribution in a file, in any commit in the history, or in the commit authorship                  |

The attribution gate is the one with teeth. It audits the working tree, **every
commit reachable from any ref** (not just the current branch, because a
force-pushed commit stays fetchable from GitHub by its SHA), and both the author
and the committer identity of each commit. It recognises the _shape_ of an
attribution claim rather than a list of tool names, so a tool nobody has listed
yet is still caught.

## Testing strategy

- **Unit** (`tests/unit/`) — the copy catalogues and their parity, the
  translator's error paths, scroll-spy section selection including the
  overlapping-id case, theme and language persistence including blocked storage,
  data integrity, design-token parity across the three themes, and the document
  head. 209 tests.
- **E2E** (`e2e/`) — the money paths against the production build: navigation,
  language switching and persistence, the mobile menu's keyboard flow, case-study
  disclosures, the contact and résumé links, and honesty assertions.
- **Visual** (`e2e/visual.spec.ts`) — screenshot comparison at three viewports in
  both colour schemes, with 60 committed baselines.

The visual suite is the answer to a specific failure: on 2026-10-01 four visual
bugs shipped through a fully green pipeline because every assertion was
text-based or ran in a single theme. A change to this site is not verified until
the rendered result has been compared at more than one width and in more than
one colour scheme.

Run it with `npx playwright test --update-snapshots` after an intentional visual
change, and commit the new baselines in the same commit as the change that
caused them.

### Named untested classes

A green suite is evidence about the assertions someone wrote. These are the bug
classes the checks cannot see, stated rather than implied:

- **Real browsers other than Chromium.** The suite runs Chromium only.
- **Screen-reader behaviour.** Semantics and contrast are asserted; how VoiceOver
  or NVDA actually narrates the page is not.
- **Sub-pixel rendering differences** between operating systems, which the
  screenshot comparison tolerates within a 1% pixel budget.
- **Print output on real paper.** The print stylesheet is asserted through
  `emulateMedia`, not by printing.
- **Live SEO.** Structured data and meta tags are asserted to exist and to parse;
  nothing here observes how a search engine actually renders a result.

## Deployment

GitHub Actions publishes to GitHub Pages on every push to `main`.

- `.github/workflows/ci.yml` — format, lint, typecheck, build, unit with a
  coverage floor, E2E, readiness, and a security job. Every third-party action is
  pinned to a full commit SHA with its version in a comment; `permissions` is
  `contents: read` by default and widened per job.
- `.github/workflows/deploy.yml` — builds, re-verifies the résumé and attribution
  before publishing, then deploys.

The security job runs two audits rather than one. Every high advisory in the
dependency tree descends from `@lhci/cli`, the Lighthouse runner: a CI-only
measurement tool that is never bundled, served or shipped. Production
dependencies are held to `high`, the development tree to `critical`. A single
blanket `npm audit` over everything would be red on every push for a chain that
cannot reach a browser, and a permanently red gate is one nobody reads.

**GitHub Pages must be set to deploy from GitHub Actions**, not from a branch:
repository → Settings → Pages → Build and deployment → Source → GitHub Actions.

## Design notes

- **Design tokens live in one file.** `src/styles/variables.css` declares dark,
  light and print palettes. No other stylesheet may contain a colour literal,
  and a unit test fails the build if one appears. A hardcoded hex renders
  correctly, passes every other check, and then lies the moment the token
  beneath it changes.
- **Structure and words are separated.** `src/data/` holds facts — ids, links,
  metrics, status. `src/i18n/` holds prose. `pt.ts` is typed as
  `TranslationCatalogue`, so a missing Portuguese key, or a string where English
  has a list, is a compile error rather than an English paragraph reaching
  production.
- **Status labels are part of the content.** Every project states what a visitor
  will actually find behind the link. A portfolio that overstates its own status
  is worth less to a hiring manager than one that admits what is not finished,
  and a test enforces that nothing not yet released is labelled as being in
  production.

## Decisions

Non-obvious choices and why they were made are recorded in
[`docs/decisions/`](docs/decisions/). The one worth knowing before reading the
code: the résumé PDF is generated **uncompressed** so `verify:cv` can actually
confirm it has a text layer. With FlateDecode the check could never fire, which
would make it an assertion that cannot fail.

The rules for changing the repository — one author, never continue on a red
gate, isolation from the other projects — are in
[`docs/WORKING-AGREEMENT.md`](docs/WORKING-AGREEMENT.md).

**The first commit contains the whole site.** It was rebuilt in one pass on
2 October 2026, replacing an earlier repository. Everything after that commit is
ordinary incremental work, made when it was made.

## Attribution

Every commit, file and document here is authored by the repository owner alone.
No co-author trailers, no tool stamps, no banners. A `commit-msg` hook enforces
it locally and the CI attribution gate enforces it for the whole history.

## Licence

Private repository. All rights reserved.
