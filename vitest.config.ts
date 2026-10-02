import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    /*
     * happy-dom, not node: the unit suite renders components and exercises
     * hooks that read matchMedia, localStorage and document. A node
     * environment would make every one of those assertions vacuous.
     */
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", "dist/**", "coverage/**", "test-results/**", "playwright-report/**"],
    /*
     * Coverage is a floor, not a score to display. The threshold is on lines,
     * functions, statements and branches, so a file cannot pass by having its
     * easy lines covered while every error branch is skipped.
     */
    coverage: {
      provider: "v8",
      reporter: ["text-summary", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx", "src/vite-env.d.ts"],
      thresholds: {
        lines: 70,
        functions: 70,
        statements: 70,
        branches: 70,
      },
    },
  },
});
