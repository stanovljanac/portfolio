/* Checks the CV PDF before it is published:

     npm run cv:check                   public/cv/Mihailo-Sebek-CV.pdf
     npm run cv:check -- other.pdf      another file
     npm run cv:check -- --write        also rewrite the metadata, in place

   - Lists the document metadata (Info dictionary and XMP), annotations
     (comments, links) and embedded files, so nothing private ships by accident.
   - --write keeps only Title "Mihailo Šebek — CV" and Author; every other
     Info entry and the XMP packet are removed.
   - Fails (exit 1) when the text holds something that looks like a phone
     number. The PDF is plain text to a scraper, so whatever is in it bypasses
     the email obfuscation on the site; the public CV has no phone number.
   - Points out known typos in the CV text (warnings only).

   Exit codes: 0 ok, 1 phone number found, 2 usage error. */
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
const phones = r.lines.flatMap((l) => l.match(PHONE) ?? []);
for (const [re, msg] of TYPOS) if (r.lines.some((l) => re.test(l))) console.log(`  ⚠ ${msg}`);
if (phones.length) {
  console.log(`  ✖ phone number found: ${phones.map((p) => p.trim()).join(", ")}`);
  console.log("    Export a public version of the CV without it.");
  process.exit(1);
}
console.log("  ✓ no phone number found");
