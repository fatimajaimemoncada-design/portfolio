# Fatima Jaime — Portfolio

Static portfolio site for brand designer Fatima Jaime + a monthly blog ("Design Scroll of the Month"). Vanilla HTML/CSS/JS, no build step. Deployed to Cloudflare Workers.

- **Live**: https://portfolio.fatimajaimemoncada.workers.dev/
- **Blog**: https://portfolio.fatimajaimemoncada.workers.dev/blog
- **Repo**: https://github.com/fatimajaimemoncada-design/portfolio (auto-deploys on push to `main`)

## File map

| File | Purpose |
| --- | --- |
| `index.html` | Portfolio page: hero, work branches (editorial/social/branding/campaigns), info strip, about, contact, footer. Markup-only shell — grid contents are injected by JS. |
| `blog.html` | Blog page shell: hero header, language toggle, month dropdown. Posts rendered by JS into `#blog-feed`. |
| `styles.css` | All CSS for both pages. Sections clearly delimited by `/* ---------- X ---------- */` headers. |
| `portfolio.js` | All JS. Holds the work `data` object, the `blog` array, render functions, lightbox, auto-hide nav, ESP/ENG toggle, scroll-reveal, Madrid clock. |
| `wrangler.toml` | Cloudflare deploy config. Worker name is `portfolio`. Do not touch unless renaming. |
| `.assetsignore` | **Critical.** Gitignore-style filter for what gets uploaded as public web assets. Without this, `.git/`, `wrangler.toml`, etc. would be served at `/.git/config` etc. |
| `assets/` | All images. Subfolders by domain: `editorial/`, `social/`, `branding/`, `campaigns/`, `blog/YYYY-MM/<slug>/`. |
| `uploads/` | Local-only scratch. Gitignored at the asset level — never served. |

## Where data lives

Almost all *content* (project titles, descriptions, paragraph text, image paths) lives in **`portfolio.js`** as plain JS objects. The HTML files are structural shells. To change wording or add entries, you usually edit `portfolio.js` — not the HTML.

Two top-level data structures:

- `data` — work tiles, keyed by branch (`editorial`, `social`, `branding`, `campaigns`). Each entry has `title`, `year`, `subtitle`, `description`, `cover`, `images[]`. Order in the array = order on the page.
- `blog` — newest-edition-first array. Each edition has `month` (e.g. `'2026-04'`), `label.{es,en}`, `posts[]`. Each post has bilingual `title.{es,en}`, `accent` (hex color for the colored image panels), `body.{es,en}` (paragraph arrays — must have same count in both languages), `breaks[]` (where images interleave between paragraphs), `links[]`.

## Common editing tasks

### Add a new month to the blog
1. Drop images into `assets/blog/YYYY-MM/<post-slug>/` (use clean filenames: `01.jpg`, `02.jpg`, etc.).
2. Prepend a new entry to the `blog` array in `portfolio.js` (newest first → top of array).
3. Fill `month`, bilingual `label`, and `posts[]`. For each post:
   - Bilingual `title` and `body`. **Body arrays must have the same paragraph count in `es` and `en`** — `breaks` reference paragraph numbers and apply to both languages.
   - `accent` — pick a soft tone that complements the project's vibe.
   - `breaks[]` — entries like `{ afterPara: 2, images: ['assets/blog/.../01.jpg'] }`. `afterPara` is 1-indexed.
   - `links[]` — optional; entries like `{ label: 'Web', href: '...' }`.
4. `git push` and it deploys.

### Edit existing blog text
Edit the relevant paragraph in `body.es` AND `body.en` of the post. Keep paragraph count in sync between languages. If you add or remove a paragraph, update the `afterPara` indices in `breaks[]` so images stay anchored where the editor intended.

### Add or reorder a portfolio entry (work tile)
Edit the relevant branch array in `data` (`editorial`, `social`, `branding`, `campaigns`). Drop images into `assets/<branch>/<project-slug>/`. Order in array = order on page.

