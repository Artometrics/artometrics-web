---
title: How Human Life Expectancy Doubled in Five Centuries
slug: global-life-expectancy
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Survival data from the 1500s to 2015 map who gained years of life—and who
  lagged.
heroImage: /images/content/articles/global-life-expectancy/hero.png
tags:
  - culture
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p class="art-p">Life expectancy is the most consequential number in public health. It encodes everything: nutrition, sanitation, medical access, war, famine, and the basic will of a society to keep its people alive. The dataset in this report stretches from 1543 to 2015 — 17,894 country-year observations drawn from the Our World in Data archive via TidyTuesday. No other single metric captures this much human history in this few columns.</p>
<p class="art-p">The headline number is staggering: the global median life expectancy nearly triples over five centuries, rising from around 30 to above 73. But the aggregate trend conceals the most important story — the persistent, structural gap between the long-lived and the short-lived. The countries leading this dataset in 2015 live more than twice as long, on average, as the laggards in the same file. That gap is closing, but not fast enough to erase within any single generation.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">73.3</span><span class="fact-label">Median life expectancy in 2015 — the closing year of the dataset</span></div>
  <div class="fact-box"><span class="fact-number">83.8</span><span class="fact-label">Highest single observation — Hong Kong near peak</span></div>
  <div class="fact-box"><span class="fact-number">33.9→73</span><span class="fact-label">Median lifespan: opening year to closing year</span></div>
  <div class="fact-box"><span class="fact-number">Hong Kong</span><span class="fact-label">Highest average life expectancy over the full dataset</span></div>
  <div class="fact-box"><span class="fact-number">472 yrs</span><span class="fact-label">Total span of the dataset: 1543 to 2015</span></div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>For most of recorded history, life expectancy at birth hovered between 25 and 40 years — not because people aged quickly, but because childhood mortality was catastrophic. A child born in 17th-century England had roughly a one-in-three chance of dying before age five. The adults who survived to 40 could often expect another 20–25 years, but so few survived childhood that the average plummeted.</p>
