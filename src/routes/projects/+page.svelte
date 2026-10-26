<script>
	import FeaturedProject from '$lib/components/FeaturedProject.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { FEATURED, SELECTED, TOYS } from '$lib/site.js';

	let { data } = $props();
</script>

<Seo title="Projects" description="Things Yao Ke has built: Restless, FrankenSurf, Markdown UI and more." />

<div class="column page">
	<h1>Projects</h1>

	<section aria-labelledby="building">
		<h2 id="building" class="label">Now building</h2>
		<div class="featured">
			{#each FEATURED as project (project.slug)}
				<FeaturedProject {project} tiles={data.mosaics[project.slug]} />
			{/each}
		</div>
	</section>

	<section aria-labelledby="selected">
		<h2 id="selected" class="label">Selected projects</h2>
		<ProjectList projects={SELECTED} />
	</section>

	<section aria-labelledby="toys">
		<h2 id="toys" class="label">Toy and learning projects</h2>
		<ProjectList projects={TOYS} />
	</section>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 64px;
		padding-top: 24px;
	}
	h1 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 400;
		font-size: 40px;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}
	section .label {
		margin-bottom: 16px;
	}
	.featured {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}
	@media (max-width: 600px) {
		.featured {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
