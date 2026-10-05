# MihailoBuilds — Website

The website for **MihailoBuilds**: websites and landing pages for small businesses. Bilingual (English at `/`, Serbian at `/sr/`), prerendered to static HTML.

> **Temporary:** two visual themes ship side by side for comparison — `/` is **Kobalt**, `/?theme=industrial` is **Industrial** (`src/styles/themes.css`, switch script in each HTML `<head>`). Once one is chosen, delete the other theme, the switch script and the unused fonts.

## Stack

- **Vite + React + TypeScript**, multi-page build: one real HTML file per page and language
- **Prerendered**: each page ships its full content in the HTML and React hydrates it (`src/entry-server.tsx` + `scripts/prerender.mjs`)
- Plain CSS design system: base tokens in `src/styles/tokens/`, themes in `src/styles/themes.css` (`.theme-kobalt`, `.theme-industrial`), components in `src/styles/ds.css`, page styles in `src/styles/site.css`
- Contact form via Web3Forms (`VITE_WEB3FORMS_ACCESS_KEY` in `.env` / Vercel env)
- Fonts (Google Fonts): Manrope + JetBrains Mono (Kobalt), Manrope + condensed Archivo (display headings only) + IBM Plex Mono (Industrial)
- Logo: MB monogram drawn as SVG shapes in `src/components/Logo.tsx` (colored by the theme); `public/favicon.svg`

## Develop

```bash
npm install
npm run dev      # http://localhost:5173  (Serbian: /sr/)
npm run build    # type-check + build + prerender → dist/
npm run preview  # serve dist/ locally
```

## QA

Browser checks use Playwright (not a project dependency; see `scripts/qa/_lib.mjs`) against `npm run preview`:

```bash
npm run qa:leak     # contact data must not appear in dist/
npm run qa:themes   # both themes: layout shift, overflow, console, geometry, contacts, contrast, focus
npm run qa:site     # no-JS, reduced motion, keyboard, anchors, language switch, links
npm run qa:shots -- pages=/ widths=375,1440   # screenshots → .qa/
node scripts/qa/form.mjs nokey|key            # contact form states (Web3Forms mocked)
node scripts/capture-projects.mjs             # recapture the project screenshots (live sites → public/projects/)
```

Working notes for Claude are in `CLAUDE.md`; the session-by-session plan is in `docs/ROADMAP.md`.

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
- **Email / phone** (Viber, WhatsApp): `src/data/contact.ts` — stored as character codes and never shown on the page. `<ContactLink>` (`src/components/Email.tsx`) points to the contact form and gets its real `mailto:` / `viber:` / `wa.me` address only when clicked. This deters scrapers; it is not a security measure. Use `{email}` in dictionary strings for an inline "by email" link.
- **Projects**: `src/data/projects.ts` (cards). Screenshots are made by `node scripts/capture-projects.mjs` (Playwright + sharp): it captures the live sites, exports WebP in several widths to `public/projects/` and regenerates `src/data/shots.ts`. Run it again when a site changes; see `public/projects/README.txt`
- **Hero phone screenshot**: `SALON_MOBILE_SHOT` in `src/components/Hero.tsx` (also from the capture script)
- **Portrait**: `PHOTO` in `src/components/About.tsx`
- **OG images**: `public/og-sr.png`, `public/og-en.png` (1200×630)

## Placeholders

Values written as `[[…]]` are placeholders. `npm run build` lists every one that is left — **none may reach production**. The privacy policy's `[[proveriti]]` items must be checked against the actual terms of Web3Forms, Vercel and Google Fonts, not guessed.
