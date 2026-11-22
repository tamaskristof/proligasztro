# Proligasztró

Zsírosdeszka Ödön's gourmet blog: a satirical art project that collects terrible
(mostly Hungarian) recipes and reviews them in the full, pompous voice of fine-dining
criticism, on a lovingly ugly hand-made 2008 blog.hu-era page.

Live: https://proligasztro.hu/

## Stack

- [Astro](https://astro.build) static site, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.
- Components ported from the Proligasztró design system (`src/components/proligasztro.js`, React, rendered to static HTML at build time). Only the poll and the comment form ship JavaScript.
- Design tokens: `design-system/tokens.json` → `npm run tokens` → `src/styles/tokens.css`.
- Design rules, persona and voice: `design-system/README.md`. **Read it before writing a post.**

## Run locally

Requires Node 24 (`nvm use`).

```sh
npm install
npm run dev      # http://localhost:4321/
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

## Photos

Every post has a `<DigicamPhoto … />`; without `src` it shows a flash placeholder.
Real photos: save them as 640×480 JPEGs in `public/kepek/` and add `src="/kepek/<file>.jpg"`.

AI photos (fal.ai), one per post:

```sh
echo 'FAL_KEY=…' > .env                       # once; .env is gitignored
npm run photo -- ketchupos-teszta             # GPT Image 2 (default, ~$0.05)
npm run photo -- ketchupos-teszta --model nano --force   # try Nano Banana 2.1 instead
npm run photo -- ketchupos-teszta --reprocess # redo only the degrading step, free
```

The prompt is `photo.prompt` in the post's frontmatter: describe only the dish and its sad
situation. `scripts/photo.mjs` adds the shared camera/kitchen style block, downscales to
640×480, adds a warm cast and noise, saves a quality-62 JPEG to `public/kepek/<slug>.jpg`
and links it into the post. The unprocessed original is kept in `.photo-cache/` (gitignored).
The rules are in `design-system/README.md` → Imagery.

## Domain

Served at https://proligasztro.hu/ via GitHub Pages (`public/CNAME`, repo Settings → Pages).
DNS at dns24.hu: apex `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`;
`www` `CNAME` → `tamaskristof.github.io`.
