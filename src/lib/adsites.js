// The advertisers' own homepages: one invented mini-site per ad (banners and text ads),
// at /hirdetes/<slug>/. Rules (design-system/README.md → Ads): invented businesses only,
// no forms or inputs, nothing that collects data, satire notice on every page, one blinking
// element per page. Rendered by src/pages/hirdetes/[slug].astro with AdSiteLayout.
//
// A site: { slug, skin, title, name, slogan, blink, blinkNote?, badges?, sections,
//           counter, updated, best }
// Section kinds: text (paras, may hold <b>/<mark>), list (items), steps (items),
// table (head?, rows, note?), quotes (items: { text, who, odon? }), contact (rows: [label, value]),
// cards (items: { title, lines, price?, tag? }), faq (items: { q, a }),
// guestbook (items: { name, date, text, reply? }, note?), diploma (lines, sign).
// Any section may carry a fake `button` ({ label, href }) that only jumps within the page;
// `small: true` sets it as small print; `aside: true` puts it in the side column (corporate only).
//
// Skins differ in structure, not just colour (src/styles/adsites.css):
//   prize = narrow centred coupon        corporate = company site with a right-hand column
//   wap = tiny phone-width page          catalog = product cards in a grid
//   letter = long sales letter           dating = profile cards with empty photo frames
//   guestbook = small site built around its guestbook
//   course = Ödön's own site, on his tablecloth   plain = unstyled default HTML
//   faq = questions and answers          festive = Christmas, garland borders, packages
//   construction = nothing but the „feltöltés alatt” sign
// Text ads find their site by `slug` (src/lib/ads.js → textAdPool).

