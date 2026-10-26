<script>
	let { projects } = $props();
</script>

<ul class="list">
	{#each projects as project (project.name)}
		<li>
			<svelte:element
				this={project.href ? 'a' : 'div'}
				href={project.href}
				class="row"
				class:link={project.href}
			>
				<span class="name">{project.name}</span>
				<span class="line">{project.line}</span>
				<span class="meta">{project.meta ?? ''}</span>
			</svelte:element>
		</li>
	{/each}
</ul>

<style>
	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--line);
	}
	.row {
		display: grid;
		grid-template-columns: 150px minmax(0, 1fr) 64px;
		gap: 16px;
		align-items: baseline;
		padding: 12px 10px;
		margin: 0 -10px;
		border-radius: 8px;
		transition: background-color 0.2s ease;
	}
	.link:hover {
		background: var(--wash);
	}
	.name {
		font-weight: 500;
	}
	.line {
		color: var(--muted);
	}
	.meta {
		color: var(--muted);
		font-size: 13px;
		text-align: right;
		white-space: nowrap;
	}
	@media (max-width: 560px) {
		.row {
			grid-template-columns: minmax(0, 1fr) auto;
			gap: 2px 12px;
		}
		.line {
			grid-column: 1 / -1;
			grid-row: 2;
			font-size: 14px;
		}
	}
</style>
