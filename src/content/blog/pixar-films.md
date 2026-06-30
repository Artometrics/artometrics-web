---
title: "PIXAR: The Artometrics of the Computer-Animation Canon"
slug: pixar-films
pubDate: 2026-06-15
description: "Pixar's 27-film canon in data: runtime creep, critic scores, audience grades, and where Cars and Lightyear broke the streak."
heroImage: /images/content/articles/pixar-films/hero.png
tags: [culture]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-runtime-creep" id="toc-chart-1-runtime-creep">CHART 1 — RUNTIME CREEP</a></li>
  <li><a href="#chart-2-critic-scores" id="toc-chart-2-critic-scores">CHART 2 — CRITIC SCORES</a></li>
  <li><a href="#chart-3-audience-vs-critics" id="toc-chart-3-audience-vs-critics">CHART 3 — AUDIENCE VS CRITICS</a></li>
  <li><a href="#chart-4-mpaa-mix" id="toc-chart-4-mpaa-mix">CHART 4 — RATING MIX</a></li>
  <li><a href="#chart-5-runtime-quality" id="toc-chart-5-runtime-quality">CHART 5 — RUNTIME VS RECEPTION</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p>Pixar is the rare studio brand that became a quality guarantee — but guarantees are measurable. This report joins the TidyTuesday <strong>2025-03-11</strong> Pixar films release with its <code>public_response</code> companion file: <strong>27</strong> theatrical features, <strong>24</strong> with critic and audience scores attached.</p>
<p>Five charts, five angles on the same question: did Pixar's films get longer, softer, or harder to love as the catalog grew? The answers are longer, still crowd-pleasing, and critic-dependent at the margins.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">96%</span><span class="fact-label">Median Rotten Tomatoes score across rated Pixar theatrical releases</span></div>
  <div class="fact-box"><span class="fact-number">155</span><span class="fact-label">Longest runtime in the set — nan (2023)</span></div>
  <div class="fact-box"><span class="fact-number">81</span><span class="fact-label">Shortest runtime — Toy Story, the film that started the canon</span></div>
  <div class="fact-box"><span class="fact-number">40%</span><span class="fact-label">Lowest Rotten Tomatoes score — Cars 2, the critic floor</span></div>
  <div class="fact-box"><span class="fact-number">A+</span><span class="fact-label">Most common CinemaScore grade — audiences rarely stamped a Pixar opening below A</span></div>
  <div class="fact-box"><span class="fact-number">+17</span><span class="fact-label">Minutes added to median runtime, early era vs 2017–present</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The core file <code>pixar_films.csv</code> lists theatrical features with release date, runtime, and MPAA rating. The companion <code>public_response.csv</code> adds Rotten Tomatoes, Metacritic, CinemaScore, and Critics' Choice scores. Three recent releases lack complete reception fields in the public file — treat absent values as missing data, not zero-quality signals.</p>
<p>This is not box-office data. The TidyTuesday readme points to a separate <code>box_office</code> extract in the {pixarfilms} R package for revenue analysis. Reception and runtime are the focus here because they are complete in-repo.</p>
<h2 id="chart-1-runtime-creep" class="anchored">CHART 1 — RUNTIME CREEP</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pixar-films/charts/chart1_runtime_timeline.plotly.json" data-fallback="/images/content/articles/pixar-films/charts/chart1_runtime_timeline.png" role="img" aria-label="Runtime Over Time"></div>
  <figcaption class="art-chart-caption">Runtime Over Time</figcaption>
</figure>
<p class="art-p">Pixar's theatrical releases did not stay the compact 81-minute package of <em>Toy Story</em>. Median runtime climbed from the sub-100-minute era of the late 1990s to a post-<em>Incredibles 2</em> world where **nan** runs **155 minutes** — the longest entry in the canon.</p>
<p class="art-p">The early median cluster around **98 minutes** (through 2006) versus **116 minutes** for films since 2017 is not noise. It is a structural shift in what a Pixar theatrical release is allowed to be.</p>
<h2 id="chart-2-critic-scores" class="anchored">CHART 2 — CRITIC SCORES</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pixar-films/charts/chart2_rt_ranking.plotly.json" data-fallback="/images/content/articles/pixar-films/charts/chart2_rt_ranking.png" role="img" aria-label="Rotten Tomatoes Ranking"></div>
  <figcaption class="art-chart-caption">Rotten Tomatoes Ranking</figcaption>
