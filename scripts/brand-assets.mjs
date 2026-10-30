/* Raster brand files, made from the sources in the repo:

     npm run build && node scripts/brand-assets.mjs

   - public/favicon.ico (16, 32, 48 px) and public/apple-touch-icon.png
     (180 px), from public/favicon.svg
   - public/og.png (1200×630), the social preview: the About section as on
     desktop (the round portrait, the title, the intro line and the place),
     drawn larger than on the page, because LinkedIn and the rest show the
     image about 360 px wide and smaller text turns to mush. The longer
     sentence and the profile links are left out for the same reason.
     The copy is read from dist/, so it always matches the site; run the
     build first, and run this again when the About copy, the photo or the
     colours change.
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
const title = text(/id="about-title"[^>]*>(.*?)<\/h2>/);
const intro = text(/class="about__intro">(.*?)<\/p>/);
const placeHtml = text(/class="about__place">(.*?)<\/p>/);
const pin = placeHtml.match(/<svg.*?<\/svg>/)[0];
const place = placeHtml.replace(/<svg.*?<\/svg>/, "").replace(/<span class="sr-only">.*?<\/span>/, "").trim();
const photo = dataUrl("public/mihailo-sea.jpg", "image/jpeg");

/* Colours and type follow src/styles/tokens/ and the About section in site.css. */
const page = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@500;600&display=block">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #070B16; color: #EAEFF9; font-family: Geist; -webkit-font-smoothing: antialiased;
    display: flex; align-items: center; gap: 72px; padding: 0 80px; }
  .photo { flex: none; width: 380px; height: 380px; border-radius: 50%; overflow: hidden; background: #121B31;
    outline: 4px solid #7A96FF; outline-offset: 12px; margin: 16px; }
  .photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; }
  h2 { font: 600 84px/1.05 Geist; letter-spacing: -0.035em; }
  .intro { margin-top: 28px; font: 500 42px/1.25 Geist; letter-spacing: -0.015em; text-wrap: balance; }
  .place { display: flex; align-items: center; gap: 12px; margin-top: 32px; font: 500 30px/1.3 Geist; color: #9AA5BD; }
  .place svg { flex: none; width: 32px; height: 32px; color: #93AAFF; }
</style></head><body>
  <div class="photo"><img src="${photo}" alt=""></div>
  <div class="copy">
    <h2>${title}</h2>
    <p class="intro">${intro}</p>
    <p class="place">${pin}${place}</p>
  </div>
</body></html>`;

const browser = await launchChromium();
const tab = await (await browser.newContext({ viewport: { width: 1200, height: 630 } })).newPage();
await tab.setContent(page, { waitUntil: "networkidle" });
await tab.evaluate(() => document.fonts.ready);
const missing = await tab.evaluate(() => ["600 84px Geist", "500 42px Geist"].filter((f) => !document.fonts.check(f)));
if (missing.length) throw new Error(`Fonts not loaded (offline?): ${missing.join(", ")}`);
const shotPng = await tab.screenshot({ type: "png" });
await sharp(shotPng).png({ compressionLevel: 9, palette: true, quality: 95 }).toFile(join(PUBLIC, "og.png"));
log("og.png");
await browser.close();
