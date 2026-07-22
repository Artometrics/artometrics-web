---
title: Which Christmas Novels Anchor the Holiday Shelf?
slug: christmas-novels
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  A Gutenberg holiday corpus shows which seasonal novels still define the
  Christmas canon.
heroImage: /images/content/articles/christmas-novels/hero.png
tags:
  - books
draft: false
tldr: >-
  A Gutenberg holiday corpus shows which seasonal novels still define the
  Christmas canon.
keyPoints:
  - 35 — Records in the working dataset
  - '1,859 — Median Birthdate'
  - '1,891 — Highest observed Birthdate'
  - The Camp Fire Girls Solve a — Top Title by Birthdate
  - 1970–1970 — Year span covered in the file
faq:
  - question: What does “The Shelf Centers on Mid-Nineteenth-Century Births” show?
    answer: >-
      Key figure: 35 — Records in the working dataset. See the charts and
      sources in the report for the full evidence.
  - question: What does “Later-Born Titles Mark the Edge of the Canon” show?
    answer: >-
      Key figure: 1,859 — Median Birthdate. See the charts and sources in the
      report for the full evidence.
  - question: What does “Birthdates Cluster Around the 1860s” show?
    answer: >-
      Key figure: 1,891 — Highest observed Birthdate. See the charts and sources
      in the report for the full evidence.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Christmas novels are a seasonal shelf with a long memory: Dickensian ghosts, children’s mysteries, parlor sentimentalism. The TidyTuesday christmas-novels extract used here is small — <strong>35</strong> records — with a median author birthdate of <strong>1,859</strong> and a latest birthdate of <strong>1,891</strong>. Charles Dickens is the most common author label in the file.</p>
<p class="art-p">Because the sample is tiny, every chart is a map of a curated canon rather than a complete market. Birthdate becomes a proxy for which literary generations stock the holiday shelf.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">35</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1,859</span><span class="fact-label">Median Birthdate</span></div>
  <div class="fact-box"><span class="fact-number">1,891</span><span class="fact-label">Highest observed Birthdate</span></div>
  <div class="fact-box"><span class="fact-number">The Camp Fire Girls Solve a </span><span class="fact-label">Top Title by Birthdate</span></div>
  <div class="fact-box"><span class="fact-number">1970–1970</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">Dickens, Charles</span><span class="fact-label">Most common Author</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2025-12-30 (christmas_novels.csv). After cleaning, 35 rows remain.</p>
<p class="art-p">Author birthdate is the primary numeric metric in this chart stack; deathdate appears in the joint plot. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="the-shelf-centers-on-mid-nineteenth-century-births" class="anchored">The Shelf Centers on Mid-Nineteenth-Century Births</h2>
<h3 id="the-shelf-centers-on-mid-nineteenth-century-births-look" class="anchored">Median Birthdate Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-novels/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-novels/charts/chart1_trend.png" role="img" aria-label="Median Birthdate Over Time"></div>
</figure>
<p class="art-p">The trend summary in this build sits at a median birthdate of <strong>1859</strong> — Victorian and immediately post-Victorian authors anchoring the holiday novel list.</p>
<p class="art-p">That center of gravity explains the tone of the canon: industrial-era childhood, Christian seasonal ritual, and serialized storytelling habits.</p>

<h2 id="later-born-titles-mark-the-edge-of-the-canon" class="anchored">Later-Born Titles Mark the Edge of the Canon</h2>
<h3 id="later-born-titles-mark-the-edge-of-the-canon-look" class="anchored">The Camp Fire Girls Solve a Mystery; Or, The Christmas Adventure at Carver House leads at 1,891 — 1,872 marks the median among the...</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-novels/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-novels/charts/chart2_leaders.png" role="img" aria-label="The Camp Fire Girls Solve a Mystery; Or, The Christmas Adventure at Carver House leads at 1,891 — 1,872 marks the median among the..."></div>
</figure>
<p class="art-p">The Camp Fire Girls Solve a Mystery; Or, The Christmas Adventure at Carver House leads at birthdate <strong>1891</strong>. Other later births include Uncle Noah’s Christmas Inspiration (<strong>1884</strong>) and Christmas Outside of Eden (<strong>1883</strong>). The median among the top dozen by birthdate is about <strong>1872</strong>.</p>
<p class="art-p">Even the “late” edge of this shelf is still nineteenth-century. Modern holiday romances are mostly outside this particular extract.</p>

<h2 id="birthdates-cluster-around-the-1860s" class="anchored">Birthdates Cluster Around the 1860s</h2>
<h3 id="birthdates-cluster-around-the-1860s-look" class="anchored">Median 1,859 vs mean 1,849 — the shape is relatively symmetric</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-novels/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-novels/charts/chart3_distribution.png" role="img" aria-label="Median 1,859 vs mean 1,849 — the shape is relatively symmetric"></div>
</figure>
<p class="art-p">The distribution piles several authors near the early 1860s bins, with smaller counts in earlier nineteenth-century bands. Mean birthdate (~<strong>1849</strong> in the chart annotation’s neighborhood) sits close enough to the median to read as relatively symmetric for such a small n.</p>
<p class="art-p">With only 35 rows, bin heights are fragile — but the Victorian concentration is robust enough to cite.</p>

<h2 id="dickens-and-thackeray-sit-earlier-than-the-median" class="anchored">Dickens and Thackeray Sit Earlier Than the Median</h2>
<h3 id="dickens-and-thackeray-sit-earlier-than-the-median-look" class="anchored">Birthdate vs median by Author</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-novels/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-novels/charts/chart4_gap.png" role="img" aria-label="Birthdate vs median by Author"></div>
</figure>
<p class="art-p">Author gaps to the median birthdate show Rupert Hughes furthest above (+<strong>13</strong>), while Dickens (−<strong>47</strong>) and Thackeray (−<strong>48</strong>) sit well earlier. Louisa May Alcott is also clearly before the median (−<strong>27</strong>).</p>
<p class="art-p">The holiday shelf’s most famous names are often older than the shelf’s statistical middle — canon gravity pulling toward earlier births.</p>

<h2 id="birth-and-death-dates-trace-finite-author-lives" class="anchored">Birth and Death Dates Trace Finite Author Lives</h2>
<h3 id="birth-and-death-dates-trace-finite-author-lives-look" class="anchored">Birthdate vs Deathdate</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-novels/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-novels/charts/chart5_scatter.png" role="img" aria-label="Birthdate vs Deathdate"></div>
</figure>
<p class="art-p">Birthdate versus deathdate for 32 plotted authors follows the expected upward diagonal: later-born authors die later, with points stretching from early-nineteenth-century pairs into mid-twentieth-century deaths.</p>
<p class="art-p">The scatter is a mortality timeline for a seasonal literature, not a sales chart — useful for placing which generations could still be writing when Christmas publishing industrialized.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">n=35 is a teaching canon, not a market census. Missing modern titles and non-English traditions are structural absences. Birthdate as a ranking metric is biographical, not a measure of holiday popularity.</p>
<p class="art-p">Author name authority control may still split or merge identities in a small file.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">This Christmas-novel shelf is a Victorian-centered canon: median birthdate 1859, latest 1891, with Dickens as the recurring name.</p>
<p class="art-p">Cite the small n alongside any ranking. The value is literary geography — which generations stock the holiday imagination — not a bestseller index.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2025). <em>TidyTuesday: Christmas Novels</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-12-30/christmas_novels.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-12-30/christmas_novels.csv</a></p>
</main>
</div>
