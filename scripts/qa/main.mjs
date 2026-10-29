/* Main QA pass, in both themes:
   - CLS, horizontal overflow, console errors and external requests at 320 / 375 / 1440 px
   - the theme is set before the first paint (no flash), from the system
     setting or the stored choice; the switch flips it, remembers it, and
     updates aria-pressed and <meta name="theme-color">
   - the nav fits the viewport from 320 to 1280 px
   - the email address is never visible; the real address appears only after a click
   - lowest contrast of small text, and visible keyboard focus
   Prints FAIL lines and exits 1 when a check fails. */
import { BASE, THEMES, contactNeedles, launch, log, newContext, scrollThrough } from "./_lib.mjs";

const b = await launch();
const needles = contactNeedles();
const ALLOWED_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
let failed = 0;
const fail = (msg) => {
  failed++;
  log("FAIL", msg);
};

log("--- CLS, overflow, console, external requests");
for (const theme of THEMES) for (const w of [320, 375, 1440]) {
  const ctx = await newContext(b, { theme, viewport: { width: w, height: 800 } });
  const page = await ctx.newPage();
  const errs = [], external = [];
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource|_vercel/.test(m.text())) errs.push(m.text().slice(0, 120)); });
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("request", (r) => { const u = new URL(r.url()); if (!r.url().startsWith(BASE) && u.protocol !== "data:") external.push(u.host); });
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await scrollThrough(page);
  /* .page clips horizontal overflow, so a scrollbar never shows it: also look
     for elements reaching past the viewport (the fanned hero frames are meant to). */
  const info = await page.evaluate(() => ({
    cls: window.__cls,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    outside: [...document.querySelectorAll("main *, footer *")]
      .filter((e) => e.getClientRects().length && !e.closest(".hero__shots"))
      .filter((e) => { const r = e.getBoundingClientRect(); return r.right > innerWidth + 0.5 || r.left < -0.5; })
      .map((e) => e.tagName.toLowerCase() + "." + String(e.className?.baseVal ?? e.className).split(" ")[0]),
  }));
  const other = [...new Set(external)].filter((h) => !ALLOWED_HOSTS.includes(h));
  log(theme.padEnd(6), String(w).padEnd(5), "CLS=" + info.cls.toFixed(4), "overflow=" + info.overflow, "outside=" + info.outside.length, errs.length ? "ERR " + errs : "console clean", "| other hosts:", other.length ? other.join(", ") : "none");
  if (info.cls >= 0.05) fail(`${theme} ${w}: CLS ${info.cls.toFixed(4)}`);
  if (info.overflow) fail(`${theme} ${w}: horizontal overflow`);
  if (info.outside.length) fail(`${theme} ${w}: past the viewport: ${info.outside.slice(0, 4).join(", ")}`);
  if (errs.length) fail(`${theme} ${w}: console errors`);
  if (other.length) fail(`${theme} ${w}: requests to ${other.join(", ")}`);
  await ctx.close();
}

log("\n--- theme: set before the first paint, switch, persistence");
{
  /* data-theme when <body> is first created, i.e. before anything is painted. */
  const atBody = () => {
    new MutationObserver((_, obs) => {
      if (document.body) { window.__themeAtBody = document.documentElement.dataset.theme; obs.disconnect(); }
    }).observe(document, { childList: true, subtree: true });
  };
  const cases = [
    { scheme: "light", stored: null, expect: "light" },
    { scheme: "dark", stored: null, expect: "dark" },
    { scheme: "light", stored: "dark", expect: "dark" },
    { scheme: "dark", stored: "light", expect: "light" },
  ];
  for (const c of cases) {
    const ctx = await newContext(b, { theme: c.scheme });
    if (c.stored) await ctx.addInitScript((t) => { try { if (!sessionStorage.getItem("seeded")) { localStorage.setItem("theme", t); sessionStorage.setItem("seeded", "1"); } } catch {} }, c.stored);
    await ctx.addInitScript(atBody);
    const p = await ctx.newPage();
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    const got = await p.evaluate(() => ({
      body: window.__themeAtBody, now: document.documentElement.dataset.theme,
      meta: document.querySelector('meta[name="theme-color"]').content, bg: getComputedStyle(document.body).backgroundColor,
      pressed: document.querySelector(".theme-toggle").getAttribute("aria-pressed"),
    }));
    const ok = got.body === c.expect && got.now === c.expect && got.pressed === String(c.expect === "dark");
    log(`system ${c.scheme}, stored ${c.stored ?? "none"} → at first paint: ${got.body}, after hydration: ${got.now}, aria-pressed=${got.pressed}, theme-color ${got.meta}, body ${got.bg}`, ok ? "ok" : "WRONG");
    if (!ok) fail(`theme ${JSON.stringify(c)}`);
    await ctx.close();
  }
  const ctx = await newContext(b, { theme: "light" });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.click(".theme-toggle");
  const after = await p.evaluate(() => ({ t: document.documentElement.dataset.theme, s: localStorage.getItem("theme"), m: document.querySelector('meta[name="theme-color"]').content, a: document.querySelector(".theme-toggle").getAttribute("aria-pressed") }));
  await p.reload({ waitUntil: "networkidle" });
  const reloaded = await p.evaluate(() => document.documentElement.dataset.theme);
  const ok = after.t === "dark" && after.s === "dark" && after.m === "#070B16" && after.a === "true" && reloaded === "dark";
  log(`switch: ${JSON.stringify(after)} | after reload: ${reloaded}`, ok ? "ok" : "WRONG");
  if (!ok) fail("theme switch");
  await ctx.close();
}

