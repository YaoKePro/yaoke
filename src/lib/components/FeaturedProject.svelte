<script>
	let { project } = $props();
</script>

<a class="card" href={project.href}>
	<div class="art">
		<img
			src={project.cover.src}
			srcset={`${project.cover.small} 600w, ${project.cover.src} 1200w`}
			sizes="(max-width: 720px) 100vw, 520px"
			alt={project.cover.alt}
			width="1200"
			height="750"
			loading="lazy"
			decoding="async"
		/>
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
		overflow: hidden;
	}
	.art img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.8s var(--ease);
	}
	.card:hover .art img {
		transform: scale(1.03);
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
