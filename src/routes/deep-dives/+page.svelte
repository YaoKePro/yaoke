<script>
  import SpotlightCard from "$lib/components/SpotlightCard.svelte";
  import ScrollReveal from "$lib/components/ScrollReveal.svelte";
  import TextReveal from "$lib/components/TextReveal.svelte";
  import FloatingElement from "$lib/components/FloatingElement.svelte";

  let { data } = $props();
  const series = data.series;
</script>

<div class="max-w-6xl mx-auto px-6 py-16">
  <!-- Header -->
  <div class="text-center mb-16">
    <FloatingElement amplitude={1.5} duration={8}>
      <TextReveal
        text="Deep Dives"
        as="h1"
        class="font-serif text-4xl md:text-5xl font-bold text-primary mb-4"
        staggerDelay={0.035}
      />
    </FloatingElement>
    <ScrollReveal delay={0.4}>
      <p class="text-lg text-secondary max-w-2xl mx-auto">
        In-depth, multi-chapter explorations of complex topics.
      </p>
    </ScrollReveal>
  </div>

  <!-- Series Cards -->
  <div class="grid gap-8">
    {#each series as s, i}
      <ScrollReveal delay={0.08 * i} direction="up">
        <SpotlightCard class="series-card group">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Book Icon/Visual -->
            <div class="book-icon-container">
              <FloatingElement amplitude={2} duration={5} delay={i * 0.15}>
                <svg
                  class="book-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </FloatingElement>
              <div class="chapter-badge">
                {s.chapterCount}
                {s.chapterCount === 1 ? "Chapter" : "Chapters"}
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1">
              <div class="mb-6">
                <h2
                  class="text-3xl font-serif font-bold text-primary mb-3 group-hover:text-primary-hover transition-colors"
                >
                  {s.name}
                </h2>
                <p class="text-secondary leading-relaxed">
                  {s.description}
                </p>
              </div>

              <!-- Chapter List -->
              <div class="chapters-preview mb-6">
                <h3
                  class="text-sm font-semibold text-tertiary uppercase tracking-wide mb-3"
                >
                  Chapters
                </h3>
                <div class="space-y-2">
                  {#each s.chapters as chapter}
                    <a
                      href={`/blogs/${chapter.slug}`}
                      class="chapter-link group/chapter"
                    >
                      <span class="chapter-number"
                        >Chapter {chapter.metadata.chapter}</span
                      >
                      <span class="chapter-title">
                        {chapter.metadata.title.split(":")[1]?.trim() ||
                          chapter.metadata.title}
                      </span>
                      <svg
                        class="w-4 h-4 ml-auto opacity-0 group-hover/chapter:opacity-100 transition-all transform group-hover/chapter:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  {/each}
                </div>
              </div>

              <!-- Start Reading Button -->
              <a href={`/blogs/${s.firstChapterSlug}`} class="btn-start-reading">
                <span>Start Reading</span>
                <svg
                  class="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </div>
        </SpotlightCard>
      </ScrollReveal>
    {/each}
  </div>

  <!-- Empty State -->
  {#if series.length === 0}
    <ScrollReveal>
      <div class="text-center py-16">
        <p class="text-tertiary">
          No deep dives available yet. Check back soon!
        </p>
      </div>
    </ScrollReveal>
  {/if}

  <!-- More Coming -->
  <ScrollReveal delay={0.5}>
    <div class="text-center mt-16 pt-16 border-t border-border">
      <p class="text-tertiary text-sm">More deep dives in development...</p>
    </div>
  </ScrollReveal>
</div>

<style>
  .book-icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    min-width: 140px;
  }

  .book-icon {
    width: 80px;
    height: 80px;
    color: var(--color-primary);
    stroke-width: 1.5;
  }

  .chapter-badge {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-tertiary);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  .chapters-preview {
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 1.25rem;
  }

  .chapter-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.875rem;
    background-color: var(--color-bg-primary);
    border-radius: var(--radius-sm);
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
    border: 1px solid transparent;
  }

  .chapter-link:hover {
    border-color: var(--color-border);
    background-color: var(--color-bg-secondary);
    transform: translateX(2px);
  }

  .chapter-number {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-primary);
    font-family: var(--font-mono);
    white-space: nowrap;
  }

  .chapter-title {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    flex: 1;
  }

  .chapter-link:hover .chapter-title {
    color: var(--color-text-primary);
  }

  .btn-start-reading {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--color-primary);
    color: white;
    padding: 0.875rem 1.75rem;
    border-radius: var(--radius-md);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9375rem;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    border: none;
  }

  .btn-start-reading:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px -4px rgba(59, 130, 246, 0.25);
  }

  .w-4 {
    width: 1rem;
  }

  .h-4 {
    height: 1rem;
  }

  .w-5 {
    width: 1.25rem;
  }

  .h-5 {
    height: 1.25rem;
  }

  @media (max-width: 1024px) {
    .book-icon-container {
      flex-direction: row;
      justify-content: center;
      min-width: auto;
      width: 100%;
    }

    .book-icon {
      width: 60px;
      height: 60px;
    }
  }
</style>
