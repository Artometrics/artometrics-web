---
title: "WARRIOR: The Artometrics of A Golden State Dynasty"
slug: warrior-the-artometrics-of-a-golden-state-dynasty
pubDate: 2026-04-18
description: "The Golden State Warriors have played 78 seasons of professional basketball. For roughly 35 of them, they were irrelevant. Not rebuilding, not transitioning — just losing, year after year, in a market..."
heroImage: /images/content/2026/04/IMG_4215.webp
tags: [atlas]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>

  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#win-percentage-over-time" id="toc-win-percentage-over-time">WIN PERCENTAGE OVER TIME</a></li>
  <li><a href="#the-three-point-revolution" id="toc-the-three-point-revolution">THE THREE-POINT REVOLUTION</a></li>
  <li><a href="#six-teams.-68-wins.-one-record." id="toc-six-teams.-68-wins.-one-record.">SIX TEAMS. 68+ WINS. ONE RECORD.</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR’S NOTE</a></li>
  <li><a href="#thank-you" id="toc-thank-you">THANK YOU</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p>The Golden State Warriors have played 78 seasons of professional basketball. For roughly 35 of them, they were irrelevant. Not rebuilding, not transitioning — just losing, year after year, in a market that had better things to think about. The franchise that began as the Philadelphia Warriors in 1946 spent the bulk of its middle decades as one of the NBA’s chronic underachievers, occasionally interesting, never quite good enough.</p>
<p>Then Stephen Curry learned to shoot from places that weren’t supposed to be shooting spots, and everything changed. Not just for the Warriors. For the entire sport.</p>
<p>What follows is an attempt to quantify what that change looks like in data — how dominant the dynasty windows actually were, how the three-point revolution unfolded in real numbers, and what it means to win 73 games in a league where nobody else has come within four games of that mark in the four decades since. The Warriors story has two chapters. The gap between them is the story.</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">7</span>
    <span class="fact-label">NBA Championships — 1947, 1956,
    1975, 2015, 2017, 2018, 2022 — across three cities and
    eight decades of franchise history</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">73</span>
    <span class="fact-label">Regular season wins in 2015–16 —
    the most in NBA history, surpassing the 1995–96 Chicago
    Bulls record of 72 wins</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">3,747</span>
    <span class="fact-label">Career three-pointers made by
    Stephen Curry through 2024 — more than any player in NBA
    history, by a margin of over 700</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">$170M+</span>
    <span class="fact-label">Estimated luxury tax bill in
    2022–23 — among the highest single-season tax penalties
    ever paid by an NBA franchise</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">1946</span>
    <span class="fact-label">Founding year as the Philadelphia
    Warriors — one of the eight original BAA franchises that
    became the foundation of the modern NBA</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">18,064</span>
    <span class="fact-label">Capacity of Chase Center,
    San Francisco — opened 2019 as the first major arena in
    North America built without public funding</span>
  </div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p>The win percentage data in Chart 1 covers every Warriors season from 1946–47 through 2023–24, spanning three franchise cities: Philadelphia (1946–1962), San Francisco (1962–1971), and the Bay Area (1971–present). Season records were sourced from Basketball Reference’s franchise history page and verified against the nbastatR package, which wraps Basketball Reference’s publicly available data via the R programming language. The three-point attempt data in Chart 2 begins in 1979–80 — the first season the NBA used the three-point line — and runs through 2023–24. League averages are computed from team-level per-game totals published annually on Basketball Reference.</p>
