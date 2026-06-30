#!/usr/bin/env python3
"""Regenerate all TidyTuesday batch articles with the v2 Artometrics engine."""

from __future__ import annotations

import importlib.util
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from artometrics_engine import PREMIUM_SLUGS  # noqa: E402

_gen_path = ROOT / "scripts" / "generate-tidytuesday-articles.py"
_spec = importlib.util.spec_from_file_location("gen_tt", _gen_path)
_gen = importlib.util.module_from_spec(_spec)
sys.modules["gen_tt"] = _gen
assert _spec.loader is not None
_spec.loader.exec_module(_gen)
DATASETS = _gen.DATASETS


def regenerate_one(spec) -> bool:
    if spec.slug in PREMIUM_SLUGS:
        print(f"SKIP premium {spec.slug}")
        return True
    cmd = [
        sys.executable,
        str(ROOT / "scripts" / "artometrics_engine.py"),
        spec.slug,
        "--title",
        spec.title,
        "--tt-date",
        spec.tt_date,
        "--tags",
        ",".join(spec.tags),
    ]
    if spec.csv_name:
        cmd.extend(["--csv-name", spec.csv_name])
    if spec.csv_sep:
        cmd.extend(["--csv-sep", spec.csv_sep])
    result = subprocess.run(cmd, cwd=str(ROOT), capture_output=True, text=True)
    line = (result.stdout or result.stderr or "").strip().splitlines()
    if line:
        print(line[-1])
    elif result.returncode != 0:
        print(f"FAIL {spec.slug} (exit {result.returncode})")
    return result.returncode == 0


def main() -> None:
    ok = fail = skip = 0
    for spec in DATASETS:
        if spec.slug in PREMIUM_SLUGS:
            print(f"SKIP premium {spec.slug}")
            skip += 1
            continue
        if regenerate_one(spec):
            ok += 1
        else:
            fail += 1
    print(f"\nDone: {ok} regenerated, {fail} failed, {skip} skipped (premium/hand-tuned)")


if __name__ == "__main__":
    main()
