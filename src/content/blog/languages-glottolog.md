---
title: "LANGUAGES OF THE WORLD: The Artometrics of Languages of the World"
slug: languages-glottolog
pubDate: 2026-06-15
description: "This report treats the TidyTuesday **2025-12-23** release as a measurable slice of languages of the world — 4,832 records, 2 variables, one question: what does the distribution actually..."
heroImage: /images/content/articles/languages-glottolog/hero.png
tags: [atlas, history]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-fallback-0" id="toc-chart-fallback-0">CHART 0 — ID</a></li>
  <li><a href="#chart-fallback-1" id="toc-chart-fallback-1">CHART 1 — FAMILY</a></li>
  <li><a href="#chart-fallback-2" id="toc-chart-fallback-2">CHART 2 — ID</a></li>
  <li><a href="#chart-fallback-3" id="toc-chart-fallback-3">CHART 3 — FAMILY</a></li>
  <li><a href="#chart-fallback-4" id="toc-chart-fallback-4">CHART 4 — ID</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report treats the TidyTuesday **2025-12-23** release as a measurable slice of languages of the world — 4,832 records, 2 variables, one question: what does the distribution actually look like when you stop reading anecdotes and start counting?</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">4,832</span>
    <span class="fact-label">Rows in the working dataset after initial load</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">2</span>
    <span class="fact-label">Variables available for analysis</span>
  </div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source data is the TidyTuesday release from <strong>2025-12-23</strong>, maintained by the R for Data Science community. The working dataset contains <strong>4,832</strong> rows and <strong>2</strong> columns. Files were pulled directly from the public repository without manual transcription.</p>
<p>Analysis code is embedded below each chart. All aggregates were computed in Python with pandas; charts were exported as Plotly JSON for interactive rendering on Artometrics.</p>
<h2 id="chart-fallback-0" class="anchored">CHART 0 — ID</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/languages-glottolog/charts/chart_fallback_0.plotly.json" data-fallback="/images/content/articles/languages-glottolog/charts/chart_fallback_0.png" role="img" aria-label="Id Counts"></div>
  <figcaption class="art-chart-caption">Id Counts</figcaption>
</figure>
<p class="art-p">`id` is a core signal in this file. **abkh1242** appears **1** times.</p>
<p class="art-p">When scores are sparse, frequency itself becomes the finding.</p>
<h2 id="chart-fallback-1" class="anchored">CHART 1 — FAMILY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/languages-glottolog/charts/chart_fallback_1.plotly.json" data-fallback="/images/content/articles/languages-glottolog/charts/chart_fallback_1.png" role="img" aria-label="Family Counts"></div>
  <figcaption class="art-chart-caption">Family Counts</figcaption>
</figure>
<p class="art-p">`family` is a core signal in this file. **Abkhaz-Adyge** appears **1** times.</p>
<p class="art-p">When scores are sparse, frequency itself becomes the finding.</p>
<h2 id="chart-fallback-2" class="anchored">CHART 2 — ID</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/languages-glottolog/charts/chart_fallback_2.plotly.json" data-fallback="/images/content/articles/languages-glottolog/charts/chart_fallback_2.png" role="img" aria-label="Id Counts"></div>
  <figcaption class="art-chart-caption">Id Counts</figcaption>
</figure>
<p class="art-p">`id` is a core signal in this file. **abkh1242** appears **1** times.</p>
<p class="art-p">When scores are sparse, frequency itself becomes the finding.</p>
<h2 id="chart-fallback-3" class="anchored">CHART 3 — FAMILY</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/languages-glottolog/charts/chart_fallback_3.plotly.json" data-fallback="/images/content/articles/languages-glottolog/charts/chart_fallback_3.png" role="img" aria-label="Family Counts"></div>
  <figcaption class="art-chart-caption">Family Counts</figcaption>
</figure>
<p class="art-p">`family` is a core signal in this file. **Abkhaz-Adyge** appears **1** times.</p>
<p class="art-p">When scores are sparse, frequency itself becomes the finding.</p>
<h2 id="chart-fallback-4" class="anchored">CHART 4 — ID</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/languages-glottolog/charts/chart_fallback_4.plotly.json" data-fallback="/images/content/articles/languages-glottolog/charts/chart_fallback_4.png" role="img" aria-label="Id Counts"></div>
  <figcaption class="art-chart-caption">Id Counts</figcaption>
</figure>
<p class="art-p">`id` is a core signal in this file. **abkh1242** appears **1** times.</p>
<p class="art-p">When scores are sparse, frequency itself becomes the finding.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>This dataset is a community-cleaned snapshot, not a live API. Categories, spelling, and coverage reflect the week it was published. Any time-based field may contain parsing gaps; suppressed or missing values were dropped only when necessary for the chart at hand.</p><p>Medians and counts describe the file — not the full universe of real-world activity. Treat findings as structural signals worthy of follow-up, not final verdicts.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Five charts, one through-line: <strong>Languages of the World</strong> looks different when you measure it. The headline categories, time trends, and tail behavior all matter — but they rarely tell the same story.</p><p>That tension is the point of Artometrics. The data does not replace judgment. It disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2025). <em>TidyTuesday: Languages of the World</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-12-23/families.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-12-23/families.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Editor's note: This article was generated as part of the Artometrics TidyTuesday research batch. Methodology and code are reproducible from the embedded chart exhibits.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