/* .page clips horizontal overflow, so an item pushed off screen would not
   show up as a scrollbar: check every nav element is inside the viewport. */
log("\n--- nav fits the viewport (320–1280 px)");
{
  const bad = [];
  for (const w of [320, 360, 390, 400, 401, 430, 600, 640, 768, 900, 901, 1024, 1280]) {
    const ctx = await newContext(b, { viewport: { width: w, height: 800 } });
    const p = await ctx.newPage();
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    const [out, wrapped] = await p.evaluate(() => {
      const els = [...document.querySelectorAll(".nav *")].filter((e) => e.getClientRects().length);
      /* Text on more than one line: compare the line tops of the text nodes only (not icons). */
      const lineTops = (el) => {
        const tops = new Set();
        const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n = walk.nextNode(); n; n = walk.nextNode()) {
          if (!n.textContent.trim() || !n.parentElement.getClientRects().length) continue;
          const r = document.createRange(); r.selectNodeContents(n);
          for (const x of r.getClientRects()) tops.add(Math.round(x.top));
        }
        return tops.size;
      };
      const wrapped = [...document.querySelectorAll(".nav a, .nav button")].filter((a) => a.getClientRects().length && lineTops(a) > 1).map((a) => a.textContent.trim());
      return [Math.max(0, ...els.map((e) => { const r = e.getBoundingClientRect(); return Math.max(r.right - innerWidth, -r.left); })), wrapped];
    });
    if (out > 0.5) bad.push(`${w}px: ${Math.round(out)}px outside`);
    if (wrapped.length) bad.push(`${w}px: wraps ${wrapped.join(", ")}`);
    await ctx.close();
  }
  log(bad.length ? "CLIPPED " + bad.join("; ") : "ok");
  if (bad.length) fail("nav");
}

log("\n--- email never visible; real address only after a click");
{
  const ctx = await newContext(b);
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const hit = await p.evaluate((needles) => {
    const t = document.body.innerText + " " + [...document.querySelectorAll("a")].map((a) => a.getAttribute("href")).join(" ");
    return needles.map((n, i) => (t.includes(n) ? "#" + (i + 1) : null)).filter(Boolean);
  }, needles);
  log("page text + hrefs:", hit.length ? "LEAK needles " + hit : "clean");
  if (hit.length) fail("email visible");
  const link = p.locator(".channel").first();
  const before = await link.getAttribute("href");
  await link.click({ noWaitAfter: true }).catch(() => {});
  const after = await link.getAttribute("href");
  const ok = before === "#contact" && after.startsWith("mailto:") && after.includes(needles[0]);
  log(`email link: before ${before} | after click ${ok ? "mailto ok" : "WRONG " + after.slice(0, 12)}`);
  if (!ok) fail("email link");
  await ctx.close();
}

log("\n--- contrast (lowest ratios of small text) + focus");
for (const theme of THEMES) {
  const ctx = await newContext(b, { theme, viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible")));
  await p.waitForTimeout(900);
  const res = await p.evaluate(() => {
    const rgba = (c) => c.match(/[\d.]+/g).map(Number);
    const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    /* Background: composite translucent layers up to the first opaque one. */
    const bgOf = (el) => {
      const layers = [];
      for (let e = el; e; e = e.parentElement) {
        const a = rgba(getComputedStyle(e).backgroundColor);
        if (a.length === 4 && a[3] === 0) continue;
        layers.push(a);
        if (a.length < 4 || a[3] === 1) break;
      }
      let c = [255, 255, 255];
      for (const l of layers.reverse()) { const al = l.length < 4 ? 1 : l[3]; c = c.map((v, i) => l[i] * al + v * (1 - al)); }
      return c;
    };
    const small = [...document.querySelectorAll("body *")].filter((el) => {
      if (!el.getClientRects().length || !el.childNodes.length) return false;
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return false;
      if (el.closest("[aria-hidden='true']")) return false;
      return parseFloat(getComputedStyle(el).fontSize) < 18.66;
    });
    const worst = {};
    for (const el of small) {
      const ratio = ((a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05))(lum(rgba(getComputedStyle(el).color)), lum(bgOf(el)));
      const key = el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.split(" ")[0] : "");
      worst[key] = Math.min(worst[key] ?? 99, ratio);
    }
    return Object.entries(worst).sort((a, b) => a[1] - b[1]).slice(0, 5).map(([s, r]) => [s, +r.toFixed(2)]);
  });
  const focus = [];
  for (let n = 0; n < 16; n++) {
    await p.keyboard.press("Tab");
    focus.push(await p.evaluate(() => {
      const e = document.activeElement;
      const card = e.closest(".proj-card");
      return getComputedStyle(e).outlineStyle !== "none" || (card && getComputedStyle(card).outlineStyle !== "none");
    }));
  }
  log(theme.padEnd(6), "lowest contrast:", res.map(([s, r]) => `${s} ${r}`).join(" | "), "| focus visible on first 16 tabs:", focus.every(Boolean) ? "yes" : JSON.stringify(focus));
  if (res[0][1] < 4.5) fail(`${theme}: contrast ${res[0][0]} ${res[0][1]}`);
  if (!focus.every(Boolean)) fail(`${theme}: focus not visible`);
  await ctx.close();
}

await b.close();
log(failed ? `\n${failed} check(s) failed` : "\nall checks passed");
process.exit(failed ? 1 : 0);
