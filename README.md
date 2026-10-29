# MihailoBuilds — personal site

The personal site of **Mihailo Sebek**: a manual QA engineer and AI enthusiast who builds web projects after hours. Live at [mihailobuilds.com](https://mihailobuilds.com).

One page: hero, projects (three featured, the bachelor-thesis QA project, more projects), how I build, QA experience (with a bug-to-regression-check case study), about, contact. Light theme by default with a dark switch.

## Stack

- **Vite + React 18 + TypeScript**, prerendered to static HTML (`src/entry-server.tsx` + `scripts/prerender.mjs`), hydrated on the client
- Plain CSS: tokens in `src/styles/tokens/` (both themes in `colors.css`), components in `ds.css`, layout in `site.css`
- Fonts: Geist, Geist Mono, Instrument Serif (Google Fonts)
- Contact form: [Web3Forms](https://web3forms.com), key in `VITE_WEB3FORMS_ACCESS_KEY` (`.env` locally, Vercel env vars in production)
- Hosted on Vercel, with `@vercel/analytics`

## Commands

Node 22.18 or newer: the tests and `qa:site` import TypeScript files directly.

```bash
npm install
npm run dev         # dev server
npm test            # unit tests (node --test tests/)
npm run build       # tsc + client build + SSR build + prerender; lists [[placeholders]] left
npm run preview     # serves dist/ on :4173
npm run cv:check    # checks public/cv/Mihailo-Sebek-CV.pdf (add -- --write to clean its metadata)
```

QA scripts (against `npm run preview`; Playwright is loaded from `PLAYWRIGHT_MODULE`, a local or a global install — see `scripts/qa/_lib.mjs`):

```bash
npm run qa:leak     # email address in plain text anywhere in dist/? (no browser)
npm run qa:main     # both themes: CLS, overflow, console, theme before first paint + switch, nav, email, contrast, focus
npm run qa:site     # no-JS, reduced motion, skip link, direct /#anchors + reload, external links 2xx, CV download, QA years
node scripts/qa/form.mjs                             # form states with the Web3Forms API mocked
npm run qa:shots -- widths=320,375,1440 slice=1400   # screenshots → .qa/ (git-ignored)
```

`QA_BASE` points the scripts at another server (default `http://localhost:4173`).

## Where things live

- `src/data/profile.ts` — personal facts (role, QA start date, links, education, CV path)
- `src/data/projects.ts` — the project cards; `FEATURED` / `MORE` set the order
- `src/data/contact.ts` — the email as character codes. It is never written in plain text in the repo, never shown on the page, and only set on a link when it is clicked (`<ContactLink>`)
- `src/lib/` — the QA-experience label and the contact-form messages (both unit-tested)
- `public/projects/` — screenshots (see the README there); `public/cv/` — the CV PDF
- `scripts/brand-assets.mjs` — `favicon.ico`, `apple-touch-icon.png` and `og.png`; run after `npm run build` when the logo, the hero copy or the colours change

## Placeholders

Content still missing is written as `[[…]]` (in `profile.ts`, `projects.ts` and `Qa.tsx`) and shows highlighted on previews. `npm run build` lists every one left; the production build on Vercel (`VERCEL_ENV=production`, i.e. `main`) fails while any remain. `STRICT_PLACEHOLDERS=1 npm run build` does the same locally.

## Theme

`index.html` sets `data-theme` on `<html>` before the first paint (stored choice, else the system setting). `ThemeToggle.tsx` switches it, stores it in `localStorage` and updates `<meta name="theme-color">`; keep the two colour pairs in step.

© 2026 MihailoBuilds
