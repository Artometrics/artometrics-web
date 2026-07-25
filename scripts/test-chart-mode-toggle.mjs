import { chromium } from "playwright";

const base = process.env.PREVIEW_URL ?? "http://127.0.0.1:4321";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(`${base}/readmitted/`, { waitUntil: "networkidle" });

  const switchers = page.locator(".art-chart-mode-switch");
  const count = await switchers.count();
  if (count !== 5) {
    throw new Error(`Expected 5 chart mode switchers on readmitted, found ${count}`);
  }

  const firstChart = page.locator("figure.art-chart").first();
  await firstChart.scrollIntoViewIfNeeded();
  const printBtn = firstChart.locator('[data-mode="print"]');
  const firstLive = firstChart.locator(".art-chart-live");
  const firstFallback = firstLive.locator(".art-chart-fallback");

  await printBtn.waitFor({ state: "visible" });
  const printSelected = await printBtn.getAttribute("aria-selected");
  if (printSelected !== "true") {
    throw new Error("Print mode should be selected by default");
  }

  await firstFallback.waitFor({ state: "visible", timeout: 15000 });
  await page.waitForFunction(() => {
    const img = document.querySelector("figure.art-chart .art-chart-fallback");
    return !!img && img.complete && img.naturalWidth > 0;
  }, { timeout: 15000 });
  if (!(await firstFallback.isVisible())) {
    throw new Error("Static PNG fallback should be visible in print mode");
  }

  await firstChart.locator('[data-mode="interactive"]').click();

  await page.waitForFunction(() => {
    const live = document.querySelector("figure.art-chart .art-chart-live");
    return (
      live?.dataset.chartMode === "interactive" &&
      live?.classList.contains("art-chart-live--ready") &&
      !live?.classList.contains("art-chart-live--static") &&
      (live?.classList.contains("js-plotly-plot") || !!live?.querySelector(".plotly"))
    );
  }, { timeout: 20000 });

  const plotReady = await firstLive.evaluate((live) =>
    Boolean(live.classList.contains("js-plotly-plot") || live.querySelector(".plotly"))
  );
  if (!plotReady) {
    throw new Error("Plotly chart should render after switching to interactive");
  }

  const fallbackHidden = (await firstFallback.count()) === 0 || !(await firstFallback.isVisible());
  if (!fallbackHidden) {
    throw new Error("PNG fallback should hide in interactive mode");
  }

  await firstChart.locator('[data-mode="print"]').click();
  await firstFallback.waitFor({ state: "visible", timeout: 5000 });
  if (!(await firstFallback.isVisible())) {
    throw new Error("PNG fallback should return after switching back to print");
  }

  console.log("PASS: readmitted chart Print/Interactive toggle works");
} finally {
  await browser.close();
}