export const adSites = [
  {
    slug: 'nyeremeny',
    skin: 'prize',
    title: 'GRATULÁLUNK! Ön nyert!',
    name: 'Nagy Látogatói Nyereményjáték',
    slogan: 'Hivatalos nyertesoldal *** Minden 1 000 000. látogató nyer!!!',
    blink: 'ÖN NYERT!',
    sections: [
      {
        id: 'gratulalunk', title: 'GRATULÁLUNK!!!', kind: 'text',
        paras: [
          'Kedves Látogató! Ön a 1 000 000. látogató, ezért Ön nyert egy <b>vadonatúj, 800 W-os mikrohullámú sütőt</b>!',
          'Forgótányérral! Kiolvasztás funkcióval! Csengővel, ami szól, ha kész!',
        ],
        button: { label: 'ÁTVESZEM!!!', href: '#atvetel' },
      },
      {
        id: 'atvetel', title: 'Az átvétel menete', kind: 'steps',
        items: [
          'Ne zárja be ezt az ablakot! (Ha bezárta, nyissa meg újra.)',
          'Készítsen elő egy üres ketchupos flakont. Azonosításra szolgál.',
          'Álljon a hűtő mellé, és várjon egy órát. Közben ne nyissa ki a hűtőt.',
          'Mondja ki hangosan: „Átveszem!” Ha senki nem válaszol, minden rendben van.',
          'Sajnos a nyereményt már átvették: 2008. november 22-én Zs. Ödön (Budapest) vitte haza. Azóta bögrés pörköltet főz benne, és a sütő ezt nem heverte ki.',
        ],
      },
      {
        id: 'nyerteseink', title: 'Korábbi nyerteseink', kind: 'list',
        items: [
          'Zs. Ödön, Budapest – mikrohullámú sütő (800 W)',
          'K. Katalin, Kecskemét – mikrohullámú sütő (még dobozban)',
          'B. Ferenc, Szeged – mikrohullámú sütő (a forgótányér külön érkezik)',
          'Névtelen, hajnali 3 órakor – mikrohullámú sütő',
        ],
      },
      {
        id: 'igazolas', title: 'Nyerteseink mondták', kind: 'quotes',
        items: [
          { text: 'Igazolom, hogy a sütő megérkezett, és azóta is szolgál. Kissé jobban, mint szeretné. A bögrét sajnos nem tudtam kimosni.', who: 'Zs. Ö., ínyenc, Budapest', odon: true },
          { text: 'Már ki is próbáltam!!! Minden vasárnap ebben melegítem a tésztát!!!', who: 'K. Katalin, Kecskemét' },
        ],
      },
      {
        id: 'apro', title: 'Részvételi szabályzat', kind: 'text', small: true,
        paras: [
          'A játékban minden látogató 1 000 000. látogatónak számít. A nyeremény egy darab, és már elfogyott. Ugyanazon látogató többször is nyerhet, de nem kap semmit. A nyereményjáték szervezője nem létezik, de nagyon sajnálja.',
        ],
      },
    ],
    counter: '0999999',
    updated: '2008.11.22.',
    best: '800×600 felbontásra optimalizálva',
  },

  {
    slug: 'mikro-tisztitas',
    skin: 'corporate',
    title: 'Mikrohullámú sütő tisztítás 0–24 Kft. – Kezdőlap',
    name: 'Mikrohullámú sütő tisztítás 0–24 Kft.',
    slogan: 'Bögrés pörkölt után is! · Kiszállás 1 órán belül (kivéve, ha nem)',
    blink: 'AKCIÓ!',
    blinkNote: 'Minden 10. tisztítás után a forgótányért is lemossuk!',
    sections: [
      {
        id: 'udvozoljuk', title: 'Üdvözöljük honlapunkon!', kind: 'text',
        paras: [
          'Cégünk 1998 óta foglalkozik mikrohullámú sütők szakszerű tisztításával. Az odaégett, felrobbant, kifutott és egyéb módon megsértett készülékeket rövid határidővel, garanciával tesszük rendbe.',
          'Munkatársaink képzettek, türelmesek, és már semmin sem lepődnek meg.',
        ],
      },
      {
        id: 'szolgaltatasok', title: 'Szolgáltatásaink', kind: 'list', aside: true,
        items: [
          'Belső tér zsírtalanítása',
          'Forgótányér áztatása (egy éjszakán át)',
          'Ajtóüveg átlátszóvá tétele',
          'Szagtalanítás citrommal és türelemmel',
          'Sürgősségi kiszállás vasárnap este, pörkölt után',
        ],
      },
      {
        id: 'arak', title: 'Árak', kind: 'table',
        head: ['Szolgáltatás', 'Ár'],
        rows: [
          ['Alapdíj (kiszállással)', '4 500 Ft'],
          ['Kifutott tej', '1 200 Ft'],
          ['Felrobbant tojás', '3 400 Ft'],
          ['Bögrés pörkölt után', '+2 900 Ft'],
          ['Irodai mikró, hekk után (a kollégák kérésére)', '9 900 Ft'],
          ['Robbanás utáni állapot', 'egyedi árajánlat'],
        ],
        note: 'Az árak az áfát tartalmazzák. A bögrét nem tisztítjuk, arra külön szakszerviz van.',
      },
      {
        id: 'referenciak', title: 'Referenciáink', kind: 'quotes',
        items: [
          { text: 'Tisztelt Uraim! Köszönöm a múlt hétfői, a múlt csütörtöki és a tegnapelőtti kiszállást. A sütő ismét fehér; a szándékaim változatlanok. Ínyenc üdvözlettel: Ö.', who: 'Ö. úr, Budapest – törzsügyfelünk, heti két kiszállás', odon: true },
          { text: 'Nagyon ügyesek voltak!!! Vasárnap megint hívom magukat!!!', who: 'Kati, Kecskemét' },
          { text: 'Az irodai mikrót azóta senki nem meri használni, de tiszta.', who: 'Egy irodavezető, Budapest' },
        ],
      },
      {
        id: 'kapcsolat', title: 'Kapcsolat', kind: 'contact', aside: true,
        rows: [
          ['Telefon (0–24)', '06-1-MIKRO-NULLA-HUSZONNÉGY'],
          ['E-mail', 'info (kukac) mikro-tisztitas-024 (pont) hu'],
          ['Ügyfélfogadás', 'nincs, mi megyünk Önhöz'],
          ['Iroda', 'a furgonban'],
        ],
      },
    ],
    badges: ['ISO 9001 tanúsítás folyamatban'],
    counter: '003127',
    updated: '2007.03.14.',
    best: 'Legjobban 800×600 felbontásban, a kék „e” betűs böngészővel látható',
  },

  {
    slug: 'csengohang',
    skin: 'wap',
    title: '*** MOBIL-MÁNIA *** Csengőhangok, logók, háttérképek',
    name: 'MOBIL-MÁNIA',
    slogan: 'Csengőhangok * Logók * Háttérképek * A nyár legnagyobb slágerei a mobilodra!',
    blink: 'ÚJ!',
    blinkNote: 'Megjött a karácsonyi kiadás!',
    sections: [
      {
        id: 'top10', title: 'A HÉT TOP 10 CSENGŐHANGJA', kind: 'table',
        head: ['#', 'Csengőhang', 'Kód'],
        rows: [
          ['1.', 'Mikrohullámú sütő csipogása (800 W, 4 perc)', 'CSIPP'],
          ['2.', 'Vízforraló kattanása (Remix)', 'KATT'],
          ['3.', 'Ketchupos flakon utolsó szusszanása', 'PFFF'],
          ['4.', 'Füstjelző (polifonikus)', 'FUST'],
          ['5.', 'Hűtőajtó, éjjel kettőkor', 'HUTO'],
          ['6.', 'Zacskós leves feltépése', 'RECCS'],
          ['7.', 'Olaj sistergése (rántott párizsi mix)', 'SISZ'],
          ['8.', 'Konzervnyitó-ballada', 'NYIT'],
          ['9.', 'Vasaló gőzölése (melegszendvics-verzió)', 'GOZ'],
          ['10.', 'Szaloncukorpapír zörgése (karácsonyi kiadás)', 'ZORR'],
        ],
      },
      {
        id: 'letoltes', title: 'HOGYAN TÖLTSD LE?', kind: 'steps',
        items: [
          'Írd be: TÉSZTA, szóköz, és a csengőhang kódja. Például: TÉSZTA CSIPP',
          'Küldd el SMS-ben a 06-90-KETCHUP számra.',
          'Várj. Várj még egy kicsit.',
          'A csengőhang nem érkezik meg, mert a MOBIL-MÁNIA nem létezik. Ezzel 300 Ft + áfát spóroltál. Szívesen!',
        ],
      },
      {
        id: 'keszulekek', title: 'KOMPATIBILIS KÉSZÜLÉKEK', kind: 'text',
        paras: [
          'Minden telefonnal működik, aminek van csengője. A polifonikus hangokhoz legalább 16 szólamú készülék kell. A színes háttérképek csak színes kijelzőn színesek.',
        ],
      },
      {
        id: 'jogi', title: 'JOGI NYILATKOZAT', kind: 'text', small: true,
        paras: [
          'Az SMS díja 300 Ft + áfa. Csak 18 éven felülieknek. A szolgáltatás előfizetéses: lemondani a LEMOND szó elküldésével lehet, ami szintén 300 Ft + áfa. A MOBIL-MÁNIA nem vállal felelősséget a kollégák arckifejezéséért, ha munkahelyen szól a füstjelző.',
        ],
      },
    ],
    counter: '0158342',
    updated: '2006.07.02.',
    best: 'WAP-ról is elérhető! 800×600 felbontásra optimalizálva',
  },
  // ---------- Text-ad advertisers ----------

  {
    slug: 'ketchup-nagyker',
    skin: 'catalog',
    title: 'Ketchup Nagykereskedés Kft. – Termékkatalógus',
    name: 'KETCHUP NAGYKER KFT.',
    slogan: 'Éttermeknek, menzáknak és diákoknak – 1994 óta',
    blink: 'AKCIÓ!',
    blinkNote: 'Most 20% kedvezmény minden 5 literes kiszerelésre!',
    sections: [
      {
        id: 'katalogus', title: 'Termékkatalógus', kind: 'cards',
        items: [
          { title: 'Ketchup, csemege', lines: ['0,5 literes flakon', 'Karton: 12 db'], price: '390 Ft/db' },
          { title: 'Ketchup, csípős', lines: ['1 literes flakon', '„Közepesen csíp”'], price: '690 Ft/db' },
          { title: 'Ketchup, 5 literes kanna', lines: ['Csappal!', 'Menzáknak, kollégiumoknak'], price: '2 900 Ft', tag: '-20%' },
          { title: 'Ketchup, 20 literes vödör', lines: ['Fedővel', 'Diákoknak egy félévre'], price: '9 900 Ft' },
          { title: 'Ketchup, 1000 literes tartály', lines: ['Targoncával rakodjuk', 'Csak előre utalással'], price: 'egyedi ár' },
          { title: 'Ketchupos tasak, 10 g', lines: ['A gyorsbüfékből ismerős', 'Doboz: 500 db'], price: '1 490 Ft/doboz' },
        ],
      },
      {
        id: 'szallitas', title: 'Szállítási feltételek', kind: 'list',
        items: [
          'Budapesten belül 50 000 Ft felett ingyenes',
          'Vidékre raklapon, előre egyeztetett napon',
          'A 20 literes vödröt lépcsőházba nem visszük fel',
          'Legkisebb rendelés: egy karton vagy egy vödör',
        ],
      },
      {
        id: 'vevoink', title: 'Vevőink mondták', kind: 'quotes',
        items: [
          { text: 'A menza azóta minden körethez ketchupot ad. A gyerekek nem panaszkodnak, a szakácsok sem.', who: 'Egy iskolai konyha vezetője' },
          { text: 'A 20 literes vödör kitartott a félév végéig. Utána az albérletből is ki kellett költöznünk.', who: 'Egy kollégista, Debrecen' },
        ],
      },
      {
        id: 'kapcsolat', title: 'Rendelés', kind: 'contact',
        rows: [
          ['Rendelésfelvétel', '06-1-KETCHUP-NAGYKER'],
          ['E-mail', 'rendeles (kukac) ketchup-nagyker-kft (pont) hu'],
          ['Raktár', 'egy ipari park hátsó udvarán, a harmadik kapu'],
          ['Nyitva', 'hétfőtől péntekig 6–14 óráig, szombaton csak vödröt adunk ki'],
        ],
      },
    ],
    counter: '012904',
    updated: '2005.09.30.',
    best: 'Legjobban 1024×768 felbontásban látható. Az árak nagykereskedelmi árak.',
  },

  {
    slug: 'ketchupdieta',
    skin: 'letter',
    title: 'Fogyjon le 12 kilót ketchuppal! – A titok, amit az orvosok utálnak',
    name: 'A KETCHUPDIÉTA TITKA',
    slogan: 'Exkluzív, ingyenes beszámoló – csak ma olvasható!',
    blink: 'CSAK MA!',
    sections: [
      {
        id: 'titok', title: 'Az orvosok utálják ezt az egyszerű trükköt!', kind: 'text',
        paras: [
          'Kedves Olvasó! Tudta, hogy egy átlagos háztartás kamrájában akár <b>12 kiló ketchup</b> is állhat?',
          'Én is így éltem. A polcon, a szekrényben, az ágy alatt. Évekig. Aztán rájöttem a titokra.',
          '<mark>Megettem.</mark>',
          'Három hét alatt a kamra <b>12 kilóval lett könnyebb</b>. Garantáltan! Az orvosok nem is utáltak érte, csak sokáig hallgattak, aztán megkérdezték, eszem-e mást is.',
        ],
      },
      {
        id: 'modszer', title: 'A módszer, 3 egyszerű lépésben', kind: 'steps',
        items: [
          'Reggel ketchup.',
          'Délben ketchup, tésztával (ha van).',
          'Este ketchup, de csak kevés, mert este már nem illik.',
        ],
      },
      {
        id: 'eredmenyek', title: 'Az eredmények magukért beszélnek!', kind: 'table',
        head: ['Hét', 'A kamra súlya'],
        rows: [['0. hét', '14,0 kg'], ['1. hét', '10,2 kg'], ['2. hét', '6,5 kg'], ['3. hét', '2,0 kg']],
        note: 'A kamra súlya a polcokkal együtt értendő. Az olvasó súlyát nem mérjük, és nem is kérdezzük.',
      },
      {
        id: 'velemenyek', title: 'Akik már kipróbálták:', kind: 'quotes',
        items: [
          { text: 'A kamrám sosem volt ilyen karcsú!!!', who: 'K., Kecskemét' },
          { text: 'Kipróbáltam. A kamra lefogyott, én nem, de nem is ez volt a cél.', who: 'Egy olvasó, Pécs' },
        ],
      },
      {
        id: 'ps', title: 'P.S.', kind: 'text',
        paras: [
          'Az ingyenes próbacsomag elfogyott. Az egészet megettük.',
          '<b>P.P.S.</b> Ez nem diéta, és nem is tanács. Egyen rendesen, és ha az egészségéről van kérdése, orvost kérdezzen. Ketchupról nem.',
        ],
      },
    ],
    counter: '000412',
    updated: '2008.01.02.',
    best: 'Nyomtassa ki, és tegye a hűtőre!',
  },

  {
    slug: 'inyenc-tarskereso',
    skin: 'dating',
    title: 'Ínyenc Társkereső – Találja meg párját az asztalnál!',
    name: 'Ínyenc Társkereső',
    slogan: 'Mert a szerelem is a gyomron át vezet. A regisztráció ingyenes!',
    blink: 'ÚJ TAGOK!',
    sections: [
      {
        id: 'udvozoljuk', title: 'Üdvözöljük!', kind: 'text',
        paras: [
          'Oldalunkon 2004 óta találnak egymásra azok, akik ugyanúgy szeretik a tésztát. Tagjaink között vannak al dente-hívők, puhára főzők, és olyanok is, akik a tésztát a hideg vízzel együtt teszik fel. Mindenkit szeretettel várunk.',
        ],
      },
      {
        id: 'tagjaink', title: 'Legújabb tagjaink', kind: 'cards',
        items: [
          { title: 'Ödön (Budapest)', lines: ['Keres: valakit, aki a bögrét is kimossa.', 'Kedvenc étele: a jól megírt kritika.', 'Mottója: „A ketchup nem szósz, hanem vallomás.”'], tag: 'Ínyenc' },
          { title: 'Tünde (Szeged)', lines: ['Keres: al dente társat.', 'Kedvenc étele: rakott krumpli, másnap.', 'Utólag nem sóz.'] },
          { title: 'Gábor (Győr)', lines: ['Keres: valakit, aki ért a mikrohullámú sütőhöz.', 'Kedvenc étele: bögrés süti, 90 másodperc.', 'Konyhája: van.'] },
          { title: 'Márta (Miskolc)', lines: ['Keres: valakit, aki megeszi a maradékot.', 'Kedvenc étele: töltött káposzta, ötödnap.', 'A receptjeit nem adja ki.'] },
        ],
      },
      {
        id: 'hogyan', title: 'Hogyan működik?', kind: 'steps',
        items: [
          'Nézze meg tagjaink adatlapját.',
          'Válassza ki, kinek a kedvenc étele tetszik.',
          'Főzzön neki.',
          'Ha megette: gratulálunk! Ha nem: a társkereső nem vállal felelősséget.',
        ],
      },
      {
        id: 'regisztracio', title: 'Regisztráció', kind: 'text',
        paras: ['A regisztráció jelenleg szünetel, mert a szerver a konyhában áll, és valaki kihúzta a vízforraló miatt.'],
      },
    ],
    counter: '004088',
    updated: '2006.02.14.',
    best: 'Szívünk és oldalunk 800×600-ra optimalizálva',
  },

  {
    slug: 'bogremoso-szakszerviz',
    skin: 'guestbook',
    title: 'Bögremosó Szakszerviz – Vendégkönyv',
    name: 'Bögremosó Szakszerviz',
    slogan: 'Odaégett pörkölt? Kakaó? Garanciával visszaadjuk bögréje becsületét.',
    blink: 'GARANCIA!',
    blinkNote: '30 nap, vagy amíg újra bele nem főz.',
    sections: [
      {
        id: 'muhely', title: 'Műhelyünkről', kind: 'text',
        paras: ['Szervizünk 2001 óta foglalkozik bögrék szakszerű helyreállításával. Szivacs, szóda, éjszakai áztatás, és ha minden kötél szakad: türelem.'],
      },
      {
        id: 'arak', title: 'Árjegyzék', kind: 'table',
        rows: [
          ['Kávéfolt (friss)', '300 Ft'],
          ['Teakő', '600 Ft'],
          ['Kakaó, kifutva', '900 Ft'],
          ['Bögrés pörkölt, odaégve', '3 500 Ft'],
          ['Bögrés pörkölt, odaégve, egy hét után', 'csak telefonos egyeztetéssel'],
        ],
      },
      {
        id: 'vendegkonyv', title: 'Vendégkönyv', kind: 'guestbook',
        items: [
          { name: 'Ödön', date: '2026.11.25. 23:41', text: 'Tisztelt Szerviz! Hétfő óta három nap telt el. Aggodalmam ínyenci természetű.', reply: 'Kedves Ödön! Kérjük, ne hívjon.' },
          { name: 'Névtelen', date: '2026.11.25. 03:04', text: 'ez a szerviz egy vicc xD' },
          { name: 'kati62', date: '2026.11.24. 07:12', text: 'Én a bögrét mindig rögtön kimosom!!! De nagyon szép a honlapjuk!!!' },
          { name: 'Ödön', date: '2026.11.23. 23:58', text: 'Tisztelt Szerviz! A bögrét hétfőn adtam le. Érdeklődnék, él-e még.', reply: 'Kedves Ödön! Él. Áztatjuk. Kérjük, ne hívjon.' },
        ],
        note: 'Új bejegyzést írni jelenleg nem lehet: a vendégkönyvet a reklámüzenetek miatt lezártuk.',
      },
    ],
    counter: '000777',
    updated: '2004.10.11.',
    best: '800×600 felbontásra optimalizálva',
  },

  {
    slug: 'fozz-ugy-mint-odon',
    skin: 'course',
    title: 'Főzz úgy, mint Ödön! – Online tanfolyam',
    name: 'Főzz úgy, mint Ödön!',
    slogan: 'Online gasztrotanfolyam 10 leckében, oklevéllel és saját köténnyel',
    blink: 'INDUL!',
    blinkNote: 'A következő évfolyam indul, amint jelentkezik valaki.',
    sections: [
      {
        id: 'ajanlas', title: 'Az oktató ajánlása', kind: 'text',
        paras: [
          'Kedves Leendő Hallgatóim!',
          'Tizennyolc évnyi ínyenci tapasztalatomat sűrítettem tíz leckébe. A tanfolyam végére Ön is képes lesz egy ételt úgy megnézni, ahogy az nem érdemli meg.',
          'Ínyenc üdvözlettel: Ö.',
        ],
      },
      {
        id: 'tanmenet', title: 'Tanmenet', kind: 'table',
        head: ['Lecke', 'Téma', 'Időtartam'],
        rows: [
          ['1.', 'A víz felforralása, elméletben', '2 óra'],
          ['2.', 'A tészta és a víz találkozása', '1 óra (+ várakozás)'],
          ['3.', 'A ketchup mint vallomás', '45 perc'],
          ['4.', 'Bögrés ételek, avagy a mikrohullám költészete', '4 perc, 800 W'],
          ['5.', 'A zacskó felnyitása, méltósággal', '30 perc'],
          ['6.', 'Mit mond rólunk a párizsi?', '1 óra'],
          ['7.', 'Hűtő éjjel kettőkor: etika és gyakorlat', 'egész éjjel'],
          ['8.', 'A füstjelző hangja', '3 perc (+ szellőztetés)'],
          ['9.', 'Tálalás: tányér, vagy egyenesen az edényből?', '1 óra'],
          ['10.', 'Vizsga: Ödön megkóstolja', '(+ 2 nap lábadozás)'],
        ],
      },
      {
        id: 'oklevel', title: 'Az oklevél', kind: 'diploma',
        lines: ['Igazoljuk, hogy', '……………………………………', 'sikeresen elvégezte a „Főzz úgy, mint Ödön!” tanfolyamot, és ezentúl jogosult mások ételeit ínyenci szavakkal illetni.'],
        sign: 'Zsírosdeszka Ödön, oktató',
      },
      {
        id: 'tandij', title: 'Tandíj és tartozékok', kind: 'list',
        items: [
          'Tandíj: 19 900 Ft (részletre is: 10 × 1 990 Ft)',
          'Tartozék: saját kötény, „Ö.” monogrammal',
          'Tűzoltó készülék nem tartozék',
          'Ajándék: egy bögre (kimosva)',
        ],
      },
      {
        id: 'hallgatok', title: 'Eddigi hallgatóim', kind: 'quotes',
        items: [
          { text: 'Elvégeztem!!! Ödön azt írta a vizsgámra, hogy „merész, ám végzetes vállalás”!!!', who: 'kati62' },
          { text: 'Mindennel egyetértek, amit az oktató úr mond. Mindennel.', who: 'GasztroGabi' },
        ],
      },
      {
        id: 'jelentkezes', title: 'Jelentkezés', kind: 'text',
        paras: ['Jelentkezni nem kell. Hallgatóim eddig mind maguktól jöttek, és maguktól is mentek.'],
      },
    ],
    counter: '000003',
    updated: '2009.03.03.',
    best: 'A dizájn ismerős lehet: ugyanaz a mester készítette',
  },

  {
    slug: 'hasznaltolaj',
    skin: 'plain',
    title: 'HASZNÁLT SÜTŐOLAJ FELVÁSÁRLÁS',
    name: 'HASZNÁLT SÜTŐOLAJ FELVÁSÁRLÁS',
    slogan: 'Rántott párizsi után maradt? Mi elvisszük, Ön elfelejti.',
    blink: 'ÚJ!',
    blinkNote: 'Most már kannát is adunk!',
    sections: [
      {
        id: 'mit', title: 'Mit veszünk át?', kind: 'list',
        items: [
          'Napraforgóolajat, egyszer használtat',
          'Napraforgóolajat, sokszor használtat',
          'Olajat, amiről már nem tudni, mi volt',
          'Zsírt is, ha kihűlt (a deszkáról is lekaparjuk)',
        ],
      },
      {
        id: 'arak', title: 'Átvételi árak', kind: 'table',
        head: ['Állapot', 'Fizetünk'],
        rows: [
          ['Világos, szagtalan', '10 Ft/liter'],
          ['Barna, rántott párizsi után', '5 Ft/liter'],
          ['Fekete, ismeretlen eredetű', 'mi nem fizetünk, Ön sem'],
          ['Hekk után', 'kérjük, előtte hívjon'],
        ],
      },
      {
        id: 'menete', title: 'Hogyan működik?', kind: 'steps',
        items: [
          'Az olajat kihűtve, kupakos flakonba töltse.',
          'Hívjon minket.',
          'Kiszállunk, elvisszük.',
          'Ön elfelejti. Mi nem.',
        ],
      },
      {
        id: 'kapcsolat', title: 'Kapcsolat', kind: 'contact',
        rows: [
          ['Telefon', '06-30-OLAJ-OLAJ'],
          ['Átvétel', 'minden csütörtökön, a ház előtt, 18 óráig'],
          ['E-mail', 'olaj (kukac) hasznaltolaj-felvasarlas-024 (pont) hu'],
        ],
      },
    ],
    counter: '000058',
    updated: '2003.05.20.',
    best: 'Ez az oldal minden böngészőben egyformán néz ki',
  },

  {
    slug: 'vasalotisztitas',
    skin: 'faq',
    title: 'Vasalótisztítás 0–24 – Gyakran ismételt kérdések',
    name: 'Vasalótisztítás 0–24',
    slogan: 'Májkrém? Olvadt sajt? Talpfelújítás garanciával, ingét is megmentjük.',
    blink: 'ÚJ!',
    blinkNote: 'Most már gőzölős vasalót is vállalunk!',
    sections: [
      {
        id: 'gyik', title: 'Gyakran ismételt kérdések', kind: 'faq',
        items: [
          { q: 'Melegszendvicset sütöttem a vasalóval. Ez normális?', a: 'Nem. De nem Ön az első, és a héten nem is az utolsó.' },
          { q: 'Le lehet szedni a talpról a májkrémet?', a: 'Igen. A szagot nem garantáljuk.' },
          { q: 'Az ingem azóta májkrémszagú. Mit tegyek?', a: 'Viselje büszkén. Vagy hozza be, kimossuk.' },
          { q: 'Mennyi ideig tart a tisztítás?', a: 'Sajtnál egy nap, májkrémnél kettő, ha mindkettő, egy hét.' },
          { q: 'Hétvégén is kiszállnak?', a: 'Igen, 0–24. Kivéve vasárnap délután, mert akkor mi is melegszendvicset eszünk.' },
          { q: 'A vasalódeszkát is megtisztítják?', a: 'Igen, a vasalóval együtt féláron.' },
        ],
      },
      {
        id: 'arak', title: 'Árak', kind: 'table',
        rows: [
          ['Talptisztítás, sajt', '2 500 Ft'],
          ['Talptisztítás, májkrém', '3 900 Ft'],
          ['Talptisztítás, májkrém és sajt', '5 900 Ft'],
          ['Ing megmentése', '1 500 Ft/db'],
        ],
      },
      {
        id: 'kapcsolat', title: 'Kapcsolat', kind: 'contact',
        rows: [
          ['Telefon (0–24)', '06-1-VASALÓ-NULLA-HUSZONNÉGY'],
          ['E-mail', 'info (kukac) vasalotisztitas-024 (pont) hu'],
          ['Testvércégünk', 'Mikrohullámú sütő tisztítás 0–24 Kft.'],
        ],
      },
    ],
    counter: '002211',
    updated: '2007.03.14.',
    best: 'Legjobban 800×600 felbontásban látható',
  },

  {
    slug: 'szaloncukor-utantoltes',
    skin: 'festive',
    title: 'Szaloncukor-utántöltés – Kellemes Karácsonyi Ünnepeket!',
    name: 'Szaloncukor-utántöltés',
    slogan: 'Üres papírok a fán? Mi visszatöltjük, senki sem veszi észre.',
    blink: 'KARÁCSONYI AKCIÓ!',
    blinkNote: 'Rendelés december 23-ig, utána csak csoda.',
    sections: [
      {
        id: 'igy', title: 'Így dolgozunk', kind: 'steps',
        items: [
          'Ön összeszedi a fáról az üres papírokat (óvatosan, hogy ne szakadjanak el).',
          'Mi kézzel visszatöltjük őket.',
          'Visszaakasztjuk a fára, mindegyiket a saját ágára.',
          'Szenteste mindenki meglepődik. Mi is.',
        ],
      },
      {
        id: 'csomagok', title: 'Csomagjaink', kind: 'cards',
        items: [
          { title: 'Kis csomag', lines: ['20 papír visszatöltése', 'Zselés vagy fondant'], price: '1 900 Ft' },
          { title: 'Családi csomag', lines: ['50 papír', 'Visszaakasztással'], price: '3 900 Ft', tag: 'Népszerű!' },
          { title: 'Teljes fa csomag', lines: ['100 papír', 'Eredeti hajtogatással, nyomtalanul'], price: '6 900 Ft' },
        ],
      },
      {
        id: 'toltelekek', title: 'Választható töltelékek', kind: 'list',
        items: ['Zselés (meggy, narancs)', 'Fondant', 'Marcipános', 'Tiramisu ízű (idei újdonság)'],
      },
      {
        id: 'velemenyek', title: 'Ügyfeleink írták', kind: 'quotes',
        items: [
          { text: 'A tiramisuhoz minden szaloncukrot leszedtem a fáról. Önök nélkül a karácsony csak papírból állt volna. Ínyenc üdvözlettel: Ö.', who: 'Ö., Budapest', odon: true },
        ],
      },
    ],
    counter: '001224',
    updated: '2005.12.01.',
    best: 'Kellemes Karácsonyi Ünnepeket és Boldog Új Évet kívánunk minden kedves Látogatónknak!',
  },

  {
    slug: 'konzervnyito-szerviz',
    skin: 'construction',
    title: 'Konzervnyitó-szerviz – Az oldal feltöltés alatt',
    name: 'Konzervnyitó-szerviz',
    slogan: 'Letört a fül a dobozon? Kinyitjuk, bármi van benne.',
    blink: 'HAMAROSAN!',
    sections: [
      {
        id: 'hamarosan', title: 'Honlapunk hamarosan elkészül!', kind: 'text',
        paras: [
          'Kedves Látogató! Honlapunk feltöltés alatt áll. Addig is szeretettel várjuk műhelyünkben.',
          'Amit már most is vállalunk: konzervek nyitása letört füllel, fül nélkül, és olyankor is, amikor senki sem tudja, mi van benne.',
        ],
      },
      {
        id: 'kapcsolat', title: 'Elérhetőség', kind: 'contact',
        rows: [
          ['Telefon', '06-1-NYITVA-VAN'],
          ['Nyitvatartás', 'amikor nyitva van'],
          ['E-mail', 'szerviz (kukac) konzervnyito-szerviz (pont) hu'],
        ],
      },
    ],
    counter: '000002',
    updated: '2006.04.01.',
    best: 'Feltöltés alatt 2006 óta',
  },
];

export function adSite(slug) {
  const site = adSites.find((s) => s.slug === slug);
  if (!site) throw new Error(`Unknown ad site: ${slug}`);
  return site;
}
