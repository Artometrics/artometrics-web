import Plotly from "plotly.js-dist-min";

type PlotlyTrace = Plotly.Data;
type PlotlyLayout = Partial<Plotly.Layout>;
type PlotlyConfig = Partial<Plotly.Config>;

interface PlotlyExport {
  data?: PlotlyTrace[];
  layout?: PlotlyLayout;
  config?: PlotlyConfig;
}

const ART_COLORS = {
  highlight: "#C0392B",
  secondary: "#2C3E6B",
  mid: "#6B6B6B",
  cream: "#F2F0EB",
  dark: "#1C1C1E",
};

const MIN_PLOT_HEIGHT = 80;
const MAX_LIVE_TRACES = 150;
const MAX_LIVE_POINTS = 60_000;

const chartPromises = new Map<string, Promise<PlotlyExport>>();

function cleanTraces(data: PlotlyTrace[]) {
  return data.map((trace) => {
    const copy = JSON.parse(JSON.stringify(trace)) as Record<string, unknown>;
    delete copy.frame;
    delete copy.uid;
    return copy as PlotlyTrace;
  });
}

function stackChartTitle(text: string): string {
  if (!text) return text;

  let stacked = text.trim();

  // Normalize em/en dashes to line breaks for mobile readability
  if (/\s+[—–-]\s+/.test(stacked)) {
    stacked = stacked.replace(/\s+[—–]\s+/g, "<br>");
    stacked = stacked.replace(/\s+-\s+/g, "<br>");
    return stacked;
  }

  const plainLength = stacked.replace(/<[^>]+>/g, "").trim().length;
  if (plainLength > 32) {
    stacked = stacked.replace(/\s+(BY|VS|OVER|WITH|FROM|INTO|ACROSS)\s+/gi, "<br>$1 ");
    if (stacked.includes("<br>")) return stacked;
    const words = stacked.replace(/<[^>]+>/g, "").trim().split(/\s+/);
    if (words.length > 5) {
      const mid = Math.ceil(words.length / 2);
      const plain = words.slice(0, mid).join(" ") + "<br>" + words.slice(mid).join(" ");
      return plain;
    }
  }

  return stacked;
}

function centerAxisTitle(title: unknown) {
  if (!title) return title;
  if (typeof title === "string") {
    return { text: title, standoff: 8 };
  }
  if (typeof title === "object") {
    return { ...(title as Record<string, unknown>), standoff: 8 };
  }
  return title;
}

function fixTitle(layout: PlotlyLayout): PlotlyLayout["title"] {
  if (!layout.title) return layout.title;
  const title =
    typeof layout.title === "string" ? { text: layout.title } : { ...layout.title };
  const stackedText = stackChartTitle(title.text ?? "");
  const lineCount = (stackedText.match(/<br\s*\/?>/gi) ?? []).length + 1;
  const baseSize =
    typeof title.font === "object" && title.font?.size
      ? Number(title.font.size)
      : 16;

  return {
    ...title,
    text: stackedText,
    font: {
      ...(typeof title.font === "object" ? title.font : {}),
      size: Math.min(baseSize, lineCount > 1 ? 14 : 15),
      family: "DM Sans, Helvetica, sans-serif",
    },
    automargin: true,
    xref: "paper",
    x: 0.5,
    xanchor: "center",
    pad: { t: 6, b: 2, l: 12, r: 12 },
  };
}

function countTracePoints(data: PlotlyTrace[]) {
  let points = 0;
  for (const trace of data) {
    const record = trace as Record<string, unknown>;
    if (Array.isArray(record.x)) points += record.x.length;
    else if (Array.isArray(record.z)) points += record.z.length;
    else if (Array.isArray(record.y)) points += record.y.length;
  }
  return points;
}

function isTooHeavyForLivePlot(spec: PlotlyExport) {
  const data = spec.data ?? [];
  if (data.length > MAX_LIVE_TRACES) return true;
  return countTracePoints(data) > MAX_LIVE_POINTS;
}

function extractTitleHtml(raw: PlotlyExport): string {
  const title = raw.layout?.title;
  if (!title) return "";
  const text = typeof title === "string" ? title : (title.text ?? "");
  return stackChartTitle(text);
}

function headingCropForLines(lineCount: number): string {
  if (lineCount >= 3) return "8.5rem";
  if (lineCount >= 2) return "7.25rem";
  return "5.75rem";
}

