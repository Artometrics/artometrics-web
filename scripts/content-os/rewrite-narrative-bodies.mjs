#!/usr/bin/env node
/**
 * Narrative magazine rewrite for article HTML bodies.
 * Preserves charts, fact numbers, and sources. Adds H2/H3 narrative structure.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const BLOG = join(ROOT, "src/content/blog");

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const HEADING_MAP = {
  "at a glance": "The numbers that matter",
  "the numbers that matter": "The numbers that matter",
  "the data": "Where the numbers come from",
  "where the numbers come from": "Where the numbers come from",
  trend: "How the pattern changed over time",
  leaders: "Who sits at the top",
  distribution: "How the field is spread",
  "gap analysis": "Who beats the median — and who trails",
  "supplement — relationship": "What moves together",
  "supplement - relationship": "What moves together",
  relationship: "What moves together",
  caveats: "What this file cannot tell you",
  "what this file cannot tell you": "What this file cannot tell you",
  "bottom line": "What to take away",
  "what to take away": "What to take away",
  conclusion: "What to take away",
  sources: "Sources",
  references: "Sources",
  "editor’s note": "Editor’s note",
  "editor's note": "Editor’s note",
  "banner density": "How densely championships stack",
  "title ceiling": "The ceiling on titles",
  "era conversion": "Converting eras into banners",
  "drought pressure": "What long droughts do to a franchise",
  "modern access": "Whether the modern team still has a claim",
  "prestige versus market": "Prestige and market are not the same currency",
  "category inflation": "When awards invent more lanes of excellence",
  "nomination conversion": "Getting nominated is not the same as winning",
  "attention concentration": "What the public actually remembers",
  gatekeeping: "Who still decides what gets a second life",
};

function titleCaseHeading(raw) {
  let t = String(raw || "").trim();
  t = t.replace(/^CHART\s*\d+\s*[—\-–:]\s*/i, "");
  t = t.replace(/^SUPPLEMENT\s*[—\-–:]\s*/i, "");
  const lower = t.toLowerCase().replace(/\s+/g, " ").trim();
  if (HEADING_MAP[lower]) return HEADING_MAP[lower];
  if (t !== t.toUpperCase() && /[a-z]/.test(t)) {
    return t.replace(/\s+/g, " ").trim();
  }
  return lower
    .split(/\s+/)
    .map((w, i) => {
      if (
        i > 0 &&
        ["of", "the", "and", "a", "an", "in", "on", "for", "to", "vs", "versus"].includes(w)
      ) {
        return w;
      }
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

function extractFactsGrid(html) {
  const start = html.search(/<div class="facts-grid">/i);
  if (start < 0) return "";
  let i = start + '<div class="facts-grid">'.length;
  let depth = 1;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose < 0) break;
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      i = nextClose + 6;
      if (depth === 0) {
        return html.slice(start, i);
      }
    }
  }
  return "";
}

function extractFacts(html) {
  const facts = [];
  const factRe =
    /<div class="fact-box"><span class="fact-number">([\s\S]*?)<\/span><span class="fact-label">([\s\S]*?)<\/span><\/div>/gi;
  let m;
  while ((m = factRe.exec(html))) {
    facts.push({ number: stripTags(m[1]), label: stripTags(m[2]) });
  }
  return facts;
}

function extractBlocks(html) {
  const facts = extractFacts(html);
  const parts = html.split(/<h2\b[^>]*>/i);
  const leadHtml = parts[0] || "";
  const sections = [];
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    const close = chunk.indexOf("</h2>");
    if (close < 0) continue;
    sections.push({
      title: stripTags(chunk.slice(0, close)),
      body: chunk.slice(close + 5),
    });
  }
  return { leadHtml, facts, sections };
}

