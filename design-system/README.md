Proligasztró (proligasztro.hu) is a **satirical** Hungarian food blog, built as an art project. It is the personal gourmet blog of **Zsírosdeszka Ödön**, a self-appointed food critic who started it in 2008, built it himself, and has not touched the design since 2009. He reviews recipes so bad that even an inexperienced home cook can tell at a glance, in the full, pompous vocabulary of fine-dining criticism.

**The one rule:** the design is *lovingly ugly* and completely sincere. It recreates a 2005–2010 hand-made Hungarian blog (the blog.hu era) faithfully: tiled background, fixed 780px page, boxed sidebar, Verdana, visitor counter, marquee, 88×31 badges. Ödön believes it looks elegant. Never exaggerate it into parody chaos, and never let it drift modern. Posts must stay easy to read.

**Under the hood it is professional.** Every colour, size and shadow is a token. Every piece is a React component on semantic HTML. The 2000s look is recreated with modern CSS (no real tables for layout, no frames, no GIF spacers). Text contrast meets WCAG AA, motion respects reduced-motion settings, and the page goes fluid below 800px.

## The persona

- **Zsírosdeszka Ödön**: ínyenc, önjelölt gasztrokritikus. Writes alone, late at night (22:00–01:30), after dinner. Signs off "Ínyenc üdvözlettel: Ö." or just "Ö.".
- **Two registers:**
  - **The critic** (post body): grand, earnest restaurant-review Hungarian applied to food that doesn't deserve it. "A tészta textúrája merész, ám végzetes vállalás." "A ketchup nem szósz, hanem vallomás."
  - **The man** (`EditorNote`, comment replies): short, personal, slightly wounded. "Szerk. megj.: a bögrét azóta sem tudtam kimosni. :("
- **The readers** (comments): kati62 (cooks it every Sunday, loves everything, "!!!"), GasztroGabi (agrees with Ödön a little too eagerly), Névtelen (posts at 3 a.m., "ez a blog egy vicc xD"). Ödön answers each one formally, the next night.
- **Who the joke is on:** the recipes and Ödön's own pomposity. Never anyone's income, class, region or body. Readers who cook these dishes are treated warmly; Ödön's replies jab at the food, not the person.
- Recipes are rewritten in house words and anonymised, never copied from a real person's post. No real people, blogs, brands or products: drinks are generic ("langyos kóla"), blogroll entries are invented.

## Content fundamentals

- **Language:** all user-facing copy is Hungarian, with proper accents (ő, ű), Hungarian quotation marks („…”), decimal comma ("2,5 g"), thin-space thousands ("1 840 kcal").
- **Dates:** post meta uses the old blog format "2026.11.22. 23:47"; archive links use "2026. november (7)"; photo stamps use "'26 11 22".
- **Posts** open with "Kedves Olvasóim!" and follow: photo → introduction → `RecipeBox` → `StepList` → critique → `NutritionTable` (optional) → `KetchupRating` → sign-off → comments.
- **Recipe steps** keep the classic recipe voice: first person plural, present tense ("kifőzzük", "tálaljuk"), sincere. Ödön's reactions go in step notes.
- **Period-correct punctuation:** the marquee and buttons may use "!!!" and "***". Commenters may use text smileys `:)` `:(` `:D` `;)` `xD`. **No emoji anywhere**: they didn't exist on the web in 2008. Ödön himself never uses smileys in the critic register.
- **Brand name:** "Proligasztró" in text; the domain is proligasztro.hu.

### Satire clues

| Clue | Where |
| --- | --- |
| The tablecloth background | `BlogShell`, every page |
| "A dizájn utoljára frissítve: 2009. március 3." while posts are current | `BlogFooter` |
| Ketchup-index (0–5 pixel drops, more is worse) | `KetchupRating`, end of every recipe post |
| Invented 2008 ads: „Ön a 1 000 000. látogató!”, ketchup wholesale, ringtones by SMS | `AdBanner`, `TextAds`, `Skyscraper` |
| "Hívd a tűzoltókat" difficulty, "(+ 2 nap lábadozás)" time | `RecipeBox` |
| Joke nutrition rows (Ízlés: nyomokban, Bűntudat: 140%) | `NutritionTable` |
| The poll where the worst option wins | `Poll` |
| Captcha: "Mennyi kettő meg kettő? (számmal, ketchup nélkül)" | `CommentList` form |
| "Most hallgatom: Mikrohullámú sütő, 800 W, 4 perc." | `SidebarBox` |
| **Satire notice (required on every page)** | `BlogFooter` |

