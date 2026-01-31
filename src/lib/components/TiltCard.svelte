<script>
  let { 
    children, 
    class: className = '',
    maxTilt = 10,
    scale = 1.02,
    glare = true,
    as = 'div',
    ...rest
  } = $props();
  
  let cardElement = $state();
  let glareElement = $state();
  
  function handleMouseMove(e) {
    if (!cardElement) return;
    
    const rect = cardElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
    
    cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    
    if (glare && glareElement) {
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;
      glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 50%)`;
      glareElement.style.opacity = '1';
    }
  }
  
  function handleMouseLeave() {
    if (!cardElement) return;
    cardElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    if (glareElement) {
      glareElement.style.opacity = '0';
    }
  }
  
  function handleMouseEnter() {
    if (!cardElement) return;
    cardElement.style.transition = 'none';
  }
</script>

{#if as === 'a'}
  <a
    bind:this={cardElement}
    class="tilt-card {className}"
    onmouseenter={handleMouseEnter}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    style="transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);"
    {...rest}
  >
    {#if glare}
      <div bind:this={glareElement} class="tilt-glare"></div>
    {/if}
    <div class="tilt-content">
      {@render children?.()}
    </div>
  </a>
{:else}
  <div
    bind:this={cardElement}
    class="tilt-card {className}"
    onmouseenter={handleMouseEnter}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    style="transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);"
    {...rest}
  >
    {#if glare}
      <div bind:this={glareElement} class="tilt-glare"></div>
    {/if}
    <div class="tilt-content">
      {@render children?.()}
    </div>
  </div>
{/if}

<style>
  .tilt-card {
    position: relative;
    transform-style: preserve-3d;
    will-change: transform;
  }
  
  .tilt-glare {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  .tilt-content {
    position: relative;
    z-index: 2;
    transform: translateZ(20px);
  }
</style>
