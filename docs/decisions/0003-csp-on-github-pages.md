# 0003 — Security headers on a host that cannot set them

**Status:** accepted · **Date:** 2026-10-02

## Context

The site is deployed to GitHub Pages. GitHub Pages serves files and does not let
a repository configure response headers — there is no way to add one. A
Content-Security-Policy is a response header.

## Decision

Ship two policies, for two hosts:

1. A `<meta http-equiv="Content-Security-Policy">` in `index.html`, which is the
   only place a policy can live for this deployment.
2. A `public/_headers` file carrying the strict version, including the directives
   a meta policy silently ignores.

## What a meta policy cannot do

Three directives are **ignored** when delivered in a `<meta>` tag:

| Directive                  | Why it is ignored                   | Consequence                                                                                                       |
| -------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `frame-ancestors`          | Only meaningful as a header         | The site can be framed. Mitigation: `X-Frame-Options` is not settable either, so this is accepted and documented. |
| `form-action`              | Only meaningful as a header         | The site posts nothing.                                                                                           |
| `report-uri` / `report-to` | No reporting endpoint is configured | No CSP violation reports are collected.                                                                           |

Any policy that _looks_ complete but is delivered by meta tag is security
theatre that reads as security. Writing them down is the difference between a
constraint and a mistake.

## What it costs

The inline structured-data block requires `'unsafe-inline'` in `script-src`.
That is not a free choice — it is the one real weakening, and it exists because
JSON-LD must be inline for search engines to read it.

The practical exposure is bounded: after the build, the page has no inline
executable script at all. Every script the browser runs is an external module
emitted by the build from this origin. The only inline script is the JSON-LD
block, which contains no executable code.

The alternative — a SHA-256 hash of the JSON-LD block in the policy — is
strictly better but brittle: editing the structured data requires recomputing a
hash, and getting it wrong breaks the page in a way that is hard to diagnose. For
a document that changes a few times a year, that trade was not worth making. If
the site ever moves to a host that can set headers, `public/_headers` takes over
immediately and the meta tag becomes belt-and-braces.

## The rest of the headers

`public/_headers` also carries `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, `Strict-Transport-Security` and `Cross-Origin-Opener-Policy`.
None of these take effect on GitHub Pages. They exist for the day the site moves
to Netlify, Cloudflare Pages, or any host that reads the file — which is a
convention those three share, so it costs one file and no configuration.

## Verification

`tests/unit/index-html.test.ts` asserts the meta policy is present and contains
the directives that _are_ honoured, and that `public/_headers` carries the strict
set including `frame-ancestors 'none'`. The test also asserts the meta policy
does **not** claim `frame-ancestors`, because a policy that appears to enforce
framing protection and does not is worse than one that does not mention it.
