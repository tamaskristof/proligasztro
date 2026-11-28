---
name: moderate
description: Moderate Proligasztró reader comments. Pulls the pending comments from the comment queue (Cloudflare D1), lets the user approve or reject each, adds the approved ones to their posts' frontmatter with one reply from Ödön per post, builds, and marks them handled. Use when asked to moderate, review or approve comments (hozzászólások, moderálás).
argument-hint: "[--local]"
---

# Moderate comments

Readers' comments wait in the D1 queue (`worker/`, README.md → "Backend") until approved here. The site stays static: an approved comment appears once it's in the post's MDX and the site is rebuilt. `--local` in the argument means: use the local dev database (pass `--local` to every `npm run comments` call).

## 0. Load the rules

Read `design-system/README.md` in full (persona, Ödön's two registers, the readers, who the joke is on, content rules), then the comments of the two newest posts in `src/content/posts/` as models for how Ödön replies.

## 1. Fetch the queue

```sh
npm run -s comments -- pending
```

It prints JSON: `id`, `slug`, `name`, `url`, `text`, and `date` already in the blog format (Budapest time). If wrangler says it isn't logged in, ask the user to run `! npx wrangler login` in `worker/`. If the queue is empty, say so and stop.

Drop comments whose `slug` has no `src/content/posts/<slug>.mdx` (reject them in step 4).

## 2. Propose a verdict for each, and let the user decide

Show the comments grouped by post, each with your suggestion: **approve** or **reject** with a few words on why.

Reject:
- spam, ads, links to shops, SEO text, anything off-topic,
- insults, hate, harassment, or anything about a real, identifiable person (the joke is never on people),
- personal data (phone numbers, addresses, someone else's email),
- anything illegal or sexual.

Approve the rest, including rude-but-harmless ones about the recipes or about Ödön ("ez a blog egy vicc xD" is canon). Never edit the text of a comment you approve, except to fix broken whitespace. Leave out `url` unless the user asks to keep it: reader links are a spam magnet.

Ask the user to confirm the list (AskUserQuestion, or a plain question if there are many) before changing anything. The user has the final say on every comment.

## 3. Add the approved comments and Ödön's reply

For each post with approved comments, append to `comments:` in its frontmatter, in date order, after the existing ones:

```yaml
  - name: GasztroGabi           # "Névtelen" when the name was empty
    date: "2026.11.26. 22:14"   # the `date` from the queue
    text: "…"                   # quote with " and escape inner \" ; keep the reader's punctuation and smileys
```

Then add **one** reply from Ödön after them that answers each new commenter by name, in the order they wrote ("Kedves kati62! … Kedves Névtelen! …"), and ends "Ínyenc üdvözlettel: Ö." like the existing replies:

```yaml
  - name: Ödön
    isAuthor: true
    date: "…"                   # night time, blog format (see below)
    text: "…"
```

Ödön only writes at night (22:00–01:30, Budapest time). If it's night now, use the current time; otherwise use tonight at a plausible minute between 22:00 and 23:59 (for example 22:41), never the same minute as an existing reply. It must be later than the comments it answers. A date later than now is fine: the build leaves out comments dated in the future and the early-morning rebuild (`.github/workflows/deploy.yml`, 03:23 Budapest time, with a backup at 05:47) publishes the reply, so the reader's comment shows up now and Ödön's answer by the next morning (or with the next push after its time). Tell the user when the reply will appear.

Voice: formal, pompous about food, slightly wounded, never mean to the reader. Answer what they actually wrote. No emoji, no smileys from Ödön, Hungarian with proper accents and „…” quotes. Show the user the reply text before writing it if they want to review it; otherwise write it and show it in the summary.

## 4. Build, then mark them handled

```sh
npm run build
```

The build must pass (the schema in `src/content.config.ts` checks the frontmatter). Only after it does:

```sh
npm run -s comments -- approve <ids…>
npm run -s comments -- reject <ids…>
```

This also wipes their email and IP hash from the database.

## 5. Report

List per post who was approved, what was rejected and why, and Ödön's reply. Don't commit unless the user asks; when they do, a message like `Hozzászólások moderálva: <slugs>` fits the history.
