import {
  CITATION_STYLES,
  type CitationStyle,
  formatCitation,
  parseReferenceFromHtml,
} from "@/lib/citations";

const SOURCES_HEADING = /^(sources|references)$/i;
const DEFAULT_STYLE: CitationStyle = "apa";

function isSourcesHeading(el: Element): boolean {
  if (!(el instanceof HTMLHeadingElement)) return false;
  if (el.id === "sources") return true;
  const text = el.textContent?.trim() ?? "";
  return SOURCES_HEADING.test(text);
}

function findSourcesSections(root: HTMLElement): { section: HTMLElement; heading: HTMLElement }[] {
  const found: { section: HTMLElement; heading: HTMLElement }[] = [];
  const seen = new Set<HTMLElement>();

  const backSections = root.querySelectorAll<HTMLElement>(".art-back-matter");
  for (const section of Array.from(backSections)) {
    const headings = section.querySelectorAll<HTMLElement>(
      "h2#sources, h3.art-back-matter__subhead, h3#sources",
    );
    for (const heading of Array.from(headings)) {
      if (!isSourcesHeading(heading)) continue;
      found.push({ section, heading });
      seen.add(heading);
    }
  }

  const main =
    root.querySelector<HTMLElement>("main.art-article-main") ||
    root.querySelector<HTMLElement>("main") ||
    root;
  const legacyHeadings = main.querySelectorAll<HTMLElement>("h2, h3");
  for (const heading of Array.from(legacyHeadings)) {
    if (seen.has(heading)) continue;
    if (heading.closest(".art-back-matter")) continue;
    if (!isSourcesHeading(heading)) continue;
    found.push({ section: main, heading });
  }

  return found;
}

function collectReferenceElements(section: HTMLElement, heading: HTMLElement): HTMLElement[] {
  const items: HTMLElement[] = [];
  let node = heading.nextElementSibling;
  while (node) {
    if (node instanceof HTMLHeadingElement) {
      if (node.classList.contains("art-back-matter__subhead") && node !== heading) break;
      if (node.tagName === "H2" && node !== heading) break;
      if (node.tagName === "H3" && node !== heading && !node.classList.contains("art-back-matter__subhead")) {
        break;
      }
    }
    if (node.classList.contains("art-references")) {
      items.push(
        ...Array.from(node.querySelectorAll<HTMLElement>(".art-ref-item")).filter(
          (el) => el.dataset.artRefHydrated !== "1",
        ),
      );
      node = node.nextElementSibling;
      continue;
    }
    if (node.classList.contains("art-ref-item") && (node as HTMLElement).dataset.artRefHydrated !== "1") {
      items.push(node as HTMLElement);
      node = node.nextElementSibling;
      continue;
    }
    if (
      (node.classList.contains("art-p") || node.tagName === "P") &&
      node.closest(".art-editorial-note") == null &&
      (node as HTMLElement).dataset.artRefHydrated !== "1"
    ) {
      items.push(node as HTMLElement);
    }
    node = node.nextElementSibling;
  }
  return items;
}

function ensureToolbar(block: HTMLElement, style: CitationStyle): HTMLElement {
  let toolbar = block.querySelector<HTMLElement>(".art-citations-toolbar");
  if (toolbar) return toolbar;

  toolbar = document.createElement("div");
  toolbar.className = "art-citations-toolbar";
  toolbar.setAttribute("role", "tablist");
  toolbar.setAttribute("aria-label", "Citation format");

  for (const { id, label } of CITATION_STYLES) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "art-citations-toolbar__btn";
    btn.dataset.style = id;
    btn.setAttribute("role", "tab");
    btn.textContent = label;
    if (id === style) {
      btn.classList.add("art-citations-toolbar__btn--active");
      btn.setAttribute("aria-selected", "true");
    } else {
      btn.setAttribute("aria-selected", "false");
    }
    toolbar.appendChild(btn);
  }

  block.insertBefore(toolbar, block.firstChild);
  return toolbar;
}

