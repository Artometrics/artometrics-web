import { defineCliConfig } from "sanity/cli";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "yourProjectId";
// Dataset comes from env (no hardcoded default that mirrors SANITY_DATASET).
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "development";

export default defineCliConfig({
  api: { projectId, dataset },
});
