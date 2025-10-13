<script>
  let { data } = $props();
  const posts = data.posts;
</script>

<!-- Hero Section -->
<section class="max-w-4xl mx-auto px-6 py-32">
  <div class="text-center">
    <h1 class="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">
      Hello, I'm <span class="text-primary">Yao Ke</span>
    </h1>

    <p class="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
      Developer, dreamer, and occasional writer. <br/>
      I enjoy solving problems with creativity.
    </p>

    <div class="flex items-center justify-center space-x-6 mt-8">
      <a href="/blogs" class="btn-primary">
        Read Blog
      </a>
      <a href="/projects" class="btn-secondary">
        View Projects
      </a>
    </div>
  </div>
</section>


<!-- Recent Blogs -->
<section class="max-w-6xl mx-auto px-6 py-16 border-t border-border">
  <h2 class="text-2xl font-bold text-primary mb-8">Recent Posts</h2>

  <div class="grid md:grid-cols-2 gap-6">
    {#each posts as post}
      <a href={`/blogs/${post.slug}`} class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-primary">{post.metadata.title}</h3>
          <span class="text-xs text-tertiary bg-tertiary px-2 py-1 rounded">
            {new Date(post.metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
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
      </a>
    {/each}
  </div>

  <div class="text-center mt-8">
    <a href="/blogs" class="text-primary hover:text-primary-hover text-sm font-medium">
      Read all posts →
    </a>
  </div>
</section>

<style>
  .btn-primary {
    background-color: var(--color-primary);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
    transition: var(--transition-fast);
    display: inline-block;
  }

  .btn-primary:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  .btn-secondary {
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
    transition: var(--transition-fast);
    display: inline-block;
  }

  .btn-secondary:hover {
    border-color: var(--color-border-hover);
    background-color: var(--color-bg-secondary);
  }

  .card {
    background-color: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    transition: var(--transition-fast);
    text-decoration: none;
    display: block;
  }

  .card:hover {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-sm);
    transform: translateY(-2px);
  }

  .tag {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-tertiary);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 500;
  }
</style>
