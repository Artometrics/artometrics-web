#!/usr/bin/env node
/**
 * Search Console health check helper.
 *
 * Usage:
 *   npm run cos:gsc-check
 *   npm run cos:gsc-check -- --dry-run
 *
 * Env (optional service account path): GSC_SITE_URL, GOOGLE_APPLICATION_CREDENTIALS
 * Prefer Cursor gscServer MCP for live queries — this script validates sitemap reachability
 * and prints the MCP playbook when credentials are missing.
 */
import { flag } from "./lib/args.mjs";

const dryRun = flag("dry-run");
const site = process.env.GSC_SITE_URL || process.env.EXPO_PUBLIC_SITE_URL || "https://artometrics.com";
const sitemap = `${site.replace(/\/$/, "")}/sitemap.xml`;
const hasCreds = Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);

async function main() {
  console.log(`Site: ${site}`);
  console.log(`Sitemap: ${sitemap}`);

  try {
    const res = await fetch(sitemap);
    console.log(`Sitemap HTTP ${res.status}${res.ok ? " ✓" : " ✗"}`);
  } catch (e) {
    console.log("Sitemap fetch failed:", e instanceof Error ? e.message : e);
  }

  if (!hasCreds || dryRun) {
    console.log(
      `[skipped] GSC API query — ${!hasCreds ? "GOOGLE_APPLICATION_CREDENTIALS unset" : "dry-run"}`,
    );
    console.log("Playbook (Cursor gscServer MCP):");
    console.log("  1. List sitemaps for the property");
    console.log("  2. Inspect coverage / indexing issues for top report URLs");
    console.log("  3. Compare with cos:aeo output (llms.txt + sitemap)");
    process.exit(0);
  }

  console.log(
    "Service-account GSC API not bundled — use gscServer MCP or googleapis locally.",
  );
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
