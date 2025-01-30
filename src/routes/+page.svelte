<!-- Content -->
<div
  class="flex flex-col items-center justify-center min-h-screen text-center px-4"
>
  <h1 class="animated-text text-5xl md:text-6xl font-bold text-gray-800 mb-4">
    <span class="greeting block">Hi there, I'm Yao!</span>
    <span class="name block mt-2"
      >Welcome to my <span class="name-highlight">page</span></span
    >
  </h1>

  <p class="subtitle text-lg md:text-xl text-gray-600 mt-6">
    I enjoy programming and solving hard problems.<br />
    In my down time I enjoy training martial arts, playing guitar and taking photos!
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
  .animated-text {
    animation: float 3s ease-in-out infinite;
  }

  .name-highlight {
    background: linear-gradient(90deg, #4fd1c5, #81e6d9);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
