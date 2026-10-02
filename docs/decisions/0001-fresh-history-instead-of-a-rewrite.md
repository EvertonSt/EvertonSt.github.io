# 0001 — A fresh repository instead of a history rewrite

**Status:** accepted · **Date:** 2026-10-02

## Context

The previous portfolio repository was published to a public GitHub account. All
seventeen of its commits carried an AI co-author trailer and a generation stamp,
and a tool identity directory was committed. GitHub renders a co-author trailer
as a **linked second author**, so the repository header showed two contributors
for work one person did.

The usual remedy is a history rewrite: strip the trailers from every commit,
force-push, and tell GitHub to forget the old objects.

## Decision

Build the site again in a new repository with a fresh `git init`, rather than
rewriting the existing history.

## Rationale

A force-pushed commit does not disappear. It is orphaned — no ref points at it —
and GitHub continues to serve it from a URL anyone can guess by SHA. It stays in
the contributor graph and in the repository's public event history. What the
rewrite actually achieves is that nobody _browsing_ sees the trailers; what it
does not achieve is removing them.

The field lesson recorded on 2026-10-01 makes this concrete: a repository was
audited clean — `git log main` showed zero attribution — while two commits
carrying the trailer were still live and fetchable by their SHA.

Archiving the old repository does not help either. Archiving hides it from
search; it does not purge unreachable objects from a repository that has public
URLs.

So the reliable remedy is the one that never puts the bad objects in the new
repository at all. A fresh `git init` means:

- no commit ever carried a trailer, so there is nothing orphaned;
- the contributor graph is generated from real authorship alone;
- nothing has to be re-dated, so no document cites a SHA that no longer exists;
- the operation is auditable — the first commit in the new repository is the
  first commit that ever existed for it.

The cost is losing the original commit dates and the visible history. For a
repository whose value is the work and the recruiter-facing content, that is a
good trade. For a project with a meaningful archaeology, it would not be.

## Consequences

- The first commit contains the whole repository. The site was rebuilt in one
  pass on 2026-10-02, and a commit per layer would have been twenty-seven
  commits inside a twelve-minute window — a shape that reads as machine output
  rather than as work. Splitting a single build into a fake sequence of commits
  is the same category of edit as re-dating them: it makes the record say
  something untrue to look better.

  What the commit log would have carried is instead carried where it belongs,
  in the places a reader will actually look:

  - `README.md` — what the site is and what every gate checks
  - `docs/decisions/` — the choices that the code cannot explain on its own
  - `SESSION-LEDGER.md` — what was built, what proved it, and what the checks
    did **not** prove

  Every commit after this one is real work at the time it was made.

- The original repository must be replaced at the remote separately. That is a
  destructive, owner-approved operation and is **not** performed by any script
  in this repository.
- The local pre-push check and the CI attribution gate both walk the full history
  rather than `main`, so the same class of leak cannot recur silently. A commit
  removed from a branch is still reachable from a ref; the gate uses
  `git rev-list --all`, and the CI job checks out with `fetch-depth: 0` for the
  same reason.
- The attribution gate matches the _shape_ of an attribution claim rather than a
  list of tool names. A denylist is a list that is always out of date, and it
  fails silently the first time a tool nobody listed produces a commit.
