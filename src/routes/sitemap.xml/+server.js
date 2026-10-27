import { listPosts } from '$lib/server/posts.js';
import { SITE } from '$lib/site.js';

export const prerender = true;

export function GET() {
	const pages = ['', '/writing', '/projects', '/about'];
	const urls = [
		...pages.map((p) => `<url><loc>${SITE.url}${p}</loc></url>`),
		...listPosts().map((p) => `<url><loc>${SITE.url}/writing/${p.slug}</loc><lastmod>${p.date.slice(0, 10)}</lastmod></url>`)
	].join('');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
		{ headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
	);
}
