/* Accessibility scan with axe-core (WCAG 2.2 A/AA rules plus axe's best
   practices) at 375 and 1440 px, and once more with the contact form
   showing its error messages. Exits 1 on any violation.
   (axe finds what a machine can find; keyboard, focus and screen-reader
   checks still need a person — see main.mjs for focus and contrast.) */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { BASE, launch, log, newContext } from "./_lib.mjs";

const AXE = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const b = await launch();
let failed = 0;

async function scan(label, { width, before } = {}) {
  /* Reduced motion, so axe sees the page as it settles: with motion on, a
     block entering the first screen is still fading in (the scroll reveal)
     and its text fails contrast mid-animation. */
  const ctx = await newContext(b, { viewport: { width, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  if (before) await before(p);
  await p.addScriptTag({ content: AXE });
  const r = await p.evaluate((tags) => window.axe.run(document, { runOnly: { type: "tag", values: tags }, resultTypes: ["violations", "incomplete"] }), TAGS);
  log(`${label}: ${r.violations.length} violation(s), ${r.incomplete.length} to review by hand`);
  for (const v of r.violations) {
    failed++;
    log(`  FAIL ${v.id} (${v.impact}): ${v.help}`);
    for (const n of v.nodes.slice(0, 5)) log(`       ${n.target.join(" ")}`);
  }
  for (const v of r.incomplete) log(`  review ${v.id}: ${v.nodes.length} element(s) — ${v.help}`);
  await ctx.close();
}

await scan("1440 px", { width: 1440 });
await scan("375 px", { width: 375 });
await scan("1440 px, form errors shown", {
  width: 1440,
  before: (p) => p.click('.contact__form button[type="submit"]'),
});

await b.close();
log(failed ? `\n${failed} violation(s)` : "\nno violations");
process.exit(failed ? 1 : 0);
