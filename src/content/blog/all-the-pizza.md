---
title: What Does a Slice of Pizza Really Cost?
slug: all-the-pizza
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  Price and calorie data across pizza menus show what diners pay in money and
  energy.
heroImage: /images/content/articles/all-the-pizza/hero.png
tags:
  - culture
draft: false
tldr: >-
  Pizza prices look simple until you try to compare 10,000 menu rows. The
  Datafiniti pizza extract in TidyTuesday does exactly that: restaurant-level
  records with price-range fields that reveal how “a slice” and “a specialty
  pie” live in different economic brackets. The working file holds 10,000 rows.
keyPoints:
  - '10,000 — Records in the working dataset'
  - 0.00 — Median Price range min
  - 50.0 — Highest observed Price range min
  - Oregano — Top Name by Price range min
faq:
  - question: >-
      What does the data show about Price Floors Separate Everyday Shops From
      Destination Pies?
    answer: >-
      Key figure: 10,000 — Records in the working dataset. The source is the
      TidyTuesday release from 2019-10-01 (pizza_datafiniti.csv). After
      cleaning, the analysis frame used here contains 10,000 records.
  - question: What does the data show about The Top Dozen Is a Premium Plateau?
    answer: >-
      Key figure: 0.00 — Median Price range min. The source is the TidyTuesday
      release from 2019-10-01 (pizza_datafiniti.csv). After cleaning, the
      analysis frame used here contains 10,000 records.
  - question: What does the data show about Almost Everything Sits in the Low Bins?
    answer: >-
      Key figure: 50.0 — Highest observed Price range min. The source is the
      TidyTuesday release from 2019-10-01 (pizza_datafiniti.csv). After
      cleaning, the analysis frame used here contains 10,000 records.
  - question: What does the data show about Premium Names Concentrate Quickly?
    answer: >-
      Key figure: Oregano — Top Name by Price range min. The source is the
      TidyTuesday release from 2019-10-01 (pizza_datafiniti.csv). After
      cleaning, the analysis frame used here contains 10,000 records.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Pizza prices look simple until you try to compare 10,000 menu rows. The Datafiniti pizza extract in TidyTuesday does exactly that: restaurant-level records with price-range fields that reveal how “a slice” and “a specialty pie” live in different economic brackets. The working file holds <strong>10,000</strong> rows.</p>
<p class="art-p">The median price-range minimum is <strong>0.00</strong> — a signal that many listings encode missing or zeroed floors rather than free pizza. The highest observed price-range minimum is <strong>50.0</strong>, shared at the top by names such as Oregano and Crust Stone Oven Pizza. That ceiling is where tasting-menu and destination pizzerias sit.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">10,000</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">0.00</span><span class="fact-label">Median Price range min</span></div>
  <div class="fact-box"><span class="fact-number">50.0</span><span class="fact-label">Highest observed Price range min</span></div>
  <div class="fact-box"><span class="fact-number">Oregano</span><span class="fact-label">Top Name by Price range min</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-10-01 (pizza_datafiniti.csv). After cleaning, the analysis frame used here contains 10,000 records.</p>
<p class="art-p">Price range minimum is the ranked metric across the chart stack. Medians are used because the distribution is heavily piled at low values. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="price-floors-separate-everyday-shops-from-destination-pies" class="anchored">Price Floors Separate Everyday Shops From Destination Pies</h2>
<h3 id="price-floors-separate-everyday-shops-from-destination-pies-look" class="anchored">Price range min by Name</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/all-the-pizza/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/all-the-pizza/charts/chart1_breakdown.png" role="img" aria-label="Price range min by Name"></div>
</figure>
<p class="art-p">At the top of the price-range-minimum ranking, Oregano and Crust Stone Oven Pizza both hit <strong>50.0</strong>. Just below, a cluster of shops — Papa’s Pizza, Apizza Scholls, Barbaro, La Montanara, Spin, Dough Pizzeria Napoletana — sits at <strong>40.0</strong>.</p>
<p class="art-p">Those are not typical delivery-store floors. They mark the upper edge of how this dataset encodes premium positioning. Most of the 10,000-row catalog never approaches that band.</p>

