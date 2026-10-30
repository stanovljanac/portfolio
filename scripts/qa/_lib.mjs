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

/* A browser context. The site has one (dark) theme; the context asks for a
   dark system setting too, as most visitors of a dark page would. */
export async function newContext(browser, opts = {}) {
  return browser.newContext({ colorScheme: "dark", ...opts });
}

/* Scroll through the page, so lazy images load before a screenshot.
   Instant scrolling, so it does not depend on smooth scroll. */
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

/* Strings that must never appear in the built files or on the page: the
   email address, its local part, and the phone number (whole, and without
   the country code). They are derived from the character codes in
   src/data/contact.ts, so neither is ever written in plain text in the repo. */
export function contactNeedles() {
  const src = readFileSync(join(ROOT, "src/data/contact.ts"), "utf8");
  const codes = (name) => {
    const m = src.match(new RegExp(`${name}\\s*=\\s*\\[([\\d,\\s]+)\\]`));
    if (!m) throw new Error(`${name} not found in src/data/contact.ts`);
    return String.fromCharCode(...m[1].split(",").map(Number));
  };
  const email = codes("EMAIL_CODES");
  const phone = codes("PHONE_CODES");
  return [email, email.split("@")[0], phone, phone.slice(3)];
}

/* My Instagram handle is the same as the email's local part. The handle is
   public on Instagram anyway, so the profile link is allowed: remove it
   before looking for the needles. Anywhere else, the local part still counts. */
export const withoutProfileLinks = (text) => text.replace(/instagram\.com\/[\w.]+/g, "");
