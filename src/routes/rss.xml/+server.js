import { listPosts, getPost } from '$lib/server/posts.js';
import { SITE, WRITING_NAME } from '$lib/site.js';

export const prerender = true;

const escape = (s) =>
	String(s ?? '').replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);

export function GET() {
	const items = listPosts()
		.filter((p) => !p.draft)
		.map((p) => {
			const url = `${SITE.url}/writing/${p.slug}`;
			const html = getPost(p.slug).post.html;
			return `<item><title>${escape(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate>${p.description ? `<description>${escape(p.description)}</description>` : ''}<content:encoded><![CDATA[${html.replaceAll(']]>', ']]]]><![CDATA[>')}]]></content:encoded></item>`;
		})
		.join('');
	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${WRITING_NAME} · ${SITE.name}</title><link>${SITE.url}/writing</link><description>${escape(SITE.description)}</description><language>en-au</language><atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
