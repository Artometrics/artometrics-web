import { createElement, useEffect, useRef } from "react";
import { Colors } from "@/constants/Colors";

type PlotlyLike = {
  newPlot: (
    el: HTMLElement,
    data: unknown[],
    layout?: Record<string, unknown>,
    config?: Record<string, unknown>,
  ) => Promise<unknown> | unknown;
};

declare global {
  interface Window {
    Plotly?: PlotlyLike;
  }
}

function loadPlotlyFromCdn(): Promise<PlotlyLike | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.Plotly) return Promise.resolve(window.Plotly);

  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-artometrics-plotly="1"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Plotly ?? null), {
        once: true,
      });
      existing.addEventListener("error", () => resolve(null), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.plot.ly/plotly-2.35.2.min.js";
    script.async = true;
    script.dataset.artometricsPlotly = "1";
    script.onload = () => resolve(window.Plotly ?? null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
}

async function hydrateCharts(root: HTMLElement) {
  const nodes = root.querySelectorAll<HTMLElement>(".art-chart-live[data-chart]");
  if (!nodes.length) return;

  const Plotly = await loadPlotlyFromCdn();

  for (const el of Array.from(nodes)) {
    if (el.dataset.hydrated === "1") continue;
    const chartUrl = el.getAttribute("data-chart");
    const fallback = el.getAttribute("data-fallback");
    el.classList.add("art-chart-live--loading");

    const showFallback = () => {
      if (!fallback) return;
      el.innerHTML = "";
      const img = document.createElement("img");
      img.src = fallback;
      img.alt = el.getAttribute("data-title") || "Chart";
      img.className = "art-chart-fallback";
      img.style.width = "100%";
      img.style.height = "auto";
      el.appendChild(img);
      el.classList.add("art-chart-live--static", "art-chart-live--ready");
      el.classList.remove("art-chart-live--loading");
      el.dataset.hydrated = "1";
    };

    if (!chartUrl || !Plotly) {
      showFallback();
      continue;
    }

    try {
      const res = await fetch(chartUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();
      el.innerHTML = "";
      await Plotly.newPlot(
        el,
        payload.data ?? [],
        {
          ...(payload.layout ?? {}),
          paper_bgcolor: Colors.cream,
          plot_bgcolor: Colors.cream,
          font: { family: "Georgia, serif", color: Colors.chartDark },
          colorway: [Colors.chartHighlight, Colors.chartDark, Colors.chartMid],
        },
        {
          ...(payload.config ?? {}),
          responsive: true,
          displayModeBar: false,
        },
      );
      el.classList.add("art-chart-live--ready");
      el.classList.remove("art-chart-live--loading");
      el.dataset.hydrated = "1";
    } catch {
      showFallback();
    }
  }
}

/**
 * Crawlable HTML in the static export (AEO), charts enhanced client-side.
 */
export function ArticleBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    void hydrateCharts(node);
  }, [html]);

  return createElement("div", {
    ref,
    className: "artometrics-article-body",
    dangerouslySetInnerHTML: { __html: html },
    suppressHydrationWarning: true,
    style: { width: "100%" },
  });
}
