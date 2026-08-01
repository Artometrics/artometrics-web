import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "yourProjectId";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "prod​uction";

export default defineConfig({
  name: "artometrics",
  title: "Artometrics",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