### Change a portfolio image
Just swap the file in `assets/...` keeping the same filename, or update the path in the data array. The lightbox shows all images in the order of the `images[]` array (cover is usually first).

## Bilingual conventions (blog only)

- Site shell (nav, about, contact) is English. Only the blog content is bilingual.
- Default `blogLang` is `es`. Persisted in `localStorage` under key `blogLang`.
- The `<html data-blog-lang="...">` attribute drives the show/hide of `[data-lang-text="es"]` vs `[data-lang-text="en"]` elements in HTML.

### Translation voice
Prefer lean, conversational English over literal Spanish-style expansions. e.g., "Trabajo Final de Grado" → "thesis", not "architecture thesis" or "final degree project". The user reads for flow, not academic precision. When you write a draft EN translation, flag it as a draft and let her review.

## Layout conventions

### Auto-hide nav
The nav fades out on scroll-down, reveals on scroll-up or when the cursor enters the top ~80px band. Past the hero, it switches from `mix-blend-mode: difference` (white text inverting over photos) to a frosted-white bar so it stays legible over body text. Don't break the mix-blend-mode treatment at the top — it's load-bearing for the hero aesthetic.

### Blog post layout
Single-column editorial: title + body capped at 65ch and centered. Images interleave between paragraphs in full-bleed colored panels (the `accent` color), with the image floating on a thin white card with a soft shadow inside the panel.

### Don't introduce frameworks or a build step
This is intentionally vanilla — no React, no Tailwind, no bundler. Edits are dumb file changes. New JS goes into `portfolio.js`, new CSS into `styles.css`. Keep it that way unless explicitly asked.

## Deploying

Just push to `main`:

```
git -C C:\Users\aleja\Desktop\projects\fachi\portfolio add <files>
git -C C:\Users\aleja\Desktop\projects\fachi\portfolio commit -m "..."
git -C C:\Users\aleja\Desktop\projects\fachi\portfolio push origin main
```

Cloudflare picks it up via the GitHub integration (no GitHub Actions in the repo — don't look for them). Propagation takes 1–2 minutes.

### When the site goes down
First diagnostic: `curl -I https://portfolio.fatimajaimemoncada.workers.dev/.git/config` — if it returns 200, `.assetsignore` has been broken/removed and the worker bundle is bloated with git internals. Fix `.assetsignore`, redeploy.

Direct deploy from this machine (bypassing the GitHub auto-deploy) requires a Cloudflare API token because wrangler refuses OAuth in non-interactive Claude Code contexts:

```
CLOUDFLARE_API_TOKEN=<token> CLOUDFLARE_ACCOUNT_ID=5d57faf1c5ee1dfb3a4ed5e9ea328766 npx wrangler deploy
```

Ask the user to paste a token from https://dash.cloudflare.com/profile/api-tokens (use the "Edit Cloudflare Workers" template) when needed.

## Hard "don'ts"

- **Don't remove `.assetsignore` or add new top-level files without adding them to it.** They'll get served publicly as web assets.
- **Don't add `.html` to internal nav links** — Cloudflare strips `.html` from URLs (307 redirects `/blog.html` → `/blog`). Both forms work; clean URLs are nicer.
- **Don't desync paragraph counts** between `body.es` and `body.en` in blog posts. `breaks[].afterPara` references the shared index.
- **Don't edit `index.html` or `blog.html` to add content** that should live as data — put it in `portfolio.js` (the work `data` object or the `blog` array).
- **Don't add a build step.** This project is intentionally vanilla.

## Misc

- Section ids in `index.html`: `#top` (hero), `#work` (work branches), `#about`, `#contact`. The blog nav link goes to `blog.html` (separate page).
- The `tweaks` panel (hero/layout/marquee toggles) and the lightbox div are kept in both HTML files for shared-JS compatibility, even though the blog page doesn't use the lightbox. The JS guards on element presence, but several handlers assume the tweaks elements exist.
- Touch devices: the custom red cursor and difference-blend nav are disabled via `@media (hover:none),(pointer:coarse)` — the nav becomes a frosted bar full-time on mobile.
