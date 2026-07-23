#!/usr/bin/env node
/**
 * Narrate a blog article with ElevenLabs TTS → public/audios/<slug>.mp3
 *
 * Requires: ELEVENLABS_API_KEY in env (and optional ELEVENLABS_VOICE_ID).
 * Usage: npm run cos:narrate -- --slug readmitted
 *
 * Prefer Higgsfield generate_audio / voice tools when MCP is authenticated
 * and you want UI-driven voice selection instead of raw API keys.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const slugIdx = args.indexOf("--slug");
const slug = slugIdx >= 0 ? args[slugIdx + 1] : null;
const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb"; // ElevenLabs default sample

if (!slug) {
  console.error("Usage: npm run cos:narrate -- --slug <slug>");
  process.exit(1);
}
if (!apiKey) {
  console.error(
    "Missing ELEVENLABS_API_KEY.\n" +
      "Add it to .env / Netlify, or use Higgsfield MCP generate_audio instead.",
  );
  process.exit(1);
}

const mdPath = path.join(ROOT, "src/content/blog", `${slug}.md`);
if (!fs.existsSync(mdPath)) {
  console.error(`Missing ${mdPath}`);
  process.exit(1);
}

const { data, content } = matter(fs.readFileSync(mdPath, "utf8"));
const title = data.title || slug;
const plain = `${title}.\n\n${stripHtml(content)}`
  .replace(/\s+/g, " ")
  .trim()
  .slice(0, 4500); // keep first chunk under typical TTS limits

const outDir = path.join(ROOT, "public/audios");
const outPath = path.join(outDir, `${slug}.mp3`);
fs.mkdirSync(outDir, { recursive: true });

const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
const res = await fetch(url, {
  method: "POST",
  headers: {
    "xi-api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "audio/mpeg",
  },
  body: JSON.stringify({
    text: plain,
    model_id: "eleven_multilingual_v2",
  }),
});

if (!res.ok) {
  const body = await res.text();
  console.error(`ElevenLabs HTTP ${res.status}: ${body.slice(0, 400)}`);
  process.exit(1);
}

const buf = Buffer.from(await res.arrayBuffer());
fs.writeFileSync(outPath, buf);
console.log(`Audio → ${path.relative(ROOT, outPath)} (${buf.length} bytes)`);
console.log("Next: set audioSrc on podcast/blog frontmatter and rebuild content.");

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
