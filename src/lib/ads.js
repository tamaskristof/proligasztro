// The advertisers are invented; the displayed domains were checked not to exist (2026-11-26).
// Banners link to the advertiser's own invented homepage (src/lib/adsites.js, /hirdetes/<slug>/);
// text ads link to /hirdetes/, Ödön's list of advertisers, which admits the ads aren't real.
import { withBase } from './url.js';

const href = withBase('/hirdetes/');
const site = (slug) => withBase(`/hirdetes/${slug}/`);

/** The one blinking banner, top of every page. */
export const prizeBanner = {
  tone: 'prize', blink: true, href: site('nyeremeny'),
  head: 'GRATULÁLUNK! Ön a 1 000 000. látogató!',
  sub: 'Ön nyert egy vadonatúj mikrohullámú sütőt! Vegye át még ma.',
  cta: 'Kattints ide!',
};

/** Static banner between homepage posts. */
export const listBanner = {
  tone: 'blue', href: site('mikro-tisztitas'),
  head: 'Mikrohullámú sütő tisztítás 0–24',
  sub: 'Bögrés pörkölt után is! Kiszállás 1 órán belül. www.mikro-tisztitas-024.hu',
  cta: 'Hívjon most!',
};

export const skyscraper = {
  href: site('csengohang'),
  head: 'Csengő-hangok!',
  body: 'Töltsd le a nyár legnagyobb slágereit a mobilodra! Küldd SMS-ben:',
  big: 'TÉSZTA\n↓\n06-90-KETCHUP',
  cta: 'Letöltés »',
  small: 'Az SMS díja 300 Ft + áfa. Csak 18 éven felülieknek. Ödön nem vállal felelősséget.',
};

const textAdPool = [
  { title: 'Ketchup nagykereskedés – 5 literes kiszerelés', text: 'Éttermeknek, menzáknak és diákoknak. Most 20% kedvezmény!', url: 'www.ketchup-nagyker-kft.hu' },
  { title: 'Fogyjon le 12 kilót ketchuppal!', text: 'Az orvosok utálják ezt az egyszerű trükköt. Ingyenes próbacsomag.', url: 'www.ketchupdieta-titok.hu' },
  { title: 'Társkereső ínyenceknek', text: 'Találja meg azt, aki a tésztát is al dente szereti. A regisztráció ingyenes!', url: 'www.inyenc-tarskereso.hu' },
  { title: 'Bögremosó szakszerviz', text: 'Odaégett pörkölt? Kakaó? Garanciával visszaadjuk bögréje becsületét.', url: 'www.bogremoso-szakszerviz.hu' },
  { title: 'Főzz úgy, mint Ödön! – Online tanfolyam', text: '10 lecke, oklevél, saját kötény. Tűzoltó készülék nem tartozék.', url: 'www.fozz-ugy-mint-odon.hu' },
  { title: 'Használt sütőolaj felvásárlás', text: 'Rántott párizsi után maradt? Mi elvisszük, Ön elfelejti.', url: 'www.hasznaltolaj-felvasarlas-024.hu' },
  { title: 'Vasalótisztítás 0–24', text: 'Májkrém? Olvadt sajt? Talpfelújítás garanciával, ingét is megmentjük.', url: 'www.vasalotisztitas-024.hu' },
  { title: 'Szaloncukor-utántöltés', text: 'Üres papírok a fán? Mi visszatöltjük, senki sem veszi észre.', url: 'www.szaloncukor-utantoltes.hu' },
  { title: 'Konzervnyitó-szerviz', text: 'Letört a fül a dobozon? Kinyitjuk, bármi van benne.', url: 'www.konzervnyito-szerviz.hu' },
];

/** Three text ads, rotated by a number (e.g. the post's position) so posts differ. */
export function textAdsFor(n) {
  return [0, 1, 2].map((i) => ({ ...textAdPool[(n * 3 + i) % textAdPool.length], href }));
}
