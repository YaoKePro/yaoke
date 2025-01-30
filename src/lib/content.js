export async function loadBlogPosts() {
  const modules = import.meta.glob("/src/content/blogs/*.{svx,md}", {
    eager: true,
  });

  return Object.entries(modules)
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
    .sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}
