<script>
	// Reading progress as a real drawing being drawn: the strokes ink in, in the order an artist
	// would plausibly have used, as the reader moves through `target`. The art is a PNG made by
	// scripts/flowers.py: R and G hold each pixel's draw time, A the line.
	import { onMount } from 'svelte';

	let { src, credit, target, label = 'Reading progress' } = $props();

	const SOFT = 0.004; // width of the drawing edge
	const clamp = (v) => Math.max(0, Math.min(1, v));

	let canvas;
	let amount = $state(0);
	let shown = $state(false);

	onMount(() => {
		const article = typeof target === 'string' ? document.querySelector(target) : target;
		if (!article) return;
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		const context = canvas.getContext('2d');
		let art = null; // { time, alpha, image }
		let painted = -1;
		let inkColour = '';

		function ink() {
			// Normalise the theme's ink colour to rgb through the canvas itself.
			context.fillStyle = getComputedStyle(canvas).color;
			const hex = context.fillStyle;
			return hex.startsWith('#') ? [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) : [24, 24, 27];
		}

		function paint() {
			if (!art) return;
			const colour = getComputedStyle(canvas).color;
			if (painted === amount && colour === inkColour) return;
			painted = amount;
			inkColour = colour;
			const [r, g, b] = ink();
			const { time, alpha, image } = art;
			const data = image.data;
			const front = amount * (1 + SOFT);
			for (let i = 0, j = 0; i < time.length; i++, j += 4) {
				if (!alpha[i]) continue;
				const grown = clamp((front - time[i]) / SOFT);
				data[j] = r;
				data[j + 1] = g;
				data[j + 2] = b;
				data[j + 3] = alpha[i] * grown;
			}
			context.putImageData(image, 0, 0);
		}

		const img = new Image();
		img.onload = () => {
			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;
			context.drawImage(img, 0, 0);
			const source = context.getImageData(0, 0, canvas.width, canvas.height).data;
			const count = canvas.width * canvas.height;
			const time = new Float32Array(count);
			const alpha = new Uint8ClampedArray(count);
			for (let i = 0; i < count; i++) {
				time[i] = ((source[i * 4] << 8) | source[i * 4 + 1]) / 65535;
				alpha[i] = source[i * 4 + 3];
			}
			art = { time, alpha, image: context.createImageData(canvas.width, canvas.height) };
			paint();
			shown = true;
		};
		img.src = src;

		let goal = 0;
		let frame = 0;
		let last = 0;
		let first = true;

		function animate(time) {
			frame = 0;
			const elapsed = last ? Math.min(64, time - last) : 16;
			last = time;
			amount += (goal - amount) * (1 - Math.exp(-elapsed / 95));
			if (Math.abs(goal - amount) < 0.0005) amount = goal;
			paint();
			if (amount !== goal) frame = requestAnimationFrame(animate);
			else last = 0;
		}

		function measure() {
			const bounds = article.getBoundingClientRect();
			const start = Math.max(0, bounds.top + scrollY - 100);
			const margin = innerWidth <= 900 ? 96 : 80;
			const end = Math.max(start + 1, bounds.bottom + scrollY - innerHeight + margin);
			goal = clamp((scrollY - start) / (end - start));
			if (bounds.bottom <= innerHeight - margin) goal = 1;
			if (first || reduced.matches) {
				amount = goal;
				first = false;
			}
			if (!frame) frame = requestAnimationFrame(animate);
		}

		// Repaint when the theme changes the ink colour.
		const themeWatch = new MutationObserver(() => requestAnimationFrame(paint));
		themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
		const scheme = matchMedia('(prefers-color-scheme: dark)');
		const onScheme = () => requestAnimationFrame(paint);
		scheme.addEventListener('change', onScheme);

		measure();
		addEventListener('scroll', measure, { passive: true });
		addEventListener('resize', measure);
		const observer = new ResizeObserver(measure);
		observer.observe(article);
		return () => {
			removeEventListener('scroll', measure);
			removeEventListener('resize', measure);
			observer.disconnect();
			themeWatch.disconnect();
			scheme.removeEventListener('change', onScheme);
			cancelAnimationFrame(frame);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="flower"
	class:hidden={!shown}
	role="progressbar"
	aria-label="{label}. {credit}"
	title={credit}
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={Math.round(amount * 100)}
></canvas>

<style>
	.flower {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		color: var(--ink);
	}
	.hidden {
		visibility: hidden;
	}
</style>
