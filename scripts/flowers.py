"""Build the reading-progress drawings: public domain line art that redraws itself as you read.

For each drawing in scripts/flowers.json:
1. Fetch it from Wikimedia Commons (cached in ~/.cache/flowers-src), blank its printed labels,
   crop, and lift the lines off the paper as an alpha mask.
2. Thin the ink to centre lines and split them into strokes at ends and junctions.
3. Order the strokes so the plant seems to grow: start at the base (the densest ink near the
   bottom) and work locally, always moving to the nearest unfinished stroke, with strokes that
   reach above the highest point so far costing extra (so it climbs) and short shading strokes
   costing a little extra (so an area gets its outline before its hatching).
4. Time it: the pen draws at a steady speed and lifts briefly between strokes. Every ink pixel
   takes the time of the nearest centre-line point, so the original texture stays intact.

Writes static/flowers/<name>.png (R,G = 16-bit draw time, A = line) and src/lib/data/flowers.json.
Boxes in the manifest are fractions of the original image (left, top, right, bottom).
usage: python3 scripts/flowers.py [name ...]   Needs Pillow, numpy, scipy and scikit-image.
"""
import json, os, sys, time, urllib.parse, urllib.request
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
from skimage.morphology import skeletonize, remove_small_objects

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.expanduser('~/.cache/flowers-src')
HEIGHT = 400  # output height in pixels; the corner shows it at about 141 css pixels
N8 = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


def fetch(file):
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, file.replace('/', '_'))
    if not os.path.exists(path):
        url = 'https://commons.wikimedia.org/w/index.php?' + urllib.parse.urlencode({'title': 'Special:FilePath/' + file})
        request = urllib.request.Request(url, headers={'User-Agent': 'yaoke.pro reading art (hello@yaoke.pro)'})
        open(path, 'wb').write(urllib.request.urlopen(request).read())
        time.sleep(1)
    return Image.open(path).convert('RGB')


def ink(im, entry):
    """Blank labels, crop, and return darkness (0 paper .. 1 ink) as a float array."""
    w, h = im.size
    px = lambda b: (round(b[0] * w), round(b[1] * h), round(b[2] * w), round(b[3] * h))
    paper_colour = tuple(int(v) for v in np.median(np.asarray(im).reshape(-1, 3), axis=0))
    for b in entry.get('blank', []):
        ImageDraw.Draw(im).rectangle(px(b), fill=paper_colour)
    im = im.crop(px(entry.get('crop', [0, 0, 1, 1])))
    blue = ndimage.gaussian_filter(np.asarray(im.getchannel('B'), dtype=np.float32), 0.6)
    paper, darkest = np.percentile(blue, 60), np.percentile(blue, 0.4)
    return np.clip((paper - blue) / max(1, paper - darkest), 0, 1)


def resize(a, size):
    return np.asarray(Image.fromarray((a * 255).astype(np.uint8)).resize(size, Image.LANCZOS), dtype=np.float32) / 255


def strokes_of(skel):
    on = set(zip(*(v.tolist() for v in np.nonzero(skel))))
    neighbours = lambda p: [(p[0] + dy, p[1] + dx) for dy, dx in N8 if (p[0] + dy, p[1] + dx) in on]
    nodes = {p for p in on if len(neighbours(p)) != 2}
    used = set()

    def walk(start, nxt):
        path = [start, nxt]
        used.add(frozenset((start, nxt)))
        while path[-1] not in nodes:
            step = [q for q in neighbours(path[-1]) if frozenset((path[-1], q)) not in used and q != path[-2]]
            if not step:
                break
            used.add(frozenset((path[-1], step[0])))
            path.append(step[0])
        return path

    strokes = []
    for group in (nodes, on):  # ends and junctions first, then closed loops
        for p in group:
            for q in neighbours(p):
                if frozenset((p, q)) not in used:
                    strokes.append(walk(p, q))
    return [np.array(s, dtype=np.float32) for s in strokes if len(s) >= 3]


