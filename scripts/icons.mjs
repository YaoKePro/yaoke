// Render PNG icons from the yk monogram: node scripts/icons.mjs
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';

const svg = (size, pad) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${-pad} ${-pad} ${32 + pad * 2} ${32 + pad * 2}">
  <rect x="${-pad}" y="${-pad}" width="${32 + pad * 2}" height="${32 + pad * 2}" fill="#fdfdfc"/>
  <circle cx="16" cy="16" r="14.6" fill="#fdfdfc" stroke="#18181b" stroke-width="2"/>
  <text x="16" y="21" text-anchor="middle" font-family="Georgia, 'Times New Roman', 'DejaVu Serif', serif" font-size="15.5" letter-spacing="-1" fill="#18181b">yk</text>
</svg>`;

for (const [file, size, pad] of [
	['static/favicon.png', 32, 0],
	['static/apple-touch-icon.png', 180, 5]
]) {
	const png = new Resvg(svg(size, pad), { font: { loadSystemFonts: true, defaultFontFamily: 'DejaVu Serif' } }).render().asPng();
	writeFileSync(file, png);
	console.log(file, png.length, 'bytes');
}
