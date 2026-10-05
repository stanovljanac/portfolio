# Ime, logo i pravni rizik
Datum provere: 2026-10-04 (ažurirano 2026-10-05 posle Mihailovih odgovora, vidi odeljak „Odgovori Mihaila“)

> Ovo nije pravni savet; konačnu reč treba da da advokat za intelektualnu svojinu u Srbiji.

## Kratak zaključak

- **Ime MihailoBuilds i MB monogram nose nizak rizik, ali samo privremeno.** Fontovi, 3D/animacije, zastave u izboru jezika i nazivi Viber/WhatsApp/Instagram/Vercel su takođe niskog rizika.
- **Najvažnije ograničenje: nijedan registar žigova (TMview, EUIPO, WIPO, ZIS) ni APR nisu mogli da se pretraže iz istraživačkog okruženja, pa ništa nije "očišćeno".** Urađena je samo obična web pretraga i DNS provera domena, a to ne zamenjuje pretragu registra.
- **Pravi rizici su na demo sajtovima, ne u imenu.** Posle odgovora Mihaila (2026-10-05) ocene su ažurirane; ostaje ono što se rešava izmenama na demo sajtovima i dokazima o poreklu slika.
- Salon demo: izmišljeni mejl koristi domen pravog salona, handle @mbhairsalon već postoji, ime liči na bar tri prava salona, a stranica nema oznaku „koncept“ i javlja „You're booked“. [visok za mejl i handle dok se ne uklone; srednji za ime i oznaku, a oznaka „koncept“ to spušta na nizak]
- Slike: salon (Pexels i drugi besplatni sajtovi, prema Mihailu) i Keeper (generisane Gemini modelom, vidljivi žig skinuo Mihailo, prema Mihailu). [nizak do srednji, privremeno, dok nema registra izvora i dokaza o poreklu]
- Ime Keeper: Mihailo potvrđuje da je to kurs fotografije, a ne bezbednosni softver, pa je zabuna s firmom Keeper Security malo verovatna. [nizak, privremeno, do provere u TMview]
- Monogram i kod su nastali uz AI asistenta (potvrdio Mihailo): tužba zbog toga je malo verovatna, ali je zaštita od kopiranja po autorskom pravu slaba, pa se za zaštitu logoa računa na žig. Automation Desk: izmišljena brojka „50K+ engineers“ uz prave naloge traži oznaku „koncept“ ili skidanje broja. [srednji dok se ne reši]
- **Odmah:** 10 minuta besplatnih pretraga (odeljak 6) i popravke demo salona (preporuke za živi sajt).
- **Žig:** ne podnositi ništa plaćeno dok pretrage nisu čiste i dok ime i logo nisu konačni; tada Srbija, klasa 42, a EUTM samo ako su EU klijenti realni.

## Odgovori Mihaila (2026-10-05)

Odgovori su Mihailovi i nisu proveravani iz fajlova ili sa sajtova, osim gde je navedeno. Oznake kao u tabeli rizika.

| Tema | Šta je Mihailo rekao | Efekat na ocenu | Šta ostaje |
|---|---|---|---|
| Keeper, slike | Generisane Gemini (Flash) modelom, nije siguran koji; vidljivi žig je skinuo sam, jer to znači da nema problema [N] | visok → nizak do srednji | Fajlovi pokazuju samo alat za skidanje žiga, ne i originalni generator [V]. Sačuvaj Gemini istoriju i originale. Izvori se razilaze oko toga da li uslovi dozvoljavaju skidanje vidljivog žiga (vidi tabelu) [S]; tekst uslova iz juna 2026. nisam čitao [N] |
| Slike na demo sajtovima | Sa Pexels-a i drugih sajtova sa besplatnim slikama [N] | visok → srednji (portreti), nizak do srednji (galerija) | „Besplatno“ nije licenca: svaki sajt ima svoju, a Pexels ne obezbeđuje saglasnost prikazanih osoba. Treba registar izvora (URL, autor, licenca, datum) |
| Mejl salona | Ukloniti, da se stranci ne spamuju | ostaje visok dok se ne ukloni | Izmena ide u projekat salona, ne u ovaj repo |
| Instagram salona | Ukloniti ili zameniti sa `@mbhairsalontest` | ostaje visok dok se ne promeni | `@mbhairsalontest` je dobar izbor samo ako ga ti otvoriš i kontrolišeš; slobodnost imena nisam mogao da proverim [N]. Dok ne postoji, ukloni link |
| Oznaka „koncept/demo“ | Dodati negde na sajt salona; da li to rešava stvari? | srednji → nizak | Rešava utisak da je salon stvaran, poruku „You're booked“, adresu i telefon i najveći deo pitanja oko portreta. Ne rešava mejl i Instagram (poruka stranom vlasniku domena stiže bez obzira na natpis) ni licence slika (natpis ništa ne licencira) |
| Naziv Keeper | Delimično se poklapa, ali nema ničeg zajedničkog po čemu bi mogli da tuže; na kom osnovu? | srednji → nizak (privremeno) | Osnov bi bio verovatnoća zabune kod sličnih usluga i, za poznat žig, zaštita ugleda. Keeper Security je softver za lozinke, a tvoj Keeper je kurs fotografije, pa je zabuna malo verovatna. Nije nula: proveri KEEPER u TMview (RS, EM, WO; klase 9, 41, 42) |
| Automation Desk nalozi | Linkovi su njegovi i pravi [N] | srednji → nizak do srednji | Vidi red „50K+ engineers“ ispod |
| „50K+ engineers“ na Automation Desk-u | Izmišljeno; zajednica ne postoji; sajt je koncept [N] | nizak do srednji → srednji dok nema oznake | Posetilac može da poveruje da zajednica postoji, a linkovi vode na prave naloge. Oznaka „koncept“ i skidanje broja rešavaju to; sam natpis ne bi dovoljno ispravio konkretnu lažnu brojku |
| Naslovne slike Automation Desk-a | Napravio ih je Claude Design [N] | nizak (potvrđeno) | `engine-diagram.png` nosi OpenAI potpis, pa se ne poklapa sa odgovorom; potvrdi odakle je taj dijagram |
| Invoice snimak | Test podaci [N] | nizak (potvrđeno) | Ništa |
| MB monogram i kod | Monogram je pravljen uz AI asistenta; sve je pravljeno uz pomoć Claude-a [N] | nizak za tužbu; srednji za zaštitu od kopiranja | Autorsko pravo na monogram je slabo ili ga nema, a žig ne zavisi od njega. Čuvaj zapise o nastanku (šta si zadao, birao, menjao) |
| Rečenica o Google Fonts u politici privatnosti | Izbaciti, ne zna zašto je dodata | nije promenjeno u kodu | Rečenica je tačna dok sajt učitava fontove sa Google-a (učitava ih sva četiri HTML fajla). Dodata je jer pri učitavanju fonta browser posetioca šalje svoju IP adresu Google-u, a politika privatnosti mora da kaže šta se zaista dešava sa podacima. Briše se u sesiji 7, u istoj izmeni u kojoj se fontovi prebacuju na naš server i uklanjaju linkovi ka Google-u. Ako ipak želiš da je izbacim odmah, politika bi do sesije 7 bila netačna |

## Tabela rizika

Oznake uz tvrdnje: **[V]** proveren direktno (otvoren sajt, fajl, repozitorijum, DNS upit); **[S]** sekundarno, rezultat pretrage (naslov ili opis), strana nije otvorena; **[Z]** zaključak istraživanja; **[N]** nije proveren. Ocene su procena istraživanja (verovatnoća zahteva ili zabune sa realnim šansama), a ne rezultat pretrage registra. "Privremeno" znači da se ocena može promeniti posle pretrage registara ili posle tvojih odgovora iz odeljka 5.