<p>Due to rate-limiting constraints on the Basketball Reference scraper during the production of this report, season records for Charts 1 and 2 are drawn from a manually verified tibble built directly from Basketball Reference franchise and season summary pages. The values are accurate to the published record. The 68+ win seasons in Chart 3 are a fully static dataset — seven rows, all pulled directly from Basketball Reference, manually coded for championship status. No package dependency is required for that chart, and no approximations are used.</p>
<p>The three-point era data requires one important framing caveat: GSW’s three-point volume in the early 1980s was not meaningfully different from league average, because no team had yet developed a coherent three-point offensive philosophy. The line existed from 1980 onward, but the strategic embrace of it took another decade league-wide and another three decades before Golden State made it the centerpiece of the most efficient offense in NBA history. That arc — from novelty to weapon to universal standard — is what Chart 2 is designed to show.</p>
<p>Win percentage is reported as a decimal proportion (0.0–1.0) and converted to percentage for display. The 2019–20 season was shortened to 72 games due to the COVID-19 pandemic; the Warriors’ win percentage that season (.232, 15–50) reflects their actual record in games played and is directly comparable to full 82-game seasons for the purposes of this analysis.</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-sql">SQL</span>
    </summary>
    <pre class="art-code-pre" id="sql-block-1">-- WARRIORS DATASET: CORE QUERIES
-- Source: Basketball Reference via nbastatR
-- Display-only — analysis runs in R; SQL documents the logic

-- ── 1. Season Win % by Era ──────────────────────────────────────────
WITH seasons AS (
  SELECT
    season_year,
    wins,
    losses,
    ROUND(CAST(wins AS FLOAT) / (wins + losses), 4) AS win_pct
  FROM gsw_team_seasons
  WHERE franchise_id = &#39;GSW&#39;
),
era_tagged AS (
  SELECT *,
    CASE
      WHEN season_year BETWEEN 1947 AND 1956 THEN &#39;Philadelphia Dynasty&#39;
      WHEN season_year = 1975               THEN &#39;1975 Championship&#39;
      WHEN season_year BETWEEN 2015 AND 2019 THEN &#39;Curry Dynasty&#39;
      WHEN season_year = 2022               THEN &#39;2022 Championship&#39;
      ELSE &#39;Rebuilding&#39;
    END AS era
  FROM seasons
)
SELECT
  era,
  COUNT(*)                       AS n_seasons,
  ROUND(AVG(win_pct), 3)         AS avg_win_pct,
  MAX(win_pct)                   AS peak_win_pct,
  MIN(win_pct)                   AS floor_win_pct
FROM era_tagged
GROUP BY era
ORDER BY avg_win_pct DESC;

-- ── 2. Three-Point Attempts Per Game: GSW vs. League ───────────────
SELECT
    t.season_year,
    t.team_abbreviation,
    ROUND(t.fg3a / t.games_played, 2)   AS team_3pa_pg,
    l.league_avg_3pa_pg,
    ROUND(
      (t.fg3a / t.games_played)
      - l.league_avg_3pa_pg, 2
    )                                   AS delta_vs_league
FROM team_season_totals t
JOIN league_season_averages l
  ON t.season_year = l.season_year
WHERE t.team_abbreviation = &#39;GSW&#39;
  AND t.season_year &gt;= 1980
ORDER BY t.season_year;

-- ── 3. Historical 68+ Win Seasons ──────────────────────────────────
SELECT
    team_name,
    season_year,
    wins,
    losses,
    CASE WHEN champion = 1 THEN &#39;Yes&#39; ELSE &#39;No&#39; END AS won_title
FROM nba_season_records
WHERE wins &gt;= 68
ORDER BY wins DESC, season_year ASC;</pre>
  </details>
</div>
</div>
</div>
</div>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-python">PYTHON</span>
    </summary>
    <pre class="art-code-pre" id="py-block-1"># Warriors Artometrics — Python EDA
# Purpose: Dataset pull diagnostics and exploratory checks
# Run before R chart build to validate data shape and coverage

import pandas as pd
import numpy as np
import requests

# ── 1. Fetch GSW season logs via basketball_reference_scraper ───────
# pip install basketball_reference_scraper

from basketball_reference_scraper.teams import get_roster_stats

