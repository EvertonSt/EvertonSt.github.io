import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

/*
 * Two tiers on purpose.
 *
 * `recommended` (untyped) is applied to every TypeScript file so the config
 * files and build scripts are still linted. `recommendedTypeChecked` is
 * scoped to the three trees that have a tsconfig, because a type-aware rule
 * throws at load time when it is handed a file with no program - which is what
 * happened to this file the first time round.
 */
export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "public/**",
      "e2e/*-snapshots/**",
    ],
  },
  {
    /*
      The attribution checker necessarily contains every pattern it hunts for.
      Linting it would either fail on its own source or need the patterns
      disabled one by one, and a rule switched off to accommodate the guard is
      a rule that will be switched off again for something else.
    */
    files: ["scripts/check-attribution.ts"],
    rules: { "no-empty": "off" },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}", "e2e/**/*.{ts,tsx}", "vitest.setup.ts"],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      /*
       * Rules with teeth rather than style opinions. `any` is how a type error
       * turns into a runtime one three files away; a floating promise on a
       * static site has nowhere to surface except a console nobody opens.
       */
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-empty": ["error", { allowEmptyCatch: false }],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "prefer-const": "error",
    },
  },
  {
    // Tests reach into internals and name obviously synthetic fixtures.
    files: ["tests/**/*.{ts,tsx}", "e2e/**/*.{ts,tsx}", "vitest.setup.ts"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-console": "off",
    },
  },
  {
    // Build-time scripts and config files run under plain node.
    files: ["**/*.{mjs,js,cjs}", "*.config.{ts,mts}", "scripts/**/*.ts"],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      "no-console": "off",
    },
  }
);
