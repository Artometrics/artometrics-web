---
title: What a Century of Anime Titles Reveals About the Industry
slug: anime
pubDate: 2026-03-31T00:00:00.000Z
description: >-
  MyAnimeList metadata on more than 13,000 titles traces Japanese animation as a
  production system.
heroImage: /images/content/2026/04/IMG_4151.webp
tags:
  - movies-tv
draft: false
---
<div id="quarto-content">

<main class="art-article-main">
<p>This MyAnimeList dataset covers 13,631 unique anime titles spanning 1917 to 2019 — a century-scale archive tracing the medium from prewar theater shorts to the standardized streaming machine of the 2010s. The key interpretive move here is separating <strong>catalog reality</strong> (what actually got made) from <strong>fan-canon popularity</strong> (what people actually watched and rated). Those two things rhyme, but they are not the same thing, and the gap between them is where the most interesting analysis lives.</p>
<p>The overall median MAL score is 6.38. That is the calibration point for everything that follows. A 6.38 is not a failure — it is the mathematical center of a platform where over 13,000 titles compete for attention. When comparing studios, formats, and genres throughout this report, the question is never who broke 8.0 once. It is who stayed above 6.38 consistently, across volume. That is a far harder problem, and most studios never solve it.</p>
<h2 id="fast-facts" class="anchored">At a glance</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">13,631</span>
    <span class="fact-label">Unique anime titles in the
    dataset — from silent-era shorts to modern streaming
    originals</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">6.38</span>
    <span class="fact-label">Overall median MAL score —
    the mathematical baseline every studio and genre is
    measured against</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">8.12%</span>
    <span class="fact-label">Share of TV anime scoring 8+
    on MAL — the highest prestige hit-rate of any format
    (346 out of 4,260 titles)</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">90</span>
    <span class="fact-label">High-scoring shows buried past
    popularity rank 2,000 — the titles the algorithm
    never surfaced</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">0.389</span>
    <span class="fact-label">Pearson correlation between
    score and members — popularity predicts quality
    directionally, not precisely</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">2006</span>
    <span class="fact-label">The Haruhi inflection point —
    when light novels became the anime industry&#39;s primary
    outsourced R&amp;D pipeline</span>
  </div>
</div>
<h2 id="dataset-context" class="anchored">The data</h2>
<p>The source data is the MyAnimeList TidyTuesday release from April 23, 2019, maintained by the R for Data Science community. It contains scraped records for 13,631 unique anime titles with fields for format type, source material, episode count, content rating, genre tags, studio attribution, MAL score, member count, favorites count, and air date range. The data covers titles from 1917 through early 2019.</p>
<p>The dataset requires meaningful cleaning before analysis. Air dates arrive as unstructured strings and must be parsed via regex to extract start and end year. Genre, studio, and producer fields are stored as Python-style list strings — bracket-delimited, comma-separated — that must be split and unnested into long-format tables for aggregation. Any title with a rank or popularity of zero is excluded, as these represent incomplete records without enough community engagement to produce reliable metrics.</p>
<p>Scores on MAL are user-submitted on a 1–10 scale. The platform has a known self-selection bias: its userbase skews adult, male, and English-speaking relative to anime’s actual global audience. This produces systematic underscoring of children’s content and promotional music videos, and potential overrepresentation of properties with strong Western fandom overlap. The dataset also predates the post-2019 streaming era — <em>Demon Slayer</em>, <em>Jujutsu Kaisen</em>, <em>Chainsaw Man</em> are absent — which means any claims about current genre trends require updating.</p>
<p>Genre tags are not mutually exclusive. A title tagged both “Action” and “Military” contributes to both genre aggregations. Studio medians for boutique operations (n &lt; 30) are statistically fragile — a single poor season can meaningfully shift the result. The popularity rank field runs inversely: rank 1 is the <em>most</em> popular title in the dataset.</p>

