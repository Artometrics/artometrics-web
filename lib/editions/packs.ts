import available from "../../public/exports/editions/available.json";

export type EditionPackAvailability = {
  epub?: boolean;
  pdf?: boolean;
};

const packs = available as Record<string, EditionPackAvailability>;

export function getEditionPacks(editionId: string): EditionPackAvailability {
  return packs[editionId] ?? {};
}

export function editionEpubHref(editionId: string): string {
  return `/exports/editions/${editionId}.epub`;
}

export function editionPdfHref(editionId: string): string {
  return `/exports/editions/${editionId}.pdf`;
}
