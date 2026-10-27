// A line-art flower grown from a seed (a post's slug), so every page gets its own.
// Everything is in a 120 × 120 box: ground at the bottom, stem curving up to the head.

const PALETTE = ['#c4566b', '#d26a45', '#c3922a', '#7d63b8', '#4f7fbf', '#b0508f', '#3f8f86', '#d0587e'];
const SHAPES = ['round', 'pointed', 'notched', 'daisy'];
const GROUND = 112;

// Seed namespace: bump the version only to deliberately regrow every flower.
function random(seed) {
	let h = 2166136261;
	for (const c of `flower-v1:${seed}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
	return () => {
		h = (h + 0x6d2b79f5) | 0;
		let t = Math.imul(h ^ (h >>> 15), 1 | h);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const r1 = (n) => Math.round(n * 10) / 10;

function cubic(p0, p1, p2, p3, t) {
	const u = 1 - t;
	const at = (k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k];
	const slope = (k) => 3 * u * u * (p1[k] - p0[k]) + 6 * u * t * (p2[k] - p1[k]) + 3 * t * t * (p3[k] - p2[k]);
	return { x: at(0), y: at(1), angle: (Math.atan2(slope(1), slope(0)) * 180) / Math.PI };
}

// One petal pointing up from the origin, `length` long and about `width` wide at its widest.
function petal(shape, length, width) {
	const [L, w] = [r1(length), r1(width)];
	if (shape === 'pointed')
		return `M0 0C${-w} ${r1(-L * 0.4)} ${r1(-w * 0.45)} ${r1(-L * 0.85)} 0 ${-L}C${r1(w * 0.45)} ${r1(-L * 0.85)} ${w} ${r1(-L * 0.4)} 0 0Z`;
	if (shape === 'notched')
		return `M0 0C${-w} ${r1(-L * 0.4)} ${-w} ${-L} ${r1(-w * 0.35)} ${-L}Q0 ${-L} 0 ${r1(-L * 0.86)}Q0 ${-L} ${r1(w * 0.35)} ${-L}C${w} ${-L} ${w} ${r1(-L * 0.4)} 0 0Z`;
	return `M0 0C${-w} ${r1(-L * 0.35)} ${r1(-w * 0.9)} ${-L} 0 ${-L}C${r1(w * 0.9)} ${-L} ${w} ${r1(-L * 0.35)} 0 0Z`;
}

export function flower(seed) {
	const rand = random(seed);
	const between = (a, b) => a + (b - a) * rand();
	const pick = (list) => list[Math.floor(rand() * list.length)];

	const base = [60, GROUND];
	const head = [r1(60 + between(-12, 12)), r1(between(40, 48))];
	const c1 = [60 + between(-16, 16), GROUND - between(20, 32)];
	const c2 = [head[0] + between(-18, 18), head[1] + between(22, 32)];
	const stem = `M${base[0]} ${base[1]}C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${head[0]} ${head[1]}`;

	// Leaves sit along the stem, alternating sides, and unfurl as the stem passes them.
	const leaves = [];
	let side = rand() < 0.5 ? -1 : 1;
	const count = 1 + Math.floor(rand() * 3);
	for (let i = 0; i < count; i++) {
		const t = 0.18 + (0.5 * (i + between(0.2, 0.8))) / count;
		const at = cubic(base, c1, c2, head, t);
		const L = between(13, 21);
		const W = L * between(0.28, 0.4);
		leaves.push({
			t,
			x: r1(at.x),
			y: r1(at.y),
			angle: r1(at.angle + side * between(45, 70)),
			d: `M0 0Q${r1(L / 2)} ${r1(-W)} ${r1(L)} 0Q${r1(L / 2)} ${r1(W)} 0 0Z`,
			vein: `M2 0L${r1(L * 0.75)} 0`
		});
		side = -side;
	}

	const shape = pick(SHAPES);
	const n = shape === 'daisy' ? pick([10, 12, 14]) : pick([5, 5, 6, 7, 8]);
	const length = shape === 'daisy' ? between(20, 24) : between(16, 21);
	const width = shape === 'daisy' ? length * 0.2 : length * between(0.38, 0.55);
	const offset = rand() * 360;
	const centre = r1(between(3.2, 5.2));
	const outer = petal(shape === 'daisy' ? 'round' : shape, length, width);
	const petals = Array.from({ length: n }, (_, i) => ({ d: outer, angle: r1(offset + (i * 360) / n), layer: 0 }));
	if (shape !== 'daisy' && rand() < 0.45) {
		const inner = petal(shape, length * 0.58, width * 0.7);
		for (let i = 0; i < n; i++) petals.push({ d: inner, angle: r1(offset + ((i + 0.5) * 360) / n), layer: 1 });
	}

	return {
		stem,
		leaves,
		head: { x: head[0], y: head[1], tilt: r1(between(-10, 10)) },
		petals,
		count: n,
		centre,
		colour: pick(PALETTE)
	};
}
