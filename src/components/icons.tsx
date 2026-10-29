import type { SVGProps } from "react";

/* Single line-icon system: 1.8px stroke (2px for arrows/checks),
   24px grid, round caps & joins. Sizing is controlled by the
   surrounding context, so icons carry no width/height of their own.
   All icons are decorative unless a caller says otherwise. */

type P = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const ArrowIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...stroke} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ExternalIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...stroke} {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

export const DownloadIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...stroke} {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
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

export const CheckIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...stroke} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const InfoIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

export const SunIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...stroke} {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);

/* Social marks — filled. */
export const LinkedinIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM0 8h5v16H0V8Zm7.5 0h4.8v2.2h.07c.67-1.2 2.3-2.5 4.73-2.5 5.06 0 6 3.3 6 7.6V24h-5v-7c0-1.67-.03-3.8-2.3-3.8-2.3 0-2.66 1.8-2.66 3.67V24h-5V8Z" />
  </svg>
);

export const GithubIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
