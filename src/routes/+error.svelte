<script>
	import { page } from '$app/state';
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo title={page.status === 404 ? 'Not found' : 'Something went wrong'} />

<div class="column page">
	<p class="label">{page.status}</p>
	<h1>{page.status === 404 ? 'This page wandered off.' : 'Something went wrong.'}</h1>
	<p><a href="/" class="u">Go home</a> or <a href="/writing" class="u">read something</a>.</p>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding-top: 48px;
	}
	h1 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 400;
		font-size: 40px;
		line-height: 1.1;
	}
	p {
		margin: 0;
		color: var(--muted);
	}
</style>
