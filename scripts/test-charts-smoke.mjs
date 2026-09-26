import { chromium } from "playwright";

const base = process.env.PREVIEW_URL ?? "http://127.0.0.1:8081";
const pages = [
  "/readmitted",
  "/yankees",
  "/anime",
];

const browser = await chromium.launch({ headless: true });
const notes = [];

async function assertCharts(page, label) {
  const figures = page.locator("figure.art-chart");
  const count = await figures.count();
  if (count < 1) throw new Error(`${label}: expected charts, found ${count}`);

  const first = figures.first();
  await first.scrollIntoViewIfNeeded();
  const fallback = first.locator(".art-chart-fallback");

  await fallback.waitFor({ state: "visible", timeout: 15000 });
  await page.waitForFunction(() => {
    const img = document.querySelector("figure.art-chart .art-chart-fallback");
    return !!img && img.complete && img.naturalWidth > 0;
  }, { timeout: 15000 });

  const box = await fallback.boundingBox();
  if (!box || box.height < 80) {
    throw new Error(`${label}: PNG fallback height too small (${box?.height})`);
  }

  const switchers = await page.locator(".art-chart-mode-switch").count();
  if (switchers !== 0) {
    throw new Error(`${label}: mode switchers should be removed, found ${switchers}`);
  }

  notes.push(`PASS charts ${label} (${count} static)`);
}

try {
  // Desktop
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    for (const path of pages) {
      await page.goto(`${base}${path}`, { waitUntil: "networkidle", timeout: 60000 });
      await assertCharts(page, `desktop${path}`);
    }

    // Theme toggle survival on readmitted
    await page.goto(`${base}/readmitted`, { waitUntil: "networkidle", timeout: 60000 });
    const headerToggle = page.getByLabel(/Switch to (dark|light) mode/i);
    if (await headerToggle.count()) {
      await headerToggle.click();
      await page.waitForTimeout(500);
      await assertCharts(page, "desktop-after-theme-toggle");
      await headerToggle.click();
      await page.waitForTimeout(500);
      await assertCharts(page, "desktop-after-theme-restore");
    } else {
      await page.evaluate(() => {
        const cur = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = cur;
      });
      await page.waitForTimeout(500);
      await assertCharts(page, "desktop-after-data-theme-flip");
    }
    await page.close();
  }

  // Mobile
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    for (const path of pages) {
      await page.goto(`${base}${path}`, { waitUntil: "networkidle", timeout: 60000 });
      await assertCharts(page, `mobile${path}`);
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 2;
      });
      if (overflow) throw new Error(`mobile${path}: horizontal overflow`);
    }
    await page.close();
  }

  console.log(notes.join("\n"));
  console.log("PASS: charts smoke (desktop + mobile + theme)");
} finally {
  await browser.close();
}
