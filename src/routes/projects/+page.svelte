<script>
  import ScrollReveal from "$lib/components/ScrollReveal.svelte";
  import TextReveal from "$lib/components/TextReveal.svelte";
  import FloatingElement from "$lib/components/FloatingElement.svelte";

  const projects = [
    {
      title: "Hoist",
      link: "https://github.com/yail259/Hoist",
      timeframe: "2026",
      description:
        "A DSL inspired by the Recursive Language Model paper. Guarantees termination, limits execution scope, and allows expressive exploration of large string prompts — the right level of abstraction for AI agent tool use.",
      stack: ["Programming Languages", "DSL", "AI Agents"],
    },
    {
      title: "Overnight",
      link: "https://github.com/yail259/overnight",
      timeframe: "2026",
      description:
        "A Claude Code harness for running CC overnight fully autonomously and securely. A self-repairing, fully autonomous harness that reduces human involvement from once every 10 minutes to once every 10 hours.",
      stack: ["Claude Code", "Automation", "AI Agents"],
    },
    {
      title: "Playertwo",
      link: "https://github.com/yail259/martini",
      timeframe: "2025",
      description:
        "A simple, declarative library for easily building multiplayer games with peer connection support. Build games like Agar.io, Fireboy & Watergirl, or Among Us without writing a single line of sync or networking code.",
      stack: ["Multiplayer", "Peer-to-Peer", "Game Dev", "OSS"],
    },
    {
      title: "Markdown UI",
      link: "https://markdown-ui.yaoke.pro",
      timeframe: "2025 - Ongoing",
      description:
        "A micro-spec for embedding interactive UI widgets in Markdown for LLMs.",
      stack: ["Svelte", "React", "Marked", "Spec", "OSS"],
    },
    {
      title: "Pterodactyl",
      link: "https://github.com/yail259/pterodactyl",
      timeframe: "2025",
      description:
        "A CLI-based alternative (think shadcn) to Docusaurus for Svelte. A documentation framework for SvelteKit that gets out of your way.",
      stack: ["SvelteKit", "CLI", "Documentation", "OSS"],
    },
    {
      title: "Prompt Injector",
      link: "https://github.com/BlueprintLabIO/prompt-injector",
      timeframe: "2025 - Active",
      description:
        "Minimal TypeScript library for generating multi-turn prompt injection attack conversations to test AI system security vulnerabilities.",
      stack: ["TypeScript", "Svelte", "Security Testing", "AI Safety"],
    },
    {
      title: "rlint",
      link: "https://github.com/yail259/renderlint",
      timeframe: "2026",
      description:
        "A visual CSS bug checker for websites. Features a CLI mode for inspecting individual pages and a proxy mode that flags overflow, overlapping, and other CSS issues as you navigate your site.",
      stack: ["CSS", "Visual Testing", "CLI", "Proxy"],
    },
    {
      title: "Tipos",
      link: "#",
      timeframe: "2026",
      description:
        "An online, 3D, MMO, Pokemon-esque game built with Rust and Bevy. Leverages the Rust compiler and Clippy for automatic verification instead of manual QA testing.",
      stack: ["Rust", "Bevy", "3D", "Multiplayer", "Game Dev"],
    },
    {
      title: "Theory of Mind AI",
      link: "https://github.com/BlueprintLabIO/theory-of-mind-ai",
      timeframe: "2025 - Active",
      description:
        "TypeScript library for building AI agents with dynamic theory of mind capabilities, featuring real-time understanding of human mental states during conversations.",
      stack: ["TypeScript", "SvelteKit", "OpenAI GPT-5", "Tailwind CSS"],
    },
    {
      title: "AI Impersonator",
      link: "https://ai-impersonator.blueprintlab.io/",
      timeframe: "2025 - Active",
      description:
        "Platform featuring detailed AI role-play prompts for famous programmers like Linus Torvalds, Chris Lattner, and Guido van Rossum, capturing their technical expertise and communication styles.",
      stack: ["SvelteKit", "AI Prompts", "Character Design", "LLM"],
    },
    {
      title: "Design Analyser",
      link: "https://design-analyser.blueprintlab.io/",
      timeframe: "2025 - Active",
      description:
        "Web tool that extracts and analyzes design systems from websites, providing implementation-ready design briefs with colors, typography, spacing, and layout systems.",
      stack: ["SvelteKit", "Design Systems", "Web Scraping", "UI/UX"],
    },
    {
      title: "LunarLink",
      link: "https://lunarlinkai.com",
      timeframe: "2024 - Ongoing",
      description:
        "Web client for comparing AI model responses from OpenAI, Google, and Anthropic. Built with SvelteKit, Go, and PostgreSQL.",
      stack: ["SvelteKit", "Go", "PostgreSQL", "LLM Orchestration"],
    },
    {
      title: "Time AI",
      link: "https://github.com/BlueprintLabIO/time-ai",
      timeframe: "2025 - Active",
      description:
        "Time-aware utilities for LLM applications. Parse natural language dates, add temporal context to prompts, and handle timezone-aware date operations.",
      stack: ["TypeScript", "Chrono-node", "LLM Integration"],
    },
    {
      title: "Thymelake QR Code Ordering",
      link: "https://app.thymelake.com/shop/S0VPARWD9H4RV/customer",
      timeframe: "2023 - Ongoing",
      description:
        "QR code ordering system for Ambi's Chai with full Square integration using SvelteKit and Firebase. Sends SMS notifications when orders are ready.",
      stack: ["SvelteKit", "Firebase", "Square API", "Twilio"],
    },
  ];