## Visual foundations

**The tablecloth.** The page background is a tiled red gingham tablecloth: `assets/Backgrounds/tablecloth-tile.jpg`, a 48×48 JPEG (`tile-size`) with real compression noise, repeated across the whole viewport. The CSS falls back to a flat checker in `tablecloth-red` and `tablecloth-white` if the image fails. Nothing sits on the cloth except the content wrapper. In your build, copy the tile and set `--pg-tile: url(/your/path/tablecloth-tile.jpg)`.

**Layout.** A fixed `page-width` (780px) wrapper centred on the cloth, `space-30` from the top, with a 1px `chrome-dark` border and the `drop-hard` shadow. Inside: header, then a `content-width` (545px) post column and a `sidebar-width` (200px) sidebar, `space-15` apart. Below 800px the wrapper goes fluid and the sidebar drops under the posts.

**Colour.**
- Content on `page` (yellowed white); sidebar boxes and the recipe box on `box` (cornsilk) with a 1px `box-border`; their title bars on `box-head` with `on-box-head` text.
- The banner is a horizontal gradient from `banner-start` to `banner-end`, with the title in `banner-title` and a hard 3px black text-shadow.
- Text in `ink`, meta in `ink-muted`, post titles in `post-title`.
- Links are always underlined `link`, `link-visited` purple once visited, and `link-hover` red without underline on hover.
- Personal notes: `note-ink` on `note-bg`. Marquee: `marquee-ink` on `marquee-bg`. Counter: `led-ink` on `led-bg`. Photo date: `datestamp`.
- One skin only ("Klasszik skin"). No dark mode: 2008 didn't have one.

**Type.** System fonts of the era, no web fonts except Comic Neue as a fallback for devices without Comic Sans.
- **Georgia** (`--font-georgia`): `blog-title`, `post-title`, `post-subhead`.
- **Verdana** (`--font-verdana`): `post-body` (13/21: the one place readability wins), `sidebar`, `meta`, `small`, `box-title`, `badge`.
- **Comic Sans MS** (`--font-comic`): `note`, only for Ödön's personal asides.
- **Courier New** (`--font-courier`): `counter`, `datestamp`.
- **Tahoma** (`--font-tahoma`): `button`, form labels.

**Spacing.** Odd hand-typed pixels: `space-2`, `space-5`, `space-10`, `space-15`, `space-20`, `space-30`. Don't round them to a 4/8 grid.

**Shape.** Square everything (`radius-none`). The single exception is the poll box (`radius-web20`): Ödön read about rounded corners in 2007 and used them once.

**Depth.** Windows-98 bevels: `bevel-out` for buttons and raised frames, `bevel-in` for fields, pressed buttons and the poll track. `drop-hard` for the wrapper and photos. No blurred shadows anywhere.

**Dividers.** 1px dashed `box-border` between posts and above the footer; dotted under comment headers.

**Imagery.** `DigicamPhoto`: small (`photo-width`, 320px or less), 4:3, direct-flash, unflattering, with the orange date stamp added by the component. Crop people to hands. No stock photos and no styling.
- **Photos may be real or AI-generated, but they must pass as a real 2008 compact-camera snapshot**: built-in flash straight on, glare on anything wet, murky background, slightly wrong white balance, the same worn waxed-cloth kitchen tablecloth. Nothing glossy, no shallow depth of field, no steam, no garnish: the usual "AI food photo" look is off-brand.
- **Prompt the camera, not the quality.** Describe the dish and its sad situation plus the camera and kitchen; never "delicious", "beautiful", "professional", "8k" or "food photography". Keep one shared style block so every photo comes from the same kitchen.
- **Then make it worse:** downscale to 640×480, add a warm cast and a little sensor noise, save as a low-quality JPEG (about 60). Never render the date stamp into the image.
- The satire notice says the photos are made up too.
- **Enlarging:** in a full post every photo can be opened in `Lightbox`, at most 640×480 (the camera file), never an original. Listing pages show a 110px thumbnail (`thumb-width`) next to the excerpt, linking to the post.

