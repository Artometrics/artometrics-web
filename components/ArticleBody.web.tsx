import { createElement, useEffect, useRef } from "react";
import { Colors } from "@/constants/Colors";

declare global {
  interface Window {
    Plotly?: typeof import("plotly.js-dist-min");
  }
}

async function hydrateCharts(root: HTMLElement) {
  const nodes = root.querySelectorAll<HTMLElement>(".art-chart-live[data-chart]");
  if (!nodes.length) return;

  let Plotly = window.Plotly;
  if (!Plotly) {
    try {
      Plotly = (await import("plotly.js-dist-min")).default;
      window.Plotly = Plotly;
    } catch {
      // Fall through to PNG fallbacks.
    }
  }

  for (const el of Array.from(nodes)) {
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
    } catch {
      showFallback();
    }
  }
}

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
    style: { width: "100%" },
  });
}