function updateBlock(block: HTMLElement, style: CitationStyle) {
  block.dataset.activeStyle = style;
  const rows = block.querySelectorAll<HTMLElement>(".art-ref-item[data-art-ref-hydrated='1']");
  rows.forEach((row, index) => {
    const html = row.dataset.sourceHtml ?? "";
    const parsed = parseReferenceFromHtml(html);
    const text = formatCitation(parsed, style, index);
    const out = row.querySelector<HTMLElement>(".art-ref-citation__text");
    if (out) out.textContent = text;
  });

  block.querySelectorAll<HTMLElement>(".art-citations-toolbar__btn").forEach((btn) => {
    const active = btn.dataset.style === style;
    btn.classList.toggle("art-citations-toolbar__btn--active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function enhanceReferenceItem(el: HTMLElement, index: number, style: CitationStyle) {
  if (el.dataset.artRefHydrated === "1") return;

  const sourceHtml = el.innerHTML;
  el.dataset.sourceHtml = sourceHtml;
  el.dataset.artRefHydrated = "1";
  el.classList.add("art-ref-item", "art-ref-item--enhanced");

  const parsed = parseReferenceFromHtml(sourceHtml);
  const citationText = formatCitation(parsed, style, index);

  el.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "art-ref-citation";

  const text = document.createElement("p");
  text.className = "art-ref-citation__text";
  text.textContent = citationText;

  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "art-ref-copy";
  copy.textContent = "Copy";
  copy.setAttribute("aria-label", "Copy citation to clipboard");

  copy.addEventListener("click", () => {
    const blockEl = el.closest(".art-citations-block") as HTMLElement | null;
    const activeStyle = (blockEl?.dataset.activeStyle || DEFAULT_STYLE) as CitationStyle;
    const fresh = parseReferenceFromHtml(sourceHtml);
    const toCopy = formatCitation(fresh, activeStyle, index);
    void navigator.clipboard?.writeText(toCopy).then(
      () => {
        copy.textContent = "Copied";
        copy.classList.add("art-ref-copy--done");
        window.setTimeout(() => {
          copy.textContent = "Copy";
          copy.classList.remove("art-ref-copy--done");
        }, 1600);
      },
      () => {
        copy.textContent = "Failed";
        window.setTimeout(() => {
          copy.textContent = "Copy";
        }, 1600);
      },
    );
  });

  wrap.appendChild(text);
  wrap.appendChild(copy);
  el.appendChild(wrap);
}

function wrapReferencesBlock(section: HTMLElement, heading: HTMLElement, items: HTMLElement[]) {
  if (items.length === 0) return;

  let block = heading.nextElementSibling as HTMLElement | null;
  if (block?.classList.contains("art-citations-block")) {
    // already wrapped
  } else if (items[0].parentElement?.classList.contains("art-references")) {
    const refsDiv = items[0].parentElement as HTMLElement;
    refsDiv.classList.add("art-citations-block");
    block = refsDiv;
  } else {
    block = document.createElement("div");
    block.className = "art-citations-block art-references";
    heading.insertAdjacentElement("afterend", block);
    for (const item of items) {
      block.appendChild(item);
    }
  }

  if (!block) return;

  const style = (block.dataset.activeStyle as CitationStyle) || DEFAULT_STYLE;
  ensureToolbar(block, style);
  items.forEach((item, i) => enhanceReferenceItem(item, i, style));
  updateBlock(block, style);

  if (block.dataset.artCitationsBound === "1") return;
  block.dataset.artCitationsBound = "1";

  block.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const btn = target.closest<HTMLElement>(".art-citations-toolbar__btn");
    if (!btn || !block.contains(btn)) return;
    const next = btn.dataset.style as CitationStyle | undefined;
    if (!next) return;
    updateBlock(block, next);
  });
}

export function hydrateReferences(root: HTMLElement) {
  for (const { section, heading } of findSourcesSections(root)) {
    const items = collectReferenceElements(section, heading);
    wrapReferencesBlock(section, heading, items);
  }
}
