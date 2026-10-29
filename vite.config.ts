import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The CV offered for download (see PROFILE.cv in src/data/profile.ts).
const CV = resolve(__dirname, "public/cv/Mihailo-Sebek-CV.pdf");

// https://vite.dev/config/
// The SSR build (used only for prerendering) takes its entry from the CLI.
export default defineConfig({
  plugins: [react()],
  define: {
    // Day-level, so the client and SSR builds of one `npm run build` agree.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    __CV_KB__: existsSync(CV) ? String(Math.max(1, Math.round(statSync(CV).size / 1024))) : "null",
  },
});
