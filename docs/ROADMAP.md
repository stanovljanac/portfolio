# MihailoBuilds: plan rada po sesijama

Jedna sesija radi jednu celinu. Sav kontekst je u `CLAUDE.md`, pa nova sesija ne treba ništa iz prethodnih razgovora.

**Stanje rada se prati samo ovde**, u ovom fajlu na radnoj grani `claude/loving-noether-cqi5ff`:
https://github.com/stanovljanac/portfolio/blob/claude/loving-noether-cqi5ff/docs/ROADMAP.md

`main` je produkcija (mihailobuilds.com) i ne menja se do lansiranja (sesija 8).

## Kako pokrenuti sesiju

1. Na claude.ai/code otvori **novu sesiju** na repou `stanovljanac/portfolio`.
2. Kopiraj prompt te sesije (blok ispod naslova) i pošalji ga.
3. Sesija na kraju otvara **PR u `claude/loving-noether-cqi5ff`** i daje preview linkove za obe teme.
4. Pogledaj preview. Ako je dobro, spoji PR (Merge). Ako nije, napiši šta da promeni u istoj sesiji.

**Redosled:**
- **Kodne sesije** idu jedna po jedna, jer sve menjaju iste CSS fajlove: 1 → 2 → 3 → 6 → 7 → 8. Sledeću pokreni tek kad je prethodni PR spojen.
- **Istraživanja** (4 i 5) mogu bilo kad, i paralelno sa ostalim.

**Paralelne sesije** (npr. 4 i 5) menjaju susedne redove u tabeli statusa, pa njihovi PR-ovi mogu da se sudare. Tada sesija spoji radnu granu u svoju i zadrži oba statusa.

## Status

| # | Sesija | Vrsta | Status |
|---|---|---|---|
| 1 | Kobalt: hero, senka telefona, footer | kod | todo |
| 2 | Istaknuta posebna ponuda (traka + navigacija) | kod | todo |
| 3 | Snimci ekrana i nove kartice radova | kod | todo |
| 4 | Istraživanje cena i održavanja | istraživanje | todo |
| 5 | Ime, logo i pravni rizik | istraživanje | todo |
| 6 | Font za Industrial (3 varijante) | kod | todo |
| 7 | Izbor teme i čišćenje (fontovi, CLS, OG) | kod | čeka izbor teme |
| 8 | Finalni sadržaj i lansiranje | kod | čeka 4, 7 i podatke |
| 9 | Šablon ponude i plan obraćanja klijentima | dokument | kasnije |

Statuse ažurira sesija koja završi posao: `todo` → `u toku` → `PR otvoren` → `gotovo`.

## Odluke koje čekaju Mihaila

- **Tema:** Kobalt ili Industrial (posle sesija 1–3 i 6).
- **Font za Industrial** (sesija 6).
- **Cene:** redovne, posebne i održavanje (posle sesije 4).
- **Fotografija** za „O meni".
- **Domen:** potvrda da je `mihailobuilds.com` konačan.
- **Invoice kartica:** šta prikazati, jer sajt odmah vodi na `/login` (sesija 3).

---

## Sesija 1: Kobalt hero, senka telefona, footer

**Cilj:** Kobalt dobija naslov u heroju na način Industriala, jaču senku telefona i novi footer. Industrial ostaje kakav jeste.

**Obim:**
- **Hero naslov (samo Kobalt).** Preuzima obradu iz Industriala:
  - velika slova (`text-transform: uppercase`), najjača težina koju Manrope ima (800), zbijeniji razmak između slova i redova
  - akcenat više nije obojen tekst, nego **marker u boji pozadine**: kobalt pozadina, beli tekst, `box-decoration-break: clone`, isti padding kao na Industrialu
  - prelom kao na Industrialu (1440 px): „…NEEDS MORE THAN **AN**" u drugom redu, „**INSTAGRAM PROFILE.**" u trećem. Ista logika i za srpski naslov.
  - ako je Manrope uppercase preširok (naslov ide u 4+ reda na 1440 ili izgleda nabijeno), napravi i varijantu sa Archivo condensed **samo za hero naslov** na Kobaltu i pokaži Mihailu oba snimka da izabere
