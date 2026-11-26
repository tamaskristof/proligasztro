// The advertisers' own homepages: one invented mini-site per banner, at /hirdetes/<slug>/.
// Rules (design-system/README.md → Ads): invented businesses only, no forms or inputs,
// nothing that collects data, satire notice on every page, one blinking element per page.
// Rendered by src/pages/hirdetes/[slug].astro with src/layouts/AdSiteLayout.astro.
//
// A site: { slug, skin, title, name, slogan, blink, nav?, sections, counter, updated, best }
// Section kinds: text (paras), list (items), steps (items), table (head?, rows, note?),
// quotes (items: { text, who, odon? }), contact (rows: [label, value]). Any section may
// carry a fake `button` ({ label, href }) that only jumps within the page.

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
        id: 'szolgaltatasok', title: 'Szolgáltatásaink', kind: 'list',
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
        id: 'kapcsolat', title: 'Kapcsolat', kind: 'contact',
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
];

export function adSite(slug) {
  const site = adSites.find((s) => s.slug === slug);
  if (!site) throw new Error(`Unknown ad site: ${slug}`);
  return site;
}
