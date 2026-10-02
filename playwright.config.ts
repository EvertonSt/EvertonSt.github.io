import { defineConfig, devices } from "@playwright/test";

const PORT = 4400;
const BASE_URL = `http://localhost:${PORT}`;

/*
 * The suite runs against `dist/` served by a static file server, not against
 * the dev server. Two reasons: the dev server transforms modules on demand and
 * would hide a broken production build, and Lighthouse numbers measured against
 * a dev server are not the numbers a recruiter's browser sees.
 *
 * `reuseExistingServer` is deliberately off in CI and on locally, so a stale
 * server from a previous run can never be measured in place of a fresh build.
 */
export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_500 },
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: `npx --yes serve dist -l ${PORT} --no-clipboard`,
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
