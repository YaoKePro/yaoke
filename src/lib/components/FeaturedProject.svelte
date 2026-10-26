<script>
	import Mosaic from './Mosaic.svelte';

	let { project, tiles } = $props();
</script>

<a class="card" href={project.href}>
	<div class="art" aria-hidden="true">
		<div class="mosaic"><Mosaic {tiles} /></div>
	</div>
	<div class="body">
		<div class="top">
			<span class="name">{project.name}</span>
			<span class="meta">{project.stars ? `★ ${project.stars}` : project.year}</span>
		</div>
		<span class="line">{project.line}</span>
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--line-strong);
		border-radius: 14px;
		overflow: hidden;
		background: var(--surface);
		transition:
			transform 0.3s var(--ease),
			box-shadow 0.3s var(--ease),
			border-color 0.3s ease;
	}
	.card:hover {
		transform: translateY(-2px);
		box-shadow: 0 14px 34px -18px rgba(24, 24, 27, 0.28);
	}
	.art {
		aspect-ratio: 16 / 10;
		background: var(--wash);
		border-bottom: 1px solid var(--line);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.mosaic {
		width: 46%;
		aspect-ratio: 1;
		transition: transform 0.6s var(--ease);
	}
	.card:hover .mosaic {
		transform: rotate(-4deg) scale(1.04);
	}
	.body {
		padding: 16px 18px 18px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
	}
	.name {
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.meta {
		font-size: 12px;
		color: var(--muted);
	}
	.line {
		color: var(--muted);
		font-size: 14px;
	}
</style>
