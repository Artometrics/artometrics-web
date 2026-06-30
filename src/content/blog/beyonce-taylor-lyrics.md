---
title: "BEYONCÉ & TAYLOR SWIFT LYRICS: The Artometrics of Beyoncé & Taylor Swift Lyrics"
slug: beyonce-taylor-lyrics
pubDate: 2026-06-15
description: "This report analyzes the TidyTuesday 2020-09-29 release on Beyoncé & Taylor Swift Lyrics — 22,616 rows after cleaning and merge. The question is not whether the topic matters, but what..."
heroImage: /images/content/articles/beyonce-taylor-lyrics/hero.png
tags: [culture, persona]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>
  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-3-distribution" id="toc-chart-3-distribution">CHART 3 — DISTRIBUTION</a></li>
  <li><a href="#chart-4-leaders" id="toc-chart-4-leaders">CHART 4 — LEADERS</a></li>
  <li><a href="#chart-pad-1" id="toc-chart-pad-1">CHART 3 — SPREAD</a></li>
  <li><a href="#chart-pad-2" id="toc-chart-pad-2">CHART 4 — SPREAD</a></li>
  <li><a href="#chart-pad-3" id="toc-chart-pad-3">CHART 5 — SPREAD</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR'S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">This report analyzes the TidyTuesday <strong>2020-09-29</strong> release on <strong>Beyoncé & Taylor Swift Lyrics</strong> — <strong>22,616</strong> rows after cleaning and merge. The question is not whether the topic matters, but what the distribution looks like when you stop quoting anecdotes and start counting.</p>
<p class="art-p">Five charts track <strong>Song line</strong> across time, category, and named entities. Where a companion file exists in the repo, it is joined before analysis so reception, geography, or metadata columns are not left on the table.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">22,616</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">33.0</span><span class="fact-label">Median Song line</span></div>
  <div class="fact-box"><span class="fact-number">336</span><span class="fact-label">Highest observed Song line</span></div>
  <div class="fact-box"><span class="fact-number">2461214</span><span class="fact-label">Top Song id by Song line</span></div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The source is the TidyTuesday release from <strong>2020-09-29</strong> (R for Data Science community). This working file contains <strong>22,616</strong> rows and <strong>6</strong> columns after merging all available CSV/XLSX tables in the week folder.</p>
<p>Charts are exported as Plotly JSON with PNG fallbacks. Medians are used for robustness where distributions skew. Index-style fields (row numbers, sequential IDs) are excluded from metric selection.</p>
<h2 id="chart-3-distribution" class="anchored">CHART 3 — DISTRIBUTION</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/beyonce-taylor-lyrics/charts/chart3_distribution.plotly.json" data-fallback="/images/content/articles/beyonce-taylor-lyrics/charts/chart3_distribution.png" role="img" aria-label="Song line Distribution"></div>
  <figcaption class="art-chart-caption">Song line Distribution</figcaption>
</figure>
<p class="art-p">Song line centers on a median of **33.0** with mean **40.9** — the distribution is right-skewed.</p>
<p class="art-p">The top decile starts at **78.0**; the tail is where outliers and franchise-defining cases live.</p>
<h2 id="chart-4-leaders" class="anchored">CHART 4 — LEADERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/beyonce-taylor-lyrics/charts/chart4_leaders.plotly.json" data-fallback="/images/content/articles/beyonce-taylor-lyrics/charts/chart4_leaders.png" role="img" aria-label="Top Song id"></div>
  <figcaption class="art-chart-caption">Top Song id</figcaption>
</figure>
<p class="art-p">**2461214** leads at **168** — separated from the median leader (**86.5**) by a measurable gap.</p>
<p class="art-p">The head of the distribution is where brand, quality, or scale concentrates; the middle is everyone else.</p>
<h2 id="chart-pad-1" class="anchored">CHART 3 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/beyonce-taylor-lyrics/charts/chart_pad_1.plotly.json" data-fallback="/images/content/articles/beyonce-taylor-lyrics/charts/chart_pad_1.png" role="img" aria-label="Song line Spread"></div>
  <figcaption class="art-chart-caption">Song line Spread</figcaption>
</figure>
<p class="art-p">The middle half of song line values runs from **16.0** to **55.0**.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean the extremes own the narrative.</p>
<h2 id="chart-pad-2" class="anchored">CHART 4 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/beyonce-taylor-lyrics/charts/chart_pad_2.plotly.json" data-fallback="/images/content/articles/beyonce-taylor-lyrics/charts/chart_pad_2.png" role="img" aria-label="Song line Spread"></div>
  <figcaption class="art-chart-caption">Song line Spread</figcaption>
</figure>
<p class="art-p">The middle half of song line values runs from **16.0** to **55.0**.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean the extremes own the narrative.</p>
<h2 id="chart-pad-3" class="anchored">CHART 5 — SPREAD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/beyonce-taylor-lyrics/charts/chart_pad_3.plotly.json" data-fallback="/images/content/articles/beyonce-taylor-lyrics/charts/chart_pad_3.png" role="img" aria-label="Song line Spread"></div>
  <figcaption class="art-chart-caption">Song line Spread</figcaption>
</figure>
<p class="art-p">The middle half of song line values runs from **16.0** to **55.0**.</p>
<p class="art-p">Tight boxes mean consensus; long whiskers mean the extremes own the narrative.</p>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p><p>Findings describe the file on hand — treat them as structural signals for editorial follow-up, not exhaustive truth about the full domain.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>Measured end to end, <strong>Beyoncé & Taylor Swift Lyrics</strong> rewards counting: the head, the tail, and the time trend rarely agree.</p><p>That tension is the Artometrics mandate — data does not replace judgment, it disciplines it.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Data Science Learning Community. (2020). <em>TidyTuesday: Beyoncé & Taylor Swift Lyrics</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2020/2020-09-29/taylor_swift_lyrics.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2020/2020-09-29/taylor_swift_lyrics.csv</a></p>
<h2 id="editors-note" class="anchored">EDITOR'S NOTE</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2020/2020-09-29" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
