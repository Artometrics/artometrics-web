#!/usr/bin/env python3
"""Create editorial hero images for reports that reference missing hero.png files."""

from __future__ import annotations

import re
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"
HERO_ROOT = ROOT / "public" / "images" / "content" / "articles"

WIDTH = 1920
HEIGHT = 1080
BG = "#F4F1EA"
INK = "#1C1C1E"
MUTED = "#6B6B6B"
ACCENT = "#C0392B"
RULE = "#DEDAD1"


def parse_frontmatter(md: str) -> dict[str, str]:
    if not md.startswith("---"):
        return {}
    end = md.find("\n---", 3)
    block = md[3:end]
    data: dict[str, str] = {}
    for line in block.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip('"')
    return data


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def wrap_title(title: str, width: int = 22) -> list[str]:
    clean = re.sub(r"\s+", " ", title).strip()
    lines = textwrap.wrap(clean, width=width)
    return lines or [clean]


def desk_label(tags: str) -> str:
    for tag in re.findall(r"[a-z]+", tags.lower()):
        if tag in {"culture", "atlas", "history", "persona", "power"}:
            return tag.upper()
    return "REPORT"


def render_hero(title: str, description: str, tags: str, out_path: Path) -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(image)

    draw.rectangle((0, 0, WIDTH, 10), fill=ACCENT)
    draw.rectangle((96, 120, 96 + 6, HEIGHT - 120), fill=ACCENT)
    draw.line((96, HEIGHT - 220, WIDTH - 96, HEIGHT - 220), fill=RULE, width=2)

    label_font = load_font(34, bold=True)
    title_font = load_font(92, bold=True)
    body_font = load_font(34)
    meta_font = load_font(28)

    draw.text((140, 150), desk_label(tags), fill=ACCENT, font=label_font)

    y = 250
    for line in wrap_title(title):
        draw.text((140, y), line, fill=INK, font=title_font)
        y += 104

    for line in textwrap.wrap(description, width=58)[:3]:
        draw.text((140, y + 36), line, fill=MUTED, font=body_font)
        y += 48

    draw.text((140, HEIGHT - 170), "Artometrics", fill=INK, font=meta_font)
    draw.text((140, HEIGHT - 120), "Data report", fill=MUTED, font=meta_font)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    image.save(out_path, format="PNG", optimize=True)


def missing_heroes() -> list[tuple[Path, dict[str, str]]]:
    missing: list[tuple[Path, dict[str, str]]] = []
    for md_path in sorted(BLOG_DIR.glob("*.md")):
        meta = parse_frontmatter(md_path.read_text())
        hero = meta.get("heroImage", "")
        if not hero.startswith("/images/content/articles/"):
            continue
        hero_path = HERO_ROOT / hero.split("/articles/", 1)[1]
        if not hero_path.exists():
            missing.append((md_path, meta))
    return missing


def main() -> None:
    items = missing_heroes()
    if not items:
        print("No missing hero images found")
        return

    for md_path, meta in items:
        slug = meta.get("slug", md_path.stem)
        title = meta.get("title", slug.replace("-", " ").title())
        description = meta.get("description", "An Artometrics data report.")
        tags = meta.get("tags", "")
        out_path = HERO_ROOT / slug / "hero.png"
        render_hero(title, description, tags, out_path)
        print(f"Wrote {out_path.relative_to(ROOT)}")

    print(f"Backfilled {len(items)} hero images")


if __name__ == "__main__":
    main()
