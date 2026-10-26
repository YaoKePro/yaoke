import { listPosts } from '$lib/server/posts.js';
import mosaics from '$lib/data/mosaics.json';

export function load() {
	return {
		posts: listPosts().slice(0, 7),
		total: listPosts().length,
		mosaics: { restless: mosaics['project:restless'], frankensurf: mosaics['project:frankensurf'] }
	};
}
