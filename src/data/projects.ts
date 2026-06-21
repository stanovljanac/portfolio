export type Project = {
  name: string;
  category: string;
  statusVariant: "success" | "warning";
  statusLabel: string;
  desc: string;
  tags: string[];
  kinds: string[];
  cover: string;
  /** Colored gold aperture on the cover (vs. a single-tone dark mark). */
  markGold: boolean;
  /** Watermark fill colour. */
  wmColor: string;
  /** Live products link out and show a Visit button; in-build ones don't. */
  live: boolean;
  /** External product URL (only set for live products). */
  url?: string;
  /** Optional cover image; falls back to the gradient/mark if the file is missing. */
  image?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Keeper",
    category: "Digital product · Photography",
    statusVariant: "success",
    statusLabel: "Live",
    desc:
      "A 23-module guide to photographing your partner — the angles, light and timing that turn an ordinary phone photo into one she'll actually want to post.",
    tags: ["Course", "Photography", "Web"],
    kinds: [],
    cover: "linear-gradient(135deg,#FDDAA8 0%,#FDC67E 45%,#EB8A57 100%)",
    markGold: false,
    wmColor: "#000000",
    live: true,
    url: "https://keeper.mihailobuilds.com/",
    image: "/projects/keeper.png",
  },
  {
    name: "Invoice Generator",
    category: "Business · Automation",
    statusVariant: "success",
    statusLabel: "Live",
    desc: "Professional invoices in seconds — tax handling and instant PDF export.",
    tags: ["SaaS", "Stripe", "Automation"],
    kinds: ["Automation"],
    cover: "linear-gradient(150deg,#16161A 0%,#232328 60%,#2D2D33 100%)",
    markGold: true,
    wmColor: "#FDC67E",
    live: true,
    url: "https://invoice.mihailobuilds.com/",
    image: "/projects/invoice.png",
  },
  {
    name: "Pulse",
    category: "AI · Analytics",
    statusVariant: "warning",
    statusLabel: "In build",
    desc: "Plain-language analytics — ask questions about your product and get answers, not dashboards.",
    tags: ["AI", "Charts", "TypeScript"],
    kinds: ["AI"],
    cover: "linear-gradient(150deg,#1B1714 0%,#2A2018 55%,#3A2A18 100%)",
    markGold: true,
    wmColor: "#FDC67E",
    live: false,
  },
];

export const FILTERS = ["All", "SaaS", "AI", "Automation"] as const;
export type Filter = (typeof FILTERS)[number];