<h2 id="an-industry-that-industrialized-then-diversified" class="anchored">AN INDUSTRY THAT INDUSTRIALIZED — THEN DIVERSIFIED</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/anime/charts/chart1_releases_by_year.plotly.json" data-fallback="/images/content/articles/anime/charts/chart1_releases_by_year.png" role="img" aria-label="Releases By Year"></div>
</figure>
</div>
</div>
</div>
<p>The release history of anime is not a single growth story — it is six separate ones running in parallel. <strong>Movies</strong> were the dominant format from the 1920s through the 1970s, a low-volume craft economy built for theater. The first structural break arrived in the late 1980s, when the <strong>OVA</strong> boom gave creators a direct-to-consumer channel that bypassed TV censors entirely. OVA peaked around 1990, then collapsed as TV economics took over.</p>
<p><strong>TV</strong> is the modern engine. It industrialized in the late 1990s and has compounded steadily since. <strong>Specials</strong> peaked in the mid-2000s as a franchise extension format, then plateaued. <strong>Music</strong> videos spiked dramatically in the 2010s — largely driven by short promotional content — and then fell just as fast. The most important line on this chart is <strong>ONA</strong>: near-zero before 2010, then a vertical ascent. That is not a genre trend. It is a platform shift. Netflix, Crunchyroll, and YouTube did not just distribute anime — they created a new format category.</p>
<p>What the faceted view makes clear is that these formats are not competing for the same audience at the same time. They are sequential industrial experiments. Each one dominated its era, then either stabilized into a niche or was superseded by the next model. The industry did not simply grow — it restructured itself around whichever distribution channel controlled access to viewers.</p>

<h2 id="bones-and-kyoani-lead-consistency-across-volume-is-the-real-achievement" class="anchored">BONES AND KYOANI LEAD — CONSISTENCY ACROSS VOLUME IS THE REAL ACHIEVEMENT</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/anime/charts/chart2_studio_consistency.plotly.json" data-fallback="/images/content/articles/anime/charts/chart2_studio_consistency.png" role="img" aria-label="Studio Consistency"></div>
</figure>
</div>
</div>
</div>
<p>Every studio on this chart has produced at least one great show. That is not the achievement. The achievement is the <strong>IQR bar</strong> — the horizontal line showing the spread between the 25th and 75th percentile of a studio’s scores. A tight bar at a high median means the studio’s worst output is nearly as good as its best. <strong>Bones (n=115)</strong> leads in median and maintains a tight IQR across a massive catalog. <strong>White Fox (n=33)</strong> has the highest median dot but a wide IQR — the boutique model: fewer swings, but when they miss, they miss. <strong>Kyoto Animation (n=110)</strong> is the most consistent large studio on the chart: 110 titles with a tight IQR anchored well above the 6.38 baseline.</p>
<p><strong>Trigger (n=23)</strong> has the widest IQR — spanning from near the baseline to above 8.0. High-risk, high-reward. <strong>Studio Deen (n=264)</strong> is the industrial cautionary tale: the largest catalog on the chart and the lowest median. Volume without curation dilutes quality. <strong>A-1 Pictures (n=190)</strong> sits in the middle — a production machine that delivers reliable output at scale, occasionally punctuated by genuine hits.</p>
<p>The viridis color scale maps TV share. Studios with higher TV share cluster in the middle — TV volume is the primary dilution mechanism. Boutique studios with low TV share show more extreme medians in both directions. The 6.38 dashed line is the dataset median. Every studio above it is beating the field. Most of them are doing it with fewer than 50 titles — which tells you exactly how hard it is to stay above average at scale.</p>

<h2 id="genre-map-whats-popular-vs-whats-well-rated" class="anchored">GENRE MAP: WHAT’S POPULAR VS WHAT’S WELL-RATED?</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/anime/charts/chart3_genre_map.plotly.json" data-fallback="/images/content/articles/anime/charts/chart3_genre_map.png" role="img" aria-label="Genre Map"></div>
</figure>
</div>
</div>
</div>
<p>The genre map plots every major genre against two axes: how popular its titles are (X, log-reversed so most popular is right), and how well-rated they are (Y). Size encodes volume. The <strong>Main Hall</strong> — Action, Comedy, Fantasy, Adventure — sits in the dense center-right cluster. Massive reach, enormous volume, medians diluted to the mid-6s by sheer output. These are the genres that define what most people think anime is.</p>
<p>The <strong>Curator’s Rooms</strong> are the upper-left quadrant. <strong>Thriller</strong> sits alone at the top: highest median on the chart (~7.5), extremely low popularity rank. The genre barely exists by volume, but almost everything made in it is exceptional. <strong>Mystery</strong> and <strong>Psychological</strong> follow the same pattern — high score, mid-obscurity — which aligns with their SQL Query 2 performance. <strong>Historical</strong> sits far right: highly rated but ignored algorithmically despite strong critical reception. The starkest bottom outlier is <strong>Dementia</strong>: low popularity, low score, tiny volume.</p>
<p><strong>Kids</strong> and <strong>Music</strong> are the bottom-right anchors — widest audiences, lowest scores. This is the self-selection problem in reverse: the MAL platform’s adult userbase applying adult critical frameworks to children’s media and promotional content. The scores are not wrong given who is rating them. They are simply the wrong instrument for the material. The genre map’s quadrant structure is the clearest single visualization of what the platform is: a tool built by and for a specific audience, measuring everything — including content that was never made for them — against that audience’s preferences.</p>

