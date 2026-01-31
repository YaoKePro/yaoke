<script>
  import SpotlightCard from "$lib/components/SpotlightCard.svelte";
  import ScrollReveal from "$lib/components/ScrollReveal.svelte";
  import TextReveal from "$lib/components/TextReveal.svelte";

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
    <TextReveal
      text="Blog"
      as="h1"
      class="font-serif text-4xl md:text-5xl font-bold text-primary mb-4"
      staggerDelay={0.06}
    />
    <ScrollReveal delay={0.3}>
      <p class="text-lg text-secondary max-w-2xl mx-auto">
        Thoughts on programming, startups, and building things that might
        actually matter.
      </p>
    </ScrollReveal>
  </div>

  <!-- Category Filter -->
  <ScrollReveal delay={0.4}>
    <div class="flex justify-center gap-3 mb-12">
      {#each categories as category, i}
        <button
          onclick={() => (selectedCategory = category)}
          class="category-filter {selectedCategory === category ? 'active' : ''}"
          style="transition-delay: {0.1 * i}s"
        >
          {category}
        </button>
      {/each}
    </div>
  </ScrollReveal>

  <!-- Blog Posts -->
  <div class="grid gap-8">
    {#each filteredPosts as post, i}
      <ScrollReveal delay={0.1 * i} direction="up">
        <SpotlightCard as="article" class="blog-card group">
          <div class="flex flex-col">
            <!-- Post Header -->
            <div class="mb-4">
              <h2
                class="text-2xl font-semibold text-primary group-hover:text-primary-hover transition-colors mb-2"
              >
                <a href={`/blogs/${post.slug}`} class="blog-link">
                  {post.metadata.title}
                </a>
              </h2>

              <!-- Meta Info -->
              <div
                class="flex items-center space-x-4 text-sm text-tertiary"
              >
                <time>{new Date(post.metadata.date).toLocaleDateString()}</time>
                {#if post.metadata.edited}
                  <span
                    >• Updated {new Date(
                      post.metadata.edited
                    ).toLocaleDateString()}</span
                  >
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
        </SpotlightCard>
      </ScrollReveal>
    {/each}
  </div>

  <!-- Empty State -->
  {#if filteredPosts.length === 0}
    <ScrollReveal>
      <div class="text-center py-16">
        <p class="text-tertiary">No posts found in this category yet.</p>
      </div>
    </ScrollReveal>
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
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    text-transform: capitalize;
    cursor: pointer;
  }

  .category-filter:hover {
    border-color: var(--color-border-hover);
    background-color: var(--color-bg-secondary);
    transform: translateY(-1px);
  }

  .category-filter.active {
    background-color: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
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
    transition: all 0.2s ease;
  }

  .tag:hover {
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }
</style>
