function initProgressBar() {
  if (document.getElementById("art-progress-bar")) return;
  const bar = document.createElement("div");
  bar.id = "art-progress-bar";
  document.body.appendChild(bar);
  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
    },
    { passive: true }
  );
}

function positionSidebarBtn(toc: HTMLElement, btn: HTMLElement) {
  if (document.body.classList.contains("art-sidebar-collapsed")) {
    btn.style.left = "0";
    return;
  }
  const rect = toc.getBoundingClientRect();
  btn.style.left = `${Math.max(0, rect.right)}px`;
}

function initSidebarToggle() {
  const toc = document.querySelector<HTMLElement>(".artometrics-article-body nav#TOC");
  if (!toc || document.getElementById("art-sidebar-btn")) return;

  const btn = document.createElement("button");
  btn.id = "art-sidebar-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Hide section navigation");
  btn.innerHTML = "&#10005;";
  document.body.appendChild(btn);

  const updatePosition = () => positionSidebarBtn(toc, btn);
  updatePosition();
  window.addEventListener("resize", updatePosition, { passive: true });
  window.addEventListener("scroll", updatePosition, { passive: true });

  btn.addEventListener("click", () => {
    const collapsed = document.body.classList.toggle("art-sidebar-collapsed");
    btn.innerHTML = collapsed ? "&#9776;" : "&#10005;";
    btn.setAttribute(
      "aria-label",
      collapsed ? "Show section navigation" : "Hide section navigation"
    );
    updatePosition();
  });
}

function cleanCodeSummary(summary: Element) {
  for (const node of Array.from(summary.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      node.remove();
    }
  }

  summary.querySelectorAll(":scope > *").forEach((node) => {
    if (node.classList.contains("art-lang-tag")) return;
    node.remove();
  });
}

function upgradeLegacyCodeBlock(details: HTMLDetailsElement) {
  const summary = details.querySelector("summary");
  const langTag = summary?.querySelector(".art-lang-tag");
  if (!summary || !langTag) return;

  if (!details.closest(".art-code-block")) {
    const wrapper = document.createElement("div");
    wrapper.className = "art-code-block";
    details.parentElement?.insertBefore(wrapper, details);
    wrapper.appendChild(details);
  }

  summary.classList.add("art-code-summary");
  cleanCodeSummary(summary);

  details.querySelectorAll(".code-copy-button, button.code-copy-button").forEach((btn) => {
    btn.remove();
  });

  const scaffold = details.querySelector(".code-copy-outer-scaffold");
  const pre =
    details.querySelector<HTMLPreElement>(".art-code-pre") ??
    scaffold?.querySelector("pre") ??
    details.querySelector("pre");

  if (pre) {
    pre.classList.add("art-code-pre");
    if (scaffold && pre.closest(".code-copy-outer-scaffold") === scaffold) {
      details.appendChild(pre);
      scaffold.remove();
    }
  }

  details.querySelectorAll(".sourceCode, .code-with-copy").forEach((el) => {
    if (el !== pre && !el.contains(pre ?? null)) el.remove();
  });
}

function initCodeBlocks() {
  document
    .querySelectorAll<HTMLDetailsElement>(".artometrics-article-body details")
    .forEach((details) => {
      const langTag = details.querySelector(".art-lang-tag");
      if (!langTag) return;

      upgradeLegacyCodeBlock(details);
      details.removeAttribute("open");

      const pre =
        details.querySelector<HTMLPreElement>(".art-code-pre") ??
        details.querySelector("pre");
      if (!pre) return;

      details.querySelectorAll(".art-copy-btn").forEach((btn) => btn.remove());

      const summary = details.querySelector(".art-code-summary");
      if (summary) cleanCodeSummary(summary);

      pre.setAttribute("title", "Click to copy code");
      pre.setAttribute("role", "button");
      pre.setAttribute("tabindex", "0");

      const copyCode = () => {
        void navigator.clipboard.writeText(pre.innerText).then(() => {
          pre.classList.add("art-code-pre--copied");
          pre.setAttribute("title", "Copied!");
          setTimeout(() => {
            pre.classList.remove("art-code-pre--copied");
            pre.setAttribute("title", "Click to copy code");
          }, 1800);
        });
      };

      pre.addEventListener("click", (event) => {
        event.stopPropagation();
        copyCode();
      });
      pre.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          copyCode();
        }
      });
    });
}

interface RelatedPost {
  title: string;
  href: string;
  deck: string;
  image?: string;
}

function initRelatedRail() {
  const body = document.querySelector<HTMLElement>(".artometrics-article-body");
  const grid = document.querySelector<HTMLElement>("#quarto-content");
  if (!body?.dataset.related || !grid || grid.querySelector(".art-related-rail")) {
    return;
  }

  let related: RelatedPost[] = [];
  try {
    related = JSON.parse(body.dataset.related) as RelatedPost[];
  } catch {
    return;
  }
  if (!related.length) return;

  const aside = document.createElement("aside");
  aside.className = "art-related-rail";
  aside.setAttribute("aria-label", "More reports");

  const heading = document.createElement("p");
  heading.className = "art-related-rail__title";
  heading.textContent = "More Reports";
  aside.appendChild(heading);

  const list = document.createElement("ul");
  for (const item of related) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = item.href;

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = "";
      img.className = "art-related-rail__thumb";
      img.loading = "lazy";
      img.decoding = "async";
      link.appendChild(img);
    }

    const strong = document.createElement("strong");
    strong.textContent = item.title;
    const span = document.createElement("span");
    span.textContent = item.deck;
    link.append(strong, span);
    li.appendChild(link);
    list.appendChild(li);
  }
  aside.appendChild(list);
  grid.appendChild(aside);
}

export function initArticleChrome() {
  initProgressBar();
  initSidebarToggle();
  initCodeBlocks();
  initRelatedRail();
}
