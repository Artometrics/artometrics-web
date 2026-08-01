import { defineCliConfig } from "sanity/cli";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "yourProjectId";
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "prod​uction";

export default defineCliConfig({
  api: { projectId, dataset },
});