function narrativeLead(description, leadHtml, facts) {
  const existing = [...leadHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((x) => stripTags(x[1]))
    .filter(Boolean)
    .filter(
      (p) =>
        !/^This report analyzes/i.test(p) &&
        !/^Five charts track/i.test(p) &&
        !/^Reader path:/i.test(p) &&
        !/^Looking at the TidyTuesday/i.test(p),
    );

  const paras = [];
  if (existing.length) {
    for (const p of existing.slice(0, 3)) {
      const text = p
        .replace(/\bThis report asks\b/gi, "The question is")
        .replace(/\bthis report\b/gi, "this piece")
        .replace(/\bA good awards report should\b/gi, "The cleaner approach is to")
        .replace(/\bThis is a repeated Artometrics pattern:\s*/gi, "");
      paras.push(`<p class="art-p">${text}</p>`);
    }
  } else if (description) {
    paras.push(`<p class="art-p">${description}</p>`);
  }

  if (facts.length >= 2) {
    const a = facts[0];
    const b = facts[1];
    paras.push(
      `<p class="art-p">Start with the scale: <strong>${a.number}</strong> — ${a.label}; and <strong>${b.number}</strong> — ${b.label}.</p>`,
    );
  }
  return paras.join("\n");
}

function parasFrom(body) {
  return [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((x) => stripTags(x[1]))
    .filter(Boolean)
    .filter((p) => !/^Reader path:/i.test(p) && !/^How to read this piece:/i.test(p));
}

function rewriteSection(sec, idx, facts) {
  const title = titleCaseHeading(sec.title);
  const id = slugify(title) || `section-${idx}`;
  let body = sec.body;

  body = body.replace(/\bThis report builds\b/gi, "The frame below builds");
  body = body.replace(/\bThis report analyzes\b/gi, "Looking at");
  body = body.replace(/\bFive charts track\b/gi, "The charts that follow track");

  if (/numbers that matter/i.test(title)) {
    const grid = extractFactsGrid(body) || extractFactsGrid(`<div class="facts-grid">${body}`);
    // Rebuild grid from extracted facts if needed
    const gridHtml =
      grid ||
      (facts.length
        ? `<div class="facts-grid">\n${facts
            .map(
              (f) =>
                `  <div class="fact-box"><span class="fact-number">${f.number}</span><span class="fact-label">${f.label}</span></div>`,
            )
            .join("\n")}\n</div>`
        : "");
    return `<h2 id="${id}" class="anchored">${title}</h2>
<p class="art-p">Keep these markers in view as the story unfolds.</p>
${gridHtml}`;
  }

  if (/where the numbers come from/i.test(title)) {
    const prose = parasFrom(body)
      .slice(0, 3)
      .map((p) => `<p class="art-p">${p.replace(/\bthis report\b/gi, "this piece")}</p>`)
      .join("\n");
    return `<h2 id="${id}" class="anchored">${title}</h2>
${prose || `<p class="art-p">${stripTags(body).slice(0, 400)}</p>`}`;
  }

  const hasFigure = /<figure[\s\S]*?<\/figure>/i.test(body);
  if (hasFigure) {
    const fig = body.match(/<figure[\s\S]*?<\/figure>/i)?.[0] || "";
    let prose = parasFrom(body)
      .filter((p) => !/^Read as a teaching map/i.test(p))
      .slice(0, 4)
      .map((p) => {
        const cleaned = p
          .replace(/\bA good awards report should\b/gi, "The cleaner approach is to")
          .replace(/\bThis is a repeated Artometrics pattern:\s*/gi, "");
        return `<p class="art-p">${cleaned}</p>`;
      })
      .join("\n");
    if (!prose) {
      prose = `<p class="art-p">${title} is the next turn in the story. Read the chart for the shape, then the numbers around it.</p>`;
    }
    return `<h2 id="${id}" class="anchored">${title}</h2>
<h3 id="${id}-exhibit" class="anchored">The exhibit</h3>
${fig}
${prose}`;
  }

  if (/what to take away/i.test(title)) {
    const prose = parasFrom(body)
      .slice(0, 3)
      .map((p) => `<p class="art-p">${p.replace(/\bFor Artometrics,\s*/gi, "")}</p>`)
      .join("\n");
    return `<h2 id="${id}" class="anchored">${title}</h2>
${prose || body}`;
  }

  if (/^sources$/i.test(title)) {
    return `<h2 id="${id}" class="anchored">Sources</h2>
${body}`;
  }

  if (/editor/i.test(title)) {
    const text = stripTags(body);
    if (
      /TidyTuesday research pipeline|production pass should ingest|reproducible from the embedded/i.test(
        text,
      ) &&
      text.length < 320
    ) {
      return "";
    }
    return `<h2 id="${id}" class="anchored">Editor’s note</h2>
${body}`;
  }

  if (/cannot tell you/i.test(title)) {
    const prose = parasFrom(body)
      .map((p) => `<p class="art-p">${p}</p>`)
      .join("\n");
    return `<h2 id="${id}" class="anchored">${title}</h2>
${prose || body}`;
  }

  return `<h2 id="${id}" class="anchored">${title}</h2>
${body}`;
}

function rebuild(html, description) {
  const { leadHtml, facts, sections } = extractBlocks(html);
  const lead = narrativeLead(description, leadHtml, facts);
  const outSections = sections.map((s, i) => rewriteSection(s, i, facts)).filter(Boolean);
  return `<div id="quarto-content">
<main class="art-article-main">
${lead}
${outSections.join("\n")}
</main>
</div>`;
}

const files = readdirSync(BLOG).filter((f) => f.endsWith(".md"));
let n = 0;
for (const file of files) {
  const path = join(BLOG, file);
  const raw = readFileSync(path, "utf8");
  const parsed = matter(raw);
  const next = rebuild(parsed.content, parsed.data.description || "");
  const out = matter.stringify(`${next.trim()}\n`, parsed.data);
  writeFileSync(path, out.endsWith("\n") ? out : `${out}\n`);
  n += 1;
}
console.log(`Narrative rewrite complete: ${n} articles`);
