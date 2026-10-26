<script>
	import Mosaic from '$lib/components/Mosaic.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { longDate } from '$lib/format.js';
	import { TAGS } from '$lib/site.js';

	let { data } = $props();
	let post = $derived(data.post);
</script>

<Seo title={post.title} description={post.description ?? post.title} type="article" published={post.date} />

{#if post.cover}
	<figure class="cover">
		<img
			src={post.cover.src}
			alt={post.cover.alt}
			width={post.cover.width}
			height={post.cover.height}
			fetchpriority="high"
			decoding="async"
		/>
		{#if post.cover.credit}
			<figcaption>
				{#if post.cover.href}<a href={post.cover.href} class="u">{post.cover.credit}</a>{:else}{post.cover.credit}{/if}
			</figcaption>
		{/if}
	</figure>
{/if}

<article class="column post" id="article">
	<header class="head">
		<a href="/writing" class="back"><span class="arrow">←</span> Writing</a>
		<h1>{post.title}</h1>
		<p class="meta">
			<time datetime={post.date}>{longDate(post.date)}</time>
			<span aria-hidden="true">·</span>
			<span>{post.minutes} min read</span>
			<span aria-hidden="true">·</span>
			<a href="/writing?tag={post.tag}" class="u">{TAGS[post.tag]}</a>
			{#if post.draft}<span class="flag">Draft</span>{/if}
		</p>
		{#if post.description && post.tag === 'engineering'}<p class="dek">{post.description}</p>{/if}
	</header>

	<div class="prose">
		{@html post.html}
	</div>
</article>

<nav class="column more" aria-label="More writing">
	{#if data.older}
		<a href="/writing/{data.older.slug}" class="next"
			><span class="label">Previous</span><span class="title">{data.older.title}</span></a
		>
	{/if}
	{#if data.newer}
		<a href="/writing/{data.newer.slug}" class="next right"
			><span class="label">Next</span><span class="title">{data.newer.title}</span></a
		>
	{/if}
</nav>

<div class="progress">
	<Mosaic tiles={data.tiles} progress target="#article" />
</div>

<style>
	.cover {
		max-width: 1040px;
		margin: 8px auto 0;
		padding: 0 24px;
	}
	.cover img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 21 / 9;
		object-fit: cover;
		border-radius: 4px;
		background: var(--wash);
	}
	.cover figcaption {
		margin-top: 8px;
		font-size: 12px;
		color: var(--muted);
		text-align: right;
	}
	.post {
		padding-top: 24px;
	}
	.head {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 40px;
	}
	.back {
		align-self: flex-start;
		font-size: 14px;
		color: var(--muted);
		margin-bottom: 16px;
	}
	.back:hover {
		color: var(--ink);
	}
	.arrow {
		display: inline-block;
		transition: transform 0.25s var(--ease);
	}
	.back:hover .arrow {
		transform: translateX(-3px);
	}
	h1 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 400;
		font-size: clamp(34px, 7vw, 48px);
		line-height: 1.1;
		letter-spacing: -0.02em;
		text-wrap: balance;
	}
	.meta {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 6px 12px;
		font-size: 13px;
		color: var(--muted);
	}
	.meta a:hover {
		color: var(--ink);
	}
	.flag {
		font-size: 11px;
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		padding: 0 7px;
	}
	.dek {
		margin: 0;
		font-size: 17px;
		color: var(--muted);
	}
	.more {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
		margin-top: 72px;
	}
	.next {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 16px;
		border: 1px solid var(--line);
		border-radius: 12px;
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease;
	}
	.next:hover {
		border-color: var(--line-strong);
		background: var(--wash);
	}
	.next.right {
		grid-column: 2;
		text-align: right;
	}
	.next .title {
		font-family: var(--serif);
		font-size: 18px;
		line-height: 1.3;
	}
	.progress {
		position: fixed;
		right: max(16px, env(safe-area-inset-right));
		bottom: max(16px, env(safe-area-inset-bottom));
		width: 116px;
		height: 116px;
		pointer-events: none;
		z-index: 5;
		filter: drop-shadow(0 3px 3px rgba(24, 47, 35, 0.09));
	}
	@media (max-width: 900px) {
		.progress {
			width: 76px;
			height: 76px;
			right: 8px;
			bottom: 8px;
			background: var(--paper);
			border-radius: 50%;
		}
	}
	@media (max-width: 560px) {
		.more {
			grid-template-columns: minmax(0, 1fr);
		}
		.next.right {
			grid-column: 1;
		}
	}
	@media print {
		.progress,
		.more {
			display: none;
		}
	}
</style>
