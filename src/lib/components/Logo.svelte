<script>
	let { size = 28 } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" class="logo">
	<circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="1.4" />
	<text
		x="16"
		y="20.6"
		text-anchor="middle"
		font-family="'Newsreader Variable', Georgia, serif"
		font-size="15"
		letter-spacing="-0.9"
		fill="currentColor">yk</text
	>
</svg>

<style>
	.logo {
		display: block;
		flex: none;
	}
</style>
