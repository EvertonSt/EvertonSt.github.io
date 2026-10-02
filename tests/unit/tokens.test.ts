import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Design token discipline.
 *
 * The light theme used to be declared twice: once for an explicit override and
 * once inside a `prefers-color-scheme` block. That is a deliberate trade - the
 * duplication is what lets an explicit toggle coexist with the OS default - but
 * duplication rots, and a token changed in one block and not the other produces
 * a site that is correct in the theme nobody tested. So the two blocks are
 * compared mechanically.
 *
 * The second assertion is the one that matters more: a colour literal outside
 * `variables.css` renders correctly, passes every other check, and then lies the
 * moment the token beneath it changes.
 */

const SRC = path.resolve(import.meta.dirname, "../../src");
const VARIABLES = path.join(SRC, "styles/variables.css");

const variablesCss = readFileSync(VARIABLES, "utf8");

/** Custom properties declared inside the block starting at `selector`. */
function declaredIn(selector: string): string[] {
  const start = variablesCss.indexOf(selector);
  if (start === -1) return [];

  const open = variablesCss.indexOf("{", start);
  let depth = 0;
  let end = open;
  for (let i = open; i < variablesCss.length; i += 1) {
    if (variablesCss[i] === "{") depth += 1;
    if (variablesCss[i] === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  const block = variablesCss.slice(open + 1, end);
  return [...block.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map((match) => match[1] as string).sort();
}

describe("theme token parity", () => {
  const dark = declaredIn(":root {");
  const lightExplicit = declaredIn(':root[data-theme="light"] {');
  const lightSystem = declaredIn(":root:not([data-theme]) {");

  /*
   * Tokens whose value changes between themes, named explicitly.
   *
   * A prefix heuristic was the obvious thing here and it was wrong:
   * `--text-xs` and `--text-3xl` are font sizes, while `--text-primary` and
   * `--text-muted` are colours, and a `^--text-` pattern cannot tell them apart.
   * Naming the set keeps the distinction honest, and when a colour token is
   * added later the test fails until it is listed - which is the correct
   * direction for it to fail in.
   */
  const COLOUR_TOKENS = new Set([
    "--bg-primary",
    "--bg-secondary",
    "--bg-tertiary",
    "--bg-card",
    "--bg-card-hover",
    "--bg-elevated",
    "--bg-overlay",
    "--border-subtle",
    "--border-strong",
    "--border-focus",
    "--text-primary",
    "--text-secondary",
    "--text-muted",
    "--text-inverse",
    "--accent-blue",
    "--accent-blue-strong",
    "--accent-violet",
    "--accent-violet-strong",
    "--accent-green",
    "--accent-amber",
    "--accent-red",
    "--accent-on",
    // --accent-gradient is deliberately absent: it is built from the two accent
    // tokens with var(), so it re-themes itself and must not be redeclared.
    "--shadow-sm",
    "--shadow-md",
    "--shadow-lg",
    "--shadow-focus",
  ]);

  const themeable = (tokens: string[]) => tokens.filter((token) => COLOUR_TOKENS.has(token));
  const structural = (tokens: string[]) => tokens.filter((token) => !COLOUR_TOKENS.has(token));

  it("declares a dark theme", () => {
    expect(dark.length).toBeGreaterThan(30);
  });

  it("declares an explicit light theme", () => {
    expect(lightExplicit.length).toBeGreaterThan(0);
  });

  it("declares a system-following light theme", () => {
    expect(lightSystem.length).toBeGreaterThan(0);
  });

  it("overrides every themeable token in the light theme", () => {
    // A colour token that exists in dark but not in light renders as the dark
    // value on a light background: a black hero, invisible text. That is the bug
    // class the field lessons recorded on 2026-10-01.
    expect(themeable(lightExplicit).sort()).toEqual(themeable(dark).sort());
  });

  it("overrides every themeable token in the system-following light block", () => {
    expect(themeable(lightSystem).sort()).toEqual(themeable(dark).sort());
  });

  it("keeps the two light blocks identical to each other", () => {
    // They exist for different selectors - an explicit toggle and the OS
    // default - and a reader who never presses the toggle must see the same page
    // as one who does.
    expect(lightSystem).toEqual(lightExplicit);
  });

  it("does not redeclare structural tokens in the light themes", () => {
    const leaked = [...structural(lightExplicit), ...structural(lightSystem)];

    expect(leaked, `light themes redeclare theme-independent tokens: ${leaked.join(", ")}`).toEqual([]);
  });

  it("declares no token twice inside one block", () => {
    for (const [name, tokens] of [
      ["dark", dark],
      ["light", lightExplicit],
    ] as const) {
      expect(new Set(tokens).size, `${name} declares a duplicate`).toBe(tokens.length);
    }
  });

  it("defines the tokens the site actually depends on", () => {
    const required = [
      "--bg-primary",
      "--bg-card",
      "--bg-tertiary",
      "--text-primary",
      "--text-secondary",
      "--text-muted",
      "--accent-blue",
      "--accent-violet",
      "--border-subtle",
      "--border-focus",
      "--max-width",
      "--nav-height",
    ];

    const missing = required.filter((token) => !dark.includes(token));
    expect(missing).toEqual([]);
  });
});

describe("no colour literals outside the token file", () => {
  function walk(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) return walk(full);
      return entry.endsWith(".css") ? [full] : [];
    });
  }

  const stylesheets = walk(SRC).filter((file) => file !== VARIABLES);

  it("finds stylesheets to check", () => {
    expect(stylesheets.length).toBeGreaterThan(5);
  });

  it.each(stylesheets)("%s declares colours only through tokens", (file) => {
    const source = readFileSync(file, "utf8");
    // Strip comments first: a hex inside an explanatory comment is not a
    // rendered value, and failing on it would teach people to delete the
    // comment instead of using the token.
    const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, "");

    const literals = [...withoutComments.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((match) => match[0]);
    // `currentColor` and `transparent` are not literals in this sense.
    expect(literals, `${path.basename(file)} hardcodes a colour: ${literals.join(", ")}`).toEqual([]);
  });

  it("uses no rgb() or hsl() literals outside the token file either", () => {
    const offenders: string[] = [];

    for (const file of stylesheets) {
      const withoutComments = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
      const matches = withoutComments.match(/\b(?:rgb|rgba|hsl|hsla)\(/g);
      if (matches) offenders.push(`${path.basename(file)}: ${matches.join(", ")}`);
    }

    expect(offenders).toEqual([]);
  });
});
