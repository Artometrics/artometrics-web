---
title: "H3: The Artometrics of A YouTube Dynasty"
slug: h3-the-artometrics-of-a-youtube-dynasty
pubDate: 2026-04-14
description: "H3 is not one channel — it is a network. Since 2011, Ethan and Hila Klein have built four YouTube channels, one clothing brand, a podcast empire, and one of the most documented creator controversie..."
heroImage: /images/content/2026/04/IMG_4164.webp
tags: [culture, persona]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>

  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#chart-1-the-era-timeline" id="toc-chart-1-the-era-timeline">CHART 1 — THE ERA TIMELINE</a></li>
  <li><a href="#chart-2-the-duration-drift" id="toc-chart-2-the-duration-drift">CHART 2 — THE DURATION DRIFT</a></li>
  <li><a href="#chart-3-the-fan-vs.-critic-divide" id="toc-chart-3-the-fan-vs.-critic-divide">CHART 3 — THE FAN VS. CRITIC DIVIDE</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR’S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p>Ethan Klein built one of YouTube’s most documented creator empires from a single channel and a lawsuit. H3h3Productions launched in 2011 as a reaction-commentary format, spent years as a meme factory, and then pivoted — twice — into something far more complicated. The H3 Podcast debuted in 2017. The Frenemies co-host era with Trisha Paytas ran for nine months in 2020–2021 and produced the highest viewership the show has ever seen. The Leftovers political co-host era with Hasan Piker ran until October 2023, when a public dispute over the Israel-Palestine conflict ended it. What remained after that is what this report analyzes: 1,638 videos across four channels, 680 podcast episodes, and three years of Reddit post data from the fan and critic communities that formed around the brand.</p>
<p>This is not a hit piece and it is not a fan report. It is a data report. The numbers are what they are.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">3.24B</span>
    <span class="fact-label">Total views across all four H3 channels, 2013–2026 — enough to give every person on Earth nearly half a view</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">1,638</span>
    <span class="fact-label">Videos analyzed after filtering Shorts and zero-view uploads from the original 1,876-video pull</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">4.5×</span>
    <span class="fact-label">How much harder h3h3Productions hits per video vs. the H3 Podcast — 4.78M median vs. 1.05M</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">9 months</span>
    <span class="fact-label">The entire Frenemies Era — the most-watched stretch in H3 Podcast history, Sep 2020 to Jun 2021</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">680</span>
    <span class="fact-label">H3 Podcast episodes analyzed via Podchaser API — median runtime grew from 42 minutes in 2017 to 220+ by 2024</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">353</span>
    <span class="fact-label">r/h3snark indexed activity at its April 2025 peak — 3.5× its own average, triggered by the iDubbbz Content Cop</span>
  </div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The H3 ecosystem is not a single channel — it is a network. h3h3Productions launched in 2011 as a reaction-and-commentary channel built around the Fair Use legal fight that briefly made Ethan Klein a cause célèbre in YouTube creator circles. The H3 Podcast launched in 2017 as a separate channel and quickly became the brand’s primary vehicle. Hila Klein’s channel documents the Teddy Fresh clothing brand. The Ethan Klein channel captures solo content and live streams. This report analyzes all four: <strong>1,638 videos</strong> after filtering Shorts and zero-view uploads from the original 1,876-video pull via the YouTube Data API v3.</p>
<p>H3’s trajectory cannot be understood without the era framework. The podcast’s baseline (2017–2020) established the format: long-form conversation between Ethan and Hila, irregular cadence, modest but loyal viewership. The <strong>Frenemies Era</strong> (September 2020 – June 2021) is the single most-watched stretch in H3 Podcast history — nine months in which Ethan co-hosted with Trisha Paytas, generating a level of weekly engagement the show has never approached since. The <strong>Leftovers Era</strong> (September 2021 – October 2023) brought a political co-host in Hasan Piker, a different kind of audience, and a deeper ideological identity for the brand. When Leftovers ended over disagreements about the Israel-Palestine conflict, H3 entered its current post-format phase: fewer episodes, longer runtimes, a shrinking but committed core audience.</p>
<p>The core dataset was built from scratch using the YouTube Data API v3, stored at <code>github.com/Artometrics/h3</code>. Podcast episode metadata comes from the Podchaser API (680 episodes, April 2026 pull). Reddit post data was pulled from the Arctic Shift Reddit archive, covering <strong>r/h3h3productions</strong> (749,974 posts, 2014–2026) and <strong>r/h3snark</strong> (25,766 posts, April 2023–2026) — the fan sub and the critic sub, both active during the most contentious period in the brand’s history.</p>
<p>H3 is one of the most data-rich creator brands on the internet. The combination of YouTube longevity (13 years), a documented era structure, an unusually organized fan and critic community, and a clothing brand with its own Wikipedia page creates a dataset that rewards analysis. This report does not take a position on the controversies. It reads the numbers and describes what they show.</p>
<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-sql">SQL</span>
    </summary>
    <pre class="art-code-pre" id="sql-block-1">-- H3 Master Dataset: Filter and Prepare
