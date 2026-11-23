---
name: new-post
description: Add a new recipe post (bejegyzés) to Proligasztró, end to end. Proposes post ideas when none is given, writes the MDX in Ödön's voice, generates the photo, adds a matching sidebar poll (and optionally a text ad), then builds and checks every page the post shows up on. Use when asked for a new post, article, recipe, bejegyzés or recept.
argument-hint: "[dish or idea, optional] [--no-photo]"
---

# New Proligasztró post

The argument (may be empty) is the idea: a dish, a theme, a rough pitch, or nothing. `--no-photo` skips the paid photo step.

## 0. Load the rules and the current state (always, before proposing anything)

Read these in full. They are the source of truth, and this skill doesn't repeat them:
- `design-system/README.md`: persona, both of Ödön's registers, the readers, who the joke is on, content rules, Imagery (scenes and framings), Ads.
- `README.md` → "Writing a post" and "Photos": frontmatter fields and the photo workflow.
- `src/content.config.ts`: the schema (the build fails on a mismatch).
- The two newest posts in `src/content/posts/`, read whole, as templates for structure and tone.
- `src/lib/polls.js` and `src/lib/ads.js`.

Then build a quick inventory of every post: slug, title, date, tags, rating, `photo.scene`, `photo.framing`. For example:

```sh
for f in src/content/posts/*.mdx; do echo "== $f"; grep -E '^(title|date|tags|rating):|^  (scene|framing):' "$f"; done
```

Today's date matters: it sets the post's date and the season.

## 1. Pick the idea

**If the argument names a dish or idea**, use it. If it's only a direction ("something with tejföl", "Christmas"), treat it as a constraint for the proposals below.

**Otherwise, propose 4 ideas** with AskUserQuestion (one question, 4 options). Each option:
- label: the Hungarian post title, in the house pattern `<Dish> – <pompous subtitle>` (for example „Halászlé szardíniakonzervből – karácsonyi főpróba”);
- description: a one-line pitch in English: the recipe's crime, who sent it in, the scene, the planned Ketchup-index.

