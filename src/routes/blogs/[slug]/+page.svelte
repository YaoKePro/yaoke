<script>
  import { onMount } from "svelte";
  import SeriesNav from "$lib/components/SeriesNav.svelte";

  let { data } = $props();
  const Post = $derived(data.post.component);
  const metadata = $derived(data.post.metadata);
  const allPosts = $derived(data.allPosts);

  let scrollProgress = $state(0);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = (scrollTop / docHeight) * 100;
  }

  onMount(() => {
    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  });
</script>

<!-- Reading Progress Bar -->
<div
  class="fixed top-0 left-0 h-1 bg-primary z-50 transition-all"
  style="width: {scrollProgress}%"
></div>

<div class="max-w-4xl mx-auto px-6 py-16">
  <!-- Back Link -->
  <div class="mb-8">
    <a href={metadata.series ? "/deep-dives" : "/blogs"} class="back-link">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      {metadata.series ? "Back to Deep Dives" : "Back to Blog"}
    </a>
  </div>

  <!-- Article Header -->
  <header class="mb-12">
    <h1 class="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
      {metadata.title}
    </h1>

    <!-- Meta Information -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-tertiary mb-8">
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <time>{new Date(metadata.date).toLocaleDateString()}</time>
      </div>

      {#if metadata.edited}
        <div class="flex items-center space-x-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          <span>Updated {new Date(metadata.edited).toLocaleDateString()}</span>
        </div>
      {/if}
    </div>

    <!-- Tags -->
    {#if metadata.tags && metadata.tags.length > 0}
      <div class="flex flex-wrap gap-2 mb-8">
        {#each metadata.tags as tag}
          <span class="tag">
            {tag}
          </span>
        {/each}
      </div>
    {/if}
  </header>

  <!-- Article Content -->
  <article class="prose-content">
    <Post />
  </article>

  <!-- Series Navigation (if part of a series) -->
  {#if metadata.series}
    <SeriesNav
      series={metadata.series}
      currentChapter={metadata.chapter}
      allPosts={allPosts}
    />
  {/if}

  <!-- Footer -->
  <footer class="mt-16 pt-8 border-t border-border text-center">
    <a href={metadata.series ? "/deep-dives" : "/blogs"} class="back-link">
      ← {metadata.series ? "Back to Deep Dives" : "Back to all posts"}
    </a>
  </footer>
</div>

<style>
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: var(--transition-fast);
  }

  .back-link:hover {
    color: var(--color-primary);
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

  /* Custom prose styling that matches our design system */
  .prose-content {
    font-size: 1.125rem;
    line-height: 1.75;
    color: var(--color-text-primary);
  }

  :global(.prose-content h1),
  :global(.prose-content h2),
  :global(.prose-content h3),
  :global(.prose-content h4),
  :global(.prose-content h5),
  :global(.prose-content h6) {
    color: var(--color-text-primary);
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  :global(.prose-content h2) {
    font-size: 1.875rem;
    line-height: 1.33;
  }

  :global(.prose-content h3) {
    font-size: 1.5rem;
    line-height: 1.4;
  }

  :global(.prose-content h4) {
    font-size: 1.25rem;
    line-height: 1.5;
  }

  :global(.prose-content p) {
    margin-bottom: 1.5rem;
    color: var(--color-text-secondary);
  }

  :global(.prose-content a) {
    color: var(--color-primary);
    text-decoration: underline;
    transition: var(--transition-fast);
  }

  :global(.prose-content a:hover) {
    color: var(--color-primary-hover);
    text-decoration: none;
  }

  :global(.prose-content code) {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-primary);
    padding: 0.125rem 0.25rem;
    border-radius: var(--radius-sm);
    font-size: 0.875em;
    font-family: var(--font-mono);
  }

  :global(.prose-content pre) {
    background-color: #27201c;
    color: #f8f8f2;
    padding: 1.5rem;
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: 1.5rem 0;
    font-family: var(--font-mono);
    line-height: 1.5;
  }

  :global(.prose-content pre code) {
    background: none;
    padding: 0;
    color: inherit;
  }

  :global(.prose-content blockquote) {
    border-left: 4px solid var(--color-primary);
    padding-left: 1.5rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: var(--color-text-secondary);
  }

  :global(.prose-content ul),
  :global(.prose-content ol) {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
  }

  :global(.prose-content li) {
    margin-bottom: 0.5rem;
    color: var(--color-text-secondary);
  }

  :global(.prose-content hr) {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: 3rem 0;
  }
</style>
