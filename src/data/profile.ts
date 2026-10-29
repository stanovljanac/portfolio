/* Personal facts shown on the site, in one place.

   Values written as [[…]] are placeholders for content Mihailo still has
   to provide. The build lists every one left in the page, and the
   production build (main) fails while any remain — see scripts/prerender.mjs. */

export const PROFILE = {
  name: "Mihailo Sebek",
  /** Spelling with the diacritic, for search (JSON-LD alternateName). */
  nameNative: "Mihailo Šebek",
  role: "Manual QA Engineer",
  /** First month in QA ("YYYY-MM"); the site shows the time since, as of the build date. */
  qaSince: "2025-03",
  qaSinceLabel: "March 2025",
  github: "https://github.com/stanovljanac",
  /** null hides LinkedIn everywhere. */
  linkedin: "[[linkedin-url]]" as string | null,
  /** "Kragujevac, Serbia · open to remote" or just "Serbia" — Mihailo's call. */
  location: "[[location]]",
  currentlyBuilding: "[[currently-building]]",
  education: { school: "Faculty of Science (PMF), University of Kragujevac", years: "2020–2026" },
  languages: "Serbian (native), English (B2)",
  /** Portrait in public/; until it exists, a visible placeholder is shown. */
  photo: undefined as string | undefined,
  cv: { href: "/cv/Mihailo-Sebek-CV.pdf", fileName: "Mihailo-Sebek-CV.pdf" },
};

/** "PDF, ~84 KB", or a placeholder while public/cv/ has no PDF (size read at build time). */
export const CV_LABEL = __CV_KB__ === null ? "PDF, [[cv-pdf]]" : `PDF, ~${__CV_KB__} KB`;
