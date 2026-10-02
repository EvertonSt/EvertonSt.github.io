# 0004 — The résumé is generated, committed, and verified

**Status:** accepted · **Date:** 2026-10-02

## Context

A portfolio is read in two ways. A human scrolls it, and an applicant tracking
system parses it. The second reader needs a flat document structure, and the
first needs the page to stay a page. They are different artifacts made from the
same facts.

There is also a third reader: a recruiter forwarding a file to a colleague. That
one wants a PDF they can attach.

## Decision

One builder, `scripts/cv-content.ts`, reads `src/data/` and produces a résumé
model. Three consumers render it:

| Consumer   | Output                                | Why                                                       |
| ---------- | ------------------------------------- | --------------------------------------------------------- |
| The page   | `src/components/sections/Resume.tsx`  | Single semantic column, print-optimised                   |
| Plain text | `public/everton-s-andrade-resume.txt` | ATS parsers frequently read `.txt` more reliably than PDF |
| PDF        | `public/everton-s-andrade-resume.pdf` | Something to attach to an application                     |

Both files are **committed**, and `npm run verify:cv` regenerates them in memory
and fails the build if the committed copies have drifted.

## Why commit a generated artefact

The alternative — generating during CI — would mean the deployed files are never
reviewed. A résumé is a claim, and a claim should be read before it ships. Worse,
a generated-and-not-committed artifact produces a file nobody has ever opened.

Committing it costs a step in the workflow:

> Add or change a project in `src/data/` → run `npm run cv && npm run cv:txt`
> → commit the regenerated files.

`verify:cv` is what makes that step safe. It runs in CI and in the deploy job,
so a forgotten regeneration fails the build rather than shipping a résumé that
omits a project.

## Why the PDF is uncompressed

pdfkit deflates content streams by default. With compression, the glyph-drawing
operators sit behind zlib, and `verify:cv` cannot see them — so the check that
the PDF has a text layer would be an assertion that can never fail, which is
worse than not having it. An applicant tracking system needs an extractable text
layer; that is the whole point of shipping a PDF.

So the PDF is written with `compress: false`. It costs roughly 23KB instead of
7KB, and buys a file a human can inspect with `strings`.

## What the verifier actually checks

Not only "the file exists":

- the committed text matches what the builder returns right now;
- every project in the data appears in it;
- every contact detail appears in it;
- every section heading is present;
- the PDF has a `%PDF-` header and a terminating `%%EOF` — a truncated upload
  passes a file-existence check and fails the one person trying to open it;
- the PDF declares pages, names the author in its metadata, and has more than
  fifty text operators.

## Consequences

- Adding a project means regenerating. `verify:cv` says so in its failure
  message, with the exact command.
- The résumé and the page cannot disagree about a fact, because neither owns the
  fact — `src/data/` does.