-- Source: YouTube Data API v3 via Artometrics Original Pull
-- Mirrors: load-data and wrangle chunks in h3.qmd

SELECT
    channel,
    title,
    date,
    view_count,
    duration_minutes,
    DATE_TRUNC(&#39;month&#39;, date)  AS month_floor,
    DATE_TRUNC(&#39;year&#39;,  date)  AS year_floor,

    CASE
        WHEN date &lt; &#39;2020-09-15&#39;                             THEN &#39;Podcast Launch&#39;
        WHEN date BETWEEN &#39;2020-09-15&#39; AND &#39;2021-06-08&#39;     THEN &#39;Frenemies Era&#39;
        WHEN date BETWEEN &#39;2021-09-26&#39; AND &#39;2023-10-07&#39;     THEN &#39;Leftovers Era&#39;
        ELSE                                                      &#39;Post-Leftovers&#39;
    END AS era

FROM h3_master
WHERE duration_minutes &gt; 1
  AND view_count       &gt; 0
ORDER BY date ASC;

-- Reddit indexing query (mirrors Chart 3 construction)
WITH monthly_counts AS (
    SELECT
        source,
        DATE_TRUNC(&#39;month&#39;, date) AS month,
        COUNT(*)                  AS n_posts
    FROM (
        SELECT &#39;r/h3h3productions&#39; AS source, date FROM h3_reddit_posts
        UNION ALL
        SELECT &#39;r/h3snark&#39;        AS source, date FROM h3_snark_posts
    ) combined
    GROUP BY source, DATE_TRUNC(&#39;month&#39;, date)
),
subreddit_averages AS (
    SELECT source, AVG(n_posts) AS avg_posts
    FROM monthly_counts
    GROUP BY source
)
SELECT
    mc.source,
    mc.month,
    mc.n_posts,
    ROUND((mc.n_posts / sa.avg_posts) * 100, 1) AS index
FROM monthly_counts mc
JOIN subreddit_averages sa ON mc.source = sa.source
WHERE mc.month &gt;= &#39;2023-04-01&#39;
ORDER BY mc.source, mc.month;</pre>

  </details>
</div>

<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-python">Python</span>
    </summary>
    <pre class="art-code-pre" id="python-block-1"># H3 Artometrics — Python EDA
# Purpose: YouTube API pull structure + dataset diagnostics

import pandas as pd
import numpy as np
from googleapiclient.discovery import build

# ── 1. YouTube API Pull Structure ─────────────────────────────────────────────

CHANNEL_IDS = {
    &quot;h3h3Productions&quot;: &quot;UCDWIvJwLJsE4LG1Atne2blQ&quot;,
    &quot;H3 Podcast&quot;:      &quot;UCLtREklEc2upvIiudBMBmJg&quot;,
    &quot;Hila Klein&quot;:      &quot;UCgPTHMbDMCkDcGsZsKnJFGQ&quot;,
    &quot;Ethan Klein&quot;:     &quot;UCiDNNUJRqSHEtjGJO1m5mQA&quot;
}
# API call pattern (executed separately, key stored in Google Cloud)
# youtube = build(&quot;youtube&quot;, &quot;v3&quot;, developerKey=API_KEY)
# Results stored to data/h3_master.csv — 1,876 raw videos

# ── 2. Load Master Dataset ────────────────────────────────────────────────────

df = pd.read_csv(&quot;data/h3_master.csv&quot;, parse_dates=[&quot;date&quot;])
df_clean = df[(df[&quot;duration_minutes&quot;] &gt; 1) &amp; (df[&quot;view_count&quot;] &gt; 0)].copy()

print(f&quot;Raw videos:    {len(df):,}&quot;)
print(f&quot;After filter:  {len(df_clean):,}&quot;)
print(f&quot;Dropped:       {len(df) - len(df_clean):,}&quot;)
# Raw: 1,876 | After filter: 1,638 | Dropped: 238

# ── 3. Channel Coverage ───────────────────────────────────────────────────────

channel_summary = (
    df_clean
    .groupby(&quot;channel&quot;)
    .agg(
        videos       = (&quot;view_count&quot;, &quot;count&quot;),
        total_views  = (&quot;view_count&quot;, &quot;sum&quot;),
        median_views = (&quot;view_count&quot;, &quot;median&quot;),
        first_video  = (&quot;date&quot;, &quot;min&quot;),
        last_video   = (&quot;date&quot;, &quot;max&quot;)
    )
    .sort_values(&quot;total_views&quot;, ascending=False)
)
print(channel_summary.to_string())

# ── 4. Era Flag ───────────────────────────────────────────────────────────────

def assign_era(date):
    if date &lt; pd.Timestamp(&quot;2020-09-15&quot;):   return &quot;Podcast Launch&quot;
    elif date &lt; pd.Timestamp(&quot;2021-06-08&quot;): return &quot;Frenemies Era&quot;
    elif date &lt; pd.Timestamp(&quot;2023-10-07&quot;): return &quot;Leftovers Era&quot;
    else:                                   return &quot;Post-Leftovers&quot;

df_clean[&quot;era&quot;] = df_clean[&quot;date&quot;].apply(assign_era)

era_views = (
    df_clean[df_clean[&quot;channel&quot;] == &quot;H3 Podcast&quot;]
    .groupby(&quot;era&quot;)[&quot;view_count&quot;]
    .agg([&quot;sum&quot;, &quot;median&quot;, &quot;count&quot;])
    .rename(columns={&quot;sum&quot;: &quot;total&quot;, &quot;median&quot;: &quot;median&quot;, &quot;count&quot;: &quot;videos&quot;})
)
print(era_views)

# ── 5. Podchaser Episode Diagnostics ─────────────────────────────────────────

eps = pd.read_csv(&quot;data/h3_podchaser_episodes.csv&quot;, parse_dates=[&quot;airDate&quot;])
print(f&quot;\nEpisodes total:   {len(eps):,}&quot;)
print(f&quot;Date range:       {eps[&#39;airDate&#39;].min().date()} → {eps[&#39;airDate&#39;].max().date()}&quot;)
print(f&quot;Median runtime:   {eps[&#39;length_min&#39;].median():.0f} min&quot;)
print(f&quot;Max runtime:      {eps[&#39;length_min&#39;].max():.0f} min&quot;)
print(f&quot;Missing duration: {eps[&#39;length_min&#39;].isna().sum()} episodes&quot;)

# ── 6. Reddit Coverage Check ──────────────────────────────────────────────────

fans  = pd.read_csv(&quot;data/h3_reddit_posts.csv&quot;,  parse_dates=[&quot;date&quot;, &quot;month&quot;])
snark = pd.read_csv(&quot;data/h3_snark_posts.csv&quot;,   parse_dates=[&quot;date&quot;, &quot;month&quot;])

print(f&quot;\nr/h3h3productions: {len(fans):,} posts | {fans[&#39;date&#39;].min().date()} → {fans[&#39;date&#39;].max().date()}&quot;)
print(f&quot;r/h3snark:         {len(snark):,} posts | {snark[&#39;date&#39;].min().date()} → {snark[&#39;date&#39;].max().date()}&quot;)</pre>

  </details>
</div>
<h2 id="chart-1-the-era-timeline" class="anchored">CHART 1 — THE ERA TIMELINE</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart1_era_timeline.plotly.json" data-fallback="/images/content/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart1_era_timeline.png" role="img" aria-label="Era Timeline"></div>
  <figcaption class="art-chart-caption">Era Timeline</figcaption>
</figure>
</div>
</div>
</div>
<p>The shape of this chart tells you almost everything you need to know about the H3 Podcast’s commercial arc. From 2017 to mid-2020, the show built a reliable if unspectacular baseline — a few million views per month, loyal audience, consistent output. Then Trisha Paytas joined as co-host in September 2020 and the graph becomes a different document. Monthly views tripled within weeks. The peak months of the Frenemies Era outperformed the entire preceding three years of the podcast, and the show did it in nine months.</p>
<p>When Frenemies ended in June 2021 — abruptly, on-camera, mid-episode — views dropped back toward baseline within a single month. Leftovers launched that September and added a new audience (Hasan Piker’s political fanbase), generating a secondary bump visible in the 2022 data. But it never approached Frenemies numbers. After Leftovers ended in October 2023, the chart enters its current phase: a slow, grinding decline with no structural catalyst in sight. The mountain is the story. Everything else is the aftermath.</p>
<p>Even at its post-2023 lows, the H3 Podcast pulls millions of monthly views. The brand did not collapse — it contracted to its core. The audience that remains watches longer episodes with more commitment than the casual Frenemies-era viewer. The cliff looks dramatic on the chart because Frenemies was genuinely anomalous. The current numbers are not a failure; they are what a major podcast looks like without a viral co-host dynamic driving weekly drama.</p>
<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-1">era_lines &lt;- data.frame(
  date  = as.Date(c(&quot;2020-09-15&quot;,&quot;2021-06-08&quot;,&quot;2021-09-26&quot;,&quot;2023-10-07&quot;)),
  label = c(&quot;Frenemies\nPremiere&quot;,&quot;Frenemies\nFinale&quot;,
            &quot;Leftovers\nPremiere&quot;,&quot;Leftovers\nFinale&quot;),
  color = c(art_highlight, art_highlight, art_secondary, art_secondary),
  vjust = c(1.3, 4.5, 1.3, 1.3)
)

p1 &lt;- h3 |&gt;
  filter(channel == &quot;H3 Podcast&quot;) |&gt;
  mutate(month_floor = floor_date(date, &quot;month&quot;)) |&gt;
  group_by(month_floor) |&gt;
  summarise(monthly_views = sum(view_count, na.rm = TRUE)) |&gt;
  ggplot(aes(x = month_floor, y = monthly_views)) +
  geom_area(fill = art_secondary, alpha = 0.15) +
  geom_line(color = art_secondary, linewidth = 0.8) +
  geom_vline(data = era_lines,
             aes(xintercept = date, color = color),
             linetype = &quot;dashed&quot;, linewidth = 0.6) +
  geom_text(data = era_lines,
            aes(x = date, y = Inf, label = label, color = color, vjust = vjust),
            hjust = -0.08, size = 2.7, fontface = &quot;bold&quot;) +
  scale_color_identity() +
  scale_y_continuous(labels = label_number(scale = 1e-6, suffix = &quot;M&quot;)) +
  scale_x_date(date_breaks = &quot;1 year&quot;, date_labels = &quot;%Y&quot;) +
  labs(
    title   = &quot;THE &lt;span style=&#39;color:#C0392B&#39;&gt;**FRENEMIES ERA**&lt;/span&gt; IS A MOUNTAIN ON THE GRAPH&quot;,
    subtitle = &quot;Monthly Total Views, H3 Podcast Channel, 2017–2026&quot;,
    x = NULL, y = &quot;Monthly Views&quot;,
    caption = &quot;Data: YouTube Data API v3 | Artometrics Original Dataset\n— ARTOMETRICS&quot;
  ) +
  theme_artometrics()

ggsave(&quot;chart1_era_timeline.png&quot;, plot = p1,
       path = &quot;charts&quot;, width = 12, height = 7, dpi = 300, bg = &quot;white&quot;)</pre>

  </details>
</div>
<h2 id="chart-2-the-duration-drift" class="anchored">CHART 2 — THE DURATION DRIFT</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart2_duration_drift.plotly.json" data-fallback="/images/content/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart2_duration_drift.png" role="img" aria-label="Duration Drift"></div>
  <figcaption class="art-chart-caption">Duration Drift</figcaption>
</figure>
</div>
</div>
</div>
<p>When H3 launched the podcast in 2017, the median episode ran <strong>42 minutes</strong>. That’s a commute. By 2024, the median had crossed <strong>220 minutes</strong> — longer than most feature films. The chart shows this wasn’t a sudden format change; it was a slow, continuous drift upward that compounded year over year until a new normal was established. No single episode caused it. No announcement reset it. The show just kept going longer, and the audience kept watching.</p>
<p>The clearest structural break in the duration data isn’t a spike — it’s a floor shift. Before 2022, monthly medians regularly dipped below 120 minutes. After 2022, they never did. The show locked into 3-hour-plus territory and stayed there. Leftovers (2021) normalized the extended format; by the time it ended (2023), the audience had been conditioned to expect marathon sessions as the default. That conditioning didn’t reverse when Leftovers ended.</p>
<p>In 2024, H3 published far fewer episodes than in prior years — but duration hit its all-time high, with months regularly clearing <strong>220–240 minutes</strong>. The show was publishing less but asking more from the audience that stayed. Each episode became a larger commitment, not a smaller one. The fans who remained weren’t casual — they were in for 4 hours at a time. Whether that is sustainable is a different question. The data just shows it happened.</p>
<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-2">p2_data &lt;- episodes |&gt;
  mutate(
    airDate = as.Date(airDate),
    month   = floor_date(airDate, &quot;month&quot;),
    era     = case_when(
      airDate &lt; as.Date(&quot;2020-09-15&quot;)                                    ~ &quot;Podcast Launch (2017–Sep 2020)&quot;,
      airDate &gt;= as.Date(&quot;2020-09-15&quot;) &amp; airDate &lt; as.Date(&quot;2021-06-08&quot;) ~ &quot;Frenemies Era (Sep 2020–Jun 2021)&quot;,
      airDate &gt;= as.Date(&quot;2021-06-08&quot;) &amp; airDate &lt; as.Date(&quot;2023-10-07&quot;) ~ &quot;Leftovers Era (Jun 2021–Oct 2023)&quot;,
      TRUE                                                                ~ &quot;Post-Leftovers (Oct 2023–2026)&quot;
    ),
    era = factor(era, levels = era_levels_dur)
  ) |&gt;
  group_by(month, era) |&gt;
  summarise(median_min = median(length_min, na.rm = TRUE), .groups = &quot;drop&quot;)

p2 &lt;- ggplot(p2_data, aes(x = month, y = median_min)) +
  geom_point(aes(color = era), size = 2, alpha = 0.5) +
  geom_smooth(method = &quot;loess&quot;, span = 0.25, se = FALSE,
              color = art_dark, linewidth = 1.2) +
  geom_hline(yintercept = 180, linetype = &quot;dashed&quot;,
             color = art_mid, linewidth = 0.5) +
  scale_color_manual(values = era_colors_dur,
                     guide = guide_legend(nrow = 2)) +
  scale_x_date(date_breaks = &quot;1 year&quot;, date_labels = &quot;%Y&quot;) +
  scale_y_continuous(breaks = seq(0, 300, by = 60),
                     labels = function(x) paste0(x, &quot; min&quot;)) +
  labs(
    title    = &quot;H3 EPISODES GOT LONGER EVERY YEAR — &lt;span style=&#39;color:#C0392B&#39;&gt;**AND NEVER CAME BACK**&lt;/span&gt;&quot;,
    subtitle = &quot;Median episode duration by month · Smoothed trend line · 680 episodes&quot;,
    x = NULL, y = &quot;Median Duration (minutes)&quot;, color = NULL,
    caption = &quot;Data: Podchaser API, pulled April 2026\n— ARTOMETRICS&quot;
  ) +
  theme_artometrics() +
  theme(legend.position = &quot;bottom&quot;, panel.grid.major.x = element_blank())

ggsave(&quot;chart2_duration_drift.png&quot;, plot = p2,
       path = &quot;charts&quot;, width = 12, height = 7, dpi = 300, bg = &quot;white&quot;)</pre>

  </details>
</div>
<h2 id="chart-3-the-fan-vs.-critic-divide" class="anchored">CHART 3 — THE FAN VS. CRITIC DIVIDE</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart3_reddit_activity.plotly.json" data-fallback="/images/content/articles/h3-the-artometrics-of-a-youtube-dynasty/charts/chart3_reddit_activity.png" role="img" aria-label="Reddit Activity"></div>
  <figcaption class="art-chart-caption">Reddit Activity</figcaption>
</figure>
</div>
</div>
</div>
<p>The indexed chart removes the raw scale difference between subreddits and asks a cleaner question: when did each community spike relative to its own normal? The answer is almost never at the same time. When the iDubbbz Content Cop dropped on April 16, 2025 — the first Content Cop in years, explicitly targeting the H3 brand — r/h3snark hit its all-time peak at more than <strong>3.5× its own average</strong>. The fan sub barely registered the same event. The two communities were watching completely different shows.</p>
<p>The cliff in the snark data after May 2025 isn’t a controversy dying down — it’s a subreddit going dark. After Klein issued copyright claims against r/h3snark moderators and threatened legal action, the sub announced an indefinite hiatus. The index collapsed to near zero within weeks. The fan sub, meanwhile, continued its slow decline — below its own average but still functional. The snark community didn’t fade. It was shut down. That distinction matters: one line represents organic audience erosion, the other represents a legal intervention.</p>
<p>The blue line tells its own quieter story. The fan sub never spikes the way snark does — no single event moves it dramatically above baseline. But the trend is unmistakably downward. The community isn’t in crisis; it’s in slow erosion. Fewer new things to discuss, fewer viral moments to dissect, fewer reasons to post. The legal drama — the Content Cop, the streamer lawsuits — barely registered. Whatever drives fan engagement on r/h3h3productions, it isn’t courtroom news.</p>
<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-3">window_start &lt;- as.Date(&quot;2023-04-01&quot;)

fan_monthly   &lt;- reddit |&gt; filter(month &gt;= window_start) |&gt;
  count(month) |&gt; mutate(source = &quot;r/h3h3productions (Fans)&quot;)
snark_monthly &lt;- snark  |&gt; filter(month &gt;= window_start) |&gt;
  count(month) |&gt; mutate(source = &quot;r/h3snark (Critics)&quot;)

combined &lt;- bind_rows(fan_monthly, snark_monthly) |&gt;
  group_by(source) |&gt;
  mutate(index = (n / mean(n, na.rm = TRUE)) * 100) |&gt;
  ungroup()

p3 &lt;- ggplot(combined, aes(x = month, y = index, color = source)) +
  geom_line(linewidth = 0.9) +
  geom_hline(yintercept = 100, linetype = &quot;dashed&quot;,
             color = art_mid, linewidth = 0.4) +
  scale_color_manual(values = c(
    &quot;r/h3h3productions (Fans)&quot; = art_secondary,
    &quot;r/h3snark (Critics)&quot;      = art_highlight
  )) +
  scale_x_date(date_breaks = &quot;3 months&quot;, date_labels = &quot;%b %Y&quot;) +
  labs(
    title    = &quot;FANS AND CRITICS RESPOND TO &lt;span style=&#39;color:#C0392B&#39;&gt;**COMPLETELY DIFFERENT TRIGGERS**&lt;/span&gt;&quot;,
    subtitle = &quot;Monthly Post Volume Indexed to Each Subreddit&#39;s Own Average · Apr 2023–Mar 2026&quot;,
    x = NULL, y = &quot;Indexed Activity (100 = Avg)&quot;, color = NULL,
    caption = &quot;Source: Arctic Shift Reddit Archive\n— ARTOMETRICS&quot;
  ) +
  theme_artometrics() +
  theme(legend.position = &quot;bottom&quot;, panel.grid.major.x = element_blank(),
        axis.text.x = element_text(angle = 30, hjust = 1))

ggsave(&quot;chart3_reddit_activity.png&quot;, plot = p3,
       path = &quot;charts&quot;, width = 12, height = 7, dpi = 300, bg = &quot;white&quot;)</pre>

  </details>
</div>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>The YouTube data captures view counts as of the April 2026 pull — not at time of publication. Older videos have had years to accumulate views through algorithmic recommendations and search, which means early h3h3Productions videos are systematically over-represented in lifetime view totals relative to their original performance. The era-based analysis on the H3 Podcast channel is less affected because the comparison is within-channel across time.</p>
<p>The Arctic Shift Reddit archive is comprehensive but not guaranteed complete. Deleted posts, removed comments, and accounts banned before archival are absent from the dataset. The r/h3snark data begins in April 2023 — the sub’s founding — so pre-2023 critical community activity is unrepresented. Any conclusions about the fan-vs-critic dynamic are bounded by that window.</p>
<p>Episode duration data from Podchaser is self-reported by the show and may include inconsistencies for older episodes, live streams published as podcast episodes, and bonus or clip content. Episodes with missing duration values were excluded from Chart 2 analysis. Chart 3 indexes each subreddit to its own average across the Apr 2023–Mar 2026 window. A subreddit with low activity in early months will show inflated index values in later high-activity periods — the r/h3snark baseline is built on its full available history, which starts at launch and may slightly inflate peak readings relative to a steadier baseline.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>The H3 data tells a story about what happens when a creator brand builds its peak moment around someone else. The Frenemies Era was genuinely anomalous — nine months of co-host-driven drama that tripled the podcast’s monthly viewership and created a ceiling the show has never approached since. The chart is unambiguous about this. The current audience is not a collapse; it is a correction back to what the brand can sustain on its own terms.</p>
<p>The duration data adds a different dimension. The show that emerged from the Frenemies aftermath is structurally different from the one that preceded it — longer, less frequent, more demanding. Whether that format is a creative choice or a symptom of a contracting audience is a question the data cannot answer. Both explanations fit the numbers.</p>
<p>The Reddit chart is the most structurally interesting of the three. It documents not just audience behavior but audience management: a creator using legal tools to suppress a critic community. The snark subreddit’s cliff is not organic. It is the result of a deliberate intervention. The fan sub’s slower decline runs in parallel and suggests the underlying engagement problem would exist regardless. Two different communities, two different trajectories, one brand caught between them.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<div class="art-references">
  <div class="art-ref-item">
    YouTube Data API v3. Google.
    <a href="https://developers.google.com/youtube/v3" target="_blank">
      https://developers.google.com/youtube/v3
    </a>
  </div>
  <div class="art-ref-item">
    Artometrics Original Dataset (April 2026). <em>H3 Podcast YouTube
    Network, 2013–2026</em>. Compiled via YouTube Data API v3.
    <a href="https://github.com/Artometrics/h3" target="_blank">
      https://github.com/Artometrics/h3
    </a>
  </div>
  <div class="art-ref-item">
    Podchaser. (2026). <em>H3 Podcast episode data, 2017–2026</em>.
    Retrieved via Podchaser API v1.
    <a href="https://api.podchaser.com" target="_blank">
      https://api.podchaser.com
    </a>
  </div>
  <div class="art-ref-item">
    Arctic Shift Reddit Archive. (2026). <em>r/h3h3productions and
    r/h3snark post data</em>. Retrieved April 2026.
    <a href="https://arctic-shift.photon-reddit.com" target="_blank">
      https://arctic-shift.photon-reddit.com
    </a>
  </div>
  <div class="art-ref-item">
    Wikimedia Foundation. (2026). <em>Wikipedia pageview statistics</em>.
    Retrieved via Wikimedia REST API.
    <a href="https://wikimedia.org/api/rest_v1/" target="_blank">
      https://wikimedia.org/api/rest_v1/
    </a>
  </div>
  <div class="art-ref-item">
    Google Trends. (2026). <em>Search interest data: h3h3, ethan klein,
    frenemies, teddy fresh</em>. Retrieved via gtrendsR v1.5.2.
    <a href="https://trends.google.com" target="_blank">
      https://trends.google.com
    </a>
  </div>
</div>
<h2 id="editors-note" class="anchored">EDITOR’S NOTE</h2><div class="art-editorial-note"><p class="art-p">
This report was researched, written, designed, and produced in active
collaboration with Claude AI (Anthropic). The data pipeline, statistical
analysis, chart design, written analysis, narrative structure, and visual
styling were all developed through a directed partnership between human
editorial judgment and AI execution.
</p>
<p class="art-p">
Artometrics was built on the premise that rigorous analysis and honest
process are not in conflict. The research questions, editorial instincts,
interpretive framing, and brand vision are ours. The execution — every
line of R code, every paragraph of analysis, every design decision — was
a collaboration. We document this not as a disclaimer but as a
description of how we actually work, and as a position: we believe this
is what serious data journalism looks like when the tools available are
used honestly and at full capacity.
</p>
<p class="art-p">— Artometrics Editorial</p></div>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/h3" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>
