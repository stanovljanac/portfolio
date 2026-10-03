import { OFFER, PRICING } from "../data/pricing";
import type { Dict } from "./sr";

export const en: Dict = {
  skip: "Skip to content",

  nav: {
    label: "Main navigation",
    home: "MihailoBuilds — home",
    work: "Work",
    services: "Services",
    process: "Process",
    faq: "FAQ",
    cta: "Start a project",
    langLabel: "Language",
  },

  hero: {
    eyebrow: "Websites and landing pages for small businesses",
    titleLead: "Your business needs more than",
    titleAccent: "an Instagram profile.",
    lede: "I build modern websites and landing pages that present your services, build trust and make it easy for customers to contact you or book an appointment.",
    ctaWork: "View my work",
    ctaStart: "Start a project",
    shotAlt: "The MB Hair Salon website on a phone",
    shotPlaceholder: "[[salon screenshot — mobile]]",
  },

  audience: {
    eyebrow: "Who it's for",
    title: "Is this for you?",
    lede: "You probably need a website if one of these sounds familiar.",
    items: [
      {
        title: "You're starting a new business and need your first website.",
        text: "I'll build it from scratch — from structure to launch.",
      },
      {
        title: "Your current website looks outdated.",
        text: "I'll redesign it into a fresh, modern site built for phones.",
      },
      {
        title: "You only have Instagram and want a professional online presence.",
        text: "A website with your services, prices and contact details in one place.",
      },
      {
        title: "You're launching a new service or offer.",
        text: "A landing page that presents it clearly and leads visitors to call or get in touch.",
      },
    ],
  },

  work: {
    eyebrow: "Work",
    title: "A few things I've built.",
    lede: "Personal projects I came up with, designed and launched myself — from a salon website to an invoicing tool.",
    visit: "Visit site",
    newTab: "(opens in a new tab)",
    shotPlaceholder: "[[screenshot — desktop]]",
  },

  services: {
    eyebrow: "Services & starting prices",
    title: "What I can build for you.",
    lede: "Starting prices for the most common projects. You get the exact price in a written proposal.",
    items: [
      {
        name: "Business website",
        price: `from €${PRICING.website}`,
        desc: "A complete online presence: services and prices, about you, gallery and contact — everything a customer needs to know before they call.",
      },
      {
        name: "Landing page",
        price: `from €${PRICING.landing}`,
        desc: "One page with one goal: getting visitors to call, send an enquiry or book. For a new service, offer or campaign.",
      },
      {
        name: "Maintenance",
        price: `from €${PRICING.maintenance} / month`,
        desc: `Up to ${PRICING.maintenanceHours} hours of small changes a month, technical checks and updates. Clearly defined — not unlimited.`,
      },
    ],
    note: "The final price depends on scope, number of pages and functionality.",
    includesTitle: "Every project includes",
    includes: [
      "Custom design for desktop and mobile",
      "Development to the agreed structure and functionality",
      "One clearly visible contact method of your choice: call, email, message or a simple contact form",
      "A basic technical SEO setup",
      "Testing of navigation, links and agreed functionality",
      "Setup and launch on the agreed hosting",
      "A 30-day warranty",
    ],
    extrasTitle: "Additional functionality",
    extrasNote: "Based on the agreed project scope.",
    extras: [
      {
        title: "Content & presentation",
        items: ["Gallery", "Price list or menu", "Additional sections", "A second language"],
      },
      {
        title: "Integrations & functionality",
        items: [
          "Appointment request form (arrives in your email)",
          "Online booking through a service (e.g. Cal.com)",
          "Reservation systems",
          "External platforms",
          "More complex forms (multi-step, file uploads)",
        ],
      },
    ],
    moreTitle: "Need more than a website?",
    moreText: "I can also help with what comes with a website — as an add-on or separately.",
    more: ["Domain & hosting", "Google Business Profile setup", "Basic SEO setup"],
    offer: {
      eyebrow: "Special offer",
      title: "The next three client projects",
      text: "For the next three client projects I'm offering a special, lower price while I build my portfolio of commercial work. In return, we agree that I can showcase the finished project as an example of my work. If you're happy with how we worked together, I'd also appreciate you sharing your honest experience.",
      prices: `Business website from €${OFFER.website} · Landing page from €${OFFER.landing}`,
      note: "Applies to the core build, not to additional functionality.",
    },
  },

  process: {
    eyebrow: "Process",
    title: "A clear process, no surprises.",
    steps: [
      { title: "Conversation", text: "We talk about your business, your goals and what the website needs to achieve." },
      { title: "Proposal & deposit", text: "You get a written proposal with scope, price and timeline; work starts after the deposit." },
      { title: "Design", text: "I design the home page, which you approve before the build continues." },
      { title: "Build & revisions", text: "I build the website, with two rounds of revisions within the agreed scope." },
      { title: "Launch", text: "The website goes live, covered by a 30-day warranty." },
    ],
    scopeNote:
      "A new design after approval, new sections, new functionality or replacing all of the content are agreed as new work.",
    youTitle: "You provide",
    you: ["Logo", "Copy", "Services and prices", "Photos", "Contact details"],
    youNote: "Help with copy can be arranged.",
    meTitle: "I handle",
    me: ["Structure", "Design", "Development", "Launch", "Technical SEO basics", "Testing"],
    ownTitle: "I build it. You own it.",
    ownText: "The domain and accounts are registered in your name — the website is fully yours.",
  },

  about: {
    eyebrow: "About",
    title: "You work directly with me.",
    paras: [
      "I'm Mihailo. I build websites and landing pages for small businesses — from the first conversation to launch, with no middlemen.",
      "I work online, with clients anywhere.",
    ],
    photoAlt: "Mihailo",
    photoPlaceholder: "[[photo]]",
    qaTitle: "Built with a QA mindset",
    qaText:
      "My background is in software testing. So before launch I check every website across devices and browsers, and test forms, links, navigation and agreed functionality — all the small things that are easy to miss.",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        q: "How much does a website cost?",
        a: `Landing pages start from €${PRICING.landing} and business websites from €${PRICING.website}. You get the exact price in a written proposal once we know the scope, number of pages and functionality.`,
      },
      {
        q: "How long does it take?",
        a: "[[Typical timelines: landing page … days, business website … weeks.]] It depends mostly on when the copy and photos are ready. The exact timeline is in the proposal.",
      },
      {
        q: "What do you need from me?",
        a: "Your logo, copy, services and prices, photos and contact details. If some of it isn't ready, help with copy can be arranged.",
      },
      {
        q: "Who owns the domain and the website?",
        a: "You do. The domain and accounts are registered in your name, and you get all access when the project is done.",
      },
      {
        q: "Can I change content or add features later?",
        a: "Yes. Small changes can go through monthly maintenance, and new sections or features are agreed as separate work.",
      },
      {
        q: "Can the website have online booking?",
        a: "Yes. The simplest options are connecting a booking service you already use or a ready-made one (e.g. Cal.com), or adding an appointment request form that arrives in your email. If you need something more tailored, it's done as additional functionality: before we start, I'll tell you how much time and money it takes and whether it makes sense for your budget.",
      },
      {
        q: "What if something doesn't work after launch?",
        a: "The 30-day warranty covers bugs in the build and in agreed functionality. New requests, content changes and new features are billed separately. Outages of external services and hosting are handled by their providers.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your website.",
    lede: "Not sure what kind of website you need? Tell me about your business and we'll find the right solution together.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    messageLabel: "Message",
    messagePlaceholder: "What does your business do and what do you need?",
    submit: "Send message",
    sending: "Sending…",
    errName: "Please enter your name.",
    errEmail: "Please enter your email address.",
    errEmailInvalid: "Please enter a valid email address.",
    errMessage: "Tell me a little about your project.",
    errNotConnected: "The form isn't connected yet — please email me directly at {email}.",
    errNetwork: "Network error — please try again or contact me directly.",
    errGeneric: "Something went wrong. Please try again.",
    successTitle: "Message sent.",
    successText: "Thanks — I'll get back to you within one business day.",
    sendAnother: "Send another message",
    subject: "New message from mihailobuilds.com",
    directTitle: "Or contact me directly",
    email: "Email",
    viber: "Viber",
    whatsapp: "WhatsApp",
    reply: "I reply within one business day.",
    privacyLead: "I only use the details from this form to reply to you.",
    privacyLink: "Privacy policy",
  },

  footer: {
    tagline: "Websites and landing pages for small businesses.",
    privacy: "Privacy",
    navLabel: "Footer navigation",
    copy: "© 2026 MihailoBuilds",
  },

  privacy: {
    title: "Privacy policy",
    updated: "Last updated: [[publication date]]",
    back: "Back to home",
    sections: [
      {
        h: "Who processes your data",
        p: [
          `The data controller is Mihailo Sebek, Serbia. Contact for any data-related questions: {email}.`,
          "Processing is governed by the Personal Data Protection Law of the Republic of Serbia.",
        ],
      },
      {
        h: "What data I collect",
        p: [
          "When you send a message through the contact form: your name, email address and the content of the message.",
          "When you contact me directly (email, Viber, WhatsApp): the information you choose to send.",
          "When you visit the website: technical data processed by the hosting, analytics and font services (described below).",
        ],
      },
      {
        h: "Purpose and legal basis",
        p: [
          "I use the details from your message only to reply and, if you ask, to prepare a proposal. This processing is necessary for steps taken at your request before any possible collaboration.",
          "I use visit data to understand website traffic. [[verify: legal basis for analytics]]",
          "I don't sell your data, use it for advertising or send newsletters.",
        ],
      },
      {
        h: "How long I keep data",
        p: [
          "I keep messages for as long as needed to respond to your enquiry and, if we work together, for the duration of the collaboration. [[verify: maximum retention period]]",
          "Retention periods at the services listed below are set by their own terms. [[verify]]",
        ],
      },
      {
        h: "Who else has access",
        p: [
          "Web3Forms — the service that forwards contact form messages to my email. [[verify: server location and retention period]]",
          "Vercel — website hosting and Vercel Web Analytics for traffic statistics. [[verify: what data is collected and where it is stored]]",
          "Google Fonts — fonts are loaded from Google's servers, so your browser sends your IP address to Google.",
          "My email provider — where received messages are stored. [[verify: provider name]]",
        ],
      },
      {
        h: "Transfers outside Serbia",
        p: ["The services listed may process data outside Serbia. [[verify: countries and transfer basis for each service]]"],
      },
      {
        h: "Cookies and analytics",
        p: [
          "The website does not use cookies for advertising or cross-site tracking. Basic traffic statistics are provided by Vercel Web Analytics. [[verify: whether Vercel Web Analytics uses cookies]]",
        ],
      },
      {
        h: "Your rights",
        p: [
          "You have the right to request access to your data, its correction or deletion, restriction of processing, data portability, and to object to processing.",
          `You can send a request to {email}. You also have the right to lodge a complaint with the Commissioner for Information of Public Importance and Personal Data Protection.`,
        ],
      },
    ],
  },
};
