#!/usr/bin/env node
/**
 * Wave B shell upgrade: FAQ, lede, GitHub CTA demotion for non-gold blog posts.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG = join(__dirname, "../src/content/blog");

const SKIP = new Set([
  "padres-the-artometrics-of-paying-for-october.md",
  "padres-world-series-ownership-blueprint.md",
  "yankees-the-artometrics-of-baseballs-empire.md",
  "dodgers-the-artometrics-of-baseballs-modern-machine.md",
  "cowboys-the-artometrics-of-americas-team.md",
  "celtics-the-artometrics-of-institutional-winning.md",
  "lakers-the-artometrics-of-basketball-glamour.md",
  "patriots-the-artometrics-of-the-system-dynasty.md",
  "giant-the-artometrics-of-a-san-francisco-dynasty.md",
  "warrior-the-artometrics-of-a-golden-state-dynasty.md",
]);

const STUB_QUESTION_PATTERNS = [
  "what does the data show about",
  "what does the report show about",
  "what this file cannot tell you",
  "how the pattern changed over time",
  "who sits at the top",
  "how the field is spread",
  "how reading time moved",
  "who sits at the top of length",
  "landscape",
  "leader trends",
  "concentration:",
  "how big is the library",
  "genre map:",
  "what is the key figure for",
  "what is unique franchises",
  "what is nfl regular",
  "what is mlb regular",
  "what is nba star",
  "what is scientific data paper",
  "what is main memory engines",
  "what is fame paths",
  "what is total views across",
];

const STUB_ANSWER_PATTERNS = [
  "key figure:",
  "tidyTuesday release from",
  "tables in the week",
  "tables in the…",
  "rows and",
  "the numbers arrive when the csv",
];

function isStubFaq(faq) {
  if (!faq || !Array.isArray(faq) || faq.length === 0) return true;
  return faq.some((item) => {
    const q = (item.question || "").toLowerCase();
    const a = (item.answer || "").toLowerCase();
    if (STUB_ANSWER_PATTERNS.some((p) => a.includes(p))) return true;
    if (STUB_QUESTION_PATTERNS.some((p) => q.includes(p))) return true;
    return false;
  });
}

function parseKeyPoint(kp) {
  const parts = String(kp).trim().split(" — ");
  if (parts.length >= 2) {
    const value = parts[0].trim();
    const label = parts[1].trim();
    const detail = parts.length > 2 ? parts.slice(2).join(" — ").trim() : "";
    return { value, label, detail };
  }
  return { value: String(kp).trim(), label: "", detail: "" };
}

function shortLabel(label) {
  return label.split("—")[0].split("(")[0].trim();
}

function questionFromKeyPoint(label, value, detail = "") {
  const lower = label.toLowerCase();
  const short = shortLabel(label);

  if (lower.includes("hrrp-eligible") || lower.includes("hospital-condition pairs"))
    return "What share of hospital-condition pairs exceed the CMS readmission benchmark?";
  if (lower.includes("conditions tracked under hrrp"))
    return "How many conditions does HRRP track?";
  if (lower.includes("average excess readmission ratio nationally"))
    return "What is the national average excess readmission ratio?";
  if (lower.includes("hip/knee average err"))
    return "Which HRRP condition has the highest average excess readmission ratio?";
  if (lower.includes("team bundled payment"))
    return "How many hospitals are mandated in CMS's TEAM bundled payment model?";
  if (lower.includes("new jersey"))
    return "Which state has the highest share of penalized hospital-condition pairs?";
  if (lower.includes("pokémon lifetime revenue") || lower.includes("pokemon lifetime revenue"))
    return "Which franchise has the highest lifetime revenue in the dataset?";
  if (lower.includes("unique franchises in the dataset"))
    return "How many franchises are in the dataset?";
  if (lower.includes("minimum threshold for inclusion"))
    return "What is the minimum revenue threshold for inclusion?";
  if (lower.includes("revenue categories tracked"))
    return "How many revenue categories are tracked per franchise?";
  if (lower.includes("share of all tracked revenue"))
    return "What share of tracked franchise revenue comes from merchandise?";
  if (lower.includes("span of the dataset"))
    return "What time span does the franchise dataset cover?";
  if (lower.includes("birth year") && lower.includes("caesar"))
    return "When was Julius Caesar born?";
  if (lower.includes("held captive") && lower.includes("pirates"))
    return "How long was Caesar held captive by Cilician pirates?";
  if (lower.includes("need for power score"))
    return "What is Caesar's Need for Power score under Hermann LTA?";
  if (lower.includes("veterans and urban poor resettled"))
    return "How many people did Caesar resettle in land colonies?";
  if (lower.includes("peak gdp per capita") && lower.includes("caesar"))
    return "How long after Caesar's death did Rome reach peak GDP per capita?";
  if (lower.includes("stab wounds"))
    return "How many stab wounds did Caesar receive on the Ides of March?";
  if (lower.includes("coffee samples rated"))
    return "How many coffee samples were rated by CQI Q Graders?";
  if (lower.includes("median cqi cup score") && lower.includes("ethiopia"))
    return "What is Ethiopia's median CQI cup score?";
  if (lower.includes("starbucks locations in ethiopia"))
    return "How many Starbucks locations operate in Ethiopia, Kenya, and Uganda?";
  if (lower.includes("countries with 20+ cqi"))
    return "How many countries have 20+ CQI-rated Arabica samples?";
  if (lower.includes("starbucks locations worldwide"))
    return "How many Starbucks locations were operating worldwide in the dataset?";
  if (lower.includes("biographies indexed by pantheon"))
    return "How many biographies does Pantheon index in public summaries?";
  if (lower.includes("minimum wikipedia language editions"))
    return "How many Wikipedia language editions does Pantheon require?";
  if (lower.includes("scientific data paper for pantheon"))
    return "When was the Pantheon 1.0 Scientific Data paper published?";
  if (lower.includes("main memory engines"))
    return "How many main memory engines does this report compare?";
  if (lower.includes("memory-capital cities"))
    return "How many memory-capital cities are compared?";
  if (lower.includes("total views across all four h3"))
    return "How many total views do the four H3 channels have?";
  if (lower.includes("videos analyzed after filtering"))
    return "How many videos were analyzed after filtering Shorts and zero-view uploads?";
  if (lower.includes("how much harder h3h3prod​uctions hits"))
    return "How much harder does h3h3-prod​uctions hit per video vs the H3 Podcast?";
  if (lower.includes("entire frenemies era"))
    return "How long did the Frenemies era last?";
  if (lower.includes("time for western europe to recover"))
    return "How long did Western Europe take to recover Rome's peak GDP per capita?";
  if (lower.includes("share of global population governed by the british"))
    return "What share of global population did the British Empire govern at its 1920 peak?";
  if (lower.includes("imperial china cycled"))
    return "How many times did Imperial China cycle through unification and fragmentation?";
  if (lower.includes("silver extracted by habsburg"))
    return "How much silver did Habsburg Spain extract from the Americas?";
  if (lower.includes("global population killed in mongol"))
    return "What share of global population was killed in Mongol conquests?";
  if (lower.includes("peak centralization precedes gdp peak"))
    return "How far does peak centralization precede GDP peak across empires?";
  if (lower.includes("approximate average nfl franchise"))
    return "What is the approximate average NFL franchise value?";
  if (lower.includes("nfl regular-season games"))
    return "How many regular-season games does each NFL team play?";
  if (lower.includes("mlb regular-season games"))
    return "How many regular-season games does each MLB team play?";
  if (lower.includes("nba star leverage index"))
    return "What is the NBA star leverage index in this editorial model?";
  if (lower.includes("leagues compared")) return "How many leagues are compared in this report?";
  if (lower.includes("musicbrainz core database dump license"))
    return "Under what license is the MusicBrainz core database dump?";
  if (lower.includes("metabrainz published dump cadence"))
    return "How often does MetaBrainz publish database dumps?";
  if (lower.includes("json dump entity types"))
    return "How many JSON dump entity types does MusicBrainz document?";
  if (lower.includes("fame paths compared")) return "How many fame paths are compared?";
  if (lower.includes("artists used as report anchors"))
    return "How many artists anchor this report?";

  if (lower.includes(" per team") || lower.endsWith(" per team"))
    return `How many ${label}?`;
  if (lower.startsWith("share of") || lower.includes("share of global"))
    return `What is the ${label}?`;
  if (lower.includes("unique anime titles")) return "How many anime titles are in the dataset?";
  if (lower.includes("median mal score") || lower.includes("overall median mal"))
    return "What is the median MyAnimeList score?";
  if (lower.includes("share of tv anime")) return "What share of TV anime scores 8+ on MAL?";
  if (lower.includes("buried past popularity")) return "How many high-scoring shows rank below 2,000 in popularity?";
  if (lower.includes("pearson correlation")) return "How strongly does popularity correlate with score?";
  if (lower.includes("haruhi") || lower.includes("inflection point"))
    return "When did light novels become a major anime adaptation source?";
  if (lower.startsWith("median ")) {
    const metric = label.replace(/^Median\s+/i, "").split("—")[0].trim();
    return `What is the median ${metric}?`;
  }
  if (lower.includes("highest observed")) return "What is the highest observed value in this extract?";
  if (lower.includes("top country")) return "Which country leads in this extract?";
  if (lower.includes("top title")) return "Which title leads in this extract?";
  if (lower.includes("year span")) return "What time period does this dataset cover?";
  if (lower.includes("tbd")) return "When will numeric findings be available?";
  if (lower.includes("first instance")) return "Is the court judgment final?";
  if (lower.includes("trademark filings")) return "How many LV trademark filings were reported in H1 2026?";
  if (lower.includes("platforms ordered")) return "On which platforms must corrective statements appear?";
  if (lower.includes("infringement records")) return "How many LV-linked infringement records appear in China?";
  if (lower.includes("share of")) return `What is the ${short}?`;
  if (lower.includes("correlation")) return `What is the ${short}?`;
  if (lower.includes("rank on")) return "Where does the album rank on the Rolling Stone list?";
  if (lower.includes("weeks on chart")) return "How many weeks did the album spend on the Billboard chart?";
  if (lower.includes("lyric lines")) return "How many lyric lines are in the extract?";
  if (label.endsWith("?")) return label;
  if (/^\d|^\$|^¥/.test(value) && (lower.includes("records") || lower.includes("titles") || lower.includes("lines")))
    return `How many ${short.toLowerCase()}?`;
  if (short.length <= 55 && !short.includes("—")) {
    return short.endsWith("?") ? short : `What is ${short}?`;
  }
  return `What is the key figure for ${short.slice(0, 48)}?`;
}

function answerFromKeyPoint(value, label, description, detail = "") {
  const lower = label.toLowerCase();
  const extra = detail ? ` — ${detail}` : "";

  if (lower.includes("hrrp-eligible") || lower.includes("hospital-condition pairs"))
    return `${value} of HRRP-eligible hospital-condition pairs carried an excess readmission ratio above 1.0${extra ? ` (${detail})` : " — more readmissions than CMS models predict"}.`;
  if (lower.includes("conditions tracked under hrrp"))
    return `${value} conditions: AMI, Heart Failure, Pneumonia, COPD, Hip/Knee, and CABG.`;
  if (lower.includes("average excess readmission ratio nationally"))
    return `The national average excess readmission ratio is ${value} — hospitals readmit slightly more patients than CMS models expect.`;
  if (lower.includes("hip/knee average err"))
    return `Hip/Knee averages ${value} — the highest of the six HRRP conditions, nearly 2× the excess of the next closest track.`;
  if (lower.includes("team bundled payment"))
    return `${value} hospitals are mandated in CMS's TEAM bundled payment model as of January 1, 2026.`;
  if (lower.includes("new jersey"))
    return `New Jersey accounts for ${value} of penalized hospital-condition pairs — the highest-risk geography in the working dataset.`;
  if (lower.includes("pokémon lifetime revenue") || lower.includes("pokemon lifetime revenue"))
    return `Pokémon at ${value} — the highest-grossing media franchise in the dataset${extra}.`;
  if (lower.includes("unique franchises in the dataset"))
    return `${value} unique franchises, each with at least $4B in estimated lifetime revenue.`;
  if (lower.includes("minimum threshold for inclusion"))
    return `${value} minimum lifetime revenue for inclusion in the dataset.`;
  if (lower.includes("revenue categories tracked"))
    return `${value} revenue categories: Merchandise, Video Games, Box Office, Home Video, Comic/Manga, Music, TV, and Book Sales.`;
  if (lower.includes("share of all tracked revenue"))
    return `About ${value} of all tracked franchise revenue comes from Merchandise, Licensing & Retail.`;
  if (lower.includes("span of the dataset"))
    return `The dataset spans ${value} — from Winnie the Pooh (1923) to Monster Strike (2015).`;
  if (lower.includes("birth year") && lower.includes("caesar"))
    return `Caesar was born in ${value}, to a patrician family in Rome's Subura district.`;
  if (lower.includes("held captive") && lower.includes("pirates"))
    return `${value} days captive at age 25 — he later crucified every pirate after his release.`;
  if (lower.includes("need for power score"))
    return `${value} Need for Power under Hermann (1999) LTA — near the ceiling of any world leader profiled.`;
  if (lower.includes("veterans and urban poor resettled"))
    return `${value} veterans and urban poor resettled in land colonies during Caesar's dictatorship.`;
  if (lower.includes("peak gdp per capita") && lower.includes("caesar"))
    return `Rome reached peak GDP per capita ${value} after Caesar's assassination.`;
  if (lower.includes("stab wounds"))
    return `${value} stab wounds on the Ides of March, 44 BCE, inflicted by 60 senators.`;
  if (lower.includes("coffee samples rated"))
    return `${value} coffee samples rated by CQI Q Graders across Arabica and Robusta species.`;
  if (lower.includes("median cqi cup score") && lower.includes("ethiopia"))
    return `Ethiopia's median CQI cup score is ${value} — highest of any country with 20+ samples.`;
  if (lower.includes("starbucks locations in ethiopia"))
    return `${value} Starbucks locations in Ethiopia, Kenya, and Uganda — the top three scoring nations.`;
  if (lower.includes("countries with 20+ cqi"))
    return `${value} countries with 20+ CQI-rated Arabica samples, spanning four continents.`;
  if (lower.includes("starbucks locations worldwide"))
    return `${value} Starbucks locations worldwide across 73 countries in the 2018 dataset.`;
  if (lower.includes("biographies indexed by pantheon"))
    return `${value} biographies indexed by Pantheon in public-facing summaries.`;
  if (lower.includes("minimum wikipedia language editions"))
    return `At least ${value} Wikipedia language editions in Pantheon collection logic.`;
  if (lower.includes("scientific data paper for pantheon"))
    return `The Pantheon 1.0 paper appeared in Scientific Data in ${value}.`;
  if (lower.includes("main memory engines"))
    return `${value} main memory engines compared: power, art, and science.`;
  if (lower.includes("memory-capital cities"))
    return `${value} memory-capital cities compared in the charts.`;
  if (lower.includes("total views across all four h3"))
    return `${value} total views across all four H3 channels from 2013–2026${extra}.`;
  if (lower.includes("videos analyzed after filtering"))
    return `${value} videos analyzed after filtering Shorts and zero-view uploads from the original pull${extra}.`;
  if (lower.includes("how much harder h3h3prod​uctions hits"))
    return `${value} — h3h3-prod​uctions median views vs. the H3 Podcast (4.78M vs. 1.05M).`;
  if (lower.includes("entire frenemies era"))
    return `${value} — the Frenemies co-host era (Sep 2020 to Jun 2021), the most-watched stretch in H3 Podcast history.`;
  if (lower.includes("time for western europe to recover"))
    return `Western Europe needed ${value} to recover Rome's peak GDP per capita after the 476 CE collapse.`;
  if (lower.includes("share of global population governed by the british"))
    return `${value} of global population at the British Empire's 1920 territorial peak — 412 million people.`;
  if (lower.includes("imperial china cycled"))
    return `Imperial China cycled through full unification and fragmentation ${value} between 221 BCE and 1912 CE.`;
  if (lower.includes("silver extracted by habsburg"))
    return `Habsburg Spain extracted ${value} of silver from the Americas between 1500 and 1800 as Castilian real wages declined.`;
  if (lower.includes("global population killed in mongol"))
    return `An estimated ${value} of global population was killed in Mongol conquests, 1206–1260 — 30 to 40 million deaths.`;
  if (lower.includes("peak centralization precedes gdp peak"))
    return `Peak centralization precedes GDP peak by ${value} across the six empires analyzed — the institutional lag.`;
  if (lower.includes("approximate average nfl franchise"))
    return `Approximately ${value} average NFL franchise value in recent Forbes-style estimates.`;
  if (lower.includes("nfl regular-season games"))
    return `${value} NFL regular-season games per team.`;
  if (lower.includes("mlb regular-season games"))
    return `${value} MLB regular-season games per team.`;
  if (lower.includes("nba star leverage index"))
    return `${value} NBA star leverage index in this editorial model.`;
  if (lower.includes("leagues compared")) return `${value} leagues compared in this report.`;
  if (lower.includes("musicbrainz core database dump license"))
    return `The MusicBrainz core database dump is released under ${value}.`;
  if (lower.includes("metabrainz published dump cadence"))
    return `MetaBrainz publishes dumps ${value} according to public documentation.`;
  if (lower.includes("json dump entity types"))
    return `${value} JSON dump entity types listed in MusicBrainz documentation.`;
  if (lower.includes("fame paths compared")) return `${value} fame paths compared in the report.`;
  if (lower.includes("artists used as report anchors"))
    return `${value} artists used as report anchors.`;

  if (lower.includes("tbd")) {
    return "Numeric cells remain marked TBD until the working catalog export is attached to this report.";
  }
  if (lower.includes("records in the working dataset")) {
    return `${value} records in the working dataset.`;
  }
  if (lower.includes("unique anime titles")) {
    return `${value} unique anime titles from silent-era shorts to modern streaming originals.`;
  }
  if (lower.includes("median mal score") || lower.includes("overall median mal")) {
    return `The overall median MyAnimeList score is ${value} — the baseline every studio and genre is measured against.`;
  }
  if (lower.includes("share of tv anime")) {
    return `${value} of TV anime titles score 8 or higher on MAL (346 out of 4,260 in the dataset).`;
  }
  if (lower.includes("buried past popularity")) {
    return `${value} high-scoring shows rank below 2,000 in popularity — titles the algorithm rarely surfaces.`;
  }
  if (lower.includes("pearson correlation")) {
    return `The Pearson correlation between score and members is ${value} — popularity predicts quality directionally, not precisely.`;
  }
  if (lower.includes("haruhi") || lower.includes("inflection point")) {
    return `${value} — when light novels became the anime industry's primary outsourced R&D pipeline (the Haruhi inflection point).`;
  }
  if (lower.startsWith("median ")) {
    const metric = label.replace(/^Median\s+/i, "").split("—")[0].trim();
    return `The median ${metric} is ${value}.`;
  }
  if (lower.includes("highest observed")) {
    return `The highest observed value in the extract is ${value}.`;
  }
  if (lower.includes("top country") || lower.includes("top title")) {
    return `${value} leads the ${lower.includes("country") ? "country" : "title"} ranking in this extract.`;
  }
  if (lower.includes("year span")) {
    return `The file covers ${value}.`;
  }
  if (lower.includes("first instance")) {
    return "Molly Tea has announced an appeal; the Suzhou judgment is first instance only and not final.";
  }
  if (label) {
    const clean = label.replace(/\s+—\s+.*$/, "").trim();
    return `${value} — ${clean}.`;
  }
  return value;
}

function buildFaq(data) {
  const keyPoints = Array.isArray(data.keyPoints) ? data.keyPoints : [];
  const items = [];
  const usedQuestions = new Set();

  for (const kp of keyPoints.slice(0, 4)) {
    const { value, label, detail } = parseKeyPoint(kp);
    const question = questionFromKeyPoint(label, value, detail);
    if (usedQuestions.has(question)) continue;
    usedQuestions.add(question);
    items.push({
      question,
      answer: answerFromKeyPoint(value, label, data.description, detail),
    });
  }

  if (items.length < 2 && data.description) {
    const q = "What is this report about?";
    if (!usedQuestions.has(q)) {
      items.unshift({
        question: q,
        answer: String(data.description).trim(),
      });
      usedQuestions.add(q);
    }
  }

  if (items.length < 2 && data.tldr) {
    const q = "What is the main takeaway?";
    if (!usedQuestions.has(q)) {
      items.push({
        question: q,
        answer: String(data.tldr).trim().slice(0, 400),
      });
    }
  }

  return items.slice(0, 4);
}

function fixLede(body) {
  if (body.includes("art-lede")) return { body, changed: false };
  const re = /(<p class="art-p)(?![^"]*art-lede)(")/;
  if (!re.test(body)) return { body, changed: false };
  return { body: body.replace(re, "$1 art-lede$2"), changed: true };
}

function demoteGithub(body) {
  let changed = false;
  let out = body;

  const labelPatterns = [
    /View TidyTuesday source on GitHub/g,
    /View source on GitHub/g,
  ];
  for (const pat of labelPatterns) {
    if (pat.test(out)) {
      out = out.replace(pat, "Source archive (GitHub)");
      changed = true;
    }
  }

  // Move early github wrap after sources/editor if it appears before first h2
  const earlyMatch = out.match(
    /<p class="art-github-wrap">[\s\S]*?<\/p>\s*(?=<h2)/,
  );
  if (earlyMatch) {
    const block = earlyMatch[0];
    out = out.replace(block, "");
    const insertBefore =
      out.match(/<h2 id="editors-note"/) ||
      out.match(/<h2 id="editor-s-note"/) ||
      out.match(/<h2 id="sources"/);
    if (insertBefore) {
      const idx = insertBefore.index;
      out = out.slice(0, idx) + block + out.slice(idx);
      changed = true;
    } else {
      out = out.replace("</main>", block + "</main>");
      changed = true;
    }
  }

  return { body: out, changed };
}

function serializeFaq(faq) {
  const lines = ["faq:"];
  for (const item of faq) {
    const q = item.question.replace(/"/g, '\\"');
    const a = item.answer.replace(/\n/g, " ").trim();
    if (q.length > 60 || /[:?]/.test(q)) {
      lines.push(`  - question: >-`);
      lines.push(`      ${q}`);
    } else {
      lines.push(`  - question: ${q}`);
    }
    lines.push(`    answer: >-`);
    lines.push(`      ${a}`);
  }
  return lines.join("\n");
}

function replaceFaqInRaw(raw, newFaqYaml) {
  const faqStart = raw.indexOf("faq:");
  if (faqStart === -1) return raw;
  const bodyStart = raw.indexOf("\n---", faqStart);
  if (bodyStart === -1) return raw;
  const before = raw.slice(0, faqStart);
  const after = raw.slice(bodyStart);
  return before + newFaqYaml + after;
}

const counts = { faq: 0, lede: 0, github: 0, files: 0 };

for (const file of readdirSync(BLOG).filter((f) => f.endsWith(".md"))) {
  if (SKIP.has(file)) continue;

  const path = join(BLOG, file);
  const raw = readFileSync(path, "utf8");
  const { data, content: body } = matter(raw);
  let newBody = body;
  let newRaw = raw;
  let fileChanged = false;

  if (isStubFaq(data.faq)) {
    const newFaq = buildFaq(data);
    if (newFaq.length >= 2) {
      newRaw = replaceFaqInRaw(raw, serializeFaq(newFaq));
      counts.faq++;
      fileChanged = true;
    }
  }

  const ledeResult = fixLede(newBody);
  if (ledeResult.changed) {
    newBody = ledeResult.body;
    counts.lede++;
    fileChanged = true;
  }

  const githubResult = demoteGithub(newBody);
  if (githubResult.changed) {
    newBody = githubResult.body;
    counts.github++;
    fileChanged = true;
  }

  if (fileChanged) {
    if (newRaw !== raw) {
      // FAQ was replaced in raw; re-attach body
      const bodyMarker = newRaw.indexOf("\n---\n", newRaw.indexOf("---") + 3);
      if (bodyMarker !== -1) {
        newRaw = newRaw.slice(0, bodyMarker + 5) + newBody;
      }
    } else {
      newRaw = matter.stringify(newBody, data);
    }
    writeFileSync(path, newRaw);
    counts.files++;
    console.log(`updated: ${file}`);
  }
}

console.log(JSON.stringify(counts, null, 2));
