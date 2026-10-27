<script>
	// Reading progress as an ink drawing: the stem draws up, leaves unfurl, the bud forms and the
	// bloom opens as the reader moves through `target`. Each slug grows its own plant (flower.js).
	import { onMount } from 'svelte';
	import { grow, draw } from '$lib/flower.js';

	let { seed, target, label = 'Reading progress' } = $props();

	const plant = $derived(grow(seed));
	const clamp = (v) => Math.max(0, Math.min(1, v));

	let amount = $state(0);
	let finish = $state(0);
	let shown = $state(false);
	let markup = $derived(draw(plant, amount, finish));

	onMount(() => {
		const article = typeof target === 'string' ? document.querySelector(target) : target;
		if (!article) return;
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		let goal = 0;
		let frame = 0;
		let last = 0;
		let complete = false;
		let finishStarted = null;
		let first = true;

		function animate(time) {
			frame = 0;
			const elapsed = last ? Math.min(64, time - last) : 16;
			last = time;
			amount += (goal - amount) * (1 - Math.exp(-elapsed / 95));
			if (Math.abs(goal - amount) < 0.0005) amount = goal;
			finish = complete ? (reduced.matches ? 1 : clamp((time - finishStarted) / 900)) : 0;
			if (amount !== goal || (complete && finish < 1)) frame = requestAnimationFrame(animate);
			else last = 0;
		}

		function measure() {
			const bounds = article.getBoundingClientRect();
			const start = Math.max(0, bounds.top + scrollY - 100);
			const margin = innerWidth <= 900 ? 96 : 80;
			const end = Math.max(start + 1, bounds.bottom + scrollY - innerHeight + margin);
			goal = clamp((scrollY - start) / (end - start));
			if (bounds.bottom <= innerHeight - margin) goal = 1;
			const was = complete;
			if (goal >= 0.9999) complete = true;
			else if (goal < 0.97) complete = false;
			if (complete !== was) finishStarted = complete ? performance.now() : null;
			if (first || reduced.matches) {
				amount = goal;
				if (first && complete) finishStarted = performance.now() - 900;
				finish = complete ? 1 : 0;
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
	viewBox="0 0 120 120"
	class="flower"
	class:hidden={!shown}
	role="progressbar"
	aria-label={label}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={Math.round(amount * 100)}
>
	{@html markup}
</svg>

<style>
	.flower {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
		stroke: var(--ink);
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.hidden {
		visibility: hidden;
	}
	.flower :global(.fill) {
		fill: var(--paper);
	}
	.flower :global(.soil) {
		stroke: var(--line-strong);
	}
</style>
