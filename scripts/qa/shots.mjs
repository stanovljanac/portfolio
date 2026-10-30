/* Screenshots for visual review, saved to .qa/ (git-ignored).
   node scripts/qa/shots.mjs [widths=320,375,1440] [slice=1400] [viewport=1]
     slice=N     also cut the full page into N-px tall parts (easier to read than one long image)
     viewport=1  only the first screen instead of the full page */
import { BASE, OUT, launch, log, newContext, scrollThrough } from "./_lib.mjs";

const arg = Object.fromEntries(process.argv.slice(2).map((a) => a.split("=")));
const widths = (arg.widths || "320,375,1440").split(",").map(Number);
const slice = Number(arg.slice || 0);

const b = await launch();
for (const w of widths) {
  /* Reduced motion, so the page shows its final state: a full-page capture
     never scrolls, and the scroll reveal would leave everything below the
     first screen faded out. */
  const ctx = await newContext(b, { viewport: { width: w, height: w > 1000 ? 900 : 812 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const name = String(w);
  if (arg.viewport) {
    await page.screenshot({ path: `${OUT}/${name}-top.png` });
  } else {
    await scrollThrough(page);
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    if (slice) {
      const H = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0, i = 0; y < H; y += slice, i++)
        await page.screenshot({ path: `${OUT}/${name}-p${i}.png`, fullPage: true, clip: { x: 0, y, width: w, height: Math.min(slice, H - y) } });
    }
  }
  log("saved", name);
  await ctx.close();
}
await b.close();
log("→", OUT);
