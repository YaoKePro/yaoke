export async function load() {
  const modules = import.meta.glob("/src/content/blogs/*.{svx,md}", {
    eager: true,
  });

  const posts = await Object.entries(modules)
    .map(([path, module]) => {
      const slug = path
        .split("/")
        .pop()
        .replace(/\.(svx|md)/, "");

      return {
        slug,
        metadata: module.metadata,
        component: module.default,
      };
    })
    .sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date))
    .slice(0, 2); // Get only the 2 most recent posts

  return {
    posts,
  };
}

export const prerender = true;
