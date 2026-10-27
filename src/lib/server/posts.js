// Every post on the site, from two sources: hand-written HTML essays and older mdsvex posts.
// Build-time only: pages get plain HTML strings, never the post components.
import { render } from 'svelte/server';
import humanIndex from '../../content/human/posts.json';
// Public domain cover art per slug, for both kinds of post.
import covers from '../../content/covers.json';

const humanBodies = import.meta.glob('/src/content/human/*.html', {
	query: '?raw',
	import: 'default',
	eager: true
});
const engineeringModules = import.meta.glob('/src/content/blogs/**/*.svx', { eager: true });

const WORDS_PER_MINUTE = 225;

function minutes(html) {
	const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// Frontmatter dates arrive as strings or Date objects depending on how they were written.
const ymd = (value) => (value instanceof Date ? value.toISOString() : String(value)).slice(0, 10);

function slugify(path) {
	return path
		.split('/')
		.pop()
		.replace(/\.svx$/, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

const posts = [];

for (const entry of humanIndex) {
	const html = humanBodies[`/src/content/human/${entry.slug}.html`];
	if (!html) throw new Error(`Missing body for ${entry.slug}`);
	posts.push({
		...entry,
		date: new Date(entry.date).toISOString(),
		cover: covers[entry.slug] ?? entry.cover ?? null,
		minutes: minutes(html),
		html
	});
}

for (const [path, module] of Object.entries(engineeringModules)) {
	if (/\/(Templates|\.archive|\.obsidian)\//.test(path)) continue;
	const meta = module.metadata ?? {};
	if (!meta.date) continue;
	const html = render(module.default).body;
	const series = path.match(/\/blogs\/([^/]+)\//)?.[1];
	const slug = slugify(path);
	posts.push({
		slug,
		cover: covers[slug] ?? null,
		title: meta.title,
		description: meta.description,
		date: new Date(`${ymd(meta.date)}T09:00:00+10:00`).toISOString(),
		tag: 'engineering',
		series: series ?? null,
		chapter: meta.chapter ?? null,
		minutes: minutes(html),
		html
	});
}

posts.sort((a, b) => b.date.localeCompare(a.date));

const seen = new Set();
for (const post of posts) {
	if (seen.has(post.slug)) throw new Error(`Duplicate post slug: ${post.slug}`);
	seen.add(post.slug);
}

/** Post metadata without bodies, newest first. */
export function listPosts() {
	return posts.map(({ html, ...meta }) => meta);
}

export function getPost(slug) {
	const index = posts.findIndex((p) => p.slug === slug);
	if (index < 0) return null;
	const post = posts[index];
	const strip = (p) => p && { slug: p.slug, title: p.title };
	return { post, newer: strip(posts[index - 1]), older: strip(posts[index + 1]) };
}
