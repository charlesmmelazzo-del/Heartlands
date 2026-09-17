"""Slice the ChatGPT sprite sheets into transparent, phone-sized WebP files.

Usage (needs Pillow + numpy):
    python scripts/slice_sprites.py "<folder with hearthlands-*.png>" public/art

Sheets are magenta (#FF00FF) backgrounds split by bright green (#00FF00) lines.
Cells are read left-to-right, top-to-bottom and named from SHEETS below.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

SHEETS = {
    "hearthlands-01-resources.png": [
        "barley", "flax", "mutton", "peat",
        "wicker", "loam", "tallow", "brine",
        "turnip", "gossip", "respect", "card_back",
    ],
    "hearthlands-02-buildings.png": [
        "cottage", "granary", "cart_road", "mill",
        "well", "drover", "tithe_barn", "fence",
        "cart", "scarecrow", "hedge", "chapel",
    ],
    "hearthlands-03-characters.png": [
        "reeve", "assessor", "tinker", "goose",
        "ox", "bard", "idiot", "magistrate",
        "witch", "pilgrim", "prophet", "rat_king",
    ],
    "hearthlands-04-tokens.png": [
        "harvest_die", "favor", "weather_cube", "almanac",
        "ledger", "grudge", "debt", "blight",
        "wax_seal", "rumor", "plague", "hourglass",
    ],
    "hearthlands-05-terrain.png": [
        "barley_rise", "flax_fields", "mutton_downs",
        "peat_bog", "wicker_marsh", "loamfields",
        "brine_flats", "tallow_mines", "the_unmapped",
    ],
    "hearthlands-06-pawns.png": [
        "pawn_red", "pawn_blue", "pawn_cream",
        "pawn_orange", "pawn_green", "pawn_beige",
    ],
    "hearthlands-07-extras.png": [
        "rulebook", "quill", "scroll",
        "shot_glass", "laurel", "compass",
    ],
}

# Largest side in pixels. Sprites are drawn at up to ~72 CSS px, so 216 covers 3x phone screens.
SPRITE_PX = 216
LOGO_WIDTH = 1080


def green_mask(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    return (g > 170) & (r < 120) & (b < 120)


def bands(is_line):
    """Return (start, end) spans of non-line runs along one axis."""
    spans, start = [], None
    for i, line in enumerate(is_line):
        if not line and start is None:
            start = i
        elif line and start is not None:
            spans.append((start, i))
            start = None
    if start is not None:
        spans.append((start, len(is_line)))
    return [s for s in spans if s[1] - s[0] > 40]


def dilate(mask):
    out = mask.copy()
    out[1:] |= mask[:-1]
    out[:-1] |= mask[1:]
    out[:, 1:] |= mask[:, :-1]
    out[:, :-1] |= mask[:, 1:]
    return out


def cut_out(rgb):
    """Magenta background -> transparent, with soft, de-spilled edges."""
    a = rgb.astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    magenta = np.minimum(r, b) - g  # 255 for pure background, ~0 for neutral art
    greenish = green_mask(rgb)

    passable = (magenta > 70) | greenish
    bg = (magenta > 185) | greenish  # pure background anywhere, incl. enclosed pockets
    edge = np.zeros_like(bg)
    edge[0, :] = edge[-1, :] = edge[:, 0] = edge[:, -1] = True
    bg |= edge & passable
    while True:
        grown = dilate(bg) & passable
        grown |= bg
        if (grown == bg).all():
            break
        bg = grown

    alpha = np.where(bg, 0.0, 1.0)
    # Soften the 2px rim next to the background by how magenta it still is.
    rim = dilate(dilate(bg)) & ~bg
    rim_alpha = np.clip(1.0 - (magenta - 25.0) / 150.0, 0.0, 1.0)
    alpha = np.where(rim, np.minimum(alpha, rim_alpha), alpha)

    # De-spill: pull leftover magenta tint out of pixels near the edge.
    near = dilate(dilate(dilate(rim))) & ~bg
    excess = np.clip(magenta, 0, None)
    fix = near & (excess > 0)
    a[..., 0] = np.where(fix, r - excess, r)
    a[..., 2] = np.where(fix, b - excess, b)

    out = np.dstack([np.clip(a, 0, 255), alpha * 255]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def trim_and_fit(im, max_side=None, width=None, pad=4):
    box = im.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
    im = im.crop(box)
    w, h = im.size
    scale = (width / w) if width else (max_side / max(w, h))
    size = (max(1, round(w * scale)), max(1, round(h * scale)))
    im = im.convert("RGBa").resize(size, Image.LANCZOS).convert("RGBA")
    canvas = Image.new("RGBA", (size[0] + pad * 2, size[1] + pad * 2), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad))
    return canvas


def slice_sheet(path, names, out_dir):
    rgb = np.array(Image.open(path).convert("RGB"))
    g = green_mask(rgb)
    cols = bands(g.mean(axis=0) > 0.5)
    rows = bands(g.mean(axis=1) > 0.5)
    cells = [(y0, y1, x0, x1) for (y0, y1) in rows for (x0, x1) in cols]
    if len(cells) != len(names):
        raise SystemExit(f"{path.name}: found {len(rows)}x{len(cols)} cells, expected {len(names)}")
    for name, (y0, y1, x0, x1) in zip(names, cells):
        inset = 4
        cell = rgb[y0 + inset : y1 - inset, x0 + inset : x1 - inset]
        sprite = trim_and_fit(cut_out(cell), max_side=SPRITE_PX)
        sprite.save(out_dir / f"{name}.webp", "WEBP", quality=86, method=6)
    print(f"{path.name}: {len(names)} sprites")


def main():
    src, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
    out_dir.mkdir(parents=True, exist_ok=True)
    for file, names in SHEETS.items():
        slice_sheet(src / file, names, out_dir)
    logo = cut_out(np.array(Image.open(src / "hearthlands-logo.png").convert("RGB")))
    trim_and_fit(logo, width=LOGO_WIDTH, pad=0).save(out_dir / "logo.webp", "WEBP", quality=88, method=6)
    print("logo done")


if __name__ == "__main__":
    main()
