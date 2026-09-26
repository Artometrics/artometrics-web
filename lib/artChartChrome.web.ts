/**
 * Per-chart toolbar (Save PNG, Share, Copy R) for static article figures on web.
 */

function getChartSectionUrl(figure: Element): string {
  let node: Element | null = figure;
  while (node && node !== document.body) {
    const prev = node.previousElementSibling;
    if (prev?.matches("h2.anchored, h2[id], h3.anchored, h3[id]")) {
      const id = prev.id;
      if (id) {
        return `${window.location.origin}${window.location.pathname}#${id}`;
      }
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

function resolveChartRUrl(live: HTMLElement): string | null {
  const explicit =
    live.dataset.rCode?.trim() || live.getAttribute("data-r-code")?.trim();
  if (explicit) return explicit;

  const chart = live.dataset.chart?.trim() || live.getAttribute("data-chart")?.trim();
  if (!chart) return null;
  if (chart.endsWith(".plotly.json")) {
    return chart.replace(/\.plotly\.json$/i, ".r");
  }
  if (chart.endsWith(".json")) {
    return chart.replace(/\.json$/i, ".r");
  }
  return `${chart.replace(/\/$/, "")}.r`;
}

/** Netlify/SPA fallback returns index.html with 200 when a static .r file is missing. */
function looksLikeRSource(text: string, contentType: string): boolean {
  const trimmed = text.trimStart();
  if (!trimmed) return false;
  if (contentType.includes("text/html")) return false;
  if (/^<!DOCTYPE/i.test(trimmed) || /^<html[\s>]/i.test(trimmed)) return false;
  return (
    trimmed.startsWith("# Artometrics") ||
    /^(#|library\(|suppressPackageStartupMessages\()/m.test(trimmed)
  );
}

function scrollToArticleMethods(figure: Element) {
  const scope = figure.closest(".artometrics-article-body") ?? document;
  const target =
    scope.querySelector<HTMLElement>("#data-methods-and-sources") ??
    scope.querySelector<HTMLElement>("#data-and-method") ??
    scope.querySelector<HTMLElement>('h2[id*="method"]');
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (target.id) {
      history.replaceState(null, "", `#${target.id}`);
    }
    return;
  }
  window.location.hash = "data-methods-and-sources";
}

const rTextCache = new Map<string, string | null>();

async function fetchChartRText(url: string): Promise<string | null> {
  if (rTextCache.has(url)) return rTextCache.get(url) ?? null;

  try {
    const res = await fetch(url, { credentials: "same-origin" });
    if (!res.ok) {
      rTextCache.set(url, null);
      return null;
    }
    const contentType = res.headers.get("content-type") ?? "";
    const text = await res.text();
    if (!looksLikeRSource(text, contentType)) {
      rTextCache.set(url, null);
      return null;
    }
    rTextCache.set(url, text);
    return text;
  } catch {
    rTextCache.set(url, null);
    return null;
  }
}

function flashButtonLabel(btn: HTMLButtonElement, message: string, ms = 1800) {
  const label = btn.querySelector<HTMLElement>(".art-chart-toolbar__label");
  const original = label?.textContent ?? btn.getAttribute("aria-label") ?? "";
  if (label) label.textContent = message;
  btn.classList.add("art-chart-toolbar__btn--copied");
  window.setTimeout(() => {
    if (label) label.textContent = original;
    btn.classList.remove("art-chart-toolbar__btn--copied");
  }, ms);
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
  // Appended to body (full-viewport overlay). Styles use unscoped `.art-chart-share-sheet` in CSS.
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
    if (event.key === "Escape" && sheet && !sheet.hidden) close();
  });

  return sheet;
}

async function openChartShareSheet(
  figure: Element,
  imageUrl: string,
  caption: string,
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
    nativeBtn.style.display =
      typeof navigator.share === "function" ? "" : "none";
    nativeBtn.onclick = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], imageUrl.split("/").pop() ?? "chart.png", {
          type: blob.type || "image/png",
        });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            title: shareText,
            text: shareText,
            url: shareUrl,
            files: [file],
          });
          return;
        }
        await navigator.share({ title: shareText, text: shareText, url: shareUrl });
      } catch {
        /* cancelled or unavailable */
      }
    };
  }

  sheet.querySelector<HTMLButtonElement>("[data-share-x]")!.onclick = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  sheet.querySelector<HTMLButtonElement>("[data-share-linkedin]")!.onclick =
    () => {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      window.open(linkedinUrl, "_blank", "noopener,noreferrer");
    };

  sheet.querySelector<HTMLButtonElement>("[data-share-copy]")!.onclick = () => {
    const btn = sheet.querySelector<HTMLButtonElement>("[data-share-copy]")!;
    void navigator.clipboard.writeText(shareUrl).then(() => {
      const original = btn.textContent;
      btn.textContent = "Copied";
      window.setTimeout(() => {
        btn.textContent = original;
      }, 1800);
    });
  };

  sheet.querySelector<HTMLButtonElement>("[data-share-download]")!.onclick =
    () => {
      downloadChartPng(imageUrl);
    };
}

