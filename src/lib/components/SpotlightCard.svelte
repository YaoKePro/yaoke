<script>
  let { 
    children, 
    class: className = '', 
    as = 'div',
    ...rest
  } = $props();
  
  let cardElement = $state();
  
  function handleMouseMove(e) {
    if (!cardElement) return;
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardElement.style.setProperty('--mouse-x', `${x}px`);
    cardElement.style.setProperty('--mouse-y', `${y}px`);
  }
  
  function handleMouseLeave() {
    if (!cardElement) return;
    cardElement.style.setProperty('--mouse-x', '50%');
    cardElement.style.setProperty('--mouse-y', '50%');
  }
</script>

{#if as === 'a'}
  <a
    bind:this={cardElement}
    class="spotlight-card {className}"
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    {...rest}
  >
    {@render children?.()}
  </a>
{:else}
  <div
    bind:this={cardElement}
    class="spotlight-card {className}"
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    {...rest}
  >
    {@render children?.()}
  </div>
{/if}

<style>
  .spotlight-card {
    position: relative;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), 
                box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .spotlight-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(59, 130, 246, 0.05),
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 0;
  }
  
  .spotlight-card:hover::before {
    opacity: 1;
  }
  
  .spotlight-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: radial-gradient(
      250px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(59, 130, 246, 0.3),
      transparent 45%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
  }
  
  .spotlight-card:hover::after {
    opacity: 1;
  }
  
  .spotlight-card:hover {
    transform: translateY(-1px);
  }
  
  /* Content should be above the spotlight effect */
  .spotlight-card > :global(*) {
    position: relative;
    z-index: 2;
  }
</style>
