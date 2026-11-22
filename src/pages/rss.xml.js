import rss from '@astrojs/rss';
import { getPosts } from '../lib/posts.js';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'Proligasztró',
    description: 'Egy ínyenc naplója. Mert valakinek ki kell mondania. (Szatirikus oldal.)',
    site: new URL(import.meta.env.BASE_URL, context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: new Date(post.data.isoDate),
      link: `recept/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>hu</language>',
  });
}
