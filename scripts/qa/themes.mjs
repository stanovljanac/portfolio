/* Main QA pass, run for both themes:
   - CLS, horizontal overflow and console errors at 320 / 375 / 1440 px
   - geometry: Kobalt and Industrial must share DOM, section order and grid columns
   - theme determinism: the URL decides, and internal links keep ?theme=industrial
   - contact data never visible; real addresses only after a click
   - lowest text contrast and visible keyboard focus */
import { BASE, THEMES, contactNeedles, launch, log, newContext, scrollThrough } from "./_lib.mjs";

const b = await launch();
const needles = contactNeedles();
const GRIDS = [".audience", ".work-grid", ".svc-grid", ".svc-details", ".steps", ".split", ".about", ".faq", ".contact", ".contact__row", ".footer__inner", ".hero__grid"];
const geo = {};

for (const path of ["/", "/sr/"]) for (const w of [320, 375, 1440]) for (const [theme, q] of Object.entries(THEMES)) {
  const ctx = await newContext(b, { viewport: { width: w, height: 800 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource|_vercel/.test(m.text())) errs.push(m.text().slice(0, 120)); });
  page.on("pageerror", (e) => errs.push(e.message));
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
    document.addEventListener("DOMContentLoaded", () => { window.__classAtDCL = document.documentElement.className; });
  });
  await page.goto(BASE + path + q, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await scrollThrough(page);
  const info = await page.evaluate((GRIDS) => ({
    cls: window.__cls, classAtDCL: window.__classAtDCL,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    sections: [...document.querySelectorAll("main > section, main > article")].map((s) => (s.id || s.className.split(" ")[0]) + ":" + Math.round(s.getBoundingClientRect().height)),
    dom: [...document.querySelectorAll("main *")].map((e) => e.tagName).join(",").length,
    cols: GRIDS.map((sel) => { const e = document.querySelector(sel); if (!e) return sel + ":-"; const cs = getComputedStyle(e); return sel + ":" + (cs.display.includes("grid") ? cs.gridTemplateColumns.split(" ").length : cs.flexDirection); }),
  }), GRIDS);
  geo[path + w + theme] = info;
  log(path, w, theme.padEnd(10), "class@DCL=" + info.classAtDCL, "CLS=" + info.cls.toFixed(4), "overflow=" + info.overflow, errs.length ? "ERR " + errs : "console clean");
  await ctx.close();
}

log("\n--- geometry: kobalt vs industrial");
for (const path of ["/", "/sr/"]) for (const w of [320, 375, 1440]) {
  const k = geo[path + w + "kobalt"], i = geo[path + w + "industrial"];
  const order = k.sections.map((s) => s.split(":")[0]).join() === i.sections.map((s) => s.split(":")[0]).join();
  const cols = JSON.stringify(k.cols) === JSON.stringify(i.cols);
  const diffs = k.sections.map((s, n) => {
    const hk = +s.split(":")[1], hi = +i.sections[n].split(":")[1], d = (hi - hk) / hk;
    return Math.abs(d) > 0.15 ? `${s.split(":")[0]} ${hk}→${hi} (${(d * 100).toFixed(0)}%)` : null;
  }).filter(Boolean);
  log(path, w, "same order:", order, "| same columns:", cols, cols ? "" : JSON.stringify([k.cols, i.cols]), "| same DOM:", k.dom === i.dom, "| height diffs >15%:", diffs.length ? diffs.join("; ") : "none");
}

log("\n--- theme determinism + link propagation");
{
  const ctx = await newContext(b);
  const cls = (p) => p.evaluate(() => document.documentElement.className);
  const t1 = await ctx.newPage(); await t1.goto(BASE + "/?theme=industrial");
  const t2 = await ctx.newPage(); await t2.goto(BASE + "/");
  log("tab1 industrial:", await cls(t1), "| tab2 '/':", await cls(t2));
  await t1.click(".nav .lang-switch__opt:not(.is-active)"); await t1.waitForLoadState();
  log("industrial → SR:", t1.url(), await cls(t1));
  await t1.click(".footer__links a[href*='privat']"); await t1.waitForLoadState();
  log("industrial → privacy:", t1.url(), await cls(t1));
  await t1.click(".nav__logo"); await t1.waitForLoadState();
  log("industrial → logo:", t1.url(), await cls(t1));
  await t2.click(".nav .lang-switch__opt:not(.is-active)"); await t2.waitForLoadState();
  log("kobalt → SR:", t2.url(), await cls(t2));
  await ctx.close();
}

