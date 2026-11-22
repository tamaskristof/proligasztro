# Proligasztró

Zsírosdeszka Ödön's gourmet blog: a satirical art project that collects terrible
(mostly Hungarian) recipes and reviews them in the full, pompous voice of fine-dining
criticism, on a lovingly ugly hand-made 2008 blog.hu-era page.

Live: https://tamaskristof.github.io/proligasztro/

## Stack

- [Astro](https://astro.build) static site, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.
- Components ported from the Proligasztró design system (`src/components/proligasztro.js`, React, rendered to static HTML at build time). Only the poll and the comment form ship JavaScript.
- Design tokens: `design-system/tokens.json` → `npm run tokens` → `src/styles/tokens.css`.
- Design rules, persona and voice: `design-system/README.md`. **Read it before writing a post.**

## Run locally

Requires Node 24 (`nvm use`).

```sh
npm install
npm run dev      # http://localhost:4321/proligasztro/
npm run build    # output in dist/
```

## Writing a post

Add `src/content/posts/<slug>.mdx`. The slug becomes the URL: `/recept/<slug>/`.
Copy an existing post as a template. Everything user-facing is in Hungarian.

Frontmatter:

| field | |
|---|---|
| `title` | post title |
| `date` | old blog format: `"2026.11.22. 23:47"` (Ödön writes between 22:00 and 01:30) |
| `tags` | list of tags |
| `rating` | Ketchup-index, 0–5, more is worse |
| `excerpt` | homepage teaser, starts with "Kedves Olvasóim!" |
| `recipe` | `time`, `servings`, `difficulty`, `drink`, `ingredients: [{qty, name, note}]` |
| `steps` | list of strings or `{text, note}` (note = Ödön's green aside) |
| `nutrition` | `[{label, value, dv, joke}]` |
| `comments` | `[{name, date, text, url?, isAuthor?}]` (the readers: kati62, GasztroGabi, Névtelen; Ödön replies the next night) |
| `draft` | `true` hides it from the build |

Components available in the post body without importing:
`<DigicamPhoto>`, `<EditorNote>`, `<RecipeBox>`, `<StepList>`, `<NutritionTable>`, `<KetchupRating>`.
Use frontmatter data with `<RecipeBox {...frontmatter.recipe} />`, `<StepList steps={frontmatter.steps} />`,
`<NutritionTable rows={frontmatter.nutrition} />`.

Photos: put real, unflattering, direct-flash food photos in `public/kepek/` and use
`<DigicamPhoto src="/kepek/foo.jpg" date="'26 11 22" caption="…" alt="…" />`.
Without `src` it shows a flash placeholder. No stock or AI images.

## Custom domain (proligasztro.hu)

1. In `astro.config.mjs` set `SITE = 'https://proligasztro.hu'` and `BASE = '/'`.
2. Add `public/CNAME` containing `proligasztro.hu`.
3. DNS: apex `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` `CNAME` → `tamaskristof.github.io`.
4. Repo Settings → Pages → Custom domain, then "Enforce HTTPS".
