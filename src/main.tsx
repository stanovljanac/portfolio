import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import "./styles/index.css";
import App from "./App";

/* Production HTML is prerendered (scripts/prerender.mjs), so we hydrate it;
   in dev the root is empty and we render from scratch. */
const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);

// See html.smooth-scroll in tokens/base.css.
document.fonts.ready.then(() => document.documentElement.classList.add("smooth-scroll"));

/* Vercel Web Analytics. Its script exists only on Vercel deployments, so on a
   local build (npm run preview) it would be a 404 in the console. */
if (!/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) inject({ framework: "react" });
