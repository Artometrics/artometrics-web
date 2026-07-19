#!/usr/bin/env node
/**
 * Parse Artometrics markdown collections into JSON for the Expo app.
 * Also copies author/thumbnail images from src/images → public/images.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync, cpSync, existsSync } from "node:fs";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/generated");
const CONTENT = join(ROOT, "src/content");

mkdirSync(OUT, { recursive: true });

function listFiles(dir, exts = [".md", ".mdx"]) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => exts.includes(extname(f)))
    .map((f) => join(dir, f));
}

function rewriteAssetUrl(url) {
  if (typeof url !== "string") return url;
  return url
    .replace(/^\/src\/images\//, "/images/")
    .replace(/^\.\.\/\.\.\/images\//, "/images/")
    .replace(/^\/src\//, "/");
}

function normalizeImageField(value) {
  if (!value) return value;
  if (typeof value === "string") return rewriteAssetUrl(value);
  if (typeof value === "object" && value.url) {
    return { ...value, url: rewriteAssetUrl(value.url) };
  }
  return value;
}

function copyDirIfExists(from, to) {
  if (!existsSync(from)) return;
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
}

// Expose author/thumbnail assets at public/images/*
copyDirIfExists(join(ROOT, "src/images/authors"), join(ROOT, "public/images/authors"));
copyDirIfExists(join(ROOT, "src/images/thumbnails"), join(ROOT, "public/images/thumbnails"));
copyDirIfExists(join(ROOT, "src/images/about"), join(ROOT, "public/images/about"));

const blog = listFiles(join(CONTENT, "blog")).map((file) => {
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const id = basename(file, extname(file));
  return {
    id,
    title: data.title,
    slug: data.slug ?? id,
    pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : null,
    description: data.description ?? "",
    heroImage: rewriteAssetUrl(data.heroImage ?? ""),
    tags: data.tags ?? [],
    author: data.author ?? null,
    draft: Boolean(data.draft),
    body: content.trim(),
    bodyFormat: "html",
  };
});

const podcast = listFiles(join(CONTENT, "podcast")).map((file) => {
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const id = basename(file, extname(file));
  return {
    id,
    title: data.title,
    pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : null,
    description: data.description ?? "",
    author: data.author ?? "",
    image: normalizeImageField(data.image),
    guestAvatar: normalizeImageField(data.guestAvatar),
    episodeNumber: data.episodeNumber ?? null,
    duration: data.duration ?? null,
    audioSrc: data.audioSrc ?? null,
    tags: data.tags ?? [],
    isRecent: Boolean(data.isRecent),
    isPopular: Boolean(data.isPopular),
    isLocked: Boolean(data.isLocked),
    body: marked.parse(content.trim(), { async: false }),
    bodyFormat: "html",
  };
});

const authors = listFiles(join(CONTENT, "authors"), [".md"]).map((file) => {
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const id = basename(file, extname(file));
  return {
    id,
    name: data.name,
    role: data.role ?? null,
    bio: data.bio ?? content.trim() ?? null,
    image: normalizeImageField(data.image),
    socials: data.socials ?? null,
  };
});

const legal = listFiles(join(CONTENT, "legal"), [".md"]).map((file) => {
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const id = basename(file, extname(file));
  return {
    id,
    page: data.page ?? id,
    pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : null,
    body: marked.parse(content.trim(), { async: false }),
    bodyFormat: "html",
  };
});

writeFileSync(join(OUT, "blog.json"), JSON.stringify(blog, null, 2));
writeFileSync(join(OUT, "podcast.json"), JSON.stringify(podcast, null, 2));
writeFileSync(join(OUT, "authors.json"), JSON.stringify(authors, null, 2));
writeFileSync(join(OUT, "legal.json"), JSON.stringify(legal, null, 2));

const index = {
  blog: blog.length,
  podcast: podcast.length,
  authors: authors.length,
  legal: legal.length,
  generatedAt: new Date().toISOString(),
};
writeFileSync(join(OUT, "index.json"), JSON.stringify(index, null, 2));

console.log(
  `Content built → src/generated/ (${blog.length} blog, ${podcast.length} podcast, ${authors.length} authors, ${legal.length} legal)`,
);
