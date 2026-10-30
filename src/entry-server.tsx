import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { PROFILE } from "./data/profile";

/* Used only at build time by scripts/prerender.mjs. */

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

/* JSON-LD for the page: a Person, built from the same data the page shows.
   A [[placeholder]] left in here is caught by the same build check. */
export function personJsonLd(siteUrl: string): string {
  const { name, nameAscii, role, github, linkedin, instagram, education, photo } = PROFILE;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    alternateName: nameAscii,
    url: `${siteUrl}/`,
    image: `${siteUrl}${photo.src}`,
    jobTitle: role,
    address: { "@type": "PostalAddress", addressLocality: "Kragujevac", addressCountry: "RS" },
    knowsAbout: ["Software testing", "Quality assurance", "Accessibility testing", "Web development"],
    knowsLanguage: ["sr", "en"],
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    sameAs: [linkedin, github, instagram],
  };
  // "<" escaped so the JSON can never close the <script> tag.
  return JSON.stringify(person).replace(/</g, "\\u003c");
}