def order_of(strokes, lengths, work):
    # Start at the very bottom (the roots, or where the stem meets the ground), at the densest ink there.
    rows = np.nonzero((work > 0.2).sum(axis=1) > 3)[0]
    band = work[max(0, rows[-1] - work.shape[0] // 12): rows[-1] + 1]
    x = int(np.argmax(ndimage.gaussian_filter1d(band.sum(axis=0), work.shape[1] / 30)))
    pen = np.array([rows[-1], x], dtype=np.float32)
    starts = np.array([s[0] for s in strokes])
    ends = np.array([s[-1] for s in strokes])
    tops = np.array([s[:, 0].min() for s in strokes])
    penalty = np.where(lengths < 12, 18.0, np.where(lengths < 36, 6.0, 0.0)) - 0.1 * np.minimum(lengths, 80)
    # Grow upwards: strokes reaching above the highest point drawn so far cost extra, so the
    # drawing climbs from the base like a plant growing instead of starting at the bloom.
    front = float(pen[0])
    left = np.ones(len(strokes), dtype=bool)
    order = []
    while left.any():
        idx = np.nonzero(left)[0]
        d_start = np.hypot(*(starts[idx] - pen).T)
        d_end = np.hypot(*(ends[idx] - pen).T)
        climb = 1.2 * np.maximum(0, front - tops[idx])
        k = int(np.argmin(np.minimum(d_start, d_end) + penalty[idx] + climb))
        i = int(idx[k])
        # Draw each stroke from its lower end where that is close enough, so lines grow upwards.
        lower_first = starts[i][0] >= ends[i][0]
        flip = bool(d_end[k] < d_start[k]) if abs(d_end[k] - d_start[k]) > 20 else not lower_first
        order.append((i, flip))
        pen = (strokes[i][0] if flip else strokes[i][-1]).copy()
        front = min(front, float(tops[i]))
        left[i] = False
    return order


def build(entry):
    dark = ink(fetch(entry['file']), entry)
    H = HEIGHT
    W = round(H * dark.shape[1] / dark.shape[0])
    work = resize(dark, (W * 2, H * 2))
    out = resize(dark, (W, H))
    floor = entry.get("floor", 0.094)  # raise for drawings on toned or grainy paper
    alpha = np.where(out < floor, 0, np.clip((out - floor) / (1 - floor), 0, 1) ** 0.62)

    strokes = strokes_of(skeletonize(remove_small_objects(work > 0.2, max_size=10)))
    lengths = np.array([np.sum(np.hypot(*np.diff(s, axis=0).T)) for s in strokes])
    clock = np.full(work.shape, np.inf, dtype=np.float32)
    t, pen = 0.0, None
    for i, flip in order_of(strokes, lengths, work):
        s = strokes[i][::-1] if flip else strokes[i]
        if pen is not None:
            t += 0.2 * float(np.hypot(*(s[0] - pen))) + 4  # lift, travel, put down
        steps = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(s, axis=0).T))])
        for (y, x), dt in zip(s.astype(int), steps):
            clock[y, x] = min(clock[y, x], t + dt)
        t += steps[-1]
        pen = s[-1]

    # Each ink pixel takes its nearest centre-line time; output pixels take the earliest of four.
    _, (iy, ix) = ndimage.distance_transform_edt(~np.isfinite(clock), return_indices=True)
    nearest = clock[iy, ix].reshape(H, 2, W, 2).min(axis=(1, 3))
    code = np.clip(np.round(65535 * nearest / t), 0, 65535).astype(np.uint16)
    rgba = np.zeros((H, W, 4), dtype=np.uint8)
    rgba[..., 0], rgba[..., 1] = code >> 8, code & 255
    rgba[..., 3] = np.round(alpha * 255).astype(np.uint8)
    Image.fromarray(rgba, 'RGBA').save(os.path.join(ROOT, 'static/flowers', entry['name'] + '.png'), optimize=True)
    print(f"{entry['name']}: {W}x{H}, {len(strokes)} strokes")
    return W, H


manifest = json.load(open(os.path.join(ROOT, 'scripts/flowers.json'), encoding='utf-8'))
only = set(sys.argv[1:])
os.makedirs(os.path.join(ROOT, 'static/flowers'), exist_ok=True)
listing = []
for entry in manifest:
    png = os.path.join(ROOT, 'static/flowers', entry['name'] + '.png')
    if only and entry['name'] not in only and os.path.exists(png):
        W, H = Image.open(png).size
    else:
        W, H = build(entry)
    listing.append({
        'src': f"/flowers/{entry['name']}.png",
        'width': W,
        'height': H,
        'credit': entry['credit'],
        'href': 'https://commons.wikimedia.org/wiki/File:' + urllib.parse.quote(entry['file'].replace(' ', '_')),
    })
with open(os.path.join(ROOT, 'src/lib/data/flowers.json'), 'w', encoding='utf-8') as f:
    json.dump(listing, f, ensure_ascii=False, indent='\t')
    f.write('\n')
print(f'{len(listing)} drawings listed')
