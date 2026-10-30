# MihailoBuilds — personal site

The personal site of **Mihailo Šebek**, manual QA engineer and AI enthusiast. Live at [mihailobuilds.com](https://mihailobuilds.com).

One page: a hero (what MihailoBuilds is, the CV, three project screenshots fanned out), then Projects (three web projects, then the bachelor thesis), About (portrait, location, LinkedIn, GitHub, Instagram), Experience (work, studies, skills) and Contact (form, email, Viber, WhatsApp, LinkedIn). One dark theme.

## Stack

- **Vite + React 18 + TypeScript**, prerendered to static HTML (`src/entry-server.tsx` + `scripts/prerender.mjs`), hydrated on the client
- Plain CSS: tokens in `src/styles/tokens/`, components in `ds.css`, layout in `site.css`
- Fonts: Geist and Geist Mono (Google Fonts)
- Contact form: [Web3Forms](https://web3forms.com), key in `VITE_WEB3FORMS_ACCESS_KEY` (`.env` locally, Vercel env vars in production)
- Hosted on Vercel, with Vercel Web Analytics (not loaded on localhost, where its script does not exist)

## Commands

Node 22.18 or newer: the tests and `qa:site` import TypeScript files directly.

```bash
npm install
npm run dev         # dev server
npm test            # unit tests (node --test tests/)
npm run build       # tsc + client build + SSR build + prerender; lists [[placeholders]] left
npm run preview     # serves dist/ on :4173; a missing file is a 404, as on Vercel
npm run cv:check    # checks public/cv/Mihailo-Sebek-CV.pdf (add -- --write to clean its metadata)
```

QA scripts (against `npm run preview`; Playwright is loaded from `PLAYWRIGHT_MODULE`, a local or a global install — see `scripts/qa/_lib.mjs`):

```bash
npm run qa:leak     # email or phone number in plain text anywhere in dist/? (no browser)
npm run qa:a11y     # axe-core, WCAG 2.2 A/AA + best practices, at 375 and 1440 px and with form errors shown
npm run qa:main     # CLS, overflow, console, DevTools issues, nav, contact links, contrast, focus
npm run qa:site     # no-JS, skip link, direct /#anchors + reload, external links 2xx, CV download, QA years, 404s
npm run qa:form     # form states with the Web3Forms API mocked
npm run qa:shots -- widths=320,375,1440 slice=1400   # screenshots → .qa/ (git-ignored)
```

`QA_BASE` points the scripts at another server (default `http://localhost:4173`).

## Where things live

- `src/data/profile.ts` — personal facts (role, QA start date, location, links, education, photo, CV path)
- `src/data/projects.ts` — the project cards, in the order they are shown, and the thesis
- `src/data/contact.ts` — email and phone as character codes. They are never written in plain text in the repo, never shown on the page, and only set on a link when it is clicked (`<ContactLink>`)
- `src/lib/` — the QA-experience label and the contact-form messages (both unit-tested)
- `public/projects/` — screenshots (see the README there); `public/cv/` — the CV PDF; `public/mihailo.jpg` — the CV portrait (500 px); `public/mihailo-sea.jpg` — the portrait by the sea (640 px), shown next to it while one is chosen
- `public/llms.txt` — a short Markdown summary of the site for AI tools
- `scripts/brand-assets.mjs` — `favicon.ico`, `apple-touch-icon.png` and `og.png`; run after `npm run build` when the logo, the first screen's copy, the photo or the colours change

## The CV

`public/cv/Mihailo-Sebek-CV.pdf` is the public CV. `npm run cv:check -- --write` keeps only its Title and Author metadata. The CV holds my phone number on purpose (it is the number behind the Viber and WhatsApp links); `cv:check` fails on any other number.

## Placeholders

Content still missing is written as `[[…]]` and shows highlighted on previews. `npm run build` lists every one left; the production build on Vercel (`VERCEL_ENV=production`, i.e. `main`) fails while any remain. `STRICT_PLACEHOLDERS=1 npm run build` does the same locally.

© 2026 Mihailo Šebek
