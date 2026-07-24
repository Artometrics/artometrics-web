#!/usr/bin/env node
/**
 * Sync locked podcast transcripts into Supabase member_episodes.
 * Requires: EXPO_PUBLIC_SUPABASE_URL (or PUBLIC_SUPABASE_URL) + SUPABASE_SERVICE_ROLE_KEY
 *
 * Usage: npm run sync:episodes
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const podcastDir = join(__dirname, "../src/content/podcast");

function loadEnvFile() {
  try {
    const raw = readFileSync(join(__dirname, "../.env"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env optional when vars are exported
  }
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const yaml = match[1];
  const body = match[2];
  const data = {};
  for (const line of yaml.split("\n")) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) {
      const val = m[2].trim();
      data[m[1]] = val === "true" ? true : val === "false" ? false : val.replace(/^["']|["']$/g, "");
    }
  }
  return { data, body };
}

function markdownToHtml(markdown) {
  const blocks = markdown.trim().split(/\n\n+/);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^---+$/.test(trimmed)) return "<hr />";
      const html = trimmed
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br />");
      return `<p>${html}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

loadEnvFile();

const url =
  process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing EXPO_PUBLIC_SUPABASE_URL (or PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

const files = readdirSync(podcastDir).filter((f) => [".md", ".mdx"].includes(extname(f)));
let synced = 0;

for (const file of files) {
  const id = file.replace(/\.(md|mdx)$/, "");
  const raw = readFileSync(join(podcastDir, file), "utf8");
  const { data, body } = parseFrontmatter(raw);

  if (!data.isLocked) continue;

  const title = data.title ?? id;
  const html = `<div class="prose prose-sm max-w-none">${markdownToHtml(body)}</div>`;

  const { error } = await supabase.from("member_episodes").upsert(
    {
      slug: id,
      title,
      html_content: html,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" }
  );

  if (error) {
    console.error(`Failed ${id}:`, error.message);
    process.exitCode = 1;
    continue;
  }

  console.log(`Synced locked episode: ${id}`);
  synced += 1;
}

console.log(`Done. ${synced} episode(s) upserted.`);
