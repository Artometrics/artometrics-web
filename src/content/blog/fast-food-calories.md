---
title: Which Fast-Food Chains Pack the Most Calories Per Item?
slug: fast-food-calories
pubDate: 2026-06-15T00:00:00.000Z
description: Menu nutrition data identify the highest-calorie items across major chains.
heroImage: /images/content/articles/fast-food-calories/hero.png
draft: false
tags:
  - culture
  - food
tldr: >-
  Fast-food menus are marketing documents dressed as nutrition tables. The
  calorie counts attached to each item are among the few numbers that cut
  through the branding — and they vary wildly across chains that sell roughly
  the same categories of food. A TidyTuesday snapshot of major U.S. chain menus
  puts 515 item records on the same footing. The median item sits at 490
  calories.
keyPoints:
  - 515 — Records in the working dataset
  - 490 — Median Calories
  - '2,430 — Highest observed Calories'
  - 20 piece Buttermilk Crispy C — Top Item by Calories
  - Taco Bell — Most common Restaurant
faq:
  - question: What does the data show about Calorie ceilings by item?
    answer: >-
      Key figure: 515 — Records in the working dataset. Taco Bell appears most
      often in the working table, but frequency of listing is not the same as
      caloric intensity. The story is which items and which chains sit above the
      center of…
  - question: Who sits at the top?
    answer: >-
      Key figure: 490 — Median Calories. Taco Bell appears most often in the
      working table, but frequency of listing is not the same as caloric
      intensity. The story is which items and which chains sit above the center
      of…
  - question: How chains spread calories?
    answer: >-
      Key figure: 2,430 — Highest observed Calories. Taco Bell appears most
      often in the working table, but frequency of listing is not the same as
      caloric intensity. The story is which items and which chains sit above the
      center of…
  - question: Who beats the median — and who trails?
    answer: >-
      Key figure: 20 piece Buttermilk Crispy C — Top Item by Calories. Taco Bell
      appears most often in the working table, but frequency of listing is not
      the same as caloric intensity. The story is which items and which chains
      sit above the center of…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Fast-food menus are marketing documents dressed as nutrition tables. The calorie counts attached to each item are among the few numbers that cut through the branding — and they vary wildly across chains that sell roughly the same categories of food.</p>
<p class="art-p">A TidyTuesday snapshot of major U.S. chain menus puts <strong>515</strong> item records on the same footing. The median item sits at <strong>490</strong> calories. The ceiling in the file is <strong>2,430</strong> — a twenty-piece buttermilk crispy chicken tender tray that makes the median look almost restrained.</p>
<p class="art-p">Taco Bell appears most often in the working table, but frequency of listing is not the same as caloric intensity. The story is which items and which chains sit above the center of the menu, and how fat tracks with calories when the branding falls away.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">515</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">490</span><span class="fact-label">Median Calories</span></div>
  <div class="fact-box"><span class="fact-number">2,430</span><span class="fact-label">Highest observed Calories</span></div>
  <div class="fact-box"><span class="fact-number">20 piece Buttermilk Crispy C</span><span class="fact-label">Top Item by Calories</span></div>
  <div class="fact-box"><span class="fact-number">Taco Bell</span><span class="fact-label">Most common Restaurant</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2018-09-04, maintained by the R for Data Science community. The working file contains 515 rows and 17 columns after merging the available CSV tables in the week folder — restaurant name, item, calories, total fat, and related nutrition fields.</p>
