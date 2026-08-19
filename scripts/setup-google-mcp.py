#!/usr/bin/env python3
"""
One-time OAuth setup for Artometrics Google MCP (GA4 + Search Console).

Prerequisites (Google Cloud Console, ~10 min):
  1. Create project "artometrics-analytics" (or reuse an existing one)
  2. Enable APIs:
     - Search Console API
     - Google Analytics Admin API
     - Google Analytics Data API
  3. OAuth consent screen → External → add your Gmail as test user
  4. Credentials → Create OAuth client ID → Desktop app → Download JSON
  5. Save the download as:
       ~/.config/google-mcp/oauth-client.json

Then run:
  python3 scripts/setup-google-mcp.py

Sign in with the Google account that owns GA4 (G-4GZWX5V2EC) and Search Console.
Reload Cursor MCP servers, then call GSC reauthenticate if needed.
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

try:
    from google_auth_oauthlib.flow import InstalledAppFlow
except ImportError:
    print(
        "google-auth-oauthlib not found. Run with the GSC MCP Python env:\n"
        "  ~/.local/share/uv/tools/mcp-search-console/bin/python scripts/setup-google-mcp.py",
        file=sys.stderr,
    )
    sys.exit(1)

OAUTH_CLIENT = Path.home() / ".config/google-mcp/oauth-client.json"
ADC_FILE = Path.home() / ".config/gcloud/application_default_credentials.json"

SCOPES = [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/cloud-platform",
]


def main() -> None:
    if not OAUTH_CLIENT.is_file():
        print(f"Missing OAuth client JSON: {OAUTH_CLIENT}")
        print("\nDownload a Desktop OAuth client from Google Cloud Console and save it there.")
        print("See script header for API enablement steps.")
        sys.exit(1)

    ADC_FILE.parent.mkdir(parents=True, exist_ok=True)

    print("Opening browser for Google sign-in…")
    print("Use the account that owns Artometrics GA4 + Search Console.\n")

    flow = InstalledAppFlow.from_client_secrets_file(str(OAUTH_CLIENT), SCOPES)
    creds = flow.run_local_server(port=0)

    with open(OAUTH_CLIENT, encoding="utf-8") as f:
        client = json.load(f)
    installed = client.get("installed") or client.get("web") or {}

    adc = {
        "account": "",
        "client_id": installed.get("client_id", creds.client_id),
        "client_secret": installed.get("client_secret", creds.client_secret),
        "refresh_token": creds.refresh_token,
        "type": "authorized_user",
        "universe_domain": "googleapis.com",
    }

    ADC_FILE.write_text(json.dumps(adc, indent=2) + "\n", encoding="utf-8")
    os.chmod(ADC_FILE, 0o600)

    print(f"\nSaved Application Default Credentials:\n  {ADC_FILE}")
    print("\nNext:")
    print("  1. Reload Cursor MCP servers (Cmd+Shift+P → MCP: Restart)")
    print("  2. Ask the agent to test GA (get_account_summaries) and GSC (list_properties)")
    print("  3. In Search Console, verify https://artometrics.com and submit sitemap.xml")


if __name__ == "__main__":
    main()
