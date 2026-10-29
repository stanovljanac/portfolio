// Prerenders the React app into the built index.html, so the page ships its
// real content (not an empty <div id="root">), then fills in the site URL
// and the JSON-LD, and checks for leftover [[…]] placeholders.
// Runs after `vite build` and `vite build --ssr src/entry-server.tsx`.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { findPlaceholders, isStrict } from "./placeholders.mjs";

// Final public origin of the site — used in canonical, og:url/og:image,
// JSON-LD, sitemap.xml and robots.txt.
const SITE_URL = "https://mihailobuilds.com";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, personJsonLd } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const page = path.join(dist, "index.html");
const html = fs.readFileSync(page, "utf8");
for (const marker of ["<!--app-html-->", "<!--json-ld-->"]) {
  if (!html.includes(marker)) throw new Error(`Missing ${marker} in index.html`);
}
fs.writeFileSync(
  page,
  html
    .replace("<!--app-html-->", render())
    .replace("<!--json-ld-->", `<script type="application/ld+json">${personJsonLd(SITE_URL)}</script>`)
    .replaceAll("__SITE_URL__", SITE_URL),
);

for (const f of ["sitemap.xml", "robots.txt"]) {
  const file = path.join(dist, f);
  fs.writeFileSync(file, fs.readFileSync(file, "utf8").replaceAll("__SITE_URL__", SITE_URL));
}

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log("prerendered index.html");

const leftovers = [];
for (const f of ["index.html", "sitemap.xml", "robots.txt"]) {
  const found = findPlaceholders(fs.readFileSync(path.join(dist, f), "utf8"));
  if (found.length) leftovers.push(`  ${f}: ${found.join(", ")}`);
}
if (leftovers.length) {
  const msg = "Placeholders left — fill these in before production:\n" + leftovers.join("\n");
  if (isStrict(process.env)) {
    console.error(`\n✖ ${msg}\n`);
    process.exit(1);
  }
  console.warn(`\n⚠ ${msg}\n`);
}
