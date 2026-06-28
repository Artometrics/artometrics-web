---
title: "ANIME: The Artometrics of Japanese Animation"
slug: anime
pubDate: 2026-03-31
description: "13,631 Titles. A Century Of Data. One Question: What Does The MyAnimeList Archive Actually Tell Us About How Anime Works As An Industry?"
heroImage: /images/content/2026/04/IMG_4151.webp
tags: [culture]
draft: false
---

<style>
.art-p {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.05rem;
  line-height: 1.85;
  color: #1C1C1E;
  max-width: 680px;
  margin: 0 auto 1.4rem auto;
  text-align: center;
}
.art-p a { color: #C0392B; text-decoration: none; }
.art-p a:hover { text-decoration: underline; }

.facts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 24px auto 32px auto;
  max-width: 860px;
}
.fact-box {
  background: #F2F0EB;
  border-left: 4px solid #C0392B;
  padding: 18px 20px;
  border-radius: 2px;
  text-align: left;
}
.fact-number {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: #C0392B;
  line-height: 1.1;
  margin-bottom: 6px;
  font-family: Helvetica, sans-serif;
}
.fact-label {
  display: block;
  font-size: 0.82rem;
  color: #6B6B6B;
  line-height: 1.45;
  font-family: Helvetica, sans-serif;
}
@media (max-width: 700px) {
  .facts-grid { grid-template-columns: 1fr 1fr; }
}

