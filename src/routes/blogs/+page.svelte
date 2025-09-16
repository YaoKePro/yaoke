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

<div class="max-w-6xl mx-auto px-6 py-16">
  <!-- Header -->
  <div class="text-center mb-16">
    <h1 class="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
      Blog
    </h1>
    <p class="text-lg text-secondary max-w-2xl mx-auto">
      Thoughts on programming, startups, and building things that might actually matter.
    </p>
  </div>

  <!-- Category Filter -->
  <div class="flex justify-center gap-3 mb-12">
    {#each categories as category}
      <button
        onclick={() => (selectedCategory = category)}
        class="category-filter {selectedCategory === category ? 'active' : ''}"
      >
        {category}
      </button>
    {/each}
  </div>

  <!-- Blog Posts -->
  <div class="grid gap-8">
    {#each filteredPosts as post}
      <article class="blog-card group">
        <div class="flex flex-col">
          <!-- Post Header -->
          <div class="mb-4">
            <h2 class="text-2xl font-semibold text-primary group-hover:text-primary-hover transition-colors mb-2">
              <a href={`/blogs/${post.slug}`} class="blog-link">
                {post.metadata.title}
              </a>
            </h2>

            <!-- Meta Info -->
            <div class="flex items-center space-x-4 text-sm text-tertiary">
              <time>{new Date(post.metadata.date).toLocaleDateString()}</time>
              {#if post.metadata.edited}
                <span>• Updated {new Date(post.metadata.edited).toLocaleDateString()}</span>
              {/if}
            </div>
          </div>

          <!-- Description -->
          <p class="text-secondary mb-4 leading-relaxed">
            {post.metadata.description}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2">
            {#each post.metadata.tags as tag}
              <span class="tag">
                {tag}
              </span>
            {/each}
          </div>
        </div>
      </article>
    {/each}
  </div>

  <!-- Empty State -->
  {#if filteredPosts.length === 0}
    <div class="text-center py-16">
      <p class="text-tertiary">No posts found in this category yet.</p>
    </div>
  {/if}
</div>

<style>
  .category-filter {
    background-color: var(--color-bg-primary);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 500;
    transition: var(--transition-fast);
    text-transform: capitalize;
  }

  .category-filter:hover {
    border-color: var(--color-border-hover);
    background-color: var(--color-bg-secondary);
  }

  .category-filter.active {
    background-color: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  .blog-card {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    transition: var(--transition-base);
  }

  .blog-card:hover {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-md);
  }

  .blog-link {
    text-decoration: none;
    color: inherit;
  }

  .blog-link:hover {
    text-decoration: none;
  }

  .tag {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-tertiary);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 500;
    font-family: var(--font-mono);
  }
</style>
