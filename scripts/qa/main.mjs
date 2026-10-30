/* Main QA pass:
   - CLS, horizontal overflow, console errors, Chrome DevTools issues and
     external requests at 320 / 375 / 1440 px
   - the nav fits the viewport from 320 to 1280 px
   - no email address or phone number is visible; the real address or number
     appears only after a click, on Email, Viber and WhatsApp
   - lowest contrast of small text, and visible keyboard focus
   Prints FAIL lines and exits 1 when a check fails. */
import { BASE, contactNeedles, launch, log, newContext, scrollThrough, withoutProfileLinks } from "./_lib.mjs";

const b = await launch();
const needles = contactNeedles();
const ALLOWED_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
let failed = 0;
const fail = (msg) => {
  failed++;
  log("FAIL", msg);
};

log("--- CLS, overflow, console, DevTools issues, external requests");
for (const w of [320, 375, 1440]) {
  const ctx = await newContext(b, { viewport: { width: w, height: 800 } });
  const page = await ctx.newPage();
  const errs = [], external = [], issues = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 120)); });
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("requestfailed", (r) => errs.push(`request failed: ${r.url()}`));
  page.on("response", (r) => { if (r.status() >= 400) errs.push(`HTTP ${r.status()}: ${r.url()}`); });
  page.on("request", (r) => { const u = new URL(r.url()); if (!r.url().startsWith(BASE) && u.protocol !== "data:") external.push(u.host); });
  /* What the Issues panel in DevTools shows (Lighthouse counts these too). */
  const cdp = await ctx.newCDPSession(page);
  cdp.on("Audits.issueAdded", ({ issue }) => issues.push(issue.code));
  await cdp.send("Audits.enable");
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await scrollThrough(page);
  /* .page clips horizontal overflow, so a scrollbar never shows it: also look
     for elements reaching past the viewport. */
  const info = await page.evaluate(() => ({
    cls: window.__cls,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    outside: [...document.querySelectorAll("main *, footer *")]
      .filter((e) => e.getClientRects().length)
      .filter((e) => { const r = e.getBoundingClientRect(); return r.right > innerWidth + 0.5 || r.left < -0.5; })
      .map((e) => e.tagName.toLowerCase() + "." + String(e.className?.baseVal ?? e.className).split(" ")[0]),
  }));
  const other = [...new Set(external)].filter((h) => !ALLOWED_HOSTS.includes(h));
  log(String(w).padEnd(5), "CLS=" + info.cls.toFixed(4), "overflow=" + info.overflow, "outside=" + info.outside.length, errs.length ? "ERR " + errs : "console clean", "| issues:", issues.length ? issues.join(", ") : "none", "| other hosts:", other.length ? other.join(", ") : "none");
  if (info.cls >= 0.05) fail(`${w}: CLS ${info.cls.toFixed(4)}`);
  if (info.overflow) fail(`${w}: horizontal overflow`);
  if (info.outside.length) fail(`${w}: past the viewport: ${info.outside.slice(0, 4).join(", ")}`);
  if (errs.length) fail(`${w}: console errors`);
  if (issues.length) fail(`${w}: DevTools issues: ${issues.join(", ")}`);
  if (other.length) fail(`${w}: requests to ${other.join(", ")}`);
  await ctx.close();
}

/* .page clips horizontal overflow, so an item pushed off screen would not
   show up as a scrollbar: check every nav element is inside the viewport. */
log("\n--- nav fits the viewport (320–1280 px)");
{
  const bad = [];
  for (const w of [320, 360, 390, 430, 600, 640, 760, 761, 900, 1024, 1280]) {
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

log("\n--- email and phone never visible; real address or number only after a click");
{
  const ctx = await newContext(b);
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const t = withoutProfileLinks(
    await p.evaluate(() => document.body.innerText + " " + [...document.querySelectorAll("a")].map((a) => a.getAttribute("href")).join(" ")),
  );
  const hit = needles.map((n, i) => (t.includes(n) ? "#" + (i + 1) : null)).filter(Boolean);
  log("page text + hrefs:", hit.length ? "LEAK needles " + hit : "clean");
  if (hit.length) fail("contact details visible");
  const [email, , phone] = needles;
  const expect = { Email: (h) => h === `mailto:${email}`, Viber: (h) => h === `viber://chat?number=%2B${phone}`, WhatsApp: (h) => h === `https://wa.me/${phone}` };
  for (const [name, ok] of Object.entries(expect)) {
    const link = p.locator(".channels a", { hasText: name });
    const before = await link.getAttribute("href");
    /* Swallow the navigation the click starts (an app link, or a new tab). */
    p.context().once("page", (tab) => tab.close().catch(() => {}));
    await link.click({ noWaitAfter: true }).catch(() => {});
    const after = await link.getAttribute("href");
    const good = before === "#contact" && ok(after);
    log(`${name}: before ${before} | after click ${good ? "ok" : "WRONG " + after.slice(0, 14)}`);
    if (!good) fail(`${name} link`);
  }
  await ctx.close();
}

log("\n--- contrast (lowest ratios of small text) + focus");
{
  const ctx = await newContext(b, { viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
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
      let c = [0, 0, 0];
      for (const l of layers.reverse()) { const al = l.length < 4 ? 1 : l[3]; c = c.map((v, i) => l[i] * al + v * (1 - al)); }
      return c;
    };
    const small = [...document.querySelectorAll("body *")].filter((el) => {
      if (!el.getClientRects().length || !el.childNodes.length) return false;
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return false;
      if (el.closest("[aria-hidden='true'], .sr-only")) return false;
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
  for (let n = 0; n < 24; n++) {
    await p.keyboard.press("Tab");
    /* An outline, the ring form fields draw with box-shadow, or the outline of the card a link covers. */
    focus.push(await p.evaluate(() => {
      const e = document.activeElement;
      const s = getComputedStyle(e);
      const card = e.closest(".proj");
      return [e.tagName.toLowerCase() + (e.name ? `[name=${e.name}]` : ""), s.outlineStyle !== "none" || s.boxShadow !== "none" || !!(card && getComputedStyle(card).outlineStyle !== "none")];
    }));
  }
  const hidden = focus.filter(([, ok]) => !ok).map(([el]) => el);
  log("lowest contrast:", res.map(([s, r]) => `${s} ${r}`).join(" | "), "| focus visible on first 24 tabs:", hidden.length ? "NO on " + hidden.join(", ") : "yes");
  if (res[0][1] < 4.5) fail(`contrast ${res[0][0]} ${res[0][1]}`);
  if (hidden.length) fail("focus not visible");
  await ctx.close();
}

await b.close();
log(failed ? `\n${failed} check(s) failed` : "\nall checks passed");
process.exit(failed ? 1 : 0);
