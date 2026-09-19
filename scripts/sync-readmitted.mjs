#!/usr/bin/env node
/**
 * Sync READMITTED assets from articles/readmitted/ into public/.
 * Thin wrapper around sync-article.mjs (backwards-compatible).
 *
 * Usage:
 *   npm run sync:readmitted
 *   npm run sync:readmitted -- --render
 */

import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const shouldRender = process.argv.includes("--render");

const args = ["node", "scripts/sync-article.mjs", "--slug", "readmitted"];
if (shouldRender) args.push("--render-readmitted");

execSync(args.join(" "), { cwd: ROOT, stdio: "inherit" });
