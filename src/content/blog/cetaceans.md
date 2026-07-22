---
title: How Whale and Dolphin Sizes Cluster by Family
slug: cetaceans
pubDate: 2026-06-15T00:00:00.000Z
description: Morphometric data map which cetacean lineages produce the giants.
heroImage: /images/content/articles/cetaceans/hero.png
tags:
  - culture
draft: false
tldr: >-
  Captive and transferred cetaceans leave paper trails: species names, years,
  and transfer geographies. The TidyTuesday cetacean extract used here holds
  2,194 records spanning 1946–2017 , with the United States labeled as the
  dominant transfer geography. Bottlenose animals dominate the name counts.
keyPoints:
  - '2,194 — Records in the working dataset'
  - 1946–2017 — Year span covered in the file
  - US — Most common Transfer
faq:
  - question: >-
      What does the data show about Transfers Concentrate Overwhelmingly in the
      US?
    answer: >-
      Key figure: 2,194 — Records in the working dataset. The source is the
      TidyTuesday release from 2018-12-18 (allCetaceanData.csv). After cleaning,
      2,194 rows remain.
  - question: What does the data show about Annual Volume Peaked in the Early 1970s?
    answer: >-
      Key figure: 1946–2017 — Year span covered in the file. The source is the
      TidyTuesday release from 2018-12-18 (allCetaceanData.csv). After cleaning,
      2,194 rows remain.
  - question: What does the data show about Bottlenose Is the Archive’s Default Animal?
    answer: >-
      Key figure: US — Most common Transfer. The source is the TidyTuesday
      release from 2018-12-18 (allCetaceanData.csv). After cleaning, 2,194 rows
      remain.
  - question: What does the data show about The US Bucket Is the Landscape?
    answer: >-
      The source is the TidyTuesday release from 2018-12-18
      (allCetaceanData.csv). After cleaning, 2,194 rows remain.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Captive and transferred cetaceans leave paper trails: species names, years, and transfer geographies. The TidyTuesday cetacean extract used here holds <strong>2,194</strong> records spanning <strong>1946–2017</strong>, with the United States labeled as the dominant transfer geography.</p>
<p class="art-p">Bottlenose animals dominate the name counts. That single species weight shapes every timeline and leader chart that follows — this archive is mostly a bottlenose history with rarer orcas, belugas, and white-sided dolphins in the margins.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">2,194</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">1946–2017</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">US</span><span class="fact-label">Most common Transfer</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-12-18 (allCetaceanData.csv). After cleaning, 2,194 rows remain.</p>
<p class="art-p">Charts emphasize transfer geography, annual volume, species leaders, and timelines for the most frequent names. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="transfers-concentrate-overwhelmingly-in-the-us" class="anchored">Transfers Concentrate Overwhelmingly in the US</h2>
<h3 id="transfers-concentrate-overwhelmingly-in-the-us-look" class="anchored">US dominates with 2,172 records</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cetaceans/charts/chart1_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cetaceans/charts/chart1_category.png" role="img" aria-label="US dominates with 2,172 records"></div>
</figure>
<p class="art-p">US-labeled transfers account for <strong>2,172</strong> records versus only <strong>22</strong> marked Foreign in this view. The geography of the file is not a balanced global map; it is a U.S.-centric captivity and transfer ledger.</p>
<p class="art-p">Any species comparison inherits that bias. What looks like a biological pattern may partly be a reporting and institutional geography pattern.</p>

<h2 id="annual-volume-peaked-in-the-early-1970s" class="anchored">Annual Volume Peaked in the Early 1970s</h2>
<h3 id="annual-volume-peaked-in-the-early-1970s-look" class="anchored">Records By Period</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cetaceans/charts/chart1_volume.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cetaceans/charts/chart1_volume.png" role="img" aria-label="Records By Period"></div>
</figure>
<p class="art-p">Record counts by year crest around <strong>1972</strong> with about <strong>170</strong> entries, with other high years in the late 1970s and 1980s (1978 ~90, 1977 ~80, 1980 ~79). Later decades thin out toward single-digit years by the 2010s in this extract.</p>
<p class="art-p">The volume timeline is an institutional history as much as a zoological one: when transfers were logged most densely, and when the paper trail quieted.</p>

<h2 id="bottlenose-is-the-archive-s-default-animal" class="anchored">Bottlenose Is the Archive’s Default Animal</h2>
<h3 id="bottlenose-is-the-archive-s-default-animal-look" class="anchored">Bottlenose appears 1,668 times — the most recurring name in the file</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cetaceans/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cetaceans/charts/chart2_leaders.png" role="img" aria-label="Bottlenose appears 1,668 times — the most recurring name in the file"></div>
</figure>
<p class="art-p">Bottlenose appears <strong>1,668</strong> times — an order of magnitude above Killer Whale/Orca (<strong>79</strong>), Beluga (<strong>68</strong>), and Pacific white-sided variants (combined labels in the several dozens).</p>
<p class="art-p">Cite 1,668 when describing species concentration. Without bottlenose, this would be a small file; with it, every other name is a minority subplot.</p>

<h2 id="the-us-bucket-is-the-landscape" class="anchored">The US Bucket Is the Landscape</h2>
<h3 id="the-us-bucket-is-the-landscape-look" class="anchored">US is the largest bucket with 2,172 records</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cetaceans/charts/chart3_category.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cetaceans/charts/chart3_category.png" role="img" aria-label="US is the largest bucket with 2,172 records"></div>
</figure>
<p class="art-p">Restating the geography: US <strong>2,172</strong> versus Foreign <strong>22</strong>. The category chart is almost a single bar.</p>
<p class="art-p">Comparative claims about “global captivity” cannot be read straight off this extract without external sources that rebalance non-U.S. institutions.</p>

<h2 id="species-timelines-follow-different-eras" class="anchored">Species Timelines Follow Different Eras</h2>
<h3 id="species-timelines-follow-different-eras-look" class="anchored">Leaders Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/cetaceans/charts/chart4_timeline.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/cetaceans/charts/chart4_timeline.png" role="img" aria-label="Leaders Over Time"></div>
</figure>
<p class="art-p">Bottlenose transfers spike with the early-1970s volume peak (about <strong>144</strong> in 1972). Orca records show smaller pulses across the late 1960s–1980s. Beluga counts rise in scattered later years. White-sided labels show notable 1970s–1980 activity.</p>
<p class="art-p">The timelines refuse a single captivity narrative. Different species enter the ledger on different clocks — and bottlenose sets the tempo.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">U.S. overrepresentation may reflect data compilation, not the true global distribution of captive cetaceans. Species name variants (Beluga vs Beluga Whale; multiple white-sided spellings) fragment counts.</p>
<p class="art-p">The file does not measure welfare outcomes, wild population status, or legal regime changes except insofar as they change what got recorded.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Across 2,194 rows, the story is concentration twice over: US geography (2,172) and bottlenose identity (1,668).</p>
<p class="art-p">Cite the 1972 volume peak when discussing historical intensity, and treat non-bottlenose species as sparse but distinct timelines inside a bottlenose-dominated ledger.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2018). <em>TidyTuesday: Cetaceans</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-12-18/allCetaceanData.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2018/2018-12-18/allCetaceanData.csv</a></p>
</main>
</div>