- **Senka telefona (samo Kobalt):** tvrda pomerena senka kao na Industrialu (`14px 14px 0`), ali **oko 80%**: pomeraj ~11 px, u kobalt boji. Industrial ostaje kakav je.
- **Footer (samo Kobalt):** redizajn. Industrial footer ostaje **potpuno isti**, da se razlika jasno vidi.
  - Predlog smera: tamna (ink) pozadina; gornji red sa jasnim pozivom („Imate projekat? → Započnite projekat") i podsetnikom na posebnu ponudu dok je `OFFER.open`; ispod kolone (brend + kratak opis / navigacija / kontakt preko `ContactLink` za email, Viber i WhatsApp, bez vidljivih podataka / izbor jezika); donji red sa copyrightom i privatnošću.
  - DOM mora biti isti za obe teme. Novi elementi postoje i u Industrialu, ali su tamo sakriveni CSS-om, tako da Industrial izgleda tačno kao sada.
- **Hint „Opens your email app"** u kontakt bloku ostaje. Može vizuelno diskretnije (manji, prigušeniji), ako i dalje prolazi kontrast ≥ 4.5.

**Gotovo kad:**
- Kobalt hero i footer izgledaju kako je opisano na 320, 375 i 1440 px, za `/` i `/sr/`.
- Industrial se nije promenio; uporedi snimke pre i posle.
- `qa:themes` je čist. Razlika u visini footera je očekivana i navedena u PR-u.

```text
Repo stanovljanac/portfolio. Pre svega: git fetch origin claude/loving-noether-cqi5ff i napravi svoju radnu granu od origin/claude/loving-noether-cqi5ff (ne od main). Pročitaj CLAUDE.md i docs/ROADMAP.md, pa uradi SESIJU 1 (Kobalt: hero naslov, senka telefona, footer) tačno kako je opisana u roadmap-u. Ako nešto zahteva moju odluku, pitaj pre izmena; ostalo uradi samostalno. Na kraju: build i QA iz CLAUDE.md, pogledaj snimke ekrana za obe teme, commit, push, otvori PR u claude/loving-noether-cqi5ff (ne u main), u PR stavi Vercel preview linkove za Kobalt i ?theme=industrial, i ažuriraj status u docs/ROADMAP.md. Odgovaraj mi na srpskom.
```

---

## Sesija 2: Istaknuta posebna ponuda

**Cilj:** posebna ponuda je trenutno glavna stvar koju promovišemo, a zatrpana je u sekciji Usluge. Treba da se vidi odmah i da vodi pravo na nju.

**Obim (obe teme):**
- Blok ponude u `Services.tsx` dobija `id="offer"` i `scroll-margin-top`, da ga fiksna navigacija ne prekrije.
- **Traka iznad navigacije:** tanka traka, npr. „Special offer: the next 3 client projects at a lower price → See the offer" / „Posebna ponuda: sledeća 3 projekta po nižoj ceni → Pogledajte ponudu".
  - Vodi na `#offer`, a sa stranice privatnosti na `/#offer`.
  - Prikazuje se samo dok je `OFFER.open`. Nema dugme za zatvaranje.
  - Na mobilnom je to glavni ulaz, jer su linkovi navigacije ispod 900 px sakriveni.
- **Stavka u navigaciji:** „Offer" / „Ponuda", sa malim bedžom ili akcentom, takođe vodi na `#offer`.
- Tekst ide u i18n (`en.ts`/`sr.ts`) i ne obećava ništa van ponude: samo niža cena za osnovnu izradu, sledeća 3 projekta.
- Traka i navigacija ne smeju da izazovu horizontalni skrol ni na 320 px, niti da pomere sadržaj posle učitavanja.

**Gotovo kad:**
- Klik na traku i na stavku navigacije spušta pravo na ponudu, u obe teme i na oba jezika, i sa stranice privatnosti.
- Sa `OFFER.open = false` traka i stavka nestaju (proveri lokalno pa vrati na `true`).
- `qa:themes` i `qa:site` su čisti.

```text
Repo stanovljanac/portfolio. Pre svega: git fetch origin claude/loving-noether-cqi5ff i napravi svoju radnu granu od origin/claude/loving-noether-cqi5ff (ne od main). Pročitaj CLAUDE.md i docs/ROADMAP.md, pa uradi SESIJU 2 (istaknuta posebna ponuda: traka iznad navigacije i stavka u navigaciji, obe vode na #offer) tačno kako je opisana u roadmap-u. Ako nešto zahteva moju odluku, pitaj pre izmena; ostalo uradi samostalno. Na kraju: build i QA iz CLAUDE.md, pogledaj snimke ekrana za obe teme, commit, push, otvori PR u claude/loving-noether-cqi5ff (ne u main), u PR stavi Vercel preview linkove za Kobalt i ?theme=industrial, i ažuriraj status u docs/ROADMAP.md. Odgovaraj mi na srpskom.
```

---

## Sesija 3: Snimci ekrana i nove kartice radova

**Cilj:** kartice radova izgledaju profesionalno: oštri snimci iste razmere, čitljiv tekst, dobro isečeni.

**Pristup sajtovima:** `*.mihailobuilds.com` je dozvoljen u mrežnim podešavanjima (4. 10. 2026), pa Claude snima sam. Ako `curl -sI https://mbhairsalon.mihailobuilds.com/` ipak ne vraća 200, ne nastavljaj sa snimanjem, nego daj Mihailu tačnu specifikaciju snimaka:
- **Desktop:** Chrome DevTools → Device toolbar → 1440×900, DPR 2 → „Capture screenshot".
- **Mobilni:** 390×844, DPR 3.
- Vrh stranice sa navigacijom, bez kursora i bez otvorenih menija.

**Invoice Generator:** `invoice.mihailobuilds.com` odmah preusmerava na `/login`. Pre snimanja pitaj Mihaila šta kartica treba da prikaže: login stranu, demo stanje ili njegov snimak. Ne prijavljuj se pravim nalogom i ne pravi nalog.

**Obim:**
- **Snimanje** Playwright-om, za sva 4 sajta (MB Hair Salon, Keeper, The Automation Desk, Invoice Generator):
  - desktop 1440×900 na `deviceScaleFactor: 2`
  - mobilni 390×844 na `deviceScaleFactor: 3`
  - vrh stranice sa navigacijom; sačekaj fontove, slike i 3D/canvas animacije; bez kursora
  - salon iz više kadrova (hero, usluge), pa izaberi onaj koji najbolje predstavlja sajt
  - mobilni snimak salona za telefon u heroju zamenjuje privremeni `public/projects/mb-hair-salon-mobile.png`
- **Izvoz:** WebP u više širina za `srcset`/`sizes`, sa `width`/`height` na svakoj slici (bez pomeranja sadržaja). Snimci su ograničeni na vrh stranice, bez full-page traka. Proveri kvalitet na 2x ekranu.
- **Redizajn kartica (obe teme):**
  - svi snimci iste razmere (16:10) u **browser okviru nacrtanom u CSS-u** (traka sa tri tačke i domenom)
  - istaknuta kartica salona: desktop snimak + telefon sa mobilnim snimkom preko ugla
  - ostale kartice veće, sa čitljivim snimkom
  - oznaka „Lični projekat" ostaje
- **Skripta za snimanje** ide u `scripts/`, da može ponovo kad se sajtovi promene.
- Ažuriraj `public/projects/README.txt`. Obriši stare PNG snimke koji se više ne koriste.

**Gotovo kad:**
- Snimci su oštri na 2x ekranu, a tekst na njima je čitljiv kao na pravom sajtu.
- Kartice imaju istu razmeru u obe teme, na 320, 375 i 1440 px.
- `qa:themes` je čist (bez CLS-a od slika).

```text
Repo stanovljanac/portfolio. Pre svega: git fetch origin claude/loving-noether-cqi5ff i napravi svoju radnu granu od origin/claude/loving-noether-cqi5ff (ne od main). Pročitaj CLAUDE.md i docs/ROADMAP.md, pa uradi SESIJU 3 (novi snimci ekrana mojih sajtova i redizajn kartica radova) tačno kako je opisana u roadmap-u. Prvo proveri da li je *.mihailobuilds.com dostupan iz okruženja; ako nije, stani i reci mi šta da uradim. Ako nešto zahteva moju odluku, pitaj pre izmena; ostalo uradi samostalno. Na kraju: build i QA iz CLAUDE.md, pogledaj snimke ekrana za obe teme, commit, push, otvori PR u claude/loving-noether-cqi5ff (ne u main), u PR stavi Vercel preview linkove za Kobalt i ?theme=industrial, i ažuriraj status u docs/ROADMAP.md. Odgovaraj mi na srpskom.
```

---

## Sesija 4: Istraživanje cena i održavanja

**Cilj:** realne cene za prve klijente, sa izvorima. Mihailo bira brojeve; kod se ne menja.

**Pitanja:**
- **Tržište:** koliko freelanceri i male agencije naplaćuju landing stranicu i jednostavan sajt za mali biznis (do ~5 stranica)?
  - Srbija i region (BiH, Crna Gora, Hrvatska)
  - remote za EU (Upwork, Malt, Fiverr Pro, sajtovi freelancera)
  - razdvojiti početnike i iskusne
- **Mesečno održavanje:**
  - šta obično ulazi (hosting, domen, ažuriranja, rezervne kopije, sitne izmene u satima, rok odgovora)
  - koliko se naplaćuje
  - kako se prave nivoi (paketi)
- **Mihailove opcije:**
  - A: 100 € landing / 300 € sajt kao javne cene
  - B: redovno 200 € / 500 €, a posebna ponuda 100 € / 300 € za sledeća 3 projekta
  - održavanje ~200 €/mesečno: da li je realno u odnosu na cenu sajta?
- **Prikaz cena:**
  - „od €X", kako niska početna cena utiče na percepciju kvaliteta, kako se predstavlja ograničena ponuda
  - koliki je uobičajen depozit (%)
  - šta ulazi u osnovnu cenu, a šta su dodaci (forma, zakazivanje, višejezičnost, tekstovi, fotografije)

**Rezultat:** `docs/research/pricing.md`
- kratak zaključak na vrhu (na srpskom)
- tabela preporuka: redovne i posebne cene, održavanje u 2–3 nivoa
- obrazloženje i spisak izvora sa linkovima i datumom

PR sadrži samo taj dokument. Brojeve u `src/data/pricing.ts` upisuje sesija 8, posle Mihailove odluke.

```text
Repo stanovljanac/portfolio. Pre svega: git fetch origin claude/loving-noether-cqi5ff i napravi svoju radnu granu od origin/claude/loving-noether-cqi5ff (ne od main). Pročitaj CLAUDE.md i docs/ROADMAP.md, pa uradi SESIJU 4 (istraživanje cena izrade sajtova i landing stranica i mesečnog održavanja) tačno kako je opisana u roadmap-u. Koristi deep-research skill ako je dostupan. Ne menjaj kod. Rezultat upiši u docs/research/pricing.md (srpski, sa izvorima), commit, push, otvori PR u claude/loving-noether-cqi5ff (ne u main), ažuriraj status u docs/ROADMAP.md i na kraju mi u chatu ukratko daj preporuku.
```

---

## Sesija 5: Ime, logo i pravni rizik

**Cilj:** proveriti da ime, logo i sadržaj ne prave rizik od tužbe ili zabune. **Ovo nije pravni savet**; za konačnu reč treba advokat.

**Pitanja:**
- **Žigovi** „MihailoBuilds" / „Mihailo Builds" i slični nazivi: Zavod za intelektualnu svojinu RS, EUIPO (eSearch/TMview), WIPO Global Brand Database, USPTO.
- **Druge upotrebe imena:** registrovane firme (APR), domeni, društvene mreže.
- **MB monogram:**
  - sličnost sa poznatim „MB" znakovima (npr. Mercedes-Benz) i registrovanim lettermark logoima
  - koliki je realan rizik za jednostavan monogram od dva slova
- **„MB Hair Salon" (demo sajt):**
  - postoje li pravi saloni sa tim imenom
  - da li su izmišljeni podaci na demo sajtu nečiji stvarni (`@mbhairsalon` na Instagramu, domen `mbhairsalon.com` iz demo emaila, telefon, adresa)
  - šta promeniti da nema zabune (samo preporuka; živi sajtovi se ne menjaju iz ovog repoa)
- **Licence:**
  - fotografije i 3D sadržaj na projektnim sajtovima (Unsplash/Pexels ili drugo)
  - fontovi (Manrope, Archivo, JetBrains Mono, IBM Plex Mono: OFL)
  - zastave i logoi trećih strana na sajtu
- **Koraci:** da li i kada registrovati žig (cena i trajanje kod Zavoda), šta uraditi odmah.

**Rezultat:** `docs/research/name-and-legal.md` (srpski)
- tabela rizika (nizak/srednji/visok) sa obrazloženjem
- preporučeni koraci
- izvori i datum provere

Kod se ne menja.

```text
Repo stanovljanac/portfolio. Pre svega: git fetch origin claude/loving-noether-cqi5ff i napravi svoju radnu granu od origin/claude/loving-noether-cqi5ff (ne od main). Pročitaj CLAUDE.md i docs/ROADMAP.md, pa uradi SESIJU 5 (istraživanje imena MihailoBuilds, MB monograma, demo sajta MB Hair Salon i licenci: rizik od tužbe ili zabune) tačno kako je opisana u roadmap-u. Koristi deep-research skill ako je dostupan. Ne menjaj kod. Rezultat upiši u docs/research/name-and-legal.md (srpski, sa izvorima), commit, push, otvori PR u claude/loving-noether-cqi5ff (ne u main), ažuriraj status u docs/ROADMAP.md i na kraju mi u chatu ukratko reci šta je rizično, a šta nije.
```

---

## Sesija 6: Font za Industrial

**Cilj:** Industrial „odskače" zbog uskog Archivo fonta u naslovima, ali deluje novinski. Probati varijante, pa da Mihailo izabere.

**Obim:**
- **Privremeni parametar `&font=a|b|c`** samo za Industrial. Radi kao `?theme=industrial`:
  - URL odlučuje
  - parametar se prenosi na interne linkove
  - skripta u `<head>` sva 4 HTML fajla
- **Varijante:**
  - **a:** Archivo svuda (sadašnje)
  - **b:** Archivo condensed za naslove, Manrope za tekst
  - **c:** Bricolage Grotesque condensed (`wdth` ~75) za naslove, Manrope za tekst
- Snimci sve tri varijante (hero, usluge, kontakt; 375 i 1440 px), poređani jedan pored drugog za Mihaila.
- Posle izbora, u istoj sesiji:
  - pobednik postaje stalni Industrial font
  - parametar i višak fontova se brišu (link za Google Fonts u sva 4 HTML fajla)

**Gotovo kad:**
- Izabrana varijanta je primenjena i nema privremenog parametra.
- Kontrast i geometrija prolaze (`qa:themes`).
- Kobalt se nije promenio.

```text
Repo stanovljanac/portfolio. Pre svega: git fetch origin claude/loving-noether-cqi5ff i napravi svoju radnu granu od origin/claude/loving-noether-cqi5ff (ne od main). Pročitaj CLAUDE.md i docs/ROADMAP.md, pa uradi SESIJU 6 (tri varijante fonta za Industrial temu, ja biram) tačno kako je opisana u roadmap-u. Prvo napravi varijante i pokaži mi snimke, pa čekaj moj izbor pre nego što ga primeniš. Na kraju: build i QA iz CLAUDE.md, commit, push, otvori PR u claude/loving-noether-cqi5ff (ne u main), u PR stavi Vercel preview linkove, i ažuriraj status u docs/ROADMAP.md. Odgovaraj mi na srpskom.
```

---

## Sesija 7: Izbor teme i čišćenje

**Preduslov:** Mihailo je izabrao temu (Kobalt ili Industrial). Prompt počinje izborom.

**Obim:**
- **Brisanje druge teme:**
  - njen blok u `themes.css`
  - skripta za prebacivanje teme u `<head>` sva 4 HTML fajla
  - fontovi te teme
  - `THEMES` i poređenje geometrije u `scripts/qa/` (skripte ostaju, samo za jednu temu)
  - klasa na `<html>` postaje stalna, ili se varijable spajaju u `:root`
- **Fontovi na našem serveru** (umesto Google Fonts):
  - woff2 sa latin + latin-ext (č, ć, š, đ, ž) u `public/fonts/`
  - `@font-face` sa `font-display: swap`
  - `<link rel="preload">` samo za 1–2 ključna fajla
  - rezervni font usklađenih mera (`size-adjust`, `ascent-override`, `descent-override`)
  - cilj: **CLS < 0.05** na 320, 375 i 1440 px
  - ukloniti Google Fonts iz politike privatnosti, ako se pominju
- **Brend fajlovi:**
  - konačni favicon (SVG + PNG/ICO, apple-touch-icon) u boji izabrane teme
  - nove OG slike (`og-en.png`, `og-sr.png`, 1200×630) u novom stilu, preko skripte u `scripts/`
  - `theme-color` meta
- **Brisanje starih fajlova:** `public/logo-lockup*.svg`, `public/mark-aperture*.svg` i svega što se više ne koristi.
- **Dokumentacija:** ažurirati `README.md` i `CLAUDE.md` (bez dela o dve teme).

```text
Repo stanovljanac/portfolio. Pre svega: git fetch origin claude/loving-noether-cqi5ff i napravi svoju radnu granu od origin/claude/loving-noether-cqi5ff (ne od main). Pročitaj CLAUDE.md i docs/ROADMAP.md, pa uradi SESIJU 7 (izbor teme i čišćenje) tačno kako je opisana u roadmap-u. Izabrao sam temu: [KOBALT ili INDUSTRIAL]. Ako nešto zahteva moju odluku, pitaj pre izmena; ostalo uradi samostalno. Na kraju: build i QA iz CLAUDE.md (CLS < 0.05), pogledaj snimke, commit, push, otvori PR u claude/loving-noether-cqi5ff (ne u main), u PR stavi Vercel preview link, i ažuriraj status u docs/ROADMAP.md. Odgovaraj mi na srpskom.
```

---

## Sesija 8: Finalni sadržaj i lansiranje

**Preduslov:** gotove sesije 4 i 7. Mihailo daje cene, rokove, fotografiju i potvrdu domena.

**Obim:**
- **Cene:** upisati u `src/data/pricing.ts` (redovne, posebne, održavanje, sati održavanja).
- **Rokovi** u FAQ-u (`en.ts`/`sr.ts`).
- **Fotografija** za „O meni" (`PHOTO` u `About.tsx`): optimizovana, sa `width`/`height`.
- **Politika privatnosti:** svaka `[[verify]]` / `[[proveriti]]` stavka iz **pravih** uslova Web3Forms-a i Vercela (Web Analytics), uz datum objave. Ništa se ne pogađa; izvori idu u PR.
- **Domen:** `SITE_URL` u `scripts/prerender.mjs` potvrđen. Canonical, hreflang, sitemap i OG koriste pravi domen.
- **Build:**
  - nula placeholdera
  - prerender **pada** ako ostane neki `[[…]]`; tu proveru dodaje ova sesija
- **Web3Forms ključ:** postavljen u Vercel env za produkciju. Jedna prava test poruka, uz Mihailovu saglasnost.
- **Završni QA:** svi `qa:*`, form `key`, ručni pregled na telefonu.
- **Lansiranje:** PR iz `claude/loving-noether-cqi5ff` u `main`. Mihailo ga spaja.

```text
Repo stanovljanac/portfolio. Pre svega: git fetch origin claude/loving-noether-cqi5ff i napravi svoju radnu granu od origin/claude/loving-noether-cqi5ff (ne od main). Pročitaj CLAUDE.md i docs/ROADMAP.md, pa uradi SESIJU 8 (finalni sadržaj i priprema za lansiranje) tačno kako je opisana u roadmap-u. Moji podaci: cene [UPIŠI], rokovi [UPIŠI], fotografija [PRILOŽI], domen [POTVRDI]. Ako nešto zahteva moju odluku, pitaj pre izmena. Na kraju: build i QA iz CLAUDE.md, commit, push, otvori PR u claude/loving-noether-cqi5ff, ažuriraj status u docs/ROADMAP.md, pa mi reci šta je ostalo do PR-a u main. Odgovaraj mi na srpskom.
```

---

## Sesija 9 (kasnije): šablon ponude i plan obraćanja

- **Šablon pisane ponude** (srpski i engleski) koji prati zaključani proces:
  - obim
  - cena i depozit
  - odobrenje dizajna
  - 2 kruga izmena
  - šta je novi posao
  - 30 dana garancije
  - servisi trećih strana
- **Plan obraćanja prvim klijentima:** kome, kojim kanalom, primeri poruka. Bez spama i bez kupljenih lista.