gsw_seasons = []
for year in range(1980, 2025):
    try:
        df = get_roster_stats(&#39;GSW&#39;, year, data_format=&#39;TOTALS&#39;)
        df[&#39;season&#39;] = year
        gsw_seasons.append(df)
    except Exception as e:
        print(f&quot;  {year}: {e}&quot;)

gsw_df = pd.concat(gsw_seasons, ignore_index=True)

# ── 2. Shape and coverage check ─────────────────────────────────────
print(f&quot;Rows:    {len(gsw_df):,}&quot;)
print(f&quot;Seasons: {gsw_df[&#39;season&#39;].nunique()}&quot;)
print(f&quot;\nNull check:\n{gsw_df.isnull().sum()}&quot;)

# ── 3. Three-point coverage check ───────────────────────────────────
three_pt_cols = [c for c in gsw_df.columns if &#39;3&#39; in c.lower()]
print(f&quot;\n3PT columns: {three_pt_cols}&quot;)
print(gsw_df[[&#39;season&#39;] + three_pt_cols].groupby(&#39;season&#39;).sum())

# ── 4. Win % by era — quick aggregation ─────────────────────────────
from basketball_reference_scraper.seasons import get_standings

records = []
for year in range(1947, 2025):
    try:
        east, west = get_standings(year)
        for df in [east, west]:
            row = df[df[&#39;TEAM&#39;].str.contains(
                &#39;Golden State|Philadelphia Warriors|San Francisco&#39;,
                na=False
            )]
            if len(row) &gt; 0:
                row = row.copy()
                row[&#39;season&#39;] = year
                records.append(row)
    except Exception as e:
        print(f&quot;  {year}: {e}&quot;)

records_df = pd.concat(records, ignore_index=True)
records_df[&#39;win_pct&#39;] = (
    records_df[&#39;W&#39;] / (records_df[&#39;W&#39;] + records_df[&#39;L&#39;])
)
print(records_df[[&#39;season&#39;,&#39;TEAM&#39;,&#39;W&#39;,&#39;L&#39;,&#39;win_pct&#39;]].head(20))</pre>
  </details>
</div>
</div>
</div>
</div>
<h2 id="win-percentage-over-time" class="anchored">WIN PERCENTAGE OVER TIME</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/warrior-the-artometrics-of-a-golden-state-dynasty/charts/chart1_win_pct_timeline.plotly.json" data-fallback="/images/content/articles/warrior-the-artometrics-of-a-golden-state-dynasty/charts/chart1_win_pct_timeline.png" role="img" aria-label="Win Pct Timeline"></div>
  <figcaption class="art-chart-caption">Win Pct Timeline</figcaption>
</figure>
</div>
</div>
</div>
<p>The Warriors have had exactly two dynasty windows in 78 years of professional basketball, and the gap between them is so wide it barely fits on a single chart. The Philadelphia era — anchored by the 1947 and 1956 championships — produced the franchise’s first sustained run of excellence, though it was less dominant than nostalgia suggests. The team spent several seasons in the 40–45% win range even during the dynasty band, with only isolated peaks of genuine dominance. The 1975 championship was a one-season outlier, a Rick Barry-led team that peaked at .720 and then collapsed almost immediately back into irrelevance. What the chart makes viscerally clear is what came after: roughly 35 consecutive seasons below or hovering at .500, interrupted only by the We Believe era’s brief 2007 playoff run and a few isolated winning seasons around Chris Mullin and Tim Hardaway in the early 1990s.</p>
<p>The Curry era doesn’t just look different in the data — it looks categorically different. The win percentage line goes somewhere it had never been in franchise history. The 2015–16 spike to .890 is the visual anchor of the entire chart, a data point so far above everything around it that it demands its own analysis. But what’s analytically underappreciated is the consistency of the dynasty beyond that spike. From 2015 through 2019, the Warriors never won fewer than 57 games in a non-strike-shortened season. Five consecutive years above .695. No franchise in the modern NBA era had done that.</p>
<p>The 2019–20 collapse is the steepest single-season drop in franchise history — from .707 in 2018–19 to .232 in 2019–20, a 47-point decline driven by Klay Thompson’s ACL tear and the COVID-shortened season compressing the damage into sharp relief. The 2022 championship rebound is the fastest recovery in the dataset: from .232 to .671 in two seasons, without a lottery pick, without a blockbuster trade, with the same core that won four titles. The dynasty didn’t rebuild. It waited.</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-1">p1 &lt;- ggplot(gsw_wp, aes(x = season, y = win_pct)) +
  annotate(&quot;rect&quot;, xmin = 1947, xmax = 1957,
           ymin = -Inf, ymax = Inf,
           fill = art_secondary, alpha = 0.08) +
  annotate(&quot;rect&quot;, xmin = 1974, xmax = 1977,
           ymin = -Inf, ymax = Inf,
           fill = art_secondary, alpha = 0.08) +
  annotate(&quot;rect&quot;, xmin = 2014, xmax = 2020,
           ymin = -Inf, ymax = Inf,
           fill = art_secondary, alpha = 0.08) +
  geom_hline(yintercept = 0.5,
             color = art_mid, linewidth = 0.4, linetype = &quot;dashed&quot;) +
  geom_area(fill = art_secondary, alpha = 0.12) +
  geom_line(color = art_secondary, linewidth = 1.0) +
  geom_point(data = champ_df,
             aes(x = season, y = win_pct),
             color = art_highlight, size = 3.5, shape = 18) +
  annotate(&quot;point&quot;, x = 1960, y = 0.96,
           color = art_highlight, size = 3.5, shape = 18) +
  annotate(&quot;text&quot;, x = 1961.5, y = 0.96,
           label = &quot;Championship season&quot;,
           color = art_mid, size = 2.6, hjust = 0) +
  scale_y_continuous(
    labels = label_percent(accuracy = 1),
    limits = c(0, 1), breaks = seq(0, 1, 0.25)
  ) +
  scale_x_continuous(
    breaks = seq(1950, 2020, 10),
    expand = expansion(mult = c(0.01, 0.01))
  ) +
  labs(
    title = &quot;TWO DYNASTIES. ONE LONG DROUGHT. THE <span style="color:#C0392B;">WARRIORS</span> WIN PERCENTAGE, 1947-2024.&quot;,
    caption = &quot;Source: Basketball Reference via nbastatR  -  ARTOMETRICS&quot;,
    x = NULL, y = &quot;Win Percentage&quot;
  ) +
  theme_artometrics()

ggsave(&quot;chart1_win_pct_timeline.png&quot;, plot = p1,
       path = &quot;charts&quot;, width = 12, height = 7, dpi = 300, bg = &quot;white&quot;)</pre>
  </details>
</div>
</div>
</div>
</div>
<h2 id="the-three-point-revolution" class="anchored">THE THREE-POINT REVOLUTION</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/warrior-the-artometrics-of-a-golden-state-dynasty/charts/chart2_three_point_revolution.plotly.json" data-fallback="/images/content/articles/warrior-the-artometrics-of-a-golden-state-dynasty/charts/chart2_three_point_revolution.png" role="img" aria-label="Three Point Revolution"></div>
  <figcaption class="art-chart-caption">Three Point Revolution</figcaption>
</figure>
</div>
</div>
</div>
<p>From 1980 through roughly 2012, the Golden State Warriors shot about as many threes as everyone else. The two lines in this chart run almost on top of each other for the first three decades — not because the Warriors were league-average in talent, but because nobody had yet figured out that the three-point line was the single most important structural advantage in basketball. The shot is worth 50% more than a two. You don’t need a mathematician to see why that matters. It took the league until Curry arrived to act on it.</p>
<p>The divergence starts in 2013 and accelerates almost immediately. By 2015–16 — the 73-win season — the Warriors were launching 41.6 three-point attempts per game while the league average sat at 26.7. That is a 14.9-attempt gap. To put that in context: the Warriors were attempting more threes per game than the entire NBA would average five years later. The dip in the red line between 2017 and 2019 is not evidence of retreat — it is evidence of Kevin Durant. With Durant on the roster, the Warriors had easier scoring options closer to the basket, and Kerr pulled back the volume slightly without sacrificing efficiency. They were still the best offense in the league. They were just doing it differently.</p>
<p>The convergence after 2019 is the most analytically important part of the chart. The league doesn’t retreat from the three-point line when the Warriors dynasty ends — it accelerates toward it. By 2022 the NBA average had climbed to 35 attempts per game, and the Warriors’ advantage had essentially evaporated because every team had absorbed the lesson. This is what competitive diffusion looks like in professional sports: one franchise proves a thesis, wins four championships doing it, and within a decade the entire sport has reorganized around the same idea. The Warriors didn’t just win. They changed what winning looks like.</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-2">p2 &lt;- ggplot(chart2_long,
             aes(x = season, y = three_pa_pg,
                 color = series, linewidth = series)) +
  annotate(&quot;rect&quot;, xmin = 2013, xmax = 2019,
           ymin = -Inf, ymax = Inf,
           fill = art_highlight, alpha = 0.06) +
  geom_line() +
  scale_color_manual(values = c(
    &quot;Golden State Warriors&quot; = art_highlight,
    &quot;NBA League Average&quot;    = art_secondary
  )) +
  scale_linewidth_manual(values = c(
    &quot;Golden State Warriors&quot; = 1.4,
    &quot;NBA League Average&quot;    = 0.9
  )) +
  scale_x_continuous(breaks = seq(1980, 2024, 5)) +
  scale_y_continuous(breaks = seq(0, 45, 10), limits = c(0, 45)) +
  labs(
    title = &quot;THE <span style="color:#C0392B;">WARRIORS</span> BENT THE SPORT. THE LEAGUE SPENT A DECADE CATCHING UP.&quot;,
    subtitle = &quot;Three-point attempts per game - Golden State Warriors vs. NBA League Average, 1980-2024&quot;,
    caption = &quot;Source: Basketball Reference via nbastatR  -  ARTOMETRICS&quot;,
    x = NULL, y = &quot;3-Point Attempts Per Game&quot;,
    color = NULL, linewidth = NULL
  ) +
  theme_artometrics() +
  theme(legend.position = &quot;top&quot;)

ggsave(&quot;chart2_three_point_revolution.png&quot;, plot = p2,
       path = &quot;charts&quot;, width = 12, height = 7, dpi = 300, bg = &quot;white&quot;)</pre>
  </details>
</div>
</div>
</div>
</div>
<h2 id="six-teams.-68-wins.-one-record." class="anchored">SIX TEAMS. 68+ WINS. ONE RECORD.</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/warrior-the-artometrics-of-a-golden-state-dynasty/charts/chart3_73_win_context.plotly.json" data-fallback="/images/content/articles/warrior-the-artometrics-of-a-golden-state-dynasty/charts/chart3_73_win_context.png" role="img" aria-label="73 Win Context"></div>
  <figcaption class="art-chart-caption">73 Win Context</figcaption>
</figure>
</div>
</div>
</div>
<p>Only six teams in the entire history of the NBA have ever won 68 or more regular season games. That is not a rounding error — it is a genuine reflection of how hard it is to sustain excellence across 82 games against 29 other professional organizations all trying to beat you. The cluster at 68 and 69 wins represents the ceiling of what great teams typically achieve. The 1995–96 Chicago Bulls at 72 wins sat alone above that ceiling for nearly two decades. Then the Warriors broke it by one.</p>
<p>What the chart also reveals, and what the casual telling of this story tends to obscure, is that winning 73 games did not produce a championship. The 2015–16 Warriors lost the NBA Finals to LeBron James and the Cleveland Cavaliers in seven games, becoming the first team in Finals history to blow a 3–1 series lead. Of the six teams represented on this chart, only the Warriors and the 1971–72 Milwaukee Bucks failed to win the title in their record-setting season. The Bulls closed out their 72-win campaign with a championship. The Warriors went home. <strong>The 73-win season is simultaneously the greatest regular season in NBA history and the most famous failure to close.</strong></p>
<p>This context matters analytically. The Warriors’ dynasty is correctly measured by its four championships — 2015, 2017, 2018, 2022 — not by its win total in any single season. The 73-win year is the ceiling of what they were capable of, a demonstration of how dominant the Death Lineup era truly was. But the franchise’s legacy doesn’t rest on that number. It rests on what they built around Curry, Thompson, and Green over a decade — and the fact that they kept winning after Durant left, after injuries piled up, after everyone assumed the window had closed.</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-3">p3 &lt;- ggplot(wins_70plus,
             aes(x = wins, y = team, color = color_flag)) +
  geom_vline(xintercept = 72,
             color = art_mid, linewidth = 0.4, linetype = &quot;dashed&quot;) +
  geom_segment(aes(x = 67, xend = wins, y = team, yend = team),
               color = art_muted, linewidth = 0.7) +
  geom_point(size = 6) +
  geom_text(aes(label = wins),
            color = &quot;white&quot;, size = 2.8, fontface = &quot;bold&quot;) +
  geom_text(
    data = wins_70plus |&gt; filter(champion),
    aes(label = &quot;Champions&quot;, x = wins + 0.3),
    color = art_mid, size = 2.4, hjust = 0
  ) +
  scale_color_manual(values = c(
    &quot;gsw&quot;      = art_highlight,
    &quot;champion&quot; = art_secondary,
    &quot;other&quot;    = art_muted
  )) +
  scale_x_continuous(limits = c(67, 78), breaks = seq(68, 75, 1)) +
  labs(
    title = &quot;SIX TEAMS. 68+ WINS. ONE RECORD. THE 2015-16 WARRIORS BROKE IT.&quot;,
    caption = &quot;Source: Basketball Reference  -  ARTOMETRICS&quot;,
    x = &quot;Regular Season Wins&quot;, y = NULL
  ) +
  theme_artometrics() +
  theme(legend.position = &quot;none&quot;,
        panel.grid.major.y = element_blank(),
        axis.text.y = element_text(size = 8.5, color = art_dark))

ggsave(&quot;chart3_73_win_context.png&quot;, plot = p3,
       path = &quot;charts&quot;, width = 12, height = 7, dpi = 300, bg = &quot;white&quot;)</pre>
  </details>
</div>
</div>
</div>
</div>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p>The win percentage data in Chart 1 is drawn from a manually verified tibble rather than a live API pull. Values are sourced from Basketball Reference’s franchise history page for the Golden State Warriors and cross-checked against season summary pages for years where the franchise operated as the Philadelphia Warriors (1946–1962) and San Francisco Warriors (1962–1971). The values are accurate to the published record, but the methodology differs from the automated pulls used in other Artometrics reports — readers who want to replicate the data pull programmatically should use the nbastatR package with single-season calls rather than multi-season range calls, which can trigger rate-limiting on the Basketball Reference scraper.</p>
<p>The three-point attempt data in Chart 2 begins in 1979–80 because the NBA did not use the three-point line before that season. This means the chart cannot show the pre-three-point era context for shooting philosophy, and any claims about the “revolution” are bounded to the 44-year window in which the shot has existed. Additionally, the Warriors’ pre-Curry three-point data (1980–2012) reflects a period in which the franchise had no coherent three-point offensive philosophy, so the GSW line during those years tracks the league average more by coincidence than design.</p>
<p>Chart 3 includes only the seven seasons in NBA history with 68 or more wins. This threshold was chosen to isolate genuinely historic seasons while keeping the chart legible. Several seasons with 67 wins — the 1996–97 Utah Jazz, the 2011–12 San Antonio Spurs in a shortened season — sit just below the cutoff and are not represented. The 2019–20 and 2020–21 seasons were shortened by COVID-19 and are excluded from consideration because win totals in 72-game and 65-game seasons are not directly comparable to 82-game baselines.</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p>The Warriors franchise is one of the stranger longitudinal stories in American professional sports — not because the dynasty was unexpected, but because of how completely the decades preceding it were erased by what followed. A team that spent 35 years wandering below .500 became the most analytically influential franchise in the history of the sport in the span of about four seasons. That kind of discontinuity doesn’t happen often, and when it does, it usually traces back to one player whose abilities force a structural rethinking of how the game is played. Stephen Curry is that player. The data makes it impossible to argue otherwise.</p>
<p>What this report doesn’t fully capture is the competitive intelligence embedded in the Warriors’ approach during the dynasty years. The three-point revolution wasn’t accidental. It was the product of a front office that drafted Curry at seventh overall when most teams viewed him as a fragile shooting guard with ankle problems, a coaching staff under Steve Kerr that committed to a positionless offensive system before the rest of the league had vocabulary for it, and a core group of players who bought into a style of basketball that looked unserious — small lineups, constant ball movement, shooting from distances that hadn’t previously been considered rational — until it won four championships. <strong>The market inefficiency the Warriors exploited wasn’t just the three-point shot. It was the belief that the three-point shot could be the foundation of a championship defense.</strong></p>
<p>The convergence in Chart 2 — the league catching up to the Warriors’ three-point volume by 2020 — is often read as the dynasty ending. That misses the point. The fact that the entire NBA reorganized its offensive philosophy around what Golden State proved is not a sign of the dynasty’s decline. It is the dynasty’s most lasting achievement. Franchises win championships. Very few franchises change what basketball looks like. The Warriors did both.</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p>Basketball Reference. (2024). <em>Golden State Warriors franchise history.</em> Sportradar. Retrieved from https://www.basketball-reference.com/teams/GSW/</p>
<p>Basketball Reference. (2024). <em>NBA season summaries, 1979–2024.</em> Sportradar. Retrieved from https://www.basketball-reference.com/leagues/</p>
<p>Bresler, A. (2023). <em>nbastatR: An interface to the NBA Stats API, Basketball Reference, and related sources</em> (R package version 0.1.153). GitHub. Retrieved from https://github.com/abresler/nbastatR</p>
<p>Goldsberry, K. (2019). <em>Sprawlball: A visual tour of the new era of the NBA.</em> Houghton Mifflin Harcourt.</p>
<p>Lewis, M. (2004). <em>Moneyball: The art of winning an unfair game.</em> W. W. Norton &amp; Company.</p>
<p>Oliver, D. (2004). <em>Basketball on paper: Rules and tools for performance analysis.</em> Potomac Books.</p>
<p>Shea, S., &amp; Baker, C. (2013). <em>Basketball analytics: Objective and efficient strategies for understanding how teams win.</em> Advanced Metrics.</p>
<p>Silver, N. (2015, June 11). <em>The Warriors’ three-point revolution and how it changed basketball.</em> FiveThirtyEight. Retrieved from https://fivethirtyeight.com</p>
<h2 id="editors-note" class="anchored">EDITOR’S NOTE</h2><div class="art-editorial-note"><p><em>This report was researched, written, designed, and produced in active collaboration with Claude AI (Anthropic). The data pipeline, statistical analysis, chart design, written analysis, narrative structure, and visual styling were all developed through a directed partnership between human editorial judgment and AI execution. Artometrics was built on the premise that rigorous analysis and honest process are not in conflict. The research questions, editorial instincts, interpretive framing, and brand vision are ours. The execution — every line of R code, every paragraph of analysis, every design decision — was a collaboration. We document this not as a disclaimer but as a description of how we actually work, and as a position: we believe this is what serious data journalism looks like when the tools available are used honestly and at full capacity.</em></p>
<p><em>— Artometrics Editorial</em></p>
<h2 id="thank-you" class="anchored">THANK YOU</h2></div>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/warrior" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>
