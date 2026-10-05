// Prerenders the React app into the four built HTML pages, so every
// page ships its real content (not an empty <div id="root">).
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx`.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Final public origin of the site — used in canonical, hreflang,
// og:url/og:image, JSON-LD, sitemap.xml and robots.txt.
const SITE_URL = "https://mihailobuilds.com";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, themeColor } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const PAGES = [
  { file: "index.html", locale: "en", page: "home" },
  { file: "sr/index.html", locale: "sr", page: "home" },
  { file: "privacy/index.html", locale: "en", page: "privacy" },
  { file: "sr/privatnost/index.html", locale: "sr", page: "privacy" },
];

for (const p of PAGES) {
  const file = path.join(dist, p.file);
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("<!--app-html-->")) throw new Error(`Missing <!--app-html--> in ${p.file}`);
  const out = html
    .replace("<!--app-html-->", render(p.locale, p.page))
    .replaceAll("__SITE_URL__", SITE_URL)
    .replaceAll("__THEME_COLOR__", themeColor);
  fs.writeFileSync(file, out);
}

for (const f of ["sitemap.xml", "robots.txt"]) {
  const file = path.join(dist, f);
  fs.writeFileSync(file, fs.readFileSync(file, "utf8").replaceAll("__SITE_URL__", SITE_URL));
}

fs.rmSync(ssrDir, { recursive: true, force: true });

// Placeholders ([[…]]) must be filled before production. Warn, but don't
// fail — preview deployments should keep working in the meantime.
const leftovers = [];
for (const p of PAGES) {
  const matches = fs.readFileSync(path.join(dist, p.file), "utf8").match(/\[\[[^\]]*\]\]/g) ?? [];
  if (matches.length) leftovers.push(`  ${p.file}: ${[...new Set(matches)].join(", ")}`);
}
console.log(`prerendered ${PAGES.length} pages`);
if (leftovers.length) {
  console.warn("\n⚠ Placeholders left — fill these in before production:\n" + leftovers.join("\n") + "\n");
}
