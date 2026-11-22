#!/usr/bin/env node
/*
 * Generates the digicam photo for one post with a fal.ai image model.
 *
 *   npm run photo -- <slug>                  generate + process + link into the post
 *   npm run photo -- <slug> --model nano     use Nano Banana 2.1 instead of GPT Image 2
 *   npm run photo -- <slug> --force          replace an existing photo
 *   npm run photo -- <slug> --reprocess      redo only the "make it worse" step from the cached original (free)
 *
 * Needs FAL_KEY in the environment or in .env (never committed).
 * The prompt comes from the post's frontmatter:   photo: { prompt: "..." }
 * It should describe only the dish and its sad situation; STYLE below is added to every prompt
 * so all photos look like they came from the same kitchen and the same 2008 camera.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { fal } from '@fal-ai/client';
import sharp from 'sharp';
import { parse as parseYaml } from 'yaml';

const STYLE = [
  'Amateur snapshot taken around 2008 with a cheap compact digital camera, built-in flash fired straight at the food, shot slightly from above,',
  'late at night in a small, dim Hungarian home kitchen.',
  'Harsh flash glare and hot specular highlights on anything wet or oily, a hard flash shadow, the background falling off into murky darkness,',
  'slightly wrong white balance, a little soft focus, small sensor noise.',
  'The plate sits on a worn waxed-cloth kitchen tablecloth with a faded pattern; a bit of everyday clutter is visible at the edge of the frame.',
  'Completely unstyled, unappetising, ordinary and real: nobody tried to make this look good.',
  'No people (at most a hand at the edge of the frame), no text, no watermark, no date stamp, no garnish, no steam,',
  'no shallow depth of field, not professional food photography.',
].join(' ');

const MODELS = {
  gpt: {
    id: 'openai/gpt-image-2',
    input: (prompt) => ({ prompt, image_size: 'landscape_4_3', quality: 'medium', num_images: 1, output_format: 'png' }),
  },
  nano: {
    id: 'google/nano-banana-2.1',
    input: (prompt) => ({ prompt, aspect_ratio: '4:3', resolution: '1K', num_images: 1, output_format: 'png' }),
  },
};

const { values: opts, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    model: { type: 'string', default: 'gpt' },
    force: { type: 'boolean', default: false },
    reprocess: { type: 'boolean', default: false },
  },
});
const slug = positionals[0];
const fail = (msg) => { console.error(`photo: ${msg}`); process.exit(1); };
if (!slug) fail('usage: npm run photo -- <slug> [--model gpt|nano] [--force] [--reprocess]');
const model = MODELS[opts.model] ?? fail(`unknown --model "${opts.model}" (use: ${Object.keys(MODELS).join(', ')})`);

const root = new URL('../', import.meta.url);
const postFile = new URL(`src/content/posts/${slug}.mdx`, root);
if (!existsSync(postFile)) fail(`no post at src/content/posts/${slug}.mdx`);
const outRel = `/kepek/${slug}.jpg`;
const outFile = new URL(`public${outRel}`, root);
const cacheDir = new URL('.photo-cache/', root);
const cacheFile = new URL(`${slug}.png`, cacheDir);

// 1. Original image: from fal, or from the cache when only reprocessing.
let original;
if (opts.reprocess) {
  if (!existsSync(cacheFile)) fail(`nothing cached for ${slug}; run without --reprocess first`);
  original = readFileSync(cacheFile);
} else {
  if (existsSync(outFile) && !opts.force) fail(`public${outRel} already exists; pass --force to replace it`);
  if (!process.env.FAL_KEY) fail('FAL_KEY is not set (put it in .env or export it)');

  const mdx = readFileSync(postFile, 'utf8');
  const fm = mdx.match(/^---\n([\s\S]*?)\n---/);
  const prompt = fm && parseYaml(fm[1])?.photo?.prompt;
  if (!prompt) fail(`add photo: { prompt: "…" } to the frontmatter of ${slug}.mdx`);

  const fullPrompt = `${prompt.trim()} ${STYLE}`;
  console.log(`photo: ${model.id} → ${slug}`);
  const { data } = await fal.subscribe(model.id, {
    input: model.input(fullPrompt),
    logs: false,
    onQueueUpdate: (u) => process.stdout.write(`\r  ${u.status.toLowerCase().replace('_', ' ')}…        `),
  });
  process.stdout.write('\n');
  const url = data?.images?.[0]?.url ?? fail('the model returned no image');
  const res = await fetch(url);
  if (!res.ok) fail(`download failed: HTTP ${res.status}`);
  original = Buffer.from(await res.arrayBuffer());
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cacheFile, original);
}

// 2. Make it worse: the 2008 compact camera's 640×480 "web" setting, a cast, noise, a bad JPEG.
const W = 640, H = 480;
const noise = Buffer.alloc(W * H);
for (let i = 0; i < noise.length; i++) noise[i] = 128 + Math.round((Math.random() + Math.random() + Math.random() - 1.5) * 18);
const noiseLayer = await sharp(noise, { raw: { width: W, height: H, channels: 1 } }).png().toBuffer();

const jpeg = await sharp(original)
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .modulate({ brightness: 1.04, saturation: 0.9 })
  .linear([1.04, 1.0, 0.93], [4, 2, -2]) // warm, slightly yellow tungsten-meets-flash cast
  .composite([{ input: noiseLayer, blend: 'soft-light' }])
  .sharpen({ sigma: 0.6 }) // cheap in-camera sharpening
  .jpeg({ quality: 62, chromaSubsampling: '4:2:0', mozjpeg: false })
  .toBuffer();
mkdirSync(new URL('public/kepek/', root), { recursive: true });
writeFileSync(outFile, jpeg);
console.log(`photo: saved public${outRel} (${Math.round(jpeg.length / 1024)} KB)`);

// 3. Link it: give the post's first <DigicamPhoto> a src if it has none.
const mdx = readFileSync(postFile, 'utf8');
const tag = mdx.match(/<DigicamPhoto\b[^>]*\/>/);
if (!tag) console.log('photo: no <DigicamPhoto /> in the post; add one with src="' + outRel + '"');
else if (/\bsrc=/.test(tag[0])) console.log('photo: <DigicamPhoto> already has a src; left it alone');
else {
  writeFileSync(postFile, mdx.replace(tag[0], tag[0].replace('<DigicamPhoto', `<DigicamPhoto src="${outRel}"`)));
  console.log(`photo: linked into src/content/posts/${slug}.mdx`);
}
