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
const H_BAR_ROW_PX = 40;
/** Minimum height for a horizontal bar chart */
const H_BAR_MIN_HEIGHT = 300;

const chartPromises = new Map<string, Promise<PlotlyExport>>();

/** Compact SI-style labels for large values (Economist-style axis ticks). */
function formatCompactNum(value: number): string {
  const abs = Math.abs(value);
  if (!Number.isFinite(value)) return String(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (abs >= 10_000) return `${(value / 1_000).toFixed(0)}K`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  if (Number.isInteger(value)) return value.toLocaleString("en-US");
  return value.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

function axisTitleText(title: unknown): string {
  if (!title) return "";
  if (typeof title === "string") return title;
  if (typeof title === "object" && title !== null && "text" in title) {
    return String((title as { text?: string }).text ?? "");
  }
  return "";
}

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

function plainHeadingText(html: string): string {
  return stripBoldTags(html)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
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

function renderStaticHeading(el: HTMLElement, titleHtml: string, subtitle?: string) {
  if (!titleHtml && !subtitle) return;

  const useSubtitleAsTitle = !titleHtml && Boolean(subtitle);
  const formatted = titleHtml || useSubtitleAsTitle ? formatHeadingHtml(titleHtml || subtitle || "") : "";
  let heading = el.querySelector<HTMLElement>(".art-chart-heading");
  if (!heading) {
    heading = document.createElement("div");
    heading.className = "art-chart-heading";
    el.prepend(heading);
    el.classList.add("art-chart-has-heading");
  }

  const normalizedTitle = plainHeadingText(titleHtml);
  const normalizedSubtitle = plainHeadingText(subtitle ?? "");
  const duplicateSubtitle = Boolean(
    normalizedSubtitle && normalizedTitle && normalizedTitle.includes(normalizedSubtitle)
  );
  const subtitleHtml = subtitle
    && !useSubtitleAsTitle
    && !duplicateSubtitle
    ? `<span class="art-chart-heading__subtitle">${subtitle}</span>`
    : "";
  heading.innerHTML = `${formatted}${subtitleHtml}`;
}

function clearStaticHeading(el: HTMLElement) {
  el.querySelector(".art-chart-heading")?.remove();
  el.classList.remove("art-chart-has-heading");
}

async function enrichStaticChart(el: HTMLElement, chartUrl: string) {
  try {
    const raw = await loadChartSpec(chartUrl);
    const titleHtml = extractTitleHtml(raw);
    if (titleHtml || el.dataset.caption) renderStaticHeading(el, titleHtml, el.dataset.caption);
    renderChartCredit(el);
  } catch {
    /* PNG still shows without centered heading */
  }
}

/** Infer chart height for types that need more vertical space */
function inferChartHeight(data: PlotlyTrace[], titleLines: number, mobile: boolean): number | undefined {
  for (const trace of data) {
    const record = trace as Record<string, unknown>;
    // Heatmap: row count times row height
    if (record.type === "heatmap" && Array.isArray(record.y)) {
      const rows = record.y.length;
      const px = Math.max(420, rows * 36 + titleLines * 24 + 112);
      return mobile ? Math.min(px, 640) : px;
    }
    // Horizontal bar: each bar needs breathing room
    if (record.type === "bar" && record.orientation === "h" && Array.isArray(record.y)) {
      const rows = (record.y as unknown[]).length;
      if (rows > 6) {
        const px = Math.max(H_BAR_MIN_HEIGHT, rows * H_BAR_ROW_PX + (mobile ? 96 : 88));
        return mobile ? Math.min(px, 640) : px;
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

/** Interpolate between two hex colors at position t in [0,1] */
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

/** Sample a multi-stop gradient at position t in [0,1] */
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
    if (!isUniformColorArray(rawColors)) continue; // already varied - leave alone

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

function hasMode(trace: Record<string, unknown>, mode: string) {
  return typeof trace.mode === "string" && trace.mode.includes(mode);
}

function reduceLabelClutter(traces: Array<Record<string, unknown>>) {
  for (const trace of traces) {
    if (trace.type !== "scatter" && trace.type != null) continue;
    if (!hasMode(trace, "text")) continue;
    if (!Array.isArray(trace.text) || trace.text.length <= 14) continue;

    // Dense scatter labels blur on mobile. Keep points interactive, move labels into hover.
    trace.mode = String(trace.mode).replace(/\+?text|text\+?/g, "").replace(/^\+|\+$/g, "") || "markers";
    trace.hovertemplate =
      typeof trace.hovertemplate === "string"
        ? trace.hovertemplate
        : "<b>%{text}</b><br>x: %{x}<br>y: %{y}<extra></extra>";
  }
}

function ensureHoverTemplates(traces: Array<Record<string, unknown>>) {
  traces.forEach((trace, index) => {
    if (typeof trace.hovertemplate === "string" && trace.hovertemplate.trim()) return;

    if (trace.type === "bar") {
      trace.hovertemplate =
        trace.orientation === "h"
          ? "<b>%{y}</b><br>Value: %{x}<extra></extra>"
          : "<b>%{x}</b><br>Value: %{y}<extra></extra>";
      return;
    }

    if (trace.type === "heatmap") {
      trace.hovertemplate = "<b>%{y}</b><br>%{x}: %{z}<extra></extra>";
      return;
    }

    if (Array.isArray(trace.text)) {
      trace.hovertemplate = "<b>%{text}</b><br>x: %{x}<br>y: %{y}<extra></extra>";
      return;
    }

    trace.hovertemplate = `<b>Series ${index + 1}</b><br>x: %{x}<br>y: %{y}<extra></extra>`;
  });
}

function ensureLegendNames(traces: Array<Record<string, unknown>>, layout: PlotlyLayout) {
  if (!layout.showlegend && !(layout.legend && typeof layout.legend === "object")) return;
  traces.forEach((trace, index) => {
    if (typeof trace.name === "string" && trace.name.trim()) return;
    trace.name = `Series ${index + 1}`;
  });
}

function isHorizontalBarChart(data: Array<Record<string, unknown>>) {
  return data.some((trace) => trace.type === "bar" && trace.orientation === "h");
}

function maxNumericValue(values: unknown): number | null {
  if (!Array.isArray(values)) return null;
  const nums = values.filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  return nums.length ? Math.max(...nums) : null;
}

/** Leader bar gets an outside value label - Economist-style callout on the chart itself. */
function addBarValueLabels(traces: Array<Record<string, unknown>>) {
  for (const trace of traces) {
    if (trace.type !== "bar") continue;
    const isHorizontal = trace.orientation === "h";
    const vals = isHorizontal ? trace.x : trace.y;
    if (!Array.isArray(vals)) continue;
    const nums = vals as number[];
    if (!nums.length) continue;
    const leaderIdx = nums.indexOf(Math.max(...nums));
    const labels = nums.map((v, i) => (i === leaderIdx ? formatCompactNum(v) : ""));
    trace.text = labels;
    trace.textposition = "outside";
    trace.textfont = {
      color: ART_COLORS.dark,
      family: "DM Sans, Helvetica, sans-serif",
      size: 10,
    };
    trace.cliponaxis = false;
    trace.hovertemplate =
      typeof trace.hovertemplate === "string"
        ? trace.hovertemplate
        : isHorizontal
          ? "<b>%{y}</b><br>%{x:,}<extra></extra>"
          : "<b>%{x}</b><br>%{y:,}<extra></extra>";
  }
}

/** Fix misleading "Median X" axis titles on entity-level bar charts. */
function fixMisleadingAxisTitles(layout: PlotlyLayout, data: Array<Record<string, unknown>>) {
  const hBar = isHorizontalBarChart(data);
  const vBar = data.some((trace) => trace.type === "bar" && trace.orientation !== "h");

  const fixAxis = (axisKey: "xaxis" | "yaxis", valueAxis: boolean) => {
    const axis = layout[axisKey];
    if (!axis || typeof axis !== "object" || !valueAxis) return;
    const rawTitle = axisTitleText(axis.title);
    const cleaned = rawTitle.replace(/^Median\s+/i, "");
    if (cleaned && cleaned !== rawTitle) {
      axis.title = centerAxisTitle(cleaned);
    }
    const trace = data.find((t) => t.type === "bar");
    const vals = hBar
      ? (trace?.x as unknown[] | undefined)
      : (trace?.y as unknown[] | undefined);
    const peak = maxNumericValue(vals);
    if (peak != null && peak >= 10_000) {
      axis.tickformat = "~s";
    }
  };

  fixAxis("xaxis", hBar);
  fixAxis("yaxis", vBar);
}

function buildEditorialAnnotations(
  data: Array<Record<string, unknown>>,
  layout: PlotlyLayout
): Plotly.Layout["annotations"] {
  const existing = Array.isArray(layout.annotations)
    ? layout.annotations.map((annotation) => ({ ...annotation }))
    : [];

  const hasParetoLine = Array.isArray(layout.shapes)
    && layout.shapes.some(
      (shape) =>
        shape &&
        typeof shape === "object" &&
        shape.type === "line" &&
        shape.y0 === 80 &&
        shape.y1 === 80
    );

  if (hasParetoLine && !existing.some((a) => String(a.text).includes("80"))) {
    existing.push({
      x: 1,
      y: 80,
      xref: "paper",
      yref: "y",
      text: "80% benchmark",
      showarrow: false,
      xanchor: "right",
      yanchor: "bottom",
      font: {
        family: "DM Sans, Helvetica, sans-serif",
        size: 9,
        color: ART_COLORS.mid,
      },
    });
  }

  existing.push({
    x: 1,
    y: -0.02,
    xref: "paper",
    yref: "paper",
    text: "<b>ARTO</b>METRICS",
    showarrow: false,
    xanchor: "right",
    yanchor: "top",
    font: {
      family: "DM Sans, Helvetica, sans-serif",
      size: 9,
      color: ART_COLORS.mid,
    },
  });

  return existing;
}

function classifyChart(data: Array<Record<string, unknown>>) {
  const types = new Set(data.map((trace) => String(trace.type ?? "scatter")));
  const hasHBar = data.some((trace) => trace.type === "bar" && trace.orientation === "h");
  const hasVBar = data.some((trace) => trace.type === "bar" && trace.orientation !== "h");
  const hasLine = data.some(
    (trace) =>
      (trace.type === "scatter" || !trace.type) &&
      typeof trace.mode === "string" &&
      trace.mode.includes("line")
  );
  const hasMarkers = data.some(
    (trace) =>
      (trace.type === "scatter" || !trace.type) &&
      typeof trace.mode === "string" &&
      trace.mode.includes("markers")
  );

  if (hasHBar) return "bar-horizontal";
  if (hasVBar) return "bar-vertical";
  if (types.has("heatmap")) return "heatmap";
  if (types.has("histogram") || types.has("box") || types.has("violin")) return "distribution";
  if (hasLine && hasMarkers) return "line-marker";
  if (hasLine) return "line";
  if (hasMarkers) return "scatter";
  return "mixed";
}

function applyChartTypeClass(el: HTMLElement, data: Array<Record<string, unknown>>) {
  const figure = el.closest<HTMLElement>(".art-chart");
  if (!figure) return;
  const type = classifyChart(data);
  figure.dataset.chartType = type;
  figure.classList.add("art-chart--typed", `art-chart--${type}`);
}

function lockChartInteraction(layout: PlotlyLayout) {
  layout.dragmode = false;
  const lockAxis = (axis: Plotly.Layout["xaxis"] | Plotly.Layout["yaxis"]) => {
    if (!axis || typeof axis !== "object") return;
    axis.fixedrange = true;
  };
  lockAxis(layout.xaxis);
  lockAxis(layout.yaxis);
  if (layout.xaxis2) lockAxis(layout.xaxis2);
  if (layout.yaxis2) lockAxis(layout.yaxis2);
}

function prepareChartFigure(figure: HTMLElement) {
  const caption = figure.querySelector("figcaption.art-chart-caption");
  const live = figure.querySelector<HTMLElement>(".art-chart-live");
  if (caption && live) {
    const text = caption.textContent?.trim();
    if (text) live.dataset.caption = text;
    caption.classList.add("art-chart-caption--visible");
  }
  figure.classList.add("art-chart--pending");
}

function renderChartCredit(el: HTMLElement) {
  if (el.querySelector(".art-chart-credit")) return;
  const credit = document.createElement("div");
  credit.className = "art-chart-credit";
  credit.textContent = el.dataset.source || "Data: source cited in report references - ARTOMETRICS";
  el.appendChild(credit);
}

function formatFactNumbers() {
  document.querySelectorAll<HTMLElement>(".facts-grid .fact-number").forEach((el) => {
    const raw = el.textContent?.trim() ?? "";
    const normalized = raw.replace(/,/g, "");
    if (!/^\d+(\.\d+)?$/.test(normalized)) return;
    const value = Number(normalized);
    if (!Number.isFinite(value) || value < 1_000_000) return;
    if (!el.dataset.fullValue) el.dataset.fullValue = raw;
    el.textContent = formatCompactNum(value);
    el.title = `Full value: ${raw}`;
    el.classList.add("fact-number--compact");
  });
}

function initChartReveal() {
  const figures = document.querySelectorAll<HTMLElement>(".art-chart");
  if (!figures.length) return;

  figures.forEach(prepareChartFigure);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("art-chart--revealed");
        revealObserver.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  figures.forEach((figure) => revealObserver.observe(figure));
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
  reduceLabelClutter(data);
  ensureHoverTemplates(data);
  addBarValueLabels(data);

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
      r: mobile ? 28 : Math.max(56, Number(baseMargin.r) || 0),
      b: mobile ? 48 : Math.max(48, Number(baseMargin.b) || 0),
      l: mobile
        ? hasHBar ? 60 : 46
        : Math.max(72, Number(baseMargin.l) || 0),
    },
    title: { text: "" },
    hovermode: "closest",
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

  fixMisleadingAxisTitles(layout, data);
  layout.annotations = buildEditorialAnnotations(data, layout);
  lockChartInteraction(layout);

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
  ensureLegendNames(data, layout);

  delete layout.transition;

  const config: PlotlyConfig = {
    responsive: true,
    displaylogo: false,
    displayModeBar: !mobile,
    scrollZoom: false,
    doubleClick: false,
    modeBarButtons: [["toImage"]],
    toImageButtonOptions: {
      format: "png",
      filename: "artometrics-chart",
      height: chartHeight ?? 700,
      width: 1200,
      scale: 2,
    },
    ...(raw.config ?? {}),
  };

  config.displayModeBar = !mobile;
  config.scrollZoom = false;
  config.doubleClick = false;

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
  renderChartCredit(el);
  if (chartUrl) void enrichStaticChart(el, chartUrl);
}

async function renderLiveChart(el: HTMLElement) {
  const chartUrl = el.dataset.chart;
  const fallback = el.dataset.fallback;
  const label = el.getAttribute("aria-label");
  const subtitle = el.dataset.caption;
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
    if (titleHtml || subtitle) renderStaticHeading(el, titleHtml, subtitle);
    applyChartTypeClass(el, spec.data as Array<Record<string, unknown>>);
    await Plotly.newPlot(el, spec.data, spec.layout, spec.config);
    await Plotly.Plots.resize(el);
    renderChartCredit(el);

    if (chartHasVisiblePlot(el)) {
      hideFallback(el);
      markChartReady(el, false);
      const resize = () => {
        const mob = isMobileViewport();
        if (titleHtml || subtitle) renderStaticHeading(el, titleHtml, subtitle);
        const resizeLayout = sanitizePlotlySpec(raw, mob).layout;
        Plotly.relayout(el, {
          margin: resizeLayout.margin,
          annotations: resizeLayout.annotations,
        });
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

function getChartSectionUrl(figure: Element): string {
  let node: Element | null = figure;
  while (node && node !== document.body) {
    const prev = node.previousElementSibling;
    if (prev?.matches("h2.anchored, h2[id]")) {
      const id = prev.id;
      if (id) return `${window.location.origin}${window.location.pathname}#${id}`;
    }
    node = node.parentElement;
  }
  return window.location.href;
}

function chartFilename(fallback?: string) {
  return fallback?.split("/").pop() ?? "artometrics-chart.png";
}

function downloadChartPng(url: string) {
  const filename = chartFilename(url);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

async function downloadLiveChartPng(el: HTMLElement, fallback?: string) {
  const plot = el.querySelector<HTMLElement>(".js-plotly-plot");
  if (!plot || el.classList.contains("art-chart-live--static")) {
    if (fallback) downloadChartPng(fallback);
    return;
  }

  const filename = chartFilename(fallback).replace(/\.png$/i, "");
  try {
    await Plotly.downloadImage(el, {
      format: "png",
      filename,
      width: 1200,
      height: Math.max(el.offsetHeight, 420),
      scale: 2,
    });
  } catch {
    if (fallback) downloadChartPng(fallback);
  }
}

function ensureShareSheet(): HTMLElement {
  let sheet = document.getElementById("art-chart-share-sheet");
  if (sheet) return sheet;

  sheet = document.createElement("div");
  sheet.id = "art-chart-share-sheet";
  sheet.className = "art-chart-share-sheet";
  sheet.hidden = true;
  sheet.innerHTML = `
    <div class="art-chart-share-sheet__panel-wrap">
      <div class="art-chart-share-sheet__panel" role="dialog" aria-modal="true" aria-labelledby="art-chart-share-title">
        <button type="button" class="art-chart-share-sheet__close" aria-label="Close share panel">&times;</button>
        <p id="art-chart-share-title" class="art-chart-share-sheet__title">Share this chart</p>
        <p class="art-chart-share-sheet__caption" data-share-caption></p>
        <img class="art-chart-share-sheet__preview" data-share-preview alt="" />
        <div class="art-chart-share-sheet__actions">
          <button type="button" class="art-chart-share-sheet__btn art-chart-share-sheet__btn--primary" data-share-native>Share image</button>
          <button type="button" class="art-chart-share-sheet__btn" data-share-x>X</button>
          <button type="button" class="art-chart-share-sheet__btn" data-share-linkedin>LinkedIn</button>
          <button type="button" class="art-chart-share-sheet__btn" data-share-copy>Copy link</button>
          <button type="button" class="art-chart-share-sheet__btn" data-share-download>Save PNG</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(sheet);

  const close = () => {
    sheet!.hidden = true;
    document.body.style.overflow = "";
  };

  sheet.querySelector(".art-chart-share-sheet__close")?.addEventListener("click", close);
  sheet.addEventListener("click", (event) => {
    if (event.target === sheet) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sheet!.hidden) close();
  });

  return sheet;
}

async function openChartShareSheet(
  figure: Element,
  imageUrl: string,
  caption: string
) {
  const sheet = ensureShareSheet();
  const shareUrl = getChartSectionUrl(figure);
  const pageTitle = document.title.replace(/\s*[—–-]\s*Artometrics.*$/i, "").trim();
  const shareText = `${caption} — ${pageTitle} (Artometrics)`;

  const preview = sheet.querySelector<HTMLImageElement>("[data-share-preview]");
  const captionEl = sheet.querySelector("[data-share-caption]");
  if (preview) {
    preview.src = imageUrl;
    preview.alt = caption;
  }
  if (captionEl) captionEl.textContent = caption;

  sheet.hidden = false;
  document.body.style.overflow = "hidden";

  const nativeBtn = sheet.querySelector<HTMLButtonElement>("[data-share-native]");
  if (nativeBtn) {
    nativeBtn.style.display = typeof navigator.share === "function" ? "" : "none";
    nativeBtn.onclick = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], imageUrl.split("/").pop() ?? "chart.png", {
          type: blob.type || "image/png",
        });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ title: shareText, text: shareText, url: shareUrl, files: [file] });
          return;
        }
        await navigator.share({ title: shareText, text: shareText, url: shareUrl });
      } catch {
        /* user cancelled or share unavailable */
      }
    };
  }

  sheet.querySelector<HTMLButtonElement>("[data-share-x]")!.onclick = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  sheet.querySelector<HTMLButtonElement>("[data-share-linkedin]")!.onclick = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
  };

  sheet.querySelector<HTMLButtonElement>("[data-share-copy]")!.onclick = () => {
    const btn = sheet.querySelector<HTMLButtonElement>("[data-share-copy]")!;
    void navigator.clipboard.writeText(shareUrl).then(() => {
      const original = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => {
        btn.textContent = original;
      }, 1800);
    });
  };

  sheet.querySelector<HTMLButtonElement>("[data-share-download]")!.onclick = () => {
    downloadChartPng(imageUrl);
  };
}

function initChartToolbars() {
  document.querySelectorAll("figure.art-chart").forEach((figure) => {
    if (figure.querySelector(".art-chart-toolbar")) return;

    const live = figure.querySelector<HTMLElement>(".art-chart-live");
    const fallback = live?.dataset.fallback;
    if (!fallback || !live) return;

    const caption =
      figure.querySelector("figcaption")?.textContent?.trim() ||
      live?.getAttribute("aria-label") ||
      "Chart";

    const toolbar = document.createElement("div");
    toolbar.className = "art-chart-toolbar";
    toolbar.setAttribute("role", "group");
    toolbar.setAttribute("aria-label", "Chart actions");

    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "art-chart-toolbar__btn";
    saveBtn.setAttribute("aria-label", "Save chart as PNG");
    saveBtn.innerHTML =
      '<span class="art-chart-toolbar__icon" aria-hidden="true">↓</span><span class="art-chart-toolbar__label">Save</span>';
    saveBtn.addEventListener("click", () => {
      void downloadLiveChartPng(live, fallback);
    });

    const shareBtn = document.createElement("button");
    shareBtn.type = "button";
    shareBtn.className = "art-chart-toolbar__btn";
    shareBtn.setAttribute("aria-label", "Share chart");
    shareBtn.innerHTML =
      '<span class="art-chart-toolbar__icon" aria-hidden="true">↗</span><span class="art-chart-toolbar__label">Share</span>';
    shareBtn.addEventListener("click", () => {
      void openChartShareSheet(figure, fallback, caption);
    });

    toolbar.append(saveBtn, shareBtn);
    live.appendChild(toolbar);
  });
}

export function initArtCharts() {
  initChartReveal();
  formatFactNumbers();
  initChartToolbars();

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