.art-code-block {
  margin: 0.8rem auto 1rem;
  max-width: 860px;
  text-align: center;
}
.art-code-block details { text-align: left; }
.art-code-summary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #6B6B6B;
  letter-spacing: 0.5px;
  cursor: pointer;
  list-style: none;
  padding: 8px 16px;
  background: #F2F0EB;
  border: 1px solid #D5D5D5;
  border-radius: 4px;
  margin-top: 0.5rem;
}
.art-code-summary::-webkit-details-marker { display: none; }
.art-code-summary:hover { color: #C0392B; border-color: #C0392B; }
.art-code-pre {
  background: #F2F0EB;
  border: 1px solid #D5D5D5;
  border-left: 3px solid #2C3E6B;
  border-radius: 0 0 4px 4px;
  padding: 1rem 1.2rem;
  font-family: 'DM Mono', 'Courier New', monospace;
  font-size: 0.78rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0 0 0.5rem;
  white-space: pre;
  text-align: left;
}
.art-lang-tag {
  display: inline-block;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 3px;
}
.art-lang-sql    { background: #2C3E6B; color: #fff; }
.art-lang-python { background: #2E7D32; color: #fff; }
.art-lang-r      { background: #C0392B; color: #fff; }

.art-github-btn {
  display: inline-block;
  margin: 2rem auto 1rem;
  padding: 12px 28px;
  background: #1C1C1E;
  color: #FAFAF8;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 3px;
  transition: background 0.15s;
}
.art-github-btn:hover { background: #C0392B; color: #fff; }
</style>



<p style="font-family:'DM Sans',sans-serif;font-size:1rem;line-height:1.8;color:#1C1C1E;max-width:680px;margin:0 auto 1.2rem;text-align:left;">This MyAnimeList dataset covers 13,631 unique anime titles spanning 1917 to 2019 — a century-scale archive tracing the medium from prewar theater shorts to the standardized streaming machine of the 2010s. The key interpretive move here is separating <strong>catalog reality</strong> (what actually got made) from <strong>fan-canon popularity</strong> (what people actually watched and rated). Those two things rhyme, but they are not the same thing, and the gap between them is where the most interesting analysis lives.</p>

<p style="font-family:'DM Sans',sans-serif;font-size:1rem;line-height:1.8;color:#1C1C1E;max-width:680px;margin:0 auto 1.2rem;text-align:left;">The overall median MAL score is 6.38. That is the calibration point for everything that follows. A 6.38 is not a failure — it is the mathematical center of a platform where over 13,000 titles compete for attention. When comparing studios, formats, and genres throughout this report, the question is never who broke 8.0 once. It is who stayed above 6.38 consistently, across volume. That is a far harder problem, and most studios never solve it.</p>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="fast-facts" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">FAST FACTS</span></h2>
                    
                    
                </div>
            </div>
        </div>

<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">13,631</span>
    <span class="fact-label">Unique anime titles in the dataset — from silent-era shorts to modern streaming originals</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">6.38</span>
    <span class="fact-label">Overall median MAL score — the mathematical baseline every studio and genre is measured against</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">8.12%</span>
    <span class="fact-label">Share of TV anime scoring 8+ on MAL — the highest prestige hit-rate of any format (346 out of 4,260 titles)</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">90</span>
    <span class="fact-label">High-scoring shows buried past popularity rank 2,000 — the titles the algorithm never surfaced</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">0.389</span>
    <span class="fact-label">Pearson correlation between score and members — popularity predicts quality directionally, not precisely</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">2006</span>
    <span class="fact-label">The Haruhi inflection point — when light novels became the anime industry's primary outsourced R&D pipeline</span>
  </div>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="dataset-context" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">DATASET CONTEXT</span></h2>
                    
                    
                </div>
            </div>
        </div>

<div class="art-section-prose">
<p class="art-p">The source data is the MyAnimeList TidyTuesday release from April 23, 2019, maintained by the R for Data Science community. It contains scraped records for 13,631 unique anime titles with fields for format type, source material, episode count, content rating, genre tags, studio attribution, MAL score, member count, favorites count, and air date range. The data covers titles from 1917 through early 2019.</p>

<p class="art-p">The dataset requires meaningful cleaning before analysis. Air dates arrive as unstructured strings and must be parsed via regex to extract start and end year. Genre, studio, and producer fields are stored as Python-style list strings — bracket-delimited, comma-separated — that must be split and unnested into long-format tables for aggregation. Any title with a rank or popularity of zero is excluded, as these represent incomplete records without enough community engagement to produce reliable metrics.</p>

<p class="art-p">Scores on MAL are user-submitted on a 1–10 scale. The platform has a known self-selection bias: its userbase skews adult, male, and English-speaking relative to anime's actual global audience. This produces systematic underscoring of children's content and promotional music videos, and potential overrepresentation of properties with strong Western fandom overlap. The dataset also predates the post-2019 streaming era — <em>Demon Slayer</em>, <em>Jujutsu Kaisen</em>, <em>Chainsaw Man</em> are absent — which means any claims about current genre trends require updating.</p>

<p class="art-p">Genre tags are not mutually exclusive. A title tagged both "Action" and "Military" contributes to both genre aggregations. Studio medians for boutique operations (n &lt; 30) are statistically fragile — a single poor season can meaningfully shift the result. The popularity rank field runs inversely: rank 1 is the <em>most</em> popular title in the dataset.</p>
</div>

<div class="art-code-block">
  <details>
    <summary><span class="art-lang-tag art-lang-sql">SQL</span> &nbsp;View dataset queries</summary>
    <pre class="art-code-pre">-- Anime Dataset: Core Aggregations
-- Source: MyAnimeList via TidyTuesday (April 23, 2019)
-- Display-only — analysis runs in R; SQL documents the logic

-- ── 1. Format Hit-Rates ────────────────────────────────────────────
WITH format_counts AS (
  SELECT
    type,
    COUNT(*)                                        AS total_shows,
    SUM(CASE WHEN score >= 8 THEN 1 ELSE 0 END)    AS elite_shows
  FROM anime
  WHERE rank       != 0
    AND popularity != 0
  GROUP BY type
)
SELECT
  type,
  total_shows,
  elite_shows,
  ROUND(CAST(elite_shows AS FLOAT) / total_shows * 100, 2) AS elite_pct
FROM format_counts
WHERE total_shows > 100
ORDER BY elite_pct DESC;

-- Result: TV leads at 8.12% (346/4,260). Movie at 4.82%.
-- ONA at 1.21%, catalog still maturing. Music at 0.20%.

-- ── 2. Top Genres by Average Score (min 500 titles) ───────────────
SELECT
  g.genre,
  COUNT(a.animeID)        AS volume,
  ROUND(AVG(a.score), 2)  AS avg_score
FROM anime_genres g
JOIN anime a ON g.animeID = a.animeID
WHERE a.score > 0
GROUP BY g.genre
HAVING volume > 500
ORDER BY avg_score DESC
LIMIT 5;

-- Result: Mystery leads at 7.14 across 605 titles.
-- Shounen at 7.02 across 1,770 — scale without quality dilution.

-- ── 3. Studio Consistency (min 20 titles) ─────────────────────────
SELECT
  s.studio,
  COUNT(a.animeID)              AS n_titles,
  ROUND(AVG(a.score), 2)        AS avg_score
FROM anime_studios s
JOIN anime a ON s.animeID = a.animeID
WHERE a.score > 0
GROUP BY s.studio
HAVING n_titles >= 20
ORDER BY avg_score DESC
LIMIT 10;</pre>
  </details>
</div>

<div class="art-code-block">
  <details>
    <summary><span class="art-lang-tag art-lang-python">Python</span> &nbsp;View EDA notebook</summary>
    <pre class="art-code-pre"># Anime — Artometrics Python EDA
# Purpose: Dataset diagnostics before R chart build
# Source: MyAnimeList via TidyTuesday (2019)

import pandas as pd
import numpy as np

url = (
    "https://raw.githubusercontent.com/rfordatascience/"
    "tidytuesday/main/data/2019/2019-04-23/raw_anime.csv"
)
df = pd.read_csv(url)

# Filter incomplete records (mirrors R wrangle chunk)
df_clean = df[(df["rank"] != 0) & (df["popularity"] != 0)].copy()
df_clean = df_clean.drop_duplicates(subset="animeID")

print(f"Raw titles:    {len(df):,}")
print(f"After filter:  {len(df_clean):,}")
# Raw: 14,478 | After filter: 13,631

# Correlation matrix
valid = df_clean[df_clean["score"] > 0]
cols = ["score", "members", "favorites", "episodes"]
print(valid[cols].corr().round(3))
# score ↔ members:    r = 0.389
# members ↔ favorites: r = 0.776
# score ↔ episodes:   r = 0.076

# Cult classic filter — high score, low visibility
cult = df_clean[
    (df_clean["score"]      > 8.0)  &
    (df_clean["popularity"] > 2000) &
    (df_clean["members"]    > 10000)
]
print(f"Cult classics found: {len(cult)}")
# 90 titles score above 8.0 past popularity rank 2,000</pre>
  </details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="an-industry-that-diversified" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">AN INDUSTRY THAT DIVERSIFIED</span></h2>
                    
                    
                </div>
            </div>
        </div><figure class="kg-card kg-image-card"><img src="/images/content/2026/04/chart1_releases_by_year-4.png" class="kg-image" alt="" loading="lazy" width="2000" height="1167" srcset="/images/content/size/w600/2026/04/chart1_releases_by_year-4.png 600w, /images/content/size/w1000/2026/04/chart1_releases_by_year-4.png 1000w, /images/content/size/w1600/2026/04/chart1_releases_by_year-4.png 1600w, /images/content/size/w2400/2026/04/chart1_releases_by_year-4.png 2400w" sizes="(min-width: 720px) 720px"></figure>

<div class="art-section-prose">
<p class="art-p">The release history of anime is not a single growth story — it is six separate ones running in parallel. <strong>Movies</strong> were the dominant format from the 1920s through the 1970s, a low-volume craft economy built for theater. The first structural break arrived in the late 1980s, when the <strong>OVA</strong> boom gave creators a direct-to-consumer channel that bypassed TV censors entirely. OVA peaked around 1990, then collapsed as TV economics took over.</p>

<p class="art-p"><strong>TV</strong> is the modern engine. It industrialized in the late 1990s and has compounded steadily since. <strong>Specials</strong> peaked in the mid-2000s as a franchise extension format, then plateaued. <strong>Music</strong> videos spiked dramatically in the 2010s — largely driven by short promotional content — and then fell just as fast. The most important line on this chart is <strong>ONA</strong>: near-zero before 2010, then a vertical ascent. That is not a genre trend. It is a platform shift. Netflix, Crunchyroll, and YouTube did not just distribute anime — they created a new format category.</p>

<p class="art-p">What the faceted view makes clear is that these formats are not competing for the same audience at the same time. They are sequential industrial experiments. Each one dominated its era, then either stabilized into a niche or was superseded by the next model. The industry did not simply grow — it restructured itself around whichever distribution channel controlled access to viewers.</p>
</div>

<div class="art-code-block">
  <details>
    <summary><span class="art-lang-tag art-lang-r">R</span> &nbsp;View chart code</summary>
    <pre class="art-code-pre">type_colors <- c(
  "TV"      = art_secondary,
  "Movie"   = art_highlight,
  "OVA"     = "#E67E22",
  "Special" = "#8E44AD",
  "ONA"     = "#16A085",
  "Music"   = art_mid
)

chart1_df <- anime %>%
  filter(!is.na(aired_from_year), type %in% names(type_colors)) %>%
  count(year = aired_from_year, type, name = "n")

start_year <- chart1_df %>%
  group_by(year) %>% summarise(total = sum(n)) %>%
  filter(total >= 10) %>% pull(year) %>% min()

chart1_df <- chart1_df %>%
  filter(year >= start_year, year <= max(year) - 1)

smooth_df <- chart1_df %>%
  group_by(type) %>%
  filter(n_distinct(year) >= 12) %>% ungroup()

ggplot(chart1_df, aes(x = year, y = n, color = type)) +
  geom_line(linewidth = 0.9, alpha = 0.65) +
  geom_smooth(data = smooth_df, se = FALSE, method = "loess",
              span = 0.35, linewidth = 1.1) +
  facet_wrap(~ type, scales = "free_y", ncol = 3) +
  scale_color_manual(values = type_colors, guide = "none") +
  theme_artometrics() +
  labs(
    title   = "An industry that industrialized — then diversified",
    x       = NULL, y = "Titles released",
    caption = "Source: MyAnimeList via TidyTuesday (2019) | — ARTOMETRICS"
  )

ggsave("chart1_releases_by_year.png", path = "charts",
       width = 12, height = 7, dpi = 300, bg = "white")</pre>
  </details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="consistency-across-volume-is-the-real-achievement" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">CONSISTENCY ACROSS VOLUME IS THE REAL ACHIEVEMENT</span></h2>
                    
                    
                </div>
            </div>
        </div><figure class="kg-card kg-image-card"><img src="/images/content/2026/04/chart2_studio_consistency.png" class="kg-image" alt="" loading="lazy" width="2000" height="1167" srcset="/images/content/size/w600/2026/04/chart2_studio_consistency.png 600w, /images/content/size/w1000/2026/04/chart2_studio_consistency.png 1000w, /images/content/size/w1600/2026/04/chart2_studio_consistency.png 1600w, /images/content/size/w2400/2026/04/chart2_studio_consistency.png 2400w" sizes="(min-width: 720px) 720px"></figure>

<div class="art-section-prose">
<p class="art-p">Every studio on this chart has produced at least one great show. That is not the achievement. The achievement is the <strong>IQR bar</strong> — the horizontal line showing the spread between the 25th and 75th percentile of a studio's scores. A tight bar at a high median means the studio's worst output is nearly as good as its best. <strong>Bones (n=115)</strong> leads in median and maintains a tight IQR across a massive catalog. <strong>White Fox (n=33)</strong> has the highest median dot but a wide IQR — the boutique model: fewer swings, but when they miss, they miss. <strong>Kyoto Animation (n=110)</strong> is the most consistent large studio on the chart: 110 titles with a tight IQR anchored well above the 6.38 baseline.</p>

<p class="art-p"><strong>Trigger (n=23)</strong> has the widest IQR — spanning from near the baseline to above 8.0. High-risk, high-reward. <strong>Studio Deen (n=264)</strong> is the industrial cautionary tale: the largest catalog on the chart and the lowest median. Volume without curation dilutes quality. <strong>A-1 Pictures (n=190)</strong> sits in the middle — a production machine that delivers reliable output at scale, occasionally punctuated by genuine hits.</p>

<p class="art-p">The viridis color scale maps TV share. Studios with higher TV share cluster in the middle — TV volume is the primary dilution mechanism. Boutique studios with low TV share show more extreme medians in both directions. The 6.38 dashed line is the dataset median. Every studio above it is beating the field. Most of them are doing it with fewer than 50 titles — which tells you exactly how hard it is to stay above average at scale.</p>
</div>

<div class="art-code-block">
  <details>
    <summary><span class="art-lang-tag art-lang-r">R</span> &nbsp;View chart code</summary>
    <pre class="art-code-pre">studio_summ <- anime_studios %>%
  distinct(animeID, studio) %>%
  inner_join(anime %>% distinct(animeID, score, type), by = "animeID") %>%
  filter(!is.na(studio), studio != "", !is.na(score), score > 0) %>%
  group_by(studio) %>%
  summarise(
    n_titles     = n(),
    median_score = median(score),
    q1           = quantile(score, 0.25),
    q3           = quantile(score, 0.75),
    tv_share     = mean(type == "TV"),
    .groups      = "drop"
  ) %>%
  filter(n_titles >= 20) %>%
  arrange(desc(median_score)) %>%
  slice_head(n = 20) %>%
  mutate(studio_label = paste0(studio, " (n=", n_titles, ")"))

ggplot(studio_summ,
       aes(y = reorder(studio_label, median_score), x = median_score)) +
  geom_errorbarh(aes(xmin = q1, xmax = q3),
                 height = 0, linewidth = 0.7, color = art_mid) +
  geom_point(aes(size = n_titles, color = tv_share), alpha = 0.95) +
  geom_vline(xintercept = 6.38, linetype = "dashed",
             linewidth = 0.7, color = art_highlight, alpha = 0.7) +
  scale_color_viridis_c(option = "D",
                        labels = percent_format(accuracy = 1),
                        name = "TV share") +
  theme_artometrics() +
  labs(
    title   = "Bones and KyoAni lead — consistency across volume is the real achievement",
    x       = "Median MAL score", y = NULL,
    caption = "Source: MyAnimeList via TidyTuesday (2019) | — ARTOMETRICS"
  )

ggsave("chart2_studio_consistency.png", path = "charts",
       width = 12, height = 7, dpi = 300, bg = "white")</pre>
  </details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="whats-popular-vs-whats-well-rated" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">WHAT'S POPULAR VS WHAT'S WELL RATED?</span></h2>
                    
                    
                </div>
            </div>
        </div><figure class="kg-card kg-image-card"><img src="/images/content/2026/04/chart3_genre_map.png" class="kg-image" alt="" loading="lazy" width="2000" height="1167" srcset="/images/content/size/w600/2026/04/chart3_genre_map.png 600w, /images/content/size/w1000/2026/04/chart3_genre_map.png 1000w, /images/content/size/w1600/2026/04/chart3_genre_map.png 1600w, /images/content/size/w2400/2026/04/chart3_genre_map.png 2400w" sizes="(min-width: 720px) 720px"></figure>

<div class="art-section-prose">
<p class="art-p">The genre map plots every major genre against two axes: how popular its titles are (X, log-reversed so most popular is right), and how well-rated they are (Y). Size encodes volume. The <strong>Main Hall</strong> — Action, Comedy, Fantasy, Adventure — sits in the dense center-right cluster. Massive reach, enormous volume, medians diluted to the mid-6s by sheer output. These are the genres that define what most people think anime is.</p>

<p class="art-p">The <strong>Curator's Rooms</strong> are the upper-left quadrant. <strong>Thriller</strong> sits alone at the top: highest median on the chart (~7.5), extremely low popularity rank. The genre barely exists by volume, but almost everything made in it is exceptional. <strong>Mystery</strong> and <strong>Psychological</strong> follow the same pattern — high score, mid-obscurity — which aligns with their SQL performance. <strong>Historical</strong> sits far right: highly rated but ignored algorithmically. The starkest bottom outlier is <strong>Dementia</strong>: low popularity, low score, tiny volume.</p>

<p class="art-p"><strong>Kids</strong> and <strong>Music</strong> are the bottom-right anchors — widest audiences, lowest scores. This is the self-selection problem in reverse: the MAL platform's adult userbase applying adult critical frameworks to children's media and promotional content. The scores are not wrong given who is rating them. They are simply the wrong instrument for the material. The genre map's quadrant structure is the clearest single visualization of what the platform is: a tool built by and for a specific audience, measuring everything — including content that was never made for them — against that audience's preferences.</p>
</div>

<div class="art-code-block">
  <details>
    <summary><span class="art-lang-tag art-lang-r">R</span> &nbsp;View chart code</summary>
    <pre class="art-code-pre">genre_stats <- anime_genres %>%
  distinct(animeID, genre) %>%
  filter(genre != "") %>%
  inner_join(
    anime %>% select(animeID, score, popularity) %>%
      filter(score > 0, popularity > 0),
    by = "animeID"
  ) %>%
  group_by(genre) %>%
  summarise(
    n_titles  = n_distinct(animeID),
    score_med = median(score),
    pop_med   = median(popularity),
    .groups   = "drop"
  ) %>%
  filter(n_titles >= 80)

ggplot(genre_stats,
       aes(x = pop_med, y = score_med, size = n_titles)) +
  geom_vline(xintercept = median(genre_stats$pop_med),
             linetype = "dashed", color = art_mid, alpha = 0.4) +
  geom_hline(yintercept = median(genre_stats$score_med),
             linetype = "dashed", color = art_mid, alpha = 0.4) +
  geom_point(color = art_secondary, alpha = 0.6) +
  scale_x_reverse(trans = "log10", labels = comma) +
  geom_text_repel(aes(label = genre), size = 3.2,
                  color = art_dark, max.overlaps = Inf,
                  show.legend = FALSE) +
  theme_artometrics() +
  labs(
    title   = "Genre map: what's popular vs what's well-rated?",
    x       = "Median popularity rank (log scale; left = most popular)",
    y       = "Median MAL score",
    caption = "Source: MyAnimeList via TidyTuesday (2019) | — ARTOMETRICS"
  )

ggsave("chart3_genre_map.png", path = "charts",
       width = 12, height = 7, dpi = 300, bg = "white")</pre>
  </details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="limitation" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">LIMITATION</span></h2>
                    
                    
                </div>
            </div>
        </div>

<div class="art-section-prose">
<p class="art-p">The dataset ends in April 2019. <em>Demon Slayer</em>, <em>Jujutsu Kaisen</em>, <em>Chainsaw Man</em>, <em>Spy × Family</em> are entirely absent. Their exclusion almost certainly understates ONA growth, understates action/Shounen dominance, and means any claims about current genre trends require updating against the post-2019 streaming landscape. The industry restructured significantly around Netflix and Crunchyroll originals after this cutoff — the format and source material charts would look different with five more years of data.</p>

<p class="art-p">MyAnimeList is an enthusiast platform. Its userbase skews adult, male, and English-speaking relative to anime's actual global audience. Two direct consequences appear in the data: Kids and Music programming are systematically underscored because the rating population is not the target demographic, and shows with strong Western fandom overlap (<em>Fullmetal Alchemist: Brotherhood</em>, <em>Death Note</em>) may be overrepresented in the elite tiers. The platform measures what its users value, which is not the same as what anime's full global audience values.</p>

<p class="art-p">Genre tags are not mutually exclusive, and studio medians for boutique operations (n &lt; 30) are statistically fragile. White Fox's strong studio ranking rests on 33 titles — a single poor season could meaningfully shift it. Thriller's top-ranked genre position rests on a small title count. Both results are directionally interesting and statistically fragile, and should be read as signals worth investigating rather than settled conclusions.</p>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="conclusion" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">CONCLUSION</span></h2>
                    
                    
                </div>
            </div>
        </div>

<div class="art-section-prose">
<p class="art-p">Anime transformed its distribution model three times in a century: from a <strong>theatrical craft economy</strong> built for prewar audiences, to a <strong>home-video OVA market</strong> that bypassed broadcast entirely, to an <strong>industrialized TV machine</strong> running on seasonal 12-episode contracts, and finally into a <strong>diversified platform ecosystem</strong> where ONA and streaming have created a fourth distribution channel that did not exist before 2010. Each transition was driven by access — whoever controlled the path to viewers controlled the format that dominated production.</p>

<p class="art-p">Through all of it, two structural facts held. <strong>TV is the primary engine for quality output</strong> — 8.12% hit-rate, the highest of any format, confirmed by both the SQL aggregation and the genre map's quadrant structure. And <strong>popularity and quality are correlated but not causal</strong> — the feedback loop runs both directions, the algorithm amplifies existing popularity rather than discovering hidden quality, and the score-members correlation of r = 0.389 confirms the relationship is real but far from deterministic.</p>

<p class="art-p">Ninety high-scoring titles sit past popularity rank 2,000 — past the point any algorithm will surface them. The catalog is vast. The attention economy is ruthless. If you want the best statistical odds, shop the seasonal TV hits in Mystery, Shounen, or Romance. But if you are willing to walk past the algorithm's edge, there are 90 titles waiting with scores above 8.0 and audiences small enough that they never quite made the trending list.</p>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="references" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">REFERENCES</span></h2>
                    
                    
                </div>
            </div>
        </div>

<div class="art-section-prose">
<p class="art-p">MyAnimeList Dataset (2019). TidyTuesday, April 23, 2019. Retrieved from: <a href="https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-04-23" style="color:#C0392B;">github.com/rfordatascience/tidytuesday</a></p>

<p class="art-p">MyAnimeList. (n.d.). <em>About MyAnimeList</em>. Retrieved from <a href="https://myanimelist.net/about.php" style="color:#C0392B;">myanimelist.net/about.php</a></p>

<p class="art-p">Clements, J., & McCarthy, H. (2015). <em>The Anime Encyclopedia: A Century of Japanese Animation</em> (3rd ed.). Stone Bridge Press.</p>

<p class="art-p">Condry, I. (2013). <em>The Soul of Anime: Collaborative Creativity and Japan's Media Success Story</em>. Duke University Press.</p>

<p class="art-p">Denison, R. (2015). <em>Anime: A History</em>. BFI/Palgrave Macmillan.</p>

<p class="art-p">Steinberg, M. (2012). <em>Anime's Media Mix: Franchising Toys and Characters in Japan</em>. University of Minnesota Press.</p>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="editors-note" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">EDITOR'S NOTE</span></h2>
                    
                    
                </div>
            </div>
        </div>

<div class="art-section-prose">
<p class="art-p"><em>This report was researched, written, designed, and produced in active collaboration with Claude AI (Anthropic). The data pipeline, statistical analysis, chart design, written analysis, narrative structure, and visual styling were all developed through a directed partnership between human editorial judgment and AI execution. The research questions and brand vision are ours. The execution is a collaboration.</em></p>
<p class="art-p"><em>— Artometrics Editorial</em></p>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="thank-you-for-your-time-" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">THANK YOU FOR YOUR TIME :)</span></h2>
                    
                    
                </div>
            </div>
        </div>