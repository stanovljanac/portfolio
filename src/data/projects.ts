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
  /** Responsive variants of `image` (WebP widths), when available. */
  srcSet?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Keeper",
    category: "Digital Guide · Photo ",
    statusVariant: "success",
    statusLabel: "Live",
    desc: "A 23-module guide to photographing your partner — the angles, light and timing that turn an ordinary phone photo into one she'll actually want to post.",
    tags: ["Course", "Photography", "Web"],
    kinds: ["Web"],
    cover: "linear-gradient(135deg,#FDDAA8 0%,#FDC67E 45%,#EB8A57 100%)",
    markGold: false,
    wmColor: "#000000",
    live: true,
    url: "https://keeper.mihailobuilds.com/",
    image: "/projects/keeper-960.webp",
    srcSet: "/projects/keeper-640.webp 640w, /projects/keeper-960.webp 960w, /projects/keeper-1280.webp 1280w, /projects/keeper-1600.webp 1600w",
  },
  {
    name: "Invoice Generator",
    category: "Business · Automation",
    statusVariant: "success",
    statusLabel: "Live",
    desc: "Professional invoices in seconds — tax handling and instant PDF export.",
    tags: ["SaaS", "Stripe", "Automation"],
    kinds: ["SaaS", "Web", "Automation"],
    cover: "linear-gradient(150deg,#16161A 0%,#232328 60%,#2D2D33 100%)",
    markGold: true,
    wmColor: "#FDC67E",
    live: true,
    url: "https://invoice.mihailobuilds.com/",
    image: "/projects/invoice-960.webp",
    srcSet: "/projects/invoice-640.webp 640w, /projects/invoice-960.webp 960w, /projects/invoice-1280.webp 1280w, /projects/invoice-1600.webp 1600w",
  },
  {
    name: "The Automation Desk",
    category: "AI · Automation",
    statusVariant: "success",
    statusLabel: "Live",
    desc: "A weekly video series turning AI workflows, custom scripting and IT orchestration into repeatable, elite-level productivity.",
    tags: ["AI", "Automation", "Content"],
    kinds: ["Web", "Automation"],
    cover: "linear-gradient(150deg,#1B1714 0%,#2A2018 55%,#3A2A18 100%)",
    markGold: true,
    wmColor: "#FDC67E",
    live: true,
    url: "https://automationdesk.mihailobuilds.com/",
    image: "/projects/automation-desk-960.webp",
    srcSet: "/projects/automation-desk-640.webp 640w, /projects/automation-desk-960.webp 960w, /projects/automation-desk-1280.webp 1280w, /projects/automation-desk-1600.webp 1600w",
  },
  {
    name: "Animated Tales",
    category: "Brand · YouTube",
    statusVariant: "success",
    statusLabel: "Live",
    desc: "Website for the Animated Tales YouTube channel — one story from history or myth, told in about five minutes in hand-drawn 2D animation.",
    tags: ["Brand", "YouTube", "AI"],
    kinds: ["Web"],
    cover: "linear-gradient(150deg,#E8DFC4 0%,#D9C79A 55%,#B8945A 100%)",
    markGold: false,
    wmColor: "#000000",
    live: true,
    url: "https://animatedtales.mihailobuilds.com/",
    image: "/projects/animated-tales.png",
  },
  {
    name: "MB Hair Salon",
    category: "Client Work · Demo",
    statusVariant: "success",
    statusLabel: "Live",
    desc: "A demo website for a hair salon — a 3D dryer that follows your cursor, a services menu, stylist profiles and online booking.",
    tags: ["Website", "Three.js", "Booking"],
    kinds: ["Web"],
    cover: "linear-gradient(150deg,#161826 0%,#23243A 55%,#3A3460 100%)",
    markGold: true,
    wmColor: "#FDC67E",
    live: true,
    url: "https://demohairsalon.mihailobuilds.com/",
    image: "/projects/hair-salon.png",
  },
];

export const FILTERS = ["All", "SaaS", "Web", "Automation"] as const;
export type Filter = (typeof FILTERS)[number];
