export async function loadBlogPosts() {
  const modules = import.meta.glob("/src/content/blogs/**/*.{svx,md}", {
    eager: true,
  });

  return Object.entries(modules)
    .filter(([path]) => !path.includes("/Templates/") && !path.includes("/.archive/") && !path.includes("/.obsidian/"))
    .map(([path, module]) => {
      const slug = path
        .split("/")
        .pop()
        .replace(/\.(svx|md)/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      return {
        slug,
        metadata: module.metadata,
        component: module.default,
      };
    })
    .filter((post) => post.metadata?.date)
    .sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}
