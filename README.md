# Proligasztró

Zsírosdeszka Ödön's gourmet blog: a satirical art project that collects terrible
(mostly Hungarian) recipes and reviews them in the full, pompous voice of fine-dining
criticism, on a lovingly ugly hand-made 2008 blog.hu-era page.

Live: https://proligasztro.hu/

## Stack

- [Astro](https://astro.build) static site, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.
- Components ported from the Proligasztró design system (`src/components/proligasztro.js`, React, rendered to static HTML at build time). Only the poll and the comment form ship JavaScript; they talk to the Worker in `worker/` (see "Backend").
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
| `date` | old blog format, Budapest time: `"2026.11.22. 23:47"` (Ödön writes between 22:00 and 01:30). A future date is scheduled: the build leaves the post out until then, and the deploy workflow rebuilds every early morning (03:23 Budapest time with a backup at 05:47; an hour later in summer) |
| `tags` | list of tags |
| `rating` | Ketchup-index, 0–5, more is worse |
| `excerpt` | homepage teaser, starts with "Kedves Olvasóim!" |
| `recipe` | `time`, `servings`, `difficulty`, `drink`, `ingredients: [{qty, name, note}]` |
| `steps` | list of strings or `{text, note}` (note = Ödön's green aside) |
| `nutrition` | `[{label, value, dv, joke}]` |
| `comments` | `[{name, date, text, url?, isAuthor?}]` (the readers: kati62, GasztroGabi, Névtelen; Ödön replies the next night). Future-dated comments are held back the same way |
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
situation. Pick where and in what light it was shot with `photo.scene` (`konyha-ejjel` default,
`konyha-nappal`, `koli`, `iroda`, `kanape`, `erkely`, `vasarnap`, `unnepi`) and optionally
`photo.framing` (`felulrol`, `ferde`, `kozeli`, `oldalrol`, `levagott`; default picked from the slug):

```yaml
photo:
  prompt: "A large ceramic mug straight out of the microwave, …"
  scene: koli
  framing: ferde
```

`scripts/photo.mjs` adds the scene, the framing and the shared 2008 camera block (all in
`src/lib/photo-styles.js`), downscales to 640×480, applies the scene's colour cast and noise,
saves a quality-62 JPEG to `public/kepek/<slug>.jpg` and links it into the post. The unprocessed
original is kept in `.photo-cache/` (gitignored); a `--force` re-shoot keeps the previous one there
as `<slug>.<timestamp>.png`. Don't put two posts in a row in the same scene.

Photos for pages that aren't posts (e.g. `rolam`, Ödön's hand with a fork, also shown in the sidebar)
live in `src/lib/page-photos.js`: `npm run photo -- rolam`, then set `src` in the page by hand.
The rules are in `design-system/README.md` → Imagery.

## Backend: poll votes and comments

The site is static; a small Cloudflare Worker (`worker/`) with a D1 database stores the real poll
votes and queues readers' comments. Free tier, no server to run.

- **Polls:** `GET /results?poll=<name>`, `POST /vote`. The site shows the made-up votes from
  `src/lib/polls.js` plus the real ones. One vote per poll per browser and per IP (stored as a salted hash).
  New polls need a Worker redeploy (`npm run deploy` in `worker/`), since it validates poll names against that file.
- **Comments:** `POST /comment` only queues them. Spam filtering: Turnstile (invisible captcha), a honeypot
  field, a minimum fill time, 3 comments per hour per IP, and above all manual approval. Run `/moderate`
  in Claude Code (`.claude/skills/moderate/`) to approve them into the posts' frontmatter with Ödön's reply,
  or use `npm run comments -- pending | approve <id…> | reject <id…>` directly.
- **The sender sees their own comment:** `POST /comment` returns a random receipt; the browser keeps the
  comment with it in localStorage (30 days) and shows it above the form, only to that sender, with a badge
  from `GET /status?r=<receipt>,…`: „moderálásra vár”, „jóváhagyva, hamarosan megjelenik”, or once
  „nem jelent meg” after a rejection. Once the approved comment is on the page, the local copy goes.

While `src/lib/backend.js` has no API URL, the poll and the form only pretend, as before.

### One-time setup

```sh
cd worker && npm install
npx wrangler login
npx wrangler d1 create proligasztro         # paste the database_id into worker/wrangler.jsonc
npm run db:init                             # creates the tables (a database from before 2026-11-27 instead
                                            # needs migrations-001-receipt.sql, once)
npx wrangler secret put IP_SALT             # any long random string, e.g. from: openssl rand -hex 32
```

In the Cloudflare dashboard: **Turnstile → Add widget**, hostname `proligasztro.hu`, mode *Managed*.
Then:

```sh
npx wrangler secret put TURNSTILE_SECRET    # the widget's secret key
npm run deploy                              # prints https://proligasztro-api.<account>.workers.dev
```

Put that URL and the Turnstile **site** key into `src/lib/backend.js`, commit, push.

### Local development

```sh
cd worker && cp .dev.vars.example .dev.vars && npm run db:init:local && npm run dev   # :8787
# in the repo root, .env:
#   PUBLIC_API_URL=http://localhost:8787
#   PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
npm run dev
npm run comments -- pending --local
```

## Domain

Served at https://proligasztro.hu/ via GitHub Pages (`public/CNAME`, repo Settings → Pages).
DNS at dns24.hu: apex `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`;
`www` `CNAME` → `tamaskristof.github.io`.
