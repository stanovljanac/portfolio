import type { Localized } from "../i18n";

export type Project = {
  slug: string;
  name: string;
  /** Small label above the name: always says it is a personal project. */
  label: Localized;
  desc: Localized;
  url: string;
  /** Desktop screenshot; when missing, a placeholder is shown. */
  image?: string;
  /** Featured project gets the large card. */
  featured?: boolean;
};

/* Order matters: the salon website is the closest example of what
   is being sold, so it comes first. Every project links to its live site. */
export const PROJECTS: Project[] = [
  {
    slug: "mb-hair-salon",
    name: "MB Hair Salon",
    label: { sr: "Lični projekat · Sajt za frizerski salon", en: "Personal project · Hair salon website" },
    desc: {
      sr: "Sajt za frizerski salon: usluge i cene, galerija, lokacija i tok rezervacije termina (dizajn; u produkciji se povezuje sa servisom za zakazivanje).",
      en: "Website for a hair salon: services and prices, gallery, location and an appointment booking flow (design concept; in production it connects to a booking service).",
    },
    url: "https://mbhairsalon.mihailobuilds.com/",
    image: "/projects/mb-hair-salon.png",
    featured: true,
  },
  {
    slug: "keeper",
    name: "Keeper",
    label: { sr: "Lični projekat · Sajt za online kurs", en: "Personal project · Online course website" },
    desc: {
      sr: "Landing stranica i sajt za online kurs fotografije, sa 23 modula organizovana po kategorijama.",
      en: "Landing page and website for an online photography course, with 23 modules organised by category.",
    },
    url: "https://keeper.mihailobuilds.com/",
    image: "/projects/keeper.png",
  },
  {
    slug: "automation-desk",
    name: "The Automation Desk",
    label: { sr: "Lični projekat · Sajt za lični brend", en: "Personal project · Personal brand website" },
    desc: {
      sr: "Sajt za lični brend kreatora sadržaja: YouTube i društvene mreže, resursi, metodologija rada i forma za upite.",
      en: "Website for a content creator's personal brand: YouTube and social channels, resources, methodology and an enquiry form.",
    },
    url: "https://automationdesk.mihailobuilds.com/",
    image: "/projects/automation-desk.png",
  },
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    label: { sr: "Lični projekat · Interaktivni alat", en: "Personal project · Interactive tool" },
    desc: {
      sr: "Generator faktura u browseru: unos podataka, obračun poreza i PDF izvoz.",
      en: "In-browser invoice generator: data entry, tax calculation and PDF export.",
    },
    url: "https://invoice.mihailobuilds.com/",
    image: "/projects/invoice.png",
  },
];