<h2 id="the-top-dozen-is-a-premium-plateau" class="anchored">The Top Dozen Is a Premium Plateau</h2>
<h3 id="the-top-dozen-is-a-premium-plateau-look" class="anchored">Crust Stone Oven Pizza leads at 50.0 — 40.0 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/all-the-pizza/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/all-the-pizza/charts/chart2_leaders.png" role="img" aria-label="Crust Stone Oven Pizza leads at 50.0 — 40.0 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Crust Stone Oven Pizza appears among the leaders at <strong>50.0</strong>, and the median among the top dozen is <strong>40.0</strong>. Inside the expensive club, the story is less about a single outlier than about a shared premium floor.</p>
<p class="art-p">That plateau is useful for citation: when someone asks what “expensive pizza” looks like in this file, the answer is a top-dozen median of 40 — not the global median of 0.</p>

<h2 id="almost-everything-sits-in-the-low-bins" class="anchored">Almost Everything Sits in the Low Bins</h2>
<h3 id="almost-everything-sits-in-the-low-bins-look" class="anchored">Price range min Distribution</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/all-the-pizza/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/all-the-pizza/charts/chart3_distribution.png" role="img" aria-label="Price range min Distribution"></div>
</figure>
<p class="art-p">The distribution is extreme. Roughly <strong>8,167</strong> rows fall near the lowest price-range-minimum bin, with about <strong>1,801</strong> in the next populated band. Only a few dozen observations occupy the high bins near 40–50.</p>
<p class="art-p">That is why the median of 0.00 is both technically correct and narratively incomplete. The mass of the market is cheap or zero-coded; the interesting cultural story lives in the thin right tail.</p>

<h2 id="premium-names-concentrate-quickly" class="anchored">Premium Names Concentrate Quickly</h2>
<h3 id="premium-names-concentrate-quickly-look" class="anchored">Cumulative Price range min</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/all-the-pizza/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/all-the-pizza/charts/chart4_pareto.png" role="img" aria-label="Cumulative Price range min"></div>
</figure>
<p class="art-p">The Pareto view of price-range minimum among leading names climbs steeply: the first five entries already hold roughly <strong>43%</strong> of the plotted aggregate, and the curve reaches the full total by the fifteenth name.</p>
<p class="art-p">Concentration here is not about volume of pizzas sold — the file is not a sales ledger — but about how the high price-floor labels cluster among a short list of restaurant names.</p>

<h2 id="minimum-and-maximum-ranges-move-together-until-they-don-t" class="anchored">Minimum and Maximum Ranges Move Together — Until They Don’t</h2>
<h3 id="minimum-and-maximum-ranges-move-together-until-they-don-t-look" class="anchored">Price range min vs Price range max</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/all-the-pizza/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/all-the-pizza/charts/chart5_scatter.png" role="img" aria-label="Price range min vs Price range max"></div>
</figure>
<p class="art-p">Scatter points of price-range minimum against price-range maximum show the expected diagonal: shops with higher floors also tend to list higher ceilings, with some pairs reaching from 40 up toward 55.</p>
<p class="art-p">The interesting cases are the mismatches — low floors with wide ceilings, or compressed ranges that signal a single-price menu. Those joints are where “pizza” stops being one product and becomes a price architecture.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Datafiniti restaurant scrapes are not audited menus. Zero price-range values may mean missing data rather than free food. Name collisions and chain-vs-independent ambiguity remain.</p>
<p class="art-p">The extract cannot speak to ingredient costs, tip culture, or city-level rent. It measures listed price-range fields in a 2019 community snapshot.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">In 10,000 pizza rows, the market’s mass sits at a median price-range minimum of 0.00, while a thin premium tier reaches 50.0.</p>
<p class="art-p">Cite the top-dozen median of 40 when the question is about destination pizza; cite the global median when the question is about the typical listing. They describe different economies.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2019). <em>TidyTuesday: All The Pizza</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-10-01/pizza_datafiniti.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-10-01/pizza_datafiniti.csv</a></p>
</main>
</div>
