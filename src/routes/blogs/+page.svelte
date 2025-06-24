<script>
  let { data } = $props();
  const posts = data.posts;

  // Extract all unique categories
  const categories = ["coding", "life"];

  // Selected category (default to first one or 'All')
  let selectedCategory = $state(categories[0]);

  // Filtered posts based on selection
  let filteredPosts = $derived(
    posts.filter((post) => post.metadata.category === selectedCategory)
  );
</script>

<div class="max-w-4xl mx-auto px-4 py-20">
  <h1
    class="text-5xl font-bold text-gray-800 mb-12 text-center animate-fade-in"
  >
    Blogs
    <div
      class="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4 rounded-full"
    ></div>
  </h1>

  <div class="flex justify-center gap-4 mb-12 flex-wrap">
    {#each categories as category}
      <button
        onclick={() => (selectedCategory = category)}
        class="px-4 py-2 text-sm rounded-full border transition
        duration-200
        {selectedCategory === category
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-white text-blue-500 border-blue-200 hover:bg-blue-50'}"
      >
        {category}
      </button>
    {/each}
  </div>

  <div class="grid gap-8">
    {#each filteredPosts as post}
      <a
        href={`/blogs/${post.slug}`}
        class="group relative bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-md hover:shadow-lg transition-all
              duration-300 hover:-translate-y-1 border border-white/20 hover:border-blue-100/30"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30 rounded-xl opacity-0
                   group-hover:opacity-100 transition-opacity duration-300 -z-10"
        ></div>

        <h2 class="text-2xl font-semibold text-gray-800 mb-2">
          {post.metadata.title}
          <span
            class="bg-gradient-to-r from-blue-400 to-green-400 bg-[length:0%_2px] bg-left-bottom
                      bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]"
          >
          </span>
        </h2>

        <p class="text-gray-600 mb-4">{post.metadata.description}</p>

        <div class="flex flex-wrap gap-2 mb-4">
          {#each post.metadata.tags as tag}
            <span
              class="px-3 py-1 bg-blue-100/50 text-blue-600 rounded-full text-sm"
            >
              {tag}
            </span>
          {/each}
        </div>

        <div class="flex items-center text-sm text-blue-500 space-x-2">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="text-gray-500"
            >{new Date(post.metadata.date).toLocaleDateString()}</span
          >
          <span class="text-gray-500">Last Edited:</span>
          <span class="text-gray-500"
            >{new Date(post.metadata.edited).toLocaleDateString()}</span
          >
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
</style>
