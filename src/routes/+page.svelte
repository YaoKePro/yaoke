<script>
	import PostList from '$lib/components/PostList.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import FeaturedProject from '$lib/components/FeaturedProject.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { FEATURED, SELECTED, TOYS, WRITING_NAME } from '$lib/site.js';

	let { data } = $props();
</script>

<Seo />

<div class="column home">
	<section class="intro">
		<h1>I build tools that let AI do real work, and write about being human.</h1>
		<p>Developer and occasional writer. I enjoy solving problems creatively.</p>
	</section>

	<section aria-labelledby="building">
		<h2 id="building" class="label">Now building</h2>
		<div class="featured">
			{#each FEATURED as project (project.slug)}
				<FeaturedProject {project} />
			{/each}
		</div>
	</section>

	<section aria-labelledby="selected">
		<h2 id="selected" class="label">Selected projects</h2>
		<ProjectList projects={SELECTED} />
		<a href="/projects" class="more">
			<span>Toy and learning projects</span>
			<span class="arrow">{TOYS.length} more →</span>
		</a>
	</section>

	<section aria-labelledby="writing">
		<h2 id="writing" class="label">{WRITING_NAME}</h2>
		<PostList posts={data.posts} />
		<a href="/writing" class="more">
			<span>All {data.total} posts</span>
			<span class="arrow">→</span>
		</a>
	</section>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		gap: 72px;
		padding-top: 24px;
	}
	section {
		display: flex;
		flex-direction: column;
	}
	section .label {
		margin-bottom: 16px;
	}
	.intro {
		gap: 14px;
	}
	h1 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 400;
		font-size: clamp(32px, 6vw, 40px);
		line-height: 1.15;
		letter-spacing: -0.02em;
		text-wrap: balance;
	}
	.intro p {
		margin: 0;
		color: var(--muted);
		font-size: 16px;
		max-width: 540px;
	}
	.featured {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}
	.more {
		display: flex;
		justify-content: space-between;
		padding: 12px 10px;
		margin: 0 -10px;
		border-radius: 8px;
		color: var(--muted);
		transition: background-color 0.2s ease;
	}
	.more:hover {
		background: var(--wash);
		color: var(--ink);
	}
	.arrow {
		display: inline-block;
		transition: transform 0.25s var(--ease);
	}
	.more:hover .arrow {
		transform: translateX(3px);
	}
	@media (max-width: 600px) {
		.home {
			gap: 56px;
			padding-top: 8px;
		}
		.featured {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
