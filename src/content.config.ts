import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SCENES, FRAMINGS } from './lib/photo-styles.js';

// Dates are written in the old blog format: "2026.11.22. 23:47"
const blogDate = z.string().regex(/^\d{4}\.\d{2}\.\d{2}\. \d{2}:\d{2}$/, 'Formátum: "2026.11.22. 23:47"');

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: blogDate,
    author: z.string().default('Ödön'),
    tags: z.array(z.string()).default([]),
    /** Ketchup-index, 0–5. More is worse. */
    rating: z.number().int().min(0).max(5),
    /** Shown on the homepage, before "Tovább »". */
    excerpt: z.string(),
    draft: z.boolean().default(false),
    /** Prompt for scripts/photo.mjs: the dish and its sad situation only; the camera style is added by the script. */
    photo: z
      .object({
        prompt: z.string(),
        /** where and in what light it was shot (src/lib/photo-styles.js); default konyha-ejjel */
        scene: z.enum(Object.keys(SCENES) as [string, ...string[]]).optional(),
        /** how carelessly it was framed; default picked from the slug */
        framing: z.enum(Object.keys(FRAMINGS) as [string, ...string[]]).optional(),
      })
      .optional(),
    recipe: z.object({
      title: z.string().optional(),
      time: z.string().optional(),
      servings: z.string().optional(),
      difficulty: z.string().optional(),
      drink: z.string().optional(),
      ingredients: z.array(z.object({ qty: z.string().optional(), name: z.string(), note: z.string().optional() })).default([]),
    }).optional(),
    steps: z.array(z.union([z.string(), z.object({ text: z.string(), note: z.string().optional() })])).default([]),
    nutrition: z.array(z.object({ label: z.string(), value: z.string(), dv: z.string().optional(), joke: z.boolean().optional() })).default([]),
    comments: z.array(z.object({
      name: z.string().optional(),
      date: blogDate,
      text: z.string(),
      url: z.string().optional(),
      isAuthor: z.boolean().optional(),
    })).default([]),
  }).transform((d) => {
    const [, y, m, day, hh, mm] = d.date.match(/^(\d{4})\.(\d{2})\.(\d{2})\. (\d{2}):(\d{2})$/);
    return {
      ...d,
      year: Number(y),
      month: Number(m),
      sortKey: `${y}${m}${day}${hh}${mm}`,
      /** "'26 11 22" for the digicam date stamp */
      stamp: `'${y.slice(2)} ${m} ${day}`,
      isoDate: `${y}-${m}-${day}T${hh}:${mm}:00+01:00`,
    };
  }),
});

export const collections = { posts };
