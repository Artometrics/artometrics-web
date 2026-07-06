import Fuse from "fuse.js";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  type?: string;
  typeLabel?: string;
  slug?: string;
  tags?: string[];
};

type SearchPayload = {
  items: SearchItem[];
  suggestions: SearchItem[];
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function resultHtml(item: SearchItem, index: number) {
  return `
    <a href="${item.href}" data-index="${index}" class="search-result block px-4 py-4 transition-colors hover:bg-base-50 focus:bg-base-50 outline-none focus-visible:outline-none">
      <p class="text-[10px] font-semibold uppercase tracking-widest text-accent-700">
        ${escapeHtml(item.typeLabel || item.type || "Page")}
      </p>
      <h3 class="mt-1 text-sm font-semibold leading-snug text-base-900">${escapeHtml(item.title)}</h3>
      <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-base-500">${escapeHtml(item.description)}</p>
    </a>
  `;
}

export function initSiteSearch(payload: SearchPayload) {
  const searchButton = document.getElementById("searchButton");
  const searchModal = document.getElementById("searchModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
  const searchResults = document.getElementById("searchResults");
  const closeSearch = document.getElementById("closeSearch");
  const searchKbd = document.getElementById("searchKbd");

  if (!searchModal || !searchInput || !searchResults) return;

  const isMac = /Mac|iPhone|iPad/i.test(navigator.platform || "");
  if (searchKbd) searchKbd.textContent = isMac ? "⌘K" : "Ctrl+K";
  if (searchButton) {
    searchButton.setAttribute("aria-label", `Search (${isMac ? "Command" : "Control"}+K)`);
  }

  const fuse = new Fuse(payload.items, {
    keys: ["title", "description", "typeLabel", "tags", "slug"],
    threshold: 0.35,
    ignoreLocation: true,
  });

  let activeIndex = -1;
  let currentLinks: HTMLAnchorElement[] = [];

  function syncResultLinks() {
    currentLinks = Array.from(searchResults.querySelectorAll<HTMLAnchorElement>(".search-result"));
  }

  function renderSuggestions() {
    activeIndex = -1;
    searchResults.innerHTML = `
      <p class="px-4 pt-4 text-[10px] font-semibold uppercase tracking-widest text-base-400">Recent</p>
      ${payload.suggestions.map((item, i) => resultHtml(item, i)).join("")}
    `;
    currentLinks = Array.from(searchResults.querySelectorAll<HTMLAnchorElement>(".search-result"));
  }

  function renderResults(results: Fuse.FuseResult<SearchItem>[]) {
    const query = searchInput.value.trim();
    if (!query) {
      renderSuggestions();
      return;
    }

    if (results.length === 0) {
      activeIndex = -1;
      currentLinks = [];
      searchResults.innerHTML =
        '<p class="p-6 text-center text-sm text-base-500">No matches — try a desk name, topic, or author.</p>';
      return;
    }

    activeIndex = 0;
    searchResults.innerHTML = results
      .slice(0, 12)
      .map((result, i) => resultHtml(result.item, i))
      .join("");
    currentLinks = Array.from(searchResults.querySelectorAll<HTMLAnchorElement>(".search-result"));
    highlightActive();
  }

  function highlightActive() {
    currentLinks.forEach((link, i) => {
      link.classList.toggle("bg-base-50", i === activeIndex);
      link.classList.toggle("ring-2", i === activeIndex);
      link.classList.toggle("ring-inset", i === activeIndex);
      link.classList.toggle("ring-accent-300", i === activeIndex);
    });
    if (activeIndex >= 0 && currentLinks[activeIndex]) {
      currentLinks[activeIndex].scrollIntoView({ block: "nearest" });
    }
  }

  function openSearch(e?: Event) {
    e?.preventDefault();
    e?.stopPropagation();
    searchModal.classList.remove("hidden");
    document.body.classList.add("site-search-open");
    searchButton?.setAttribute("aria-expanded", "true");
    renderSuggestions();
    window.setTimeout(() => searchInput.focus(), 50);
  }

  function closeSearchModal(e?: Event) {
    e?.preventDefault();
    e?.stopPropagation();
    searchModal.classList.add("hidden");
    document.body.classList.remove("site-search-open");
    searchButton?.setAttribute("aria-expanded", "false");
    searchInput.value = "";
    searchResults.innerHTML = "";
    activeIndex = -1;
    currentLinks = [];
  }

  function followActiveResult() {
    if (!currentLinks.length) return;
    const target = currentLinks[Math.max(activeIndex, 0)];
    if (target) window.location.assign(target.href);
  }

  searchButton?.addEventListener("click", openSearch);
  closeSearch?.addEventListener("click", closeSearchModal);
  modalOverlay?.addEventListener("click", closeSearchModal);

  syncResultLinks();

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim();
    renderResults(value ? fuse.search(value) : []);
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" && currentLinks.length) {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, currentLinks.length - 1);
      highlightActive();
      return;
    }

    if (e.key === "ArrowUp" && currentLinks.length) {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      highlightActive();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (!searchInput.value.trim()) return;
      if (!currentLinks.length) {
        const results = fuse.search(searchInput.value.trim());
        if (results.length) {
          window.location.assign(results[0].item.href);
        }
        return;
      }
      followActiveResult();
    }
  });

  document.addEventListener("keydown", (e) => {
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (searchModal.classList.contains("hidden")) openSearch();
      else closeSearchModal();
      return;
    }
    if (e.key === "Escape" && !searchModal.classList.contains("hidden")) {
      closeSearchModal();
    }
  });
}
