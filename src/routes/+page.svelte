<!-- Hero Section -->
<section class="max-w-4xl mx-auto px-6 py-32">
  <div class="text-center">
    <h1 class="font-serif text-4xl md:text-6xl font-bold text-primary mb-6">
      Hello, I'm <span class="text-primary">Yao Ke</span>
    </h1>

    <p class="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
      Developer, dreamer, and occasional writer. <br/>
      I create solutions to problems that are about to exist.
    </p>

    <div class="flex items-center justify-center space-x-6 mt-8">
      <a href="/projects" class="btn-primary">
        View Projects
      </a>
      <a href="/blogs" class="btn-secondary">
        Read Blog
      </a>
    </div>
  </div>
</section>


<!-- Recent Work -->
<section class="max-w-6xl mx-auto px-6 py-16 border-t border-border">
  <h2 class="text-2xl font-bold text-primary mb-8">Recent Work</h2>

  <div class="grid md:grid-cols-2 gap-6">
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-primary">Markdown UI</h3>
        <span class="text-xs text-tertiary bg-tertiary px-2 py-1 rounded">2025</span>
      </div>
      <p class="text-sm text-secondary mb-4">
        A micro-spec for embedding interactive UI widgets in Markdown for LLMs.
      </p>
      <div class="flex items-center space-x-2">
        <span class="tag">Svelte</span>
        <span class="tag">React</span>
        <span class="tag">OSS</span>
      </div>
    </div>

    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-primary">QR Ordering System</h3>
        <span class="text-xs text-tertiary bg-tertiary px-2 py-1 rounded">2023</span>
      </div>
      <p class="text-sm text-secondary mb-4">
        Full-stack ordering system with Square integration and SMS notifications.
      </p>
      <div class="flex items-center space-x-2">
        <span class="tag">SvelteKit</span>
        <span class="tag">Firebase</span>
        <span class="tag">Square API</span>
      </div>
    </div>
  </div>

  <div class="text-center mt-8">
    <a href="/projects" class="text-primary hover:text-primary-hover text-sm font-medium">
      View all projects →
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
  }

  .card:hover {
    border-color: var(--color-border-hover);
    box-shadow: var(--shadow-sm);
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
