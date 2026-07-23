#!/usr/bin/env bash
# Print a green/red inventory of the Artometrics factory toolchain.
set -euo pipefail

ok() { printf '  ✓ %s\n' "$*"; }
bad() { printf '  ✗ %s\n' "$*"; }
warn() { printf '  ~ %s\n' "$*"; }

need() {
  local bin="$1"
  local label="${2:-$1}"
  if command -v "$bin" >/dev/null 2>&1; then
    ok "$label — $($bin --version 2>&1 | head -1 | tr -d '\r')"
  else
    bad "$label — missing (run: npm run setup:pipeline)"
  fi
}

echo "== Artometrics environment doctor =="
echo
echo "Core CLIs"
need node Node
need npm
need python3 Python
need R
need Rscript
need quarto Quarto
need pandoc Pandoc
need ffmpeg FFmpeg
need convert ImageMagick
need gs Ghostscript
need google-chrome Chrome

echo
echo "Cloud / product CLIs"
for bin in netlify supabase stripe gh; do
  if command -v "$bin" >/dev/null 2>&1; then
    ok "$bin — $($bin --version 2>&1 | head -1)"
  else
    warn "$bin — not installed (optional until hookup session)"
  fi
done

echo
echo "Python chart / media packages"
python3 - <<'PY'
pkgs = [
  ("pandas", "pandas"),
  ("plotly", "plotly"),
  ("kaleido", "kaleido"),
  ("requests", "requests"),
  ("PIL", "Pillow"),
  ("bs4", "beautifulsoup4"),
  ("markdown", "markdown"),
  ("yaml", "PyYAML"),
  ("weasyprint", "weasyprint"),
  ("ebooklib", "ebooklib"),
  ("elevenlabs", "elevenlabs"),
]
for mod, label in pkgs:
  try:
    m = __import__(mod)
    ver = getattr(m, "__version__", "ok")
    print(f"  ✓ {label} — {ver}")
  except Exception:
    print(f"  ✗ {label} — missing (pip3 install -r requirements.txt)")
PY

echo
echo "R chart packages"
if command -v Rscript >/dev/null 2>&1; then
  Rscript -e '
pkgs <- c("tidyverse","ggplot2","plotly","ragg","showtext","htmlwidgets","jsonlite","ggrepel","ggridges","Lahman")
for (p in pkgs) {
  ok <- requireNamespace(p, quietly = TRUE)
  cat(sprintf("  %s %s\n", if (ok) "✓" else "✗", p))
}
' 2>/dev/null || bad "Rscript failed while probing packages"
else
  bad "Rscript missing — cannot probe R packages"
fi

echo
echo "Node / Expo"
if [[ -d node_modules/expo ]]; then
  ok "node_modules/expo present"
else
  bad "node_modules missing — run npm install"
fi
if [[ -f .env ]]; then
  ok ".env present (secrets local)"
else
  warn ".env missing — copy from .env.example for backend hookup"
fi

echo
echo "MCP / integrations (manual auth in Cursor)"
warn "Higgsfield — Cursor MCP (banners, reels, explainers, voice)"
warn "Supabase — env keys + migrations (auth, media)"
warn "Netlify — site link + env + functions"
warn "Stripe — prices + webhook (membership)"
warn "ElevenLabs — API key or Higgsfield voice tools"
warn "Notion / Figma — Cursor MCP when you add those servers"
warn "Buffer — social schedule after account exists"

echo
echo "Done. Fix ✗ rows first, then open docs/BACKEND_HOOKUP_SESSION.md"
