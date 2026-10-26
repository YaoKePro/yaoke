<script>
	import Seo from '$lib/components/Seo.svelte';
	import quotes from '$lib/data/quotes.json';

	// Always alphabetical by the quote itself, so new entries can go anywhere in the file.
	const sorted = [...quotes].sort((a, b) => a.quote.localeCompare(b.quote, 'en', { sensitivity: 'base' }));
</script>

<Seo title="Humanity's List of Badass Quotes" />

<div class="column page">
	<h1>Humanity's List of Badass Quotes</h1>
	<ul>
		{#each sorted as q}
			<li>
				<blockquote>“{q.quote}”</blockquote>
				{#if q.author || q.source}
					<p class="by">
						{#if q.link}<a href={q.link} class="u">{q.author}{q.source ? `, ${q.source}` : ''}</a
							>{:else}{q.author}{q.source ? `, ${q.source}` : ''}{/if}
					</p>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 40px;
		padding-top: 24px;
	}
	h1 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 400;
		font-size: clamp(32px, 6vw, 40px);
		line-height: 1.1;
		letter-spacing: -0.02em;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 36px;
	}
	blockquote {
		margin: 0;
		font-family: var(--serif);
		font-size: 26px;
		line-height: 1.35;
		letter-spacing: -0.01em;
	}
	.by {
		margin: 10px 0 0;
		color: var(--muted);
		font-size: 14px;
	}
</style>
