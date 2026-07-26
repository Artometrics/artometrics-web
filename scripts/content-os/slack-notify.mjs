#!/usr/bin/env node
/**
 * Post a publish / review notice to Slack.
 *
 * Usage:
 *   npm run cos:slack-notify -- --slug anime --event published
 *   npm run cos:slack-notify -- --slug anime --dry-run
 *
 * Env: SLACK_WEBHOOK_URL (Incoming Webhook)
 * Prefer Cursor Slack MCP when webhook is unavailable.
 */
import { arg, flag } from "./lib/args.mjs";

const slug = arg("slug") || "unknown";
const event = arg("event") || "published";
const dryRun = flag("dry-run");
const webhook = process.env.SLACK_WEBHOOK_URL;
const site = process.env.EXPO_PUBLIC_SITE_URL || "https://artometrics.com";

const text =
  event === "published"
    ? `Published report \`${slug}\` → ${site}/${slug}`
    : `Artometrics Content OS: \`${slug}\` — ${event}`;

if (!webhook || dryRun) {
  console.log(
    `[skipped] Slack notify — ${!webhook ? "SLACK_WEBHOOK_URL unset" : "dry-run"}`,
  );
  console.log(text);
  process.exit(0);
}

const res = await fetch(webhook, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text }),
});
if (!res.ok) {
  console.error("Slack webhook failed:", res.status, await res.text());
  process.exit(1);
}
console.log("Slack notified:", text);
