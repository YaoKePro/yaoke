<!-- Content -->
<div
  class="flex flex-col items-center justify-center min-h-screen text-center px-4"
>
  <h1 class="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
    <span class="greeting block"
      >Hello there, I'm <span class="name-highlight">Yao</span></span
    >
    <span class="name block mt-2"></span>
  </h1>

  <p class="subtitle text-lg md:text-xl text-gray-600 mt-6">
    This is where you can read my thoughts on life, programming, startups and
    more. <br />
    I enjoy composing creative solutions and suck at CSS. All the CSS here is AI
    generated!
  </p>
</div>

<style>
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .name-highlight {
    background: linear-gradient(90deg, #4fd1c5, #81e6d9);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
