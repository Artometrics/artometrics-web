---
title: How Population Scale Relates to Prosperity Across Countries
slug: cia-world-factbook
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Factbook indicators compare nations on size and wealth—where scale and
  prosperity align or diverge.
heroImage: /images/content/articles/cia-world-factbook/hero.png
tags:
  - business
draft: false
tldr: >-
  Factbook indicators compare nations on size and wealth—where scale and
  prosperity align or diverge.
keyPoints:
  - 259 — Records in the working dataset
  - '5,220,371 — Median Population'
  - '1,355,692,576 — Highest observed Population'
  - China — Top Country by Population
faq:
  - question: What does “A Handful of Giants Dominate Headcount” show?
    answer: 259 — Records in the working dataset
  - question: What does “Even the Top Dozen Has a Steep Internal Drop” show?
    answer: '5,220,371 — Median Population'
  - question: What does “Most Countries Sit in the Small-Population Mass” show?
    answer: '1,355,692,576 — Highest observed Population'
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Population is the blunt instrument of international comparison: China and India alone redraw every map. The TidyTuesday CIA World Factbook extract used here holds <strong>259</strong> records with a median population of <strong>5,220,371</strong> and a maximum of <strong>1,355,692,576</strong> for China.</p>
<p class="art-p">Mean population in the distribution annotation (~32 million) sits far above the median — the classic right skew of a world with a few demographic giants and a long list of small states.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p"></p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">259</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">5,220,371</span><span class="fact-label">Median Population</span></div>
  <div class="fact-box"><span class="fact-number">1,355,692,576</span><span class="fact-label">Highest observed Population</span></div>
  <div class="fact-box"><span class="fact-number">China</span><span class="fact-label">Top Country by Population</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2024-10-22 (cia_factbook.csv). After cleaning, 259 rows remain.</p>
<p class="art-p">Population is the primary ranked metric; birth rate appears in the joint scatter. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="a-handful-of-giants-dominate-headcount" class="anchored">A Handful of Giants Dominate Headcount</h2>
<h3 id="a-handful-of-giants-dominate-headcount-look" class="anchored">Population by Country</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cia-world-factbook/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cia-world-factbook/charts/chart1_breakdown.png" role="img" aria-label="Population by Country"></div>
</figure>
<p class="art-p">China leads at about <strong>1.36 billion</strong>, India at about <strong>1.24 billion</strong>, then the European Union aggregate near <strong>511 million</strong>, the United States near <strong>319 million</strong>, Indonesia near <strong>254 million</strong>, and Brazil near <strong>203 million</strong>.</p>
<p class="art-p">These are not peers of the median country at 5.2 million. They are a different scale class — and they drive every concentration statistic that follows.</p>

<h2 id="even-the-top-dozen-has-a-steep-internal-drop" class="anchored">Even the Top Dozen Has a Steep Internal Drop</h2>
<h3 id="even-the-top-dozen-has-a-steep-internal-drop-look" class="anchored">China leads at 1,355,692,576 — 199,415,584 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cia-world-factbook/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cia-world-factbook/charts/chart2_leaders.png" role="img" aria-label="China leads at 1,355,692,576 — 199,415,584 marks the median among the top dozen"></div>
</figure>
<p class="art-p">China still leads at <strong>1,355,692,576</strong>, while the median among the top dozen is about <strong>199,415,584</strong> — less than one-sixth of China’s count.</p>
<p class="art-p">“Large country” is a pyramid, not a plateau. Second-tier giants are already far smaller than the demographic summit.</p>

<h2 id="most-countries-sit-in-the-small-population-mass" class="anchored">Most Countries Sit in the Small-Population Mass</h2>
<h3 id="most-countries-sit-in-the-small-population-mass-look" class="anchored">Median 5,220,371 vs mean 32,294,361 — the shape is right-skewed</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cia-world-factbook/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cia-world-factbook/charts/chart3_distribution.png" role="img" aria-label="Median 5,220,371 vs mean 32,294,361 — the shape is right-skewed"></div>
</figure>
<p class="art-p">The histogram’s first bin holds the overwhelming majority of entries (about <strong>218</strong> of them), with only a handful of observations in the billionaire and near-billionaire bins.</p>
<p class="art-p">That shape is why the median (5.2 million) is the honest typical-country number, and why the mean (~32 million) is pulled relentlessly upward.</p>

<h2 id="the-top-five-already-hold-most-of-the-people" class="anchored">The Top Five Already Hold Most of the People</h2>
<h3 id="the-top-five-already-hold-most-of-the-people-look" class="anchored">The top 5 country entries account for 72% of the aggregate population</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cia-world-factbook/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cia-world-factbook/charts/chart4_pareto.png" role="img" aria-label="The top 5 country entries account for 72% of the aggregate population"></div>
</figure>
<p class="art-p">The Pareto curve shows the top five country entries accounting for about <strong>72%</strong> of aggregate population in this ranking view. By fifteen entries the curve approaches the full plotted total.</p>
<p class="art-p">Global population is not evenly distributed across flags. It is concentrated in a short list of demographic powers.</p>

<h2 id="high-birth-rates-cluster-among-smaller-populations" class="anchored">High Birth Rates Cluster Among Smaller Populations</h2>
<h3 id="high-birth-rates-cluster-among-smaller-populations-look" class="anchored">Population vs Birth rate</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cia-world-factbook/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cia-world-factbook/charts/chart5_scatter.png" role="img" aria-label="Population vs Birth rate"></div>
</figure>
<p class="art-p">Population versus birth rate places some of the highest birth rates (above ~40 per 1,000) among countries well below the mega-population tier, while several large countries sit at lower birth rates.</p>
<p class="art-p">The joint distribution warns against assuming that demographic giants are also fertility leaders. Scale and birth rate are different stories in the Factbook.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Factbook figures are estimates with uneven vintage and methodology across entities. Including the European Union alongside countries double-counts if users sum naively. Small territories and disputed entities add definitional noise.</p>
<p class="art-p">Population totals are not prosperity scores. Pairing with birth rate is descriptive, not a development ranking.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">In 259 Factbook rows, the median country has about 5.2 million people while China exceeds 1.35 billion. The top five entries hold roughly 72% of the aggregate in the concentration view.</p>
<p class="art-p">Cite the median for a typical state; cite China/India and the Pareto share when the question is planetary concentration.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2024). <em>TidyTuesday: CIA World Factbook</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-10-22/cia_factbook.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2024/2024-10-22/cia_factbook.csv</a></p>
</main>
</div>
