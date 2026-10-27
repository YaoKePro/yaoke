// Reading progress as an ink drawing of a flower, grown from a seed (a post's slug) so every
// post gets its own. `grow(seed)` lays the plant out once; `draw(plant, p, f)` returns the SVG
// markup for reading progress p (0 to 1) and the finishing flourish f (0 to 1).
// The box is 120 × 120: soil at the bottom, the stem curving up to the bloom.

const SOIL = 113;
const STEM_END = 0.4; // share of progress spent drawing the stem and leaves

// Seed namespace: bump the version only to deliberately regrow every flower.
function random(seed) {
	let h = 2166136261;
	for (const c of `flower-v2:${seed}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
	return () => {
		h = (h + 0x6d2b79f5) | 0;
		let t = Math.imul(h ^ (h >>> 15), 1 | h);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const r1 = (n) => Math.round(n * 10) / 10;
// Snap the last sliver to 1 so finished lines drop their dash and render crisply.
const clamp = (v) => (v > 0.995 ? 1 : Math.max(0, v));
const smooth = (v) => {
	const t = clamp(v);
	return t * t * (3 - 2 * t);
};

function cubic(p0, p1, p2, p3, t) {
	const u = 1 - t;
	const at = (k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k];
	const slope = (k) => 3 * u * u * (p1[k] - p0[k]) + 6 * u * t * (p2[k] - p1[k]) + 3 * t * t * (p3[k] - p2[k]);
	return { x: at(0), y: at(1), angle: (Math.atan2(slope(1), slope(0)) * 180) / Math.PI };
}

// A serrated leaflet pointing along +x: a jagged outline with forward-leaning teeth, plus its midrib.
function leaflet(length, width, teeth) {
	const side = (sign) => {
		const points = [];
		for (let k = 1; k < teeth; k++) {
			const s = k / teeth;
			const w = width * Math.pow(Math.sin(Math.PI * s), 0.85) * (1 - 0.25 * s);
			points.push(`${r1(s * length)} ${r1(sign * w)}`);
			const s2 = (k + 0.55) / teeth;
			const w2 = width * Math.pow(Math.sin(Math.PI * Math.min(s2, 0.97)), 0.85) * (1 - 0.25 * s2) * 1.12;
			points.push(`${r1(s2 * length)} ${r1(sign * w2)}`);
		}
		return points;
	};
	const top = side(-1);
	const bottom = side(1).reverse();
	return {
		outline: `M0 0L${top.join('L')}L${r1(length)} 0L${bottom.join('L')}Z`,
		rib: `M0 0Q${r1(length * 0.5)} ${r1(-width * 0.12)} ${r1(length * 0.9)} 0`
	};
}

// The rose, drawn in its own frame: origin at the base of the bloom, petals rising into -y.
// Each part: d, stroke weight, when it starts and how long it takes to draw, whether it hides
// what is behind it, and how far it swings open (degrees) as it draws.
function rose(rand) {
	const v = (n) => r1(n + (rand() - 0.5) * 1.4); // a little hand-drawn wobble per post
	return [
		// Sepals peeking out under the bloom, and the hip.
		{ d: `M-4 2.5C-7 3.5 ${v(-10)} 3.5 ${v(-13)} ${v(6.5)}C-9.5 5.3 -7 5.3 -3.5 4`, w: 0.8, at: 0, span: 0.2, fill: 'Z', swing: 25 },
		{ d: `M4 2.5C7 3.5 ${v(10)} 3.5 ${v(12.5)} ${v(7)}C9 5.6 6.5 5.3 3.5 4`, w: 0.8, at: 0.03, span: 0.2, fill: 'Z', swing: -25 },
		{ d: 'M-3 3C-3.2 6.5 3.2 6.5 3 3', w: 0.85, at: 0.01, span: 0.18, fill: 'Z' },
		// The back petal, behind everything.
		{ d: `M-8.5 -25C${v(-6)} -31.5 ${v(6)} -32 9 -26C10.5 -23.5 9.5 -21 7.5 -20`, w: 0.9, at: 0.5, span: 0.24, fill: 'Z', swing: 10 },
		// Outer petals wrapping the sides, each with its edge rolled back.
		{ d: `M-15.5 -20.5C${v(-21.5)} -19 ${v(-23.5)} -12 -20.5 -6C-17.5 -0.5 -10 1 -4 0`, w: 0.95, at: 0.58, span: 0.28, fill: 'L-10 -19Z', swing: 22 },
		{ d: `M15 -15.5C${v(20.5)} -15 ${v(23)} -9 20.5 -4.5C17.5 0.5 10 1.5 4 0`, w: 0.95, at: 0.64, span: 0.28, fill: 'L7.5 -23Z', swing: -22 },
		{ d: 'M-15.5 -20.5C-17.2 -17 -17.6 -14.5 -16.6 -12', w: 0.65, at: 0.84, span: 0.12 },
		{ d: 'M15 -15.5C16.4 -12.5 16.6 -10 15.6 -7.8', w: 0.65, at: 0.88, span: 0.12 },
		// Middle petals cupping the heart, tips curling out.
		{ d: `M-10 -19C${v(-14)} -20 -16 -16 -15 -12C-14 -8 -9 -6 -4 -7`, w: 0.9, at: 0.36, span: 0.24, fill: 'L-6 -17Z', swing: 14 },
		{ d: `M7.5 -23C${v(12)} -24 15.5 -20 15 -15.5C14.5 -11 10 -8 5 -8.5`, w: 0.9, at: 0.4, span: 0.24, fill: 'L4 -17Z', swing: -14 },
		{ d: 'M-10 -19C-11.5 -21.6 -14 -22.2 -15.5 -20.5', w: 0.75, at: 0.56, span: 0.1 },
		{ d: 'M-12.4 -15.5C-11.6 -11.6 -8.8 -9.6 -5.6 -9.8', w: 0.6, at: 0.6, span: 0.14 },
		{ d: 'M12.2 -17.5C12.4 -13.6 10.6 -11 7.4 -10.4', w: 0.6, at: 0.62, span: 0.14 },
		{ d: `M-4 -7C-1.5 -9.5 ${v(2.5)} -10 5 -8.5`, w: 0.75, at: 0.5, span: 0.14 },
		// The heart: an inner petal wrapped round a tight spiral.
		{ d: `M-8 -19.5C-7 -16 0 -15 4.5 -17C7 -18.3 8 -20.5 7.5 -23C5 -27.5 ${v(-4)} -28.5 -8.5 -25C-10 -23.5 -9.6 -21 -8 -19.5`, w: 0.95, at: 0.1, span: 0.26, fill: 'Z' },
		{ d: `M1 -21.5C-2 -23 -4.5 -21 -3 -19.4C-1.5 -17.6 3 -18 4 -20.3C5 -23 2 -25.8 -2 -25.4C-6 -25 -8 -22 -7.6 -19.6`, w: 0.75, at: 0.16, span: 0.3 },
		// The front petal, notched at the top, folded down the middle.
		{ d: `M-12 -3.5C-8.5 -8 -3.5 -7.5 0 -5C3.5 -7.5 ${v(9.5)} -8 12 -4C9.5 1 3.5 2.3 0 1.8C-4.5 2.3 -9.5 1 -12 -3.5`, w: 1, at: 0.7, span: 0.26, fill: 'Z', swing: 8 },
		{ d: 'M0 -5C0.2 -2.8 -0.3 -0.8 -1.3 1.1', w: 0.65, at: 0.9, span: 0.1 },
		{ d: 'M-12 -3.5C-10.7 -3 -9.7 -3.7 -9 -4.9', w: 0.65, at: 0.92, span: 0.08 }
	];
}

export function grow(seed) {
	const rand = random(seed);
	const between = (a, b) => a + (b - a) * rand();
	const flip = rand() < 0.5 ? -1 : 1;

	const base = [60, SOIL];
	const head = [r1(60 + flip * between(2, 9)), r1(between(50, 55))];
	const c1 = [60 - flip * between(4, 12), SOIL - between(22, 30)];
	const c2 = [head[0] + flip * between(4, 12), head[1] + between(18, 26)];
	const at = (t) => cubic(base, c1, c2, head, t);
	const stem = `M${base[0]} ${base[1]}C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${head[0]} ${head[1]}`;

	// Thorns: small hooked spurs, alternating sides up the stem.
	const thorns = [];
	let side = flip;
	for (const t of [0.16, 0.34, 0.5, 0.7].filter(() => rand() < 0.8)) {
		const p = at(t + between(-0.03, 0.03));
		thorns.push({ t, transform: `translate(${r1(p.x)} ${r1(p.y)}) rotate(${r1(p.angle)}) scale(1 ${side})` });
		side = -side;
	}

	// Leaves: a sprig of three or five serrated leaflets on a stalk.
	const leaves = [];
	side = -flip;
	const sprigs = rand() < 0.55 ? [0.28, 0.58] : [between(0.36, 0.5)];
	for (const t of sprigs) {
		const p = at(t);
		const reach = between(19, 23);
		const angle = p.angle + side * between(55, 70);
		const big = leaflet(between(10, 11.5), between(3.6, 4.2), 7);
		const small = leaflet(between(7.5, 8.5), between(2.8, 3.3), 6);
		const parts = [`M0 0Q${r1(reach / 2)} ${r1(side * -1.4)} ${r1(reach)} 0`];
		const place = (lf, x, a) => parts.push(...[lf.outline, lf.rib].map((d) => ({ d, transform: `translate(${r1(x)} ${r1(side * -0.04 * x)}) rotate(${r1(a)})` })));
		place(big, reach, side * -4);
		place(small, reach * 0.62, -40);
		place(small, reach * 0.62, 44);
		if (rand() < 0.5) {
			place(small, reach * 0.28, -46);
			place(small, reach * 0.28, 50);
		}
		leaves.push({ t, x: r1(p.x), y: r1(p.y), angle: r1(angle), parts });
		side = -side;
	}

	return {
		stem,
		thorns,
		leaves,
		bloom: { x: head[0], y: head[1], tilt: r1(flip * between(-4, 12)), flip, size: r1(between(1.22, 1.32)), parts: rose(rand) }
	};
}

const THORN = 'M-2.4 0Q0.4 -0.5 2.8 -3.8Q1.8 -0.8 2.4 0';

// `fill`: true fills the stroked shape with paper so it hides what is behind; a string is a
// closing suffix for a fill-only shape, so the line that closes it is never drawn.
function stroke(d, w, local, { fill = false, transform = '' } = {}) {
	if (local <= 0) return '';
	const t = transform ? ` transform="${transform}"` : '';
	const opacity = ` class="fill" fill-opacity="${r1(smooth(local * 1.6) * 10) / 10}"`;
	const dash = local < 1 ? ` pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${(1 - local).toFixed(3)}"` : '';
	const shape = typeof fill === 'string' ? `<path d="${d}${fill}"${t}${opacity} stroke="none"/>` : '';
	return `${shape}<path d="${d}"${t}${fill === true ? opacity : ' fill="none"'} stroke-width="${w}"${dash}/>`;
}

export function draw(plant, p, f = 0) {
	const out = [`<path d="M40 ${SOIL + 0.5}C50 ${SOIL - 0.6} 70 ${SOIL - 0.6} 80 ${SOIL + 0.5}" fill="none" stroke-width="0.9" class="soil"/>`];
	const stemAt = clamp(p / STEM_END);
	out.push(stroke(plant.stem, 1.15, stemAt));

	for (const thorn of plant.thorns) out.push(stroke(THORN, 0.75, clamp((p - thorn.t * STEM_END) / 0.05), { fill: true, transform: thorn.transform }));

	for (const leaf of plant.leaves) {
		const local = clamp((p - leaf.t * STEM_END) / 0.16);
		if (local <= 0) continue;
		const unfurl = 0.35 + 0.65 * smooth(local);
		out.push(`<g transform="translate(${leaf.x} ${leaf.y}) rotate(${r1(leaf.angle - (1 - smooth(local)) * 25)}) scale(${unfurl.toFixed(3)})">`);
		leaf.parts.forEach((part, i) => {
			const own = clamp(local * 1.5 - i * 0.05);
			out.push(typeof part === 'string' ? stroke(part, 0.9, own) : stroke(part.d, i % 2 ? 0.8 : 0.55, own, { fill: i % 2 === 1, transform: part.transform }));
		});
		out.push('</g>');
	}

	// The bloom swells from a bud as it draws, then lifts a touch when the reader finishes.
	const b = plant.bloom;
	const opening = clamp((p - STEM_END) / (1 - STEM_END));
	const scale = b.size * (0.45 + 0.55 * smooth(opening * 1.25)) * (1 + 0.06 * Math.sin(Math.PI * smooth(f)));
	out.push(`<g transform="translate(${b.x} ${b.y}) rotate(${b.tilt}) scale(${(b.flip * scale).toFixed(3)} ${scale.toFixed(3)})">`);
	for (const part of b.parts) {
		const local = clamp((opening - part.at) / part.span);
		const transform = part.swing ? `rotate(${r1(part.swing * (1 - smooth(local)))})` : '';
		out.push(stroke(part.d, r1(part.w * 0.85 * 100) / 100, local, { fill: part.fill, transform }));
	}
	out.push('</g>');
	return out.join('');
}
