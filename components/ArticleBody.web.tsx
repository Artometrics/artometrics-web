import { createElement, useEffect, useRef } from "react";
import { Colors } from "@/constants/Colors";

type ChartViewMode = "print" | "interactive";

type PlotlyLike = {
  newPlot: (
    el: HTMLElement,
    data: unknown[],
    layout?: Record<string, unknown>,
    config?: Record<string, unknown>,
  ) => Promise<unknown> | unknown;
  purge?: (el: HTMLElement) => void;
  Plots?: { resize?: (el: HTMLElement) => void };
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

function showFallback(live: HTMLElement, fallback: string, label: string | null) {
  live.innerHTML = "";
  const img = document.createElement("img");
  img.src = fallback;
  img.alt = label || live.getAttribute("data-title") || "Chart";
  img.className = "art-chart-fallback";
  // Eager: lazy + SPA re-renders left charts as empty gray boxes below the fold.
  img.loading = "eager";
  img.decoding = "async";
  img.style.width = "100%";
  img.style.height = "auto";
  live.appendChild(img);
  live.classList.add("art-chart-live--static", "art-chart-live--ready");
  live.classList.remove("art-chart-live--loading");
}

function hideFallback(live: HTMLElement) {
  live.querySelectorAll(".art-chart-fallback").forEach((node) => node.remove());
  live.classList.remove("art-chart-live--static");
}

function markReady(live: HTMLElement, isStatic: boolean) {
  live.classList.add("art-chart-live--ready");
  live.classList.remove("art-chart-live--loading");
  live.classList.toggle("art-chart-live--static", isStatic);
  live.dataset.hydrated = "1";
}

function updateChartModeTabs(figure: HTMLElement, mode: ChartViewMode) {
  figure.querySelectorAll<HTMLButtonElement>(".art-chart-mode-switch__btn").forEach((btn) => {
    const active = btn.dataset.mode === mode;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", String(active));
  });
  figure.classList.toggle("art-chart--print", mode === "print");
  figure.classList.toggle("art-chart--interactive", mode === "interactive");
}

function initChartModeSwitch(
  figure: HTMLElement,
  live: HTMLElement,
  setMode: (mode: ChartViewMode) => void,
) {
  if (figure.querySelector(".art-chart-mode-switch")) return;

  const switcher = document.createElement("div");
  switcher.className = "art-chart-mode-switch";
  switcher.setAttribute("role", "tablist");
  switcher.setAttribute("aria-label", "Chart view mode");

  (
    [
      {
        mode: "print" as const,
        label: "Print",
        hint: "Static R export — best for reading and sharing",
      },
      {
        mode: "interactive" as const,
        label: "Interactive",
        hint: "HTML chart — hover for values and explore",
      },
    ] as const
  ).forEach(({ mode, label, hint }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "art-chart-mode-switch__btn";
    btn.dataset.mode = mode;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", mode === "print" ? "true" : "false");
    btn.title = hint;
    btn.textContent = label;
    if (mode === "print") btn.classList.add("is-active");
    btn.addEventListener("click", () => {
      if (live.dataset.chartMode === mode) return;
      setMode(mode);
    });
    switcher.appendChild(btn);
  });

  figure.prepend(switcher);
  figure.classList.add("art-chart--has-mode", "art-chart--print");
}

async function renderInteractive(live: HTMLElement, Plotly: PlotlyLike) {
  const chartUrl = live.getAttribute("data-chart");
  if (!chartUrl) throw new Error("missing data-chart");

  live.classList.add("art-chart-live--loading");
  hideFallback(live);

  const res = await fetch(chartUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const payload = (await res.json()) as {
    data?: unknown[];
    layout?: Record<string, unknown> & {
      margin?: { l?: number; r?: number; t?: number; b?: number };
    };
    config?: Record<string, unknown>;
  };
  const dark =
    typeof document !== "undefined" &&
    document.documentElement.dataset.theme === "dark";
  const margin = payload.layout?.margin ?? {};

  // Clear prior plot nodes but keep mode switch outside the live node.
  live.innerHTML = "";

  await Plotly.newPlot(
    live,
    payload.data ?? [],
    {
      ...(payload.layout ?? {}),
      paper_bgcolor: dark ? "#171717" : Colors.cream,
      plot_bgcolor: dark ? "#171717" : Colors.cream,
      font: {
        family: "Georgia, serif",
        color: dark ? "#FAFAFA" : Colors.chartDark,
      },
      colorway: [
        Colors.chartHighlight,
        dark ? "#E5E5E5" : Colors.chartDark,
        Colors.chartMid,
      ],
      autosize: true,
      margin: {
        ...margin,
        l: Math.max(Number(margin.l ?? 48), 40),
        r: Math.max(Number(margin.r ?? 24), 16),
        t: Math.max(Number(margin.t ?? 48), 32),
        b: Math.max(Number(margin.b ?? 48), 40),
      },
    },
    {
      ...(payload.config ?? {}),
      responsive: true,
      displayModeBar: false,
    },
  );

  markReady(live, false);
  // Mobile orientation / late layout: nudge Plotly once more after paint.
  requestAnimationFrame(() => {
    try {
      Plotly.Plots?.resize?.(live);
    } catch {
      /* ignore */
    }
  });
}

async function setChartViewMode(
  live: HTMLElement,
  mode: ChartViewMode,
  Plotly: PlotlyLike | null,
) {
  const figure = live.closest<HTMLElement>("figure.art-chart");
  const fallback = live.getAttribute("data-fallback");
  const chartUrl = live.getAttribute("data-chart");
  const label = live.getAttribute("aria-label");
  if (!figure) return;

  live.dataset.chartMode = mode;
  updateChartModeTabs(figure, mode);

  if (mode === "print") {
    if (fallback) {
      if (Plotly?.purge && live.querySelector(".js-plotly-plot, .plotly")) {
        try {
          Plotly.purge(live);
        } catch {
          /* ignore */
        }
      }
      showFallback(live, fallback, label);
      markReady(live, true);
      return;
    }
    // No PNG — stay interactive if possible.
    if (Plotly && chartUrl) {
      try {
        await renderInteractive(live, Plotly);
        return;
      } catch {
        /* fall through */
      }
    }
    return;
  }

  if (!Plotly || !chartUrl) {
    if (fallback) {
      showFallback(live, fallback, label);
      markReady(live, true);
    }
    return;
  }

  try {
    await renderInteractive(live, Plotly);
  } catch {
    if (fallback) {
      showFallback(live, fallback, label);
      markReady(live, true);
      live.dataset.chartMode = "print";
      updateChartModeTabs(figure, "print");
    }
  }
}

async function hydrateCharts(root: HTMLElement) {
  const nodes = root.querySelectorAll<HTMLElement>(".art-chart-live[data-chart]");
  if (!nodes.length) return;

  const dualMode: HTMLElement[] = [];
  const interactiveOnly: HTMLElement[] = [];

  for (const live of Array.from(nodes)) {
    if (live.dataset.hydrated === "1") continue;
    const figure = live.closest<HTMLElement>("figure.art-chart");
    const fallback = live.getAttribute("data-fallback");
    const chartUrl = live.getAttribute("data-chart");

    if (fallback && chartUrl && figure) {
      live.dataset.chartMode = "print";
      showFallback(live, fallback, live.getAttribute("aria-label"));
      markReady(live, true);
      initChartModeSwitch(figure, live, (mode) => {
        void loadPlotlyFromCdn().then((Plotly) => setChartViewMode(live, mode, Plotly));
      });
      dualMode.push(live);
      continue;
    }

    if (fallback) {
      showFallback(live, fallback, live.getAttribute("aria-label"));
      markReady(live, true);
      continue;
    }

    if (chartUrl) interactiveOnly.push(live);
  }

  if (!interactiveOnly.length && !dualMode.length) return;

  // Prefetch Plotly when any interactive path may be used.
  const Plotly = await loadPlotlyFromCdn();

  if (interactiveOnly.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const live = entry.target as HTMLElement;
          observer.unobserve(live);
          void setChartViewMode(live, "interactive", Plotly);
        }
      },
      { threshold: 0, rootMargin: "120px 0px 80px 0px" },
    );
    interactiveOnly.forEach((node) => observer.observe(node));
  }

  // Resize interactive plots on viewport changes (mobile rotate / desktop resize).
  const onResize = () => {
    if (!Plotly?.Plots?.resize) return;
    root.querySelectorAll<HTMLElement>(".art-chart-live.js-plotly-plot").forEach((el) => {
      try {
        Plotly.Plots?.resize?.(el);
      } catch {
        /* ignore */
      }
    });
  };
  window.addEventListener("resize", onResize, { passive: true });
  // Store cleanup hook on root for effect teardown.
  (root as HTMLElement & { __artChartCleanup?: () => void }).__artChartCleanup = () => {
    window.removeEventListener("resize", onResize);
  };
}

