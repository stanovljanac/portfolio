/* Shared helpers for the QA scripts in this folder.
   They run against the built site served by `npm run preview` (port 4173).
   Playwright is not a project dependency: it is loaded from PLAYWRIGHT_MODULE
   (path to a playwright/index.js), a local install, or the global npm
   folder, in that order. Its version must match an installed Chromium. */
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const BASE = process.env.QA_BASE || "http://localhost:4173";
export const OUT = resolve(process.env.QA_OUT || join(ROOT, ".qa"));
mkdirSync(OUT, { recursive: true });

export const THEMES = ["light", "dark"];
export const log = (...a) => console.log(...a);

export async function launch() {
  try {
    await fetch(BASE);
  } catch {
    throw new Error(`Nothing is served at ${BASE}. Run \`npm run build && npm run preview\` first.`);
  }
  return launchChromium();
}

/* Chromium without the local-server check (scripts/brand-assets.mjs uses it too). */
export async function launchChromium() {
  const candidates = [process.env.PLAYWRIGHT_MODULE, "playwright"];
  try {
    candidates.push(join(execSync("npm root -g", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(), "playwright/index.js"));
  } catch {}
  for (const c of candidates.filter(Boolean)) {
    try {
      const m = await import(isAbsolute(c) ? pathToFileURL(c).href : c);
      return (m.default ?? m).chromium.launch();
    } catch {}
  }
  throw new Error("Playwright not found. Set PLAYWRIGHT_MODULE=/path/to/node_modules/playwright/index.js");
}

/* A context in the given theme. The theme comes from the system setting
   (prefers-color-scheme), which is what the inline script in index.html
   reads when the visitor has not picked one. */
export async function newContext(browser, { theme = "light", ...opts } = {}) {
  return browser.newContext({ colorScheme: theme, ...opts });
}

/* Scroll through the page so every <Reveal> section becomes visible.
   Instant scrolling: smooth scroll skips the IntersectionObserver triggers. */
export async function scrollThrough(page, step = 300) {
  await page.evaluate(async (step) => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, step);
  await page.waitForTimeout(800);
}

/* Strings that must never appear in the built files or on the page. They are
   derived from the character codes in src/data/contact.ts, so the real
   address is never written in plain text in the repo. */
export function contactNeedles() {
  const src = readFileSync(join(ROOT, "src/data/contact.ts"), "utf8");
  const m = src.match(/EMAIL_CODES\s*=\s*\[([\d,\s]+)\]/);
  if (!m) throw new Error("EMAIL_CODES not found in src/data/contact.ts");
  const email = String.fromCharCode(...m[1].split(",").map(Number));
  return [email, email.split("@")[0]];
}
