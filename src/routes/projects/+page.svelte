<script>
  const projects = [
    {
      title: "Thymelake QR Code Ordering",
      link: "https://app.thymelake.com/shop/S0VPARWD9H4RV/customer",
      timeframe: "2023 - Ongoing",
      description:
        "QR code ordering system for Ambi's Chai with full Square integration using SvelteKit and Firebase. Sends SMS notifications when orders are ready.",
      stack: ["SvelteKit", "Firebase", "Square API", "Twilio"],
    },
    {
      title: "LunarLink",
      link: "https://lunarlinkai.com",
      timeframe: "2024 - Ongoing",
      description:
        "Web client for comparing AI model responses from OpenAI, Google, and Anthropic. Built with SvelteKit, Go, and PostgreSQL.",
      stack: ["SvelteKit", "Go", "PostgreSQL", "LLM Orchestration"],
    },
  ];
</script>

<div class="max-w-6xl mx-auto px-4 py-28">
  <h1
    class="text-5xl font-bold text-gray-800 mb-12 text-center animate-fade-in"
  >
    Projects
    <div
      class="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4 rounded-full"
    ></div>
  </h1>

  <div class="grid md:grid-cols-2 gap-8">
    {#each projects as project}
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <div
          class="group relative bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-md hover:shadow-lg
                 transition-all duration-300 hover:-translate-y-1 border border-white/20"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30 rounded-xl
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          ></div>

          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            {project.title}
            <span
              class="bg-gradient-to-r from-blue-400 to-green-400 bg-[length:0%_2px] bg-left-bottom
                      bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]"
            >
            </span>
          </h2>

          <div class="flex items-center text-sm text-blue-500 space-x-2 mb-4">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="text-gray-500">{project.timeframe}</span>
          </div>

          <p class="text-gray-600 mb-6">{project.description}</p>

          <div class="flex flex-wrap gap-2">
            {#each project.stack as tech}
              <span
                class="px-3 py-1 bg-blue-100/50 text-blue-600 rounded-full text-sm"
              >
                {tech}
              </span>
            {/each}
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }

  /* Gradient underline animation */
  .bg-gradient-to-r.from-blue-400.to-green-400 {
    transition: background-size 0.3s ease;
  }
</style>
