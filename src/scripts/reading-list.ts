import {
  addLocalSave,
  clearReadingProgress,
  getLatestReading,
  getLocalSaves,
  getReadingProgress,
  isLocallySaved,
  removeLocalSave,
  setReadingProgress,
  type ReadingProgress,
} from "@/lib/reading-list/local";
import { apiFetch, getSupabaseBrowser } from "@/lib/supabase/browser";

function updateSaveButton(btn: HTMLButtonElement, saved: boolean) {
  btn.textContent = saved ? "Saved" : "Save report";
  btn.setAttribute("aria-pressed", saved ? "true" : "false");
  btn.classList.toggle("text-accent-700", saved);
  btn.classList.toggle("font-semibold", saved);
}

async function remoteSavedSlugs(): Promise<Set<string>> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return new Set();

  const { data } = await supabase.auth.getSession();
  if (!data.session) return new Set();

  const res = await apiFetch("saved-articles");
  if (!res.ok) return new Set();

  const payload = (await res.json()) as { items?: { article_slug: string }[] };
  return new Set((payload.items ?? []).map((item) => item.article_slug));
}

export async function syncSaveButtons() {
  const remote = await remoteSavedSlugs();

  document.querySelectorAll<HTMLButtonElement>("[data-save-article]").forEach((btn) => {
    const slug = btn.dataset.saveArticle;
    if (!slug) return;
    updateSaveButton(btn, remote.has(slug) || isLocallySaved(slug));
  });
}

export function bindSaveButtons() {
  document.querySelectorAll<HTMLButtonElement>("[data-save-article]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const slug = btn.dataset.saveArticle;
      const title = btn.dataset.saveTitle ?? slug ?? "Report";
      if (!slug) return;

      const currentlySaved =
        btn.getAttribute("aria-pressed") === "true" || isLocallySaved(slug);

      if (currentlySaved) {
        removeLocalSave(slug);
        const supabase = getSupabaseBrowser();
        if (supabase) {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            await apiFetch(`saved-articles?slug=${encodeURIComponent(slug)}`, {
              method: "DELETE",
            });
          }
        }
        updateSaveButton(btn, false);
        return;
      }

      addLocalSave(slug, title);

      const supabase = getSupabaseBrowser();
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          const res = await apiFetch("saved-articles", {
            method: "POST",
            body: JSON.stringify({ slug }),
          });
          if (res.status === 401) {
            window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
            return;
          }
        }
      }

      updateSaveButton(btn, true);
    });
  });

  void syncSaveButtons();
}

export function renderSavedReportsList(
  container: HTMLElement,
  options: { showEmpty?: boolean } = {}
) {
  const saves = getLocalSaves();
  if (!saves.length && !options.showEmpty) return;

  container.innerHTML = saves.length
    ? `<ul class="mt-4 space-y-3">${saves
        .map(
          (item) => `
        <li class="flex items-start justify-between gap-3">
          <a class="text-sm text-accent-700 hover:underline leading-snug" href="/${item.slug}/">${item.title}</a>
          <button type="button" data-remove-save="${item.slug}" class="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-base-400 hover:text-base-700">Remove</button>
        </li>`
        )
        .join("")}</ul>`
    : `<p class="mt-3 text-sm text-base-600">Save reports from article pages to build your reading list.</p>`;

  container.querySelectorAll<HTMLButtonElement>("[data-remove-save]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slug = btn.dataset.removeSave;
      if (!slug) return;
      removeLocalSave(slug);
      renderSavedReportsList(container, options);
      void syncSaveButtons();
    });
  });
}

