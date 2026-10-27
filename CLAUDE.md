# yaoke.pro

Yao Ke's personal site: projects and writing in one place. The writing is called **Second Thoughts** (`WRITING_NAME` in `src/lib/site.js`). SvelteKit + Vite + MDsveX, prerendered with adapter-static. No Tailwind: plain CSS with tokens in `src/app.css`.

## Dev

```bash
npm run dev -- --port 5104
npm run build && npx vite preview --port 4180
```

## Rules

- Every word of editorial copy (posts, intro, about, project lines) belongs to the author. Never rewrite or add prose unless asked; only fix typos or facts when asked ("fix those"). Never use em dashes.
- Design: "quiet craft". Calm editorial look (Newsreader for reading and headlines, Inter for interface text), near-white light mode by default with a dark mode, polish from small interactions rather than loud visuals. Reading progress in the corner of posts is the post's mosaic in ink line art (no colours): its pieces drift in as you read and lock into a square at the end.
- Keep pages fast and accessible: no heavy animation libraries, everything prerendered, works at phone width, respects reduced motion.

## Content

- **Essays** (formerly the How to Be Human blog): `src/content/human/<slug>.html` holds the body as plain HTML (paragraphs verbatim, HTML-escaped; `<h2>` for section headings; links as `<a href>`). `src/content/human/posts.json` lists them: `slug`, `title`, `date` (ISO with timezone, first publication), `tag: "human"` (shown as Human), optional `description` and `draft: true`.
- **Machine posts** (engineering, tag `machine`): `.svx` files in `src/content/blogs/` with frontmatter (`title`, `description`, `date`). A subfolder is a series.
- **Cover art** (every post has one): `src/content/covers.json` maps each slug to a public domain painting from Wikimedia Commons (`src`, `small`, `alt`, `width`, `height`, `credit`, `href`). Images are WebP in `static/images/covers/<slug>.webp` (the whole painting, never cropped, fitted inside 1680 × 1260) and a half-size `<slug>-840.webp`; tall paintings are capped in height and centred on the page. Public domain works only, no AI art; give a new post one when it's published.
- **Project art**: featured projects in `src/lib/site.js` carry a `cover` (public domain watercolours, 16:10, `static/images/projects/`).
- **Projects**: `src/lib/site.js` (`FEATURED`, `SELECTED`, `TOYS`).
- **Mosaics**: after adding a post, run `python3 scripts/mosaics.py`; it regenerates `src/lib/data/mosaics.json` (each slug seeds its own tiles). The build fails if a post has no mosaic.

## Publishing (publish means deploy)

1. Save the doc's raw text to `drafts/YYYY-MM-DD-<slug>.md`.
2. Write `src/content/human/<slug>.html` and add or update the entry in `posts.json`.
3. Add its cover art to `src/content/covers.json`, run `python3 scripts/mosaics.py`, then `npm run build` to check it builds.
4. Commit to `main` and push. Cloudflare Pages builds and deploys yaoke.pro from `main`.

Edits to an existing post just update its file; there is no version history any more.

## URLs

Posts live at `/writing/<slug>`. `static/_redirects` maps the old `/blogs/*` and `/deep-dives` paths. The old blog at blog.yaoke.pro redirects every path to `https://yaoke.pro/writing/…`.
