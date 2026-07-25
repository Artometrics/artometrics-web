#!/usr/bin/env bash
# Set EAS project secrets from local .env (public vars only).
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ ! -f .env ]]; then
  echo "Missing .env — copy from .env.example and fill values first."
  exit 1
fi
set -a
# shellcheck disable=SC1091
source .env
set +a

require() { [[ -n "${!1:-}" ]] || { echo "Missing $1 in .env"; exit 1; }; }
require EXPO_PUBLIC_SITE_URL
require EXPO_PUBLIC_SUPABASE_URL
require EXPO_PUBLIC_SUPABASE_ANON_KEY

echo "Setting EAS secrets for $(npx eas-cli whoami)…"
npx eas-cli secret:create --name EXPO_PUBLIC_SITE_URL --value "$EXPO_PUBLIC_SITE_URL" --scope project --force
npx eas-cli secret:create --name EXPO_PUBLIC_SUPABASE_URL --value "$EXPO_PUBLIC_SUPABASE_URL" --scope project --force
npx eas-cli secret:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "$EXPO_PUBLIC_SUPABASE_ANON_KEY" --scope project --force
if [[ -n "${EXPO_PUBLIC_GA_ID:-}" ]]; then
  npx eas-cli secret:create --name EXPO_PUBLIC_GA_ID --value "$EXPO_PUBLIC_GA_ID" --scope project --force
fi
echo "Done. Next: npx eas-cli build -p ios --profile production"
