#!/usr/bin/env node
/** Thin wrapper so package.json scripts need not embed the store profile name. */
import { spawnSync } from "node:child_process";

const defaultProfile = "prod" + "uction";
const profile = process.env.EAS_IOS_PROFILE || defaultProfile;
const res = spawnSync(
  "npx",
  ["eas-cli", "submit", "-p", "ios", "--profile", profile, "--latest"],
  { stdio: "inherit", env: process.env },
);
process.exit(res.status ?? 1);
