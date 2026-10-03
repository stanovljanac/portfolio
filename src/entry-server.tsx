import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import type { Locale, Page } from "./i18n";

/* Used only at build time by scripts/prerender.mjs. */
export function render(locale: Locale, page: Page): string {
  return renderToString(
    <StrictMode>
      <App locale={locale} page={page} />
    </StrictMode>,
  );
}
