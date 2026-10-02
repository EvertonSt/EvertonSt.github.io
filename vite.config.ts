import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/*
 * `base: "/"` because this builds to a GitHub Pages *user* site
 * (evertonst.github.io), which is served from the domain root. A project site
 * under /repo/ would need a relative base instead.
 *
 * Dev and preview ports are pinned and registered in the README. The kit
 * reserves 3000/3001, so this project takes 4321 (dev) and 4400 (preview).
 * `strictPort` matters: without it Vite silently falls back to the next free
 * port, and a Playwright baseURL pointing at 4400 then measures nothing.
 */
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: { port: 4321, strictPort: true },
  preview: { port: 4400, strictPort: true },
  build: {
    outDir: "dist",
    // es2022 is the floor for the CSS nesting-free syntax used here and keeps
    // the output readable in DevTools instead of maximally minified.
    target: "es2022",
    sourcemap: false,
    // One route means one bundle. Splitting the vendor chunk out of the only
    // page it appears on costs an extra request and buys no cache benefit.
    chunkSizeWarningLimit: 400,
  },
});
