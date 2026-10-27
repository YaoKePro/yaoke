import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '$lib/server/posts.js';

export function entries() {
	return listPosts().map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
	const found = getPost(params.slug);
	if (!found) error(404, 'Post not found');
	return found;
}
