<script>
  import { onMount } from "svelte";

  let { data } = $props();
  const { component: Post, metadata } = data.post;

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

<div
  class="fixed top-0 left-0 h-1 bg-blue-500 z-50 transition-all"
  style="width: {scrollProgress}%"
></div>

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
