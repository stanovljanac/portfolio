/* Personal facts shown on the site, in one place.

   A value written as [[…]] is a placeholder for content Mihailo still has
   to provide. The build lists every one left in the page, and the
   production build (main) fails while any remain — see scripts/prerender.mjs. */

export const PROFILE = {
  name: "Mihailo Šebek",
  /** Spelling without the diacritic, for search (JSON-LD alternateName). */
  nameAscii: "Mihailo Sebek",
  role: "Manual QA Engineer",
  /** First month in QA ("YYYY-MM"); the site shows the time since, as of the build date. */
  qaSince: "2025-03",
  qaSinceLabel: "March 2025",
  location: "Kragujevac, Serbia",
  github: "https://github.com/stanovljanac",
  linkedin: "https://www.linkedin.com/in/mihailo-%C5%A1ebek-912b6a26a/",
  instagram: "https://www.instagram.com/sebekmihailo/",
  /** Named as on the CV. */
  education: { school: "Faculty of Natural Sciences and Mathematics, University of Kragujevac", years: "2020 – 2026" },
  /** The photo by the sea, 640×640: the background blurred into the site's
      blues, the face moved to the middle for the round crop. og.png keeps
      the CV photo (public/mihailo.jpg). */
  photo: { src: "/mihailo-sea.jpg", width: 640, height: 640 },
  cv: { href: "/cv/Mihailo-Sebek-CV.pdf", fileName: "Mihailo-Sebek-CV.pdf" },
};
