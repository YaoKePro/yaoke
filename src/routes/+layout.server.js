import { listPosts } from '$lib/server/posts.js';
import { FEATURED, SELECTED, TOYS, TAGS } from '$lib/site.js';

export const prerender = true;

export function load() {
	const posts = listPosts();
	const search = [
		{ title: 'Home', kind: 'Page', href: '/' },
		{ title: 'Writing', kind: 'Page', href: '/writing' },
		{ title: 'Projects', kind: 'Page', href: '/projects' },
		{ title: 'About', kind: 'Page', href: '/about' },
		...posts.map((p) => ({ title: p.title, kind: TAGS[p.tag], href: `/writing/${p.slug}` })),
		...[...FEATURED, ...SELECTED, ...TOYS]
			.filter((p) => p.href)
			.map((p) => ({ title: p.name, kind: 'Project', href: p.href }))
	];
	return { search };
}
