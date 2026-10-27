"""Generate a stable, interlocking reading mosaic from an article's identity."""
from functools import lru_cache
import hashlib
import math
import random


def neighbours(cell):
    x, y = cell % 4, cell // 4
    return {ny * 4 + nx for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1))
            if 0 <= nx < 4 and 0 <= ny < 4}


def partition(remaining, sizes, rng):
    if not sizes:
        return [] if not remaining else None
    # Grow connected candidates around the first unfilled cell, then find an exact fit.
    candidates = {frozenset({min(remaining)})}
    for _ in range(sizes[0] - 1):
        candidates = {shape | {cell} for shape in candidates
                      for cell in set().union(*(neighbours(c) for c in shape)) & remaining - shape}
    candidates = sorted(candidates, key=lambda shape: tuple(sorted(shape)))
    rng.shuffle(candidates)
    for shape in candidates:
        rest = partition(remaining - shape, sizes[1:], rng)
        if rest is not None:
            return [shape, *rest]
    return None


def outline(cells):
    # Cancel shared cell edges so each tile has a single clean outer contour.
    edges = set()
    for cell in cells:
        x, y = cell % 4, cell // 4
        corners = [(x, y), (x + 1, y), (x + 1, y + 1), (x, y + 1)]
        for start, end in zip(corners, corners[1:] + corners[:1]):
            if (end, start) in edges:
                edges.remove((end, start))
            else:
                edges.add((start, end))
    following = dict(edges)
    first = min(following)
    points, point = [first], following[first]
    while point != first:
        points.append(point)
        point = following[point]
    return 'M' + 'L'.join(f'{x * 28} {y * 28}' for x, y in points) + 'Z'


@lru_cache(maxsize=None)
def composition(identity):
    # Version the seed namespace if the design algorithm is ever deliberately replaced.
    seed = int.from_bytes(hashlib.sha256(f'mosaic-v1:{identity}'.encode()).digest(), 'big')
    rng = random.Random(seed)
    sizes = list(rng.choice(((2, 2, 3, 3, 3, 3), (2, 2, 2, 3, 3, 4))))
    rng.shuffle(sizes)
    tiles = partition(set(range(16)), sizes, rng)
    if tiles is None:
        raise ValueError(f'Could not generate an interlocking mosaic for {identity}')
    rng.shuffle(tiles)
    hue = rng.choice((25, 45, 140, 175, 215, 305)) + rng.uniform(-10, 10)
    lightness = [33, 43, 52, 61, 70, 78]
    rng.shuffle(lightness)
    result = []
    for cells, light in zip(tiles, lightness):
        cx = sum((cell % 4 + .5) * 28 for cell in cells) / len(cells)
        cy = sum((cell // 4 + .5) * 28 for cell in cells) / len(cells)
        angle = (math.atan2(cy - 56, cx - 56) if (cx, cy) != (56, 56)
                 else rng.uniform(0, math.tau)) + rng.uniform(-.3, .3)
        distance = rng.uniform(38, 50)
        result.append(dict(
            cells=tuple(sorted(cells)), d=outline(cells), cx=cx, cy=cy,
            x=math.cos(angle) * distance, y=math.sin(angle) * distance,
            rotation=rng.choice((-1, 1)) * rng.uniform(12, 25),
            colour=f'hsl({(hue + rng.uniform(-8, 8)) % 360:.1f} {rng.uniform(22, 34):.1f}% {light}%)',
        ))
    return result


def mosaic_svg(identity):
    paths = []
    for tile in composition(identity):
        paths.append(
            f'<path d="{tile["d"]}" fill="{tile["colour"]}" stroke-linejoin="round" '
            f'data-x="{tile["x"]:.3f}" data-y="{tile["y"]:.3f}" '
            f'data-rotation="{tile["rotation"]:.3f}" data-cx="{tile["cx"]:.3f}" data-cy="{tile["cy"]:.3f}"/>'
        )
    return ('<svg viewBox="0 0 260 260" aria-hidden="true" focusable="false">'
            '<rect class="mosaic-bed" x="69" y="69" width="122" height="122" rx="9"/>'
            f'<g class="mosaic-pieces">{"".join(paths)}</g></svg>')
