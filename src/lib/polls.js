// Sidebar polls. One is picked at random on every page view (RandomPoll), never the same one twice in a row.
// Votes are made up and fixed; voting only reveals the results. Rules: design-system/README.md and the Poll docs
// (four options, the worst one wins, the joke is on the food and Ödön, never on readers, no brands).
export const polls = [
  {
    name: 'koret',
    question: 'Melyik a legrosszabb köret?',
    options: [
      { label: 'Ketchup, önmagában', votes: 412 },
      { label: 'Főtt tészta, másnapi', votes: 178 },
      { label: 'Mikrós krumpli', votes: 121 },
      { label: 'Uborkasaláta tejföl nélkül', votes: 37 },
    ],
  },
  {
    name: 'mikro',
    question: 'Hány percig mikrózod a pörköltet?',
    options: [
      { label: '2 perc, a közepe jéghideg marad', votes: 203 },
      { label: '6 perc, ahogy Ödön', votes: 88 },
      { label: 'Amíg ki nem robban', votes: 311 },
      { label: 'Hidegen eszem, a dobozból', votes: 146 },
    ],
  },
  {
    name: 'fuszer',
    question: 'Mi a magyar konyha legfontosabb fűszere?',
    options: [
      { label: 'Pirospaprika', votes: 264 },
      { label: 'Ételízesítő, egy evőkanállal', votes: 391 },
      { label: 'Ketchup', votes: 97 },
      { label: 'Só, amíg el nem fogy', votes: 155 },
    ],
  },
  {
    name: 'toltott',
    question: 'Hány napos lehet még a töltött káposzta?',
    options: [
      { label: '3 nap', votes: 74 },
      { label: 'Egy hét, minden nap jobb', votes: 219 },
      { label: 'Amíg a szaga engedi', votes: 311 },
      { label: 'A töltött káposzta örök', votes: 133 },
    ],
  },
  {
    name: 'hang',
    question: 'Melyik a konyha legszebb hangja?',
    options: [
      { label: 'A mikró pittyegése', votes: 187 },
      { label: 'A füstjelző', votes: 342 },
      { label: 'Az odaégett tej sistergése', votes: 96 },
      { label: 'A csend, amikor Ödön nem főz', votes: 455 },
    ],
  },
  {
    name: 'parizsi',
    question: 'Mi legyen a maradék rántott párizsival?',
    options: [
      { label: 'Másnap hidegen, a hűtő előtt állva', votes: 402 },
      { label: 'Szendvicsbe, ketchuppal', votes: 167 },
      { label: 'Újra kirántani', votes: 58 },
      { label: 'Maradék? Milyen maradék?', votes: 236 },
    ],
  },
  {
    name: 'halaszle',
    question: 'Mi kerüljön a karácsonyi halászlébe?',
    options: [
      { label: 'Ponty, ahogy illik', votes: 288 },
      { label: 'Szardínia, konzervből', votes: 402 },
      { label: 'Halrudacska', votes: 119 },
      { label: 'Bármi, csak ne Ödön főzze', votes: 297 },
    ],
  },
  {
    name: 'edeny',
    question: 'Melyik a legsokoldalúbb konyhai eszköz?',
    options: [
      { label: 'A bögre', votes: 255 },
      { label: 'A vízforraló (tojást is főz!)', votes: 183 },
      { label: 'A vasaló (melegszendvicshez)', votes: 361 },
      { label: 'A telefon, ételrendeléshez', votes: 249 },
    ],
  },
];
