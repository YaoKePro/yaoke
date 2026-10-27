import { listPosts } from '$lib/server/posts.js';

export function load() {
	return {
		posts: listPosts().slice(0, 7),
		total: listPosts().length
	};
}
