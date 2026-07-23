import { existsSync, mkdirSync, readdirSync, writeFileSync, statSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(ROOT, "src/generated/downloads.json");
const blog = JSON.parse(readFileSync(join(ROOT, "src/generated/blog.json"), "utf8"));

function firstExisting(paths) {
  for (const p of paths) {
    const rel = p.replace(/^\//, "");
    if (existsSync(join(ROOT, "public", rel))) return p.startsWith("/") ? p : `/${p}`;
  }
  return null;
}

function findCsv(slug) {
  const bases = [
    `data/articles/${slug}`,
    `data/articles/${slug}/data`,
    `images/content/articles/${slug}`,
  ];
  for (const base of bases) {
    const abs = join(ROOT, "public", base);
    if (!existsSync(abs)) continue;
    const walk = (dir, prefix) => {
      for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        const st = statSync(full);
        if (st.isDirectory()) {
          const hit = walk(full, `${prefix}/${name}`);
          if (hit) return hit;
        } else if (name.endsWith(".csv")) {
          return `/${prefix}/${name}`.replace(/\/+/g, "/");
        }
      }
      return null;
    };
    const hit = walk(abs, base);
    if (hit) return hit;
  }
  return null;
}

const manifest = {};
for (const post of blog) {
  const slug = post.slug;
  const github = `https://github.com/Artometrics/${slug}`;
  const dataset = findCsv(slug);
  const html = firstExisting([
    `/data/articles/${slug}/article.html`,
    `/exports/${slug}.html`,
  ]);
  const pdf = firstExisting([
    `/data/articles/${slug}/article.pdf`,
    `/exports/${slug}.pdf`,
  ]);
  const epub = firstExisting([
    `/data/articles/${slug}/article.epub`,
    `/exports/${slug}.epub`,
  ]);
  const audio = firstExisting([
    `/audios/${slug}.mp3`,
    `/data/articles/${slug}/narration.mp3`,
  ]);
  const quarto = firstExisting([
    `/data/articles/${slug}/source.zip`,
    `/exports/${slug}-source.zip`,
  ]);
  manifest[slug] = {
    slug,
    dataset,
    quarto,
    html,
    pdf,
    epub,
    audio,
    github: post.draft ? null : github,
  };
}

if (manifest.readmitted) {
  manifest.readmitted.dataset =
    manifest.readmitted.dataset ||
    "/data/articles/readmitted/data/hrrp_condition_err.csv";
  manifest.readmitted.github = "https://github.com/Artometrics/artometrics-web";
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Downloads manifest → ${OUT} (${Object.keys(manifest).length} slugs)`);

