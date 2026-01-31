<script>
  let { 
    text, 
    class: className = '',
    delay = 0,
    staggerDelay = 0.03,
    as = 'span',
    once = true
  } = $props();
  
  let containerElement = $state();
  let isVisible = $state(false);
  let hasAnimated = $state(false);
  
  // Split text into characters
  let characters = $derived(text.split(''));
  
  $effect(() => {
    if (!containerElement || (once && hasAnimated)) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            hasAnimated = true;
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            isVisible = false;
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    observer.observe(containerElement);
    
    return () => observer.disconnect();
  });
</script>

{#if as === 'h1'}
  <h1 bind:this={containerElement} class="text-reveal-container {className}">
    {#each characters as char, i}
      <span 
        class="text-reveal-char"
        class:visible={isVisible}
        style="transition-delay: {delay + i * staggerDelay}s"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    {/each}
  </h1>
{:else if as === 'h2'}
  <h2 bind:this={containerElement} class="text-reveal-container {className}">
    {#each characters as char, i}
      <span 
        class="text-reveal-char"
        class:visible={isVisible}
        style="transition-delay: {delay + i * staggerDelay}s"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    {/each}
  </h2>
{:else if as === 'h3'}
  <h3 bind:this={containerElement} class="text-reveal-container {className}">
    {#each characters as char, i}
      <span 
        class="text-reveal-char"
        class:visible={isVisible}
        style="transition-delay: {delay + i * staggerDelay}s"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    {/each}
  </h3>
{:else if as === 'p'}
  <p bind:this={containerElement} class="text-reveal-container {className}">
    {#each characters as char, i}
      <span 
        class="text-reveal-char"
        class:visible={isVisible}
        style="transition-delay: {delay + i * staggerDelay}s"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    {/each}
  </p>
{:else}
  <span bind:this={containerElement} class="text-reveal-container {className}">
    {#each characters as char, i}
      <span 
        class="text-reveal-char"
        class:visible={isVisible}
        style="transition-delay: {delay + i * staggerDelay}s"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    {/each}
  </span>
{/if}

<style>
  .text-reveal-container {
    display: inline-block;
  }
  
  .text-reveal-char {
    display: inline-block;
    opacity: 0;
    transform: translateY(30px);
    filter: blur(4px);
    transition: 
      opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      filter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .text-reveal-char.visible {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
</style>