Good ideas:
- are a real Hungarian home-cooking or student/office dish ruined in a way any home cook can spot: wrong appliance (mikró, vízforraló, vasaló), wrong ingredient (konzerv, zacskós, ételízesítő), a shortcut, a forbidden combination, leftovers pushed too far;
- **don't repeat** a dish or main gimmick already on the blog (check the inventory: there's already a lot of mikró);
- fit the season (today's date: Advent, farsang, Easter, summer grilling, back to school, and so on), at least one of the four;
- vary the rating (0–5, more is worse; not everything is a 5) and the scene;
- stay inside the content rules: the joke is on the recipe and on Ödön, never on anyone's income, class, region or body; no real brands, products, people or blogs.

## 1b. Approve the outline (always, before writing anything)

Once the idea is settled, show a short plain-text outline in the chat. Don't write any files, don't generate a photo, and don't make a mock-up. Keep it to about 15 lines, with the copy in Hungarian:

- **Cím** and **slug**
- **Dátum**, **címkék**, **Ketchup-index** (with a one-line reason)
- **Recept:** the gist in one line, the 5–8 ingredients as a comma list, and the „crime” (what's wrong with it)
- **Kritika:** the angle of the critique and the `### ` headings
- **Fotó:** the scene and framing, plus one line on what the picture will show
- **Hozzászólók:** who comments and the gist of each, plus the gist of Ödön's reply
- **Szavazás:** the question and the four options, marking the one that wins
- **Hirdetés:** the ad idea, or „nincs”

Then ask with AskUserQuestion: „Jóváhagyod?” with the options *Mehet* (go ahead) and *Módosítanék* (change something). The user can also answer with free text. On a change request, revise only what they asked for, show the outline again and ask again. Don't move on to step 2 until they approve. Everything written later must stick to the approved outline.

## 2. Write the post

**Slug:** a short, lowercase, accent-free, hyphenated Hungarian name (`turos-csusza-edes-sos`). It must not exist yet. File: `src/content/posts/<slug>.mdx`. The URL becomes `/recept/<slug>/`.

**Frontmatter** (follow the schema and the existing posts):
- `date`: `"YYYY.MM.DD. HH:MM"`, a night between 22:00 and 01:30, after the newest post and not in the future. Usually tonight, or last night if it's still before 22:00. A time after midnight carries the next day's date.
- `tags`: 2–4 lowercase Hungarian tags. Reuse existing tags where they fit, so the tag cloud grows denser instead of longer.
- `rating`: the planned Ketchup-index.
- `excerpt`: starts with „Kedves Olvasóim!”, 2–4 sentences, identical to the post's opening paragraph. It's also the share text.
- `photo`: `prompt` in English, describing **only the dish and its sad situation** plus a prop or two that belong to the scene (Imagery rules: no „delicious”, „professional”, steam, garnish or shallow focus). Set `scene` so it differs from the posts **directly before and after it by date**, preferably one that's rare in the inventory. Set `framing` so it differs from the previous post's.
- `recipe`: `time`, `servings`, `difficulty`, `drink` (all with Ödön's twist: „(+ 2 nap lábadozás)”, „Hívd a tűzoltókat”, a generic drink such as „langyos kóla”), and 5–8 `ingredients` with `qty`, `name` and a `note` here and there.
- `steps`: 4–7 steps in the sincere classic recipe voice (first person plural, present tense). Ödön's reactions go only in `note`, in parentheses.
- `nutrition`: 4–6 rows, the last one or two `joke: true`. Decimal comma, thin-space thousands („1 840 kcal”).
- `comments`: 2–4 readers in character, posted the morning or day after: kati62 (loves it, cooks it every Sunday, „!!!”), GasztroGabi (agrees too eagerly), Névtelen (3 a.m., „xD”). Then **one** reply from Ödön (`name: Ödön`, `isAuthor: true`) the next night, answering each reader formally, jabbing at the food and never at the person, signed „Ínyenc üdvözlettel: Ö.” or „Ö.”.
- No `draft` line.

**Body**, in this order (copy the structure of a recent post):
1. `<DigicamPhoto align="right" width={240} date="'YY MM DD" caption="…" alt="…" />`, with **no `src`** (the photo script adds it). `date` is the post's date in stamp form. The caption is one dry line from Ödön. Caption and alt follow the scene: „Vaku: be.” only when the scene uses flash. The alt text describes what's actually in the photo, in Hungarian.
2. „Kedves Olvasóim!” and the excerpt paragraph, then one more paragraph setting up the dish and its noble original.
3. `<RecipeBox {...frontmatter.recipe} />` and `<StepList steps={frontmatter.steps} />`.
4. The critique: one or two `### ` sections in the critic register (grand restaurant-review Hungarian applied to food that doesn't deserve it), then `### Összegzés`.
5. Optionally one `<EditorNote>…</EditorNote>`: the man, short and slightly wounded.
6. `<NutritionTable rows={frontmatter.nutrition} />`, then `<p class="pg-signoff">Ínyenc üdvözlettel: Ö.</p>`.

The page renders the Ketchup-index, text ads and comments by itself, so don't add them to the body.

**Language check before moving on:** proper accents (ő, ű, not õ or û), „…” quotes (never "…" in copy), no emoji anywhere, smileys only in reader comments and EditorNote, never in the critic register. Hungarian throughout, except the photo prompt.

## 3. Photo

Unless `--no-photo` was passed: check that `.env` has `FAL_KEY` (`grep -c '^FAL_KEY=' .env`; never print the key), then run

```sh
npm run photo -- <slug>
```

It costs about $0.05, calls fal.ai, writes `public/kepek/<slug>.jpg` and adds `src` to the post's `<DigicamPhoto>`. Then **look at the image** (Read the jpg) and check it against Imagery: does it pass as a 2008 compact-camera snapshot of the right dish in the right scene, with nothing glossy and no text or date stamp baked in? If it fails clearly, adjust `photo.prompt` and re-shoot **once** with `--force` (say so, since that's another ~$0.05). Fix the caption and alt so they match what the photo really shows.

With no key, or with `--no-photo`, leave the `<DigicamPhoto>` without `src` (the flash placeholder shows) and tell the user the command to run later.

## 4. The other hand-maintained parts

Listings take care of themselves: the homepage, pagination, archive, tag pages, sidebar archive and tag cloud, the RSS feed, the marquee („Új bejegyzés: …”), the OG share card, the listing thumbnail and the Lightbox all come from the collection. Do these by hand:

- **Poll (always):** add one poll to `src/lib/polls.js`, inspired by this post, following the header rules: a `name` (short slug, unique), a question, exactly four options, invented fixed vote counts where the worst or funniest option wins, the joke on the food or on Ödön, never on readers, no brands. Look at the `parizsi` and `halaszle` entries for how a post-tied poll reads.
- **Text ad (only when the dish suggests a really good invented advertiser):** add one entry to `textAdPool` in `src/lib/ads.js` (`title`, `text`, `url`). Follow the Ads rules: invented, inside the satire's world, nothing that mocks the reader. **Check the domain doesn't exist** (`dig +short NS <domain>` and `dig +short <domain>` both return nothing); if it does exist, pick another. Update the „checked not to exist (date)” comment. Don't touch the prize banner (only one thing blinks), the list banner or the skyscraper.
- **Docs:** if the post needs something the README doesn't describe yet (a new scene, a new component), stop and ask. Don't extend the design system from this skill.

## 5. Build and verify

Build with Node 24 (if `node -v` isn't v24, use `source ~/.nvm/nvm.sh && nvm use` first):

```sh
npm run build
```

It must pass with no schema errors. Then check in `dist/`:
- `dist/recept/<slug>/index.html` exists and contains the title, the photo path and the comments;
- `dist/index.html` lists the post first, and its marquee names it;
- `dist/og/<slug>.jpg` exists (Read it to see the share card);
- `dist/rss.xml` contains the slug;
- every tag of the post has a `dist/cimke/<tag-slug>/index.html`.

## 6. Hand back

Report briefly: the title and slug, scene and framing, rating, the new poll's question, any ad added, what the photo cost, and the build result. Mention anything skipped (the photo, the re-shoot). Don't commit unless asked. If asked, use a Hungarian commit message in the house style, for example `Új recept: <dish rövid neve>`.
