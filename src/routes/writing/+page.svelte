<script>
	import { onMount } from 'svelte';
	import { replaceState } from '$app/navigation';
	import PostList from '$lib/components/PostList.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { year } from '$lib/format.js';
	import { TAGS, WRITING_NAME } from '$lib/site.js';

	let { data } = $props();

	const filters = [{ key: 'all', label: 'All' }, ...Object.entries(TAGS).map(([key, label]) => ({ key, label }))];

	// The filter lives in the URL (?tag=engineering) so it can be linked; the prerendered page shows all.
	let tag = $state('all');
	onMount(() => {
		const wanted = new URL(location.href).searchParams.get('tag');
		if (wanted && filters.some((f) => f.key === wanted)) tag = wanted;
	});

	let shown = $derived(tag === 'all' ? data.posts : data.posts.filter((p) => p.tag === tag));
	let years = $derived.by(() => {
		const groups = new Map();
		for (const post of shown) {
			const y = year(post.date);
			if (!groups.has(y)) groups.set(y, []);
			groups.get(y).push(post);
		}
		return [...groups];
	});

	function pick(key) {
		tag = key;
		const url = new URL(location.href);
		if (key === 'all') url.searchParams.delete('tag');
		else url.searchParams.set('tag', key);
		replaceState(url, {});
	}
</script>

<Seo title={WRITING_NAME} description="Essays on being human, and notes on engineering with AI." />

<div class="column page">
	<header class="head">
		<h1>{WRITING_NAME}</h1>
		<div class="filters" role="group" aria-label="Filter posts">
			{#each filters as f (f.key)}
				<button type="button" aria-pressed={tag === f.key} onclick={() => pick(f.key)}>{f.label}</button>
			{/each}
		</div>
	</header>

	{#each years as [y, posts] (y)}
		<section aria-label={y}>
			<h2 class="label">{y}</h2>
			<PostList {posts} showTag={tag === 'all'} />
		</section>
	{/each}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 48px;
		padding-top: 24px;
	}
	.head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
	}
	h1 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 400;
		font-size: 40px;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}
	.filters {
		display: flex;
		gap: 4px;
		padding: 3px;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: var(--wash);
	}
	.filters button {
		border: 0;
		border-radius: 999px;
		padding: 4px 12px;
		font-size: 13px;
		background: transparent;
		color: var(--muted);
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}
	.filters button[aria-pressed='true'] {
		background: var(--surface);
		color: var(--ink);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
	}
	section .label {
		margin-bottom: 12px;
	}
</style>
