/* Checks the CV PDF before it is published:

     npm run cv:check                   public/cv/Mihailo-Sebek-CV.pdf
     npm run cv:check -- other.pdf      another file
     npm run cv:check -- --write        also rewrite the metadata, in place

   - Lists the document metadata (Info dictionary and XMP), annotations
     (comments, links) and embedded files, so nothing private ships by accident.
   - --write keeps only Title "Mihailo Šebek — CV" and Author; every other
     Info entry and the XMP packet are removed.
   - Fails (exit 1) when the text holds a phone number other than my own.
     Mine is published on purpose (the site's Viber and WhatsApp links, read
     from the character codes in src/data/contact.ts); any other number in a
     public PDF is a mistake.
   - Points out known typos in the CV text (warnings only).

   Exit codes: 0 ok, 1 unexpected phone number, 2 usage error. */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { PDFDocument, PDFName } from "pdf-lib";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const DEFAULT_FILE = "public/cv/Mihailo-Sebek-CV.pdf";
const TITLE = "Mihailo Šebek — CV";
const AUTHOR = "Mihailo Šebek";
const KEEP = ["Title", "Author"];
const INFO_KEYS = ["Title", "Author", "Subject", "Keywords", "Creator", "Producer", "CreationDate", "ModDate", "Trapped"];

/* 9 or more digits, optionally with + / 00 and short separators between them.
   A year range ("2020-2026") has only 8 digits, so it does not match. */
const PHONE = /(?:\+|\b00)?\d(?:[\s\-/.()]{0,2}\d){8,14}/g;

/* My number, international format, digits only: the same codes the site uses. */
const OWN_PHONE = (() => {
  const src = readFileSync(new URL("../src/data/contact.ts", import.meta.url), "utf8");
  const m = src.match(/PHONE_CODES\s*=\s*\[([\d,\s]+)\]/);
  if (!m) throw new Error("PHONE_CODES not found in src/data/contact.ts");
  return String.fromCharCode(...m[1].split(",").map(Number));
})();
/** Whether a number found in the text is mine, written internationally (+381…, 00381…) or locally (06…). */
const isOwn = (found) => {
  const d = found.replace(/\D/g, "").replace(/^00/, "");
  return d === OWN_PHONE || (d.startsWith("0") && "381" + d.slice(1) === OWN_PHONE);
};

const TYPOS = [
  [/\bfor freelancer\b(?!s)/i, "“for freelancer” → “for freelancers”"],
  [
    /live on https?:\/\/(?:www\.)?mihailobuilds\.com\/?(?![\w.])/i,
    "the Invoice Generator lives at https://invoice.mihailobuilds.com/, not the main site",
  ],
];

const args = process.argv.slice(2);
const write = args.includes("--write");
const file = args.find((a) => !a.startsWith("--")) ?? DEFAULT_FILE;
if (!existsSync(file)) {
  console.error(`No such file: ${file}`);
  process.exit(2);
}

/* Everything pdf.js can see: metadata, annotations, attachments and the text,
   one string per line (items grouped by their baseline), so a number split
   into several text items is still found, but two lines never run together. */
async function inspect(bytes) {
  const task = getDocument({ data: new Uint8Array(bytes), isEvalSupported: false, verbosity: 0 });
  const pdf = await task.promise;
  const { info, metadata } = await pdf.getMetadata();
  const found = await pdf.getAttachments(); // a Map in pdf.js 6, a plain object before
  const attachments = found instanceof Map ? [...found.values()] : Object.values(found ?? {});
  const annotations = [];
  const lines = [];
  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    for (const a of await page.getAnnotations()) {
      annotations.push(`page ${n}: ${a.subtype}${a.url ? ` → ${a.url}` : ""}${a.contentsObj?.str ? `: ${a.contentsObj.str}` : ""}`);
    }
    const byLine = new Map();
    for (const item of (await page.getTextContent()).items) {
      if (!("str" in item) || !item.str) continue;
      const y = Math.round(item.transform[5]);
      byLine.set(y, [...(byLine.get(y) ?? []), item.str]);
    }
    lines.push(...[...byLine.values()].map((parts) => parts.join(" ").replace(/\s+/g, " ").trim()));
  }
  const pages = pdf.numPages;
  await task.destroy();
  return { info, xmp: metadata, attachments, annotations, lines, pages };
}

async function rewriteMetadata(bytes) {
  const doc = await PDFDocument.load(bytes, { updateMetadata: false });
  const info = doc.getInfoDict();
  for (const key of info.keys()) if (!KEEP.includes(key.decodeText())) info.delete(key);
  doc.setTitle(TITLE);
  doc.setAuthor(AUTHOR);
  doc.catalog.delete(PDFName.of("Metadata"));
  return doc.save();
}

let bytes = readFileSync(file);
if (write) {
  bytes = Buffer.from(await rewriteMetadata(bytes));
  writeFileSync(file, bytes);
}
const r = await inspect(bytes);

console.log(`CV check: ${file} (${Math.max(1, Math.round(bytes.length / 1024))} KB, ${r.pages} page${r.pages === 1 ? "" : "s"})${write ? " — metadata rewritten" : ""}\n`);

console.log("Metadata");
const present = INFO_KEYS.filter((k) => r.info?.[k] !== undefined && r.info[k] !== "");
for (const k of present) console.log(`  ${k}: ${Array.isArray(r.info[k]) ? r.info[k].join(", ") : r.info[k]}`);
for (const [k, v] of Object.entries(r.info?.Custom ?? {})) console.log(`  ${k} (custom): ${v}`);
if (r.xmp) console.log(`  XMP: present (${[...r.xmp].map(([k]) => k).join(", ") || "empty"})`);
const extra = [...present.filter((k) => !KEEP.includes(k)), ...Object.keys(r.info?.Custom ?? {}), ...(r.xmp ? ["XMP"] : [])];
console.log(extra.length ? `  ⚠ more than Title and Author: ${extra.join(", ")} — run with --write to keep only those two` : "  ✓ only Title and Author");

console.log("\nAnnotations");
console.log(r.annotations.length ? r.annotations.map((a) => `  ${a}`).join("\n") : "  none");

console.log("\nEmbedded files");
console.log(r.attachments.length ? r.attachments.map((a) => `  ⚠ ${a.filename}${a.content ? ` (${a.content.length} bytes)` : ""}`).join("\n") : "  none");

console.log("\nText");
const phones = r.lines.flatMap((l) => l.match(PHONE) ?? []).map((p) => p.trim());
const own = phones.filter(isOwn);
const other = phones.filter((p) => !isOwn(p));
for (const [re, msg] of TYPOS) if (r.lines.some((l) => re.test(l))) console.log(`  ⚠ ${msg}`);
if (own.length) console.log(`  ℹ my phone number: ${own.join(", ")} (published on purpose, like the site's Viber and WhatsApp links)`);
if (other.length) {
  console.log(`  ✖ phone number found: ${other.join(", ")}`);
  console.log("    Only my own number belongs in the public CV. Export a version without this one.");
  process.exit(1);
}
console.log(own.length ? "  ✓ no other phone number found" : "  ✓ no phone number found");
