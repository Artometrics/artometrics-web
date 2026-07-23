#!/usr/bin/env bash
# Install product CLIs used during the backend hookup session.
# Safe to re-run. Does not require project secrets.
set -euo pipefail

log() { printf '\n==> %s\n' "$*"; }
need_cmd() { command -v "$1" >/dev/null 2>&1; }

if need_cmd apt-get; then
  log "Installing print / media apt packages"
  sudo DEBIAN_FRONTEND=noninteractive apt-get update -qq
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
    imagemagick \
    ghostscript \
    fonts-dejavu-core \
    fonts-liberation \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf-2.0-0 \
    libffi-dev \
    shared-mime-info || true
fi

log "Installing Netlify + Supabase CLIs (npm global user prefix)"
mkdir -p "$HOME/.local"
npm config set prefix "$HOME/.local"
export PATH="$HOME/.local/bin:$PATH"

npm install -g netlify-cli supabase 2>&1 | tail -20

# Stripe CLI (optional — best-effort)
if ! need_cmd stripe; then
  log "Installing Stripe CLI (best effort)"
  tmp="/tmp/stripe.tgz"
  asset="$(curl -fsSL https://api.github.com/repos/stripe/stripe-cli/releases/latest \
    | python3 -c 'import sys,json; print(next(a["browser_download_url"] for a in json.load(sys.stdin)["assets"] if a["name"].endswith("_linux_x86_64.tar.gz")))' 2>/dev/null || true)"
  if [[ -n "${asset:-}" ]] && curl -fsSL -o "$tmp" "$asset"; then
    tar -xzf "$tmp" -C /tmp
    install -m 0755 /tmp/stripe "$HOME/.local/bin/stripe" || true
  else
    echo "Stripe CLI download skipped (network or release asset name)."
  fi
fi

log "CLI versions"
export PATH="$HOME/.local/bin:$PATH"
for bin in netlify supabase stripe convert gs; do
  if need_cmd "$bin"; then
    echo "$bin: $($bin --version 2>&1 | head -1)"
  else
    echo "$bin: missing"
  fi
done

log "Add to shell: export PATH=\"\$HOME/.local/bin:\$PATH\""
log "setup-product-clis complete"
