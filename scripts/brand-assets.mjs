/* Raster brand files, made from the sources in the repo:

     npm run build && node scripts/brand-assets.mjs

   - public/favicon.ico (16, 32, 48 px) and public/apple-touch-icon.png
     (180 px), from public/favicon.svg
   - public/og.png (1200×630), the social preview: the logo, the hero title
     of the built page and the salon screenshot in a browser frame, in the
     site's fonts and light-theme colours. The copy is read from dist/, so it
     always matches the site; run the build first, and run this again when
     the hero copy, the logo or the colours change.
   Needs Playwright (see scripts/qa/_lib.mjs) and network access for the
   Google Fonts the site uses. */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { ROOT, launchChromium, log } from "./qa/_lib.mjs";

const PUBLIC = join(ROOT, "public");
const read = (p) => readFileSync(join(ROOT, p));
const dataUrl = (p, type) => `data:${type};base64,${read(p).toString("base64")}`;

/* --- Favicons ----------------------------------------------- */
const svg = read("public/favicon.svg");
const png = (size) => sharp(svg, { density: (72 * size) / 40 }).resize(size, size).png().toBuffer();

const icoSizes = [16, 32, 48];
const images = await Promise.all(icoSizes.map(png));
const header = Buffer.alloc(6 + 16 * images.length);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((img, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(icoSizes[i], e); // width
  header.writeUInt8(icoSizes[i], e + 1); // height
  header.writeUInt16LE(1, e + 4); // colour planes
  header.writeUInt16LE(32, e + 6); // bits per pixel
  header.writeUInt32LE(img.length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += img.length;
});
writeFileSync(join(PUBLIC, "favicon.ico"), Buffer.concat([header, ...images]));
writeFileSync(join(PUBLIC, "apple-touch-icon.png"), await png(180));
log("favicon.ico (16, 32, 48), apple-touch-icon.png (180)");

/* --- Open Graph image ------------------------------------------ */
const html = read("dist/index.html").toString();
const text = (re) => {
  const m = html.match(re);
  if (!m) throw new Error(`${re} not found in dist/index.html. Run \`npm run build\` first.`);
  return m[1].replace(/<!-- -->/g, "").trim();
};
const lead = text(/class="hero__title">(.*?)<span class="accent">/);
const accent = text(/<span class="accent">(.*?)<\/span>/);
const host = new URL(text(/<link rel="canonical" href="(.*?)"/)).host;
const shot = dataUrl("public/projects/mb-hair-salon-1280.webp", "image/webp");
const mark = svg.toString().replace(/<svg /, '<svg class="mark" ');

/* Colours and type follow src/styles/tokens/ (light theme) and the hero in site.css. */
const page = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@500;600;700&family=Geist+Mono:wght@500&family=Instrument+Serif:ital@1&display=block">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative; background: #FFFFFF; color: #0B1B3F; font-family: Geist; -webkit-font-smoothing: antialiased; }
  .bg { position: absolute; inset: 0; background:
      radial-gradient(42% 60% at 82% 50%, rgba(47,91,255,.12), transparent 70%),
      linear-gradient(rgba(11,27,63,.06) 1px, transparent 1px) 0 0 / 56px 56px,
      linear-gradient(90deg, rgba(11,27,63,.06) 1px, transparent 1px) 0 0 / 56px 56px; }
  .copy { position: absolute; left: 72px; top: 64px; bottom: 64px; width: 600px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 14px; font: 700 28px/1 Geist; letter-spacing: -0.02em; }
  .mark { width: 52px; height: 52px; }
  .eyebrow { margin-top: auto; font: 500 17px/1.4 "Geist Mono"; letter-spacing: 0.14em; text-transform: uppercase; color: #1F45E0; }
  h1 { margin-top: 18px; font: 600 64px/1.02 Geist; letter-spacing: -0.04em; text-wrap: balance; }
  h1 span { display: block; font: italic 400 68px/1.05 "Instrument Serif"; letter-spacing: 0; color: #1F45E0; }
  .host { margin-top: 26px; font: 500 22px/1 "Geist Mono"; color: #59627A; }
  .browser { position: absolute; left: 720px; top: 150px; width: 620px; border-radius: 14px; overflow: hidden; background: #fff;
    border: 1px solid #DCE2EE; box-shadow: 0 28px 64px rgba(11,27,63,.18); transform: rotate(-3deg); }
  .bar { height: 40px; display: flex; align-items: center; gap: 8px; padding: 0 16px; background: #F5F7FB; border-bottom: 1px solid #DCE2EE; }
  .bar i { width: 11px; height: 11px; border-radius: 50%; background: #C3CCDD; }
  .browser img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }
  .rule { position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: #2F5BFF; }
</style></head><body>
  <div class="bg"></div>
  <div class="browser"><div class="bar"><i></i><i></i><i></i></div><img src="${shot}" alt=""></div>
  <div class="copy">
    <div class="brand">${mark}Mihailo Builds</div>
    <p class="eyebrow">QA engineer · AI enthusiast</p>
    <h1>${lead}<span>${accent}</span></h1>
    <p class="host">${host}</p>
  </div>
  <div class="rule"></div>
</body></html>`;

const browser = await launchChromium();
const tab = await (await browser.newContext({ viewport: { width: 1200, height: 630 } })).newPage();
await tab.setContent(page, { waitUntil: "networkidle" });
await tab.evaluate(() => document.fonts.ready);
const missing = await tab.evaluate(() =>
  ["600 64px Geist", "500 17px 'Geist Mono'", "italic 400 68px 'Instrument Serif'"].filter((f) => !document.fonts.check(f)),
);
if (missing.length) throw new Error(`Fonts not loaded (offline?): ${missing.join(", ")}`);
const shotPng = await tab.screenshot({ type: "png" });
await sharp(shotPng).png({ compressionLevel: 9, palette: true, quality: 95 }).toFile(join(PUBLIC, "og.png"));
log("og.png");
await browser.close();
