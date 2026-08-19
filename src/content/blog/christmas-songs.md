---
title: 'Christmas Music Charts: Which Holiday Songs Never Leave?'
slug: christmas-songs
author: kyle-mcauliffe
pubDate: 2026-06-15T00:00:00.000Z
description: >-
  387 holiday songs tracked 1958–2017 show a median 8-week chart life, with standards like Jingle Bell Rock returning across decades.
heroImage: /images/content/articles/christmas-songs/hero.png
draft: false
tags:
  - arts
  - music
tldr: >-
  Holiday songs return every December, accumulate weeks, then vanish until next season. This dataset of 387 records (1958–2017) shows a median 8 weeks on chart, a maximum of 20 weeks, and perennial standards like Jingle Bell Rock and All I Want for Christmas Is You dominating the top tier.
keyPoints:
  - 387 — Records in dataset spanning 1958–2017
  - 8.00 — Median weeks on chart across all songs
  - 20.0 — Maximum weeks on chart (Better Days and Believe)
  - 17.0 — Median weeks on chart among top dozen songs
  - 1958–2017 — Timespan covered by source data
faq:
  - question: >-
      How many records are in this dataset?
    answer: >-
      The dataset contains 387 records of Christmas songs charted between 1958 and 2017.
  - question: >-
      What is the median weeks on chart?
    answer: >-
      The median weeks on chart across all 387 records is 8 weeks.
  - question: >-
      Which songs have the longest chart life?
    answer: >-
      Better Days and Believe lead with 20 weeks each; Jingle Bell Rock and All I Want for Christmas Is You follow at 19 weeks.
  - question: >-
      Do Christmas songs return to the charts each year?
    answer: >-
      Yes. Standards like Jingle Bell Rock, All I Want for Christmas Is You, and Rockin' Around the Christmas Tree show chart appearances across multiple decades.
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p art-lede">Holiday songs occupy a peculiar chart niche: they return every December, accumulate weeks, then disappear until the next season. This analysis of the TidyTuesday christmas-songs dataset holds <strong>387</strong> records spanning <strong>1958–2017</strong>, with a median of <strong>8.00</strong> weeks on chart and a maximum of <strong>20.0</strong>.</p>
<p class="art-p">Better Days and Believe reach the 20-week ceiling. Perennial titles—Jingle Bell Rock, All I Want for Christmas Is You, Rockin' Around the Christmas Tree, and White Christmas—form the recurring core of the holiday chart across six decades.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that define this analysis:</p>
<div class="facts-grid">
  <div class="fact-box"><span class="fact-number">387</span><span class="fact-label">Records in the working dataset</span></div>
  <div class="fact-box"><span class="fact-number">8.00</span><span class="fact-label">Median Weeks on chart</span></div>
  <div class="fact-box"><span class="fact-number">20.0</span><span class="fact-label">Highest observed Weeks on chart</span></div>
  <div class="fact-box"><span class="fact-number">17.0</span><span class="fact-label">Median Weeks on chart (top dozen songs)</span></div>
  <div class="fact-box"><span class="fact-number">1958–2017</span><span class="fact-label">Year span covered in the file</span></div>
</div>
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source is the TidyTuesday release from 2019-12-24 (christmas_songs.csv). After cleaning, 387 rows remain.</p>
<p class="art-p">Weeks on chart is the primary metric; instance captures repeat chart appearances. Charts are Plotly JSON with PNG fallbacks.</p>
<h2 id="seasonal-weeks-spiked-in-the-mid-2000s" class="anchored">Seasonal Weeks Spiked in the Mid-2000s</h2>
<h3 id="seasonal-weeks-spiked-in-the-mid-2000s-look" class="anchored">Median Weeks on chart Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-songs/charts/chart1_trend.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-songs/charts/chart1_trend.png" role="img" aria-label="Median Weeks on chart Over Time"></div>
</figure>
<p class="art-p">Median weeks on chart by year reached <strong>20</strong> in 2005–2006, with other peaks in the mid-2010s (2016 at approximately 19 weeks, 2015 at approximately 18.5 weeks). Earlier years ranged between 11 and 16 weeks; a few years dropped to single digits or near 1 week.</p>
<p class="art-p">Changes in chart methodology (from airplay to sales to streaming) and the expansion of seasonal playlists both contributed to these shifts in how many weeks holiday songs accumulated per year.</p>

