<script>
  import "../app.css";
  import "$lib/components/animations.css";
  import Footer from "$lib/components/Footer.svelte";
  import { onMount } from "svelte";
  
  let { children } = $props();
  let navElement = $state();
  let morphLine = $state();
  let activeLink = $state();
  
  onMount(() => {
    if (navElement && morphLine) {
      const links = navElement.querySelectorAll('.nav-link');
      const updateMorphLine = (link) => {
        const rect = link.getBoundingClientRect();
        const navRect = navElement.getBoundingClientRect();
        morphLine.style.width = `${rect.width}px`;
        morphLine.style.left = `${rect.left - navRect.left}px`;
      };
      
      // Find active link
      const currentPath = window.location.pathname;
      links.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath.startsWith('/blogs') && link.getAttribute('href') === '/blogs')) {
          activeLink = link;
        }
      });
      
      if (activeLink) {
        setTimeout(() => updateMorphLine(activeLink), 100);
      }
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => updateMorphLine(link));
      });
      
      navElement.addEventListener('mouseleave', () => {
        if (activeLink) updateMorphLine(activeLink);
      });
    }
  });
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
        <div class="flex items-center space-x-8 nav-container" bind:this={navElement}>
          <a href="/" class="nav-link" class:active={activeLink?.getAttribute('href') === '/'}>Home</a>
          <a href="/blogs" class="nav-link" class:active={activeLink?.getAttribute('href') === '/blogs'}>Blog</a>
          <a href="/deep-dives" class="nav-link" class:active={activeLink?.getAttribute('href') === '/deep-dives'}>Deep Dives</a>
          <a href="/projects" class="nav-link" class:active={activeLink?.getAttribute('href') === '/projects'}>Projects</a>
          <div class="nav-morph-line" bind:this={morphLine}></div>
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
  .nav-container {
    position: relative;
  }

  .nav-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
    transition: color 0.2s ease;
    padding: 0.25rem 0;
    position: relative;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--color-text-primary);
  }

  .nav-morph-line {
    position: absolute;
    bottom: 0;
    height: 2px;
    background: var(--color-primary);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 2px;
    opacity: 0;
    margin-left: 0 !important;
  }

  .nav-container:hover .nav-morph-line {
    opacity: 1;
  }
</style>
