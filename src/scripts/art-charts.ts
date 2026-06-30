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

/** Rank-gradient palette: darkest navy = leader, fading to muted blue */
const ART_BAR_GRADIENT = [
  "#1A2A4F",
  "#243760",
  "#2C3E6B",
  "#3D5282",
  "#506898",
  "#647DAD",
  "#7D94BE",
  "#98ABCE",
  "#B4C2DD",
  "#CED7EB",
];

/** Category colors for multi-trace / box charts */
const ART_CATEGORY_PALETTE = [
  "#2C3E6B",
  "#C0392B",
  "#1A7A5E",
  "#7B4FA6",
  "#C47A00",
  "#1A6FA8",
  "#8B3F00",
  "#3D7A4F",
];

const MIN_PLOT_HEIGHT = 80;
const MAX_LIVE_TRACES = 150;
const MAX_LIVE_POINTS = 60_000;

/** Minimum height per horizontal bar row */
const H_BAR_ROW_PX = 38;
/** Minimum height for a horizontal bar chart */
const H_BAR_MIN_HEIGHT = 300;

const chartPromises = new Map<string, Promise<PlotlyExport>>();

function cleanTraces(data: PlotlyTrace[]) {
  return data.map((trace) => {
    const copy = JSON.parse(JSON.stringify(trace)) as Record<string, unknown>;
    delete copy.frame;
    delete copy.uid;
    return copy as PlotlyTrace;
  });
}

function stripBoldTags(html: string): string {
  return html.replace(/<\/?b>/gi, "");
}

function stackChartTitle(text: string): string {
  if (!text) return text;

  let stacked = stripBoldTags(text).trim();

  if (/\s+[—–-]\s+/.test(stacked.replace(/<[^>]+>/g, ""))) {
    stacked = stacked.replace(/\s+[—–]\s+/g, "<br>");
    stacked = stacked.replace(/\s+-\s+/g, "<br>");
    return stacked;
  }

  const plainLength = stacked.replace(/<[^>]+>/g, "").trim().length;
  if (plainLength > 28) {
    stacked = stacked.replace(/\s+(BY|VS|OVER|WITH|FROM|INTO|ACROSS|ON)\s+/gi, "<br>$1 ");
    if (stacked.includes("<br>")) return stacked;
    const words = stacked.replace(/<[^>]+>/g, "").trim().split(/\s+/);
    if (words.length > 4) {
      const mid = Math.ceil(words.length / 2);
      return words.slice(0, mid).join(" ") + "<br>" + words.slice(mid).join(" ");
    }
  }

  return stacked;
}

