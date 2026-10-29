/* The projects on the site. Years come from when each repo was started;
   stacks from each project's own dependencies.

   "why" sentences prefixed with [[why:…]] are drafts waiting for Mihailo's
   own words: the build lists them and production refuses them. */

export type Shot = { src: string; srcSet?: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  /** What kind of thing it is; shown with the year above the name. */
  kind: string;
  year: string;
  /** One sentence: what it is. */
  desc: string;
  /** One concrete sentence: why I built it. */
  why: string;
  stack: string[];
  /** Live site. */
  url?: string;
  /** Desktop screenshot, 16:10, top of the page. */
  shot?: Shot;
  /** An honest limit of the project or of its screenshot. */
  note?: string;
};

/* 16:10 WebP screenshots at 640/960/1280/1600 px (public/projects/README.txt). */
const webp = (slug: string): Shot => ({
  src: `/projects/${slug}-960.webp`,
  srcSet: [640, 960, 1280, 1600].map((w) => `/projects/${slug}-${w}.webp ${w}w`).join(", "),
  width: 1440,
  height: 900,
});

const SALON: Project = {
  slug: "mb-hair-salon",
  name: "MB Hair Salon",
  kind: "Business website",
  year: "2026",
  desc: "A complete website for a hair salon: services and prices, stylists, a gallery, the location and an appointment booking flow.",
  why: "[[why:mb-hair-salon]] I wanted to prove I can build a whole business website end to end, not just a landing page.",
  stack: ["Vite", "Three.js", "JavaScript"],
  url: "https://demohairsalon.mihailobuilds.com/",
  shot: webp("mb-hair-salon"),
  note: "Booking is a design concept: it shows the flow, and a real salon would connect it to a booking service.",
};

const KEEPER: Project = {
  slug: "keeper",
  name: "Keeper",
  kind: "Web product",
  year: "2026",
  desc: "A 23-module guide to photographing your partner: the angles, light and timing that turn an ordinary phone photo into one worth posting.",
  why: "[[why:keeper]] I wanted to take a product for real users from idea to launch on my own: the content, the design and the site around it.",
  stack: ["Next.js", "Supabase", "Tailwind CSS", "Resend"],
  url: "https://keeper.mihailobuilds.com/",
  shot: webp("keeper"),
};

const INVOICE: Project = {
  slug: "invoice",
  name: "Invoice Generator",
  kind: "Web app",
  year: "2026",
  desc: "Professional invoices in seconds, with tax handling and instant PDF export.",
  why: "[[why:invoice]] Writing invoices by hand was slow and easy to get wrong, so I built a tool that does the boring part.",
  stack: ["Next.js", "Supabase", "Stripe", "Resend"],
  url: "https://invoice.mihailobuilds.com/",
  shot: webp("invoice"),
  note: "The app needs a login, so the screenshot is from my own account.",
};

const AUTOMATION_DESK: Project = {
  slug: "automation-desk",
  name: "The Automation Desk",
  kind: "Brand website",
  year: "2026",
  desc: "The website of The Automation Desk, a weekly video series about AI workflows, scripting and IT automation.",
  why: "[[why:automation-desk]] I kept automating my own repetitive work with AI and scripts, and wanted one place to show those workflows.",
  stack: ["React", "Vite"],
  url: "https://automationdesk.mihailobuilds.com/",
  shot: webp("automation-desk"),
};

const ANIMATED_TALES: Project = {
  slug: "animated-tales",
  name: "Animated Tales",
  kind: "Brand website",
  year: "2026",
  desc: "The website of a YouTube channel that tells one story from history or myth in about five minutes of hand-drawn 2D animation.",
  why: "[[why:animated-tales]] A long-term creative project: I love history and myth, and the channel needed a home outside YouTube.",
  stack: ["HTML", "CSS", "JavaScript", "Cloudflare"],
  url: "https://animatedtales.mihailobuilds.com/",
  shot: { src: "/projects/animated-tales.png", width: 1280, height: 800 },
};

const VOLTA: Project = {
  slug: "volta",
  name: "Volta",
  kind: "Team project",
  year: "[[year:volta]]",
  desc: "A monitoring system for a microgrid, built together with a team.",
  why: "[[why:volta]] I wanted to see how a real monitoring system fits together, from the database to the dashboard, as part of a team.",
  stack: ["Angular", "C#", "MongoDB", "SQLite"],
  note: "The code is not public, so there is no live demo or screenshot.",
};

/* The three large cards. The Web Studio Demo takes the Invoice Generator's
   place once it exists; the Invoice Generator then moves to MORE. */
export const FEATURED: Project[] = [SALON, KEEPER, INVOICE];
export const MORE: Project[] = [AUTOMATION_DESK, ANIMATED_TALES, VOLTA];

/* The QA project from the CV, shown on its own card. */
export const QA_PROJECT = {
  name: "Accessibility CI Testing",
  kind: "Bachelor thesis",
  year: "2026",
  desc: "An automated accessibility gate for a web shop: Playwright drives the key pages and flows, axe-core checks each one against WCAG rules, and GitHub Actions runs it on every push and pull request.",
  why: "[[why:accessibility-ci]] I wanted accessibility problems caught automatically on every change, instead of by hand at the end.",
  checks: ["Home page", "Sign-up", "Adding a product", "Purchase flow"],
  pipeline: ["Push or pull request", "GitHub Actions", "Playwright", "axe-core", "Report and gate"],
  stack: ["Playwright", "axe-core", "GitHub Actions"],
  repo: "https://github.com/stanovljanac/diplomski",
  note: "An academic project, not a production pipeline at a job.",
};

/** Every project with a live site, for the footer. */
export const LIVE: Project[] = [...FEATURED, ...MORE].filter((p) => p.url);