<p class="art-p">Medians are preferred where distributions skew. Index-style fields and sequential IDs are excluded from metric selection. Charts ship as Plotly JSON with PNG fallbacks. The snapshot is a menu catalog for a fixed release window, not a live API of every current offering.</p>
<h2 id="breakdown" class="anchored">Calorie ceilings by item</h2>
<h3 id="breakdown-look" class="anchored">Calories by Item</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/fast-food-calories/charts/chart1_breakdown.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/fast-food-calories/charts/chart1_breakdown.png" role="img" aria-label="Calories by Item"></div>
</figure>
<p class="art-p">At the top of the item ranking, the <strong>20 piece Buttermilk Crispy Chicken Tenders</strong> lead at <strong>2,430</strong> calories. Related tender trays populate much of the upper tier: the 12-piece sits near <strong>1,510</strong>, while the 10-piece anchors a lower rung around <strong>1,210</strong>.</p>
<p class="art-p">What looks like a single chicken category is really a portion machine. Doubling the piece count nearly doubles the calorie load. Burger King and Sonic doubles — Farmhouse King, Rodeo King, Super Sonic doubles — fill the same high band for a different reason: stacked patties, sauces, and bun mass rather than tray size.</p>
<h2 id="who-sits-at-the-top" class="anchored">Who sits at the top</h2>
<h3 id="who-sits-at-the-top-look" class="anchored">20 piece Buttermilk Crispy Chicken Tenders leads at 2,430 — 1,315 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/fast-food-calories/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/fast-food-calories/charts/chart2_leaders.png" role="img" aria-label="20 piece Buttermilk Crispy Chicken Tenders leads at 2,430 — 1,315 marks the median among the top dozen"></div>
</figure>
<p class="art-p">Among the top dozen calorie items, the median is <strong>1,315</strong>. That is more than two and a half times the dataset-wide median of 490. The head of the menu is not a gentle slope — it is a separate altitude.</p>
<p class="art-p">Shareable trays and king-style sandwiches dominate the list. The implication for comparison is simple: chain averages without portion context will mis-rank brands that sell both modest sandwiches and extreme trays under the same logo.</p>
<h2 id="how-the-field-is-spread" class="anchored">How chains spread calories</h2>
<h3 id="how-the-field-is-spread-look" class="anchored">Calories by Restaurant</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/fast-food-calories/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/fast-food-calories/charts/chart3_distribution.png" role="img" aria-label="Calories by Restaurant"></div>
</figure>
<p class="art-p">Box plots by restaurant show whether a chain's calorie consensus is shared or contested. Some menus cluster tightly around the middle. Others stretch from light sides to extreme trays, producing wide interquartile ranges that averages erase.</p>
<p class="art-p">Taco Bell's heavy representation in the file does not automatically place it at the caloric peak. Volume of SKUs and intensity of SKUs are different questions — and the distribution chart is where that split becomes visible.</p>
<h2 id="who-beats-the-median-and-who-trails" class="anchored">Who beats the median — and who trails</h2>
<h3 id="who-beats-the-median-and-who-trails-look" class="anchored">Calories vs median by Restaurant</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/fast-food-calories/charts/chart4_gap.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/fast-food-calories/charts/chart4_gap.png" role="img" aria-label="Calories vs median by Restaurant"></div>
</figure>
<p class="art-p">Relative to the dataset median, <strong>Sonic</strong> sits <strong>80</strong> calories above the center. <strong>Chick-fil-A</strong> trails by <strong>100</strong>. Burger King, Arby's, and McDonald's sit on the high side of the gap chart; Subway and Taco Bell sit below.</p>
<p class="art-p">These gaps are menu-composition effects as much as health branding. A chain that lists more grilled items and fewer shareable trays will land below the median even if its signature sandwich is not light. The gap chart ranks catalogs, not single hero products.</p>
<h2 id="what-moves-together" class="anchored">Calories and fat move together</h2>
<h3 id="what-moves-together-look" class="anchored">Calories vs Total fat</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/fast-food-calories/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/fast-food-calories/charts/chart5_scatter.png" role="img" aria-label="Calories vs Total fat"></div>
</figure>
<p class="art-p">Plotting calories against total fat produces the expected positive slope — and the clusters that averages erase. Dense clumps of ordinary sandwiches sit in the middle; the extreme trays and stacked burgers occupy the upper-right corner where both axes spike together.</p>
<p class="art-p">Fat is not a perfect proxy for calories, but in this menu file the two metrics rarely disagree about which items are extreme. When they do separate, it is usually because sugar-heavy drinks or desserts pull calories without matching fat.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live APIs. Missing values, spelling variants, and week-of-export coverage limits apply. Merged tables may fan out or duplicate rows when join keys are imperfect.</p>
<p class="art-p">The file does not measure how often items are ordered, how portions are actually consumed, or how recipes have changed since the 2018 release. Treat the numbers as a structural map of listed menu calories — not a verdict on every current drive-through board.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">The median fast-food item in this catalog sits near 490 calories. The items that define the public argument about fast food often sit two to five times higher — trays and stacked sandwiches that are easy to order and hard to compare without portion context.</p>
<p class="art-p">Chain gaps of eighty to one hundred calories around the median are real, but they are catalog effects. The clearest signal is the ceiling: once shareable chicken trays enter the frame, the conversation about a typical item and the conversation about the heaviest item are no longer the same conversation.</p>
<h2 id="sources" class="anchored">Sources</h2>
</main>
</div>
