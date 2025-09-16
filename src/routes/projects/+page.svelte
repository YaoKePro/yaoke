<script>
  const projects = [
    {
      title: "Markdown UI",
      link: "https://markdown-ui.yaoke.pro",
      timeframe: "2025 - Ongoing",
      description:
        "A micro-spec for embedding interactive UI widgets in Markdown for LLMs.",
      stack: ["Svelte", "React", "Marked", "Spec", "OSS"],
    },
    {
      title: "Thymelake QR Code Ordering",
      link: "https://app.thymelake.com/shop/S0VPARWD9H4RV/customer",
      timeframe: "2023 - Ongoing",
      description:
        "QR code ordering system for Ambi's Chai with full Square integration using SvelteKit and Firebase. Sends SMS notifications when orders are ready.",
      stack: ["SvelteKit", "Firebase", "Square API", "Twilio"],
    },
    // {
    //   title: "LunarLink",
    //   link: "https://lunarlinkai.com",
    //   timeframe: "2024 - Ongoing",
    //   description:
    //     "Web client for comparing AI model responses from OpenAI, Google, and Anthropic. Built with SvelteKit, Go, and PostgreSQL.",
    //   stack: ["SvelteKit", "Go", "PostgreSQL", "LLM Orchestration"],
    // },
  ];
</script>

<div class="max-w-6xl mx-auto px-6 py-16">
  <!-- Header -->
  <div class="text-center mb-16">
    <h1 class="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
      Projects
    </h1>
    <p class="text-lg text-secondary max-w-2xl mx-auto">
      A collection of things I've built, experiments I've run, and problems I've tried to solve.
    </p>
  </div>

  <!-- Projects Grid -->
  <div class="grid gap-8">
    {#each projects as project}
      <div class="project-card group">
        <div class="flex flex-col md:flex-row md:items-start gap-6">
          <!-- Project Info -->
          <div class="flex-1">
            <div class="flex items-start justify-between mb-3">
              <h2 class="text-2xl font-semibold text-primary group-hover:text-primary-hover transition-colors">
                {project.title}
              </h2>
              <span class="text-sm text-tertiary bg-tertiary px-3 py-1 rounded-full whitespace-nowrap">
                {project.timeframe}
              </span>
            </div>

            <p class="text-secondary mb-6 leading-relaxed">
              {project.description}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.stack as tech}
                <span class="tag">
                  {tech}
                </span>
              {/each}
            </div>

            <!-- Link -->
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-primary hover:text-primary-hover text-sm font-medium transition-colors"
            >
              View Project
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- More Projects Coming -->
  <div class="text-center mt-16 pt-16 border-t border-border">
    <p class="text-tertiary text-sm">More projects in development...</p>
  </div>
</div>

<style>
  .project-card {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    transition: var(--transition-base);
  }

  .project-card:hover {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-md);
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
