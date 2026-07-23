import { chromium } from "playwright";

const base = process.env.PREVIEW_URL ?? "http://127.0.0.1:8081";
const pages = [
  "/readmitted",
  "/yankees-the-artometrics-of-baseballs-empire",
  "/anime",
];

const browser = await chromium.launch({ headless: true });
const notes = [];

async function assertCharts(page, label) {
  const switchers = page.locator(".art-chart-mode-switch");
  const count = await switchers.count();
  if (count < 1) throw new Error(`${label}: expected mode switchers, found ${count}`);

  const first = page.locator("figure.art-chart").first();
  await first.scrollIntoViewIfNeeded();
  const printBtn = first.locator('[data-mode="print"]');
  const interactiveBtn = first.locator('[data-mode="interactive"]');
  const fallback = first.locator(".art-chart-fallback");

  await printBtn.waitFor({ state: "visible", timeout: 15000 });
  if ((await printBtn.getAttribute("aria-selected")) !== "true") {
    throw new Error(`${label}: Print should be selected by default`);
  }
  await fallback.waitFor({ state: "visible", timeout: 15000 });
  await page.waitForFunction(() => {
    const img = document.querySelector("figure.art-chart .art-chart-fallback");
    return !!img && img.complete && img.naturalWidth > 0;
  }, { timeout: 15000 });

  // Image should have real dimensions (not broken).
  const box = await fallback.boundingBox();
  if (!box || box.height < 80) {
    throw new Error(`${label}: PNG fallback height too small (${box?.height})`);
  }

  await interactiveBtn.click();
  await page.waitForFunction(() => {
    const live = document.querySelector("figure.art-chart .art-chart-live");
    return (
      live?.dataset.chartMode === "interactive" &&
      live?.classList.contains("art-chart-live--ready") &&
      (live?.classList.contains("js-plotly-plot") || !!live?.querySelector(".plotly"))
    );
  }, { timeout: 25000 });

  await printBtn.click();
  await fallback.waitFor({ state: "visible", timeout: 8000 });
  notes.push(`PASS charts ${label} (${count} dual-mode)`);
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
    await page.waitForSelector(".art-chart-mode-switch");
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
