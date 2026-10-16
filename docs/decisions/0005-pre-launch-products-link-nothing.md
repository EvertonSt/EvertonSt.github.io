# 0005 — A pre-launch product links nothing, and says why

**Status:** accepted · **Date:** 2026-10-15

## Context

The rule for the Selected work section was: a featured project ships a status
line, a four-part case study and at least one link. Two of the five are
commercial products the owner is building — SiteCheckIn and AItendimento — and
both are pre-launch: their repositories are private, and their product domains
answer behind a pre-launch gate.

The site linked the repositories anyway. A "Repository" button on a public page
that answers 404 for every visitor is the exact failure the status labels exist
to prevent, and it also puts a private repository one click from a public page.
The résumé carried the same two links, and so did the structured data in
`index.html` — three artefacts, one mistake, because all three read the same
field.

## Decision

A featured project either links out or declares a hold. The two pre-launch
products ship `links: []` plus `linkHoldKey`, and the card renders that note in
place of the link row. Nothing else changed: the case study, the status line and
the description all stay.

The law is moved, not deleted. `tests/unit/data-integrity.test.ts` fails the
build when a featured project has neither links nor a hold, and equally when a
hold note appears on a card that does link — a card that renders a "nothing to
click" note next to buttons contradicts itself.

## Rationale

- A dead button is a false claim. The site's own standard is that the status
  line says what a visitor will actually find behind the link; the honest
  version of "there is nothing behind it" is to say so.
- The product domains are behind the pre-launch gate today, so linking them
  hands the visitor the same dead end with a different address.
- Nothing is hidden. The cards name the products, describe them, and give their
  status — pre-launch and private, in those words. What is withheld is a link
  that cannot work and a repository that is not public.
- The claim sources for the copy are named (the case-study master for
  SiteCheckIn and the stress-test verdict it quotes), because prose is a claim
  too; `golive.sh` asks for that re-check before a flip.

## Consequences

- Those two cards look different from the other three. That is the point: no
  row of buttons, and the reason stated in words.
- The status vocabulary moved with the products' reality: `launching-january`
  ("Launching January 2027", public launch 11 January 2027) and `parked`
  ("Launch on hold", product complete, launch plans on hold).
- Launch day needs a flip, not a copy edit: the copy is already written. In the
  workspace, `golive.sh <product>` moves the card from its launch status to
  live, and it was rehearsed against the real tree in both directions: the
  flip edits the status, replaces the two-line hold with the product link
  row, inserts the product surface entry in `src/data/links.ts` at the marked
  anchor, and regenerates the two committed résumé artefacts — because the
  résumé is built from the same data and would otherwise leave `verify:cv`
  as the one red step in the flip's own gate. So an unreleased product domain
  is never published by this repository ahead of its launch, and the flip
  lands a repository that CI accepts.
- A second guard scans everything the repository ships (`src/`, `index.html`,
  `public/`, including the uncompressed résumé PDF) for either repository path,
  so a future card or CV change cannot quietly reintroduce one.

## What the flip rehearsal proved

`golive.sh --dry-run` prints the exact diff, and the flipped state was
rehearsed on the real tree (backed up and restored, byte for byte):

- the flip's three edits apply exactly once each and touch nothing else;
- the flipped state passes the whole local gate — 9 steps in the fast gate,
  and the E2E suite, 34 tests, with the live-badge count and the launch-state
  assertions read from the data rather than pinned to a literal, so a launch
  does not turn the flip into a red gate;
- two bugs in an earlier draft of the flip were caught by that rehearsal and
  fixed: the transform wrote CRLF on Windows (the repository is LF-only), and
  it left `links: []` behind, producing a duplicate key;
- `golive.sh --check` on the flipped state reports "already live" rather than
  failing, which is what makes a re-run safe.

## What this cannot prove

The guard reads the PDF as bytes with whitespace and PDF string delimiters
stripped; `verify:cv` is what proves the PDF text matches the data. And no test
can prove a link works — only that the site does not print one it cannot stand
behind.
