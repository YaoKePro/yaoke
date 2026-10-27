<script>
	// Reading progress as a line-art flower: the stem draws up, leaves unfurl, then the petals
	// open one by one as the reader moves through `target`. At the end the flower takes its colour.
	import { onMount } from 'svelte';
	import { flower } from '$lib/flower.js';

	let { seed, target, label = 'Reading progress' } = $props();

	const art = $derived(flower(seed));

	const clamp = (v) => Math.max(0, Math.min(1, v));
	const smooth = (v) => {
		const t = clamp(v);
		return t * t * (3 - 2 * t);
	};

	let amount = $state(0);
	let finish = $state(0);
	let shown = $state(false);

	const STEM = 0.42;
	const leafAt = (leaf, p) => clamp((p - leaf.t * STEM) / 0.12);
	const centreAt = (p) => clamp((p - STEM) / 0.08);
	function petalAt(petal, i, p) {
		const n = art.count;
		const [start, stagger, span] = petal.layer ? [0.6, 0.12, 0.26] : [0.48, 0.18, 0.3];
		return clamp((p - start - ((i % n) / n) * stagger) / span);
	}

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
			finish = complete ? (reduced.matches ? 1 : clamp((time - finishStarted) / 1100)) : 0;
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
				if (first && complete) finishStarted = performance.now() - 1100;
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

	// A small lift as the colour arrives, settling back to rest.
	let pulse = $derived(1 + 0.07 * Math.sin(Math.PI * smooth(finish)));
	let bloom = $derived(smooth(finish));
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
	style:--petal={art.colour}
>
	<path d="M44 112.5H76" class="ground" pathLength="1" />
	<path d={art.stem} class="line stem" pathLength="1" stroke-dashoffset={1 - clamp(amount / STEM)} />
	{#each art.leaves as leaf}
		{@const local = leafAt(leaf, amount)}
		<g
			transform="translate({leaf.x} {leaf.y}) rotate({leaf.angle}) scale({0.4 + 0.6 * smooth(local)})"
			opacity={local > 0 ? 1 : 0}
		>
			<path d={leaf.d} class="line leaf" pathLength="1" stroke-dashoffset={1 - local} fill-opacity={0.22 * bloom} />
			<path d={leaf.vein} class="line vein" pathLength="1" stroke-dashoffset={1 - local} />
		</g>
	{/each}
	<g transform="translate({art.head.x} {art.head.y}) rotate({art.head.tilt}) scale({pulse})">
		{#each art.petals as petal, i}
			{@const local = petalAt(petal, i, amount)}
			<path
				d={petal.d}
				class="line petal"
				pathLength="1"
				transform="rotate({petal.angle}) scale({0.3 + 0.7 * smooth(local)})"
				stroke-dashoffset={1 - local}
				fill-opacity={0.26 * bloom}
				opacity={local > 0 ? 1 : 0}
			/>
		{/each}
		<circle
			r={art.centre}
			class="line centre"
			pathLength="1"
			stroke-dashoffset={1 - centreAt(amount)}
			fill-opacity={0.9 * bloom}
			opacity={centreAt(amount) > 0 ? 1 : 0}
		/>
	</g>
</svg>

<style>
	.flower {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.hidden {
		visibility: hidden;
	}
	.ground {
		stroke: var(--line-strong);
		stroke-width: 1.4;
		stroke-linecap: round;
	}
	.line {
		fill: none;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-dasharray: 1 1;
	}
	.stem,
	.vein {
		stroke: var(--leaf);
	}
	.vein {
		stroke-width: 1;
	}
	.leaf {
		stroke: var(--leaf);
		fill: var(--leaf);
	}
	.petal {
		stroke: var(--petal);
		fill: var(--petal);
	}
	.centre {
		stroke: var(--pollen-edge);
		fill: var(--pollen);
	}
</style>
