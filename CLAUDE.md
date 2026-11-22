# Proligasztró

Satirical Hungarian food blog (art project), Astro static site on GitHub Pages.

- `design-system/README.md` is the source of truth for look, persona (Zsírosdeszka Ödön), voice and content rules. Follow it: Hungarian copy with proper accents and „…” quotes, no emoji, joke is on the recipes and Ödön's pomposity, never on people. Satire notice on every page (BlogFooter).
- The design system lives as a claude.ai artifact: https://claude.ai/artifact/GmMW4uTpCust2Rx5yQ2knD. `src/components/proligasztro.js` and `src/styles/blog.css` are ports of its bundle; keep pg-* class names and use tokens (`var(--…)`), never raw values. `src/styles/tokens.css` is generated (`npm run tokens`).
- Build needs Node 24 (`.nvmrc`). Site is served under `/proligasztro/`: build internal links with `withBase()` from `src/lib/url.js`.
- Posts: `src/content/posts/*.mdx`, schema in `src/content.config.ts`, how-to in README.md.