</figure>
<p class="art-p">The median Rotten Tomatoes score across rated films is **96%** — elite by any studio standard. Pixar built a reputation on critic-proof consistency, not occasional brilliance.</p>
<p class="art-p">The floor matters too. **Cars 2** sits at **40%**, while **Toy Story** and several sequels hit **100%**. The spread is narrow by Hollywood standards, but the low end is not random — it clusters around mid-2000s franchise experiments and the 2020s IP-forward releases.</p>
<h2 id="chart-3-audience-vs-critics" class="anchored">CHART 3 — AUDIENCE VS CRITICS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pixar-films/charts/chart3_critic_audience_gap.plotly.json" data-fallback="/images/content/articles/pixar-films/charts/chart3_critic_audience_gap.png" role="img" aria-label="Critics vs CinemaScore"></div>
  <figcaption class="art-chart-caption">Critics vs CinemaScore</figcaption>
</figure>
<p class="art-p">CinemaScore grades cluster at **A** and **A+** across the board. Audiences who showed up opening weekend were rarely disappointed — or at least rarely admitted it on exit polls.</p>
<p class="art-p">Critics were the discriminating layer. The same films that earned A+ crowd grades still span a 74–100% Rotten Tomatoes range. That gap is the story: Pixar optimized for mass affection first, prestige second.</p>
<h2 id="chart-4-mpaa-mix" class="anchored">CHART 4 — RATING MIX</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pixar-films/charts/chart4_rating_mix.plotly.json" data-fallback="/images/content/articles/pixar-films/charts/chart4_rating_mix.png" role="img" aria-label="MPAA Rating Mix"></div>
  <figcaption class="art-chart-caption">MPAA Rating Mix</figcaption>
</figure>
<p class="art-p">**13** films carry a **G** rating; **10** are **PG**. The brand's family positioning is not marketing copy — it is embedded in the rating structure.</p>
<p class="art-p">Only **0** titles in this file carry **PG-13**, and they arrive in the later era. Pixar expanded runtime and thematic weight without abandoning the all-ages lane until absolutely necessary.</p>
<h2 id="chart-5-runtime-quality" class="anchored">CHART 5 — RUNTIME VS RECEPTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pixar-films/charts/chart5_runtime_vs_rt.plotly.json" data-fallback="/images/content/articles/pixar-films/charts/chart5_runtime_vs_rt.png" role="img" aria-label="Runtime vs Rotten Tomatoes"></div>
  <figcaption class="art-chart-caption">Runtime vs Rotten Tomatoes</figcaption>
</figure>
<p class="art-p">There is no simple rule that longer films score worse — <em>Up</em>, <em>Wall-E</em>, and <em>Inside Out</em> combine runtime north of **95 minutes** with scores above **95%**.</p>
<p class="art-p">The outliers sit in the lower-right and upper-left: <em>Cars 2</em> (shorter, weaker RT) versus epics that tested patience and still won. Bubble size tracks Metacritic where available — the reception stack is consistent across review systems.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Reception scores are snapshots from Wikipedia-curated tables, not live API pulls. Rotten Tomatoes percentages can shift as reviews are added. CinemaScore is ordinal, not interval — treat cross-film comparisons as directional.</p><p>The dataset ends with the films included in the March 2025 TidyTuesday release. It does not include Disney+ exclusives or shorts. Runtime and rating analysis covers theatrical features only.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Pixar's measurable story is stability with drift: critics stayed harsh at the margins, audiences stayed generous, and runtimes marched upward. The brand did not break — it stretched.</p><p>That is the Artometrics read: the myth is magic; the data is a studio learning it could ask for more minutes, more sequels, and still keep the crowd on its side.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Pixar Films</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-03-11/pixar_films.csv" target="_blank" rel="noopener noreferrer">pixar_films.csv</a>; <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-03-11/public_response.csv" target="_blank" rel="noopener noreferrer">public_response.csv</a>. Original pixarfilms R package by Eric Leung.</p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>This report replaces the initial batch-generated Pixar draft with a hand-tuned analysis joining both TidyTuesday files. Charts use Artometrics styling and Plotly JSON exports.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-03-11" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
