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

function hideCodeBlocks() {
  document
    .querySelectorAll<HTMLElement>(
      ".artometrics-article-body .art-code-block, .artometrics-article-body details:has(.art-lang-tag)"
    )
    .forEach((el) => {
      el.remove();
    });
}

interface RelatedPost {
  title: string;
  href: string;
  deck: string;
  image?: string;
}

function initTocScrollSpy() {
  const toc = document.querySelector<HTMLElement>(".artometrics-article-body nav#TOC");
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
  if (!links.length) return;

  const sections = links
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      return el ? { link, el } : null;
    })
    .filter(Boolean) as { link: HTMLAnchorElement; el: HTMLElement }[];

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const active = sections.find((s) => s.el === visible.target);
      if (!active) return;
      links.forEach((l) => l.parentElement?.classList.remove("active"));
      active.link.parentElement?.classList.add("active");
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] }
  );

  sections.forEach(({ el }) => observer.observe(el));
}

function initMobileToc() {
  const toc = document.querySelector<HTMLElement>(".artometrics-article-body nav#TOC");
  const main = document.querySelector<HTMLElement>(".artometrics-article-body main.art-article-main");
  if (!toc || !main || document.getElementById("art-mobile-toc")) return;

  const panel = document.createElement("div");
  panel.id = "art-mobile-toc";
  panel.className = "art-mobile-toc";
  panel.hidden = true;

  const backdrop = document.createElement("button");
  backdrop.type = "button";
  backdrop.className = "art-mobile-toc__backdrop";
  backdrop.setAttribute("aria-label", "Close table of contents");

  const sheet = document.createElement("div");
  sheet.className = "art-mobile-toc__sheet";
  sheet.innerHTML = toc.innerHTML;
  panel.append(backdrop, sheet);
  document.body.appendChild(panel);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "art-mobile-toc-btn";
  btn.className = "art-mobile-toc-btn";
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "art-mobile-toc");
  btn.textContent = "Sections";
  document.body.appendChild(btn);

  const close = () => {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  };
  const open = () => {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
  };

  btn.addEventListener("click", () => (panel.hidden ? open() : close()));
  backdrop.addEventListener("click", close);
  sheet.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

function initBackToTop() {
  if (document.getElementById("art-back-top")) return;
  const btn = document.createElement("button");
  btn.id = "art-back-top";
  btn.type = "button";
  btn.className = "art-back-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = "↑";
  document.body.appendChild(btn);

  const toggle = () => {
    btn.classList.toggle("art-back-top--visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initMobileRelated(related: RelatedPost[]) {
  if (!related.length || document.querySelector(".art-mobile-related")) return;
  const wrap = document.createElement("section");
  wrap.className = "art-mobile-related";
  wrap.setAttribute("aria-label", "More reports");

  const title = document.createElement("p");
  title.className = "art-mobile-related__title";
  title.textContent = "More Reports";
  wrap.appendChild(title);

  const scroller = document.createElement("div");
  scroller.className = "art-mobile-related__scroll";
  for (const item of related.slice(0, 6)) {
    const card = document.createElement("a");
    card.href = item.href;
    card.className = "art-mobile-related__card";
    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.loading = "lazy";
      card.appendChild(img);
    }
    const strong = document.createElement("strong");
    strong.textContent = item.title;
    card.appendChild(strong);
    scroller.appendChild(card);
  }
  wrap.appendChild(scroller);

  const main = document.querySelector(".artometrics-article-body main.art-article-main");
  main?.appendChild(wrap);
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

  initMobileRelated(related);

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
      img.alt = item.title;
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
  initTocScrollSpy();
  initMobileToc();
  initBackToTop();
  hideCodeBlocks();
  initRelatedRail();
}
