<script>
  let { 
    children, 
    class: className = '',
    strength = 0.3,
    as = 'button',
    ...rest
  } = $props();
  
  let buttonElement = $state();
  let boundingRef = $state();
  
  function handleMouseMove(e) {
    if (!buttonElement || !boundingRef) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = boundingRef;
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    buttonElement.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }
  
  function handleMouseEnter(e) {
    if (!buttonElement) return;
    boundingRef = buttonElement.getBoundingClientRect();
  }
  
  function handleMouseLeave() {
    if (!buttonElement) return;
    buttonElement.style.transform = 'translate(0, 0)';
  }
</script>

{#if as === 'a'}
  <a
    bind:this={buttonElement}
    class="magnetic-button {className}"
    onmouseenter={handleMouseEnter}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    {...rest}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={buttonElement}
    class="magnetic-button {className}"
    onmouseenter={handleMouseEnter}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    {...rest}
  >
    {@render children?.()}
  </button>
{/if}

<style>
  .magnetic-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
    will-change: transform;
  }
</style>
