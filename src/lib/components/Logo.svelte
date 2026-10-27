<script>
	// The yk cube: five inner lines spell yk (the upright is the k's stem and the y's tail), and the
	// six outer edges make it a cube. The outer edges quietly come and go, resting on the whole cube.
	import { onMount } from 'svelte';

	let { size = 28 } = $props();

	const P = { T: [24, 5], UR: [40.5, 14.5], LR: [40.5, 33.5], B: [24, 43], LL: [7.5, 33.5], UL: [7.5, 14.5], C: [24, 24] };
	const line = (p, q) => `M${P[p]} L${P[q]}`;
	const glyph = [line('T', 'B'), line('C', 'UL'), line('C', 'UR'), line('C', 'LR')].join(' ');
	const edges = { a: ['T', 'UR'], b: ['UR', 'LR'], c: ['LR', 'B'], d: ['B', 'LL'], e: ['LL', 'UL'], f: ['UL', 'T'] };
	const shapes = ['bcde', 'ace', 'af', 'abc', 'bdf', 'def', 'abcdf', 'abcdef'];

	let keep = $state('abcdef');

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let step = -1;
		let timer;
		const next = () => {
			if (!document.hidden) {
				step = (step + 1) % shapes.length;
				keep = shapes[step];
			}
			timer = setTimeout(next, keep === 'abcdef' ? 9000 : 2600);
		};
		timer = setTimeout(next, 6000);
		return () => clearTimeout(timer);
	});
</script>

<svg width={size} height={size} viewBox="2 2 44 44" aria-hidden="true" class="logo">
	<g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
		<path d={glyph} />
		{#each Object.entries(edges) as [k, [p, q]] (k)}
			<path class="edge" class:off={!keep.includes(k)} d={line(p, q)} pathLength="1" />
		{/each}
	</g>
</svg>

<style>
	.logo {
		display: block;
		flex: none;
	}
	.edge {
		stroke-dasharray: 1 1;
		stroke-dashoffset: 0;
		transition: stroke-dashoffset 0.9s cubic-bezier(0.6, 0, 0.3, 1);
	}
	.edge.off {
		stroke-dashoffset: 1;
	}
</style>