log("\n--- contact details not visible (text + hrefs)");
for (const [theme, q] of Object.entries(THEMES)) for (const path of ["/", "/sr/", "/privacy/", "/sr/privatnost/"]) {
  const ctx = await newContext(b); const p = await ctx.newPage();
  await p.goto(BASE + path + q, { waitUntil: "networkidle" });
  const hit = await p.evaluate((needles) => {
    const t = document.body.innerText + " " + [...document.querySelectorAll("a")].map((a) => a.getAttribute("href")).join(" ");
    return needles.map((n, i) => (t.includes(n) ? "#" + (i + 1) : null)).filter(Boolean);
  }, needles);
  log(theme.padEnd(10), path, hit.length ? "LEAK needles " + hit : "clean");
  await ctx.close();
}
{
  /* The handler swaps the href synchronously on click, but read it only once
     it has changed (or after 2 s), so a slow hydration cannot fake a failure. */
  const clickReveal = async (loc) => {
    await loc.click({ noWaitAfter: true }).catch(() => {});
    await loc.evaluate((a) => new Promise((done) => {
      const t0 = Date.now();
      (function poll() { if (!a.getAttribute("href").startsWith("/") || Date.now() - t0 > 2000) done(); else setTimeout(poll, 50); })();
    })).catch(() => {});
    return loc.getAttribute("href");
  };
  const ctx = await newContext(b);
  const expect = [["mailto:", needles[0]], ["viber://", needles[2]], ["https://wa.me/", needles[2]]];
  const out = [];
  for (let n = 0; n < 3; n++) {
    const p = await ctx.newPage(); // fresh page per link: an app-protocol click can disturb the page
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    const pop = n === 2 ? ctx.waitForEvent("page", { timeout: 3000 }).catch(() => null) : null;
    const href = await clickReveal(p.locator(".contact__channels a").nth(n));
    const pg = pop ? await pop : null; if (pg) await pg.close();
    out.push(`${expect[n][0]} ${href.startsWith(expect[n][0]) && href.includes(expect[n][1]) ? "ok" : "WRONG"}`);
    await p.close();
  }
  log("hrefs after click:", out.join(" | "));
  const p = await ctx.newPage();
  await p.goto(BASE + "/privacy/", { waitUntil: "networkidle" });
  const pl = p.locator(".legal a", { hasText: "by email" }).first();
  const before = await pl.getAttribute("href");
  const after = await clickReveal(pl);
  log("privacy 'by email' link: before", before, "| after click", after.startsWith("mailto:") && after.includes(needles[0]) ? "mailto ok" : "WRONG " + after.slice(0, 12));
  await ctx.close();
}

log("\n--- contrast (lowest ratios of small text) + focus");
for (const [theme, q] of Object.entries(THEMES)) {
  const ctx = await newContext(b, { viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  await p.goto(BASE + "/" + q, { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible")));
  const res = await p.evaluate(() => {
    const lum = (c) => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(Number).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
    const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; const a = c.match(/[\d.]+/g); if (a && (a.length < 4 || +a[3] > 0.5)) return c; } return "rgb(255,255,255)"; };
    const sels = [".eyebrow", ".section__lede", ".work-card__label", ".work-card__desc", ".svc-note", ".steps__note", ".split__note", ".contact__privacy", ".contact__channels small", ".audience__text", ".audience__num", ".footer__links a", ".footer__meta span", ".footer__heading", ".footer__offer", ".footer__bottom span", ".nav__link", ".lang-switch__opt:not(.is-active)", ".offer__note", ".offer__text", ".offer .eyebrow", ".svc-card__price", ".step__num", ".hero__lede"];
    const worst = {};
    for (const s of sels) for (const el of document.querySelectorAll(s)) {
      if (!el.getClientRects().length) continue; // hidden in this theme (display: none)
      const L1 = lum(getComputedStyle(el).color), L2 = lum(bgOf(el));
      worst[s] = Math.min(worst[s] ?? 99, (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05));
    }
    return Object.entries(worst).sort((a, b) => a[1] - b[1]).slice(0, 6).map(([s, r]) => s + " " + r.toFixed(2));
  });
  const focus = [];
  for (let n = 0; n < 12; n++) {
    await p.keyboard.press("Tab");
    focus.push(await p.evaluate(() => { const e = document.activeElement; const c = e.closest(".work-card"); return getComputedStyle(e).outlineStyle !== "none" || (c && getComputedStyle(c).outlineStyle !== "none"); }));
  }
  log(theme.padEnd(10), "lowest contrast:", res.join(" | "), "| focus visible on first 12 tabs:", focus.every(Boolean) ? "yes" : JSON.stringify(focus));
  await ctx.close();
}
await b.close();
