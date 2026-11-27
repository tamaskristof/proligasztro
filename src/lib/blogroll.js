// The blogs in Ödön's sidebar blogroll: one invented, long-frozen mini-blog per entry,
// at /blogroll/<slug>/. Rules (design-system/README.md → Blogroll): invented people and blogs
// only, no forms or inputs, satire notice on every page, at most one blinking element per page.
// Ödön turns up in their comments, formal as ever, in his note hand. Rendered by
// src/pages/blogroll/[slug].astro with BlogrollLayout.
//
// A blog: { slug, skin, name, label? (sidebar text, defaults to name), tagline, author, engine, counter, updated,
//           banner?, crumb?, index?, commentsLabel?, commentsNote?, blink?, sections }
// `index`: { title, style: 'table' | 'list', note? } lists the posts at the top (jumps within the page).
// Section kinds:
//   post      { id, title, date, author, rank?, odon?, paras, comments? }
//             comments: [{ name, date, text, rank?, odon?, reply? }]
//   text      { title, paras }        list { title, items }
//   links     { title, items: [{ label, slug? | home? }] }  slug = another blogroll blog,
//             home = Proligasztró itself; neither = plain text (a dead link).
//   guestbook { title, items: [{ name, date, text, odon?, reply? }], note? }
//   award     { title, month, lines, sign }
// `aside: true` puts a section in the side column (archive skin only).
//
// Skins differ in structure, not just colour (src/styles/blogroll.css):
//   forum = phpBB-style board, topic table, user column beside every message
//   lodge = narrow club page: award diploma, rules, the guestbook is the main event
//   essay = white literary blog, one wide serif column, drop caps, small comments
//   archive = classic pink blog template with a left sidebar, frozen under an „archív” banner
//   chronicle = narrow typewriter page, numbered chapters, table of contents

