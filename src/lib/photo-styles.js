// Photo styles for scripts/photo.mjs: one camera, many places.
// CAMERA goes into every prompt. A post picks a SCENE (where and in what light it was shot, plus the
// colour grade the "make it worse" step applies) and a FRAMING (how carelessly it was shot).
// Rules: design-system/README.md → Imagery („ugyanaz a fényképezőgép, nem ugyanaz a konyha”).

export const CAMERA = [
  'Amateur snapshot taken around 2008 with a cheap compact digital camera:',
  'slightly wrong white balance, a little soft focus, small sensor noise, everything roughly in focus (no shallow depth of field).',
  'Completely unstyled, unappetising, ordinary and real: nobody tried to make this look good.',
  'No people (at most a hand at the edge of the frame), no text, no watermark, no date stamp, no garnish, no steam,',
  'not professional food photography.',
].join(' ');

/**
 * grade: sharp modulate (brightness, saturation) + linear per-channel multiply/add (R, G, B).
 * The cast is what that light did to a 2008 sensor's auto white balance.
 */
export const SCENES = {
  'konyha-ejjel': {
    label: 'Konyha, éjjel, vakuval',
    prompt: 'Late at night in a small, dim Hungarian home kitchen, the built-in flash fired straight at the food: harsh glare and hot highlights on anything wet or oily, a hard flash shadow, the background falling off into murky darkness. The plate sits on a worn waxed-cloth kitchen tablecloth with a faded pattern.',
    grade: { brightness: 1.04, saturation: 0.9, mul: [1.04, 1.0, 0.93], add: [4, 2, -2] },
  },
  'konyha-nappal': {
    label: 'Konyha, nappal, vakuval is',
    prompt: 'Midday in a small Hungarian kitchen with grey daylight from the window, and the flash fired anyway: the food looks flat and washed out with blown-out white highlights, the background is bright and cluttered with a dish rack, a window with a net curtain and a wall calendar. Worn waxed-cloth tablecloth.',
    grade: { brightness: 1.1, saturation: 0.85, mul: [0.98, 1.0, 1.04], add: [6, 6, 8] },
  },
  koli: {
    label: 'Kollégiumi szoba, asztali lámpa',
    prompt: 'Evening in a cramped student dormitory room, no flash: the only light is a yellow desk lamp, giving a strong orange tungsten cast and deep brown shadows, slight motion blur from a slow hand-held shutter. The food sits on a cluttered desk between open textbooks, the lamp and a power strip.',
    grade: { brightness: 0.98, saturation: 0.95, mul: [1.08, 1.0, 0.82], add: [8, 2, -8] },
  },
  iroda: {
    label: 'Iroda, fénycső',
    prompt: 'Lunchtime in an open-plan office under fluorescent ceiling tubes, flash fired: a sickly greenish colour cast and flat light, a grey desk with a keyboard, sticky notes and a coffee-stained mug around the food, monitors in the background.',
    grade: { brightness: 1.03, saturation: 0.88, mul: [0.95, 1.04, 0.98], add: [0, 6, 2] },
  },
  kanape: {
    label: 'Nappali, tévéfény',
    prompt: 'Late evening in a dark living room, the food on a low wooden coffee table in front of the sofa, lit by the bluish glow of a television off to the side and a weak flash; a TV remote, a crumpled crisp bag and a TV guide magazine next to it, the rest of the room dark.',
    grade: { brightness: 0.98, saturation: 0.9, mul: [0.92, 0.98, 1.1], add: [-2, 0, 8] },
  },
  erkely: {
    label: 'Panelerkély, borult délután',
    prompt: 'Overcast afternoon on a small Hungarian block-of-flats balcony, flat grey daylight, no flash: the plate on a white plastic garden table, a plastic chair, potted geraniums, laundry on a drying rack and the concrete facade of the next block in the background.',
    grade: { brightness: 1.06, saturation: 0.82, mul: [0.97, 1.0, 1.03], add: [4, 4, 6] },
  },
  vasarnap: {
    label: 'Vasárnapi ebéd, a jó terítő',
    prompt: 'Sunday lunch in an old-fashioned Hungarian dining room, afternoon daylight from the window plus the flash: the good white lace tablecloth, a cut-glass bowl, a heavy dark wooden sideboard with porcelain figurines in the background.',
    grade: { brightness: 1.07, saturation: 0.92, mul: [1.02, 1.0, 0.97], add: [6, 4, 2] },
  },
  unnepi: {
    label: 'Karácsony este',
    prompt: 'Christmas evening in a Hungarian home, flash fired: a red festive tablecloth, a lit candle, a few strands of tinsel, coloured fairy lights blurred in the dark background, empty szaloncukor wrappers on the table.',
    grade: { brightness: 1.02, saturation: 0.95, mul: [1.05, 0.98, 0.92], add: [4, 0, -2] },
  },
};

export const FRAMINGS = {
  felulrol: 'Shot from almost straight above, the plate a little off centre.',
  ferde: 'Shot at an angle from a standing position with the camera noticeably tilted, so the table edge runs diagonally across the frame.',
  kozeli: 'Shot far too close: the food fills the frame, the plate is cut off by the edges and the focus is slightly missed.',
  oldalrol: 'Shot from the side at table height, so the food looks like a low heap and the room behind it is in the frame.',
  levagott: 'Carelessly framed: the plate pushed to one side and cut off by the edge of the frame, with too much table in the picture.',
};

export const DEFAULT_SCENE = 'konyha-ejjel';

/** A framing that stays the same for a post across regenerations, when the post doesn't name one. */
export function framingFor(slug, framing) {
  if (framing) return framing;
  const keys = Object.keys(FRAMINGS);
  let n = 0;
  for (const ch of slug) n = (n * 31 + ch.charCodeAt(0)) >>> 0;
  return keys[n % keys.length];
}
