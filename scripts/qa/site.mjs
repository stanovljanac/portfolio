/* Site behaviour:
   - without JavaScript every section is visible (prerendered, no hidden reveals)
   - with reduced motion, reveals show without scrolling
   - keyboard: the skip link comes first and moves focus to the content
   - every in-page anchor has a target; opening /#section directly (and
     reloading) lands on that section below the fixed nav
   - every external link answers 2xx (HEAD, GET as a fallback): the
     regression check from the case study on the site
   - "Download CV" serves a PDF with the right file name, or reports the placeholder
   - the QA experience label matches the build date
   Prints FAIL lines and exits 1 when a check fails. */
import { BASE, log, launch, newContext, ROOT } from "./_lib.mjs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const { experienceLabel } = await import(pathToFileURL(join(ROOT, "src/lib/experience.ts")).href);
const b = await launch();
let failed = 0;
const fail = (msg) => {
  failed++;
  log("FAIL", msg);
};

log("--- no JavaScript");
{
  const ctx = await newContext(b, { javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(BASE + "/");
  const r = await p.evaluate(() => ({
    sections: [...document.querySelectorAll("main section[id]")].map((s) => s.id),
    hidden: [...document.querySelectorAll(".reveal")].filter((e) => getComputedStyle(e).opacity !== "1").length,
    h1: document.querySelector("h1")?.textContent,
  }));
  log(`sections: ${r.sections.join(", ")} | hidden reveals: ${r.hidden} | h1: ${r.h1}`);
  if (r.sections.length < 6 || r.hidden || !r.h1) fail("no-JS page incomplete");
  await ctx.close();
}

log("\n--- reduced motion");
{
  const ctx = await newContext(b, { reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const hidden = await p.evaluate(() => [...document.querySelectorAll(".reveal")].filter((e) => getComputedStyle(e).opacity !== "1").length);
  log("reveals not visible without scrolling:", hidden);
  if (hidden) fail("reduced motion");
  await ctx.close();
}

log("\n--- keyboard: skip link");
{
  const ctx = await newContext(b);
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.keyboard.press("Tab");
  const first = await p.evaluate(() => document.activeElement.textContent.trim());
  await p.keyboard.press("Enter");
  await p.keyboard.press("Tab");
  const next = await p.evaluate(() => !!document.activeElement.closest("main"));
  log(`first tab: "${first}" | next tab inside <main>: ${next}`);
  if (first !== "Skip to content" || !next) fail("skip link");
  await ctx.close();
}

log("\n--- anchors");
{
  const ctx = await newContext(b, { viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const missing = await p.evaluate(() =>
    [...new Set([...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute("href")))].filter((h) => !document.getElementById(h.slice(1))),
  );
  log("in-page links without a target:", missing.length ? missing.join(", ") : "none");
  if (missing.length) fail("anchors without target");
  await ctx.close();
  /* A fresh tab per anchor: opening the URL directly, not a jump within the page. */
  for (const id of ["about", "projects", "qa", "contact"]) {
    const c = await newContext(b, { viewport: { width: 1440, height: 900 } });
    const t = await c.newPage();
    const top = async () => {
      await t.evaluate(() => document.fonts.ready);
      await t.waitForTimeout(800);
      return t.evaluate((id) => Math.round(document.getElementById(id).getBoundingClientRect().top), id);
    };
    await t.goto(`${BASE}/#${id}`, { waitUntil: "networkidle" });
    const top1 = await top();
    await t.reload({ waitUntil: "networkidle" });
    const top2 = await top();
    const ok = [top1, top2].every((v) => v >= 60 && v <= 90);
    log(`/#${id}: section top ${top1}px, after reload ${top2}px`, ok ? "ok" : "WRONG");
    if (!ok) fail(`anchor #${id}`);
    await c.close();
  }
}

log("\n--- external links answer 2xx");
{
  const ctx = await newContext(b);
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const links = await p.evaluate(() =>
    [...new Set([...document.querySelectorAll("a[href^='http']")].map((a) => a.href))],
  );
  for (const url of links) {
    let status = 0;
    for (const method of ["HEAD", "GET"]) {
      try {
        status = (await fetch(url, { method, redirect: "follow", signal: AbortSignal.timeout(15000) })).status;
      } catch (e) {
        status = `${e.cause?.code ?? e.name}`;
      }
      if (typeof status === "number" && status < 300) break;
    }
    const ok = typeof status === "number" && status >= 200 && status < 300;
    log(String(status).padEnd(4), url);
    if (!ok) fail(`link ${url} → ${status}`);
  }
  const blank = await p.evaluate(() =>
    [...document.querySelectorAll("a[target='_blank']")].filter((a) => !/noopener/.test(a.rel)).map((a) => a.href),
  );
  if (blank.length) fail(`target=_blank without noopener: ${blank.join(", ")}`);
  await ctx.close();
}

log("\n--- Download CV");
{
  const ctx = await newContext(b);
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const a = await p.evaluate(() => {
    const el = document.querySelector("a[download]");
    return { href: el.getAttribute("href"), name: el.getAttribute("download"), label: el.textContent };
  });
  const res = await fetch(BASE + a.href);
  const type = res.headers.get("content-type") ?? "";
  if (/\[\[cv-pdf\]\]/.test(a.label)) {
    log(`${a.href}: no PDF yet (placeholder [[cv-pdf]] shown; HTTP ${res.status})`);
  } else {
    const ok = res.status === 200 && type.startsWith("application/pdf") && a.name === "Mihailo-Sebek-CV.pdf";
    log(`${a.href}: HTTP ${res.status}, ${type}, download="${a.name}"`, ok ? "ok" : "WRONG");
    if (!ok) fail("CV download");
  }
  await ctx.close();
}

log("\n--- QA experience label");
{
  const ctx = await newContext(b);
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const shown = await p.evaluate(() => document.querySelector(".qa-role__since").textContent.trim());
  const expected = experienceLabel("2025-03", new Date());
  const ok = shown.endsWith(expected);
  log(`shown "${shown}" | expected today: "${expected}"`, ok ? "ok" : "WRONG (rebuild?)");
  if (!ok) fail("experience label");
  await ctx.close();
}

await b.close();
log(failed ? `\n${failed} check(s) failed` : "\nall checks passed");
process.exit(failed ? 1 : 0);
