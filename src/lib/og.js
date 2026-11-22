// Social share cards (Open Graph, 1200×630), drawn at build time with sharp from an SVG.
// They look like a screenshot of the blog: tablecloth, the page, the banner and nav, the digicam
// photo with its date stamp, the post title, the meta line and the ketchup-index.
// Colours and font stacks come from design-system/tokens.json, like the CSS.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

export const OG_W = 1200;
export const OG_H = 630;

const root = process.cwd();
const tokens = JSON.parse(readFileSync(join(root, 'design-system/tokens.json'), 'utf8'));
const C = Object.fromEntries(tokens.color.tokens.map((t) => [t.name, t.value]));
const F = tokens.type.families;
const font = (name) => F[name].replace(/"/g, "'");

const KETCHUP_LABELS = ['Meglepően ehető', 'Gyanús', 'Aggályos', 'Botrányos', 'Elfogadhatatlan', 'Gasztronómiai vészhelyzet'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// The pixel drops, inlined (an <image> of an SVG isn't reliable in librsvg).
const dropInner = (file) => {
  const s = readFileSync(join(root, 'public', file), 'utf8');
  return s.slice(s.indexOf('>') + 1, s.lastIndexOf('</svg>'));
};
const DROP = dropInner('ketchup-drop.svg');
const DROP_EMPTY = dropInner('ketchup-drop-empty.svg');

// Greedy word wrap by an average glyph width (good enough for Georgia/DejaVu bold).
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) { lines.push(line); line = w; }
    else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
  }
  return lines;
}

// Page geometry
const PX = 60, PY = 36, PW = OG_W - 2 * PX, PH = OG_H - 2 * PY; // the page on the tablecloth
const BANNER_H = 112, NAV_H = 38;
const BODY_Y = PY + BANNER_H + NAV_H;
const PHOTO = { x: PX + 36, y: BODY_Y + 34, w: 448, h: 336 };
const COL_X = PHOTO.x + PHOTO.w + 44, COL_W = PX + PW - 36 - COL_X;

function frameSvg({ title, meta, rating, kicker, body }) {
  // Title: shrink if it wraps to more than 3 lines.
  let size = 40, lines = wrap(title, Math.floor(COL_W / (size * 0.52)), 4);
  if (lines.length > 3) { size = 34; lines = wrap(title, Math.floor(COL_W / (size * 0.52)), 4); }
  const lh = Math.round(size * 1.25);
  let y = BODY_Y + 34 + size;
  const parts = [];

  if (kicker) {
    parts.push(`<text x="${COL_X}" y="${BODY_Y + 52}" font-family="${font('verdana')}" font-size="17" font-weight="700" letter-spacing="1.5" fill="${C['ink-muted']}">${esc(kicker)}</text>`);
    y += 30;
  }
  parts.push(`<text font-family="${font('georgia')}" font-size="${size}" font-weight="700" fill="${C['post-title']}">` +
    lines.map((l, i) => `<tspan x="${COL_X}" y="${y + i * lh}">${esc(l)}</tspan>`).join('') + '</text>');
  y += (lines.length - 1) * lh + 22;
  // dashed divider like under post titles
  parts.push(`<line x1="${COL_X}" y1="${y}" x2="${COL_X + COL_W}" y2="${y}" stroke="${C['box-border']}" stroke-width="2" stroke-dasharray="6 5"/>`);
  y += 36;
  if (meta) {
    parts.push(`<text x="${COL_X}" y="${y}" font-family="${font('verdana')}" font-size="19" fill="${C['ink-muted']}">${esc(meta)}</text>`);
    y += 34;
  }
  if (body) {
    const bl = wrap(body, Math.floor(COL_W / (21 * 0.55)), 4);
    parts.push(`<text font-family="${font('verdana')}" font-size="21" fill="${C.ink}">` +
      bl.map((l, i) => `<tspan x="${COL_X}" y="${y + i * 32}">${esc(l)}</tspan>`).join('') + '</text>');
    y += bl.length * 32 + 6;
  }
  if (rating != null) {
    y += 8;
    parts.push(`<text x="${COL_X}" y="${y + 30}" font-family="${font('verdana')}" font-size="20" font-weight="700" fill="${C.ink}">Ketchup-index:</text>`);
    const dx = COL_X + 186;
    for (let i = 0; i < 5; i++) {
      parts.push(`<svg x="${dx + i * 36}" y="${y}" width="32" height="40" viewBox="0 0 8 10" shape-rendering="crispEdges">${i < rating ? DROP : DROP_EMPTY}</svg>`);
    }
    const label = `${rating}/5 – ${KETCHUP_LABELS[rating]}`;
    parts.push(`<text x="${COL_X}" y="${y + 78}" font-family="${font('verdana')}" font-size="20" font-weight="700" fill="${C['marquee-ink']}">${esc(label)}</text>`);
  }
  return parts.join('\n');
}