</script>

<div class="max-w-6xl mx-auto px-6 py-16">
  <!-- Header -->
  <div class="text-center mb-16">
    <FloatingElement amplitude={2} duration={8}>
      <TextReveal
        text="Projects"
        as="h1"
        class="font-serif text-4xl md:text-5xl font-bold text-primary mb-4"
        staggerDelay={0.04}
      />
    </FloatingElement>
    <ScrollReveal delay={0.3}>
      <p class="text-lg text-secondary max-w-2xl mx-auto">
        A collection of things I've built, experiments I've run, and problems
        I've tried to solve.
      </p>
    </ScrollReveal>
  </div>

  <!-- Projects Grid -->
  <div class="grid gap-8">
    {#each projects as project, i}
      <ScrollReveal delay={0.08 * i} direction="up">
        <a href={project.link} target="_blank" rel="noopener noreferrer" class="project-card group block">
          <div class="flex flex-col md:flex-row md:items-start gap-6">
            <!-- Project Info -->
            <div class="flex-1">
              <div class="flex items-start justify-between mb-3">
                <h2
                  class="text-2xl font-semibold text-primary group-hover:text-primary-hover transition-colors"
                >
                  {project.title}
                </h2>
                <span
                  class="text-sm text-tertiary bg-tertiary px-3 py-1 rounded-full whitespace-nowrap"
                >
                  {project.timeframe}
                </span>
              </div>

              <p class="text-secondary mb-6 leading-relaxed">
                {project.description}
              </p>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-4">
                {#each project.stack as tech}
                  <span class="tag">{tech}</span>
                {/each}
              </div>

              <!-- Link -->
              <span
                class="inline-flex items-center text-primary text-sm font-medium kinetic-underline"
              >
                View Project
                <svg
                  class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </div>
          </div>
        </a>
      </ScrollReveal>
    {/each}
  </div>

  <!-- More Projects Coming -->
  <ScrollReveal delay={0.5}>
    <div class="text-center mt-16 pt-16 border-t border-border">
      <p class="text-tertiary text-sm">More projects in development...</p>
    </div>
  </ScrollReveal>
</div>

<style>
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

  .kinetic-underline {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
</style>
