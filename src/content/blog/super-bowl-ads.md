---
title: Which Super Bowl Ads Won the Post-Game Internet?
slug: super-bowl-ads
pubDate: 2026-06-15T00:00:00.000Z
description: Ad-spot data track which commercials captured attention after the whistle.
heroImage: /images/content/articles/super-bowl-ads/hero.png
tags:
  - business
draft: false
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">Super Bowl ads do not end when the whistle blows. They migrate to YouTube, where view counts become a second scoreboard. This working file covers 247 ad records spanning 2006–2021, with a median view count of 41,379 and a ceiling of 176,373,378. Doritos is the top brand by view count in the fact boxes; youtube#video is the dominant media kind.</p>
<p class="art-p">The interpretive move is simple: treat post-game streaming attention as its own economy. Broadcast reach buys the first audience. YouTube decides which spots keep circulating years later. The charts track that second life — trend, leaders, kind, concentration, and the link between views and likes.</p>
<h2 id="the-numbers-that-matter" class="anchored">The numbers that matter</h2>
<p class="art-p">A few markers set the scale before the charts.</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">247</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">41,379</span><span class="fact-label">Median View count</span></div>
  <div class="fact-box"><span class="fact-number">176,373,378</span><span class="fact-label">Highest observed View count</span></div>
  <div class="fact-box"><span class="fact-number">Doritos</span><span class="fact-label">Top Brand by View count</span></div>
  <div class="fact-box"><span class="fact-number">2006–2021</span><span class="fact-label">Year span covered in the file</span></div>
  <div class="fact-box"><span class="fact-number">youtube#video</span><span class="fact-label">Most common Kind</span></div>
</div>
<h2 id="where-the-numbers-come-from" class="anchored">Where the numbers come from</h2>
<p class="art-p">The source is the TidyTuesday release from 2021-03-02 (R for Data Science community). The working file contains 247 rows and 26 columns after merging available tables in the week folder. View count is the primary metric; like count appears in the scatter; brand and kind are the main categorical axes.</p>
<p class="art-p">Medians are preferred because ad view counts are extremely skewed — a handful of viral spots dwarf the typical upload. Index-style fields are excluded from metric selection so charts describe attention, not row order.</p>

<h2 id="median-views-fell-as-the-archive-got-denser" class="anchored">Median views fell as the archive got denser</h2>
<h3 id="median-views-fell-as-the-archive-got-denser-look" class="anchored">Median View count Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/super-bowl-ads/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/super-bowl-ads/charts/chart1_trend.png" role="img" aria-label="Median View count Over Time"></div>
</figure>
<p class="art-p">Median view count falls from 111,814 in the opening period to 33,766 at the close. That decline does not prove ads got worse; it often means the file accumulated more ordinary uploads beside the legendary few, pulling the center down while the ceiling stayed enormous.</p>
<p class="art-p">Read the slope against the fact-box ceiling of 176,373,378. A falling median and a stratospheric maximum can coexist when attention is power-law distributed.</p>

<h2 id="nfl-leads-the-brand-ladder-on-youtube-views" class="anchored">NFL leads the brand ladder on YouTube views</h2>
<h3 id="nfl-leads-the-brand-ladder-on-youtube-views-look" class="anchored">NFL leads at 403,641 — 46,661 marks the median among the top dozen</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/super-bowl-ads/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/super-bowl-ads/charts/chart2_leaders.png" role="img" aria-label="NFL leads at 403,641 — 46,661 marks the median among the top dozen"></div>
</figure>
<p class="art-p">On the leaders chart, NFL leads at 403,641 views, while 46,661 marks the median among the top dozen brands. Doritos still owns the fact-box brand crown by the ranking rule used there; the charted leaders emphasize who sits highest in this particular aggregation cut.</p>
<p class="art-p">The gap between the #1 brand and the top-dozen median shows how quickly the ladder drops. A few names own the conversation; most of the competitive set lives closer to tens of thousands than to hundreds of thousands.</p>

<h2 id="almost-everything-in-the-file-is-a-youtube-video" class="anchored">Almost everything in the file is a YouTube video</h2>
<h3 id="almost-everything-in-the-file-is-a-youtube-video-look" class="anchored">View count by Kind</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/super-bowl-ads/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/super-bowl-ads/charts/chart3_distribution.png" role="img" aria-label="View count by Kind"></div>
</figure>
<p class="art-p">Splitting view count by kind produces a near-monoculture: youtube#video is the most common kind and carries the story. Category boxes here are less about contested formats than about confirming the archive’s platform identity.</p>
<p class="art-p">That matters for citation. These are post-game internet lives of Super Bowl ads, not a complete census of every commercial that ever aired in the stadium break.</p>

<h2 id="five-brands-hold-eighty-seven-percent-of-aggregate-views" class="anchored">Five brands hold eighty-seven percent of aggregate views</h2>
<h3 id="five-brands-hold-eighty-seven-percent-of-aggregate-views-look" class="anchored">Cumulative View count</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/super-bowl-ads/charts/chart4_pareto.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/super-bowl-ads/charts/chart4_pareto.png" role="img" aria-label="Cumulative View count"></div>
</figure>
<p class="art-p">The top five brand entries account for 87% of the aggregate view count. That is a steep Pareto: the attention economy after the Super Bowl is not a democracy of slogans. A small head drives most of the summed views.</p>
<p class="art-p">Steep concentration is why brand strategy obsesses over a handful of spots. The long tail exists, but it does not move the aggregate the way the head does.</p>

<h2 id="views-and-likes-travel-together-with-clusters" class="anchored">Views and likes travel together — with clusters</h2>
<h3 id="views-and-likes-travel-together-with-clusters-look" class="anchored">View count vs Like count</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/super-bowl-ads/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/super-bowl-ads/charts/chart5_scatter.png" role="img" aria-label="View count vs Like count"></div>
</figure>
<p class="art-p">Plotting view count against like count shows clusters that a single average erases. Some ads convert attention into likes efficiently; others accumulate views without the same approval signal.</p>
<p class="art-p">The scatter is a relationship map, not a quality score. It shows how the two engagement fields co-move in this 247-row YouTube extract.</p>
<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Community-cleaned TidyTuesday snapshots are not live YouTube APIs. View and like counts are frozen at export; missing values, brand spelling variants, and coverage limits apply. Merged tables may duplicate or fan out rows when keys are imperfect.</p>
<p class="art-p">Findings describe this Super Bowl ads extract — structural signals about post-game attention — not a complete history of every commercial creative or every platform where ads circulated.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Post-game Super Bowl attention is a concentrated market: median views sit at 41,379, the ceiling reaches 176,373,378, and five brands account for 87% of aggregate views.</p>
<p class="art-p">The falling median from 111,814 to 33,766 is the archive filling out; the NFL and Doritos-scale leaders are the archive’s memory. Views and likes move together in clusters, which is how engagement looks when a few spots become folklore and most become inventory.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2021). <em>TidyTuesday: Super Bowl Ads</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-02/youtube.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2021/2021-03-02/youtube.csv</a></p>
<h2 id="editors-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>Artometrics data report from the TidyTuesday research pipeline. Charts and aggregates are reproducible from the embedded exhibits and public source files.</em></p></div>
<p class="art-github-wrap"><a class="art-github-btn" href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2021/2021-03-02" target="_blank" rel="noopener noreferrer">View TidyTuesday source on GitHub</a></p>

</main>
</div>
