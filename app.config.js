/**
 * Dynamic Expo config so EXPO_PUBLIC_* from Netlify / EAS / .env
 * land in Constants.expoConfig.extra (required for static web export).
 *
 * On EAS Build, regenerate src/generated/* before Metro bundles reports
 * (same step Netlify runs via `npm run build`).
 */
const { execSync } = require("node:child_process");

if (process.env.EAS_BUILD === "true") {
  execSync("npm run content:ensure", { stdio: "inherit" });
}

module.exports = ({ config }) => {
  const supabaseUrl =
    process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
  const supabaseAnon =
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.PUBLIC_SUPABASE_ANON_KEY;
  const siteUrl =
    process.env.EXPO_PUBLIC_SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    "https://artometrics.com";
  const gaId = process.env.EXPO_PUBLIC_GA_ID || "";

  return {
    ...config,
    extra: {
      ...(config.extra || {}),
      eas: {
        ...(config.extra?.eas || {}),
        projectId:
          config.extra?.eas?.projectId ||
          "d286d6de-4a63-43fd-b0eb-fe83fffcd3cc",
      },
      EXPO_PUBLIC_SITE_URL: siteUrl,
      EXPO_PUBLIC_SUPABASE_URL: supabaseUrl,
      EXPO_PUBLIC_SUPABASE_ANON_KEY: supabaseAnon,
      EXPO_PUBLIC_GA_ID: gaId,
      PUBLIC_SITE_URL: siteUrl,
      PUBLIC_SUPABASE_URL: supabaseUrl,
      PUBLIC_SUPABASE_ANON_KEY: supabaseAnon,
    },
  };
};
