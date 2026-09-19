#!/usr/bin/env bash
# Symlink shared repo assets into each standalone article folder.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO_STYLES="$ROOT/styles"
SHARED_ASSETS="$ROOT/assets"

skip_dir() {
  case "$1" in
    tools | styles | assets | R | figures | outputs) return 0 ;;
    _*) return 0 ;;
    *) return 1 ;;
  esac
}

link_dir() {
  local report="$1"
  cd "$report"
  if [[ -d "$SHARED_ASSETS" ]]; then
    ln -sfn ../assets assets
  fi
  if [[ -L styles || -e styles ]]; then
    rm -rf styles
  fi
  mkdir -p styles
  cp "$REPO_STYLES/report.css" styles/report.css
}

for d in "$ROOT"/*/; do
  [[ -d "$d" ]] || continue
  base="$(basename "$d")"
  skip_dir "$base" && continue
  [[ -f "$d/_quarto.yml" ]] || continue
  link_dir "$d"
done

echo "Linked assets/ and copied styles/report.css into article folders."
