import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";

export type PickedImage = {
  uri: string;
  mimeType?: string | null;
  fileName?: string | null;
  width?: number;
  height?: number;
};

/** Pick a single image (camera roll / files). Works on native + web. */
export async function pickImage(options?: {
  allowsEditing?: boolean;
  quality?: number;
}): Promise<PickedImage | null> {
  if (Platform.OS !== "web") {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return null;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: options?.allowsEditing ?? false,
    quality: options?.quality ?? 0.9,
  });
  if (result.canceled || !result.assets?.[0]) return null;
  const asset = result.assets[0];
  return {
    uri: asset.uri,
    mimeType: asset.mimeType,
    fileName: asset.fileName,
    width: asset.width,
    height: asset.height,
  };
}

export type PickedDocument = {
  uri: string;
  name: string;
  mimeType?: string | null;
  size?: number | null;
};

/** Pick a document (JSON, audio, etc.). */
export async function pickDocument(options?: {
  type?: string | string[];
}): Promise<PickedDocument | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: options?.type ?? "*/*",
    copyToCacheDirectory: true,
    multiple: false,
  });
  if (result.canceled || !result.assets?.[0]) return null;
  const asset = result.assets[0];
  return {
    uri: asset.uri,
    name: asset.name,
    mimeType: asset.mimeType,
    size: asset.size,
  };
}
