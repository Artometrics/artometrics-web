---
title: How Word Count Is Distributed Across the Holmes Canon
slug: sherlock-holmes
pubDate: 2026-06-15T00:00:00.000Z
description: Text-length analysis of Sherlock Holmes stories through Conan’s corpus.
heroImage: /images/content/articles/sherlock-holmes/hero.png
tags:
  - books
draft: false
tldr: Text-length analysis of Sherlock Holmes stories through Conan’s corpus.
keyPoints:
  - '65,958 — Records in the working dataset'
  - 12.0 — Median Word count
  - 18.0 — Highest observed Word count
  - The Adventure of the Beryl C — Top Book by Word count
faq:
  - question: What does “Story-level medians sit in a narrow band” show?
    answer: '65,958 — Records in the working dataset'
  - question: What does “Even the leaders barely clear the file median” show?
    answer: 12.0 — Median Word count
  - question: 'What does “Median 12.0, mean 10.9 — a mostly symmetric shape” show?'
    answer: 18.0 — Highest observed Word count
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Conan Doyle’s Sherlock Holmes corpus arrives here as a tokenized text table: 65,958 records and a median word count of 12.0. That median is the calibration point for everything that follows — not novel length in the bookstore sense, but the word-count field as stored in this working extract.</p>
<p class="art-p">The Adventure of the Beryl Coronet tops the fact-box ranking by word count, while the charted story leaders highlight The Yellow Face at 13.0 against a top-dozen median of 12.0. The canon is famous for plot; this file is interested in textual mass and how that mass concentrates across books.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">65,958</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">12.0</span><span class="fact-label">Median Word count</span></div>
  <div class="fact-box"><span class="fact-number">18.0</span><span class="fact-label">Highest observed Word count</span></div>
  <div class="fact-box"><span class="fact-number">The Adventure of the Beryl C</span><span class="fact-label">Top Book by Word count</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2025-11-18 (R for Data Science community). The working file contains 65,958 rows and 4 columns after merging available tables in the week folder. Book titles are the primary categorical axis; word count is the primary numeric metric.</p>
<p class="art-p">Medians are used because text-length fields can skew. The distribution chart also reports a mean of 10.9 against the median of 12.0, a relatively symmetric shape for this extract. Index-style fields stay out of metric selection.</p>

<h2 id="story-level-medians-sit-in-a-narrow-band" class="anchored">Story-level medians sit in a narrow band</h2>
<h3 id="story-level-medians-sit-in-a-narrow-band-look" class="anchored">Word count by Book</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/sherlock-holmes/charts/chart1_breakdown.png" role="img" aria-label="Word count by Book"></div>
</figure>
<p class="art-p">In the book breakdown, The Yellow Face leads at 13.0 while A Case of Identity anchors the low end of the plotted group at 12.0. The spread among visible leaders is small — a reminder that this word-count field clusters tightly across many titles.</p>
<p class="art-p">Grouping by book exposes how the metric varies across the catalog’s major entities without requiring plot summary. The question is length structure, not detective method.</p>

<h2 id="even-the-leaders-barely-clear-the-file-median" class="anchored">Even the leaders barely clear the file median</h2>
<h3 id="even-the-leaders-barely-clear-the-file-median-look" class="anchored">The Yellow Face leads at 13.0 — 12.0 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/sherlock-holmes/charts/chart2_leaders.png" role="img" aria-label="The Yellow Face leads at 13.0 — 12.0 marks the median among the top dozen"></div>
</figure>
<p class="art-p">The Yellow Face leads at 13.0, and 12.0 marks the median among the top dozen — identical to the file-wide median of 12.0. In this extract, leading does not mean a dramatic leap above the typical observation; it means a modest edge inside a compressed distribution.</p>
<p class="art-p">That compression is itself a finding. Holmes stories in this tokenization do not fan out into wildly different word-count regimes at the center of the leaderboard.</p>

<h2 id="median-12-0-mean-10-9-a-mostly-symmetric-shape" class="anchored">Median 12.0, mean 10.9 — a mostly symmetric shape</h2>
<h3 id="median-12-0-mean-10-9-a-mostly-symmetric-shape-look" class="anchored">Word count Distribution</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/sherlock-holmes/charts/chart3_distribution.png" role="img" aria-label="Word count Distribution"></div>
</figure>
<p class="art-p">The full-sample distribution shows median 12.0 versus mean 10.9 — relatively symmetric rather than a heavy right skew. The top decile begins at 14.0; that upper slice is where the longer textual cases in this metric live.</p>
<p class="art-p">Symmetry matters for citation. A median-centered story about Holmes text length is more faithful here than an average pulled by a few extreme tokens.</p>

<h2 id="five-books-account-for-a-third-of-aggregate-word-count" class="anchored">Five books account for a third of aggregate word count</h2>
<h3 id="five-books-account-for-a-third-of-aggregate-word-count-look" class="anchored">Cumulative Word count</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/sherlock-holmes/charts/chart4_pareto.png" role="img" aria-label="Cumulative Word count"></div>
</figure>
<p class="art-p">The top five book entries account for 34% of the aggregate word count. Concentration is real but not absolute: a meaningful head exists, and a long tail of other titles still holds most of the remaining mass.</p>
<p class="art-p">Pareto steepness here means editorial attention can start with a small set of books without pretending the rest of the canon is empty.</p>

<h2 id="a-second-concentration-cut-confirms-the-same-head" class="anchored">A second concentration cut confirms the same head</h2>
<h3 id="a-second-concentration-cut-confirms-the-same-head-look" class="anchored">Cumulative Word count</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/sherlock-holmes/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/sherlock-holmes/charts/chart_pareto.png" role="img" aria-label="Cumulative Word count"></div>
</figure>
<p class="art-p">A second cumulative chart repeats the concentration view: again, the top five book entries account for 34% of aggregate word count. Parallel Pareto cuts are useful as a robustness check when the pipeline exports more than one concentration figure.</p>
<p class="art-p">The takeaway does not change. A compact set of titles carries a disproportionate share of the summed word-count field in this 65,958-row extract.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live literary corpora APIs. Tokenization choices, spelling variants in titles, and week-of-export coverage limits apply. Word count here is the field in the file — not an independent scholarly page count.</p>
<p class="art-p">Findings describe this Holmes extract. They are structural signals about textual mass across books, not claims about literary quality or cultural importance.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Holmes in this file is a tightly centered length distribution: median word count 12.0, mean 10.9, top decile from 14.0, and leaders such as The Yellow Face only a step above the center.</p>
<p class="art-p">Concentration still matters — the top five books hold 34% of aggregate word count — but the drama is less runaway novels than a canon whose tokenized mass piles up without extreme median drift.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2025). <em>TidyTuesday: Sherlock Holmes</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-11-18/holmes.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-11-18/holmes.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2025/2025-11-18" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
