<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';

	let { data, children } = $props();
	let palette;
</script>

<a href="#main" class="skip">Skip to content</a>
<Header onsearch={() => palette.open()} />
<main id="main">
	{@render children()}
</main>
<Footer />
<CommandPalette bind:this={palette} items={data.search} />

<style>
	main {
		min-height: 60vh;
		padding-bottom: 96px;
	}
	.skip {
		position: absolute;
		left: 16px;
		top: -48px;
		padding: 8px 12px;
		background: var(--ink);
		color: var(--paper);
		border-radius: 8px;
		z-index: 10;
	}
	.skip:focus {
		top: 12px;
	}
</style>