| Stavka | Rizik | Zašto | Šta uraditi |
|---|---|---|---|
| Ime MihailoBuilds / Mihailo Builds | nizak (privremeno) | Web pretraga ne nalazi firmu ni nalog tog imena [S]; 17-18 varijanti domena (.rs, .dev, .io, .eu...) nije delegirano u DNS-u [V]. "Mihailo" je lično ime, "Builds" opisna reč, pa je žig slab u oba smera [Z]. Najbliže: Misho Build EOOD, Bugarska ([papagal.bg](https://papagal.bg/eik/208898556/9c89)) [S]. Registri nisu pretraženi [N] | Pretrage iz odeljka 6; za .rs domen prvo WHOIS (NXDOMAIN ne znači slobodno); čuvaj dokaze o prvoj upotrebi |
| MB monogram vs. Mercedes-Benz | nizak (privremeno) | Običan geometrijski "MB" na tamnom kvadratu sa trakom, bez zvezde, prstena i srebra [V]. Mercedes-Benz Group ima žig MB.OS u klasama 9, 12 i 42 ([Justia](https://trademarks.justia.com/793/35/mb-79335457.html)) [S]; to je jedino preklapanje u klasi 42, teorijski nizak do srednji [Z]. Postoji li čist "MB" žig i važi li u EU/Srbiji, nije provereno [N]. Slabo mesto: monogram stoji sam kao favicon i u mobilnom meniju [V] | Ne dodavati zvezdu, prsten, metalik izgled ni reč "Benz"; pretražiti vlasnika Mercedes-Benz Group AG (odeljak 6) |
| MB monogram vs. ostali MB znakovi | nizak za poznate; za registre nije ocenjeno | MB Bank (bankarstvo), MB Financial (brend ukinut 2019), Milton Bradley/Hasbro (igre), bicikli i motori: druga polja [S] ([MB Bank](https://en.wikipedia.org/wiki/MB_Bank), [MB Financial](https://www.retailbankerinternational.com/news/fifth-third-merger-with-mb-financial/)). Nepoznati "MB" znakovi za IT/web u EU i Srbiji mogu postojati; "MB" je i skraćenica za megabajt, pa je obim zaštite uzak [Z]. Bez pretrage se ne može oceniti [N] | Tekstualna i slikovna pretraga u TMview i WIPO bazi (odeljak 6) |
| Autorstvo monograma | nizak za tužbu; srednji za zaštitu od kopiranja | Mihailo potvrđuje da je monogram nastao uz AI asistenta, kao i sav kod sajta [odgovor]; to se slaže sa commit-om od 2026-10-03 koji ima oznaku koautora AI asistenta [V]. Mala je šansa da te neko tuži zbog kopiranja fonta: slova su od pravih ivica i lukova, ništa ne upućuje na konkretan font [Z]. Problem je zaštita: delo bez dovoljno ljudskog stvaralačkog doprinosa možda nije zaštićeno autorskim pravom ([US Copyright Office](https://copyright.gov/newsnet/2025/1060.html)) [S], pa je teško zabraniti kopiranje po autorskom pravu. Uslovi Anthropic-a dodeljuju korisniku prava na izlaz „ako ih ima“ i ne garantuju zaštitu ([Anthropic](https://anthropic.com/legal/terms), [terms.law](https://terms.law/ai-output-rights/anthropic/)) [S]. Žig ne zavisi od autorskog prava: ime i logo se štite upotrebom i registracijom [Z] | Zabeleži šta si ti zadao, birao i odbacivao; sačuvaj skice, verzije i upite; proveri slova alatom za prepoznavanje fonta (WhatTheFont, Matcherator); ako ti je zaštita logoa važna, računaj na žig, ne na autorsko pravo |
| Ime MB Hair Salon | srednji (privremeno) | Beleške se razilaze: zabuna na vebu je "visoka", ukupan sudar "srednje-visok". Stvarni saloni sa istim obrascem: MB Salon (Birmingham, Alabama; domen mbhairsalon.com), MB Hair & Bridal i MB Hair Studio (London), Studio MB (Beograd) ([Treatwell](https://treatwell.co.uk/place/mb-hair-bridal), [planplus.rs](https://www.planplus.rs/beograd/frizerski-saloni/30)) [S]. Tužba je malo verovatna jer demo ništa ne prodaje a znak je slab [Z]. Žigovi u klasama 44 i 3 nisu proveravani [N] | Preimenovati vidljivo ime salona ili svesno prihvatiti preklapanje; predložena imena (Velmora, Fennvale, Alderlane, Orlenne) prošla su samo po jednu web pretragu, nisu očišćena |
| Mejl demo salona (adresa hello@ na domenu mbhairsalon.com) | visok | Domen koristi pravi salon, a rezultati pretrage pokazuju da je mejl na tom domenu u upotrebi ([sajt salona](https://www.mbhairsalon.com/)) [S]. Ko isproba demo, piše strancu. Ne zna se da li adresa hello@ postoji; WHOIS i MX nisu provereni [N]. Na demou je običan tekst [V] | Odluka Mihaila (2026-10-05): ukloniti adresu sa demoa, da se ne spamuju stranci. Ako treba polje za kontakt: example.com ([RFC 2606](https://datatracker.ietf.org/doc/html/rfc2606)) [S] ili sanduče na mihailobuilds.com koje ti kontrolišeš |
| Instagram handle demo salona (@mbhairsalon) | visok (privremeno) | Prikazan dvaput kao običan tekst, linkovi vode na # [V]. Pretraga pokazuje postojeći nalog "MB salon" sa tim handle-om ([Instagram](https://www.instagram.com/mbhairsalon/)); lokacija (Perth) nije potvrđena, to je jedan snippet, a trenutni status je nepoznat [S, N] | Odluka Mihaila (2026-10-05): ukloniti ili zameniti sa @mbhairsalontest. Zamena važi samo ako ti otvoriš taj nalog; da li je ime slobodno nisam mogao da proverim (Instagram je blokiran) [N]. Dok nalog ne postoji, ukloni link |
| Telefon demo salona (broj u formatu (555) 014 ...) | nizak (privremeno) | Nije u rezervisanom NANP bloku za izmišljene brojeve (linije 0100-0199 iza prefiksa 555) ([Wikipedia](https://en.wikipedia.org/wiki/555_(telephone_number))) [S]; bez pozivnog broja zemlje liči na turski mobilni [Z]; da li je broj dodeljen, nije provereno [N] | Broj iz opsega za dramu ([Ofcom](https://ofcom.org.uk/phones-and-broadband/phone-numbers/numbers-for-drama): 01632 960000-960999 ili 07700 900000-900999) [S], uvek sa pozivnim brojem; ne izmišljati broj u srpskom formatu |
| Adresa demo salona ("24 Linden Street") | nizak | Nema grada ni države; pretraga nije našla salon na toj adresi, ali pretraga nije baza adresa [S, N]; ulica tog imena verovatno postoji u mnogo gradova [Z] | Dodati izmišljen grad ("Anytown") ili oznaku "izmišljena adresa"; ne spajati stvaran grad sa stvarnom ulicom |
| Nema oznake "koncept/demo" + poruka "You're booked" | srednji dok oznaka nije dodata; nizak posle | Na demou nema nijedne reči da je izmišljen; stranica je indeksirana (nema robots oznake ni robots.txt) [V]. Forma ništa ne šalje, a posle slanja piše "You're booked" i obećava SMS potvrdu; Privacy link je mrtav [V]. Po pravilima o nepoštenoj poslovnoj praksi ([UCPD čl. 6](https://www.legislation.gov.uk/eudr/2005/29/chapter/2/section/1)) pravni rizik je verovatno nizak jer ništa ne prodaje [S, Z]. Portfolio verovatno označava projekte kao lične, ali to ne pokriva posetioca koji dođe pravo na demo [Z] | Vidljiv natpis "Koncept, nije pravi biznis; zakazivanje ne radi"; poruka "Demo: ništa nije poslato"; napomena uz polje za mobilni; razmotriti noindex |
| Naziv Keeper | nizak (privremeno; bilo srednji) | KEEPER je jezgro familije žigova firme Keeper Security (menadžer lozinki): 33 žiga, 19 u klasi 9 ([Justia](https://trademarks.justia.com/owners/keeper-security-inc-1605521), [GleanMark](https://gleanmark.com/owner/keepersecurityinc)) [S]; EU i Srbija nisu provereni [N]. Mihailo potvrđuje da je njegov Keeper kurs fotografije, a ne softver za lozinke ili čuvanje podataka [odgovor]; to je druga delatnost, pa je zabuna malo verovatna [Z]. Osnov za zahtev bi bio verovatnoća zabune i, za poznate žigove, zaštita ugleda, ali pri različitim uslugama je slab [Z]. Proizvod je plaćen („$19 jednom“) [V] | TMview provera za KEEPER (RS, EM, WO; klase 9, 41, 42); vrati ocenu na srednji ako Keeper postane aplikacija za lozinke, sigurnost ili čuvanje podataka |
| The Automation Desk | nizak | Opisno ime: teško se štiti i teško se oduzima drugima. Slična imena: The Desk (Zoho partner), The Automation Company, AutomationDesk (dSPACE, softver za testiranje u automobilskoj industriji) ([dSPACE](https://www.dspace.com/zh/zho/home/applicationfields/stories/behr-hella_automationdesk.cfm)) [S]; status njihovih žigova nije proveren [N] | Brza provera u TMview; ne očekivati da možeš da zabraniš slična imena |
| Automation Desk: društvene mreže i tvrdnje | srednji dok nema oznake „koncept“ ili se broj ne skine; nizak posle | Mihailo potvrđuje da su YouTube, Instagram, Facebook i X nalozi njegovi i pravi, da je tvrdnja „Join a community of 50K+ engineers“ izmišljena, da zajednica ne postoji i da je sajt koncept [odgovor]. Nalozi su stvarni, a broj je lažan, pa posetilac može da poveruje da zajednica postoji; po pravilima o nepoštenoj poslovnoj praksi to je obmanjujuća tvrdnja [Z]. Da li sajt ima oznaku „koncept“ nije proveravano [N] | Dodati vidljivu oznaku „koncept“ (kao na salonu) i skinuti broj i reči o zajednici, ili ih zameniti tekstom bez brojke |
| Invoice Generator | nizak | Funkcionalno ime koje koriste mnogi alati ([XE](https://www.xe.com:443/invoice-generator)) [S]; kancelarije bi ga verovatno odbile kao opisno [Z]; rizik je zabuna u pretrazi, ne žig. Snimak ekrana u portfoliju sadrži imena klijenata i iznose [V]; Mihailo potvrđuje da su to test podaci [odgovor] | Distinktivnije ime ako projekat raste |
| Fontovi (OFL) | nizak | Svi fontovi (Manrope, JetBrains Mono, Archivo, IBM Plex Mono, Inter, Geist i ostali) su SIL OFL 1.1 ([tekst licence](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt)) [V]. Samo IBM Plex Mono ("Plex") i Raleway imaju rezervisano ime [V]. Samohostovanje je dozvoljeno ako uz fajlove idu licenca i autorska linija [V] | Koristiti gotove subset fajlove; ne pokretati sopstveni subsetter nad Plex-om (tada srednji); isporučiti OFL.txt uz woff2 |
| Google Fonts i GDPR | srednji (nizak posle samohostovanja) | Portfolio (repo) i tri živa sajta (salon, Automation Desk, stariji www) šalju IP posetioca Googleu [V]. LG München I, 20.01.2022: 100 EUR odštete ([IHK](https://www.ihk.de/bergische/recht-und-steuern/wettbewerbsrecht/google-fonts-5646176)) [S]; kasnije su sudovi masovne opomene proglasili zloupotrebom ([Händlerbund](https://ohn.haendlerbund.de/recht/urteile-entscheidungen/138187-urteil-zu-google-fonts-abmahnungen-ohrfeige-fuer-massenabmahner)) [S]. Izloženost srpskog preduzetnika je verovatno niska [Z] | Samohostovanje (roadmap sesija 7); u istom izdanju obrisati preconnect linkove i rečenicu o Google Fonts iz politike privatnosti; isto razmotriti za salon i Automation Desk |
| Fotografije na salon demou: tri portreta | srednji (privremeno; bilo visok) | Tri osobe sa jasno vidljivim licima (studijski kadrovi, pregledani ručno) prikazane kao osoblje izmišljenog salona, sa izmišljenim imenima i ulogama [V]. Mihailo kaže da su slike sa Pexels-a i drugih besplatnih sajtova [odgovor, N]; u fajlovima su samo ICC profili, pa se to ne može proveriti iz fajlova [V]. Pexels dozvoljava komercijalnu upotrebu, ali ne obezbeđuje saglasnost prikazanih osoba i traži da se ne implicira njihova podrška usluzi ([Pexels](https://help.pexels.com/hc/en-us/articles/360042332714-What-are-the-rules-for-using-Pexels-photos-or-videos)) [S]. Oznaka „koncept“ to znatno ublažava [Z] | Registar izvora za svaku sliku (URL, autor, licenca, datum); za slike van Pexels-a proveri licencu tog sajta; dodati oznaku „koncept“ |
| Salon demo: galerija i izlog (7 fotografija) | nizak do srednji (privremeno; bilo visok do srednji) | Bez kredita, a „Recent work“ predstavlja tuđe fotografije kao rad salona [V]; tri različita ICC profila sugerišu bar tri izvora [Z], što se slaže sa Mihailovim odgovorom da su iz više besplatnih izvora; izlog i flaše proizvoda mogu nositi tuđe žigove [Z] | Registar izvora; oznaka „koncept“ i napomena „uzorak slika“ uz galeriju; sačuvati dokaz o licenci |
| Portfolio: snimci ekrana sa salon fotografijama | nizak do srednji (prati salon) | Kartice u `public/projects` ponovo objavljuju te fotografije [V]; ocena prati ocenu fotografija na demou | Registar izvora važi i ovde; ponovo snimiti tek ako se slike na demou zamene (`scripts/capture-projects.mjs`) |
| Keeper: 24 slike | nizak do srednji (privremeno; bilo visok) | Svih 24 PNG imaju XMP/C2PA zapis: alat PixelBin.io, „Watermark Remover“, „compositeWithTrainedAlgorithmicMedia“, datumi 2026-06-17 do 22 [V]. Mihailo kaže da je slike generisao Gemini modelom (nije siguran koji) i da je vidljivi žig skinuo sam [odgovor, N]; u fajlovima nema podatka o originalnom generatoru. Izvori se razlikuju o tome da li Googleovi uslovi dozvoljavaju skidanje vidljivog žiga; Google je kasnije najavio opciju za isključivanje vidljivog žiga, a nevidljivi SynthID i C2PA ostaju ([PCWorld](https://pcworld.com/article/3213409/google-now-lets-you-nix-visible-gemini-image-watermarks.html)) [S]. Tekst uslova koji je važio u junu 2026. nije čitan [N]. AI izlaz verovatno nije zaštićen autorskim pravom i Google ne daje IP odštetu ([terms.law](https://terms.law/ai-output-rights/gemini/)) [S]. Lica su sintetička, pa nema pitanja saglasnosti, ako promptovi nisu tražili konkretnu osobu [Z]. Fajlovi su javni u punoj rezoluciji [V] | Sačuvaj Gemini istoriju i originale (dokaz porekla); ne brisati metapodatke; opciono oznaka „AI-generisane slike“ |
| Automation Desk: slike | nizak | Mihailo kaže da je naslovne slike napravio Claude Design [odgovor]; tri naslovne slike i OG slika nemaju metapodatke, pa se to ne može proveriti iz fajlova [V]. `engine-diagram.png` ima potpisan C2PA zapis OpenAI-ja (gpt-image, 2026-07-03) [V]; OpenAI korisniku dodeljuje svoja prava na izlaz ([uslovi](https://openai.com/policies/terms-of-use/)) [S] | Zadržati C2PA zapis na engine-diagram.png; potvrditi da je taj dijagram tvoj izlaz iz OpenAI alata |
| 3D/animacije i JS biblioteke | nizak | Salon 3D je three.js r165 (MIT, banner sačuvan), modeli su procedurni; nema .glb/.gltf/Spline/Lottie fajlova [V]. Phosphor ikone (MIT) bez beleške o autorskom pravu; Next.js paketi (Keeper, Invoice) bez licencnih banera [V]. Mihailo potvrđuje da je sav kod nastao uz AI asistenta [odgovor] | Dodati fajl sa licencama trećih strana |
| Zastave u izboru jezika | nizak (pravno); nizak do srednji (UX) | Srpska "narodna zastava" bez grba je slobodna; zakon zabranjuje zastavu kao žig ili oznaku robe i usluga ([021.rs](https://www.021.rs/info/srbija/283838/znate-li-razliku-izmedju-drzavne-i-narodne-zastave)), a ovde je ukras [S]. Zastava nije jezik ([W3C](https://lists.w3.org/Archives/Public/public-i18n-geo/2004Nov/0006.html)) [S]. Kod već ima tekst EN/SR, lang i aria-label [V] | Primarno tekst "English / Srpski"; zastave samo kao ukras (aria-hidden) ili ukloniti |
| Nazivi i ikone Viber, WhatsApp, Instagram, Cal.com, Vercel, Web3Forms | nizak | Portfolio koristi samo tekst i generičku ikonu poruke [V]; glifovi X/LinkedIn/GitHub u `icons.tsx` nisu korišćeni [V] (srednji bi bili da se prikažu). Salon koristi Instagram glif iz Phosphor-a uz izmišljen handle, Automation Desk ručno nacrtane glifove mreža [V] (nizak do srednji) | Ostaviti tekst; obrisati neupotrebljene glifove; ne bojiti u boje brendova; logo samo iz zvaničnog brand kita ([Meta](https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/), [Viber](https://www.viber.com/media-kit/)) |

## Preporučeni koraci

### Odmah (besplatno)

- [ ] **Knock-out pretrage (odeljak 6, oko 10 minuta).** Razlog: to je jedina provera koja pokriva rizik zbog imena i logoa, a još nije urađena. Zapiši datum, upit i broj pogodaka (snimak ekrana).
- [ ] **Sačuvaj dokaze o nastanku:** repozitorijum na udaljenom serveru, SVG izvore i skice, beleške šta je radio AI asistent a šta ti, snimke sajta, račun za domen, datume otvaranja naloga. Razlog: dokazuje prvu upotrebu i autorstvo monograma.

Demo salon. Ovo su samo preporuke: živi sajt `mbhairsalon.mihailobuilds.com` se ne menja iz portfolio repoa, nego u njegovom projektu.

- [ ] **Mejl:** ukloni adresu sa demoa (odluka Mihaila); ako treba kontakt, example.com ili sanduče na mihailobuilds.com. Razlog: sada vodi na domen pravog salona.
- [ ] **Instagram:** ukloni @mbhairsalon; zameni ga sa @mbhairsalontest samo ako prvo otvoriš taj nalog (odluka Mihaila). Razlog: nalog sa starim imenom već postoji, a tuđi handle opet vodi stranom vlasniku.
- [ ] **Telefon:** broj iz opsega za dramu, sa pozivnim brojem. Razlog: sadašnji broj nije garantovano izmišljen.
- [ ] **Adresa:** dodaj izmišljen grad ili "Anytown". Razlog: jeftino, uklanja mogućnost da se poklopi sa stvarnom adresom.
- [ ] **Oznaka "koncept":** vidljiv natpis u podnožju i uz formu, npr. „Koncept / demo sajt. Salon ne postoji; zakazivanje ne radi.“ (EN: „Design concept. This salon is not real; booking is not live.“); poruka "Demo: ništa nije poslato" umesto "You're booked"; napomena uz polje za mobilni ("ne unosi prave podatke"); zameni mrtav Privacy link; odluči o noindex. Razlog: najjača zaštita od utiska da je salon stvaran.

Slike. Opet samo preporuke za živi sajt.

- [ ] **Keeper slike:** sačuvaj Gemini istoriju i originale (pre skidanja žiga) i ne briši metapodatke. Razlog: dokaz porekla na plaćenoj strani; ocena je nizak do srednji samo uz dokaz.
- [ ] **Salon portreti i galerija:** napravi registar izvora (URL, autor, licenca, datum) za svih 10 slika; za one van Pexels-a proveri licencu tog sajta; ako ne možeš da dokažeš izvor, zameni sliku. Razlog: lica pravih (ili pravih na izgled) ljudi bez dokazane saglasnosti.

U portfolio repou:

- [ ] Ne snimati ponovo kartice salona dok se fotografije ne reše. Razlog: problem bi se kopirao na glavni sajt.
- [ ] Ne dodavati logou zvezdu, prsten, srebrni gradijent ni reč "Benz". Razlog: to bi ga primaklo Mercedesu.

### Uskoro

- [x] **Samohostovanje fontova u portfoliju** (urađeno u sesiji 7, 2026-10-05; nameID 0 i 14 su u fajlovima) (roadmap sesija 7): fajl sa licencama uz woff2, obrisati Google Fonts linkove i oba preconnect-a, u istom izdanju obrisati rečenicu u politici privatnosti; Plex ne obrađivati sam; proveriti `ttx` da nameID 0 i 14 ostaju. Razlog: gasi GDPR rizik i ispunjava OFL.
- [ ] **Kratak razgovor sa srpskim advokatom za IP pre bilo koje prijave** (ime i logo). Razlog: pretrage nisu pravna ocena. Cenu za Srbiju nisam našao; EU pretrage koštaju oko 99-900 EUR ([Njord Law](https://www.njordlaw.com/european-union-trademarks/faq-trademark-searching-europe)) [S].
- [ ] **Registar slika:** po fajlu izvor, autor, licenca (sa snimkom stranice licence), datum, saglasnost. Razlog: bez toga ne možeš da dokažeš da si imao pravo da ih koristiš.
- [ ] **Odluka o imenu MB Hair Salon;** za novo ime prava pretraga (klasa 44 i 3). Za Keeper: TMview provera KEEPER (RS, EM, WO; klase 9, 41, 42); ime ostaje ako je čisto. Razlog: salon je jedina stavka imena sa srednjim rizikom.
- [ ] **Automation Desk:** dodati oznaku „koncept“ i skinuti „50K+“ i reči o zajednici koja ne postoji (potvrđeno: izmišljeno). Razlog: lažna brojka uz prave naloge.
- [x] **Zastave** zameniti tekstom; obrisati neupotrebljene glifove u `icons.tsx` i `public/logo-lockup*.svg` (roadmap to već planira). Razlog: manje rizika i čistiji kod. Urađeno u sesiji 7: glifovi i `logo-lockup*.svg` su obrisani; zastave ostaju po Mihailovoj odluci (ukras, `aria-hidden`, uz tekst EN/SR).
- [ ] **Salon i Automation Desk:** samohostovanje fontova i fajl sa licencama trećih strana (Phosphor MIT, Next.js paketi). Razlog: isti GDPR i licencni razlozi.
- [ ] **Domeni i handle-ovi:** WHOIS, pa registruj mihailobuilds.rs (možda i .eu) i uskladi handle-ove. Razlog: poslovni predlog; na pravni rizik malo utiče.
- [ ] **Slova monograma** provući kroz alat za prepoznavanje fonta. Razlog: isključuje da je neki komercijalni font trasiran.

### Kasnije / ako posao krene

- [ ] **Prijava reči MIHAILOBUILDS u ZIS-u, klasa 42** (odeljak 4), kad su pretrage čiste i ime i logo konačni. Razlog: jeftin ulaz, počinje rok prioriteta.
- [ ] **EUTM** samo ako EU klijenti postanu realni, unutar 6 meseci prioriteta. Razlog: 850 EUR i obavezan zastupnik posle podnošenja.
- [ ] **Logo kao figurativni žig** tek kad je konačan i posle pretrage MB znakova. Razlog: prijava poziva ispitivanje i opoziciju, gde se može javiti vlasnik ranijeg znaka.
- [ ] **Ako osnuješ d.o.o.:** prenesi prava na firmu. Razlog: odbrana "sopstveno ime" u EU ne važi za firme.
- [ ] **Ako Keeper ili Invoice postanu ozbiljni proizvodi:** distinktivno ime pre skaliranja. Razlog: Keeper je blizu tuđeg žiga, a "Invoice Generator" se ne može zaštititi.
- [ ] **Pre prijave** ponovo proveriti takse na zvaničnim stranicama; posle registracije pratiti rok obnove (10 godina) i rok neupotrebe (5 godina).

## Da li i kada registrovati žig

Polazište: Mihailo je rezident Srbije, fizičko lice, bez klijenata. Rezident može sam da podnese prijavu u ZIS-u, bez advokata [S] ([BDK Advokati](https://bdkadvokati.com/wp-content/uploads/2018/01/T2018Serbia.pdf)).

| Opcija | Cena | Rok | Kad ima smisla |
|---|---|---|---|
| Ništa sada | 0 EUR | - | Dok pretrage nisu čiste i ime i logo nisu konačni. Cena čekanja: neko drugi može prvi da podnese prijavu (opšte pravilo, nije proveren izvor [N]) |
| Srbija (ZIS) | Prijava 21.390 RSD (oko 182 EUR) do 3 klase, +4.290 RSD po klasi preko tri ([ZIS takse](https://www.zis.gov.rs/en/rights/fees/) [S, snippet zvanične strane]; isto navodi [ZMP](https://www.zmp.eu/news/new-ip-administrative-fees-now-in-effect-in-serbia-and-slovakia/) [S]). Registracija na 10 godina 42.740 RSD (oko 364 EUR) [S]. Popust od 25% za elektronsko podnošenje; nije jasno da li važi i za drugu taksu ([ZIS e-prijava](https://www.zis.gov.rs/en/e-application/)) [S, N] | 6-18 meseci (stariji izvor, [WTR](https://www.worldtrademarkreview.com/guide/the-wtr-yearbook/2019/article/trademark-procedures-and-strategies-serbia)) [S]; opozicija 3 meseca | Zbir bez popusta oko 546 EUR, ako popust važi na obe takse oko 410 EUR (moj račun po kursu 117,37 RSD/EUR) [Z]. Tarifa je ista za 1-3 klase |
| EUTM (EUIPO) | 850 EUR prva klasa, +50 druga, +150 svaka od treće: klasa 42 = 850, klase 35+42 = 900, 9+35+42 = 1.050 ([EUIPO takse](https://www.euipo.europa.eu/en/trade-marks/before-applying/fees-payments)) [S, snippet zvanične strane]; takse se ne vraćaju ([FAQ](https://www.euipo.europa.eu/en/help-centre/tm/faq-fees-and-their-payment)) [S]. Vaučeri SME Fonda (75% takse) samo za MSP iz EU ili Ukrajine, verovatno ne važe za tebe ([Potter Clarkson](https://www.potterclarkson.com/news/the-euipo-sme-fund-a-guide-for-smes)) [S, Z] | 4-8 meseci bez prigovora; opozicija 3 meseca, ne produžava se; sa opozicijom još 7-10 meseci i više ([Dudkowiak](https://www.dudkowiak.com/ip-law/eu-trademark-registration-with-euipo/)) [S] | Podnošenje bez zastupnika je dozvoljeno, ali posle toga je obavezan zastupnik iz EEA ([Metzler Legal](https://metzler-legal.de/euipo-notice-absence-of-formal-requirements)) [S]; cena zastupnika nije pronađena [N] |
| Madrid (preko srpske baze) | WIPO osnovna taksa CHF 653 (crno-belo) ili 903 (boja) + pojedinačne takse ([WIPO](https://www.wipo.int/en/web/madrid-system/fees/sched)) [S, snippet zvanične strane]; za EU 820 EUR prva klasa, nepotvrđeno, slab izvor ([PatentPC](https://patentpc.com/blog/madrid-protocol-fee-structures-breaking-down-costs-by-region)) [S, N]; taksa ZIS-a za prosleđivanje nepoznata [N] | nije nađen | Traži osnovnu srpsku prijavu; za samo EU skuplje i složenije od direktnog EUTM [Z]. Zavisnost od osnovnog žiga prvih 5 godina je opšte znanje, nije proveren [N] |

**Provereno i neprovereno u ovim brojevima.** Nijedna taksa nije pročitana na otvorenoj zvaničnoj stranici; svi iznosi dolaze iz opisa rezultata pretrage.

- **ZIS i EUIPO iznosi** su iz snippeta stranica zvaničnih sajtova [S]; ZIS iznos potvrđuje i jedan advokatski izvor.
- **ZIS tarifa** je resetovana 1. jula 2025, a republičke takse su indeksirane 1. jula 2026 ([Paragraf](https://www.paragraf.rs/dnevne-vesti/020726/020726-vest2.html)) [S]; da li je to promenilo ZIS iznose, nije potvrđeno [N]. Stari iznosi (16.470 RSD i drugi) su zastareli i ne važe.
- **Kurs** od 117,37 RSD/EUR je iz jula-avgusta 2026 ([Kurir](https://biznis.kurir.rs/novcanik/10042116/zvanicni-srednji-kurs-za-7-jul-2026-godine)) [S]; oktobarski kurs nije nađen, pa su evro iznosi približni.
- **Advokat za registraciju u Srbiji:** 200-400 EUR, iz vodiča iz 2017 ([Kaizen](https://kaizencpa.com/Services/info/id/239.html)) [S, zastarelo].
- **Pretraga:** 99 EUR (samo EUTM), 450 EUR (EUTM + 28 država EU), 700-900 EUR (fuzzy pretraga), sve kod jedne EU firme ([Njord Law](https://www.njordlaw.com/european-union-trademarks/faq-trademark-searching-europe)) [S]; cena srpskog mišljenja nije nađena [N].
- **Sve takse treba ponovo proveriti na zvaničnim stranicama pre prijave.**

**Beleške se razilaze oko ZIS pregleda.** Jedna beleška kaže da ZIS sam ispituje samo apsolutne razloge, a ranije žigove prepušta imaocima prava kroz opoziciju. Druga kaže da ZIS i dalje po službenoj dužnosti ispituje i relativne razloge i izdaje privremeno odbijanje ([WTR](https://www.worldtrademarkreview.com/seven-rules-overcoming-provisional-refusal-based-relative-grounds-in-serbia), [CEE Legal Matters](https://ceelegalmatters.com/serbia/12929-serbia-introduces-opposition-system-a-major-leap-towards-more-harmonised-trademark-law)) [S]. Oba su iz snippeta. Posledica je ista u oba slučaja: registracija u ZIS-u nije "čišćenje" za EU ni za neregistrovana prava, pa besplatne pretrage ostaju obavezne; ako druga verzija važi, ZIS bi besplatno pokrio srpski registar. Advokat treba da potvrdi koja je verzija tačna.

**Preporuka (zaključak, ne pravni savet): sada ne podnositi prijavu.** Razlozi:

1. **Klasa 42 je jezgro.** Pokriva izradu sajtova, softver, hosting i SaaS; klasa 35 samo ako prodaješ marketing, SEO ili konsalting; klasa 9 samo ako prodaješ preuzimljive šablone ([TMarkMetric](https://tmarkmetric.com/guides/trademark-class-42-software)) [S]. U ZIS-u klase do tri ne poskupljuju, ali šira lista povećava sukobe i obavezu korišćenja posle 5 godina; u EU klasa 42 sama košta 850 EUR [Z].
2. **Žig bi bio slab.** EUIPO smatra lična imena distinktivnim ([EUIPO smernice](https://guidelines.euipo.europa.eu/1803468/1786565/trade-mark-guidelines/2-1-1-distinctiveness)) [S], ali "Builds" gotovo ništa ne dodaje, pa bi zaštita pokrivala skoro identične oblike (MihailoBuilds, Mihailo Builds), a ne "Mihailo Web" ili "Builds by Mihailo" [Z]. Registracija bi bila štit od kasnijeg kopiranja istog imena, ne pravo da se zabrane slična imena.
3. **Odbrana sopstvenog imena je ograničena.** Čl. 14 EUTMR štiti samo fizičko lice i samo pošteno korišćenje; firme je posle reforme 2015 ne mogu koristiti ([EUTMR čl. 14](https://lexparency.org/eu/32017R1001/ART_14/)) [S]. Srpski zakon ima sličnu odredbu (čl. 41, broj nije potvrđen) ([Zakon o žigovima](https://www.paragraf.rs/propisi/zakon_o_zigovima.html)) [S, N]. "Mihailo Builds" nije puno ime bez prezimena, pa nije jasno da je to "ime" [Z]; ako osnuješ d.o.o., u EU odbrana otpada, a u Srbiji nije proveren [N]. To je argument za odbranu, ne čišćenje.
4. **Rok prioriteta.** Prva prijava u zemlji članici Pariske konvencije daje 6 meseci da se u drugim zemljama podnese prijava sa istim datumom ([WIPO](https://www.wipo.int/en/web/treaties/ip/paris/summary_paris)) [S]. Zato jeftina prijava u Srbiji ostavlja otvorenu EU opciju.
5. **Za podnošenje ranije** govori: nizak ulaz (oko 137-182 EUR), početak roka prioriteta i mogućnost da pregled otkrije sukob dok je promena imena jeftina. **Za čekanje** govori: takse se ne vraćaju ako promeniš ime; B2B frilenser se nalazi preko preporuka i portfolija, ne preko pretrage brenda; bez klijenata još nema brenda koji se brani [Z].

**Plan:** (a) pretrage iz odeljka 6 ove nedelje; (b) ako je ime konačno, jedan kratak razgovor sa advokatom; (c) kad su pretrage čiste i ime i logo konačni (odluka o temi), podneti u Srbiji reč MIHAILOBUILDS u klasi 42, bez logoa; (d) o EUTM odlučiti unutar 6 meseci prioriteta, po tome da li EU klijenti postaju realni u narednih 6-12 meseci; (e) logo posebno, kasnije, posle pretrage MB znakova. Madrid nema smisla za EU samu. Reč bez logoa je moj predlog [Z]: štiti ime u svakom stilu i ne izlaže Mercedesu konkretan crtež.

## Šta Mihailo mora sam da potvrdi

Odgovoreno 2026-10-05 (vidi gore): stavke 1 do 8 i pitanje „50K+“. Ostalo je otvoreno samo 9 i 10.

1. **(odgovoreno: Pexels i drugi besplatni sajtovi; treba registar)** **Fotografije na salon demou:** odakle su (stock sajt, koji; sopstvene; AI), po kojoj licenci (sačuvaj snimak stranice licence na dan preuzimanja), postoji li saglasnost prikazanih osoba, i jesu li tri portreta stvarni ljudi.
2. **(odgovoreno: kurs fotografije)** **Keeper, proizvod:** šta tačno radi (lozinke, čuvanje podataka, vodič za fotografisanje, aplikacija), gde se nudi, da li je cena od $19 aktivna i da li je iko kupio.
3. **(odgovoreno: Gemini, žig skinuo Mihailo; treba dokaz)** **Keeper, slike:** koji generator, kada, koji je vodeni žig uklonjen i zašto.
4. **(odgovoreno: uz AI asistenta; zapisi i dalje potrebni)** **Monogram, nastanak:** istorija repozitorijuma pokazuje da je SVG uveden commit-om od 2026-10-03 koji ima oznaku koautora AI asistenta. To je neutralna činjenica, ali bitna: autorsko pravo traži ljudsko stvaralaštvo (EU: "autorova vlastita intelektualna tvorevina", [Wolters Kluwer](https://legalblogs.wolterskluwer.com/copyright-blog/cjeu-decides-that-the-originality-level-is-the-same-for-all-copyright-works-including-works-of-applied-art/) [S]; srpski zakon: autor je fizičko lice, [Chambers](https://gpg-pdf.chambers.com/Intellectual-Property-2026/253/) [S]), a AI izlaz bez dovoljnog ljudskog doprinosa možda nije zaštićen. Zato zapiši šta si ti zadao, birao, odbacio i menjao, i čuvaj datirane skice, verzije i upite. Pitanje je i ko je crtao raniji "aperture" znak čiju geometriju koristi simbol "AD" na Automation Desk-u [V].
5. **(odgovoreno: nalozi Automation Desk-a su njegovi)** **Nalozi:** ko je vlasnik četiri naloga linkovana na Automation Desk-u (YouTube, Instagram, Facebook, X). Handle @mbhairsalon po svemu sudeći nije tvoj.
6. **(odgovoreno: sav kod uz AI asistenta)** **3D i animacije:** jesi li ti napisao ili generisao three.js kod za salon i canvas animaciju za Automation Desk, i je li ikad korišćen preuzet model (Sketchfab, Spline, Lottie). Istraživanje nije našlo nijedan, ali autorstvo koda ne može da se vidi iz fajlova [N].
7. **(odgovoreno: Claude Design)** **Naslovne slike Automation Desk-a:** kojim alatom su nastale.
8. **(odgovoreno: test podaci)** **Invoice snimak:** jesu li imena klijenata i iznosi test podaci.
9. **Poslovno:** jesi li već podneo neku prijavu žiga; gde su klijenti (samo Srbija ili EU/SAD); radiš li kao preduzetnik ili planiraš d.o.o..
10. **Portfolio stranica:** označava li salon kao koncept i gde. Istraživači tu stranicu nisu videli.

## Ručna provera za 10 minuta

Koraci 1-3, 5 i 7 stanu u oko 10 minuta [Z]; slikovna pretraga i provere salona i Keepera traju duže. Nazivi menija su iz opšteg poznavanja alata i mogu se razlikovati [N]. Znak za uzbunu je svaki znak u klasama 9/35/42 koji sadrži MIHAILO ili BUILD(S), a podnet je pre nego što si počeo da radiš.

| # | Gde | Polja i upit | Klase i filteri |
|---|---|---|---|
| 1 | [TMview](https://www.tmdn.org/tmview/) | Advanced search, Trade mark name: `mihailobuilds`, `mihailo builds`, `mihailo build`, `mihailo`, `mihail builds`, `mikhail builds`, `mykhailo builds`; probaj i "contains" i samo `builds` uz ime | Offices: RS, EM, WO (po želji i HR, BA, ME, MK, SI, BG, RO, HU, AT, DE); status: registrovani i prijave; klase 9, 35, 42, a 37 kao provera građevine |
| 2 | [EUIPO eSearch plus](https://euipo.europa.eu/eSearch/) | Trade marks, reč `mihailo` / `mihailobuilds`, pa ponovo `builds` | Klase 9, 35, 42; status Registered / Filed |
| 3 | [WIPO Global Brand Database](https://branddb.wipo.int/) | Brand tab, Brand name `mihailobuilds` i `mihailo builds`; Designation RS i EM; fonetska pretraga ako postoji | Klase 9, 35, 42 |
| 4 | [ZIS](https://www.zis.gov.rs/) | Online baza žigova (tačna putanja nije potvrđena [N]); `mihailo`, `mihailobuilds`, `build`. Ako je ne nađeš: TMview sa Office RS | - |
| 5 | [APR](https://pretraga.apr.gov.rs/) | Pretraga po nazivu: `mihailo build`, `mihailo bild`, `mihailo gradnja`, `Михаило Билд`, `Михаило Билдс`; privredni subjekti i preduzetnici | - |
| 6 | Domeni | RNIDS WHOIS (.rs), [ICANN lookup](https://lookup.icann.org/) (.com, .dev, .io), EURid (.eu) | NXDOMAIN nije dokaz da je domen slobodan |
| 7 | Handle-ovi | `mihailobuilds` na instagram.com, x.com, tiktok.com/@, youtube.com/@, linkedin.com/company/, github.com; pretraga "mihailo builds" na Fiverr, Upwork, Malt, Behance, Dribbble, Product Hunt; alat Namechk proverava mnogo naloga odjednom (alat treće strane, nije proveren) | - |
| 8 | [USPTO](https://tmsearch.uspto.gov/) | `mihailo builds`, `mihailobuilds` | 9, 35, 42; samo ako ciljaš SAD |

Dodatno za logo, salon i Keeper:

- **Logo, tekst:** TMview i WIPO baza, `MB`, `M B`, `MB.` (i uz Builds, Web, Studio); klase 9, 35, 38, 42 (41 i 45 ako dodaš usluge); EU, DE, UK, RS.
- **Logo, slika:** otpremi PNG (tamna pločica, beli MB; i jednobojnu verziju) u TMview i WIPO bazu; filtriraj po Vienna kodovima za slova (kategorija 27, odeljak 27.5) i geometrijske figure (kategorija 26), brojeve potvrdi u WIPO Vienna pregledaču [N]; WIPO nudi besplatnog AI asistenta za Vienna klasifikaciju ([WIPO](https://www.wipo.int/reference/en/branddb/news/2020/news_0006.html)) [S].
- **Mercedes:** vlasnik "Mercedes-Benz Group AG" / "Daimler": `MB`, `MB.OS`, `MBUX` u EU, UK i DE. U Srbiji se može pojaviti samo kao WIPO/Madrid oznaka.
- **Otvoreni veb:** Google Lens i TinEye na PNG; Google Images, Behance i Dribbble za "MB monogram square"; APR i OpenCorporates za IT firme sa "MB".
- **Demo salon:** TMview, EUIPO, USPTO i UKIPO za `MB HAIR`, `MB HAIR SALON`, `MB SALON`, klase 44 i 3; Google, Google Maps, Instagram i Facebook za ime pod navodnicima uz "hair", "salon", "coiffure"; fonetski susedi.
- **Keeper:** TMview, vlasnik Keeper Security, `KEEPER`, offices RS, EM, WO, klase 9 i 42 (i 41). Ovaj korak je moj predlog da se popuni praznina u beleškama [Z].
- **Beleška:** snimak ekrana sa datumom, upitom, registrom i brojem pogodaka. Za svaki pogodak zapiši klase i status; istekao ili odbijen unos nije sukob.

## Ograničenja istraživanja

- **Registri:** TMview (tmdn.org), ZIS, EUIPO i njegove smernice, WIPO i Global Brand Database, USPTO i APR bili su blokirani; ni jedan zapis iz registra nije otvoren. Zato nigde u ovom izveštaju ne piše da u nekom registru nema sukoba.
- **Ostalo nedostupno:** EUR-Lex i Curia, WHOIS/RDAP, Wayback, Instagram, X, LinkedIn, YouTube, TikTok, Fiverr, Upwork, Unsplash, Pexels, Pixabay, openfontlicense.org, Meta, Viber i Cal.com stranice, Ofcom, NANPA, Wikipedia. Alat za pretragu je samo za SAD, a obrnuta pretraga slika nije bila moguća.
- **Šta je zaista otvoreno [V]:** živi sajtovi *.mihailobuilds.com (samo čitanje), fajlovi u repozitorijumu, DNS preko 8.8.8.8, tekstovi licenci fontova i ikona preko raw.githubusercontent.com i npm registra. Bez prijave na naloge, bez slanja formi i bez kupovine.
- **Većina spoljnih činjenica je iz opisa rezultata pretrage [S]:** firme, žigovi, zakoni, sudske odluke i takse. Takvi opisi su mašinski pisani i ponekad netačni; brojevi članova zakona (čl. 14 EUTMR, čl. 41 srpskog zakona o žigovima) i sudski predmeti treba da se uzmu iz zvaničnog teksta. Smernice EUIPO su viđene samo u starom nacrtu iz 2015, pa treba proveriti aktuelne.
- **Zaključci [Z], ne činjenice:** sve ocene rizika, izračunavanje taksi u evrima, procena da je tužba malo verovatna, preporuka o redosledu prijave, to da Keeper liči na vodič za fotografisanje i da su portreti fotografije a ne AI.
- **Nije proveren [N]:** da li Mihailo ima prijavu žiga; ko je registrovao domene bez DNS-a; da li je Mercedes-Benz Group AG ili Keeper Security zaštićen u EU i Srbiji; trenutno stanje naloga @mbhairsalon; koji je vodeni žig uklonjen sa Keeper slika; da li AI Act (čl. 50) uopšte važi za srpskog operatera; srpski propisi o AI delima i o potrošačkoj zaštiti (nisu čitani). Tekst direktive o nepoštenoj praksi je britanska zadržana verzija i može da zaostaje za izmenama iz 2019.
- **Razilaženja među beleškama:** (1) ZIS pregled relativnih razloga (odeljak 4). (2) Ime MB Hair Salon: "visok" prema "srednje-visok". (3) Keeper: beleške o imenu su pisane bez uvida u sajt, a beleške o licencama su videle stranu sa cenom; zato je ocena imena privremena dok ne potvrdiš šta Keeper radi. (4) Beleška o imenu kaže da je i mihailobuilds.com bio blokiran, dok su druge beleške otvorile poddomene i www; ime i oznaka na glavnom sajtu zato nisu čitani u istraživanju imena. (5) Beleška navodi 17 varijanti domena, a nabraja 18. (6) Agregator za Keeper Security navodi 59% za 19 od 33 žiga; ovde je izostavljen procenat.
- **Nije pravno mišljenje:** nije konsultovan advokat, a pravni tekstovi su uglavnom viđeni kroz sažetke.

## Izvori

Svi izvori pristupljeni 2026-10-04. Vrsta: **V** otvoreno ili preuzeto direktno; **S** sekundarno, samo opis u rezultatu pretrage (snippet), stranica nije otvorena.

| Tema | Izvor | Vrsta | Pristup |
|---|---|---|---|
| Ime | [Petošević, Serbia joins TMview](https://www.petosevic.com/node/3220) | S | 2026-10-04 |
| Ime | [Papagal.bg, Misho Build EOOD](https://papagal.bg/eik/208898556/9c89) | S | 2026-10-04 |
| Ime | [EUIPO smernice, distinktivnost](https://guidelines.euipo.europa.eu/1803468/1786565/trade-mark-guidelines/2-1-1-distinctiveness) | S (zvanična strana, snippet) | 2026-10-04 |
| Ime | [EUTMR čl. 14, lexparency](https://lexparency.org/eu/32017R1001/ART_14/) | S | 2026-10-04 |
| Ime | [Zakon o žigovima, paragraf.rs](https://www.paragraf.rs/propisi/zakon_o_zigovima.html) | S | 2026-10-04 |
| Ime | [Keeper Security, Justia](https://trademarks.justia.com/owners/keeper-security-inc-1605521) | S | 2026-10-04 |
| Ime | [Keeper Security, GleanMark](https://gleanmark.com/owner/keepersecurityinc) | S (agregator) | 2026-10-04 |
| Ime | [dSPACE AutomationDesk](https://www.dspace.com/zh/zho/home/applicationfields/stories/behr-hella_automationdesk.cfm) | S | 2026-10-04 |
| Ime | [XE Invoice Generator](https://www.xe.com:443/invoice-generator) | S | 2026-10-04 |
| Monogram | [Justia, MB.OS](https://trademarks.justia.com/793/35/mb-79335457.html) | S | 2026-10-04 |
| Monogram | [Wikipedia, MB Bank](https://en.wikipedia.org/wiki/MB_Bank) | S | 2026-10-04 |
| Monogram | [Retail Banker International, MB Financial](https://www.retailbankerinternational.com/news/fifth-third-merger-with-mb-financial/) | S | 2026-10-04 |
| Monogram | [US Copyright Office, AI deo 2](https://copyright.gov/newsnet/2025/1060.html) | S | 2026-10-04 |
| Monogram | [Wolters Kluwer, Cofemel](https://legalblogs.wolterskluwer.com/copyright-blog/cjeu-decides-that-the-originality-level-is-the-same-for-all-copyright-works-including-works-of-applied-art/) | S | 2026-10-04 |
| Monogram | [Chambers IP 2026, Srbija](https://gpg-pdf.chambers.com/Intellectual-Property-2026/253/) | S | 2026-10-04 |
| Monogram | [WIPO, Vienna asistent](https://www.wipo.int/reference/en/branddb/news/2020/news_0006.html) | S | 2026-10-04 |
| Demo salon | [Živi demo, mbhairsalon.mihailobuilds.com](https://mbhairsalon.mihailobuilds.com/) | V | 2026-10-04 |
| Demo salon | [JS paket demoa](https://mbhairsalon.mihailobuilds.com/assets/index-BRdNaj8l.js) | V | 2026-10-04 |
| Demo salon | [Sajt MB Salon](https://www.mbhairsalon.com/) | S | 2026-10-04 |
| Demo salon | [Treatwell, MB Hair & Bridal](https://treatwell.co.uk/place/mb-hair-bridal) | S | 2026-10-04 |
| Demo salon | [planplus.rs, Studio MB](https://www.planplus.rs/beograd/frizerski-saloni/30) | S | 2026-10-04 |
| Demo salon | [Instagram, mbhairsalon](https://www.instagram.com/mbhairsalon/) | S | 2026-10-04 |
| Demo salon | [Wikipedia, 555 (telefonski broj)](https://en.wikipedia.org/wiki/555_(telephone_number)) | S | 2026-10-04 |
| Demo salon | [Ofcom, brojevi za dramu](https://ofcom.org.uk/phones-and-broadband/phone-numbers/numbers-for-drama) | S | 2026-10-04 |
| Demo salon | [RFC 2606](https://datatracker.ietf.org/doc/html/rfc2606) | S | 2026-10-04 |
| Demo salon | [UCPD, poglavlje 2, legislation.gov.uk](https://www.legislation.gov.uk/eudr/2005/29/chapter/2/section/1) | S (britanska verzija) | 2026-10-04 |
| Žig | [ZIS takse](https://www.zis.gov.rs/en/rights/fees/) | S (zvanična strana, snippet) | 2026-10-04 |
| Žig | [ZIS e-prijava](https://www.zis.gov.rs/en/e-application/) | S (zvanična strana, snippet) | 2026-10-04 |
| Žig | [ZMP, nove takse](https://www.zmp.eu/news/new-ip-administrative-fees-now-in-effect-in-serbia-and-slovakia/) | S | 2026-10-04 |
| Žig | [Paragraf, indeksacija 2026](https://www.paragraf.rs/dnevne-vesti/020726/020726-vest2.html) | S | 2026-10-04 |
| Žig | [Kurir, kurs 7. jul 2026](https://biznis.kurir.rs/novcanik/10042116/zvanicni-srednji-kurs-za-7-jul-2026-godine) | S | 2026-10-04 |
| Žig | [WTR, Srbija 2019](https://www.worldtrademarkreview.com/guide/the-wtr-yearbook/2019/article/trademark-procedures-and-strategies-serbia) | S (starije izdanje) | 2026-10-04 |
| Žig | [WTR, privremeno odbijanje u Srbiji](https://www.worldtrademarkreview.com/seven-rules-overcoming-provisional-refusal-based-relative-grounds-in-serbia) | S | 2026-10-04 |
| Žig | [CEE Legal Matters, opozicija](https://ceelegalmatters.com/serbia/12929-serbia-introduces-opposition-system-a-major-leap-towards-more-harmonised-trademark-law) | S | 2026-10-04 |
| Žig | [BDK Advokati, vodič 2018](https://bdkadvokati.com/wp-content/uploads/2018/01/T2018Serbia.pdf) | S (starije) | 2026-10-04 |
| Žig | [Kaizen, Srbija](https://kaizencpa.com/Services/info/id/239.html) | S (iz 2017) | 2026-10-04 |
| Žig | [EUIPO, takse](https://www.euipo.europa.eu/en/trade-marks/before-applying/fees-payments) | S (zvanična strana, snippet) | 2026-10-04 |
| Žig | [EUIPO, FAQ o taksama](https://www.euipo.europa.eu/en/help-centre/tm/faq-fees-and-their-payment) | S (zvanična strana, snippet) | 2026-10-04 |
| Žig | [Dudkowiak, EUTM rokovi](https://www.dudkowiak.com/ip-law/eu-trademark-registration-with-euipo/) | S | 2026-10-04 |
| Žig | [Metzler Legal, čl. 41 EUTMR](https://metzler-legal.de/euipo-notice-absence-of-formal-requirements) | S | 2026-10-04 |
| Žig | [Potter Clarkson, SME Fund](https://www.potterclarkson.com/news/the-euipo-sme-fund-a-guide-for-smes) | S | 2026-10-04 |
| Žig | [WIPO, Madrid takse](https://www.wipo.int/en/web/madrid-system/fees/sched) | S (zvanična strana, snippet) | 2026-10-04 |
| Žig | [PatentPC, Madrid takse](https://patentpc.com/blog/madrid-protocol-fee-structures-breaking-down-costs-by-region) | S (slab izvor) | 2026-10-04 |
| Žig | [WIPO, Pariska konvencija](https://www.wipo.int/en/web/treaties/ip/paris/summary_paris) | S (zvanična strana, snippet) | 2026-10-04 |
| Žig | [Njord Law, cene pretrage](https://www.njordlaw.com/european-union-trademarks/faq-trademark-searching-europe) | S | 2026-10-04 |
| Žig | [TMarkMetric, klasa 42](https://tmarkmetric.com/guides/trademark-class-42-software) | S | 2026-10-04 |
| Licence | [OFL.txt, IBM Plex Mono (google/fonts)](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt) | V | 2026-10-04 |
| Licence | [Keeper, početna strana](https://keeper.mihailobuilds.com/) | V | 2026-10-04 |
| Licence | [Keeper, primer slike](https://keeper.mihailobuilds.com/images/_hero/base.png) | V | 2026-10-04 |
| Licence | [Automation Desk, engine-diagram.png](https://automationdesk.mihailobuilds.com/slike/engine-diagram.png) | V | 2026-10-04 |
| Licence | [Automation Desk, JS paket](https://automationdesk.mihailobuilds.com/assets/index-DPArDrGS.js) | V | 2026-10-04 |
| Licence | [three.js deo salon demoa](https://mbhairsalon.mihailobuilds.com/assets/three.module-CvkkdfQm.js) | V | 2026-10-04 |
| Licence | [Phosphor Icons, LICENSE](https://raw.githubusercontent.com/phosphor-icons/web/master/LICENSE) | V | 2026-10-04 |
| Licence | [IHK, Google Fonts presuda](https://www.ihk.de/bergische/recht-und-steuern/wettbewerbsrecht/google-fonts-5646176) | S | 2026-10-04 |
| Licence | [Händlerbund, opomene i zloupotreba](https://ohn.haendlerbund.de/recht/urteile-entscheidungen/138187-urteil-zu-google-fonts-abmahnungen-ohrfeige-fuer-massenabmahner) | S | 2026-10-04 |
| Licence | [Unsplash, saglasnosti i žigovi](https://help.unsplash.com/en/articles/2612329-releases-and-trademarks) | S | 2026-10-04 |
| Licence | [Pexels, pravila](https://help.pexels.com/hc/en-us/articles/360042332714-What-are-the-rules-for-using-Pexels-photos-or-videos) | S | 2026-10-04 |
| Licence | [InfoSoc direktiva, čl. 7](https://www.legislation.gov.uk/eudr/2001/29/article/7/data.html) | S (britanska verzija) | 2026-10-04 |
| Licence | [OpenAI, uslovi korišćenja](https://openai.com/policies/terms-of-use/) | S | 2026-10-04 |
| Licence | [021.rs, narodna i državna zastava](https://www.021.rs/info/srbija/283838/znate-li-razliku-izmedju-drzavne-i-narodne-zastave) | S | 2026-10-04 |
| Licence | [W3C lista, zastave i jezici](https://lists.w3.org/Archives/Public/public-i18n-geo/2004Nov/0006.html) | S (iz 2004) | 2026-10-04 |
| Licence | [PCWorld, Gemini vidljivi žig](https://pcworld.com/article/3213409/google-now-lets-you-nix-visible-gemini-image-watermarks.html) | S | 2026-10-05 |
| Licence | [terms.law, Gemini uslovi](https://terms.law/ai-output-rights/gemini/) | S | 2026-10-05 |
| Licence | [Anthropic, Consumer Terms](https://anthropic.com/legal/terms) | S | 2026-10-05 |
| Licence | [terms.law, vlasništvo nad Claude izlazom](https://terms.law/ai-output-rights/anthropic/) | S | 2026-10-05 |
| Licence | [Meta, WhatsApp brend](https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/) | S | 2026-10-04 |
| Licence | [Viber, media kit](https://www.viber.com/media-kit/) | S | 2026-10-04 |
