<script>
  let { 
    children, 
    class: className = '',
    delay = 0,
    direction = 'up',
    duration = 0.6,
    once = true
  } = $props();
  
  let element = $state();
  let isVisible = $state(false);
  let hasAnimated = $state(false);
  
  const directionStyles = {
    up: { transform: 'translateY(24px)' },
    down: { transform: 'translateY(-24px)' },
    left: { transform: 'translateX(24px)' },
    right: { transform: 'translateX(-24px)' },
    scale: { transform: 'scale(0.97)' },
    none: { transform: 'none' }
  };
  
  $effect(() => {
    if (!element || (once && hasAnimated)) return;
    
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
    
    observer.observe(element);
    
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={element}
  class="scroll-reveal {className}"
  class:visible={isVisible}
  style="
    --reveal-delay: {delay}s;
    --reveal-duration: {duration}s;
    --initial-transform: {directionStyles[direction].transform};
  "
>
  {@render children?.()}
</div>

<style>
  .scroll-reveal {
    opacity: 0;
    transform: var(--initial-transform, translateY(40px));
    transition: 
      opacity var(--reveal-duration, 0.6s) cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0s),
      transform var(--reveal-duration, 0.6s) cubic-bezier(0.16, 1, 0.3, 1) var(--reveal-delay, 0s);
    will-change: opacity, transform;
  }
  
  .scroll-reveal.visible {
    opacity: 1;
    transform: translate(0) scale(1);
  }
</style>
