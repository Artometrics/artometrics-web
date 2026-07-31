import { create } from "zustand";
import { kv } from "@/lib/storage/kv";

type StudioUiState = {
  lastTool: "twilda" | "aftercare" | "samples" | "palette" | null;
  setLastTool: (t: StudioUiState["lastTool"]) => void;
  hydrate: () => void;
};

const LAST_TOOL_KEY = "artometrics-studio-last-tool";

export const useStudioStore = create<StudioUiState>((set) => ({
  lastTool: null,
  setLastTool: (t) => {
    set({ lastTool: t });
    if (t) kv.set(LAST_TOOL_KEY, t);
    else kv.remove(LAST_TOOL_KEY);
  },
  hydrate: () => {
    const saved = kv.getString(LAST_TOOL_KEY);
    if (
      saved === "twilda" ||
      saved === "aftercare" ||
      saved === "samples" ||
      saved === "palette"
    ) {
      set({ lastTool: saved });
    }
  },
}));
