<script>
	import { page } from '$app/state';
	import { SITE } from '$lib/site.js';

	let { title = null, description = SITE.description, type = 'website', published = null, image = null } = $props();

	let full = $derived(title ? `${title} · ${SITE.name}` : `${SITE.name}`);
	let canonical = $derived(`${SITE.url}${page.url.pathname === '/' ? '' : page.url.pathname}`);
</script>

<svelte:head>
	<title>{full}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:site_name" content={SITE.name} />
	<meta property="og:title" content={title ?? SITE.name} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	{#if image}<meta property="og:image" content={`${SITE.url}${image}`} />{/if}
	<meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:site" content="@yail259" />
	{#if published}<meta property="article:published_time" content={published} />{/if}
</svelte:head>
