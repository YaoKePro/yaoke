import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '$lib/server/posts.js';
import mosaics from '$lib/data/mosaics.json';

export function entries() {
	return listPosts().map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
	const found = getPost(params.slug);
	if (!found) error(404, 'Post not found');
	const tiles = mosaics[params.slug];
	if (!tiles) throw new Error(`No mosaic for ${params.slug}: run python3 scripts/mosaics.py`);
	return { ...found, tiles };
}
