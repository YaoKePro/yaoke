<script>
	import { onMount } from 'svelte';

	let dark = $state(false);

	onMount(() => {
		const media = matchMedia('(prefers-color-scheme: dark)');
		const read = () => {
			const set = document.documentElement.dataset.theme;
			dark = set ? set === 'dark' : media.matches;
		};
		read();
		media.addEventListener('change', read);
		return () => media.removeEventListener('change', read);
	});

	function toggle() {
		dark = !dark;
		const theme = dark ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('theme', theme);
		} catch {}
	}
</script>

<button type="button" class="toggle" onclick={toggle} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>
	{#if dark}
		<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"
			><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6" /><path
				d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
			/></svg
		>
	{:else}
		<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"
			><path
				d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linejoin="round"
			/></svg
		>
	{/if}
</button>

<style>
	.toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		margin: -5px -8px -5px 0;
		border: 0;
		border-radius: 8px;
		background: transparent;
		color: var(--muted);
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}
	.toggle:hover {
		background: var(--wash);
		color: var(--ink);
	}
</style>
