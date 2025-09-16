<script>
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
  let { children } = $props();
</script>

<div class="bg-primary min-h-screen font-sans flex flex-col">
  <!-- Navigation -->
  <nav class="fixed top-0 w-full bg-primary/95 backdrop-blur-sm border-b border-border z-50">
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo/Brand -->
        <a href="/" class="font-serif text-xl font-semibold text-primary hover:text-primary-hover transition-colors">
          Yao Ke
        </a>

        <!-- Navigation Links -->
        <div class="flex items-center space-x-8">
          <a href="/" class="nav-link">Home</a>
          <a href="/blogs" class="nav-link">Blog</a>
          <a href="/projects" class="nav-link">Projects</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main content area -->
  <main class="flex-1 pt-20">
    {@render children()}
  </main>

  <!-- Footer -->
  <Footer />
</div>

<style>
  .nav-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
    transition: var(--transition-fast);
    padding: 0.5rem 0;
    position: relative;
  }

  .nav-link:hover {
    color: var(--color-text-primary);
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-primary);
    transition: var(--transition-base);
  }

  .nav-link:hover::after {
    width: 100%;
  }
</style>