function renderStaticHeading(el: HTMLElement, titleHtml: string) {
  if (!titleHtml || el.querySelector(".art-chart-heading")) return;

  const lineCount = (titleHtml.match(/<br\s*\/?>/gi) ?? []).length + 1;
  const heading = document.createElement("div");
  heading.className = "art-chart-heading";
  heading.innerHTML = titleHtml;
  el.prepend(heading);
  el.classList.add("art-chart-has-heading");
  el.style.setProperty("--art-chart-title-crop", headingCropForLines(lineCount));
}

function clearStaticHeading(el: HTMLElement) {
  el.querySelector(".art-chart-heading")?.remove();
  el.classList.remove("art-chart-has-heading");
  el.style.removeProperty("--art-chart-title-crop");
}

async function enrichStaticChart(el: HTMLElement, chartUrl: string) {
  try {
    const raw = await loadChartSpec(chartUrl);
    const titleHtml = extractTitleHtml(raw);
    if (titleHtml) renderStaticHeading(el, titleHtml);
  } catch {
    /* PNG still shows without centered heading */
  }
}

function inferChartHeight(data: PlotlyTrace[], titleLines: number): number | undefined {
  for (const trace of data) {
    const record = trace as Record<string, unknown>;
    if (record.type === "heatmap" && Array.isArray(record.y)) {
      const rows = record.y.length;
      return Math.max(380, rows * 34 + titleLines * 24 + 96);
    }
  }
  return undefined;
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 900px)").matches;
}

function sanitizePlotlySpec(raw: PlotlyExport) {
  const baseMargin = raw.layout?.margin ?? {};
  const fixedTitle = fixTitle(raw.layout ?? {});
  const titleText =
    typeof fixedTitle === "object" && fixedTitle && "text" in fixedTitle
      ? String(fixedTitle.text ?? "")
      : "";
  const titleLines = (titleText.match(/<br\s*\/?>/gi) ?? []).length + 1;
  const data = cleanTraces((raw.data ?? []) as PlotlyTrace[]);
  const chartHeight = inferChartHeight(data, titleLines);
  const mobile = isMobileViewport();

  const layout: PlotlyLayout = {
    ...(raw.layout ?? {}),
    font: {
      color: ART_COLORS.dark,
      family: "DM Sans, Helvetica, sans-serif",
      size: mobile ? 11 : 12,
      ...(raw.layout?.font ?? {}),
    },
    paper_bgcolor: raw.layout?.paper_bgcolor ?? ART_COLORS.cream,
    plot_bgcolor: raw.layout?.plot_bgcolor ?? ART_COLORS.cream,
    margin: {
      t: mobile ? 12 : 16,
      r: mobile ? 16 : Math.max(40, Number(baseMargin.r) || 0),
      b: mobile ? 44 : Math.max(52, Number(baseMargin.b) || 0),
      l: mobile ? 52 : Math.max(72, Number(baseMargin.l) || 0),
    },
    title: { text: "" },
    hoverlabel: {
      bgcolor: ART_COLORS.dark,
      bordercolor: ART_COLORS.dark,
      font: {
        color: "#FAFAF8",
        family: "DM Sans, Helvetica, sans-serif",
        size: mobile ? 11 : 12,
      },
    },
    autosize: true,
  };

  if (chartHeight && !mobile) {
    layout.height = chartHeight;
  } else {
    delete layout.height;
  }

  if (Array.isArray(layout.annotations)) {
    layout.annotations = layout.annotations.map((annotation) => ({
      ...annotation,
      x: 0.5,
      xref: "paper",
      xanchor: "center",
    }));
  }

  if (layout.xaxis && typeof layout.xaxis === "object") {
    layout.xaxis = { ...layout.xaxis, title: centerAxisTitle(layout.xaxis.title) };
  }
  if (layout.yaxis && typeof layout.yaxis === "object") {
    const yTickCount = Array.isArray(layout.yaxis.ticktext)
      ? layout.yaxis.ticktext.length
      : Array.isArray(layout.yaxis.tickvals)
        ? layout.yaxis.tickvals.length
        : 0;
    layout.yaxis = {
      ...layout.yaxis,
      title: centerAxisTitle(layout.yaxis.title),
      automargin: true,
      ...(yTickCount > 12 || mobile
        ? {
            tickfont: {
              ...(typeof layout.yaxis.tickfont === "object" ? layout.yaxis.tickfont : {}),
              size: mobile ? 9.5 : 10.5,
            },
          }
        : {}),
    };
  }

  delete layout.transition;

  const config: PlotlyConfig = {
    responsive: true,
    displaylogo: false,
    displayModeBar: true,
    scrollZoom: false,
    modeBarButtonsToRemove: ["sendDataToCloud", "lasso2d", "select2d"],
    ...(raw.config ?? {}),
  };

  return {
    data,
    layout,
    config,
    titleHtml: titleText,
  };
}

