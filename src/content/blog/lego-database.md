---
title: How LEGO Set Complexity Evolved Across Themes
slug: lego-database
pubDate: 2026-06-15T00:00:00.000Z
description: Official set metadata traces rising piece counts and theme differences.
heroImage: /images/content/articles/lego-database/hero.png
draft: false
tags:
  - culture
  - leisure
tldr: >-
  LEGO sets are toys, collectibles, and increasingly architectural objects. The
  Rebrickable-style database that feeds this TidyTuesday release turns that
  catalog into something measurable: parts counts, set names, and how complexity
  has shifted across decades.
keyPoints:
  - '19,798 — Records in the working dataset'
  - 34.0 — Median Num parts
  - '11,695 — Highest observed Num parts'
  - World Map — Top Name by Num parts
  - 1949–2022 — Year span covered in the file
faq:
  - question: How part counts changed over time?
    answer: >-
      Key figure: 19,798 — Records in the working dataset. Quantity of pieces is
      not the same as play value, but it is a clean industrial signal: how much
      plastic inventory a box commits to, and how the company balances everyday
      sets against display pieces.
  - question: Who sits at the top?
    answer: >-
      Key figure: 34.0 — Median Num parts. Quantity of pieces is not the same as
      play value, but it is a clean industrial signal: how much plastic
      inventory a box commits to, and how the company balances everyday sets
      against display pieces.
  - question: How the field is spread?
    answer: >-
      Key figure: 11,695 — Highest observed Num parts. Quantity of pieces is not
      the same as play value, but it is a clean industrial signal: how much
      plastic inventory a box commits to, and how the company balances everyday
      sets against display pieces.
  - question: What does the data show about Leader trends?
    answer: >-
      Key figure: World Map — Top Name by Num parts. Quantity of pieces is not
      the same as play value, but it is a clean industrial signal: how much
      plastic inventory a box commits to, and how the company balances everyday
      sets against display pieces.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">LEGO sets are toys, collectibles, and increasingly architectural objects. The Rebrickable-style database that feeds this TidyTuesday release turns that catalog into something measurable: parts counts, set names, and how complexity has shifted across decades.</p>
<p class="art-p">The working file's fact markers put the median set near <strong>34</strong> parts while the extreme end reaches into five digits — <strong>World Map</strong> leads at <strong>11,695</strong> parts on the highlighted ranking, with <strong>5,792</strong> as the median among the top dozen. Across the time span in the charts, median part counts fall from roughly <strong>142</strong> in the opening period to about <strong>59.5</strong> at the close — a reminder that the typical set and the showcase set are different products.</p>
<p class="art-p">Quantity of pieces is not the same as play value, but it is a clean industrial signal: how much plastic inventory a box commits to, and how the company balances everyday sets against display pieces.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">19,798</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">34.0</span><span class="fact-label">Median Num parts</span></div>
  <div class="fact-box"><span class="fact-number">11,695</span><span class="fact-label">Highest observed Num parts</span></div>
  <div class="fact-box"><span class="fact-number">World Map</span><span class="fact-label">Top Name by Num parts</span></div>
  <div class="fact-box"><span class="fact-number">1949–2022</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2022-09-06 (R for Data Science community). The working file contains 19,798 rows across set and parts tables after merging — set names, years, part counts, and quantity fields among them.</p>
<p class="art-p">Medians are essential because a few architectural and mosaic sets pull means upward. Charts export as Plotly JSON with PNG fallbacks. Part counts describe inventory complexity, not retail price or build time directly.</p>
<h2 id="how-the-pattern-changed-over-time" class="anchored">How part counts changed over time</h2>
<h3 id="how-the-pattern-changed-over-time-look" class="anchored">Median Num parts Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/lego-database/charts/chart1_trend.png" role="img" aria-label="Median Num parts Over Time"></div>
</figure>
<p class="art-p">Median part counts fall from about <strong>142</strong> in the opening period of the series to about <strong>59.5</strong> at the close. That does not mean LEGO abandoned complexity — it means the typical catalog entry became smaller even as a new class of ultra-large display sets appeared at the extreme.</p>
<p class="art-p">A falling median beside a rising ceiling is a classic catalog split: more small sets for everyday buyers, and a thinner tier of destination builds for adults and collectors.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">World Map leads at 11,695 — 5,792 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/lego-database/charts/chart2_leaders.png" role="img" aria-label="World Map leads at 11,695 — 5,792 marks the median among the top dozen"></div>
</figure>
<p class="art-p"><strong>World Map</strong> leads at <strong>11,695</strong> parts. The median among the top dozen is <strong>5,792</strong> — still orders of magnitude above the file-wide median near 34. Names such as NINJAGO City, Hogwarts Express Collectors' Edition, stadium sets, Taj Mahal, Colosseum, and Titanic populate the same high-complexity band in related leader cuts.</p>
<p class="art-p">These are not children's starter boxes. They are furniture-scale plastic architecture sold under a toy brand — and the part counts make that product shift quantitative.</p>
<h2 id="how-the-field-is-spread" class="anchored">How the field is spread</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Num parts Distribution</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/lego-database/charts/chart3_distribution.png" role="img" aria-label="Num parts Distribution"></div>
</figure>
<p class="art-p">The distribution is sharply right-skewed: median about <strong>34</strong> versus mean about <strong>161</strong>. The top decile begins near <strong>432</strong> parts. Most sets are modest; a long right tail carries the Instagram-era display pieces.</p>
<p class="art-p">Anyone quoting the mean as the typical LEGO set is describing a more complex object than most boxes on the shelf. The median is the honest center; the tail is the brand's adult collector strategy made visible.</p>
<h2 id="leader-trends" class="anchored">Leader trends</h2>
<h3 id="leader-trends-look" class="anchored">Top Name Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/lego-database/charts/chart4_leader_trends.png" role="img" aria-label="Top Name Over Time"></div>
</figure>
<p class="art-p">The leading names do not move in lockstep. Some franchise icons fade as others surge; licensed themes and modular city sets take turns occupying the complexity frontier.</p>
<p class="art-p">Tracking leaders over time separates sustained flagship lines from one-off mosaic promotions. Both matter commercially; only the sustained lines reshape what LEGO means as a cultural object year after year.</p>
<h2 id="what-moves-together" class="anchored">Parts and quantity</h2>
<h3 id="what-moves-together-look" class="anchored">Num parts vs Quantity</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/lego-database/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/lego-database/charts/chart5_scatter.png" role="img" aria-label="Num parts vs Quantity"></div>
</figure>
<p class="art-p">Plotting number of parts against quantity fields shows clusters that averages erase. Some rows describe unique large sets; others describe common small parts used in volume across many builds.</p>
<p class="art-p">The scatter is a reminder that the database mixes set-level and parts-level grains depending on the joined table. Complexity at the box level and repetition at the brick level are related industrial facts, not the same metric.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and release coverage limits apply. Part counts are not prices, and set names can recur across regions or reissues.</p>
<p class="art-p">Findings describe structural signals about LEGO catalog complexity — not a full financial history of the company or a ranking of which sets are best to build.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">LEGO's catalog is two products sharing one logo: a dense middle of small sets around a few dozen parts, and a thin upper tier of multi-thousand-piece display builds that redefine the brand's adult market.</p>
<p class="art-p">The citable tension is the falling median beside the extreme ceiling. Everyday LEGO got smaller in the typical case even as the largest boxes became architectural.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
