<script>
  import SpotlightCard from "$lib/components/SpotlightCard.svelte";
  import TextReveal from "$lib/components/TextReveal.svelte";
  import ScrollReveal from "$lib/components/ScrollReveal.svelte";
  import FloatingElement from "$lib/components/FloatingElement.svelte";


  let { data } = $props();
  const posts = data.posts;
</script>

<!-- Hero Section -->
<section class="max-w-4xl mx-auto px-6 py-32">
  <div class="text-center">
    <FloatingElement amplitude={2} duration={7}>
      <h1 class="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">
        <TextReveal text="Hello, I'm" delay={0.2} staggerDelay={0.025} />
        <span class="text-primary">
          <TextReveal text="Yao Ke" delay={0.7} staggerDelay={0.03} />
        </span>
      </h1>
    </FloatingElement>

    <ScrollReveal delay={0.5} direction="up">
      <p class="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
        Developer, dreamer, and occasional writer. <br />
        I enjoy solving problems with creativity.
      </p>
    </ScrollReveal>

    <ScrollReveal delay={0.7} direction="up">
      <div class="flex items-center justify-center space-x-6 mt-8">
        <a href="/blogs" class="btn-primary magnetic-hover">
          Read Blog
        </a>
        <a href="/projects" class="btn-secondary magnetic-hover">
          View Projects
        </a>
      </div>
    </ScrollReveal>
  </div>
</section>

<!-- Recent Blogs -->
<section class="max-w-6xl mx-auto px-6 py-16 border-t border-border">
  <ScrollReveal direction="left">
    <h2 class="text-2xl font-bold text-primary mb-8">Recent Posts</h2>
  </ScrollReveal>

  <div class="grid md:grid-cols-2 gap-6">
    {#each posts as post, i}
      <ScrollReveal delay={0.05 * (i + 1)} direction="up">
        <SpotlightCard as="a" href={`/blogs/${post.slug}`} class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-primary">{post.metadata.title}</h3>
            <span
              class="text-xs text-tertiary bg-tertiary px-2 py-1 rounded"
            >
              {new Date(post.metadata.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </span>
          </div>
          <p class="text-sm text-secondary mb-4">
            {post.metadata.description}
          </p>
          <div class="flex items-center space-x-2">
            {#each post.metadata.tags.slice(0, 3) as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </SpotlightCard>
      </ScrollReveal>
    {/each}
  </div>

  <ScrollReveal delay={0.5} direction="up">
    <div class="text-center mt-8">
      <a
        href="/blogs"
        class="inline-flex items-center gap-2 text-primary hover:text-primary-hover text-sm font-medium kinetic-underline"
      >
        Read all posts
        <svg
          class="w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  </ScrollReveal>
</section>

<style>
  .kinetic-underline svg {
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .kinetic-underline:hover svg {
    transform: translateX(4px);
  }
</style>
