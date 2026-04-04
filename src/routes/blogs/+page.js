import { loadBlogPosts } from "$lib/content";
import { error } from "@sveltejs/kit";

export async function load() {
  const posts = await loadBlogPosts();

  if (!posts || posts.length === 0) {
    throw error(404, "No blog posts found");
  }

  return {
    posts,
  };
}

export const prerender = true;
