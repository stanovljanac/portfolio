import type { SVGProps } from "react";

/* Single line-icon system: 1.8px stroke (2px for arrows/checks),
   24px grid, round caps & joins. Brand glyphs (the aperture) are
   the only filled marks — see Aperture.tsx. Sizing is controlled by
   the surrounding context, so icons carry no width/height of their own. */

type P = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ArrowIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...stroke} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const UserIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const LayersIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);

export const SparkIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M18 6l-2.5 2.5M6 18l2.5-2.5M18 18l-2.5-2.5" />
  </svg>
);

export const BoltIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

export const ShieldIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...stroke} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const GlobeIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <ellipse cx="12" cy="12" rx="4" ry="9" />
  </svg>
);

export const CodeIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <path d="m9 8-4 4 4 4" />
    <path d="m15 8 4 4-4 4" />
    <path d="m13.5 6-3 12" />
  </svg>
);

/* Social marks — filled. */
export const XIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.9 2H22l-7.5 8.6L23 22h-6.9l-5.4-7-6.2 7H1.4l8-9.2L1 2h7l4.9 6.5L18.9 2Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z" />
  </svg>
);

export const LinkedinIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM0 8h5v16H0V8Zm7.5 0h4.8v2.2h.07c.67-1.2 2.3-2.5 4.73-2.5 5.06 0 6 3.3 6 7.6V24h-5v-7c0-1.67-.03-3.8-2.3-3.8-2.3 0-2.66 1.8-2.66 3.67V24h-5V8Z" />
  </svg>
);

export const GithubIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
