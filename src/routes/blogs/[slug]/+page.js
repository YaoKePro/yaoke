import { error } from "@sveltejs/kit";
import { loadBlogPosts } from "$lib/content";

export async function load({ params }) {
  const posts = await loadBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) throw error(404, "Post not found");

  return { post, allPosts: posts };
}

export const prerender = true;
export async function entries() {
  const posts = await loadBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