/**
 * Crawlable HTML in the static export (AEO), charts enhanced client-side.
 * Dual-mode charts default to Print (static R PNG) with an Interactive HTML toggle.
 *
 * Parent theme toggles re-render this component and can reset dangerouslySetInnerHTML
 * without changing `html`, wiping JS-injected mode switches. We therefore re-hydrate
 * whenever unhydrated chart nodes appear.
 */
export function ArticleBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let cancelled = false;
    let raf = 0;
    const run = () => {
      if (cancelled) return;
      const needs = node.querySelector(
        '.art-chart-live[data-chart]:not([data-hydrated="1"])',
      );
      if (needs) void hydrateCharts(node);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(run);
    };

    run();
    // React may replace children after paint when ancestors re-render (theme, layout).
    const mo = new MutationObserver(schedule);
    mo.observe(node, { childList: true, subtree: true });

    // Re-paint interactive plots when the document theme flips.
    const onTheme = () => {
      const hosts = node.querySelectorAll<HTMLElement>(
        '.art-chart-live[data-chart-mode="interactive"]',
      );
      if (!hosts.length) return;
      void loadPlotlyFromCdn().then((Plotly) => {
        if (!Plotly) return;
        hosts.forEach((live) => {
          void renderInteractive(live, Plotly);
        });
      });
    };
    const themeMo = new MutationObserver(onTheme);
    if (typeof document !== "undefined") {
      themeMo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      mo.disconnect();
      themeMo.disconnect();
      const cleanup = (node as HTMLElement & { __artChartCleanup?: () => void })
        .__artChartCleanup;
      cleanup?.();
    };
  }, [html]);

  return createElement("div", {
    ref,
    className: "artometrics-article-body",
    dangerouslySetInnerHTML: { __html: html },
    suppressHydrationWarning: true,
    style: { width: "100%" },
  });
}