export const blogs = [
  {
    slug: 'tokfozelek-barati-kor',
    skin: 'forum',
    name: 'Tökfőzelék Baráti Kör',
    tagline: 'Fórum. Alapítva 2003-ban, a kapor kérdésében azóta is vitában.',
    author: 'a Kör',
    engine: 'Fórummotor: phpTök 2.0.22',
    counter: '0 018 377',
    updated: '2026.05.16.',
    crumb: 'Fórum index » Közlemények',
    index: { title: 'Témák', style: 'table' },
    commentsLabel: 'Válaszok',
    commentsNote: 'A témához csak regisztrált tagok szólhatnak hozzá. A regisztráció szünetel.',
    sections: [
      {
        id: 'jegyzokonyv-2008', kind: 'post',
        title: 'Jegyzőkönyv – a 2008. évi rendes közgyűlésről',
        date: '2008.06.02. 20:14', author: 'Ilonka_titkár', rank: 'Titkár',
        paras: [
          'Helyszín: az Elnökasszony konyhája. Jelen van: 9 tag és 1 tök.',
          'Napirend: 1. A kapor kérdése. 2. Tagfelvételi kérelmek. 3. Egyebek.',
          '1. A kapor kérdésében a Kör nem jutott dűlőre. A vitát 21:40-kor a fasírt megérkezése szakította félbe. A kérdést a következő közgyűlés napirendjére tűzzük.',
          '2. Egy tagfelvételi kérelem érkezett (Zs. Ö., Budapest). A kérelmező háromoldalas kísérőlevelet csatolt, amelyben a tökfőzeléket „a magyar konyha szelíd, ám alulértékelt hangjának” nevezi. A Kör a levelet felolvasta, a kérelmet pedig a következő közgyűlés napirendjére tűzte.',
          '3. Egyebek: a habarás legyen lisztes. Ellenvetés nem volt.',
          'Jegyzőkönyvet vezette: Ilonka, titkár. Hitelesítette: a tök.',
        ],
        comments: [
          { name: 'tokos_laci', rank: 'Alapító tag', date: '2008.06.02. 21:03', text: 'Kapor nélkül az nem tökfőzelék, hanem főtt tök. Ezt jegyzőkönyvbe kérem.' },
          { name: 'Ilonka_titkár', rank: 'Titkár', date: '2008.06.02. 21:10', text: 'Laci, jegyzőkönyvbe vettem. Megint.' },
          { name: 'zs.odon', rank: 'Tagjelölt', odon: true, date: '2008.06.03. 23:52', text: 'Tisztelt Kör! Köszönöm, hogy kísérőlevelemet felolvasták. Türelemmel várom a következő közgyűlést. Addig is jelzem: a tökfőzelék textúrája az a ritka pillanat, amikor a puhaság nem gyengeség, hanem hitvallás. Ínyenc üdvözlettel: Zsírosdeszka Ödön' },
          { name: 'Elnökasszony', rank: 'Elnök', date: '2008.06.04. 08:15', text: 'Kedves Ödön! Szép volt, amit írt. Legközelebb kérjük rövidebben.' },
        ],
      },
      {
        id: 'tagfelveteli-kerelem', kind: 'post',
        title: 'Tagfelvételi kérelem – Zs. Ö. (Budapest)',
        date: '2009.05.15. 22:30', author: 'zs.odon', rank: 'Tagjelölt', odon: true,
        paras: [
          'Tisztelt Kör!',
          'Tisztelettel érdeklődöm 2008. május 15-én benyújtott tagfelvételi kérelmem állásáról. Mellékelem kísérőlevelem második, bővített kiadását (öt oldal, tartalomjegyzékkel).',
          'Ínyenc üdvözlettel: Zsírosdeszka Ödön, gasztrokritikus',
        ],
        comments: [
          { name: 'Elnökasszony', rank: 'Elnök', date: '2009.05.16. 08:40', text: 'Kedves Ödön! Kérelmét a következő közgyűlés napirendjére tűztük.' },
          { name: 'zs.odon', rank: 'Tagjelölt', odon: true, date: '2010.05.15. 23:05', text: 'Tisztelt Kör! Ismét érdeklődöm. Kísérőlevelem harmadik kiadása már tárgymutatót is tartalmaz.' },
          { name: 'Elnökasszony', rank: 'Elnök', date: '2010.05.17. 07:55', text: 'Kedves Ödön! Napirendre tűztük.' },
          { name: 'zs.odon', rank: 'Tagjelölt', odon: true, date: '2014.05.15. 23:40', text: 'Tisztelt Kör! Érdeklődöm.' },
          { name: 'Ilonka_titkár', rank: 'Titkár', date: '2014.05.16. 09:12', text: 'Napirenden van, Ödön.' },
          { name: 'tokos_laci', rank: 'Alapító tag', date: '2019.05.16. 18:30', text: 'Ödön, maga kaporpárti vagy kaporellenes? Ezen múlik minden.' },
          { name: 'zs.odon', rank: 'Tagjelölt', odon: true, date: '2019.05.16. 23:47', text: 'Kedves tokos_laci! A kritikus nem pártol, hanem mérlegel. Ínyenc üdvözlettel: Ö.' },
          { name: 'tokos_laci', rank: 'Alapító tag', date: '2019.05.17. 06:10', text: 'Akkor napirendre tűzzük.' },
          { name: 'zs.odon', rank: 'Tagjelölt', odon: true, date: '2026.05.15. 23:58', text: 'Tisztelt Kör! Tizennyolcadszor is érdeklődöm. Ö.' },
          { name: 'Elnökasszony', rank: 'Elnök', date: '2026.05.16. 08:02', text: 'Kedves Ödön! A következő közgyűlés napirendjén szerepel. Fasírt lesz.' },
        ],
      },
      {
        id: 'kapor-igen-vagy-nem', kind: 'post',
        title: 'Kapor: igen vagy nem? (lezárva)',
        date: '2007.09.03. 19:21', author: 'tokos_laci', rank: 'Alapító tag',
        paras: ['Döntsük el egyszer s mindenkorra.'],
        comments: [
          { name: 'Margitka', rank: 'Tiszteletbeli tag', date: '2007.09.04. 10:05', text: 'Én egy kicsit teszek bele, és nem mondom meg senkinek. Szeretettel: Margitka' },
          { name: 'tokos_laci', rank: 'Alapító tag', date: '2007.09.04. 10:31', text: 'Margitka, most megmondta.' },
          { name: 'Elnökasszony', rank: 'Elnök', date: '2008.02.11. 20:00', text: 'A témát 412 hozzászólás után lezárom. Közelebb nem jutottunk. Mindenki főzze úgy, ahogy szereti, és ne szóljon a másiknak.' },
        ],
      },
      {
        id: 'ki-van-itt', kind: 'text', title: 'Ki van itt?',
        paras: ['Jelenleg 1 regisztrált tag (zs.odon) és 0 vendég böngészi a fórumot. Legtöbb felhasználó egyszerre: 11 (2008.06.02., közgyűlés).'],
      },
      {
        id: 'kapcsolodo', kind: 'links', title: 'Kapcsolódó oldalak',
        items: [
          { label: 'Margitka receptjei', slug: 'margitka-receptjei' },
          { label: 'Zsírszalonna Klub', slug: 'zsirszalonna-klub' },
          { label: 'Főzelékbarátok Egyesülete (megszűnt)' },
        ],
      },
    ],
  },

  {
    slug: 'zsirszalonna-klub',
    skin: 'lodge',
    name: 'Zsírszalonna Klub',
    tagline: 'Alapítva 1998-ban, egy disznóvágás utáni hajnalon. Jelmondatunk: „Vékonyra, de sokat.”',
    author: 'Szalonnás Béla, klubelnök',
    engine: 'Készítette: Béla unokaöccse, FrontPage-dzsel',
    counter: '0 006 512',
    updated: '2011.11.30.',
    blink: 'ÚJ!',
    sections: [
      {
        id: 'a-honap-szalonnaja', kind: 'award', title: 'A hónap szalonnája',
        month: '2011. november',
        lines: [
          'Kategória: kenyérszalonna, házi füstölés',
          'Vastagság: 4 cm (a zsűri mérése szerint 3,8)',
          'Indoklás: „Komoly szalonna. Nem kért semmit, csak hagymát.”',
        ],
        sign: 'A zsűri nevében: Szalonnás Béla, klubelnök',
      },
      {
        id: 'klubszabalyok', kind: 'list', title: 'Klubszabályok',
        items: [
          'A szalonnát bicskával vágjuk, a deszkán, magunk felé. A bicska saját.',
          'A kenyér héja nem hagyható meg. (E kérdésben egyetértünk A Kenyérhéj Krónikáival.)',
          'Ketchup a klubházban nem tartható. Kivétel nincs, Ödön.',
          'Vegetáriánus vendéget szeretettel látunk: övé a hagyma.',
        ],
      },
      {
        id: 'klubhirek', kind: 'post',
        title: 'Klubhírek: őszi szalonnasütés',
        date: '2011.10.09. 21:15', author: 'Szalonnás Béla, klubelnök',
        paras: [
          'Az őszi szalonnasütést megtartottuk. Jelen volt 14 tag, 1 tiszteletbeli tag és 6 kiló szalonna. A végére fél kiló maradt, azt Ödön vitte haza „elemzésre”.',
          'A tűz jó volt, az eső később jött. A csepegtetett kenyérből jutott mindenkinek.',
        ],
      },
      {
        id: 'vendegkonyv', kind: 'guestbook', title: 'Vendégkönyv',
        items: [
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2008.11.02. 23:41', text: 'Tisztelt Klub! A szalonna nem étel, hanem életmű. Kérem, vegyenek fel levelezőlistájukra. Ínyenc üdvözlettel: Zs. Ö.', reply: 'Felvettük. – Béla' },
          { name: 'kati62', date: '2009.01.14. 16:20', text: 'Nálunk vasárnap mindig szalonnasütés van, télen is a teraszon!!! Az unokák imádják!!!', reply: 'Ez a beszéd, kati62! – Béla' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.06.20. 01:12', text: 'Tisztelt Klub! Elnézést kérek a júniusi szalonnasütésen tett megjegyzésemért, amely szerint a szalonna „ketchuppal válna teljessé”. Kijelentésemet visszavonom. Ö.', reply: 'Tudomásul vettük. A 3. szabály marad. – Béla' },
          { name: 'Névtelen', date: '2010.03.03. 03:12', text: 'ez az oldal egy vicc xD', reply: 'A szalonna nem vicc. – Béla' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2011.11.30. 22:58', text: 'Tisztelt Zsűri! Gratulálok a hónap szalonnájához. Ízvilága egyszerre rusztikus és meditatív, a hagyma pedig nem kíséret, hanem tanú. Ö.', reply: 'Köszönjük, Ödön. Tiszteletbeli tagságát ezennel megerősítjük. – Béla' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2024.11.02. 23:15', text: 'Tisztelt Klub! Tizenhat éve vagyok tiszteletbeli tag. Lesz idén szalonnasütés? Ö.' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2025.11.02. 23:20', text: 'Tisztelt Klub! Hozom a bicskámat. Ö.' },
        ],
        note: 'A vendégkönyv megtelt, új bejegyzés nem írható. A papír vendégkönyv a klubházban van, a kenyértartó mellett.',
      },
      {
        id: 'barataink', kind: 'links', title: 'Barátaink',
        items: [
          { label: 'Tökfőzelék Baráti Kör', slug: 'tokfozelek-barati-kor' },
          { label: 'A Kenyérhéj Krónikái', slug: 'a-kenyerhej-kronikai' },
          { label: 'Proligasztro (?)', home: true },
        ],
      },
    ],
  },

  {
    slug: 'gulyas-es-lelek',
    skin: 'essay',
    name: 'Gulyás és Lélek',
    tagline: 'Esszék a bográcsról, a létről és a kettő közötti fakanálról',
    author: 'Bográcsi Elemér',
    engine: 'Szövegszerkesztő: kézzel, majd begépelve',
    counter: '0 000 412',
    updated: '2010.09.21.',
    commentsLabel: 'Gondolatok',
    commentsNote: 'A gondolatok lezárultak.',
    sections: [
      {
        id: 'miert-nem-irok-tobbe', kind: 'post',
        title: 'Miért nem írok többé',
        date: '2010.09.21. 23:59', author: 'Bográcsi Elemér',
        paras: [
          'Kedves Olvasóm! Egyes számban szólítom, mert tudom, hogy egy van.',
          'Elmondtam mindent, amit a gulyásról el lehet mondani. Ami ezután jönne, az már csak recept volna.',
          'Lélekben: B. E.',
        ],
        comments: [
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2010.09.22. 00:10', text: 'Tisztelt Bográcsi Úr! Az az egy olvasó én vagyok. Kérem, írjon. Ö.' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2017.03.08. 23:31', text: 'Tisztelt Bográcsi Úr! Még mindig várom. Ö.' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2026.10.14. 23:44', text: 'Tisztelt Bográcsi Úr! Ma gulyást főztem. Két és fél óra. Nem siettettem. Ö.' },
        ],
      },
      {
        id: 'level-a-fakanalhoz', kind: 'post',
        title: 'Levél a fakanálhoz',
        date: '2009.06.30. 00:15', author: 'Bográcsi Elemér',
        paras: [
          'Kedves Fakanál! Tizenkét éve kavarunk együtt. Ma észrevettem, hogy a nyeled megrepedt.',
          'Nem cserállek le. A repedés nem hiba, hanem életrajz. Minden gulyás benne van, amit valaha együtt kevertünk, és az az egy is, amelyik leégett, pedig mindketten ott álltunk mellette.',
          'Ma este is számítok rád.',
          'Lélekben: B. E.',
        ],
        comments: [
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.06.30. 23:20', text: 'Tisztelt Bográcsi Úr! Az én fakanalam a ketchupos tészta kavarása közben tört ketté. Nem írtam neki levelet. Most már bánom. Ö.' },
          { name: 'Bográcsi Elemér', date: '2009.07.01. 01:02', text: 'Kedves Ödön! Még nem késő. Lélekben: B. E.' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.07.02. 23:40', text: 'Megírtam. Nem válaszolt. Ö.' },
        ],
      },
      {
        id: 'a-gulyas-mint-letallapot', kind: 'post',
        title: 'A gulyás mint létállapot',
        date: '2009.02.11. 23:58', author: 'Bográcsi Elemér',
        paras: [
          'A gulyás nem leves. Ezt sokan mondták már előttem, de senki nem mondta elég lassan.',
          'Amikor a hagyma üvegessé válik, az nem pusztán kémiai folyamat. Az a pillanat, amikor a hagyma lemond önmagáról, hogy valami nagyobbnak a része lehessen. Ilyen pillanatból kevés van egy emberi életben, és még kevesebb egy hagymáéban.',
          'A paprika belép. Nem érkezik, nem kerül bele: belép, mint a későn jött vendég, aki pontosan tudja, hogy rá vártak.',
          'Csipetkét teszek bele. Keveset. Mert a csipetke nem tészta, hanem emlékeztető: arra, hogy a végtelen is apró darabokból áll.',
          'Két és fél óra. Nem siettetem. A gulyás sem siettet engem.',
          'Lélekben: B. E.',
        ],
        comments: [
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.02.12. 00:47', text: 'Tisztelt Bográcsi Úr! Esszéje mély, ám a paprikára vonatkozó hasonlata vitatható. A paprika nem vendég, hanem házigazda, aki késik a saját vacsorájáról. Ínyenc üdvözlettel: Zsírosdeszka Ödön, gasztrokritikus' },
          { name: 'Bográcsi Elemér', date: '2009.02.13. 01:30', text: 'Kedves Ödön! A kritikus mérlegel, az esszéíró megél. Ön mérlegel. Lélekben: B. E.' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.02.13. 23:02', text: 'Tisztelt Bográcsi Úr! Én is megélek. Múlt héten bögrében főztem pörköltet, és azt bizony megéltem. Ö.' },
          { name: 'GasztroGabi', date: '2009.02.14. 10:15', text: 'Mindkettőjüknek teljesen igaza van!!' },
          { name: 'Bográcsi Elemér', date: '2009.02.15. 00:58', text: 'Kedves GasztroGabi! Az igazság nem osztható. A gulyás igen. Lélekben: B. E.' },
        ],
      },
      {
        id: 'ajanlott-olvasmanyok', kind: 'links', title: 'Ajánlott olvasmányok',
        items: [
          { label: 'A Kenyérhéj Krónikái', slug: 'a-kenyerhej-kronikai' },
          { label: 'Saját esszéim (lásd fent)' },
        ],
      },
    ],
  },

  {
    slug: 'margitka-receptjei',
    skin: 'archive',
    name: 'Margitka receptjei',
    label: 'Margitka receptjei (archív)',
    tagline: 'Egyszerű ételek, ahogy otthon csináljuk. Az unokám segített beállítani!',
    author: 'Margitka',
    engine: 'Blogmotor 1.0, sablon: „Rózsakert”',
    counter: '0 004 211',
    updated: '2009.04.03.',
    banner: 'Ez a blog 2009. április 3. óta nem frissül. Archív változat.',
    sections: [
      {
        id: 'elutazom-egy-kicsit', kind: 'post',
        title: 'Elutazom egy kicsit',
        date: '2009.04.03. 18:20', author: 'Margitka',
        paras: [
          'Kedves Olvasóim!',
          'Holnaptól egész nyáron a húgomnál leszek a Balatonnál. Ott nincs internet, csak kert. Ha visszajöttem, folytatom. Addig is főzzetek sokat, és ne sajnáljátok a tejfölt!',
          'Szeretettel: Margitka',
        ],
        comments: [
          { name: 'kati62', date: '2009.04.03. 19:02', text: 'Jó pihenést Margitka!!! Várunk vissza!!!' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.04.04. 00:31', text: 'Kedves Margitka! Jó pihenést kívánok. A tejfölt nem fogom sajnálni. Ínyenc üdvözlettel: Ö.' },
          { name: 'kati62', date: '2012.04.03. 17:45', text: 'Margitka, a rakott krumplit azóta is minden vasárnap ezzel a recepttel csinálom!!!' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2026.04.03. 23:10', text: 'Kedves Margitka! Ma is az Ön receptje szerint készítettem a rakott krumplit. Remélem, jó a kert. Ö.' },
        ],
      },
      {
        id: 'rakott-krumpli', kind: 'post',
        title: 'Rakott krumpli, ahogy nálunk szokás',
        date: '2009.03.15. 11:40', author: 'Margitka',
        paras: [
          'Ezt a receptet anyámtól tanultam, ő a nagyanyámtól.',
          'Kell hozzá: 1 kg krumpli, 6 tojás, egy szál kolbász, fél liter tejföl, só és egy kis vaj.',
          'A krumplit héjában megfőzzük, meghámozzuk és karikára vágjuk. A tojást keményre főzzük. Kivajazott tálba rétegezzük: krumpli, tojás, kolbász, tejföl, aztán megint elölről. A tetejére sok tejföl kerül.',
          'Sütőben szép pirosra sütjük. Másnap még finomabb!',
          'Szeretettel: Margitka',
        ],
        comments: [
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.03.15. 23:48', text: 'Kedves Margitka! E recepthez kritikát nem fűzök. Nincs mit. Úgy került a tányéromra, ahogy egy ételnek tányérra kell kerülnie: szerényen, melegen, túl sok tejföllel. Ínyenc üdvözlettel: Zsírosdeszka Ödön, gasztrokritikus' },
          { name: 'Margitka', date: '2009.03.16. 09:12', text: 'Köszönöm Ödön, de tejfölből nincs olyan, hogy túl sok! :)' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.03.16. 23:30', text: 'Kedves Margitka! Elfogadom. Ö.' },
        ],
      },
      {
        id: 'zsiros-kenyer', kind: 'post',
        title: 'Zsíros kenyér lilahagymával',
        date: '2009.03.02. 17:05', author: 'Margitka',
        paras: [
          'Ez nem is igazi recept, de Bence azt mondta, ide mindent szabad írni.',
          'Friss kenyér, jó zsír, só és vékonyra vágott lilahagyma. Aki szereti, paprikát is szórhat rá. Ennyi.',
          'Szeretettel: Margitka',
        ],
        comments: [
          { name: 'Szalonnás Béla (Zsírszalonna Klub)', date: '2009.03.02. 19:30', text: 'Margitka, ez a beszéd! A Klub nevében: Béla' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.03.03. 00:20', text: 'Kedves Margitka! Megkíséreltem recenziót írni róla. Három oldal után beláttam, hogy a zsíros kenyér erősebb nálam. Ö.' },
        ],
      },
      {
        id: 'rolam', kind: 'text', title: 'Rólam', aside: true,
        paras: [
          'Margitka vagyok, nyugdíjas óvónő egy Duna menti kisvárosból. Szeretek főzni, és szeretem, ha ízlik.',
          'Az unokám, Bence mutatta meg, hogyan kell ide írni. Ha valami nem jó, az az ő hibája. :)',
        ],
      },
      {
        id: 'archivum', kind: 'list', title: 'Archívum', aside: true,
        items: ['2009. április (1)', '2009. március (2)', '2009. február (3)', '2009. január (2)', '2008. december (4)'],
      },
      {
        id: 'kedvenc-oldalaim', kind: 'links', title: 'Kedvenc oldalaim', aside: true,
        items: [
          { label: 'Tökfőzelék Baráti Kör', slug: 'tokfozelek-barati-kor' },
          { label: 'Bence oldala (még készül)' },
        ],
      },
    ],
  },

  {
    slug: 'a-kenyerhej-kronikai',
    skin: 'chronicle',
    name: 'A Kenyérhéj Krónikái',
    tagline: 'Kizárólag a héjról. A bél nem tárgya e krónikának.',
    author: 'a Krónikás',
    engine: 'Írógép, szkennelve',
    counter: '0 001 049',
    updated: '2010.01.19.',
    index: { title: 'Tartalom', style: 'list', note: 'I–XLVI. fejezet: az archívumban (nem elérhető).' },
    commentsLabel: 'Megjegyzések',
    commentsNote: 'Megjegyzés nem fűzhető. A héj nem vitatkozik.',
    sections: [
      {
        id: 'xlix', kind: 'post',
        title: 'XLIX. fejezet: Az elfelejtett fél kenyér',
        date: '2010.01.18. 06:02', author: 'a Krónikás',
        paras: [
          'Három napig állt a kenyértartó mögött. A héj nem panaszkodott.',
          'Megkocogtattam. Válaszolt.',
          'Ma reggel lereszeltem. Morzsa lett belőle. Ez nem vereség, hanem átváltozás.',
        ],
        comments: [
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2010.01.18. 23:30', text: 'Tisztelt Krónikás! A morzsa tudomásom szerint rántott párizsihoz kiváló. Ínyenc üdvözlettel: Ö.' },
          { name: 'a Krónikás', date: '2010.01.19. 06:00', text: 'A párizsi nem tárgya e krónikának.' },
        ],
      },
      {
        id: 'xlviii', kind: 'post',
        title: 'XLVIII. fejezet: A sarok',
        date: '2009.12.07. 05:48', author: 'a Krónikás',
        paras: [
          'A kenyér sarka a héj csúcsa. Két héj találkozik benne, és egyik sem enged.',
          'Aki a sarkot meghagyja, nem érdemli meg a kenyeret.',
          'Aki elveszi a másik elől, az sem.',
        ],
        comments: [
          { name: 'Szalonnás Béla (Zsírszalonna Klub)', date: '2009.12.07. 20:11', text: 'A Klub egyetért. – Béla' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.12.08. 00:12', text: 'Tisztelt Krónikás! A sarok, vékonyan ketchuppal megkenve, szerény véleményem szerint új dimenziót nyit. Ö.' },
          { name: 'a Krónikás', date: '2009.12.08. 05:50', text: 'A ketchup nem tárgya e krónikának.' },
          { name: 'Bográcsi Elemér', date: '2009.12.09. 01:45', text: 'A sarok: a kenyér vallomása önmagáról. Lélekben: B. E.' },
          { name: 'a Krónikás', date: '2009.12.09. 05:41', text: 'Köszönöm.' },
          { name: 'Zsírosdeszka Ödön', odon: true, date: '2009.12.09. 23:58', text: 'Tisztelt Krónikás! Én is valami hasonlót akartam írni. Ö.' },
        ],
      },
      {
        id: 'xlvii', kind: 'post',
        title: 'XLVII. fejezet: A héj, amely nem ropogott',
        date: '2009.11.02. 05:30', author: 'a Krónikás',
        paras: [
          'Bolti kenyér volt, zacskóban. A héja puha volt, mint egy ígéret, amelyet senki nem tartott be.',
          'Nem a kenyeret hibáztatom. A zacskót hibáztatom.',
        ],
        comments: [
          { name: 'kati62', date: '2009.11.02. 14:20', text: 'Én mindig zacskóban tartom, úgy marad puha!!!' },
          { name: 'a Krónikás', date: '2009.11.03. 05:35', text: 'Kedves kati62! Mindenki úgy tartja, ahogy szereti. A krónika csak följegyzi.' },
        ],
      },
      {
        id: 'blogroll', kind: 'text', title: 'Blogroll',
        paras: ['Nincs. A héj önmagában is elég.'],
      },
    ],
  },
];

export const blogHref = (slug) => `/blogroll/${slug}/`;
