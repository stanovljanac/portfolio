import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
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
