import { loadBlogPosts } from "$lib/content";

export async function load() {
  const posts = await loadBlogPosts();

  // Filter posts that are part of a series
  const seriesPosts = posts.filter((post) => post.metadata.series);

  // Group by series name
  const seriesMap = new Map();

  seriesPosts.forEach((post) => {
    const seriesName = post.metadata.series;
    if (!seriesMap.has(seriesName)) {
      seriesMap.set(seriesName, []);
    }
    seriesMap.get(seriesName).push(post);
  });

  // Convert to array and sort chapters
  const series = Array.from(seriesMap.entries()).map(([name, chapters]) => {
    const sortedChapters = chapters.sort((a, b) => a.metadata.chapter - b.metadata.chapter);

    return {
      name,
      chapters: sortedChapters,
      chapterCount: sortedChapters.length,
      description: sortedChapters[0].metadata.description || "",
      firstChapterSlug: sortedChapters[0].slug,
    };
  });

  return { series };
}

export const prerender = true;
