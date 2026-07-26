#!/usr/bin/env bash
# Set EAS production env from local .env (public client vars only).
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

echo "Setting EAS production env for $(npx eas-cli whoami 2>/dev/null || echo 'unknown')…"
npx eas-cli env:set EXPO_PUBLIC_SITE_URL --value "$EXPO_PUBLIC_SITE_URL" --environment production --visibility secret --non-interactive || \
  npx eas-cli env:set EXPO_PUBLIC_SITE_URL --value "$EXPO_PUBLIC_SITE_URL" --environment production --visibility secret
npx eas-cli env:set EXPO_PUBLIC_SUPABASE_URL --value "$EXPO_PUBLIC_SUPABASE_URL" --environment production --visibility secret --non-interactive || \
  npx eas-cli env:set EXPO_PUBLIC_SUPABASE_URL --value "$EXPO_PUBLIC_SUPABASE_URL" --environment production --visibility secret
npx eas-cli env:set EXPO_PUBLIC_SUPABASE_ANON_KEY --value "$EXPO_PUBLIC_SUPABASE_ANON_KEY" --environment production --visibility secret --non-interactive || \
  npx eas-cli env:set EXPO_PUBLIC_SUPABASE_ANON_KEY --value "$EXPO_PUBLIC_SUPABASE_ANON_KEY" --environment production --visibility secret
echo "Done. Next: npx eas-cli build -p ios --profile production"
