#!/usr/bin/env bash
# Idempotent installer for the Artometrics article pipeline:
# system R + Quarto, CRAN chart packages, and Python chart deps.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

log() { printf '\n==> %s\n' "$*"; }

need_cmd() { command -v "$1" >/dev/null 2>&1; }

install_apt_deps() {
  if ! need_cmd apt-get; then
    log "apt-get not found; skipping system package install"
    return 0
  fi

  log "Installing apt packages (R, native libs, pandoc)"
  sudo DEBIAN_FRONTEND=noninteractive apt-get update -qq
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
    r-base \
    r-base-dev \
    pandoc \
    imagemagick \
    ghostscript \
    fonts-dejavu-core \
    fonts-liberation \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libfontconfig1-dev \
    libfreetype6-dev \
    libharfbuzz-dev \
    libfribidi-dev \
    libpng-dev \
    libtiff-dev \
    libjpeg-dev \
    libwebp-dev \
    libuv1-dev \
    libsass-dev \
    libgit2-dev \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf-2.0-0 \
    libffi-dev \
    shared-mime-info \
    pkg-config
}

install_quarto() {
  if need_cmd quarto; then
    log "Quarto already installed: $(quarto --version)"
    return 0
  fi

  log "Installing Quarto CLI"
  local version deb
  version="$(curl -fsSL https://api.github.com/repos/quarto-dev/quarto-cli/releases/latest \
    | python3 -c 'import sys, json; print(json.load(sys.stdin)["tag_name"].lstrip("v"))')"
  deb="/tmp/quarto-${version}-linux-amd64.deb"
  curl -fsSL -o "$deb" \
    "https://github.com/quarto-dev/quarto-cli/releases/download/v${version}/quarto-${version}-linux-amd64.deb"
  sudo DEBIAN_FRONTEND=noninteractive dpkg -i "$deb" || sudo apt-get install -f -y -qq
}

print_banner() {
  log "Pipeline toolchain"
  if need_cmd R; then R --version | head -1; else echo "R: missing"; fi
  if need_cmd quarto; then echo "quarto $(quarto --version)"; else echo "quarto: missing"; fi
  python3 - <<'PY'
pkgs = ["pandas", "plotly", "kaleido", "requests", "PIL"]
for name in pkgs:
    try:
        mod = __import__(name if name != "PIL" else "PIL")
        ver = getattr(mod, "__version__", "?")
        label = "Pillow" if name == "PIL" else name
        print(f"{label}: {ver}")
    except Exception:
        label = "Pillow" if name == "PIL" else name
        print(f"{label}: missing")
PY
  if need_cmd Rscript; then
    Rscript -e 'pkgs <- c("tidyverse","plotly","ragg","showtext"); cat(paste(sprintf("%s: %s", pkgs, ifelse(vapply(pkgs, requireNamespace, quietly=TRUE, FUN.VALUE=logical(1)), "ok", "MISSING")), collapse="\n"), "\n")'
  fi
}

install_apt_deps
install_quarto

if need_cmd Rscript; then
  log "Installing R packages (npm run setup:r)"
  npm run setup:r
else
  echo "Rscript missing; cannot run setup:r" >&2
  exit 1
fi

log "Installing Python packages (npm run setup:python)"
npm run setup:python

# Kaleido 1.x needs a Chrome binary for PNG export
export PATH="${HOME}/.local/bin:${PATH}"
if need_cmd kaleido_get_chrome; then
  log "Ensuring Chrome for Kaleido PNG export"
  kaleido_get_chrome >/dev/null
fi

# Product CLIs (Netlify / Supabase / Stripe) — best effort, non-fatal
if [[ -x "$ROOT/scripts/setup-product-clis.sh" ]]; then
  log "Installing product CLIs (best effort)"
  bash "$ROOT/scripts/setup-product-clis.sh" || true
fi

print_banner
log "setup-pipeline complete"
log "Next: npm run doctor && see docs/BACKEND_HOOKUP_SESSION.md"
