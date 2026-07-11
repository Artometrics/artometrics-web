#!/usr/bin/env node
/**
 * Publish upgraded article repos to Artometrics GitHub org on main.
 *
 * Usage:
 *   node scripts/publish-article-repos.mjs              # push all REPO_MAP repos
 *   node scripts/publish-article-repos.mjs readmitted   # push one repo
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CACHE = path.join(ROOT, ".cache/article-repos");
const PILOT = path.join(ROOT, "pilot-drafts");

const REPO_MAP = {
  readmitted: "readmitted",
  anime: "anime",
  coffee: "coffee-the-artometrics-of-java",
  franchise: "franchise",
  imperial: "imperial",
  giant: "giant-the-artometrics-of-a-san-francisco-dynasty",
  h3: "h3-the-artometrics-of-a-youtube-dynasty",
  warrior: "warrior-the-artometrics-of-a-golden-state-dynasty",
  caesar: "caesar-the-psychonomics-of-emperor-julius",
  pokemon: "pokemon",
};

const targets = process.argv.slice(2).length
  ? process.argv.slice(2).filter((r) => REPO_MAP[r])
  : Object.keys(REPO_MAP);

function run(cmd, cwd) {
  execSync(cmd, { cwd, stdio: "inherit" });
}

function copyPilotIntoRepo(repo) {
  const pilotDir = path.join(PILOT, repo);
  const repoDir = path.join(CACHE, repo);
  if (!fs.existsSync(pilotDir)) return 0;

  let copied = 0;
  const walk = (rel = "") => {
    const srcBase = path.join(pilotDir, rel);
    for (const entry of fs.readdirSync(srcBase, { withFileTypes: true })) {
      const relPath = path.join(rel, entry.name);
      const src = path.join(pilotDir, relPath);
      const dest = path.join(repoDir, relPath);
      if (entry.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        walk(relPath);
      } else {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
        copied++;
      }
    }
  };
  walk();
  return copied;
}

function publishRepo(repo) {
  const repoDir = path.join(CACHE, repo);
  if (!fs.existsSync(path.join(repoDir, ".git"))) {
    console.warn(`Skip ${repo}: not cloned — run npm run upgrade:repos first`);
    return;
  }

  const pilotCopied = copyPilotIntoRepo(repo);
  if (pilotCopied) console.log(`${repo}: merged ${pilotCopied} pilot files`);

  const status = execSync("git status --porcelain", { cwd: repoDir, encoding: "utf8" });
  if (!status.trim()) {
    console.log(`${repo}: nothing to push`);
    return;
  }

  run("git add -A", repoDir);
  try {
    run(`git commit -m "Sync Artometrics article assets from artometrics-web pipeline"`, repoDir);
    run("git push origin main", repoDir);
    console.log(`Pushed ${repo} → Artometrics/${repo} (main)`);
  } catch (error) {
    console.warn(
      `${repo}: push failed (need Artometrics org write access). Commit is local in .cache/article-repos/${repo}`
    );
  }
}

for (const repo of targets) {
  publishRepo(repo);
}

console.log("Done.");
