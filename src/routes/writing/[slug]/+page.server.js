import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '$lib/server/posts.js';
import flowers from '$lib/data/flowers.json';

export function entries() {
	return listPosts({ drafts: true }).map((p) => ({ slug: p.slug }));
}

// Posts take drawings in order of publication, so a new post never changes an older one's plant.
const byAge = listPosts({ drafts: true })
	.map((p) => p.slug)
	.reverse();

export function load({ params }) {
	const found = getPost(params.slug);
	if (!found) error(404, 'Post not found');
	return { ...found, flower: flowers[byAge.indexOf(params.slug) % flowers.length] };
}
