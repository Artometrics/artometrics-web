#!/usr/bin/env node
/**
 * Move Data/Methods blocks to article end and merge with Sources/References
 * into one back-matter section: "Data, methods & sources".
 *
 * Usage: node scripts/merge-article-back-matter.mjs [--dry-run] [--slug foo]
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "../..");
const BLOG_DIR = join(ROOT, "src/content/blog");

const dryRun = process.argv.includes("--dry-run");
const slugArg = (() => {
  const i = process.argv.indexOf("--slug");
  return i === -1 ? null : process.argv[i + 1];
})();

const DATA_METHOD_ID =
  /^(data-and-method|dataset-context|data-method|data-methods|methods-and-data)$/i;
const DATA_METHOD_HEADING =
  /^(data\s*(and|&)\s*method|dataset\s*context|data\s*and\s*methods?|methods?)$/i;

const SOURCES_ID = /^(sources|references|bibliography|works-cited)$/i;
const SOURCES_HEADING = /^(sources|references|bibliography|works cited)$/i;

const TRAILING_ID = /^(files|file-downloads|editor-s-note|editors-note|editor's-note)$/i;

const MERGED_ID = "data-methods-and-sources";

function stripStructuralClosers(html) {
  return html
    .replace(/\s*<\/section>\s*$/i, "")
    .replace(/\s*<\/main>\s*<\/div>\s*$/i, "")
    .replace(/\s*<\/main>\s*$/i, "")
    .replace(/\s*<\/div>\s*$/i, "");
}

function fixBackMatterStructure(html) {
  if (!html.includes("art-back-matter")) return html;
  let out = html.replace(/\s*<\/section>\s*$/i, "");
  const open = out.match(/<section class="art-back-matter">/i);
  if (!open) return out;
  const beforeMain = out.split(/<\/main>/i)[0];
  const opens = (beforeMain.match(/<section class="art-back-matter">/gi) || []).length;
  const closes = (beforeMain.match(/<\/section>/gi) || []).length;
  if (opens > closes && out.includes("</main>")) {
    out = out.replace(/<\/main>/i, "</section>\n</main>");
  }
  return out;
}

function ensureMainClose(html) {
  if (!html.includes("art-article-main") && !html.includes('id="quarto-content"')) {
    return html;
  }
  if (html.includes("</main>")) return html;
  if (html.trimEnd().endsWith("</div>")) {
    return html.replace(/<\/div>\s*$/i, "</main>\n</div>\n");
  }
  return `${html}\n</main>\n</div>\n`;
}

function splitH2Sections(html) {
  html = stripStructuralClosers(html);
  const parts = html.split(/(?=<h2[\s>])/i);
  let preamble = "";
  const sections = [];
  for (const part of parts) {
    if (!part.trim()) continue;
    if (!/^<h2/i.test(part)) {
      preamble += part;
      continue;
    }
    const m = part.match(/^<h2([^>]*)>([\s\S]*?)<\/h2>([\s\S]*)$/i);
    if (!m) {
      preamble += part;
      continue;
    }
    const idMatch = m[1].match(/\bid="([^"]+)"/i);
    const headingText = m[2].replace(/<[^>]+>/g, "").trim();
    sections.push({
      id: idMatch?.[1] || "",
      heading: headingText,
      body: stripStructuralClosers(m[3]),
    });
  }
  return { preamble, sections };
}

function classify(section) {
  const id = section.id;
  const h = section.heading;

  if (id === MERGED_ID) return "merged";

  if (DATA_METHOD_ID.test(id) || DATA_METHOD_HEADING.test(h)) return "data";
  if (SOURCES_ID.test(id) || SOURCES_HEADING.test(h)) return "sources";
  if (TRAILING_ID.test(id) || /^files$/i.test(h) || /editor'?s?\s*note/i.test(h))
    return "trailing";
  return "narrative";
}

function extractUrls(html) {
  const urls = new Set();
  const re = /href="([^"]+)"/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    urls.add(m[1].replace(/\/$/, "").toLowerCase());
  }
  return urls;
}

function dedupeSourceBlocks(methodHtml, sourcesHtml) {
  const sourceUrls = extractUrls(sourcesHtml);
  if (!methodHtml.trim() || sourceUrls.size === 0) return methodHtml;

  const paras = methodHtml.split(/(?=<p[\s>])/i).filter(Boolean);
  const kept = [];
  for (const para of paras) {
    const urls = extractUrls(para);
    if (urls.size === 0) {
      kept.push(para);
      continue;
    }
    const allDuped = [...urls].every((u) => sourceUrls.has(u));
    if (!allDuped) kept.push(para);
  }
  return kept.join("");
}

function buildMergedSection(methodHtml, sourcesHtml) {
  const methodClean = dedupeSourceBlocks(methodHtml, sourcesHtml);
  const hasMethod = methodClean.replace(/\s/g, "").length > 0;
  const hasSources = sourcesHtml.replace(/\s/g, "").length > 0;

  if (!hasMethod && !hasSources) return "";

  let inner = "";
  if (hasMethod) {
    inner += `<h3 id="data-and-method" class="anchored art-back-matter__subhead">Data and method</h3>\n${methodClean}\n`;
  }
  if (hasSources) {
    const sourcesLabel = sourcesHtml.includes("art-ref-item") ? "References" : "Sources";
    inner += `<h3 id="sources" class="anchored art-back-matter__subhead">${sourcesLabel}</h3>\n${sourcesHtml}`;
  }

  return `<section class="art-back-matter">
<h2 id="${MERGED_ID}" class="anchored">Data, methods &amp; sources</h2>
${inner}
</section>
`;
}

function parseExistingMerged(body) {
  const methodMatch = body.match(
    /<h3[^>]*id="data-and-method"[^>]*>[\s\S]*?<\/h3>([\s\S]*?)(?=<h3[^>]*id="sources"|<\/section>|$)/i,
  );
  const sourcesMatch = body.match(
    /<h3[^>]*id="sources"[^>]*>[\s\S]*?<\/h3>([\s\S]*?)(?=<\/section>|$)/i,
  );
  return {
    method: methodMatch?.[1]?.trim() || "",
    sources: sourcesMatch?.[1]?.trim() || body.replace(/^[\s\S]*?<h2[^>]*>[\s\S]*?<\/h2>/i, "").trim(),
  };
}

function updateToc(html) {
  if (!html.includes('id="TOC"')) return html;

  let out = html.replace(
    /\s*<li><a href="#(?:data-and-method|dataset-context|data-method)[^<]*<\/a><\/li>\n?/gi,
    "",
  );
  out = out.replace(
    /\s*<li><a href="#(?:sources|references)[^<]*<\/a><\/li>\n?/gi,
    "",
  );

  if (!out.includes(`href="#${MERGED_ID}"`)) {
    const insertBeforeEditor = out.match(
      /(\s*<li><a href="#editors?-note"[^<]*<\/a><\/li>)/i,
    );
    const item = `  <li><a href="#${MERGED_ID}" id="toc-${MERGED_ID}">DATA, METHODS &amp; SOURCES</a></li>\n`;
    if (insertBeforeEditor) {
      out = out.replace(insertBeforeEditor[1], `${item}${insertBeforeEditor[1]}`);
    } else if (out.includes("</ul>")) {
      out = out.replace("</ul>", `${item}  </ul>`);
    }
  }
  return out;
}

function extractExistingBackMatter(html) {
  const blocks = [...html.matchAll(/<section class="art-back-matter">[\s\S]*?<\/section>/gi)].map(
    (m) => m[0],
  );
  if (blocks.length === 0) return { html, block: null };
  const block = blocks.reduce((a, b) => (b.length > a.length ? b : a));
  const stripped = html.replace(/<section class="art-back-matter">[\s\S]*?<\/section>/gi, "");
  return { html: stripped, block };
}

function transformBody(html) {
  const { html: strippedHtml, block: existingBlock } = extractExistingBackMatter(html);
  if (
    existingBlock &&
    !/<h2[^>]*id="(?:data-and-method|dataset-context)"/i.test(strippedHtml)
  ) {
    return { html, changed: false };
  }

  const { preamble, sections } = splitH2Sections(strippedHtml);
  if (sections.length === 0) return { html, changed: false };

  let methodParts = [];
  let sourceParts = [];
  const narrative = [];
  const trailing = [];

  for (const s of sections) {
    const kind = classify(s);
    switch (kind) {
      case "merged": {
        const parsed = parseExistingMerged(s.body);
        if (parsed.method) methodParts.push(parsed.method);
        if (parsed.sources) sourceParts.push(parsed.sources);
        else if (s.body.trim()) sourceParts.push(s.body);
        break;
      }
      case "data":
        methodParts.push(s.body);
        break;
      case "sources":
        sourceParts.push(s.body);
        break;
      case "trailing":
        trailing.push(s);
        break;
      default:
        narrative.push(s);
    }
  }

  const methodHtml = methodParts.join("\n").trim();
  const sourcesHtml = sourceParts.join("\n").trim();

  if (!methodHtml && !sourcesHtml) {
    return { html, changed: false };
  }

  const merged = buildMergedSection(methodHtml, sourcesHtml);
  const narrativeHtml = narrative
    .map((s) => `<h2 id="${s.id}" class="anchored">${s.heading}</h2>${s.body}`)
    .join("");
  const trailingHtml = trailing
    .map((s) => `<h2 id="${s.id}" class="anchored">${s.heading}</h2>${s.body}`)
    .join("");

  let newHtml = preamble + narrativeHtml + merged + trailingHtml;
  newHtml = ensureMainClose(fixBackMatterStructure(newHtml));
  const changed = newHtml !== html;
  return { html: newHtml, changed };
}

function transformFile(filePath) {
  const raw = readFileSync(filePath, "utf8");
  const fmEnd = raw.indexOf("---", 3);
  if (!raw.startsWith("---") || fmEnd === -1) return { changed: false };

  const frontmatter = raw.slice(0, fmEnd + 3);
  let body = raw.slice(fmEnd + 3).replace(/^\n/, "");

  const { html, changed } = transformBody(body);
  if (!changed) return { changed: false };

  let out = frontmatter + "\n" + html;
  out = updateToc(out);

  if (!dryRun) writeFileSync(filePath, out.endsWith("\n") ? out : `${out}\n`);
  return { changed: true };
}

const files = readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => join(BLOG_DIR, f))
  .filter((p) => !slugArg || p.endsWith(`/${slugArg}.md`));

let count = 0;
for (const file of files) {
  const { changed } = transformFile(file);
  if (changed) {
    count += 1;
    console.log(dryRun ? `[dry-run] would update ${file}` : `Updated ${file}`);
  }
}
console.log(`${dryRun ? "Would update" : "Updated"} ${count} of ${files.length} blog files.`);