<h2 id="limitations" class="anchored">Caveats</h2>
<p>The dataset ends in April 2019. <em>Demon Slayer</em>, <em>Jujutsu Kaisen</em>, <em>Chainsaw Man</em>, <em>Spy × Family</em> are entirely absent. Their exclusion almost certainly understates ONA growth, understates action/Shounen dominance, and means any claims about current genre trends require updating against the post-2019 streaming landscape. The industry restructured significantly around Netflix and Crunchyroll originals after this cutoff — the format and source material charts would look different with five more years of data.</p>
<p>MyAnimeList is an enthusiast platform. Its userbase skews adult, male, and English-speaking relative to anime’s actual global audience. Two direct consequences appear in the data: Kids and Music programming are systematically underscored because the rating population is not the target demographic, and shows with strong Western fandom overlap (<em>Fullmetal Alchemist: Brotherhood</em>, <em>Death Note</em>) may be overrepresented in the elite tiers. The platform measures what its users value, which is not the same as what anime’s full global audience values.</p>
<p>Genre tags are not mutually exclusive, and studio medians for boutique operations (n &lt; 30) are statistically fragile. White Fox’s strong studio ranking rests on 33 titles — a single poor season could meaningfully shift it. Thriller’s top-ranked genre position rests on a small title count. Both results are directionally interesting and statistically fragile, and should be read as signals worth investigating rather than settled conclusions.</p>
<h2 id="conclusion" class="anchored">Bottom line</h2>
<p>Anime transformed its distribution model three times in a century: from a <strong>theatrical craft economy</strong> built for prewar audiences, to a <strong>home-video OVA market</strong> that bypassed broadcast entirely, to an <strong>industrialized TV machine</strong> running on seasonal 12-episode contracts, and finally into a <strong>diversified platform ecosystem</strong> where ONA and streaming have created a fourth distribution channel that did not exist before 2010. Each transition was driven by access — whoever controlled the path to viewers controlled the format that dominated production.</p>
<p>Through all of it, two structural facts held. <strong>TV is the primary engine for quality output</strong> — 8.12% hit-rate, the highest of any format, confirmed by both the SQL aggregation and the genre map’s quadrant structure. And <strong>popularity and quality are correlated but not causal</strong> — the feedback loop runs both directions, the algorithm amplifies existing popularity rather than discovering hidden quality, and the score-members correlation of r = 0.389 confirms the relationship is real but far from deterministic.</p>
<p>Ninety high-scoring titles sit past popularity rank 2,000 — past the point any algorithm will surface them. The catalog is vast. The attention economy is ruthless. If you want the best statistical odds, shop the seasonal TV hits in Mystery, Shounen, or Romance — the three genres with the highest average scores above 500 titles. But if you are willing to walk past the algorithm’s edge, there are 90 titles waiting with scores above 8.0 and audiences small enough that they never quite made the trending list.</p>
<h2 id="references" class="anchored">Sources</h2>
<p>MyAnimeList Dataset (2019). TidyTuesday, April 23, 2019. Retrieved from: https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-04-23</p>
<p>MyAnimeList. (n.d.). <em>About MyAnimeList</em>. Retrieved from https://myanimelist.net/about.php</p>
<p>Clements, J., &amp; McCarthy, H. (2015). <em>The Anime Encyclopedia: A Century of Japanese Animation</em> (3rd ed.). Stone Bridge Press.</p>
<p>Condry, I. (2013). <em>The Soul of Anime: Collaborative Creativity and Japan’s Media Success Story</em>. Duke University Press.</p>
<p>Denison, R. (2015). <em>Anime: A History</em>. BFI/Palgrave Macmillan.</p>
<p>Steinberg, M. (2012). <em>Anime’s Media Mix: Franchising Toys and Characters in Japan</em>. University of Minnesota Press.</p>
<h2 id="editors-note" class="anchored">EDITOR’S NOTE</h2><div class="art-editorial-note"><p><em>This report was researched, written, designed, and produced in active collaboration with Claude AI (Anthropic). The data pipeline, statistical analysis, chart design, written analysis, narrative structure, and visual styling were all developed through a directed partnership between human editorial judgment and AI execution. The research questions and brand vision are ours. The execution is a collaboration.</em></p>
<p><em>— Artometrics Editorial</em></p></div>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/anime" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>
