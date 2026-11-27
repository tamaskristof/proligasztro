import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection } from 'astro:content';
import { withBase } from './url.js';
import { parseBlogDate } from './dates.js';

export const HONAPOK = ['január', 'február', 'március', 'április', 'május', 'június', 'július',
  'augusztus', 'szeptember', 'október', 'november', 'december'];

// One cutoff for the whole build, so every page agrees on what's out.
const BUILD_TIME = Date.now();

/**
 * All published posts, newest first. A post or comment dated after the build time stays out
 * until a later build (the deploy workflow rebuilds every early morning).
 * The dev server shows everything, drafts included.
 */
export async function getPosts() {
  const due = (date) => import.meta.env.DEV || parseBlogDate(date).ms <= BUILD_TIME;
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || (!data.draft && data.publishedAt <= BUILD_TIME));
  return posts
    .map((p) => ({ ...p, data: { ...p.data, comments: p.data.comments.filter((c) => due(c.date)) } }))
    .sort((a, b) => b.data.sortKey.localeCompare(a.data.sortKey));
}

export const postHref = (post) => withBase(`/recept/${post.id}/`);
export const tagSlug = (tag) => tag.toLocaleLowerCase('hu').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const tagHref = (tag) => withBase(`/cimke/${tagSlug(tag)}/`);
export const monthKey = (post) => `${post.data.year}-${String(post.data.month).padStart(2, '0')}`;
export const monthHref = (key) => withBase(`/archivum/${key}/`);
export const monthLabel = (key) => { const [y, m] = key.split('-'); return `${y}. ${HONAPOK[Number(m) - 1]}`; };

/** [{ key: '2026-11', label: '2026. november', count }] newest first. */
export function archiveMonths(posts) {
  const counts = new Map();
  for (const p of posts) counts.set(monthKey(p), (counts.get(monthKey(p)) || 0) + 1);
  return [...counts].sort((a, b) => b[0].localeCompare(a[0])).map(([key, count]) => ({ key, label: monthLabel(key), count }));
}

/** [{ tag, slug, count }] alphabetical (Hungarian collation). */
export function allTags(posts) {
  const counts = new Map();
  for (const p of posts) for (const t of p.data.tags) counts.set(t, (counts.get(t) || 0) + 1);
  return [...counts].sort((a, b) => a[0].localeCompare(b[0], 'hu')).map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }));
}

/** Props for <BlogPost> shared by excerpts and full posts. */
export function postProps(post, { isNew = false } = {}) {
  const href = postHref(post);
  return {
    title: post.data.title,
    date: post.data.date,
    author: post.data.author,
    tags: post.data.tags.map((t) => ({ label: t, href: tagHref(t) })),
    comments: post.data.comments.length,
    rating: post.data.rating,
    href,
    commentsHref: href + '#hozzaszolasok',
    isNew,
  };
}

// A post's photo by convention: public/kepek/<id>.jpg (what `npm run photo` writes), or null.
export function photoFor(post) {
  const rel = `/kepek/${post.id}.jpg`;
  return existsSync(join(process.cwd(), 'public', rel)) ? rel : null;
}
