import { Redirect } from "expo-router";

/** Legacy tools hub → Studio. */
export default function ToolsRedirect() {
  return <Redirect href="/studio" />;
}
