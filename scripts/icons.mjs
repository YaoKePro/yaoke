// Render PNG icons from the yk cube: node scripts/icons.mjs
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';

const CUBE = 'M24 5 L40.5 14.5 L40.5 33.5 L24 43 L7.5 33.5 L7.5 14.5 Z M24 5 L24 43 M24 24 L7.5 14.5 M24 24 L40.5 14.5 M24 24 L40.5 33.5';

const svg = (size, pad, background) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${2 - pad} ${2 - pad} ${44 + pad * 2} ${44 + pad * 2}">
  ${background ? `<rect x="${2 - pad}" y="${2 - pad}" width="${44 + pad * 2}" height="${44 + pad * 2}" fill="#fdfdfc"/>` : ''}
  <path d="${CUBE}" fill="none" stroke="#18181b" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

for (const [file, size, pad, background] of [
	['static/favicon.png', 32, 0, false],
	['static/apple-touch-icon.png', 180, 9, true]
]) {
	const png = new Resvg(svg(size, pad, background)).render().asPng();
	writeFileSync(file, png);
	console.log(file, png.length, 'bytes');
}