function makeToolbarButton(
  label: string,
  icon: string,
  ariaLabel: string,
  onClick: () => void,
) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "art-chart-toolbar__btn";
  btn.setAttribute("aria-label", ariaLabel);
  btn.innerHTML = `<span class="art-chart-toolbar__icon" aria-hidden="true">${icon}</span><span class="art-chart-toolbar__label">${label}</span>`;
  btn.addEventListener("click", onClick);
  return btn;
}

function initChartToolbars(root: HTMLElement) {
  root.querySelectorAll("figure.art-chart").forEach((figure) => {
    const live = figure.querySelector<HTMLElement>(".art-chart-live");
    const fallback = live?.dataset.fallback;
    if (!fallback || !live) return;
    if (live.querySelector(".art-chart-toolbar")) return;

    const caption =
      figure.querySelector("figcaption")?.textContent?.trim() ||
      live.getAttribute("aria-label") ||
      "Chart";

    const toolbar = document.createElement("div");
    toolbar.className = "art-chart-toolbar";
    toolbar.setAttribute("role", "group");
    toolbar.setAttribute("aria-label", "Chart actions");

    const saveBtn = makeToolbarButton("Save", "↓", "Save chart as PNG", () => {
      downloadChartPng(fallback);
    });

    const shareBtn = makeToolbarButton("Share", "↗", "Share chart", () => {
      void openChartShareSheet(figure, fallback, caption);
    });

    const buttons: HTMLButtonElement[] = [saveBtn, shareBtn];

    if (live.dataset.chart?.trim() || live.getAttribute("data-chart")?.trim() || live.dataset.rCode) {
      const copyRBtn = makeToolbarButton("Copy R", "{ }", "Copy R code for this chart", () => {
        void (async () => {
          const rUrl = resolveChartRUrl(live);
          if (!rUrl) {
            flashButtonLabel(copyRBtn, "See methods", 2200);
            scrollToArticleMethods(figure);
            return;
          }
          const text = await fetchChartRText(rUrl);
          if (!text) {
            flashButtonLabel(copyRBtn, "R not published", 2200);
            scrollToArticleMethods(figure);
            return;
          }
          try {
            if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(text);
            } else {
              throw new Error("clipboard unavailable");
            }
            flashButtonLabel(copyRBtn, "Copied");
          } catch {
            flashButtonLabel(copyRBtn, "Failed", 2000);
          }
        })();
      });
      buttons.push(copyRBtn);
    }

    toolbar.append(...buttons);
    live.appendChild(toolbar);
  });
}

/** Wire toolbars for all chart figures under `root`. */
export function initArtChartChrome(root: HTMLElement) {
  initChartToolbars(root);
}
