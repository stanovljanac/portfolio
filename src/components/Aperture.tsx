import type { SVGProps } from "react";

/* The MihailoBuilds "Aperture" mark — a square iris opening from a
   central core. Three render variants used across the site. */

type P = SVGProps<SVGSVGElement>;

/* Full-color facets + gold core (product covers, app shells). */
export function ApertureColor(props: P) {
  return (
    <svg viewBox="0 0 100 100" fill="none" {...props}>
      <path d="M22 22 H54 L44 32 H32 V44 L22 54 Z" fill="#FDDAA8" />
      <path d="M78 22 V54 L68 44 V32 H56 L46 22 Z" fill="#F4B062" />
      <path d="M78 78 H46 L56 68 H68 V56 L78 46 Z" fill="#CC7C36" />
      <path d="M22 78 V46 L32 56 V68 H44 L54 78 Z" fill="#E8974A" />
      <rect x="44" y="44" width="12" height="12" rx="2" fill="#FDC67E" />
    </svg>
  );
}

/* Single-tone facets + core (e.g. dark mark on a light cover). */
export function ApertureSolid({ fill = "currentColor", ...props }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill={fill} {...props}>
      <path d="M22 22 H54 L44 32 H32 V44 L22 54 Z" />
      <path d="M78 22 V54 L68 44 V32 H56 L46 22 Z" />
      <path d="M78 78 H46 L56 68 H68 V56 L78 46 Z" />
      <path d="M22 78 V46 L32 56 V68 H44 L54 78 Z" />
      <rect x="44" y="44" width="12" height="12" rx="2" />
    </svg>
  );
}

/* Facets only, no core — watermarks and the footer copyright glyph. */
export function ApertureFacets({ fill = "currentColor", ...props }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill={fill} {...props}>
      <path d="M22 22 H54 L44 32 H32 V44 L22 54 Z" />
      <path d="M78 22 V54 L68 44 V32 H56 L46 22 Z" />
      <path d="M78 78 H46 L56 68 H68 V56 L78 46 Z" />
      <path d="M22 78 V46 L32 56 V68 H44 L54 78 Z" />
    </svg>
  );
}