export function renderContinueReadingCard(container: HTMLElement, options: { outer?: HTMLElement } = {}) {
  const latest = getLatestReading();
  const outer = options.outer ?? container;

  if (!latest || latest.progress < 8 || latest.progress > 92) {
    container.innerHTML = "";
    if (outer !== container) outer.hidden = true;
    else container.hidden = true;
    return;
  }

  if (outer !== container) outer.hidden = false;
  else container.hidden = false;
  container.innerHTML = `
    <section class="rounded-lg border border-accent-200 bg-accent-50/40 p-5 md:p-6">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-accent-700">Continue reading</p>
      <p class="mt-2 font-serif text-xl font-light leading-snug text-base-900">${latest.title}</p>
      <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-base-200">
        <div class="h-full rounded-full bg-accent-600 transition-all" style="width:${Math.round(latest.progress)}%"></div>
      </div>
      <div class="mt-4 flex flex-wrap gap-3">
        <a href="${latest.path}?resume=1" class="inline-flex rounded-sm bg-base-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-accent-800">Resume</a>
        <button type="button" data-dismiss-reading="${latest.slug}" class="text-xs font-semibold uppercase tracking-widest text-base-500 hover:text-base-800">Dismiss</button>
      </div>
    </section>
  `;

  container.querySelector("[data-dismiss-reading]")?.addEventListener("click", () => {
    clearReadingProgress(latest.slug);
    renderContinueReadingCard(container, options);
  });
}

export function initReadingProgressTracking() {
  const article = document.querySelector<HTMLElement>(".artometrics-article");
  if (!article) return;

  const slug =
    document.querySelector<HTMLButtonElement>("[data-save-article]")?.dataset.saveArticle ??
    null;
  const title =
    document.querySelector("h1")?.textContent?.trim() ??
    document.title.replace(/\s*—\s*Artometrics$/, "");
  if (!slug || !title) return;

  const path = window.location.pathname;
  let ticking = false;

  const persist = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;

    if (progress < 3) return;

    const payload: ReadingProgress = {
      slug,
      title,
      path,
      scrollY: scrollTop,
      progress,
      updatedAt: new Date().toISOString(),
    };
    setReadingProgress(payload);
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        persist();
        ticking = false;
      });
    },
    { passive: true }
  );

  const params = new URLSearchParams(window.location.search);
  const shouldResume = params.get("resume") === "1" || document.referrer.includes("/account");
  const saved = getReadingProgress(slug);
  if (shouldResume && saved && saved.scrollY > 120) {
    window.scrollTo({ top: saved.scrollY, behavior: "auto" });
  } else if (saved && saved.progress > 8 && saved.progress < 92) {
    showResumeBanner(saved);
  }
}

function showResumeBanner(progress: ReadingProgress) {
  if (document.getElementById("art-resume-banner")) return;

  const banner = document.createElement("div");
  banner.id = "art-resume-banner";
  banner.className =
    "fixed bottom-4 left-4 right-4 z-[120] mx-auto max-w-md rounded-lg border border-base-200 bg-white p-4 shadow-lg md:left-auto md:right-6";
  banner.innerHTML = `
    <p class="text-[10px] font-semibold uppercase tracking-widest text-accent-700">Continue where you left off</p>
    <p class="mt-1 text-sm font-medium text-base-900">${Math.round(progress.progress)}% read</p>
    <div class="mt-3 flex gap-2">
      <button type="button" data-resume-scroll class="rounded-sm bg-base-900 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">Resume</button>
      <button type="button" data-dismiss-resume class="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-base-500">Dismiss</button>
    </div>
  `;
  document.body.appendChild(banner);

  banner.querySelector("[data-resume-scroll]")?.addEventListener("click", () => {
    window.scrollTo({ top: progress.scrollY, behavior: "smooth" });
    banner.remove();
  });
  banner.querySelector("[data-dismiss-resume]")?.addEventListener("click", () => {
    clearReadingProgress(progress.slug);
    banner.remove();
  });
}

export function initHomeContinueReading() {
  const outer = document.getElementById("homeContinueReading");
  const slot = document.getElementById("homeContinueReadingCard");
  if (!outer || !slot) return;
  renderContinueReadingCard(slot, { outer });
}