<p>The modern transformation begins in earnest around 1850 with clean water infrastructure, followed by the germ theory of disease, vaccines, and antibiotics in the 20th century. Each advance lifts the floor — fewer children die — which mechanically raises the average. The post-1950 acceleration in developing countries reflects this compressed version of a process that took wealthy countries a century to complete.</p>
<h2 id="chart-1-trend" class="anchored">500 YEARS OF SURVIVAL</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-life-expectancy/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-life-expectancy/charts/chart1_trend.png" role="img" aria-label="Global median life expectancy from 1543 to 2015"></div>
</figure>
<p class="art-p">The long-run trend has three distinct phases. A slow, stalling climb from 1543 to roughly 1850 — progress exists but is fragile and frequently reversed by plague and famine. A sharper acceleration from 1850 to 1950, driven by sanitation and early public health. Then a steep post-1950 surge that reflects both medical breakthroughs and their diffusion into the developing world.</p>
<p class="art-p">Notice what does not happen: the curve does not plateau after 2000. Life expectancy continues rising even in the final years of the dataset. The question is not whether this will continue, but at what rate and for whom.</p>
<h2 id="chart-2-leaders" class="anchored">WHO LIVES LONGEST</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-life-expectancy/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-life-expectancy/charts/chart2_leaders.png" role="img" aria-label="Top 12 countries by average life expectancy across all years"></div>
</figure>
<p class="art-p"><strong>Hong Kong</strong> leads at a <strong>75.6</strong> year average across the full dataset. The top dozen countries form a recognizable cluster: East Asian economies (Hong Kong, Japan, Singapore), Scandinavian welfare states (Iceland, Sweden, Norway), and a handful of other high-income, low-violence nations. What they share is not wealth alone — Iceland has never been rich by GDP standards — but strong public health infrastructure and social cohesion.</p>
<p class="art-p">The gap between first (75.6) and twelfth (~73.5) is narrow. The gap between twelfth and the global median (62.4) is enormous. This is a leaders chart that reveals how thin the frontier really is — and how far back the midfield sits.</p>
<h2 id="chart-3-distribution" class="anchored">THE SPLIT WORLD</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-life-expectancy/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-life-expectancy/charts/chart3_distribution.png" role="img" aria-label="Distribution of life expectancy across all country-year observations"></div>
</figure>
<p class="art-p">The distribution tells the most uncomfortable story in this dataset. It is <strong>bimodal</strong> — two peaks, not one. One cluster sits around 35–45 years (historical pre-modern observations); another sits around 65–75 years (contemporary high-income nations). The dataset spans centuries, so these two worlds coexist in the same histogram.</p>
<p class="art-p">The median (62.4) and mean (60.0) converge near the valley between the two peaks — which means the "average" life expectancy lands precisely where few actual observations cluster. Summary statistics here actively mislead. The story is the bimodality: two eras of human survival living in the same file.</p>
<h2 id="chart-4-leader-trends" class="anchored">THE FRONTRUNNERS</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-life-expectancy/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-life-expectancy/charts/chart4_leader_trends.png" role="img" aria-label="Life expectancy trajectories for the top-ranked countries over time"></div>
</figure>
<p class="art-p">The frontrunner countries do not rise together at the same rate. Japan's trajectory is one of the most striking: relatively ordinary through the 1950s, then an explosive acceleration from the 1960s onward driven by universal healthcare, dietary changes, and low rates of smoking. Hong Kong mirrors this but enters the top tier even earlier through its role as a trade hub with relatively strong urban public health.</p>
<p class="art-p">Iceland and Sweden present a different profile — high from the earliest modern data, climbing steadily rather than surging. Their longevity is structural, rooted in centuries of low-density population, clean water, and eventually one of the world's earliest welfare systems.</p>
<h2 id="chart-pareto" class="anchored">SUPPLEMENT — WHERE LONGEVITY CONCENTRATES</h2>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/global-life-expectancy/charts/chart_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/global-life-expectancy/charts/chart_pareto.png" role="img" aria-label="Cumulative share of total life-years by country rank"></div>
</figure>
<p class="art-p">The Pareto curve for life expectancy is shallower than you might expect from a deeply unequal dataset. The top 5 countries account for roughly <strong>34%</strong> of aggregate life-years — significant concentration, but not the extreme 80/20 rule you see in wealth distributions.</p>
<p class="art-p">What the curve reveals is that longevity, unlike wealth, has a hard ceiling. You cannot live 500 years regardless of how rich or healthy you are. This structural cap means the distribution cannot compress into a few extreme outliers the way financial distributions can. Progress in the long-lived countries has slowing returns; the biggest gains remaining are at the bottom of the distribution, not the top.</p>
<h2 id="limitations" class="anchored">Caveats</h2>
<p>Historical life expectancy estimates — particularly before 1800 — carry substantial uncertainty. They are reconstructed from fragmentary parish records, census data, and skeletal analysis, not modern vital statistics. Country boundaries also change: "England" in 1600 is not the same geographic or political entity as "United Kingdom" in 2015.</p>
<p>The dataset covers countries selectively: some regions (especially sub-Saharan Africa and Central Asia) have sparse pre-20th-century coverage, which means the global median in early centuries may overstate life expectancy in poorly-documented regions. The 2015 endpoint predates the COVID-19 pandemic, which temporarily reversed life expectancy gains in many countries — a stark reminder that the trend line is not guaranteed.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>The most important fact in 472 years of life expectancy data is this: the trend is real. Humans have reliably extended their average lifespan by roughly one year per decade across the modern era. No other improvement in human welfare is this consistent or this universal.</p>
<p>The second most important fact is the gap. The countries at the top of this distribution live more than twice as long as the countries at the bottom. That gap is narrowing — but slowly, unevenly, and with frequent reversals. Global health progress is not a smooth ramp; it is a series of hard-won increments, each one dependent on political will, infrastructure investment, and the absence of war and famine. The data shows where we have been. What happens next is a choice.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>Data Science Learning Community. (2018). <em>TidyTuesday: Global Life Expectancy</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-07-03/week14_global_life_expectancy.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-07-03/week14_global_life_expectancy.csv</a></p>
<p>Roser, M., Ortiz-Ospina, E., &amp; Ritchie, H. (2019). <em>Life Expectancy</em>. Our World in Data. <a href="https://ourworldindata.org/life-expectancy" target="_blank" rel="noopener noreferrer">ourworldindata.org/life-expectancy</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p>This report covers the full historical arc of the dataset, from 1543 to 2015. The bimodal distribution (Chart 3) is an artifact of combining pre-modern and modern observations in a single histogram — not a data error. Each observation represents one country in one year.</p><p><em>All median calculations exclude missing values. Pre-1850 data is treated as available but interpreted cautiously given reconstruction uncertainty in historical vital statistics.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2018/2018-07-03" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>
</main>
</div>
