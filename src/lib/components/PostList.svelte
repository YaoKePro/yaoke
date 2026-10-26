<script>
	import { shortDate } from '$lib/format.js';
	import { TAGS } from '$lib/site.js';

	let { posts, showTag = false } = $props();
</script>

<ul class="list">
	{#each posts as post (post.slug)}
		<li>
			<a href="/writing/{post.slug}" class="row">
				<time datetime={post.date}>{shortDate(post.date)}</time>
				<span class="title">
					{post.title}
					{#if post.draft}<span class="flag">Draft</span>{/if}
				</span>
				{#if showTag}<span class="tag">{TAGS[post.tag]}</span>{/if}
			</a>
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
		grid-template-columns: 64px minmax(0, 1fr) auto;
		gap: 16px;
		align-items: baseline;
		padding: 11px 10px;
		margin: 0 -10px;
		border-radius: 8px;
		transition: background-color 0.2s ease;
	}
	.row:hover {
		background: var(--wash);
	}
	time,
	.tag {
		color: var(--muted);
		font-size: 13px;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
	.title {
		font-family: var(--serif);
		font-size: 19px;
		line-height: 1.35;
	}
	.flag {
		font-family: var(--sans);
		font-size: 11px;
		color: var(--muted);
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		padding: 1px 7px;
		margin-left: 6px;
		vertical-align: 3px;
		white-space: nowrap;
	}
	@media (max-width: 520px) {
		.row {
			grid-template-columns: minmax(0, 1fr);
			gap: 2px;
			padding: 12px 10px;
		}
		time {
			order: 2;
		}
		.tag {
			display: none;
		}
	}
</style>
