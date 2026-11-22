// Open Graph share images: /og/<post-id>.jpg for every post, /og/fooldal.jpg for everything else.
import { getPosts, photoFor } from '../../lib/posts.js';
import { renderOgCard } from '../../lib/og.js';

export async function getStaticPaths() {
  const posts = await getPosts();
  const latest = posts[0];
  return [
    {
      params: { card: 'fooldal' },
      props: {
        card: {
          kicker: 'ZSÍROSDESZKA ÖDÖN GASZTROBLOGJA',
          title: 'Receptek, amelyeket valakinek ki kell mondania.',
          body: 'Bögrés pörkölt, ketchupos tészta, szardíniás halászlé. Kritikával, 2008 óta.',
          photo: latest && photoFor(latest),
          stamp: latest?.data.stamp,
        },
      },
    },
    ...posts.map((post) => ({
      params: { card: post.id },
      props: {
        card: {
          title: post.data.title,
          meta: `Beküldte: ${post.data.author} | ${post.data.date}`,
          rating: post.data.rating,
          photo: photoFor(post),
          stamp: post.data.stamp,
        },
      },
    })),
  ];
}

export async function GET({ props }) {
  return new Response(await renderOgCard(props.card), { headers: { 'Content-Type': 'image/jpeg' } });
}
