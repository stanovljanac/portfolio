import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// The SSR build (used only for prerendering) takes its entry from the CLI.
export default defineConfig({
  plugins: [react()],
  // A missing file is a 404, as on Vercel, instead of index.html served as
  // e.g. /llms.txt or /.well-known/ai-catalog.json.
  appType: "mpa",
  define: {
    // Day-level, so the client and SSR builds of one `npm run build` agree.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
});
