import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { PDFDocument, PDFName, PDFString, StandardFonts } from "pdf-lib";

const SCRIPT = join(import.meta.dirname, "../scripts/cv-check.mjs");
let dir;
before(() => (dir = mkdtempSync(join(tmpdir(), "cv-check-"))));
after(() => rmSync(dir, { recursive: true, force: true }));

/* A one-page PDF with the given lines of text; `setup` can add metadata etc. */
async function makePdf(name, lines, setup = () => {}) {
  const doc = await PDFDocument.create({ updateMetadata: false });
  const page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  lines.forEach((l, i) => page.drawText(l, { x: 50, y: 780 - i * 20, size: 12, font }));
  await setup(doc, page);
  const file = join(dir, name);
  writeFileSync(file, await doc.save());
  return file;
}

const run = (...args) => {
  const r = spawnSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8" });
  return { code: r.status, out: r.stdout + r.stderr };
};

test("a clean CV passes", async () => {
  const f = await makePdf("clean.pdf", ["Mihailo Sebek", "Manual QA Engineer", "PMF Kragujevac 2020-2026"], (d) => {
    d.setTitle("Mihailo Šebek — CV");
    d.setAuthor("Mihailo Šebek");
  });
  const r = run(f);
  assert.equal(r.code, 0, r.out);
  assert.match(r.out, /no phone number/i);
});

test("a phone number in the text fails the check", async () => {
  const f = await makePdf("phone.pdf", ["Mihailo Sebek", "Phone: +381 64 000 0000"]);
  const r = run(f);
  assert.equal(r.code, 1, r.out);
  assert.match(r.out, /phone number/i);
  assert.match(r.out, /\+381 64 000 0000/);
});

test("a local phone format fails too", async () => {
  const f = await makePdf("phone-local.pdf", ["Tel 064/000-0000"]);
  const r = run(f);
  assert.equal(r.code, 1, r.out);
  assert.match(r.out, /phone number.*064\/000-0000/is);
});

/* My own number, from the same character codes the site uses (never written out). */
const ownPhone = (() => {
  const src = readFileSync(join(import.meta.dirname, "../src/data/contact.ts"), "utf8");
  return String.fromCharCode(...src.match(/PHONE_CODES\s*=\s*\[([\d,\s]+)\]/)[1].split(",").map(Number));
})();

test("my own number is allowed, in international and local form", async () => {
  const intl = `+${ownPhone.slice(0, 3)} ${ownPhone.slice(3)}`;
  const local = `0${ownPhone.slice(3, 5)}/${ownPhone.slice(5)}`;
  const f = await makePdf("own.pdf", ["Mihailo Sebek", intl, local]);
  const r = run(f);
  assert.equal(r.code, 0, r.out);
  assert.match(r.out, /my phone number/i);
  assert.match(r.out, /no other phone number/i);
});

test("another number next to mine still fails", async () => {
  const f = await makePdf("own-and-other.pdf", [`+${ownPhone}`, "Ref: +381 64 000 0000"]);
  const r = run(f);
  assert.equal(r.code, 1, r.out);
  assert.match(r.out, /phone number found: \+381 64 000 0000/);
});

test("a year range is not taken for a phone number", async () => {
  const f = await makePdf("years.pdf", ["2020-2026", "2025 - 2026", "Since 03/2025"]);
  assert.equal(run(f).code, 0);
});

test("metadata beyond Title and Author is listed", async () => {
  const f = await makePdf("meta.pdf", ["CV"], (d) => {
    d.setTitle("CV");
    d.setCreator("Some CV builder");
    d.setProducer("Some PDF engine");
    d.setKeywords(["qa", "cv"]);
  });
  const r = run(f);
  assert.match(r.out, /Creator: Some CV builder/);
  assert.match(r.out, /Producer: Some PDF engine/);
  assert.match(r.out, /run with --write/i);
});

test("annotations and embedded files are listed", async () => {
  const f = await makePdf("extras.pdf", ["CV"], async (d, page) => {
    const annot = d.context.obj({ Type: "Annot", Subtype: "Text", Rect: [10, 10, 30, 30], Contents: PDFString.of("internal note") });
    page.node.set(PDFName.of("Annots"), d.context.obj([d.context.register(annot)]));
    await d.attach(new TextEncoder().encode("hidden"), "notes.txt", { mimeType: "text/plain" });
  });
  const r = run(f);
  assert.match(r.out, /Text.*internal note/);
  assert.match(r.out, /notes\.txt/);
});

test("--write leaves only Title and Author", async () => {
  const f = await makePdf("rewrite.pdf", ["CV"], (d) => {
    d.setTitle("old title");
    d.setAuthor("someone");
    d.setCreator("Some CV builder");
    d.setProducer("Some PDF engine");
    d.setSubject("subject");
  });
  const r = run(f, "--write");
  assert.equal(r.code, 0, r.out);
  const doc = await PDFDocument.load(readFileSync(f), { updateMetadata: false });
  assert.equal(doc.getTitle(), "Mihailo Šebek — CV");
  assert.equal(doc.getAuthor(), "Mihailo Šebek");
  assert.equal(doc.getCreator(), undefined);
  assert.equal(doc.getProducer(), undefined);
  assert.equal(doc.getSubject(), undefined);
  assert.equal(doc.catalog.get(PDFName.of("Metadata")), undefined);
});

test("known CV typos are pointed out", async () => {
  const f = await makePdf("typos.pdf", ["A tool for freelancer invoicing.", "Currently live on https://www.mihailobuilds.com/"]);
  const r = run(f);
  assert.match(r.out, /for freelancers/);
  assert.match(r.out, /invoice\.mihailobuilds\.com/);
});

test("a missing file is a usage error", () => {
  assert.equal(run(join(dir, "nope.pdf")).code, 2);
});
