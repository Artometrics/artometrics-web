#!/usr/bin/env node
/**
 * Schedule zine caption text to Buffer (LinkedIn / IG).
 *
 * Usage:
 *   npm run cos:buffer-schedule -- --slug anime
 *   npm run cos:buffer-schedule -- --slug anime --dry-run
 *
 * Env: BUFFER_ACCESS_TOKEN, optional BUFFER_PROFILE_IDS (comma-separated)
 * Prefer Cursor Buffer MCP when token is unavailable.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { arg, flag } from "./lib/args.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const slug = arg("slug");
const dryRun = flag("dry-run");

if (!slug) {
  console.error("Missing --slug");
  process.exit(1);
}

const captionPath = join(ROOT, "docs/content-os/zines", slug, "caption.txt");
const packPath = join(ROOT, "docs/content-os/zines", slug, "pack.json");
if (!existsSync(captionPath)) {
  console.error(`Missing zine caption: ${captionPath}`);
  console.error(`Run: npm run cos:zine -- --slug ${slug}`);
  process.exit(1);
}

const text = readFileSync(captionPath, "utf8").trim();
const pack = existsSync(packPath) ? JSON.parse(readFileSync(packPath, "utf8")) : {};
const token = process.env.BUFFER_ACCESS_TOKEN;

if (!token || dryRun) {
  console.log(
    dryRun || !token
      ? `[skipped] Buffer schedule for "${slug}" — ${!token ? "BUFFER_ACCESS_TOKEN unset" : "dry-run"}`
      : "",
  );
  console.log(`Caption (${text.length} chars):`);
  console.log(text.slice(0, 280) + (text.length > 280 ? "…" : ""));
  if (pack.channels) console.log("Suggested channels:", pack.channels);
  console.log("Tip: use Cursor Buffer MCP to create updates, or set BUFFER_ACCESS_TOKEN.");
  process.exit(0);
}

const profileIds = (process.env.BUFFER_PROFILE_IDS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

async function main() {
  let profiles = profileIds;
  if (!profiles.length) {
    const res = await fetch("https://api.bufferapp.com/1/profiles.json", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      console.error("Buffer profiles failed:", res.status, await res.text());
      process.exit(1);
    }
    const data = await res.json();
    profiles = (Array.isArray(data) ? data : []).map((p) => p.id).filter(Boolean);
  }
  if (!profiles.length) {
    console.error("No Buffer profile ids. Set BUFFER_PROFILE_IDS.");
    process.exit(1);
  }

  for (const profile_ids of profiles) {
    const body = new URLSearchParams();
    body.set("text", text.slice(0, 2200));
    body.set("profile_ids[]", profile_ids);
    body.set("now", "false");
    const res = await fetch("https://api.bufferapp.com/1/updates/create.json", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!res.ok) {
      console.error(`Buffer create failed for ${profile_ids}:`, res.status, await res.text());
      process.exit(1);
    }
    console.log(`Queued Buffer update for profile ${profile_ids}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
