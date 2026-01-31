<script>
  let { 
    children, 
    class: className = '',
    amplitude = 10,
    duration = 4,
    delay = 0,
    rotate = false
  } = $props();
</script>

<div 
  class="floating-element {className}"
  style="
    --float-amplitude: {amplitude}px;
    --float-duration: {duration}s;
    --float-delay: {delay}s;
    --float-rotate: {rotate ? '2deg' : '0deg'};
  "
>
  {@render children?.()}
</div>

<style>
  .floating-element {
    animation: float var(--float-duration, 4s) ease-in-out var(--float-delay, 0s) infinite;
    will-change: transform;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    33% {
      transform: translateY(calc(var(--float-amplitude, 10px) * -0.5));
    }
    66% {
      transform: translateY(calc(var(--float-amplitude, 10px) * -1));
    }
  }
</style>
