/**
 * Small-secret storage. Uses SecureStore on native, kv (localStorage) on web.
 * Prefer for tokens/secrets under SecureStore size limits; sessions use kv/MMKV.
 */
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { kv } from "@/lib/storage/kv";

export async function getSecret(key: string): Promise<string | null> {
  if (Platform.OS === "web") return kv.getItem(key);
  try {
    return await SecureStore.getItemAsync(key);
  } catch {
    return kv.getItem(key);
  }
}

export async function setSecret(key: string, value: string): Promise<void> {
  if (Platform.OS === "web") {
    await kv.setItem(key, value);
    return;
  }
  try {
    await SecureStore.setItemAsync(key, value);
  } catch {
    await kv.setItem(key, value);
  }
}

export async function deleteSecret(key: string): Promise<void> {
  if (Platform.OS === "web") {
    await kv.removeItem(key);
    return;
  }
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {
    await kv.removeItem(key);
  }
}