function formatHeadingHtml(raw: string): string {
  const stacked = stackChartTitle(raw);
  const lines = stacked
    .split(/<br\s*\/?>/i)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return "";

  return lines
    .map((line, index) => {
      const isAccent =
        index > 0 ||
        /C0392B|#c0392b|color:\s*#C0392B/i.test(line) ||
        /style=['"][^'"]*color/i.test(line);
      const cls = isAccent
        ? "art-chart-heading__line art-chart-heading__line--accent"
        : "art-chart-heading__line art-chart-heading__line--primary";
      return `<span class="${cls}">${line}</span>`;
    })
    .join("");
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

function renderStaticHeading(el: HTMLElement, titleHtml: string) {
  if (!titleHtml) return;

  const formatted = formatHeadingHtml(titleHtml);
  if (!formatted) return;

  let heading = el.querySelector<HTMLElement>(".art-chart-heading");
  if (!heading) {
    heading = document.createElement("div");
    heading.className = "art-chart-heading";
    el.prepend(heading);
    el.classList.add("art-chart-has-heading");
  }
  heading.innerHTML = formatted;
}

function clearStaticHeading(el: HTMLElement) {
  el.querySelector(".art-chart-heading")?.remove();
  el.classList.remove("art-chart-has-heading");
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

/** Infer chart height for types that need more vertical space */
function inferChartHeight(data: PlotlyTrace[], titleLines: number, mobile: boolean): number | undefined {
  for (const trace of data) {
    const record = trace as Record<string, unknown>;
    // Heatmap: row count × row height
    if (record.type === "heatmap" && Array.isArray(record.y)) {
      const rows = record.y.length;
      return Math.max(380, rows * 34 + titleLines * 24 + 96);
    }
    // Horizontal bar: each bar needs breathing room
    if (record.type === "bar" && record.orientation === "h" && Array.isArray(record.y)) {
      const rows = (record.y as unknown[]).length;
      if (rows > 6) {
        const px = Math.max(H_BAR_MIN_HEIGHT, rows * H_BAR_ROW_PX + (mobile ? 64 : 80));
        return mobile ? Math.min(px, 480) : px;
      }
    }
  }
  return undefined;
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 900px)").matches;
}

/** Check if a color array is uniform (one or two distinct values) */
function isUniformColorArray(colors: unknown): boolean {
  if (!Array.isArray(colors)) return true;
  const uniq = new Set(colors as string[]);
  return uniq.size <= 2;
}

/** Interpolate between two hex colors at position t ∈ [0,1] */
function lerpHex(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bv = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bv.toString(16).padStart(2, "0")}`;
}

/** Sample a multi-stop gradient at position t ∈ [0,1] */
function sampleGradient(stops: string[], t: number): string {
  if (stops.length === 0) return ART_COLORS.secondary;
  if (stops.length === 1) return stops[0];
  const scaled = t * (stops.length - 1);
  const lo = Math.floor(scaled);
  const hi = Math.min(lo + 1, stops.length - 1);
  return lerpHex(stops[lo], stops[hi], scaled - lo);
}

/**
 * Enrich bar chart traces: apply rank-gradient palette when all bars use
 * a single flat color. Keeps an existing red highlight on the leader bar.
 */
function enhanceBarColors(traces: Array<Record<string, unknown>>) {
  for (const trace of traces) {
    if (trace.type !== "bar") continue;
    const marker = trace.marker as Record<string, unknown> | undefined;
    if (!marker) continue;

    const rawColors = marker.color;
    if (!isUniformColorArray(rawColors)) continue; // already varied — leave alone

    const isHorizontal = trace.orientation === "h";
    const valArr = isHorizontal ? trace.x : trace.y;
    if (!Array.isArray(valArr)) continue;
    const n = valArr.length;
    if (n < 3) continue;

    // Detect if the chart has the leader marked in red (first or last bar)
    const existingColors = Array.isArray(rawColors) ? (rawColors as string[]) : [];
    const hasRedHighlight = existingColors.some(
      (c) => typeof c === "string" && c.toLowerCase() === ART_COLORS.highlight.toLowerCase()
    );
    const leaderIndex = existingColors.findIndex(
      (c) => typeof c === "string" && c.toLowerCase() === ART_COLORS.highlight.toLowerCase()
    );

    // Apply gradient from dark (rank #1 position) to light (lowest rank)
    const newColors: string[] = Array.from({ length: n }, (_, i) => {
      const t = i / Math.max(n - 1, 1);
      return sampleGradient(ART_BAR_GRADIENT, t);
    });

    // Restore the leader highlight
    if (hasRedHighlight && leaderIndex >= 0) {
      newColors[leaderIndex] = ART_COLORS.highlight;
    }

    marker.color = newColors;
  }
}

/**
 * Assign distinct colors to multi-trace charts (box, scatter) that have
 * uniform single colors across all traces.
 */
function enhanceMultiTraceColors(traces: Array<Record<string, unknown>>) {
  if (traces.length < 2) return;

  const allSameColor = traces.every((t) => {
    const marker = t.marker as Record<string, unknown> | undefined;
    const c = marker?.color;
    return typeof c === "string" && c === traces[0]?.marker?.color;
  });

  if (!allSameColor) return;

  traces.forEach((trace, i) => {
    const marker = trace.marker as Record<string, unknown> | undefined;
    if (!marker) return;
    marker.color = ART_CATEGORY_PALETTE[i % ART_CATEGORY_PALETTE.length];
    // Keep line color as dark for box whiskers
    if (typeof marker.line === "object" && marker.line !== null) {
      (marker.line as Record<string, unknown>).color = ART_COLORS.dark;
    }
  });
}

/**
 * For scatter plots with a uniform flat marker color, apply a sequential
 * colorscale based on y-values so density/magnitude is visible.
 */
function enhanceScatterColors(traces: Array<Record<string, unknown>>) {
  for (const trace of traces) {
    if (trace.type !== "scatter" && trace.mode !== "markers") continue;
    const marker = trace.marker as Record<string, unknown> | undefined;
    if (!marker) continue;
    // Skip if colorscale already set
    if (marker.colorscale) continue;
    const c = marker.color;
    if (typeof c !== "string" && !isUniformColorArray(c)) continue;
    const y = trace.y;
    if (!Array.isArray(y) || y.length < 5) continue;

    // Assign color based on y-value rank
    const yCopy = [...y] as number[];
    const sorted = [...yCopy].sort((a, b) => a - b);
    const newColors = yCopy.map((val) => {
      const rank = sorted.indexOf(val);
      const t = rank / Math.max(sorted.length - 1, 1);
      return sampleGradient(ART_BAR_GRADIENT, t);
    });

    marker.color = newColors;
    // Slightly increase opacity for scatter
    if (marker.opacity == null || Number(marker.opacity) > 0.8) {
      marker.opacity = 0.75;
    }
  }
}

function sanitizePlotlySpec(raw: PlotlyExport, mobile: boolean) {
  const baseMargin = raw.layout?.margin ?? {};
  const fixedTitle = fixTitle(raw.layout ?? {});
  const titleText =
    typeof fixedTitle === "object" && fixedTitle && "text" in fixedTitle
      ? String(fixedTitle.text ?? "")
      : "";
  const titleLines = (titleText.match(/<br\s*\/?>/gi) ?? []).length + 1;
  const data = cleanTraces((raw.data ?? []) as PlotlyTrace[]) as Array<Record<string, unknown>>;

  // Enhance colors before layout calculation
  enhanceBarColors(data);
  enhanceMultiTraceColors(data);
  enhanceScatterColors(data);

  const chartHeight = inferChartHeight(data as PlotlyTrace[], titleLines, mobile);

  // Detect horizontal bar chart for better left margin
  const hasHBar = data.some((t) => t.type === "bar" && t.orientation === "h");

  const layout: PlotlyLayout = {
    ...(raw.layout ?? {}),
    font: {
      color: ART_COLORS.dark,
      family: "DM Sans, Helvetica, sans-serif",
      size: mobile ? 11.5 : 12,
      ...(raw.layout?.font ?? {}),
    },
    paper_bgcolor: raw.layout?.paper_bgcolor ?? ART_COLORS.cream,
    plot_bgcolor: raw.layout?.plot_bgcolor ?? ART_COLORS.cream,
    margin: {
      t: mobile ? 8 : 16,
      r: mobile ? 14 : Math.max(40, Number(baseMargin.r) || 0),
      b: mobile ? 52 : Math.max(52, Number(baseMargin.b) || 0),
      l: mobile
        ? hasHBar ? 60 : 46
        : Math.max(72, Number(baseMargin.l) || 0),
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

  if (chartHeight) {
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
      tickfont: {
        ...(typeof layout.yaxis.tickfont === "object" ? layout.yaxis.tickfont : {}),
        size: mobile ? (yTickCount > 8 ? 9 : 10) : yTickCount > 12 ? 10.5 : 11,
        color: ART_COLORS.mid,
      },
    };
  }

  if (layout.legend && typeof layout.legend === "object") {
    layout.legend = {
      ...layout.legend,
      orientation: "h",
      yanchor: "bottom",
      y: mobile ? -0.28 : 1.02,
      x: 0.5,
      xanchor: "center",
      font: {
        ...(typeof layout.legend.font === "object" ? layout.legend.font : {}),
        size: mobile ? 9.5 : 10.5,
        color: ART_COLORS.dark,
      },
    };
  }

  delete layout.transition;

  const config: PlotlyConfig = {
    responsive: true,
    displaylogo: false,
    displayModeBar: mobile ? false : true,
    scrollZoom: false,
    modeBarButtonsToRemove: ["sendDataToCloud", "lasso2d", "select2d"],
    ...(raw.config ?? {}),
  };

  // Force disable modebar on mobile regardless of raw config
  if (mobile) {
    config.displayModeBar = false;
  }

  return {
    data: data as PlotlyTrace[],
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

  const mobile = isMobileViewport();

  try {
    const raw = await loadChartSpec(chartUrl);

    if (isTooHeavyForLivePlot(raw)) {
      useStaticFallback(el, fallback, label, chartUrl);
      return;
    }

    const spec = sanitizePlotlySpec(raw, mobile);
    const titleHtml = spec.titleHtml || extractTitleHtml(raw);
    if (titleHtml) renderStaticHeading(el, titleHtml);
    await Plotly.newPlot(el, spec.data, spec.layout, spec.config);
    await Plotly.Plots.resize(el);

    if (chartHasVisiblePlot(el)) {
      hideFallback(el);
      markChartReady(el, false);
      const resize = () => {
        const mob = isMobileViewport();
        if (titleHtml) renderStaticHeading(el, titleHtml);
        // Re-apply mobile layout on resize crossing breakpoint
        const resizeLayout = sanitizePlotlySpec(raw, mob).layout;
        Plotly.relayout(el, { margin: resizeLayout.margin });
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