function svgUnder(content) {
  const navText = `<tspan fill="${C['banner-title']}" text-decoration="underline">Főoldal</tspan><tspan font-weight="400">  |  </tspan>Rólam<tspan font-weight="400">  |  </tspan>Archívum<tspan font-weight="400">  |  </tspan>RSS`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <defs>
    <linearGradient id="banner" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${C['banner-start']}"/><stop offset="1" stop-color="${C['banner-end']}"/>
    </linearGradient>
  </defs>
  <rect x="${PX + 10}" y="${PY + 10}" width="${PW}" height="${PH}" fill="${C['led-bg']}" fill-opacity="0.45"/>
  <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" fill="${C.page}" stroke="${C['chrome-dark']}" stroke-width="1"/>
  <rect x="${PX}" y="${PY}" width="${PW}" height="${BANNER_H}" fill="url(#banner)"/>
  <text x="${PX + 26 + 3}" y="${PY + 66 + 3}" font-family="${font('georgia')}" font-size="58" font-weight="700" font-style="italic" fill="${C['led-bg']}">Proligasztró</text>
  <text x="${PX + 26}" y="${PY + 66}" font-family="${font('georgia')}" font-size="58" font-weight="700" font-style="italic" fill="${C['banner-title']}">Proligasztró</text>
  <text x="${PX + 28}" y="${PY + 96}" font-family="${font('georgia')}" font-size="19" font-style="italic" fill="${C['on-box-head']}">Egy ínyenc naplója. Mert valakinek ki kell mondania.</text>
  <rect x="${PX}" y="${PY + BANNER_H}" width="${PW}" height="${NAV_H}" fill="${C['box-head']}"/>
  <text x="${PX + 22}" y="${PY + BANNER_H + 26}" xml:space="preserve" font-family="${font('tahoma')}" font-size="18" font-weight="700" fill="${C['on-box-head']}">${navText}</text>
  <text x="${PX + PW - 22}" y="${PY + BANNER_H + 26}" text-anchor="end" font-family="${font('verdana')}" font-size="17" fill="${C['banner-title']}" text-decoration="underline">proligasztro.hu</text>
  <rect x="${PHOTO.x + 7}" y="${PHOTO.y + 7}" width="${PHOTO.w}" height="${PHOTO.h}" fill="${C['led-bg']}" fill-opacity="0.45"/>
  <rect x="${PHOTO.x - 1}" y="${PHOTO.y - 1}" width="${PHOTO.w + 2}" height="${PHOTO.h + 2}" fill="${C['led-bg']}" stroke="${C['chrome-dark']}" stroke-width="2"/>
  ${content}
</svg>`;
}

function svgOver(stamp) {
  if (!stamp) return null;
  const x = PHOTO.x + PHOTO.w - 14, y = PHOTO.y + PHOTO.h - 14;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <text x="${x + 2}" y="${y + 2}" text-anchor="end" font-family="${font('courier')}" font-size="24" font-weight="700" letter-spacing="2" fill="${C['led-bg']}">${esc(stamp)}</text>
  <text x="${x}" y="${y}" text-anchor="end" font-family="${font('courier')}" font-size="24" font-weight="700" letter-spacing="2" fill="${C.datestamp}">${esc(stamp)}</text>
</svg>`;
}

/**
 * @param {{ title: string, photo?: string|null, stamp?: string, meta?: string, rating?: number, kicker?: string, body?: string }} card
 *   photo is a public path ("/kepek/x.jpg"); without one the frame shows the flash placeholder.
 * @returns {Promise<Buffer>} JPEG
 */
export async function renderOgCard(card) {
  const tile = await sharp(join(root, 'public/tablecloth-tile.jpg')).resize(96, 96, { kernel: 'nearest' }).toBuffer();
  const layers = [
    { input: tile, tile: true, top: 0, left: 0 },
    { input: Buffer.from(svgUnder(frameSvg(card))), top: 0, left: 0 },
  ];
  const photoFile = card.photo && join(root, 'public', card.photo);
  if (photoFile && existsSync(photoFile)) {
    layers.push({ input: await sharp(photoFile).resize(PHOTO.w, PHOTO.h, { fit: 'cover' }).toBuffer(), top: PHOTO.y, left: PHOTO.x });
  } else {
    const flash = `<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO.w}" height="${PHOTO.h}"><defs><radialGradient id="f" cx="0.45" cy="0.42" r="0.7"><stop offset="0" stop-color="#fff6e0"/><stop offset="0.14" stop-color="#e8c48a"/><stop offset="0.38" stop-color="#a8653a"/><stop offset="0.7" stop-color="#3a2215"/><stop offset="1" stop-color="#120a06"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#f)"/></svg>`;
    layers.push({ input: Buffer.from(flash), top: PHOTO.y, left: PHOTO.x });
  }
  const over = svgOver(card.stamp);
  if (over) layers.push({ input: Buffer.from(over), top: 0, left: 0 });
  return sharp({ create: { width: OG_W, height: OG_H, channels: 3, background: C['tablecloth-white'] } })
    .composite(layers)
    .jpeg({ quality: 86, chromaSubsampling: '4:4:4' })
    .toBuffer();
}
