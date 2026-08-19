#!/usr/bin/env node
/**
 * scripts/edit-articles.mjs
 *
 * Batch-edit Artometrics blog articles with Claude.
 *
 * Usage:
 *   node scripts/edit-articles.mjs                  # edit all articles (writes in place)
 *   node scripts/edit-articles.mjs --dry-run         # print diffs, no writes
 *   node scripts/edit-articles.mjs --slug anime      # single article
 *   node scripts/edit-articles.mjs --slug anime --dry-run
 *
 * Requires: ANTHROPIC_API_KEY in env (add to .env.local or export in shell)
 * Model:    claude-haiku-4-5 by default (cheapest); pass --model claude-sonnet-4-5 for stronger edits
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/content/blog');

// ─── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const slugIdx = args.indexOf('--slug');
const TARGET_SLUG = slugIdx !== -1 ? args[slugIdx + 1] : null;
const modelIdx = args.indexOf('--model');
const MODEL = modelIdx !== -1 ? args[modelIdx + 1] : 'claude-haiku-4-5';

// ─── Validate env ─────────────────────────────────────────────────────────────
const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY. Export it or add to .env.local then re-run.');
  process.exit(1);
}

// ─── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the editorial editor of Artometrics, an independent data-science magazine covering the creative industries and culture.

Your job: improve each article's copy, SEO metadata, and structure while preserving every factual claim, number, chart reference, and HTML element exactly.

## Voice rules
- Professional, objective, insightful — no fluff
- Lead with the finding, then the mechanism, then the limit
- Named and dated numbers only
- One calm expert voice — not multi-discipline cosplay
- Never use "delve", "tapestry", "it's worth noting", "fascinating", or other AI-filler phrases

## What to edit
1. **Frontmatter**
   - title: specific, citable, NYT-style claim or question — no "The Artometrics of …" pattern
   - description: ≤160 chars, lead with a concrete number or claim
   - tldr: 2–3 sentences max, lead with the key finding
   - keyPoints: each item follows the pattern "NUMBER — Label — one-sentence implication"
   - faq: questions must match real search queries; answers ≤2 sentences, factual

2. **HTML body**
   - Fix grammar, clarity, and flow in <p> tags
   - Ensure the lede paragraph (art-lede class) opens with the strongest finding
   - Tighten sentences — cut filler, never add it
   - Preserve all HTML tags, class names, chart embeds, data attributes, and inline styles exactly
   - Do not rewrite or remove headings (<h2>, <h3>)
   - Do not change any number, statistic, date, or proper noun

## What NOT to do
- Do not change slug, pubDate, heroImage, author, tags, draft
- Do not remove or rename any HTML element or class
- Do not add new sections, headings, or paragraphs
- Do not change chart/figure markup in any way
- Do not alter any <figure>, <div id="quarto-content">, or <script> blocks

Return the complete edited file — frontmatter + full HTML body — with no commentary, no explanation, no markdown fences. Output only the raw file content starting with ---.`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function callClaude(content) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Edit this Artometrics article. Return the complete file starting with ---.\n\n${content}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

function printDiff(original, edited, filename) {
  const origLines = original.split('\n');
  const editLines = edited.split('\n');
  const maxLen = Math.max(origLines.length, editLines.length);
  let hasDiff = false;

  console.log(`\n── ${filename} ──`);
  for (let i = 0; i < maxLen; i++) {
    const o = origLines[i] ?? '';
    const e = editLines[i] ?? '';
    if (o !== e) {
      hasDiff = true;
      console.log(`  L${i + 1} -  ${o}`);
      console.log(`  L${i + 1} +  ${e}`);
    }
  }
  if (!hasDiff) console.log('  (no changes)');
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const files = (await fs.readdir(BLOG_DIR))
    .filter(f => f.endsWith('.md'))
    .filter(f => !TARGET_SLUG || f === `${TARGET_SLUG}.md`);

  if (files.length === 0) {
    console.error(TARGET_SLUG ? `No file found: ${TARGET_SLUG}.md` : 'No .md files found.');
    process.exit(1);
  }

  const mode = DRY_RUN ? 'DRY RUN' : 'WRITE';
  console.log(`\nArtometrics article editor — ${mode}`);
  console.log(`Model: ${MODEL}  |  Articles: ${files.length}\n`);

  let edited = 0;
  let unchanged = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const original = await fs.readFile(filePath, 'utf8');

    process.stdout.write(`  ${file} … `);

    try {
      let result = await callClaude(original);

      // Strip accidental markdown fences if Claude wraps the output
      result = result.replace(/^```(?:markdown|yaml|md)?\n?/i, '').replace(/\n?```\s*$/, '');

      if (result.trim() === original.trim()) {
        console.log('unchanged');
        unchanged++;
        continue;
      }

      if (DRY_RUN) {
        console.log('has changes (dry run)');
        printDiff(original, result, file);
      } else {
        await fs.writeFile(filePath, result, 'utf8');
        console.log('edited ✓');
      }
      edited++;
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      errors++;
    }

    // Small delay to avoid rate limits on large batches
    if (files.length > 5) await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\nDone. Edited: ${edited}  Unchanged: ${unchanged}  Errors: ${errors}`);
  if (!DRY_RUN && edited > 0) {
    console.log('\nRun `npm run content` to rebuild src/generated/ before deploying.');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
