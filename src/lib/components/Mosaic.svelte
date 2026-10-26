<script>
	// A post's generated mosaic. "progress" mode assembles the tiles as the reader
	// moves through `target`, and snaps them together when they reach the end.
	import { onMount } from 'svelte';

	let { tiles, progress = false, target = null, label = 'Reading progress' } = $props();

	const clamp = (v) => Math.max(0, Math.min(1, v));
	const smooth = (v) => {
		const t = clamp(v);
		return t * t * (3 - 2 * t);
	};

	let amount = $state(progress ? 0 : 1);
	let finish = $state(progress ? -1 : 1);
	let spread = $state(1);
	let complete = $state(!progress);
	let shown = $state(!progress);

	function transform(tile, i, p, f) {
		const arrive = smooth((p - i * 0.075) / 0.7);
		let remaining = 1 - arrive * (1 - (i === tiles.length - 1 ? 0.24 : 0.055));
		if (f >= 0) {
			const t = clamp((f - (tiles.length - 1 - i) * 0.045) / 0.38);
			const snap = t === 1 ? 1 : 1 - Math.exp(-8 * t) * Math.cos(11 * t);
			remaining *= 1 - snap;
		}
		const x = 74 + tile.x * spread * remaining;
		const y = 74 + tile.y * spread * remaining;
		return `translate(${x} ${y}) rotate(${tile.rotation * remaining} ${tile.cx} ${tile.cy})`;
	}

	let stroke = $derived(finish < 0 ? 2.8 : 2.8 - 2.45 * smooth(finish / 0.65));

	onMount(() => {
		if (!progress) return;
		const article = typeof target === 'string' ? document.querySelector(target) : target;
		if (!article) return;
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		let goal = 0;
		let frame = 0;
		let last = 0;
		let finishStarted = null;
		let first = true;

		function animate(time) {
			frame = 0;
			const elapsed = last ? Math.min(64, time - last) : 16;
			last = time;
			amount += (goal - amount) * (1 - Math.exp(-elapsed / 95));
			if (Math.abs(goal - amount) < 0.0005) amount = goal;
			finish = complete ? (reduced.matches ? 1 : clamp((time - finishStarted) / 900)) : -1;
			if (amount !== goal || (complete && finish < 1)) frame = requestAnimationFrame(animate);
			else last = 0;
		}

		function measure() {
			const bounds = article.getBoundingClientRect();
			const start = Math.max(0, bounds.top + scrollY - 100);
			const margin = innerWidth <= 900 ? 96 : 80;
			const end = Math.max(start + 1, bounds.bottom + scrollY - innerHeight + margin);
			goal = clamp((scrollY - start) / (end - start));
			// Long articles scatter the tiles further, so each screen of reading moves them visibly.
			spread = 1 + 0.6 * smooth(((end - start) / innerHeight - 2) / 6);
			if (bounds.bottom <= innerHeight - margin) goal = 1;
			const was = complete;
			if (goal >= 0.9999) complete = true;
			else if (goal < 0.97) complete = false;
			if (complete !== was) finishStarted = complete ? performance.now() : null;
			if (first || reduced.matches) {
				amount = goal;
				if (first && complete) finishStarted = performance.now() - 900;
				finish = complete ? 1 : -1;
				first = false;
			}
			shown = true;
			if (!frame) frame = requestAnimationFrame(animate);
		}

		measure();
		addEventListener('scroll', measure, { passive: true });
		addEventListener('resize', measure);
		const observer = new ResizeObserver(measure);
		observer.observe(article);
		return () => {
			removeEventListener('scroll', measure);
			removeEventListener('resize', measure);
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	});
</script>

<svg
	viewBox="0 0 260 260"
	class="mosaic"
	class:hidden={!shown}
	role={progress ? 'progressbar' : undefined}
	aria-label={progress ? label : undefined}
	aria-valuemin={progress ? 0 : undefined}
	aria-valuemax={progress ? 100 : undefined}
	aria-valuenow={progress ? Math.round(amount * 100) : undefined}
	aria-hidden={progress ? undefined : 'true'}
>
	<rect x="69" y="69" width="122" height="122" rx="9" class="bed" />
	{#each tiles as tile, i}
		<path
			d={tile.d}
			fill={tile.colour}
			stroke-linejoin="round"
			stroke-width={progress ? stroke : 1.2}
			class="tile"
			transform={progress ? transform(tile, i, amount, finish) : `translate(74 74)`}
		/>
	{/each}
</svg>

<style>
	.mosaic {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.hidden {
		visibility: hidden;
	}
	.bed {
		fill: var(--mosaic-bed);
		stroke: var(--mosaic-edge);
		stroke-width: 1;
	}
	.tile {
		stroke: var(--paper);
	}
</style>
