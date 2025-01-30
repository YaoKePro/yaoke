import { loadBlogPosts } from "$lib/content";

export async function load({ params }) {
  const posts = await loadBlogPosts();
  const post = posts.find((p) => p.slug === params.slug);

  return post ? { post } : { status: 404 };
}

export const prerender = true;
export async function entries() {
  const posts = await loadBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
