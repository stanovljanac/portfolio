/* The projects on the site. Stacks come from each project's own dependencies. */

export type Shot = { src: string; srcSet?: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  /** What kind of thing it is; shown above the name. */
  kind: string;
  /** One sentence: what it is. */
  desc: string;
  stack: string[];
  /** Live site. */
  url: string;
  /** Desktop screenshot, 16:10, top of the page. */
  shot: Shot;
};

/* 16:10 WebP screenshots at 640/960/1280/1600 px (public/projects/README.txt). */
const webp = (slug: string): Shot => ({
  src: `/projects/${slug}-960.webp`,
  srcSet: [640, 960, 1280, 1600].map((w) => `/projects/${slug}-${w}.webp ${w}w`).join(", "),
  width: 1440,
  height: 900,
});

/* In the order they are shown: the first gets the full-width card, the
   others share a row. The hero fans out the same three screenshots. */
export const PROJECTS: Project[] = [
  {
    slug: "mb-hair-salon",
    name: "MB Hair Salon",
    kind: "Business website",
    desc: "A complete website for a hair salon: services and prices, stylists, gallery, location and an appointment booking concept.",
    stack: ["Vite", "Three.js", "JavaScript"],
    url: "https://demohairsalon.mihailobuilds.com/",
    shot: webp("mb-hair-salon"),
  },
  {
    slug: "keeper",
    name: "Keeper",
    kind: "Web product",
    desc: "A 23-module guide to photographing your partner: the angles, light and timing behind phone photos worth posting.",
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Resend"],
    url: "https://keeper.mihailobuilds.com/",
    shot: webp("keeper"),
  },
  {
    slug: "invoice",
    name: "Invoice Generator",
    kind: "Web app for freelancers",
    desc: "Professional invoices in seconds, with tax handling, PDF export and sending to clients by email.",
    stack: ["Next.js", "Supabase", "Stripe", "Resend"],
    url: "https://invoice.mihailobuilds.com/",
    shot: webp("invoice"),
  },
];

/* The bachelor thesis: no screenshot, but the pipeline it runs. */
export const THESIS = {
  name: "Accessibility CI Testing",
  kind: "Bachelor thesis",
  desc: "Automated accessibility testing for a web shop. Playwright goes through the key pages and flows, axe-core checks each one against WCAG, and GitHub Actions runs it all on every push and pull request.",
  flows: ["Home page", "Sign-up", "Adding a product", "Purchase"],
  pipeline: ["Push or pull request", "GitHub Actions", "Playwright", "axe-core", "Report and pass/fail"],
  stack: ["Playwright", "axe-core", "GitHub Actions"],
  repo: "https://github.com/stanovljanac/diplomski",
};