**Motion.** Exactly three animations: the marquee, the blinking "ÚJ!", and the headline of one blinking `AdBanner` (at most one per page). All stop for visitors who prefer reduced motion. Nothing else moves: the photo `Lightbox` appears without any fade.

**Focus.** A 1px dotted black outline, offset 2px, like browsers drew it in 2008.

## Ads

The blog carries ads like every 2008 blog did, but every one of them is **invented**: house ads from Ödön's world, in period formats, never served by a real ad network (no tracking, no cookie banner).

- **Formats:** `AdBanner` (468×60) at the top of the post column on every page, and a static one between the 2nd and 3rd homepage excerpts; `TextAds` ("Szponzorált linkek", three ads) after each full post, before the comments; `Skyscraper` (120×600) as the last sidebar item.
- **Always labelled** with the small uppercase „Hirdetés” above the ad.
- **Only one thing blinks:** the headline of one `AdBanner` per page (the „Ön a 1 000 000. látogató!” prize banner). Everything else stays still.
- **Advertisers are made up** and stay in the satire's world: ketchup wholesale, microwave cleaning 0–24, a mug-cleaning service, ringtones by SMS. No real brands or products; any displayed domain is checked not to exist; premium numbers are written as words ("06-90-KETCHUP").
- **Every ad links to one page** („A hirdetés nem elérhető”) that admits the ad is not real. No prizes, no forms, nothing that collects data.
- The joke is on 2008 advertising and on the food, never on the reader: no ads mocking anyone's body, income or looks.

## Iconography

No icon set. The era used words, `»` bullets, `|` separators and text smileys. The only graphics are:
- the pixel-art ketchup drop (`assets/Pixel/ketchup-drop.svg` and `ketchup-drop-empty.svg`, 8×10 pixels shown at 16×20; `KetchupRating` draws the same pixels inline);
- the 88×31 `WebBadge` buttons, built in CSS;
- the tablecloth tile.

There is no logo: the title is live text in the banner.

## Components

All components live in `components/bundle.js` as `window.Proligasztro` (React 18), styled by `components/bundle.css` (class prefix `pg-`). Props are in `components/index.d.ts` and each `components/<Name>/README.md`.

- **Layout:** `BlogShell`, `BlogHeader`, `BlogFooter`, `Marquee`
- **Post:** `BlogPost`, `DigicamPhoto`, `Lightbox`, `EditorNote`, `KetchupRating`
- **Recipe:** `RecipeBox`, `StepList`, `NutritionTable`
- **Sidebar:** `SidebarBox`, `VisitorCounter`, `TagCloud`, `Poll`
- **Comments:** `CommentList` (comments and the "Szólj hozzá!" form)
- **Controls:** `Button`, `NewBadge`, `WebBadge`
- **Ads:** `AdBanner`, `TextAds`, `Skyscraper` (see Ads)

**Homepage:** `BlogShell` with `BlogHeader` → the five newest `BlogPost`s as excerpts (`more`) → "« Régebbi bejegyzések" link; sidebar: Rólam, Látogatók, Szavazás, Archívum, Címkék, Blogroll, Most hallgatom; `BlogFooter` with five badges.

**Post page:** same shell, one full `BlogPost` (photo, `RecipeBox`, `StepList`, critique, `NutritionTable`, `KetchupRating`), then `CommentList`.

When rebuilding these in another stack, keep the token names as CSS custom properties (`var(--box-head)`, `var(--space-10)`) and copy values from `tokens.json` exactly, never by eye.
