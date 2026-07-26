#!/usr/bin/env node
/**
 * Dry-run ops scripts with env cleared — expect skip exits 0.
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const jobs = [
  ["node", ["scripts/content-os/buffer-schedule.mjs", "--slug", "anime", "--dry-run"]],
  ["node", ["scripts/content-os/notion-sync.mjs", "--dry-run"]],
  ["node", ["scripts/content-os/slack-notify.mjs", "--slug", "anime", "--dry-run"]],
  ["node", ["scripts/content-os/gsc-check.mjs", "--dry-run"]],
];

let failed = 0;
for (const [cmd, args] of jobs) {
  const env = { ...process.env };
  delete env.BUFFER_ACCESS_TOKEN;
  delete env.NOTION_API_KEY;
  delete env.NOTION_BRIEF_DATABASE_ID;
  delete env.SLACK_WEBHOOK_URL;
  delete env.GOOGLE_APPLICATION_CREDENTIALS;
  const r = spawnSync(cmd, args, { cwd: ROOT, env, encoding: "utf8" });
  const ok = r.status === 0 && /\[skipped\]/.test(r.stdout || "");
  console.log(ok ? "✓" : "✗", args.join(" "));
  if (!ok) {
    console.log(r.stdout);
    console.log(r.stderr);
    failed += 1;
  }
}

if (failed) {
  console.error(`ops dry-run failures: ${failed}`);
  process.exit(1);
}
console.log("ops dry-run OK");
