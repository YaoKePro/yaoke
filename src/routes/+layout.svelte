<script>
  import "../app.css";
  let { children } = $props();
</script>

<div class="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen font-sans">
  <!-- Navigation -->
  <nav class="glass-nav fixed top-0 w-full flex justify-center space-x-8 py-4">
    <a href="/" class="nav-link text-gray-700 hover:text-blue-500">Home</a>
    <a href="/blogs" class="nav-link text-gray-700 hover:text-green-500"
      >Blogs</a
    >
    <a href="/projects" class="nav-link text-gray-700 hover:text-teal-500"
      >Projects</a
    >
  </nav>

  {@render children()}
</div>

<style>
  .glass-nav {
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.1);
  }
  .nav-link {
    transition: all 0.3s ease;
  }
  .nav-link:hover {
    transform: translateY(-2px);
    color: #4fd1c5;
  }
</style>
