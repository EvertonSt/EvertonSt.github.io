# 0002 — Vite and React, and no framework

**Status:** accepted · **Date:** 2026-10-02

## Context

The site is one document. No routes, no server, no data fetching, no form
submission, no session. The previous version shipped a router dependency it never
imported.

## Decision

Keep React on Vite, with no routing library and no UI framework. Styles are
plain CSS with custom properties.

## Rationale

**The router was unused and had to go.** `react-router-dom` was a declared
dependency with zero imports. Beyond the wasted install, an unused router is a
supply-chain surface and a `npm audit` line that trains everyone reading the
output to ignore it.

**A second page was not worth a routing library.** There is one URL. The résumé
is a section with its own anchor, not a route, because the print stylesheet and
the applicant-tracking parsers both work better with everything on one
document — an ATS reads a flat structure, and a two-column hero with an
absolutely positioned sidebar is unreadable to most of them.

**A UI framework would have cost more than it saved.** The design system is
roughly forty tokens. Tailwind would have added a build-time dependency and a
class-name vocabulary to every file, in exchange for utilities this site does not
need — no modal, no dropdown, no virtualised list. The two components with real
behaviour (the navigation panel and the case-study disclosure) are the only ones
that would have pulled anything from a library, and both are small enough to own.

**The bundle is small because the site is small.** One route means one bundle.
Splitting the vendor chunk out of the only page it appears on costs an extra
request and buys no cache benefit, so `build.rollupOptions` is left alone.

## Consequences

- Routing a future second page means adding a dependency then, when it is
  actually needed.
- The 404 page cannot redirect into the application. It is a real 404 with a
  real status, which is the correct behaviour anyway: the previous version
  rewrote unknown URLs to `/?/<path>` and let a single-page app render, turning
  a 404 into a 200 at the home page and telling search engines the broken URL
  existed.
- Every colour must come from `src/styles/variables.css`. With no utility
  framework there is nothing to discourage a literal except the test that fails
  the build when one appears.
