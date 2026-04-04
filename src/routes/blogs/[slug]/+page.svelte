<script>
  import { onMount } from "svelte";
  import SeriesNav from "$lib/components/SeriesNav.svelte";
  import ScrollReveal from "$lib/components/ScrollReveal.svelte";

  let { data } = $props();
  const Post = $derived(data.post.component);
  const metadata = $derived(data.post.metadata);
  const allPosts = $derived(data.allPosts);

  let scrollProgress = $state(0);
  let contentRef = $state();

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

<div class="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-24">
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
    <h1 class="text-4xl md:text-5xl font-bold text-primary mb-6" style="font-family: var(--font-serif); line-height: 1.15;">
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
  <article class="prose-content" bind:this={contentRef}>
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

  /* Classical editorial prose */
  .prose-content {
    font-family: 'Newsreader', Georgia, 'Times New Roman', serif;
    font-size: 1.2rem;
    line-height: 1.9;
    color: var(--color-text-primary);
    hyphens: auto;
    -webkit-hyphens: auto;
  }

  :global(.prose-content h1),
  :global(.prose-content h2),
  :global(.prose-content h3),
  :global(.prose-content h4),
  :global(.prose-content h5),
  :global(.prose-content h6) {
    font-family: var(--font-serif);
    color: var(--color-text-primary);
    font-weight: 700;
    line-height: 1.25;
  }

  :global(.prose-content h2) {
    font-size: 1.85rem;
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.625rem;
    border-bottom: 1px solid var(--color-border);
    letter-spacing: -0.01em;
  }

  :global(.prose-content h3) {
    font-size: 1.4rem;
    margin-top: 2.75rem;
    margin-bottom: 1.125rem;
    letter-spacing: -0.005em;
  }

  :global(.prose-content h4) {
    font-size: 1.2rem;
    margin-top: 2.25rem;
    margin-bottom: 0.875rem;
  }

  :global(.prose-content p) {
    margin-bottom: 1.75rem;
    color: var(--color-text-secondary);
  }

  :global(.prose-content a) {
    color: var(--color-text-primary);
    text-decoration: underline;
    text-decoration-color: var(--color-primary);
    text-underline-offset: 3px;
    text-decoration-thickness: 1.5px;
    transition: var(--transition-fast);
  }

  :global(.prose-content a:hover) {
    color: var(--color-primary);
    text-decoration-thickness: 2px;
  }

  :global(.prose-content code) {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-primary);
    padding: 0.1rem 0.35rem;
    border-radius: 3px;
    font-size: 0.82em;
    font-family: var(--font-mono);
  }

  :global(.prose-content pre) {
    background-color: #1a1a1a;
    color: #d4d4d4;
    padding: 1.25rem 1.5rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 2rem -1rem;
    font-family: var(--font-mono);
    font-size: 0.85em;
    line-height: 1.75;
    border: 1px solid #2a2a2a;
  }

  :global(.prose-content pre code) {
    background: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
  }

  :global(.prose-content blockquote) {
    border-left: 3px solid var(--color-border);
    padding: 0.5rem 0 0.5rem 1.5rem;
    margin: 2rem 0;
    color: var(--color-text-tertiary);
    font-style: italic;
  }

  :global(.prose-content blockquote p:last-child) {
    margin-bottom: 0;
  }

  :global(.prose-content ul),
  :global(.prose-content ol) {
    margin: 1.25rem 0 1.75rem;
    padding-left: 1.5rem;
  }

  :global(.prose-content ul) {
    list-style-type: none;
  }

  :global(.prose-content ul li) {
    position: relative;
    padding-left: 1rem;
  }

  :global(.prose-content ul li::before) {
    content: '';
    position: absolute;
    left: -0.5rem;
    top: 0.7em;
    width: 5px;
    height: 5px;
    background-color: var(--color-text-tertiary);
    border-radius: 50%;
  }

  :global(.prose-content ol) {
    list-style-type: none;
    counter-reset: prose-ol;
  }

  :global(.prose-content ol li) {
    counter-increment: prose-ol;
    position: relative;
    padding-left: 0.5rem;
  }

  :global(.prose-content ol li::before) {
    content: counter(prose-ol) '.';
    position: absolute;
    left: -1.5rem;
    color: var(--color-text-primary);
    font-weight: 600;
    font-family: var(--font-serif);
  }

  :global(.prose-content li) {
    margin-bottom: 0.5rem;
    color: var(--color-text-secondary);
  }

  :global(.prose-content li > ul),
  :global(.prose-content li > ol) {
    margin: 0.5rem 0 0.25rem;
  }

  :global(.prose-content table) {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.9em;
    font-family: var(--font-sans);
    display: block;
    overflow-x: auto;
  }

  :global(.prose-content thead) {
    border-bottom: 2px solid var(--color-text-primary);
  }

  :global(.prose-content th) {
    text-align: left;
    padding: 0.75rem 1rem 0.625rem;
    font-weight: 600;
    color: var(--color-text-primary);
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap;
  }

  :global(.prose-content td) {
    padding: 0.75rem 1rem;
    color: var(--color-text-secondary);
    border-bottom: 1px solid var(--color-border);
    vertical-align: top;
    line-height: 1.5;
  }

  :global(.prose-content hr) {
    border: none;
    text-align: center;
    margin: 3rem 0;
    height: auto;
    color: var(--color-border);
    overflow: visible;
    line-height: 0;
  }

  :global(.prose-content hr::after) {
    content: '§';
    font-size: 1.25rem;
    color: var(--color-border);
    background: var(--color-bg-primary);
    padding: 0 1rem;
    position: relative;
    top: -0.5rem;
  }

  :global(.prose-content strong) {
    color: var(--color-text-primary);
    font-weight: 600;
  }

  :global(.prose-content img) {
    max-width: 100%;
    border-radius: 4px;
    margin: 2rem 0;
  }
</style>
