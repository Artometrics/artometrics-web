/**
 * Cross-platform key/value storage.
 * Native: MMKV (fast). Web: localStorage / AsyncStorage fallback.
 */
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type KvStorage = {
  getString: (key: string) => string | undefined;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
  /** Supabase auth adapter (async) */
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

function webStorage(): KvStorage {
  const memory = new Map<string, string>();
  const canUseLocal =
    typeof localStorage !== "undefined" && Platform.OS === "web";

  const read = (key: string) => {
    try {
      if (canUseLocal) return localStorage.getItem(key) ?? undefined;
    } catch {
      /* private mode */
    }
    return memory.get(key);
  };
  const write = (key: string, value: string) => {
    memory.set(key, value);
    try {
      if (canUseLocal) localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  };
  const del = (key: string) => {
    memory.delete(key);
    try {
      if (canUseLocal) localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  };

  return {
    getString: read,
    set: write,
    remove: del,
    getItem: async (key) => read(key) ?? null,
    setItem: async (key, value) => write(key, value),
    removeItem: async (key) => del(key),
  };
}

function mmkvStorage(): KvStorage {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createMMKV } = require("react-native-mmkv") as typeof import("react-native-mmkv");
  const mmkv = createMMKV({ id: "artometrics" });
  return {
    getString: (key) => mmkv.getString(key),
    set: (key, value) => mmkv.set(key, value),
    remove: (key) => mmkv.remove(key),
    getItem: async (key) => mmkv.getString(key) ?? null,
    setItem: async (key, value) => {
      mmkv.set(key, value);
    },
    removeItem: async (key) => {
      mmkv.remove(key);
    },
  };
}

function asyncStorageBridge(): KvStorage {
  const cache = new Map<string, string>();
  return {
    getString: (key) => cache.get(key),
    set: (key, value) => {
      cache.set(key, value);
      void AsyncStorage.setItem(key, value);
    },
    remove: (key) => {
      cache.delete(key);
      void AsyncStorage.removeItem(key);
    },
    getItem: (key) => AsyncStorage.getItem(key),
    setItem: (key, value) => AsyncStorage.setItem(key, value),
    removeItem: (key) => AsyncStorage.removeItem(key),
  };
}

function createKv(): KvStorage {
  if (Platform.OS === "web") return webStorage();
  try {
    return mmkvStorage();
  } catch {
    return asyncStorageBridge();
  }
}

export const kv = createKv();
