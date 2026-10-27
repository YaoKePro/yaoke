"""Generate the reading mosaic shapes for every post into src/lib/data/mosaics.json.

Run after adding a post: python3 scripts/mosaics.py
Each post's slug seeds its own tiles, so a post keeps the same mosaic forever.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from mosaic import composition  # noqa: E402


def engineering_slug(path):
    return re.sub(r'^-|-$', '', re.sub(r'[^a-z0-9]+', '-', path.stem.lower()))


slugs = [p['slug'] for p in json.loads((ROOT / 'src/content/human/posts.json').read_text())]
for path in sorted((ROOT / 'src/content/blogs').rglob('*.svx')):
    if any(part in ('Templates', '.archive', '.obsidian') for part in path.parts):
        continue
    slugs.append(engineering_slug(path))

out = {}
for slug in slugs:
    out[slug] = [
        {k: (round(v, 3) if isinstance(v, float) else v) for k, v in tile.items() if k in ('d', 'colour', 'x', 'y', 'rotation', 'cx', 'cy')}
        for tile in composition(slug)
    ]
(ROOT / 'src/lib/data/mosaics.json').write_text(json.dumps(out, separators=(',', ':')) + '\n')
print(f'{len(out)} mosaics written')
