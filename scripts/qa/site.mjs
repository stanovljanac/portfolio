/* Site behaviour:
   - without JavaScript every section is there (prerendered)
   - keyboard: the skip link comes first and moves focus to the content
   - every in-page anchor has a target; opening /#section directly (and
     reloading) lands on that section below the fixed nav
   - every external link answers 2xx (HEAD, GET as a fallback); LinkedIn
     answers 999 to every script, so it is only reported
   - "Download CV" serves a PDF with the right file name, or reports the placeholder
   - the QA experience label matches the build date
   - files that do not exist are a 404, not the page (llms.txt does exist)
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
    sections: [...document.querySelectorAll("main section[id]")].map((s) => s.id).join(", "),
    h1: document.querySelector("h1")?.textContent,
  }));
  log(`sections: ${r.sections} | h1: ${r.h1}`);
  if (r.sections !== "top, projects, about, experience, contact" || !r.h1) fail("no-JS page incomplete");
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
  for (const id of ["top", "projects", "about", "experience", "contact"]) {
    const c = await newContext(b, { viewport: { width: 1440, height: 900 } });
    const t = await c.newPage();
    const top = async () => {
      await t.evaluate(() => document.fonts.ready);
      await t.waitForTimeout(800);
      return t.evaluate((id) => ({
        v: Math.round(document.getElementById(id).getBoundingClientRect().top),
        atEnd: scrollY + innerHeight >= document.documentElement.scrollHeight - 1,
      }), id);
    };
    await t.goto(`${BASE}/#${id}`, { waitUntil: "networkidle" });
    const top1 = await top();
    await t.reload({ waitUntil: "networkidle" });
    const top2 = await top();
    /* The hero is the first screen: the page stays at the top. The others sit
       just below the 68px nav, unless the page is scrolled to its end and
       cannot bring the section any higher (the contact section). */
    const ok = [top1, top2].every(({ v, atEnd }) => (id === "top" ? v === 0 : (v >= 60 && v <= 90) || (atEnd && v > 60)));
    const show = ({ v, atEnd }) => `${v}px${atEnd ? " (page end)" : ""}`;
    log(`/#${id}: section top ${show(top1)}, after reload ${show(top2)}`, ok ? "ok" : "WRONG");
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
    const bot = status === 999 && new URL(url).hostname.endsWith("linkedin.com");
    log(String(status).padEnd(4), url, bot ? "(LinkedIn blocks scripts; check it in a browser)" : "");
    if (!ok && !bot) fail(`link ${url} → ${status}`);
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
  const shown = await p.evaluate(() => document.querySelector(".timeline__length").textContent.trim());
  const expected = experienceLabel("2025-03", new Date());
  const ok = shown === `(${expected})`;
  log(`shown "${shown}" | expected today: "${expected}"`, ok ? "ok" : "WRONG (rebuild?)");
  if (!ok) fail("experience label");
  await ctx.close();
}

log("\n--- missing files are a 404");
for (const [path, want] of [["/llms.txt", 200], ["/.well-known/ai-catalog.json", 404], ["/no-such-page", 404]]) {
  const res = await fetch(BASE + path);
  const type = res.headers.get("content-type") ?? "";
  const ok = res.status === want && !(want === 200 && type.includes("html"));
  log(`${path}: HTTP ${res.status} ${type}`, ok ? "ok" : `WRONG (want ${want})`);
  if (!ok) fail(path);
}

await b.close();
log(failed ? `\n${failed} check(s) failed` : "\nall checks passed");
process.exit(failed ? 1 : 0);
