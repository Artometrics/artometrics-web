#!/usr/bin/env python3
"""Regenerate Artometrics light/dark favicons and brand marks from Chomsky.otf."""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
FONT = ROOT / "assets/fonts/Chomsky.otf"
OUT = ROOT / "public/images/brand"


def render_a(size: int, fill, bg=None, pad_ratio: float = 0.12) -> Image.Image:
    scale = 4
    canvas = size * scale
    img = Image.new("RGBA", (canvas, canvas), bg if bg else (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    lo, hi = 10, canvas
    best = None
    target = canvas * (1 - 2 * pad_ratio)
    for _ in range(24):
        mid = (lo + hi) // 2
        font = ImageFont.truetype(str(FONT), mid)
        bbox = draw.textbbox((0, 0), "A", font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
        if max(w, h) <= target:
            best = (mid, bbox)
            lo = mid + 1
        else:
            hi = mid - 1
    assert best
    font = ImageFont.truetype(str(FONT), best[0])
    bbox = best[1]
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (canvas - w) // 2 - bbox[0]
    y = (canvas - h) // 2 - bbox[1]
    draw.text((x, y), "A", font=font, fill=fill)
    return img.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    black = (28, 28, 30, 255)
    white = (250, 250, 248, 255)
    cream = (250, 250, 248, 255)
    ink = (10, 10, 10, 255)

    render_a(256, black).save(OUT / "chomsky-a-black.png")
    render_a(256, white).save(OUT / "chomsky-a-white.png")

    for size in (16, 32, 48, 64, 128, 180, 192, 512):
        render_a(size, black).save(OUT / f"favicon-light-{size}.png")
        render_a(size, white).save(OUT / f"favicon-dark-{size}.png")

    render_a(32, black, bg=(255, 255, 255, 255)).save(OUT / "favicon-light-solid-32.png")
    render_a(32, white, bg=ink).save(OUT / "favicon-dark-solid-32.png")
    render_a(180, black, bg=cream).save(ROOT / "public/apple-touch-icon.png")
    render_a(192, (192, 57, 43, 255), bg=cream).save(OUT / "chomsky-a-192.png")
    render_a(512, black, bg=cream).save(OUT / "chomsky-a.png")
    render_a(512, white, bg=ink).save(OUT / "chomsky-a-dark.png")

    render_a(32, black).save(ROOT / "public/favicon-32x32.png")
    render_a(16, black).save(ROOT / "public/favicon-16x16.png")
    render_a(48, black).save(ROOT / "public/favicon-48x48.png")
    render_a(32, black).save(ROOT / "assets/images/favicon.png")
    render_a(1024, black, bg=cream).save(ROOT / "assets/images/icon.png")
    render_a(1024, black, bg=cream).save(ROOT / "assets/images/android-icon-foreground.png")
    render_a(1024, (255, 255, 255, 255)).save(ROOT / "assets/images/android-icon-monochrome.png")
    Image.new("RGBA", (1024, 1024), cream).save(ROOT / "assets/images/android-icon-background.png")
    render_a(512, black, bg=cream).save(ROOT / "assets/images/splash-icon.png")

    ico = render_a(32, black, bg=(255, 255, 255, 255))
    ico.save(
        ROOT / "public/favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    print(f"Wrote favicons under {OUT}")


if __name__ == "__main__":
    main()