function prefetchChart(url: string) {
  if (!url || chartPromises.has(url)) return;
  void loadChartSpec(url);
}

async function loadChartSpec(url: string) {
  const pending = chartPromises.get(url);
  if (pending) return pending;

  const promise = fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load chart: ${url}`);
      return response.json() as Promise<PlotlyExport>;
    })
    .catch((error) => {
      chartPromises.delete(url);
      throw error;
    });

  chartPromises.set(url, promise);
  return promise;
}

function showFallback(el: HTMLElement, fallback?: string, label?: string | null) {
  if (!fallback || el.querySelector(".art-chart-fallback")) return;
  const img = document.createElement("img");
  img.className = "art-chart-fallback";
  img.src = fallback;
  img.alt = label ?? "Chart";
  img.loading = "eager";
  img.decoding = "async";
  el.appendChild(img);
}

function hideFallback(el: HTMLElement) {
  el.querySelector(".art-chart-fallback")?.remove();
}

function markChartReady(el: HTMLElement, staticOnly = false) {
  el.classList.remove("art-chart-live--loading");
  el.classList.add("art-chart-live--ready");
  if (staticOnly) {
    el.classList.add("art-chart-live--static");
  } else {
    el.classList.remove("art-chart-live--static");
  }
}

function chartHasVisiblePlot(el: HTMLElement) {
  const plot = el.querySelector<HTMLElement>(".js-plotly-plot");
  const height = plot?.offsetHeight ?? el.offsetHeight;
  return height >= MIN_PLOT_HEIGHT;
}

function useStaticFallback(
  el: HTMLElement,
  fallback?: string,
  label?: string | null,
  chartUrl?: string
) {
  if (el.querySelector(".js-plotly-plot")) {
    Plotly.purge(el);
  }
  showFallback(el, fallback, label);
  markChartReady(el, true);
  if (chartUrl) void enrichStaticChart(el, chartUrl);
}

async function renderLiveChart(el: HTMLElement) {
  const chartUrl = el.dataset.chart;
  const fallback = el.dataset.fallback;
  const label = el.getAttribute("aria-label");
  if (!chartUrl || el.dataset.rendered === "true") return;

  el.dataset.rendered = "true";
  el.classList.add("art-chart-live--loading");

  try {
    const raw = await loadChartSpec(chartUrl);

    if (isTooHeavyForLivePlot(raw)) {
      useStaticFallback(el, fallback, label, chartUrl);
      return;
    }

    const spec = sanitizePlotlySpec(raw);
    const titleHtml = spec.titleHtml || extractTitleHtml(raw);
    if (titleHtml) renderStaticHeading(el, titleHtml);
    await Plotly.newPlot(el, spec.data, spec.layout, spec.config);
    await Plotly.Plots.resize(el);

    if (chartHasVisiblePlot(el)) {
      hideFallback(el);
      markChartReady(el, false);
      const resize = () => {
        if (titleHtml) renderStaticHeading(el, titleHtml);
        Plotly.Plots.resize(el);
      };
      window.addEventListener("resize", resize, { passive: true });
      return;
    }

    useStaticFallback(el, fallback, label, chartUrl);
  } catch (error) {
    console.error("Artometrics chart render failed:", chartUrl, error);
    el.dataset.error = String(error);
    useStaticFallback(el, fallback, label, chartUrl);
  }
}

export function initArtCharts() {
  const nodes = document.querySelectorAll<HTMLElement>(".art-chart-live");
  if (!nodes.length) return;

  nodes.forEach((node) => {
    const url = node.dataset.chart;
    if (url) prefetchChart(url);

    const fallback = node.dataset.fallback;
    if (fallback) {
      showFallback(node, fallback, node.getAttribute("aria-label"));
      markChartReady(node, true);
      if (url) void enrichStaticChart(node, url);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        void renderLiveChart(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0, rootMargin: "120px 0px 80px 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}
