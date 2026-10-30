/* Raster brand files, made from the sources in the repo:

     npm run build && node scripts/brand-assets.mjs

   - public/favicon.ico (16, 32, 48 px) and public/apple-touch-icon.png
     (180 px), from public/favicon.svg
   - public/og.png (1200×630), the social preview: the logo, the first
     screen's eyebrow (name and role) and headline from the built page, and
     the portrait, in the site's fonts and colours.
     The copy is read from dist/, so it always matches the site; run the
     build first, and run this again when the first screen's copy, the logo,
     the photo or the colours change.
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
const eyebrow = text(/class="hero__eyebrow">(.*?)<\/p>/);
const title = text(/class="hero__title">(.*?)<\/h1>/);
const host = new URL(text(/<link rel="canonical" href="(.*?)"/)).host;
const photo = dataUrl("public/mihailo.jpg", "image/jpeg");
const mark = svg.toString().replace(/<svg /, '<svg class="mark" ');

/* Colours and type follow src/styles/tokens/ and the first screen in site.css. */
const page = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@500;600&family=Geist+Mono:wght@500&display=block">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative; background: #070B16; color: #EAEFF9; font-family: Geist; -webkit-font-smoothing: antialiased; }
  .bg { position: absolute; inset: 0; background:
      radial-gradient(40% 60% at 82% 48%, rgba(47,91,255,.24), transparent 70%),
      linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px) 0 0 / 56px 56px,
      linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px) 0 0 / 56px 56px; }
  .copy { position: absolute; left: 80px; top: 72px; bottom: 72px; width: 700px; display: flex; flex-direction: column; }
  .mark { width: 56px; height: 56px; }
  .eyebrow { margin-top: auto; font: 500 28px/1.3 Geist; color: #93AAFF; }
  h1 { margin-top: 18px; font: 600 66px/1.02 Geist; letter-spacing: -0.04em; text-wrap: balance; }
  .host { margin-top: 40px; font: 500 22px/1 "Geist Mono"; color: #9AA5BD; }
  .photo { position: absolute; right: 110px; top: 165px; width: 300px; height: 300px; border-radius: 50%; overflow: hidden;
    outline: 3px solid #7A96FF; outline-offset: 10px; }
  .photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; }
  .rule { position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: #2F5BFF; }
</style></head><body>
  <div class="bg"></div>
  <div class="photo"><img src="${photo}" alt=""></div>
  <div class="copy">
    ${mark}
    <p class="eyebrow">${eyebrow}</p>
    <h1>${title}</h1>
    <p class="host">${host}</p>
  </div>
  <div class="rule"></div>
</body></html>`;

const browser = await launchChromium();
const tab = await (await browser.newContext({ viewport: { width: 1200, height: 630 } })).newPage();
await tab.setContent(page, { waitUntil: "networkidle" });
await tab.evaluate(() => document.fonts.ready);
const missing = await tab.evaluate(() => ["600 66px Geist", "500 22px 'Geist Mono'"].filter((f) => !document.fonts.check(f)));
if (missing.length) throw new Error(`Fonts not loaded (offline?): ${missing.join(", ")}`);
const shotPng = await tab.screenshot({ type: "png" });
await sharp(shotPng).png({ compressionLevel: 9, palette: true, quality: 95 }).toFile(join(PUBLIC, "og.png"));
log("og.png");
await browser.close();
