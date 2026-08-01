import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "yourProjectId";
// Dataset comes from SANITY_DATASET / SANITY_STUDIO_DATASET (no hardcoded default).
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "development";

export default defineConfig({
  name: "artometrics",
  title: "Artometrics",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
