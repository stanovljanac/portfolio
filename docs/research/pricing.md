# Objavi standardne cene, prva tri projekta naplati manje

Istraživanje cena izrade sajtova, landing stranica i mesečnog održavanja za MihailoBuilds (roadmap, sesija 4). Podaci su prikupljeni 2026-10-04. Dokument daje preporuku. Konačne brojeve bira Mihailo, a u `src/data/pricing.ts` ih upisuje sesija 8.

## Zaključak

- **Opcija B, uz jednu korekciju.** Standardne cene: **landing od €250, sajt za biznis od €500**. Posebna ponuda za sledeća tri klijentska projekta: **landing od €150, sajt od €300**. Prvi klijenti plaćaju skoro isto kao u opciji A. Razlika je u tome što je javno istaknuta viša cena, pa je poskupljenje posle tri projekta najavljeno od prvog dana.
- **Opciju A (€100 / €300 kao jedine javne cene) ne preporučujem.** €100 je cena oglasa i šablonskih ponuda i pokriva oko 4 sata rada po €25/h. Uz to, zaključana posebna ponuda tada nema od koje cene da bude niža.
- **€500 radi i za srpsku i za englesku verziju sajta.** U Srbiji je to gornji deo objavljenih „od“ cena malih studija (€200–500) i ispod hrvatskih malih agencija (€530–700 + PDV). Za EU klijenta je ispod najjeftinijih paketa u Irskoj i Holandiji (€495–949), pa deluje „povoljno“, a ne „sumnjivo jeftino“. Landing od €250 je u rangu WebKraft-a, najbližeg domaćeg konkurenta koji radi sa ručno pisanim kodom.
- **Održavanje od ~€200 mesečno nije realno kao početna cena.** To je €2.400 godišnje, 5–8 puta više od cene izrade. Skuplje je i od gotovo svih regionalnih paketa, koji su obično €20–50, a €140–320 samo za prodavnice i 24/7 podršku. Preporuka su tri nivoa: **€30 / €60 / €100 mesečno**, sa do 1 / 2 / 4 sata sitnih izmena. Hosting i domen klijent plaća direktno, a rad van plana je **€25/h**.
- **Prikaz cena:** „od €X“ uz spisak onoga što je uključeno i nekoliko cena dodataka. Posebna ponuda ide bez precrtane cene, bez procenta i bez reči „umesto“, uz razlog (portfolio) i jasnu standardnu cenu koja važi posle nje. Avans je **50%** po prihvatanju pisane ponude, a ostatak se plaća pre objave.
- **Ograničenja:** sve izvore sam čitao kroz izvode pretraživača, jer je sandbox blokirao direktno otvaranje stranica. Ključne brojeve treba proveriti na samim stranicama. Pravni delovi (referentne cene i popusti po EU i srpskim pravilima, avans ili kapara) nisu pravni savet i treba da ih potvrde advokat i računovođa.

## Preporuka

### Izrada (jednokratno)

| Usluga | Standardna cena | Posebna ponuda (sledeća 3 klijentska projekta) | Avans 50% (standard / ponuda) | Vrednost u `src/data/pricing.ts` |
|---|---|---|---|---|
| Landing stranica (jedna stranica) | **od €250** | **od €150** | €125 / €75 | `PRICING.landing: "250"`, `OFFER.landing: "150"` |
| Sajt za biznis (do 5 stranica) | **od €500** | **od €300** | €250 / €150 | `PRICING.website: "500"`, `OFFER.website: "300"` |

**Osnovna cena** u oba paketa uključuje:
- prilagođen dizajn za desktop i telefon, koji klijent odobrava pre izrade
- izradu po dogovorenoj strukturi
- jedan istaknut način kontakta, uključujući jednostavnu kontakt formu ako je klijent želi
- osnovnu tehničku SEO pripremu i testiranje
- podešavanje i objavu na domenu i hostingu na ime klijenta
- 2 kruga izmena u okviru obima i 30 dana garancije

**Posebna ponuda** važi samo za osnovnu izradu i daje se u zamenu za pravo da se projekat prikaže u portfoliju. Dodaci se naplaćuju po standardnim cenama. Ponuda se zatvara (`OFFER.open: false`) čim se tri projekta ugovore i ne obnavlja se.

### Održavanje (mesečno, bez ugovorne obaveze)

| Nivo | Cena | Sitne izmene | Rok odgovora* | Uključeno | Nije uključeno | Hosting i domen |
|---|---|---|---|---|---|---|
| Osnovno | **€30 / mes.** | do 1 h | 2 radna dana | praćenje dostupnosti i SSL sertifikata; mesečna probna poruka kroz formu i provera limita od 250 poruka; provera linkova ka zakazivanju i drugim servisima; ažuriranje zavisnosti i ponovna objava kad je potrebno; podsetnik za obnovu domena; istorija svih izmena sa mogućnošću vraćanja | nove stranice, sekcije i funkcije; redizajn; zamena celog sadržaja; pisanje tekstova; kvarovi spoljnih servisa (odgovornost provajdera); takse za domen, hosting i servise; neiskorišćeni sati se ne prenose | klijent plaća direktno provajderu, na svoje ime, bez provizije |
| Standard | **€60 / mes.** | do 2 h | 1 radni dan | sve iz Osnovnog i kratak mesečni izveštaj (šta je urađeno, stanje forme i linkova) | kao Osnovno | kao Osnovno |
| Prioritet | **€100 / mes.** | do 4 h | isti radni dan za kvar (sajt ne radi ili forma ne šalje), 1 radni dan za ostalo | sve iz Standarda i tromesečni pregled (brzina, linkovi, zastareo sadržaj) | kao Osnovno | kao Osnovno |

\* Rok odgovora je rok za potvrdu prijave i procenu posla, ne rok za rešenje. Održavanje počinje posle 30 dana garancije.

Na sajtu se prikazuje samo najniži nivo: `PRICING.maintenance: "30"`, `PRICING.maintenanceHours: "1"`. Pri tome treba ispraviti tekst. Sada piše „Do {N} sati“ i „Up to {N} hours“, a to je za N = 1 neispravno. Ispravno je „do 1 sata“ i „up to 1 hour“. Na srpskom za 2–4 ide „sata“, a „sati“ tek od 5.

### Rad van plana i dodaci

| Stavka | Cena | Napomena |
|---|---|---|
| Rad van plana ili bez pretplate | **€25/h** | obračun po započetih 30 minuta; hitno van radnog vremena +50% |
| Blok od 5 sati unapred | €110 | važi 12 meseci; za klijente koji retko menjaju sajt |
| Jednostavna kontakt forma | uključeno | samo ako je klijent želi; Web3Forms je besplatan do 250 poruka mesečno |
| Složenija forma (više koraka, prilog fajla) | od €75 | prilog fajla traži plaćeni Web3Forms plan, koji plaća klijent |
| Forma za zahtev termina (stiže na email) | od €50 | ovo nije online zakazivanje |
| Online zakazivanje preko servisa (npr. Cal.com): povezivanje i ugradnja | od €75 | nalog je na ime klijenta; Cal.com je besplatan za jednog korisnika |
| Rezervacioni sistem po meri | po ponudi | nije deo osnovne ponude |
| Drugi jezik | landing od €100, sajt od €150 | prevod obezbeđuje klijent |
| Dodatna stranica sajta (preko 5) | od €50 | |
| Dodatna sekcija (npr. galerija, cenovnik ili meni na landing stranici) | od €40 | |
| Tekstovi na osnovu beležaka klijenta | od €40 po stranici | uređivanje postojećih tekstova se naplaćuje po satu; tekst ne obećava rezultate |
| Fotografije: obrada i optimizacija dostavljenih | uključeno | profesionalno fotografisanje nije u ponudi |
| Izbor stock fotografija sa besplatnom licencom | od €25 | |
| Podešavanje Google Business Profile-a | od €50 | verifikaciju radi vlasnik; bez obećanja pozicija |

Cene dodataka **nisu preuzete sa tržišta**. Izvedene su iz satnice od €25 i iz odnosa koje objavljuju drugi prodavci: drugi jezik je 30–50% osnovne cene, a dodatna stranica 7–8% (videti odeljak o prikazu cena).

## Srbija i region: studiji objavljuju €200–500 za mali sajt, oglasi idu do €50

Srpski studiji koji objavljuju cene grupišu se u uskom pojasu. Za sajt od 5–10 stranica „od“ cena je **€200–500**:

- SuperSajtovi LITE, €200 ([supersajtovi.rs](https://www.supersajtovi.rs/ponuda/lite-sajt/))
- HP Web Art, €200 ([hpwebart.com](https://hpwebart.com/))
- AM Design, €250 ([amdesign.rs](https://amdesign.rs/cenovnik.html))
- iizradasajtova, €300 za 5–7 stranica „baziran na prilagođenom šablonu“ ([iizradasajtova.com](https://iizradasajtova.com/cenovnik-usluga/izrada-sajta-cena/))
- WebKraft, €300+ ([webkraft.rs](https://webkraft.rs/cenovnik/))
- izrada-sajtova.rs, „od 400 €“ ([izrada-sajtova.rs](https://www.izrada-sajtova.rs/izrada-sajtova/))
- izradawebsajta.co.rs, €499 za do 5 stranica ([izradawebsajta.co.rs](https://www.izradawebsajta.co.rs/cene-izrade-sajtova.html))
- izradawebsajta.co, „od 500 €“ ([izradawebsajta.co](https://izradawebsajta.co/sr/izrada-prezentacionog-sajta/))

Landing stranice su blizu tih cena: HP Web Art €100, iiStudio €150 ([iistudio.rs](https://iistudio.rs/cena-web-sajta/)), WebKraft €250, CDS €300 ([cds.rs](https://cds.rs/cenovnik-usluga-cena-izrade-web-sajta/)) i izradawebsajta.co.rs €399. **WebKraft je najbliže poređenje.** Pored WordPress-a nudi Next.js, landing za €250, sajt do 5 stranica za €300+ i **30 dana garancije**, kao i Mihailo ([webkraft.rs](https://webkraft.rs/cenovnik/)).

Agencijski vodiči tipa „koliko košta sajt“ daju više brojeve. Webant.rs navodi **€300–800 za landing** i **€800–2.500 za sajt od 5–10 stranica** ([webant.rs](https://www.webant.rs/blog/koliko-kosta-izrada-sajta-srbija-2026)). Ti vodiči opisuju viši nivo od cena koje iste agencije objavljuju. To je SEO sadržaj koji podiže očekivanja kupca, a ne cenovnik.

Dno tržišta su oglasi i mikro-studiji:
- na KupujemProdajem: „od 59 evra“ i „od 60€ bez plaćanja unapred“ ([KupujemProdajem](https://www.kupujemprodajem.com/pretraga?keywords=izrada+sajta&so=1))
- na Halo oglasima: „od 50 evra“ ([Halo oglasi](https://www.halooglasi.com/usluge/izrada-sajtova/web-sajtovi/5425643517238))
- KompArt: HTML sajt od 5 stranica od €70 ([kompart.rs](https://www.kompart.rs/-cenovnik/izrada-sajta-cena/))
- IT Usluge: HTML one-page od €99 ([it-usluge.net](https://www.it-usluge.net/izrada-sajta.html))

To su šabloni ili HTML bez faze dizajna, često sa hostingom koji vezuje klijenta za prodavca.

Nijedna anketa ne deli regionalne cene po iskustvu prodavca, pa se razlika između početnika i iskusnih vidi samo po tipu prodavca. Iz pojedinačnih cena u četiri zemlje dobijaju se ovi rasponi:

| Tip prodavca | Landing | Mali sajt |
|---|---|---|
| Početnik ili oglašivač | €50–150 | €70–250 |
| Iskusan freelancer ili mali studio | €150–350 | €250–600 |
| Agencija | €300–800+ | €600–2.500 |

Satnice pokazuju istu sliku. Forum Svet kompjutera (stara tema) navodi **€5–10/h za početnike i oko €20/h sa iskustvom** ([sk.rs](https://www.sk.rs/forum/archive/index.php/t-20992.html)). Pregled zasnovan na Payoneer-ovim podacima daje **$20,88/h** za srpske frilensere ([24sedam.rs](https://24sedam.rs/biznis/privreda/206841/koliko-zaraduju-it-frilenseri/vest)).

Od zemalja u regionu primetno je skuplja samo Hrvatska:
- **BiH:** ulazna agencijska cena je **500 KM (~€256)** za do 5 podstranica, a poslovni sajt košta 1.000 KM (~€511). Isti izvor upozorava da ponude od 150 KM sa oglasa „u 95% slučajeva donose gubitke“ ([dizajnba.com](https://dizajnba.com/cijena-izrade-web-stranice-u-bih/)).
- **Crna Gora:** Lanmi traži **€290 za one-page i €450 za sajt sa više stranica** ([lanmi.me](https://lanmi.me/cijena-izrade-web-sajta/)). VebIT traži €300 uz obavezno održavanje od €19 mesečno najmanje 12 meseci, ukupno €528 u prvoj godini ([vebit.me](https://vebit.me/)). Izradasajta.me navodi tržišne raspone od €1.000 naviše ([izradasajta.me](https://www.izradasajta.me/cijena-izrade-sajta-crna-gora)).
- **Hrvatska:** Voxern nudi do 5 stranica za **€199–249** ([voxern.com](https://voxern.com/)). Etablirane male agencije traže **€530–700 bez PDV-a**: Hortus START je €530 + PDV za do 5 podstranica ([hortus.hr](https://www.hortus.hr/izrada-web-stranica-cijena/)), h1 design one-page €350 plus €70 po stranici, oko €630 za pet ([h1-design.hr](https://www.h1-design.hr/cijena-izrade-web-stranice/)), a WebFlare €700 za 5–10 stranica ([webflare.hr](https://www.webflare.hr/cijene-izrade-web-stranica/)).

Za Mihailove cene to znači sledeće. **€500 je gornji deo srpskog „od“ pojasa, sredina za BiH i Crnu Goru i ispod hrvatskih malih agencija.** Sajt sa ručno pisanim kodom, fazom dizajna i dva kruga izmena ne mora da se takmiči sa oglasima od €50. Treba samo jasno pokazati po čemu se razlikuje.

## EU klijenti: €100–200 izgleda kao Fiverr, €500 kao povoljna ponuda iz bliskog regiona

### Platforme

Na platformama je donji deo tržišta blizu Mihailovog prvobitnog plana:
- **Fiverr:** prosečan landing košta oko **$110–125 (€98–111)** ([Fiverr](https://www.fiverr.com/categories/programming-tech/buy/website-development/landing-page)). Fiverr-ov vodič kroz cene navodi **$100–200 (€89–178)** za landing i **$190–400 (€169–356)** za poslovni sajt; nije sigurno iz kog od dva Fiverr vodiča su ovi brojevi ([Fiverr](https://www.fiverr.com/resources/guides/graphic-design/website-design-costs)). Fiverr zadržava **20%** zarade ([Fiverr](https://www.fiverr.com/resources/guides/business/web-designer-costs)).
- **Fiverr Pro:** proverene usluge počinju od oko **$195–600 (€174–535)**, prema nezavisnom pregledu ([Blaksheep Creative](https://blaksheepcreative.com/web-design/hiring-web-designer-fiverr/)).
- **Upwork:** medijana za web dizajnere je **$15–30/h** ([Upwork](https://www.upwork.com/hire/web-designers/cost/)), a za početnike $10–25/h ([Upwork](https://www.upwork.com/resources/upwork-hourly-rates)). Fiksne cene landing stranica za početni do srednji nivo su **$300–1.500 (€267–1.336)**, a u katalogu ima ponuda od $60 ([Upwork](https://www.upwork.com/services/browse/landing-page-design)). Naknada je od 1. maja 2025. promenljiva, **0–15% po ugovoru** ([Upwork Help](https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee)). Upwork klijentima izričito navodi „značajno nižu ponudu od konkurencije“ kao znak upozorenja ([Upwork](https://www.upwork.com/resources/hiring-process-red-flags-in)).
- **Malt** je tržište dnevnica. Web dizajneri sa iskustvom imaju prosek **€371 dnevno**, a WordPress developeri €391 ([Malt](https://www.malt.com/en-gb/a/freelance/web-graphic-design/webdesigner), [Malt](https://www.malt.com/en-gb/t/average-freelance-rates/it/back-end-developer/wordpress-developer)). Prema sekundarnom izvoru, juniori u Parizu imaju €380–450 dnevno ([Freelance-Solution](https://www.freelance-solution.fr/tarif-freelance/tjm-developpeur-web/)). Provizija je 10% bez PDV-a ([Malt Help](https://help.malt.com/hc/en-150/articles/29539691425938-How-does-the-Malt-commission-work-for-freelancers)). Nije potvrđeno da freelancer iz Srbije može da se registruje na Malt-u.
- **Specijalizovane platforme** su još skuplje. Codeable počinje od **$2.500** za sajt ([Codeable](https://codeable.io/pricing/)), a Framer Experts od budžeta od **$1.000** ([Framer](https://www.framer.com/experts/)). Jedino Contra ne uzima proviziju od freelancera ([Jobbers](https://www.jobbers.io/freelance-platforms-that-dont-take-a-cut-in-2026-complete-review-comparison/)).

### Cenovnici freelancera i malih studija u EU

Ovo je najkorisnije poređenje:
- **Holandija:** najjeftiniji one-pager je **€449** ([Aslan Webtech](https://aslanwebtech.nl/prijzen/)), zatim €599 ([OnePagerWebsite.nl](https://www.onepagerwebsite.nl/)).
- **Nemačka:** Alunah počinje od €500 za one-pager i od €1.500 za sajt sa više stranica ([alunah.de](https://alunah.de/webdesign-preise/)).
- **Irska:** paket do 8 stranica počinje od **€495 + PDV** ([Affordable Websites](https://www.affordablewebsites.ie/website-design-packages/)). WebEngineer.ie nudi sajt za €599 ili za €0 unapred plus €50 mesečno ([webengineer.ie](https://www.webengineer.ie/affordable-web-design/)).
- **Velika Britanija:** freelanceri traže **£800–3.000 (€941–3.528)** za mali sajt, najčešće £1.200–2.000 ([ExpertSure](https://www.expertsure.com/uk/web-design/freelance-web-designer-costs/)).
- **Poljska:** freelanceri traže 1.500–4.000 PLN (€343–914) za sajt od 3–5 stranica i procenjuju 10–20 sati rada; nije sigurno iz kog poljskog izvora su ovi brojevi ([Robienastronie](https://robienastronie.pl/blog/ile-kosztuje-strona-internetowa/)).

**Poljski studio KODA ima proces najsličniji Mihailovom.** Radi ručno pisan kod bez šablona, makete se odobravaju pre kodiranja, a ugovor sadrži obim i rok. Uzima **30% avansa** i daje 14 dana garancije. Cene su **€662 za landing i €891 za sajt do 5 podstranica** ([kodastrony.pl](https://kodastrony.pl/cennik/)).

### Popust zbog nižih troškova u regionu

Ovaj popust postoji, ali kod satnice. Niko ne definiše granicu ispod koje je cena „sumnjivo jeftina“. Upwork-ove stranice za Srbiju prikazuju web dizajnere na **$35–65/h** i front-end developere na $13–40/h ([Upwork RS](https://www.upwork.com/hire/web-designers/rs/), [Upwork RS](https://www.upwork.com/hire/front-end-developers/rs/)). Agencije za zapošljavanje tvrde da je Srbija 40–65% jeftinija od zapadne Evrope, ali to je marketinška tvrdnja ([Mobilunity](https://mobilunity.com/blog/hire-developers-in-serbia/)).

Ako se taj popust primeni na najniže zapadne cene (€450–600 za one-pager, €500–1.700 za mali sajt), dobija se grubo **€160–360 za landing i €175–1.000 za sajt**. To je moj proračun, a ne podatak iz izvora. Preporučenih €250 / €500 ulazi u te pojaseve. Landing od €100 je ispod njih i EU kupcu liči na Fiverr.

Ako Mihailo nekad bude prodavao preko platformi, naknada menja računicu. Da bi mu ostalo €500, cena bi na Fiverr-u morala da bude oko €625, a na Upwork-u oko €560–590.

| Tržište i tip prodavca (EUR, preračunato) | Landing | Sajt do 5 stranica |
|---|---|---|
| Region, početnici i oglasi | €50–150 | €70–250 |
| Region, iskusni freelanceri i mali studiji | €150–350 | €250–600 |
| Srbija, agencijski vodiči | €300–800 | €800–2.500 (5–10 stranica) |
| Hrvatska, male agencije | €300–350 | €530–700 + PDV |
| Fiverr, tipično | €89–178 | €169–356 |
| Fiverr Pro, donja granica | €174–535 | €174–535 i više |
| Upwork, fiksno (početni do srednji nivo) | €267–1.336 | nema podatka |
| Poljska: freelanceri / KODA | €114–685 / €662 | €343–914 / €891 |
| Irska i Holandija, paketi | €449–899 | €495–949 |
| Nemačka i Velika Britanija, freelanceri | €470–1.764 | €941–3.528 |
| **MihailoBuilds, preporuka (standard / ponuda)** | **€250 / €150** | **€500 / €300** |

## Održavanje: statičan sajt opravdava €30–100 mesečno, a €200 samo kao plan po dogovoru

### Region

U Srbiji i regionu objavljeno održavanje malog prezentacionog sajta je uglavnom **€20–75 mesečno**. Najčešća srpska cena u naslovu je „€50 mesečno“ ([sajtpress.rs](https://sajtpress.rs/odrzavanje-sajta/), [euproweb.com](https://euproweb.com/index.php/odrzavanje-sajtova.html)). Primeri:
- **izrada-sajtova.rs** ima četiri paketa bez ugovorne obaveze: **4.500 / 6.000 / 7.500 / 20.000 RSD (€38 / €51 / €64 / €170)**. Niži paketi pokrivaju ažuriranje WordPress-a i plugin-a, rezervne kopije i proveru linkova. Izmene teksta i fotografija ulaze tek u treći paket ([izrada-sajtova.rs](https://www.izrada-sajtova.rs/odrzavanje-sajtova/)).
- **odrzavanjewebsajta.rs** traži **10.800 RSD (€92)** sa do 3 sata intervencija ([odrzavanjewebsajta.rs](https://odrzavanjewebsajta.rs/cena-odrzavanja-web-sajta/)).
- **Happy Media** ima pakete od €90, €140 i €320, gde je najviši za prodavnice i 24/7 podršku ([happymedia.rs](https://happymedia.rs/en/blog-maintenance-cost)). Na srpskoj stranici oglašava održavanje „već od 30 eur“ ([happymedia.rs](https://happymedia.rs/odrzavanje-sajta/)).
- **Reload i Sensemake** dele isto: **od €50** za osnovno održavanje, **od €150** za prodavnice i česte izmene ([reload.rs](https://reload.rs/blog/odrzavanje-sajta-sta-obuhvata/), [sensemake.rs](https://sensemake.rs/cena-izrade-sajta/)).
- **Hrvatska:** ITEH Sistemi traži €20 za rezervnu kopiju i praćenje dostupnosti, **€50 sa 45 minuta izmena** i €100 sa 60 minuta ([iteh-sistemi.hr](https://iteh-sistemi.hr/usluge/odrzavanje-web-stranice)). Hortus traži od €33 ([hortus.hr](https://www.hortus.hr/izrada-web-stranica-cijena/)).
- **BiH:** DizajnBA traži 80–150 KM (€41–77) ([dizajnba.com](https://dizajnba.com/odrzavanje-web-stranice-bih-cijene/)).
- **Crna Gora:** vebIT ima pakete od €19, €34 i €49 ([vebit.me](https://vebit.me/)).

Rokovi odgovora se retko objavljuju. 50eurwebsite.rs navodi do 48 sati, uz satnicu od 1.800 RSD (€15), obračun po pola sata i +50% van radnog vremena ([50eurwebsite.rs](https://50eurwebsite.rs/cenovnik-usluga/)).

### Velika Britanija i SAD

Kod freelancera i malih studija ulazni plan košta oko **€45–90 mesečno**, sa 0–1 sat izmena. Gotovo uvek uključuje hosting.
- **Static Web Studio:** $79 / $149 / $349 mesečno, sa **1 / 4 / 10 izmena** i odgovorom za **2 dana / 1 dan / isti dan**. Izrada kod njih počinje od $999 ([staticwebstudio.com](https://staticwebstudio.com/pricing)).
- **Melanie's Small Design:** cena po veličini sajta, $50 / $75 / $100; izričito isključuje nove funkcije i nove stranice ([melaniesmalldesign.com](https://melaniesmalldesign.com/website-care-plans/)).
- **Twingenuity:** $65 sa 30 minuta podrške ([twingenuitygraphics.com](https://twingenuitygraphics.com/website-care-plan/)).
- **Magical Design:** £75 sa do 1 sat izmena ([magicaldesign.co.uk](https://www.magicaldesign.co.uk/support-maintenance-packages)).
- **Tuesday Core** (~€170, $199): **10 zahteva za izmenu i odgovor za 48 sati**. Prodaje se uz izrade od više hiljada dolara ([tuesday.is](https://www.tuesday.is/blog/website-maintenance-pricing-guide-2026/)).

Pregled više od 100 agencijskih planova našao je da je većina između $100 i $150 mesečno ([AgencyKit](https://agencykit.tech/blog/website-care-plans/), [The Admin Bar](https://theadminbar.com/2026-survey/)). Pri poređenju treba oduzeti hosting, jer planovi koji ga uključuju izgledaju skuplje ([Ketchup Consulting](https://ketchupconsulting.com/insights/website-maintenance-plan-cost-2026/)). Mihailov klijent plaća hosting sam, pa je Mihailovo održavanje čist rad. Zato treba da bude ispod ovih brojeva, a ne iznad.

### Kako se prave nivoi

Nivoi se u praksi razlikuju po četiri stvari: uključeno vreme ili broj izmena, rok odgovora, učestalost provera i izveštaj. AgencyKit preporučuje da svaki nivo ima naveden rok odgovora (**2 radna dana, 1 radni dan, isti radni dan**) i mesečni izveštaj, „jer klijenti otkazuju ono što ne vide“. U srednjem nivou su kod njih i testiranje forme i provera linkova ([AgencyKit](https://agencykit.tech/blog/website-care-plans/)).

Neiskorišćeni sati se obično ne prenose. Gde se prenose, prenos je ograničen na 25–50% mesečnog fonda ([Kahunam](https://kahunam.com/services/website-retainer/), [Beancount](https://beancount.io/blog/2026/04/24/retainer-agreement-template-service-business-guide)). Treći model, pored mesečnog plana i satnice, su sati plaćeni unapred: The Turn Group prodaje sate koji ne ističu ([theturngroup.com](https://www.theturngroup.com/website-support-services)). StudioV iz Crne Gore daje 10% popusta za šest i 20% za dvanaest meseci plaćenih unapred ([studiov.website](https://studiov.website/odrzavanje-sajta/)).

### Statičan sajt traži manje posla od WordPress-a

Masuyo Digital navodi **£25–60 mesečno za statične i Next.js sajtove**, naspram £40–100 za WordPress ([masuyodigital.com](https://masuyodigital.com/guides/website-care-plans)). Svi pronađeni regionalni paketi naplaćuju WordPress poslove: ažuriranje jezgra, plugin-a i tema, skeniranje virusa i optimizaciju baze. Na Mihailovim sajtovima tih poslova nema.

Pošten spisak poslova za statičan sajt je kraći:
- praćenje dostupnosti i SSL-a
- mesečna probna poruka kroz Web3Forms formu
- provera linkova ka Cal.com-u ili drugom servisu
- povremeno ažuriranje zavisnosti i ponovna objava
- podsetnik za obnovu domena
- sitne izmene sadržaja

„Rezervne kopije“ ne treba prodavati kao posebnu stavku, jer je ceo sajt u git-u. Tačniji opis je „istorija svih izmena i mogućnost vraćanja“. Klijent zato plaća pre svega **rezervisano vreme i rok odgovora**, a ne tehničke provere.

### Zašto €200 mesečno ne odgovara ceni sajta

Poređenje sa cenom izrade pokazuje koliko je €200 visoko:
- Uobičajeno pravilo je **15–20% cene izrade godišnje** ([refact.co](https://refact.co/insights/digital-product/website-maintenance-cost)). Za sajt od €500 to je €75–100 godišnje.
- Mali studiji u praksi traže oko 6–8% cene izrade mesečno: Static Web Studio $79 uz izradu od $999, Neuron Web $149 uz izradu od $2.499 ([staticwebstudio.com](https://staticwebstudio.com/pricing), [neuronweb.dev](https://neuronweb.dev/insights/static-vs-wordpress-total-cost/)). Za sajt od €500 to je €30–40 mesečno.
- **€200 mesečno je €2.400 godišnje.** To je 4,8 puta više od sajta od €500 i 8 puta više od sajta od €300, i više od skoro svakog regionalnog premium paketa.
- Po satnici od €25, €200 kupuje 8 sati mesečno. Mali statičan sajt toliko retko troši.

Zato €200 ima smisla samo kao plan po dogovoru za klijenta sa nedeljnim izmenama (meni, događaji, akcije), a ne kao objavljena početna cena. Preporučeni nivoi od €30 / €60 / €100 prate regionalni ulaz (€30–50) i britansku i američku praksu za statične sajtove. Satnica od €25 je iznad regionalnih studijskih satnica (€10–15) i blizu gornje granice početničkih satnica na Upwork-u ($10–25).

### Hosting i drugi troškovi klijenta

Klijent je vlasnik domena i naloga, pa se ništa ne preprodaje i ne naplaćuje sa maržom. Realni godišnji troškovi su mali:
- **.rs domen od 2026. košta 2.040 RSD sa PDV-om (~€17)**, a .com kod domaćih registara oko 1.450–1.800 RSD (€12–15) ([srpske.rs](https://srpske.rs/vesti/ekonomija/2026/09/06/registracija-domena-cene-rs-i-com-u-2026)).
- Cloudflare Pages ima besplatan plan koji dozvoljava komercijalnu upotrebu ([flaviocopes.com](https://flaviocopes.com/hosting-free-tiers/)).
- Web3Forms je besplatan do **250 poruka mesečno** ([web3forms.com](https://web3forms.com/pricing)), a Cal.com za jednog korisnika ([cal.com](https://cal.com/pricing)).

Bez Vercel-a to je ukupno oko **€15–25 godišnje**.

**Vercel Hobby nije opcija za klijentske sajtove.** Vercel ga ograničava na nekomercijalnu ličnu upotrebu. Kao komercijalnu upotrebu navodi i to da je neko „plaćen da napravi, ažurira ili hostuje sajt“ i „reklamiranje prodaje proizvoda ili usluge“ ([Vercel](https://vercel.com/docs/plans/hobby)). Vercel Pro košta **$20 mesečno (~€17)**, što bi klijentu dodalo oko €206 godišnje ([Vercel](https://vercel.com/docs/plans/pro-plan)). Isto pravilo treba proveriti i za sam MihailoBuilds sajt ako je na Hobby planu, jer i on reklamira uslugu.

Netlify-jev besplatan plan ima 300 kredita mesečno, a jedna produkciona objava troši 15 ([netli.fyi](https://netli.fyi/blog/netlify-pricing-and-limits)). To je oko 20 objava mesečno, pa plan sa mnogo sitnih izmena može primetno da ga troši. Netlify je 2021. naveo da je komercijalna upotreba besplatnog plana dozvoljena, ali da preprodaja hostinga traži plaćeni plan ([Netlify forum](https://answers.netlify.com/t/can-we-use-netlify-free-plan-for-commercial-purposes/41545)).

I Mihailov alat za praćenje dostupnosti mora da dozvoljava komercijalnu upotrebu. Besplatni UptimeRobot je od kraja 2024. samo za ličnu upotrebu, a najjeftiniji plaćeni plan košta oko $9–10 mesečno, za sve klijente zajedno ([notifier.so](https://notifier.so/guides/uptimerobot-pricing-2026/)). Taj trošak je uračunat u nivo Osnovno.

## Opcija B pobeđuje A: prvi klijenti plaćaju isto, a viša cena je najavljena

### Opcija A

Opcija A stavlja **€100** u isti red sa „Start“ paketom HP Web Art-a (€100), one-page ponudom IT Usluga (€99) i oglasima od €59–60 ([hpwebart.com](https://hpwebart.com/), [it-usluge.net](https://www.it-usluge.net/izrada-sajta.html), [KupujemProdajem](https://www.kupujemprodajem.com/pretraga?keywords=izrada+sajta&so=1)). Praktično je jednaka proseku za landing na Fiverr-u. Nasuprot tome, €300 za sajt je verodostojna ulazna cena studija: tu su iizradasajtova, WebKraft i „Profesionalni“ paket StartUp Solutions sa dva kruga revizija ([iizradasajtova.com](https://iizradasajtova.com/cenovnik-usluga/izrada-sajta-cena/), [webkraft.rs](https://webkraft.rs/cenovnik/), [izradawebstranica.rs](https://izradawebstranica.rs/izrada-sajtova-cena)).

Opcija A ima tri problema:
1. **Računica.** Po €25/h, €100 je 4 sata, a €300 je 12 sati. To ne pokriva dizajn koji klijent odobrava, dva kruga izmena i 30 dana garancije.
2. **Posebna ponuda gubi smisao.** Zaključana ponuda tada nema od koje cene da bude niža, pa bi morala da spusti cene ispod €100 / €300.
3. **Kasnije poskupljenje.** Niska javna cena postaje referenca prema kojoj se meri svaka kasnija cena ([tutor2u](https://tutor2u.net/economics/topics/reference-pricing)). Bez najavljene standardne cene, prelazak na €200 / €500 izgleda kao obično poskupljenje.

Prednost A je jednostavnost, jer ne otvara pitanje referentne cene.

### Opcija B

Opcija B daje prvim klijentima iste cene kao A, ali javno pokazuje cenu koja važi posle njih. €500 je verodostojna referentna cena. Jednaka je ceni izradawebsajta.co i ispod pojasa od €600–1.500 koji srpski agencijski vodiči navode za mali poslovni sajt ([izradawebsajta.co](https://izradawebsajta.co/sr/izrada-prezentacionog-sajta/), [da.org.rs](https://da.org.rs/blog/izrada-sajta-cena-srbija)). Istraživanja referentnih cena pokazuju da verodostojna viša cena podiže percipiranu vrednost, a neverodostojna deluje suprotno (Urbany, Bearden i Weilbaker 1988, prema sekundarnom sažetku) ([CU Boulder](https://vivo.colorado.edu/display/pubid_59911)).

Slabost B je dubina popusta: **50% na landing i 40% na sajt**. Objavljeni primeri ponuda za prve klijente daju **20–25%**: The Yellow Labs 20% za prvih pet klijenata, a jedan freelancer 25% za tri mesta ([The Yellow Labs](https://www.theyellowlabs.com/founding-clients), [GitHub](https://github.com/nick-ramos/Ramappsolutions/pull/2)). Jedan savet ograničava popust na 25–30%, ali nije sigurno ko je autor ([GigForge](https://gigforge.io/blog/how-to-build-freelance-portfolio-that-wins-clients)). Dublji popust je ovde opravdan, jer Mihailo nema nijednu komercijalnu referencu, a zauzvrat dobija pravo da rad prikaže. Procenat popusta ne treba isticati.

### Preporučena korekcija: landing €250 / €150

Korekcija menja samo landing: **€250 standardno, €150 u ponudi.** Time se dobija sledeće:
- Oba popusta postaju 40%.
- Ponuda za landing ne pada na dno oglasa od €100.
- Odnos landing : sajt postaje 0,5. Na tržištu je taj odnos 0,5–0,83: HP Web Art €100 / €200, iiStudio €150 / €296, Lanmi €290 / €450, KODA €662 / €891, WebKraft €250 / €300 ([hpwebart.com](https://hpwebart.com/), [iistudio.rs](https://iistudio.rs/cena-web-sajta/), [lanmi.me](https://lanmi.me/cijena-izrade-web-sajta/), [kodastrony.pl](https://kodastrony.pl/cennik/), [webkraft.rs](https://webkraft.rs/cenovnik/)). Landing zahteva skoro isti dizajn kao početna stranica sajta, pa ga odnos 0,4 iz opcije B potcenjuje.

Po €25/h, standardne cene odgovaraju **10 sati za landing i 20 sati za sajt**. To se slaže sa poljskom procenom od 10–20 sati za sajt od nekoliko stranica ([Robienastronie](https://robienastronie.pl/blog/ile-kosztuje-strona-internetowa/)) i ostvarivo je uz Mihailovu postojeću bazu koda. Cene iz ponude (€150 / €300, oko 6 i 12 plaćenih sati) su svesno ulaganje u prva tri projekta za portfolio. Ako Mihailo radije ostane na opciji B kako je predložena, i to je održivo; razlika je €50 po landing stranici.

| | A | B (predlog) | B (preporuka) |
|---|---|---|---|
| Landing: javna cena / prva tri projekta | €100 / nema ponude | €200 / €100 | €250 / €150 |
| Sajt: javna cena / prva tri projekta | €300 / nema ponude | €500 / €300 | €500 / €300 |
| Popust u ponudi (landing / sajt) | nema | 50% / 40% | 40% / 40% |
| Odnos landing : sajt | 0,33 | 0,40 | 0,50 |
| Sati rada po €25/h, javna cena (landing / sajt) | 4 / 12 | 8 / 20 | 10 / 20 |
| Kasnije poskupljenje | obično poskupljenje | najavljeno | najavljeno |
| Pitanje referentne cene | ne postoji | rešava se načinom prikaza | rešava se načinom prikaza |

## Prikaz cena: „od €X“ sa spiskom uključenog, ponuda bez precrtane cene

### „Od €X“ privlači prave upite ako je jasno šta pokriva

„Od“ cena je regionalni standard. Većina studija objavljuje 3–4 paketa sa „od €X“ i napomenom da konačna cena sledi posle razgovora ([iizradasajtova.com](https://iizradasajtova.com/cenovnik-usluga/izrada-sajta-cena/), [webkraft.rs](https://webkraft.rs/cenovnik/), [legatech.hr](https://legatech.hr/izrada-web-stranica-cijena/)). Kupci očekuju da vide bar okvir cene, a objavljena cena smanjuje broj upita bez budžeta. Mana je što se kupac drži najnižeg broja ([Invoice Ninja](https://invoiceninja.com/display-prices-freelance-website/)).

Zato uz „od“ cenu treba da stoji šta tačno pokriva i nekoliko cena dodataka. Po želji se može dodati i tipičan primer, npr. „sajt od 5 stranica sa formom i drugim jezikom: oko €650“. Neki regionalni prodavci obećavaju da je cena dogovorena u prvom razgovoru konačna ([izrada-sajtova.rs](https://www.izrada-sajtova.rs/izrada-sajtova/)); kod Mihailo-a tu ulogu ima pisana ponuda sa obimom, cenom i rokom. „Vrednost“ pored cene, kakvu koristi iiStudio („vrednosti skoro 430€“, [iistudio.rs](https://iistudio.rs/cena-web-sajta/)), bolje je izbeći, jer je teško dokazati.

Niska cena utiče na percepciju kvaliteta umereno, ali ne presudno:
- Meta-analiza 36 studija našla je pozitivnu vezu cene i percipiranog kvaliteta srednje jačine, **η² = 0,12** ([Rao i Monroe 1989](https://carlsonschool.umn.edu/sites/carlsonschool.umn.edu/files/2024-06/Rao%20and%20Monroe%201989.pdf)).
- Kasnija meta-analiza pokazuje da je efekat vremenom slabio, da je **slabiji kod usluga** i kod kupaca koji poznaju proizvod, a nešto jači u evropskim uzorcima ([Völckner i Hofmann 2007](https://ideas.repec.org/a/kap/mktlet/v18y2007i3p181-196.html)).

Za Mihailov slučaj to znači da je glavni rizik niske cene pozicija na tržištu. U Srbiji €100 stoji pored šablona od €50–150, a EU kupcu liči na Fiverr. Što kupac ima više drugih znakova kvaliteta, cena manje odlučuje. Mihailovi znakovi su živi projekti, pisan proces, dva kruga izmena, 30 dana garancije i testiranje kao deo posla.

Među freelancerima je raširena tvrdnja da jeftin rad privlači zahtevnije klijente koji šire obim posla, ali ona je anegdotska ([Hacker News](https://news.ycombinator.com/item?id=9492556)); nije nađena studija koja je dokazuje. Protiv tog rizika rade jasna pravila obima i avans, a ne cena.

### Posebna ponuda: standardna cena se prikazuje kao buduća, a ne kao „stara“

**Pravila u EU.** Pravilo o „najnižoj ceni u poslednjih 30 dana“ (član 6a Direktive 98/6/EZ, primenjuje se od 28. maja 2022) odnosi se na robu. Evropska komisija navodi da se ne primenjuje na usluge ([EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52021XC1229%2806%29), [Evropska komisija](https://commission.europa.eu/law/law-topic/consumer-protection-law/unfair-commercial-practices-law/price-indication-directive_en)). To ne znači da je sve dozvoljeno. Direktiva o nepoštenoj poslovnoj praksi i dalje zabranjuje obmanjujuće tvrdnje o posebnoj cenovnoj prednosti prema potrošačima, a odnose između firmi delimično pokriva Direktiva 2006/114/EZ o obmanjujućem oglašavanju ([EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A52021XC1229%2805%29)).

**Pravila u Srbiji:**
- Novi Zakon o zaštiti potrošača („Sl. glasnik RS“ 35/2026) primenjuje se od 2. avgusta 2026, a odredbe o isticanju cena na sajtu trgovca od 1. maja 2026 ([Paragraf](https://www.paragraf.rs/dnevne-vesti/080626/080626-vest1.html), [IPC](https://www.ipc.rs/vest/novi-zakon-o-zastiti-potrosaca-odredbe-koje-se-primenjuju-od-1-maja-2026-godine_v2452)). Prema sažecima advokatskih kancelarija, prethodna cena kod sniženja je najniža cena robe u 30 dana pre sniženja, a akcija traje najviše 60 dana ([JMS Law](https://jmslaw.rs/blog/sta-donosi-novi-zakon-o-zastiti-potrosaca-2026/)).
- Potrošač je samo fizičko lice koje kupuje van svoje delatnosti. Firme i preduzetnici koji naručuju sajt za posao zato nisu zaštićeni tim zakonom ([Harmonius](https://www.harmonius.org/sr/pravni-izvori/jugoistocna-evropa/privatno-pravo/srbija/Zakon_o_za%9Atiti_potro%9Aa%E8a.pdf)).
- Zakon o trgovini, prema izvodu, zabranjuje oglašavanje sniženja kada prethodna cena nije istinita ili je važila zanemarljivo kratko ([Biznis.rs](https://biznis.rs/vesti/trgovci-ne-smeju-da-mame-kupce-laznim-snizenjima-i-popustima/)).
- Zakon o oglašavanju navodi cenu i način njenog obračuna kao ključne za ocenu da li je oglas obmanjujući ([Zakon o oglašavanju](https://www.becej.rs/wp-content/uploads/2021/05/Zakon-o-oglasavanju.pdf)).

**Bezbedan oblik prikaza.** Iz ovoga sledi sledeće, uz potvrdu advokata. Rizičan je oblik „redovna cena €500, sada €300“ sa precrtanom cenom koja nikad nije naplaćena. Bezbedniji je oblik koji sajt već ima:
- Blok „Usluge i početne cene“ pokazuje standardne cene, koje stvarno važe za svaki projekat van tri mesta.
- Blok „Posebna ponuda“ kaže zašto ponuda postoji (portfolio), koliko mesta ima, šta pokriva (samo osnovnu izradu) i šta klijent daje zauzvrat (pravo da se rad prikaže).
- Nema precrtavanja, procenta, reči „umesto“, „stara cena“ ili „redovna cena“, roka ni brojača.
- Kada se tri projekta ugovore, `OFFER.open` se postavlja na `false` i ponuda se ne obnavlja. Posle toga se standardna cena zaista naplaćuje.

Ako ponudu prihvati fizičko lice, advokat treba da potvrdi da li se pravila o 30 i 60 dana primenjuju i na usluge.

**Recenzija nikad ne sme biti uslov za ponudu.** Google-ova pravila za Maps zabranjuju nuđenje popusta, besplatnih usluga ili bilo kakve nagrade u zamenu za recenziju. Molba za iskrenu recenziju bez nagrade je dozvoljena ([Google](https://support.google.com/contributionpolicy/answer/7400114?hl=en)). Prijavljene kazne su blokada novih recenzija (navodno na 30 dana), uklanjanje postojećih i upozorenje kupcima ([Sixth City Marketing](https://www.sixthcitymarketing.com/2024/09/26/review-restrictions/)). Postojeći tekst na sajtu („Ako ste zadovoljni saradnjom, biće mi drago da podelite i svoje iskreno iskustvo“) je bezuslovan i u redu je. Isto treba da važi i u pisanoj ponudi i ugovoru.

### Avans: 50% po prihvatanju ponude, ostatak pre objave

Za male projekte najčešće se navodi **50% unapred i 50% na isporuci**:
- Penly piše da je 50% uobičajeno za projekte ispod $500, a 25–33% za veće ([Penly](https://penly.it.com/blog/how-to-collect-a-deposit-from-freelance-clients)).
- The CX Toolbox naziva 50/50 osnovnim modelom za male projekte, a za veće predlaže 40/40/20, sa poslednjom ratom pre objave ([The CX Toolbox](https://thecxtoolbox.com/client-experience/website-design-payment-terms/)).
- KODA uzima 30% ([kodastrony.pl](https://kodastrony.pl/cennik/)), a Hortus naplaćuje u dve rate ([hortus.hr](https://www.hortus.hr/izrada-web-stranica-cijena/)).
- Srpski izvori za 50/50 su slabi ([svilenkovic.com](https://svilenkovic.com/usluge/izrada-sajta-prague)).

Kod Mihailovih iznosa (€75–250 avansa) plaćanje u tri rate samo dodaje administraciju. Preporuka: **50% avansa po prihvatanju pisane ponude, 50% pre objave na domenu klijenta.**

**Avans ili kapara.** Po Zakonu o obligacionim odnosima, novac dat unapred je **avans** ako nije izričito ugovorena **kapara** ([Kurir Biznis](https://biznis.kurir.rs/amp/9487919/koja-je-razlika-izmedju-kapare-i-avansa)):
- Kod kapare onaj ko je dao kaparu gubi je ako odustane. Ako odustane onaj ko ju je primio, vraća je dvostruko.
- Avans platilac može da traži nazad ako odustane pre početka izvršenja.

Zato je poštenija i lakše odbranjiva formulacija od „avans se ne vraća“ ovakva: **avans se vraća u celosti ako se odustane pre početka rada, a posle toga se zadržava srazmerno urađenom poslu.** Oglasi koriste „bez plaćanja unapred“ kao znak poverenja ([KupujemProdajem](https://www.kupujemprodajem.com/pretraga?keywords=izrada+sajta&so=1)). Mihailov odgovor na to su pisana ponuda i mali iznos avansa.

### Osnovna cena pokriva dizajn, izradu i objavu; jezik, tekstovi i zakazivanje su dodaci

**Šta je u osnovnoj ceni u regionu.** Skoro uvek su uključeni prikaz prilagođen telefonu, kontakt forma, osnovni SEO i SSL. Često su uključeni i domen i hosting za prvu godinu, na primer kod iizradasajtova, AM Design-a i Hortus-a ([iizradasajtova.com](https://iizradasajtova.com/cenovnik-usluga/izrada-sajta-cena/), [amdesign.rs](https://amdesign.rs/cenovnik.html), [hortus.hr](https://www.hortus.hr/izrada-web-stranica-cijena/)). StartUp Solutions, kao i Mihailo, registruje domen i hosting na ime klijenta ([izradawebstranica.rs](https://izradawebstranica.rs/izrada-sajtova-cena)). Da bi cene bile uporedive, uz cenovnik treba navesti da klijent te troškove plaća direktno i koliko otprilike iznose (oko €15–25 godišnje).

**Šta je dodatak ili viši paket.** Višejezičnost, tekstovi, zakazivanje i plaćanje su skoro uvek viši paket ili dodatak:
- CDS naplaćuje svaki dodatni jezik od €250 ([cds.rs](https://cds.rs/cenovnik-usluga-cena-izrade-web-sajta/)).
- Hortus stavlja online rezervacije i više jezika u viši paket ([hortus.hr](https://www.hortus.hr/izrada-web-stranica-cijena/)).
- WebKraft sisteme za rezervacije svrstava u aplikacije od €2.500 ([webkraft.rs](https://webkraft.rs/cenovnik/)).
- Voxern uključuje pisanje tekstova tek u Pro paket ([voxern.com](https://voxern.com/)).
- Nemački freelanceri naplaćuju dodatnu stranicu od €190 neto uz osnovu od €2.490, što je 7–8%. Drugi jezik naplaćuju 30–50% osnovne cene ili od €390 po jeziku ([kopfundstift.de](https://kopfundstift.de/webdesign-kosten/)).
- Američke agencije naplaćuju tekstove $60–300 po stranici, a sisteme za zakazivanje $1.000–3.000 ([Knapsack Creative](https://knapsackcreative.com/blog/web-design/web-design-pricing)).
- Podešavanje Google Business Profile-a košta €200–1.000 kod holandskih freelancera, a na Fiverr-u od oko $50 ([Searchlab](https://searchlab.nl/kosten/wat-kost-google-mijn-bedrijf-optimalisatie), [Fiverr](https://www.fiverr.com/elena_whittmore/setup-and-optimize-your-google-business-profile)).
- Hortus u osnovnom paketu obrađuje do 20 fotografija, a u višem do 50 ([hortus.hr](https://www.hortus.hr/izrada-web-stranica-cijena/)).

**Mihailove cene dodataka** u tabeli preporuka izvedene su iz satnice od €25 i ovih odnosa, a ne preuzete sa tržišta. Drugi jezik je 30–40% osnovne cene, a dodatna stranica oko 10%. Zakazivanje treba opisati onako kako je odlučeno: jednostavna forma šalje na email, povezivanje servisa kao što je Cal.com je dodatak, a rezervacioni sistem po meri nije deo osnovne ponude.

**Dva kruga izmena odgovaraju praksi.** Šabloni ugovora navode dva kruga objedinjenih komentara, a rad van obima tek posle pisane saglasnosti ([SitePoint](https://www.sitepoint.com/bulletproof-web-design-contract/)). StartUp Solutions daje „2 runde revizija“ ([izradawebstranica.rs](https://izradawebstranica.rs/izrada-sajtova-cena)), a Voxern jednu listu izmena pre objave ([voxern.com](https://voxern.com/)). Izvori ne pokrivaju još jednu stvar koja štiti jeftine projekte: u ponudi treba navesti rok do kog klijent dostavlja tekstove i fotografije, i da projekat do tada miruje.

**Nedoslednost na sajtu.** Opis „Sajt za biznis“ već obećava „usluge i cene, o vama, galeriju i kontakt“. Istovremeno su „Galerija“ i „Cenovnik ili meni“ navedeni među dodatnim funkcijama. Predlog: jednostavna galerija i cenovnik ulaze u osnovnu cenu sajta, a kao dodatak se naplaćuju na landing stranici ili u složenijem obliku.

## Šta proveriti pre nego što brojevi uđu u kod

Sve izvore sam čitao kroz izvode pretraživača 2026-10-04. Sandbox je blokirao direktno otvaranje stranica, pa izvodi mogu da izostave uslove kao što su PDV, broj stranica ili broj izmena. Uzorak je pristrasan: u njemu su prodavci koji objavljuju cene i SEO vodiči koje pišu sami prodavci.

Nisu nađeni:
- cenovnik nijednog srpskog ili balkanskog solo freelancera namenjen EU klijentima
- studija koja pokazuje da niske cene privlače gore klijente
- nezavisni podaci o broju sati održavanja statičnih sajtova

Preračuni u EUR su približni: USD po kursu 0,86–0,89 €, kako je u beleškama, a KM po fiksnom kursu 1,95583. Razlika u kursu ne menja zaključke.

Pravni delovi ovog dokumenta nisu pravni savet. Pre objave cena treba proveriti sledeće:

| Šta proveriti | Zašto | Ko |
|---|---|---|
| WebKraft (€250 / €300+), iizradasajtova (€300), izradawebsajta.co (€500), Hortus (€530 + PDV), KODA (€662 / €891) | glavna poređenja za standardne cene | Mihailo, otvaranjem stranica |
| Fiverr vodiči ($100–200 / $190–400) i Fiverr Pro ($195–600, nezavisan izvor) | poređenje za EU | Mihailo |
| Uslovi Vercel Hobby plana i plan na kom je MihailoBuilds sajt | komercijalna upotreba | Mihailo |
| Besplatni planovi Web3Forms (250 poruka) i Cal.com (1 korisnik) | troškovi klijenta i sadržaj održavanja | Mihailo |
| Prikaz standardne i posebne cene po Zakonu o trgovini, Zakonu o oglašavanju i Zakonu o zaštiti potrošača 2026; da li pravila o 30 i 60 dana važe za usluge; isto za EU kupce koji su fizička lica | referentna cena i trajanje ponude | advokat |
| Avans ili kapara i formulacija povraćaja avansa | Zakon o obligacionim odnosima | advokat |
| Da li se nove odredbe o isticanju cena na sajtu (od 1. maja 2026) i prikaz cena samo u EUR odnose na Mihailov slučaj | isticanje cena | advokat |
| Status u sistemu PDV-a (da li uz cene treba da piše „bez PDV-a“), avansni račun, e-faktura za firme, naplata u EUR od EU klijenata | fakturisanje | računovođa |

## Izvori

Svim izvorima pristupljeno je **2026-10-04**, preko izvoda pretraživača, a ne direktnim otvaranjem stranica.

**Srbija: izrada sajtova**
- iizradasajtova.com, cenovnik: https://iizradasajtova.com/cenovnik-usluga/izrada-sajta-cena/
- izrada-sajtova.rs, izrada sajtova: https://www.izrada-sajtova.rs/izrada-sajtova/
- izradawebsajta.co, prezentacioni sajt: https://izradawebsajta.co/sr/izrada-prezentacionog-sajta/
- izradawebsajta.co.rs, cene: https://www.izradawebsajta.co.rs/cene-izrade-sajtova.html
- WebKraft, cenovnik: https://webkraft.rs/cenovnik/
- SuperSajtovi, LITE paket: https://www.supersajtovi.rs/ponuda/lite-sajt/
- iiStudio, cena web sajta: https://iistudio.rs/cena-web-sajta/
- HP Web Art: https://hpwebart.com/
- StartUp Solutions, cene: https://izradawebstranica.rs/izrada-sajtova-cena
- CDS Digital, cenovnik: https://cds.rs/cenovnik-usluga-cena-izrade-web-sajta/
- AM Design, cenovnik: https://amdesign.rs/cenovnik.html
- webant.rs, koliko košta izrada sajta 2026: https://www.webant.rs/blog/koliko-kosta-izrada-sajta-srbija-2026
- da.org.rs, izrada sajta cena 2026: https://da.org.rs/blog/izrada-sajta-cena-srbija
- KupujemProdajem, pretraga „izrada sajta“: https://www.kupujemprodajem.com/pretraga?keywords=izrada+sajta&so=1
- Halo oglasi, oglas za izradu sajtova: https://www.halooglasi.com/usluge/izrada-sajtova/web-sajtovi/5425643517238
- KompArt, cenovnik: https://www.kompart.rs/-cenovnik/izrada-sajta-cena/
- IT Usluge, izrada sajta: https://www.it-usluge.net/izrada-sajta.html

**Hrvatska, BiH i Crna Gora**
- Hortus, cijena izrade web stranica: https://www.hortus.hr/izrada-web-stranica-cijena/
- Voxern: https://voxern.com/
- h1 design, cijena izrade: https://www.h1-design.hr/cijena-izrade-web-stranice/
- WebFlare, cjenik: https://www.webflare.hr/cijene-izrade-web-stranica/
- Legatech, cijene: https://legatech.hr/izrada-web-stranica-cijena/
- dizajnba.com, cijena izrade u BiH: https://dizajnba.com/cijena-izrade-web-stranice-u-bih/
- Lanmi Marketing, cijena izrade: https://lanmi.me/cijena-izrade-web-sajta/
- vebIT: https://vebit.me/
- izradasajta.me, cijena 2026: https://www.izradasajta.me/cijena-izrade-sajta-crna-gora

**Satnice u Srbiji**
- Svet kompjutera, forum (stara tema): https://www.sk.rs/forum/archive/index.php/t-20992.html
- 24sedam, koliko zarađuju IT frilenseri: https://24sedam.rs/biznis/privreda/206841/koliko-zaraduju-it-frilenseri/vest
- 50eurwebsite.rs, cenovnik usluga: https://50eurwebsite.rs/cenovnik-usluga/

**Platforme i EU tržište**
- Fiverr, landing page development: https://www.fiverr.com/categories/programming-tech/buy/website-development/landing-page
- Fiverr, website design costs 2025: https://www.fiverr.com/resources/guides/graphic-design/website-design-costs
- Fiverr, web designer costs 2025: https://www.fiverr.com/resources/guides/business/web-designer-costs
- Blaksheep Creative, Fiverr website design cost 2026: https://blaksheepcreative.com/web-design/hiring-web-designer-fiverr/
- Upwork, web designer hourly rates: https://www.upwork.com/hire/web-designers/cost/
- Upwork, hourly rates 2026: https://www.upwork.com/resources/upwork-hourly-rates
- Upwork, landing page design services: https://www.upwork.com/services/browse/landing-page-design
- Upwork Help, Freelancer Service Fee: https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee
- Upwork, hiring red flags: https://www.upwork.com/resources/hiring-process-red-flags-in
- Upwork, web designers in Serbia: https://www.upwork.com/hire/web-designers/rs/
- Upwork, front-end developers in Serbia: https://www.upwork.com/hire/front-end-developers/rs/
- Malt, web designers: https://www.malt.com/en-gb/a/freelance/web-graphic-design/webdesigner
- Malt, WordPress developers: https://www.malt.com/en-gb/t/average-freelance-rates/it/back-end-developer/wordpress-developer
- Malt Help, commission: https://help.malt.com/hc/en-150/articles/29539691425938-How-does-the-Malt-commission-work-for-freelancers
- Freelance-Solution, TJM développeur web 2026: https://www.freelance-solution.fr/tarif-freelance/tjm-developpeur-web/
- Codeable, pricing: https://codeable.io/pricing/
- Framer Experts: https://www.framer.com/experts/
- Jobbers, platforms without commission 2026: https://www.jobbers.io/freelance-platforms-that-dont-take-a-cut-in-2026-complete-review-comparison/
- Mobilunity, hire developers in Serbia: https://mobilunity.com/blog/hire-developers-in-serbia/
- Aslan Webtech, prijzen: https://aslanwebtech.nl/prijzen/
- OnePagerWebsite.nl: https://www.onepagerwebsite.nl/
- Alunah, Webdesign Preise: https://alunah.de/webdesign-preise/
- Affordable Websites, packages: https://www.affordablewebsites.ie/website-design-packages/
- WebEngineer.ie, affordable web design: https://www.webengineer.ie/affordable-web-design/
- ExpertSure, freelance web designer costs UK 2026: https://www.expertsure.com/uk/web-design/freelance-web-designer-costs/
- KODA, cennik: https://kodastrony.pl/cennik/
- Robienastronie, ile kosztuje strona 2026: https://robienastronie.pl/blog/ile-kosztuje-strona-internetowa/

**Održavanje**
- izrada-sajtova.rs, održavanje: https://www.izrada-sajtova.rs/odrzavanje-sajtova/
- odrzavanjewebsajta.rs, cena održavanja: https://odrzavanjewebsajta.rs/cena-odrzavanja-web-sajta/
- Happy Media, maintenance cost (EN): https://happymedia.rs/en/blog-maintenance-cost
- Happy Media, održavanje sajta: https://happymedia.rs/odrzavanje-sajta/
- Reload, šta obuhvata održavanje: https://reload.rs/blog/odrzavanje-sajta-sta-obuhvata/
- Sensemake, cena izrade sajta: https://sensemake.rs/cena-izrade-sajta/
- Sajtpress, održavanje sajta: https://sajtpress.rs/odrzavanje-sajta/
- EuProWeb, održavanje sajtova: https://euproweb.com/index.php/odrzavanje-sajtova.html
- ITEH Sistemi, održavanje: https://iteh-sistemi.hr/usluge/odrzavanje-web-stranice
- DizajnBA, održavanje u BiH: https://dizajnba.com/odrzavanje-web-stranice-bih-cijene/
- StudioV, održavanje sajta: https://studiov.website/odrzavanje-sajta/
- Static Web Studio, pricing: https://staticwebstudio.com/pricing
- Melanie's Small Design, care plans: https://melaniesmalldesign.com/website-care-plans/
- Twingenuity Graphics, care plan: https://twingenuitygraphics.com/website-care-plan/
- Magical Design, maintenance packages: https://www.magicaldesign.co.uk/support-maintenance-packages
- Tuesday, maintenance pricing guide 2026: https://www.tuesday.is/blog/website-maintenance-pricing-guide-2026/
- AgencyKit, website care plans: https://agencykit.tech/blog/website-care-plans/
- The Admin Bar, 2026 survey: https://theadminbar.com/2026-survey/
- Ketchup Consulting, maintenance plan cost 2026: https://ketchupconsulting.com/insights/website-maintenance-plan-cost-2026/
- Masuyo Digital, website care plans: https://masuyodigital.com/guides/website-care-plans
- Refact, website maintenance cost: https://refact.co/insights/digital-product/website-maintenance-cost
- Neuron Web, static vs WordPress: https://neuronweb.dev/insights/static-vs-wordpress-total-cost/
- Kahunam, website retainer: https://kahunam.com/services/website-retainer/
- Beancount, retainer agreement guide: https://beancount.io/blog/2026/04/24/retainer-agreement-template-service-business-guide
- The Turn Group, website support: https://www.theturngroup.com/website-support-services

**Hosting, domen i servisi**
- Vercel, Hobby plan: https://vercel.com/docs/plans/hobby
- Vercel, Pro plan: https://vercel.com/docs/plans/pro-plan
- Flavio Copes, hosting free tiers (Cloudflare Pages): https://flaviocopes.com/hosting-free-tiers/
- netli.fyi, Netlify pricing and limits: https://netli.fyi/blog/netlify-pricing-and-limits
- Netlify forum (2021), free plan for commercial purposes: https://answers.netlify.com/t/can-we-use-netlify-free-plan-for-commercial-purposes/41545
- Web3Forms, pricing: https://web3forms.com/pricing
- Cal.com, pricing: https://cal.com/pricing
- Notifier, UptimeRobot pricing 2026: https://notifier.so/guides/uptimerobot-pricing-2026/
- srpske.rs, cene .rs i .com domena 2026: https://srpske.rs/vesti/ekonomija/2026/09/06/registracija-domena-cene-rs-i-com-u-2026

**Prikaz cena i istraživanja**
- Rao i Monroe (1989), Journal of Marketing Research: https://carlsonschool.umn.edu/sites/carlsonschool.umn.edu/files/2024-06/Rao%20and%20Monroe%201989.pdf
- Völckner i Hofmann (2007), Marketing Letters: https://ideas.repec.org/a/kap/mktlet/v18y2007i3p181-196.html
- Urbany, Bearden i Weilbaker (1988), sekundarni zapis: https://vivo.colorado.edu/display/pubid_59911
- Invoice Ninja, prikaz cena na sajtu freelancera: https://invoiceninja.com/display-prices-freelance-website/
- Hacker News, tema o jeftinim klijentima: https://news.ycombinator.com/item?id=9492556
- tutor2u, reference pricing: https://tutor2u.net/economics/topics/reference-pricing
- The Yellow Labs, founding clients: https://www.theyellowlabs.com/founding-clients
- GitHub, founding client offer (25%, 3 mesta): https://github.com/nick-ramos/Ramappsolutions/pull/2
- GigForge, freelance portfolio 2026: https://gigforge.io/blog/how-to-build-freelance-portfolio-that-wins-clients

**Propisi i pravila platformi**
- Evropska komisija, Price Indication Directive: https://commission.europa.eu/law/law-topic/consumer-protection-law/unfair-commercial-practices-law/price-indication-directive_en
- Smernice Komisije o članu 6a, EUR-Lex: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52021XC1229%2806%29
- Smernice o Direktivi o nepoštenoj poslovnoj praksi, EUR-Lex: https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A52021XC1229%2805%29
- Paragraf, primena Zakona o zaštiti potrošača od 2. avgusta 2026: https://www.paragraf.rs/dnevne-vesti/080626/080626-vest1.html
- IPC, odredbe koje se primenjuju od 1. maja 2026: https://www.ipc.rs/vest/novi-zakon-o-zastiti-potrosaca-odredbe-koje-se-primenjuju-od-1-maja-2026-godine_v2452
- JMS Law, šta donosi novi zakon 2026: https://jmslaw.rs/blog/sta-donosi-novi-zakon-o-zastiti-potrosaca-2026/
- Harmonius, tekst Zakona o zaštiti potrošača: https://www.harmonius.org/sr/pravni-izvori/jugoistocna-evropa/privatno-pravo/srbija/Zakon_o_za%9Atiti_potro%9Aa%E8a.pdf
- Biznis.rs, zabrana lažnih sniženja: https://biznis.rs/vesti/trgovci-ne-smeju-da-mame-kupce-laznim-snizenjima-i-popustima/
- Zakon o oglašavanju (PDF): https://www.becej.rs/wp-content/uploads/2021/05/Zakon-o-oglasavanju.pdf
- Google Maps, pravila o sadržaju (lažno angažovanje): https://support.google.com/contributionpolicy/answer/7400114?hl=en
- Sixth City Marketing, kazne za podsticane recenzije (2024-09-26): https://www.sixthcitymarketing.com/2024/09/26/review-restrictions/

**Avans, ugovori i dodaci**
- Penly, depozit od klijenata (jun 2026): https://penly.it.com/blog/how-to-collect-a-deposit-from-freelance-clients
- The CX Toolbox, uslovi plaćanja za izradu sajta: https://thecxtoolbox.com/client-experience/website-design-payment-terms/
- svilenkovic.com, stranica usluge: https://svilenkovic.com/usluge/izrada-sajta-prague
- Kurir Biznis, razlika između kapare i avansa: https://biznis.kurir.rs/amp/9487919/koja-je-razlika-izmedju-kapare-i-avansa
- SitePoint, ugovor za web dizajn: https://www.sitepoint.com/bulletproof-web-design-contract/
- kopfundstift.de, Webdesign Kosten 2026: https://kopfundstift.de/webdesign-kosten/
- Knapsack Creative, web design pricing 2025: https://knapsackcreative.com/blog/web-design/web-design-pricing
- Searchlab, cena optimizacije Google profila: https://searchlab.nl/kosten/wat-kost-google-mijn-bedrijf-optimalisatie
- Fiverr, ponuda za podešavanje Google Business Profile-a: https://www.fiverr.com/elena_whittmore/setup-and-optimize-your-google-business-profile
