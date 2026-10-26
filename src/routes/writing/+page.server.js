import { listPosts } from '$lib/server/posts.js';

export function load() {
	return { posts: listPosts() };
}
