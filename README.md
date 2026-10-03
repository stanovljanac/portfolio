# MihailoBuilds — Website

The website for **MihailoBuilds**: websites and landing pages for small businesses. Bilingual (English at `/`, Serbian at `/sr/`), light editorial design, prerendered to static HTML.

## Stack

- **Vite + React + TypeScript**, multi-page build: one real HTML file per page and language
- **Prerendered**: each page ships its full content in the HTML and React hydrates it (`src/entry-server.tsx` + `scripts/prerender.mjs`)
- Plain CSS design system: tokens in `src/styles/tokens/` (the site uses `.theme-light`), components in `src/styles/ds.css`, page styles in `src/styles/site.css`
- Contact form via Web3Forms (`VITE_WEB3FORMS_ACCESS_KEY` in `.env` / Vercel env)
- Fonts: Geist, Geist Mono, Instrument Serif (Google Fonts)

## Develop

```bash
npm install
npm run dev      # http://localhost:5173  (Serbian: /sr/)
npm run build    # type-check + build + prerender → dist/
npm run preview  # serve dist/ locally
```

## Pages

| URL | File |
|---|---|
| `/` | `index.html` (en) |
| `/sr/` | `sr/index.html` |
| `/privacy/` | `privacy/index.html` |
| `/sr/privatnost/` | `sr/privatnost/index.html` |

Each HTML file holds that page's `<title>`, description, canonical, hreflang and Open Graph tags. `__SITE_URL__` is replaced with the real domain at build time (set in `scripts/prerender.mjs`). `vercel.json` enforces trailing slashes.

## Where to edit

- **All copy** (both languages): `src/i18n/en.ts`, `src/i18n/sr.ts`
- **Prices and the special offer** (`open: false` hides it once the three spots are taken): `src/data/pricing.ts`
- **Email / phone** (Viber, WhatsApp): `src/data/contact.ts` — stored as character codes and shown via `<Email />` / `<Obfuscated />`, so they never appear as readable text in `dist/` (deters simple scrapers; not a security measure). Use `{email}` in dictionary strings to insert the address.
- **Projects**: `src/data/projects.ts` — screenshots go in `public/projects/`
- **Hero phone screenshot**: `SALON_MOBILE_SHOT` in `src/components/Hero.tsx`
- **Portrait**: `PHOTO` in `src/components/About.tsx`
- **OG images**: `public/og-sr.png`, `public/og-en.png` (1200×630)

## Placeholders

Values written as `[[…]]` are placeholders. `npm run build` lists every one that is left — **none may reach production**. The privacy policy's `[[proveriti]]` items must be checked against the actual terms of Web3Forms, Vercel and Google Fonts, not guessed.
