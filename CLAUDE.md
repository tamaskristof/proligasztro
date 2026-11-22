# Proligasztró

Satirical Hungarian food blog (art project), Astro static site on GitHub Pages.

- `design-system/README.md` is the source of truth for look, persona (Zsírosdeszka Ödön), voice and content rules. Follow it: Hungarian copy with proper accents and „…” quotes, no emoji, joke is on the recipes and Ödön's pomposity, never on people. Satire notice on every page (BlogFooter).
- The design system lives as a claude.ai artifact: https://claude.ai/artifact/GmMW4uTpCust2Rx5yQ2knD. `src/components/proligasztro.js` and `src/styles/blog.css` are ports of its bundle; keep pg-* class names and use tokens (`var(--…)`), never raw values. `src/styles/tokens.css` is generated (`npm run tokens`).
- Build needs Node 24 (`.nvmrc`). Site is served at https://proligasztro.hu/ (base `/`); still build internal links with `withBase()` from `src/lib/url.js` so a base path change stays a one-liner.
- Posts: `src/content/posts/*.mdx`, schema in `src/content.config.ts`, how-to in README.md.
- Photos: `npm run photo -- <slug>` (scripts/photo.mjs, fal.ai, needs FAL_KEY in .env). Rules in design-system/README.md → Imagery. A post's photo is `public/kepek/<slug>.jpg` by convention: listings show it as a thumbnail (`photoFor`), full posts open it in the Lightbox (max 640×480).
- Ads are invented house ads (src/lib/ads.js, components AdBanner/TextAds/Skyscraper); rules in design-system/README.md → Ads. Only one blinking banner per page.
- Sidebar polls live in `src/lib/polls.js`; `RandomPoll` (hydrated) shows one at random per page view. Add new ones there.
- Share images: `src/pages/og/[card].jpg.js` draws a 1200×630 card per post (and `fooldal`) at build time with sharp (`src/lib/og.js`); BaseLayout sets the OG/Twitter tags.
