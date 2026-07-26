#!/usr/bin/env node
/**
 * Pull Notion calendar/database rows into Content OS brief scaffolds.
 *
 * Usage:
 *   npm run cos:notion-sync
 *   npm run cos:notion-sync -- --dry-run
 *
 * Env: NOTION_API_KEY, NOTION_BRIEF_DATABASE_ID
 * Prefer Cursor Notion MCP when keys are unavailable.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { flag } from "./lib/args.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const dryRun = flag("dry-run");
const key = process.env.NOTION_API_KEY;
const db = process.env.NOTION_BRIEF_DATABASE_ID;

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

if (!key || !db || dryRun) {
  console.log(
    `[skipped] Notion sync — ${!key || !db ? "NOTION_API_KEY / NOTION_BRIEF_DATABASE_ID unset" : "dry-run"}`,
  );
  console.log("Tip: use Cursor Notion MCP to export calendar rows, or set env and re-run.");
  process.exit(0);
}

async function main() {
  const res = await fetch(`https://api.notion.com/v1/databases/${db}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page_size: 25 }),
  });
  if (!res.ok) {
    console.error("Notion query failed:", res.status, await res.text());
    process.exit(1);
  }
  const data = await res.json();
  const outDir = join(ROOT, "docs/content-os/briefs");
  mkdirSync(outDir, { recursive: true });
  let written = 0;
  for (const page of data.results || []) {
    const props = page.properties || {};
    const titleProp =
      props.Name || props.Title || props.title || Object.values(props).find((p) => p.type === "title");
    const title =
      titleProp?.title?.map((t) => t.plain_text).join("") ||
      page.id.slice(0, 8);
    const slug = slugify(title) || page.id.slice(0, 8);
    const path = join(outDir, `${slug}.json`);
    if (existsSync(path)) {
      console.log(`exists: ${slug}`);
      continue;
    }
    const brief = {
      slug,
      title,
      desk: "culture",
      subdomain: "culture",
      status: "idea",
      source: "notion",
      notionPageId: page.id,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      channels: { buffer: true, slack: true },
    };
    writeFileSync(path, `${JSON.stringify(brief, null, 2)}\n`);
    console.log(`wrote: ${path}`);
    written += 1;
  }
  console.log(`Notion sync complete — ${written} new brief(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
