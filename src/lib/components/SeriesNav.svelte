<script>
  import { onMount } from "svelte";
  
  let { series, currentChapter, allPosts } = $props();

  // Filter posts in the same series and sort by chapter number
  const seriesPosts = $derived(
    allPosts
      .filter((post) => post.metadata.series === series)
      .sort((a, b) => a.metadata.chapter - b.metadata.chapter)
  );

  // Find previous and next chapters
  const currentIndex = $derived(
    seriesPosts.findIndex((post) => post.metadata.chapter === currentChapter)
  );
  const prevChapter = $derived(currentIndex > 0 ? seriesPosts[currentIndex - 1] : null);
  const nextChapter = $derived(
    currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null
  );
  
  let navElement = $state();
  
  onMount(() => {
    if (navElement) {
      const items = navElement.querySelectorAll('.chapter-item');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('revealed');
              }, i * 50);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      items.forEach(item => observer.observe(item));
      
      return () => observer.disconnect();
    }
  });
</script>

<div class="series-nav" bind:this={navElement}>
  <!-- Series Info -->
  <div class="series-header">
    <div class="series-badge">Series</div>
    <h3 class="series-title">{series}</h3>
    <p class="series-progress">
      Chapter {currentChapter + 1} of {seriesPosts.length}
    </p>
    
    <!-- Progress Bar -->
    <div class="progress-bar-container">
      <div 
        class="progress-bar" 
        style="width: {((currentChapter + 1) / seriesPosts.length) * 100}%"
      ></div>
    </div>
  </div>

  <!-- All Chapters List -->
  <div class="chapters-list">
    {#each seriesPosts as post}
      <a
        href={`/blogs/${post.slug}`}
        class="chapter-item {post.metadata.chapter === currentChapter ? 'active' : ''}"
      >
        <span class="chapter-number">Chapter {post.metadata.chapter}</span>
        <span class="chapter-title">{post.metadata.title.split(':')[1] || post.metadata.title}</span>
        {#if post.metadata.chapter === currentChapter}
          <svg class="current-indicator" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
          </svg>
        {/if}
      </a>
    {/each}
  </div>

  <!-- Navigation Buttons -->
  <div class="nav-buttons">
    {#if prevChapter}
      <a href={`/blogs/${prevChapter.slug}`} class="nav-btn prev">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <div>
          <div class="nav-label">Previous</div>
          <div class="nav-title">Chapter {prevChapter.metadata.chapter}</div>
        </div>
      </a>
    {:else}
      <div></div>
    {/if}

    {#if nextChapter}
      <a href={`/blogs/${nextChapter.slug}`} class="nav-btn next">
        <div>
          <div class="nav-label">Next</div>
          <div class="nav-title">Chapter {nextChapter.metadata.chapter}</div>
        </div>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </a>
    {/if}
  </div>
</div>

<style>
  .series-nav {
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    margin: 3rem 0;
    animation: slide-up-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slide-up-fade {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .series-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-border);
  }

  .series-badge {
    display: inline-block;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-sm);
    margin-bottom: 0.75rem;
    animation: badge-glow 3s ease-in-out infinite;
  }

  @keyframes badge-glow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0);
    }
  }

  .series-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
  }

  .series-progress {
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
    margin-bottom: 1rem;
  }

  .progress-bar-container {
    width: 100%;
    height: 4px;
    background-color: var(--color-bg-tertiary);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--color-primary), var(--color-primary-hover));
    border-radius: 2px;
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    animation: progress-shimmer 2s infinite;
    background-size: 200% 100%;
  }

  @keyframes progress-shimmer {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  .chapters-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .chapter-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 0;
    transform: translateX(-20px);
  }

  .chapter-item.revealed {
    opacity: 1;
    transform: translateX(0);
  }

  .chapter-item:hover {
    border-color: var(--color-border-hover);
    background-color: var(--color-bg-secondary);
    transform: translateX(4px);
  }

  .chapter-item.active {
    border-color: var(--color-primary);
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.05), transparent);
    box-shadow: 0 0 0 1px var(--color-primary);
  }

  .chapter-number {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-tertiary);
    font-family: var(--font-mono);
    white-space: nowrap;
  }

  .chapter-item.active .chapter-number {
    color: var(--color-primary);
  }

  .chapter-title {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    flex: 1;
  }

  .chapter-item.active .chapter-title {
    color: var(--color-text-primary);
    font-weight: 500;
  }

  .current-indicator {
    width: 1rem;
    height: 1rem;
    color: var(--color-primary);
    animation: check-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes check-pop {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  .nav-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
  }

  .nav-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .nav-btn:hover {
    border-color: var(--color-primary);
    background-color: var(--color-bg-secondary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }

  .nav-btn.next {
    justify-content: flex-end;
    text-align: right;
  }

  .nav-btn.prev:hover svg {
    transform: translateX(-4px);
  }

  .nav-btn.next:hover svg {
    transform: translateX(4px);
  }

  .nav-btn svg {
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .nav-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--color-text-tertiary);
    letter-spacing: 0.05em;
  }

  .nav-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-primary);
  }

  .w-4 {
    width: 1rem;
  }

  .h-4 {
    height: 1rem;
  }

  svg {
    flex-shrink: 0;
    color: var(--color-text-tertiary);
  }

  .nav-btn:hover svg {
    color: var(--color-primary);
  }

  @media (max-width: 640px) {
    .nav-buttons {
      grid-template-columns: 1fr;
    }

    .nav-btn.next {
      justify-content: flex-start;
      text-align: left;
    }
  }
</style>
