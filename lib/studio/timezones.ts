/** Curated IANA zones for native / fallback when Intl.supportedValuesOf is missing. */
export const CURATED_TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Anchorage",
  "Pacific/Honolulu",
  "America/Toronto",
  "America/Vancouver",
  "America/Mexico_City",
  "America/Sao_Paulo",
  "America/Argentina/Buenos_Aires",
  "Europe/London",
  "Europe/Dublin",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Madrid",
  "Europe/Rome",
  "Europe/Amsterdam",
  "Europe/Stockholm",
  "Europe/Warsaw",
  "Europe/Athens",
  "Europe/Moscow",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Singapore",
  "Asia/Hong_Kong",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Seoul",
  "Australia/Sydney",
  "Australia/Melbourne",
  "Pacific/Auckland",
  "UTC",
] as const;

export function listTimezones(): string[] {
  try {
    const intl = Intl as unknown as { supportedValuesOf?: (k: string) => string[] };
    const all = intl.supportedValuesOf?.("timeZone");
    if (all?.length) return all;
  } catch {
    /* older runtimes */
  }
  return [...CURATED_TIMEZONES];
}

/** Zero-dep lat/lon → rough IANA timezone suggestion. */
export function suggestTimezone(lat: number, lon: number, countryCode?: string): string {
  const cc = (countryCode || "").toUpperCase();
  if (cc === "US") {
    if (lon < -115) return "America/Los_Angeles";
    if (lon < -100) return "America/Denver";
    if (lon < -85) return "America/Chicago";
    return "America/New_York";
  }
  if (cc === "CA") return lon < -100 ? "America/Vancouver" : "America/Toronto";
  if (cc === "GB" || cc === "IE") return "Europe/London";
  if (cc === "FR") return "Europe/Paris";
  if (cc === "DE") return "Europe/Berlin";
  if (cc === "ES") return "Europe/Madrid";
  if (cc === "IT") return "Europe/Rome";
  if (cc === "NL") return "Europe/Amsterdam";
  if (cc === "SE") return "Europe/Stockholm";
  if (cc === "PL") return "Europe/Warsaw";
  if (cc === "GR") return "Europe/Athens";
  if (cc === "RU") return "Europe/Moscow";
  if (cc === "BR") return "America/Sao_Paulo";
  if (cc === "AR") return "America/Argentina/Buenos_Aires";
  if (cc === "MX") return "America/Mexico_City";
  if (cc === "ZA") return "Africa/Johannesburg";
  if (cc === "EG") return "Africa/Cairo";
  if (cc === "AE") return "Asia/Dubai";
  if (cc === "IN") return "Asia/Kolkata";
  if (cc === "TH") return "Asia/Bangkok";
  if (cc === "SG") return "Asia/Singapore";
  if (cc === "HK") return "Asia/Hong_Kong";
  if (cc === "CN") return "Asia/Shanghai";
  if (cc === "JP") return "Asia/Tokyo";
  if (cc === "KR") return "Asia/Seoul";
  if (cc === "AU") return lon > 140 ? "Australia/Sydney" : "Australia/Melbourne";
  if (cc === "NZ") return "Pacific/Auckland";

  // Longitude bands as last resort
  if (lon < -120) return "America/Los_Angeles";
  if (lon < -90) return "America/Chicago";
  if (lon < -60) return "America/New_York";
  if (lon < -30) return "America/Sao_Paulo";
  if (lon < 15) return "Europe/London";
  if (lon < 40) return "Europe/Berlin";
  if (lon < 60) return "Europe/Moscow";
  if (lon < 80) return "Asia/Dubai";
  if (lon < 100) return "Asia/Kolkata";
  if (lon < 120) return "Asia/Bangkok";
  if (lon < 140) return "Asia/Shanghai";
  if (lon < 155) return "Asia/Tokyo";
  return "Pacific/Auckland";
}