<h2 id="twenty-weeks-marks-the-upper-club" class="anchored">Twenty Weeks Marks the Upper Club</h2>
<h3 id="twenty-weeks-marks-the-upper-club-look" class="anchored">Better Days and Believe lead at 20.0 weeks; top dozen songs average 17.0 weeks</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-songs/charts/chart2_leaders.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-songs/charts/chart2_leaders.png" role="img" aria-label="Better Days and Believe lead at 20.0 weeks; top dozen songs average 17.0 weeks"></div>
</figure>
<p class="art-p">Better Days and Believe lead at <strong>20.0</strong> weeks. Jingle Bell Rock and All I Want for Christmas Is You follow at <strong>19</strong> weeks each; Same Old Lang Syne and Rockin' Around the Christmas Tree at <strong>18</strong> weeks each. The median among the top dozen is <strong>17.0</strong> weeks.</p>
<p class="art-p">Against a file median of 8 weeks, that elite group exceeds the typical holiday chart life by more than double.</p>

<h2 id="most-songs-cluster-at-short-chart-lives" class="anchored">Most Songs Cluster at Short Chart Lives</h2>
<h3 id="most-songs-cluster-at-short-chart-lives-look" class="anchored">Weeks on chart Distribution</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-songs/charts/chart3_distribution.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-songs/charts/chart3_distribution.png" role="img" aria-label="Weeks on chart Distribution"></div>
</figure>
<p class="art-p">The distribution shows substantial counts at both very short weeks-on-chart values and a high concentration near the upper teens (approximately <strong>84</strong> observations near the distribution's peak). Mid-range stays occupy the space between these two poles.</p>
<p class="art-p">Holiday songs cluster at two extremes: brief seasonal appearances and extended multi-week December occupations. Few settle in the middle.</p>

<h2 id="standards-reappear-across-decades" class="anchored">Standards Reappear Across Decades</h2>
<h3 id="standards-reappear-across-decades-look" class="anchored">Top Songs Over Time</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-songs/charts/chart4_leader_trends.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-songs/charts/chart4_leader_trends.png" role="img" aria-label="Top Songs Over Time"></div>
</figure>
<p class="art-p">Jingle Bell Rock posts 19-week seasons in the late 1950s–early 1960s and again in 2016–2017. All I Want for Christmas Is You shows 19-week runs across multiple 2010s seasons after earlier quiet appearances. Rockin' Around the Christmas Tree similarly appears in the early 1960s and mid-2010s peaks. White Christmas charted at 13 weeks in 1958–1962.</p>
<p class="art-p">The timeline reveals a repertoire system, not merely a new-release market. The same recordings cycle through decades, accumulating weeks on each return.</p>

<h2 id="more-instances-often-meet-longer-weeks" class="anchored">More Instances Often Meet Longer Weeks</h2>
<h3 id="more-instances-often-meet-longer-weeks-look" class="anchored">Weeks on chart vs Instance</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/christmas-songs/charts/chart5_scatter.plotly.json" data-source="Data: TidyTuesday / R for Data Science community - ARTOMETRICS" data-fallback="/images/content/articles/christmas-songs/charts/chart5_scatter.png" role="img" aria-label="Weeks on chart vs Instance"></div>
</figure>
<p class="art-p">Weeks on chart versus instance count shows perennial titles with multiple chart appearances clustering in the high-weeks region, while one-time chart entries scatter across both short and long stays.</p>
<p class="art-p">Re-entry drives holiday chart longevity. The same recording returns each December, accumulating new weeks with each cycle.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">Chart methodologies changed over the 1958–2017 span (airplay, sales, streaming), making weeks on chart across decades imperfectly comparable. Title capitalization and punctuation variations can split identical songs into separate records.</p>
<p class="art-p">The dataset reflects U.S. chart logic only and does not measure global streaming playlists or contemporary holiday releases beyond 2017.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Holiday chart life centers at 8 weeks, with a 20-week ceiling and a top-dozen median of 17 weeks. Standards recur across decades rather than aging out of rotation.</p>
<p class="art-p">Cite standards like Jingle Bell Rock, All I Want for Christmas Is You, and Rockin' Around the Christmas Tree when discussing cultural durability in music. Cite the 8-week median when addressing a typical seasonal chart appearance.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>Data Science Learning Community. (2019). <em>TidyTuesday: Christmas Songs</em>. <a href="https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-12-24/christmas_songs.csv" target="_blank" rel="noopener noreferrer">https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2019/2019-12-24/christmas_songs.csv</a></p>
</main>
</div>