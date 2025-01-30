<script>
  let { data } = $props();
  const { component: Post, metadata } = data.post;
</script>

<div class="max-w-3xl mx-auto px-4 py-28">
  <!-- Article Header -->
  <header class="mb-12 animate-fade-in">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
      {metadata.title}
      <div
        class="w-32 h-1 bg-gradient-to-r from-blue-400 to-green-400 mt-4 rounded-full"
      ></div>
    </h1>

    <div class="flex items-center space-x-3 text-gray-500">
      <svg
        class="w-5 h-5"
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
      <time class="text-sm">{new Date(metadata.date).toLocaleDateString()}</time
      >
    </div>
  </header>

  <!-- MDSvex Content -->
  <article class="prose prose-lg max-w-none">
    <Post />

    <!-- Custom MDsvex Styling -->
    <!-- <style global>
      :global(.prose) {
        --tw-prose-body: #374151;
        --tw-prose-headings: #1f2937;
        --tw-prose-links: #3b82f6;
        --tw-prose-code: #1f2937;
      }

      :global(.prose a) {
        @apply gradient-underline transition-all duration-300;
      }

      :global(.prose pre) {
        @apply bg-gray-800 text-gray-100 rounded-xl p-6 my-6 shadow-lg;
      }

      :global(.prose code:not(pre code)) {
        @apply px-2 py-1 bg-blue-50 text-blue-600 rounded-md before:content-[''] after:content-[''];
      }

      :global(.prose img) {
        @apply rounded-xl shadow-md my-8;
      }

      :global(.prose blockquote) {
        @apply border-l-4 border-green-400 bg-green-50 rounded-r-lg italic;
      }
    </style> -->
  </article>
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

  .gradient-underline {
    background-image: linear-gradient(90deg, #4fd1c5, #81e6d9);
    background-size: 0% 2px;
    background-position: left bottom;
    background-repeat: no-repeat;
    transition: background-size 0.3s ease;
  }

  :global(.prose a:hover) {
    background-size: 100% 2px;
  }
</style>
