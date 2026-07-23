---
title: What a Century of Anime Titles Reveals About the Industry
slug: anime
pubDate: 2026-03-31T00:00:00.000Z
description: >-
  MyAnimeList metadata on more than 13,000 titles traces Japanese animation as a
  production system.
heroImage: /images/content/articles/anime/hero.png
draft: false
tags:
  - arts
  - film
tldr: >-
  This MyAnimeList dataset covers 13,631 unique anime titles spanning 1917 to
  2019 — a century-scale archive tracing the medium from prewar theater shorts
  to the standardized streaming machine of the 2010s. The key interpretive move
  here is separating catalog reality (what actually got made) from fan-canon
  popularity (what people actually watched and rated).
keyPoints:
  - >-
    13,631 — Unique anime titles in the dataset — from silent-era shorts to
    modern streaming originals
  - >-
    6.38 — Overall median MAL score — the mathematical baseline every studio and
    genre is measured against
  - >-
    8.12% — Share of TV anime scoring 8+ on MAL — the highest prestige hit-rate
    of any format (346 out of 4,260 titles)
  - >-
    90 — High-scoring shows buried past popularity rank 2,000 — the titles the
    algorithm never surfaced
  - >-
    0.389 — Pearson correlation between score and members — popularity predicts
    quality directionally, not precisely
  - >-
    2006 — The Haruhi inflection point — when light novels became the anime
    industry&#39;s primary outsourced R&amp;D pipeline
faq:
  - question: >-
      What does the data show about An Industry That Industrialized — Then
      Diversified?
    answer: >-
      Key figure: 13,631 — Unique anime titles in the dataset — from silent-era
      shorts to modern streaming originals. The source data is the MyAnimeList
      TidyTuesday release from April 23, 2019, maintained by the R for Data
      Science community. It contains scraped records for 13,631 unique anime…
  - question: >-
      What does the data show about Bones and Kyoani Lead — Consistency Across
      Volume Is the Real Achievement?
    answer: >-
      Key figure: 6.38 — Overall median MAL score — the mathematical baseline
      every studio and genre is measured against. The source data is the
      MyAnimeList TidyTuesday release from April 23, 2019, maintained by the R
      for Data Science community. It contains scraped records for 13,631 unique
      anime…
  - question: 'Genre Map: What’s Popular vs What’s Well-rated?'
    answer: >-
      Key figure: 8.12% — Share of TV anime scoring 8+ on MAL — the highest
      prestige hit-rate of any format (346 out of 4,260 titles). The source data
      is the MyAnimeList TidyTuesday release from April 23, 2019, maintained by
      the R for Data Science community. It contains scraped records for 13,631
      unique anime…
  - question: What this file cannot tell you?
    answer: >-
      Key figure: 90 — High-scoring shows buried past popularity rank 2,000 —
      the titles the algorithm never surfaced. The source data is the
      MyAnimeList TidyTuesday release from April 23, 2019, maintained by the R
      for Data Science community. It contains scraped records for 13,631 unique
      anime…
---
<div id="quarto-content">
<main class="art-article-main">
<p class="art-p">This MyAnimeList dataset covers 13,631 unique anime titles spanning 1917 to 2019 — a century-scale archive tracing the medium from prewar theater shorts to the standardized streaming machine of the 2010s. The key interpretive move here is separating catalog reality (what actually got made) from fan-canon popularity (what people actually watched and rated). Those two things rhyme, but they are not the same thing, and the gap between them is where the most interesting analysis lives.</p>
<p class="art-p">The overall median MAL score is 6.38. That is the calibration point for everything that follows. A 6.38 is not a failure — it is the mathematical center of a platform where over 13,000 titles compete for attention. When comparing studios, formats, and genres throughout this piece, the question is never who broke 8.0 once. It is who stayed above 6.38 consistently, across volume. That is a far harder problem, and most studios never solve it.</p>
<h2 id="fast-facts" class="anchored">Fast facts</h2>
<p class="art-p">The numbers that set the scale for this report:</p>
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
<h2 id="data-and-method" class="anchored">Data and method</h2>
<p class="art-p">The source data is the MyAnimeList TidyTuesday release from April 23, 2019, maintained by the R for Data Science community. It contains scraped records for 13,631 unique anime titles with fields for format type, source material, episode count, content rating, genre tags, studio attribution, MAL score, member count, favorites count, and air date range. The data covers titles from 1917 through early 2019.</p>
<p class="art-p">The dataset requires meaningful cleaning before analysis. Air dates arrive as unstructured strings and must be parsed via regex to extract start and end year. Genre, studio, and producer fields are stored as Python-style list strings — bracket-delimited, comma-separated — that must be split and unnested into long-format tables for aggregation. Any title with a rank or popularity of zero is excluded, as these represent incomplete records without enough community engagement to produce reliable metrics.</p>
<p class="art-p">Scores on MAL are user-submitted on a 1–10 scale. The platform has a known self-selection bias: its userbase skews adult, male, and English-speaking relative to anime’s actual global audience. This produces systematic underscoring of children’s content and promotional music videos, and potential overrepresentation of properties with strong Western fandom overlap. The dataset also predates the post-2019 streaming era — Demon Slayer , Jujutsu Kaisen , Chainsaw Man are absent — which means any claims about current genre trends require updating.</p>
<h2 id="an-industry-that-industrialized-then-diversified" class="anchored">An Industry That Industrialized — Then Diversified</h2>
<h3 id="an-industry-that-industrialized-then-diversified-look" class="anchored">Releases By Year</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/anime/charts/chart1_releases_by_year.plotly.json" data-fallback="/images/content/articles/anime/charts/chart1_releases_by_year.png" role="img" aria-label="Releases By Year"></div>
</figure>
<p class="art-p">The release history of anime is not a single growth story — it is six separate ones running in parallel. Movies were the dominant format from the 1920s through the 1970s, a low-volume craft economy built for theater. The first structural break arrived in the late 1980s, when the OVA boom gave creators a direct-to-consumer channel that bypassed TV censors entirely. OVA peaked around 1990, then collapsed as TV economics took over.</p>
<p class="art-p">TV is the modern engine. It industrialized in the late 1990s and has compounded steadily since. Specials peaked in the mid-2000s as a franchise extension format, then plateaued. Music videos spiked dramatically in the 2010s — largely driven by short promotional content — and then fell just as fast. The most important line on this chart is ONA : near-zero before 2010, then a vertical ascent. That is not a genre trend. It is a platform shift. Netflix, Crunchyroll, and YouTube did not just distribute anime — they created a new format category.</p>
<p class="art-p">What the faceted view makes clear is that these formats are not competing for the same audience at the same time. They are sequential industrial experiments. Each one dominated its era, then either stabilized into a niche or was superseded by the next model. The industry did not simply grow — it restructured itself around whichever distribution channel controlled access to viewers.</p>

<h2 id="bones-and-kyoani-lead-consistency-across-volume-is-the-real-" class="anchored">Bones and Kyoani Lead — Consistency Across Volume Is the Real Achievement</h2>
<h3 id="bones-and-kyoani-lead-consistency-across-volume-is-the-real--look" class="anchored">Studio Consistency</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/anime/charts/chart2_studio_consistency.plotly.json" data-fallback="/images/content/articles/anime/charts/chart2_studio_consistency.png" role="img" aria-label="Studio Consistency"></div>
</figure>
<p class="art-p">Every studio on this chart has produced at least one great show. That is not the achievement. The achievement is the IQR bar — the horizontal line showing the spread between the 25th and 75th percentile of a studio’s scores. A tight bar at a high median means the studio’s worst output is nearly as good as its best. Bones (n=115) leads in median and maintains a tight IQR across a massive catalog. White Fox (n=33) has the highest median dot but a wide IQR — the boutique model: fewer swings, but when they miss, they miss. Kyoto Animation (n=110) is the most consistent large studio on the chart: 110 titles with a tight IQR anchored well above the 6.38 baseline.</p>
<p class="art-p">Trigger (n=23) has the widest IQR — spanning from near the baseline to above 8.0. High-risk, high-reward. Studio Deen (n=264) is the industrial cautionary tale: the largest catalog on the chart and the lowest median. Volume without curation dilutes quality. A-1 Pictures (n=190) sits in the middle — a production machine that delivers reliable output at scale, occasionally punctuated by genuine hits.</p>
<p class="art-p">The viridis color scale maps TV share. Studios with higher TV share cluster in the middle — TV volume is the primary dilution mechanism. Boutique studios with low TV share show more extreme medians in both directions. The 6.38 dashed line is the dataset median. Every studio above it is beating the field. Most of them are doing it with fewer than 50 titles — which tells you exactly how hard it is to stay above average at scale.</p>

<h2 id="genre-map-what-s-popular-vs-what-s-well-rated" class="anchored">Genre Map: What’s Popular vs What’s Well-rated?</h2>
<h3 id="genre-map-what-s-popular-vs-what-s-well-rated-look" class="anchored">Genre Map</h3>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/anime/charts/chart3_genre_map.plotly.json" data-fallback="/images/content/articles/anime/charts/chart3_genre_map.png" role="img" aria-label="Genre Map"></div>
</figure>
<p class="art-p">The genre map plots every major genre against two axes: how popular its titles are (X, log-reversed so most popular is right), and how well-rated they are (Y). Size encodes volume. The Main Hall — Action, Comedy, Fantasy, Adventure — sits in the dense center-right cluster. Massive reach, enormous volume, medians diluted to the mid-6s by sheer output. These are the genres that define what most people think anime is.</p>
<p class="art-p">The Curator’s Rooms are the upper-left quadrant. Thriller sits alone at the top: highest median on the chart (~7.5), extremely low popularity rank. The genre barely exists by volume, but almost everything made in it is exceptional. Mystery and Psychological follow the same pattern — high score, mid-obscurity — which aligns with their SQL Query 2 performance. Historical sits far right: highly rated but ignored algorithmically despite strong critical reception. The starkest bottom outlier is Dementia : low popularity, low score, tiny volume.</p>
<p class="art-p">Kids and Music are the bottom-right anchors — widest audiences, lowest scores. This is the self-selection problem in reverse: the MAL platform’s adult userbase applying adult critical frameworks to children’s media and promotional content. The scores are not wrong given who is rating them. They are simply the wrong instrument for the material. The genre map’s quadrant structure is the clearest single visualization of what the platform is: a tool built by and for a specific audience, measuring everything — including content that was never made for them — against that audience’s preferences.</p>

<h2 id="what-this-file-cannot-tell-you" class="anchored">What this file cannot tell you</h2>
<p class="art-p">The dataset ends in April 2019. Demon Slayer , Jujutsu Kaisen , Chainsaw Man , Spy × Family are entirely absent. Their exclusion almost certainly understates ONA growth, understates action/Shounen dominance, and means any claims about current genre trends require updating against the post-2019 streaming landscape. The industry restructured significantly around Netflix and Crunchyroll originals after this cutoff — the format and source material charts would look different with five more years of data.</p>
<p class="art-p">MyAnimeList is an enthusiast platform. Its userbase skews adult, male, and English-speaking relative to anime’s actual global audience. Two direct consequences appear in the data: Kids and Music programming are systematically underscored because the rating population is not the target demographic, and shows with strong Western fandom overlap ( Fullmetal Alchemist: Brotherhood , Death Note ) may be overrepresented in the elite tiers. The platform measures what its users value, which is not the same as what anime’s full global audience values.</p>
<p class="art-p">Genre tags are not mutually exclusive, and studio medians for boutique operations (n &lt; 30) are statistically fragile. White Fox’s strong studio ranking rests on 33 titles — a single poor season could meaningfully shift it. Thriller’s top-ranked genre position rests on a small title count. Both results are directionally interesting and statistically fragile, and should be read as signals worth investigating rather than settled conclusions.</p>
<h2 id="what-to-take-away" class="anchored">What to take away</h2>
<p class="art-p">Anime transformed its distribution model three times in a century: from a theatrical craft economy built for prewar audiences, to a home-video OVA market that bypassed broadcast entirely, to an industrialized TV machine running on seasonal 12-episode contracts, and finally into a diversified platform ecosystem where ONA and streaming have created a fourth distribution channel that did not exist before 2010. Each transition was driven by access — whoever controlled the path to viewers controlled the format that dominated production.</p>
<p class="art-p">Through all of it, two structural facts held. TV is the primary engine for quality output — 8.12% hit-rate, the highest of any format, confirmed by both the SQL aggregation and the genre map’s quadrant structure. And popularity and quality are correlated but not causal — the feedback loop runs both directions, the algorithm amplifies existing popularity rather than discovering hidden quality, and the score-members correlation of r = 0.389 confirms the relationship is real but far from deterministic.</p>
<p class="art-p">Ninety high-scoring titles sit past popularity rank 2,000 — past the point any algorithm will surface them. The catalog is vast. The attention economy is ruthless. If you want the best statistical odds, shop the seasonal TV hits in Mystery, Shounen, or Romance — the three genres with the highest average scores above 500 titles. But if you are willing to walk past the algorithm’s edge, there are 90 titles waiting with scores above 8.0 and audiences small enough that they never quite made the trending list.</p>
<h2 id="sources" class="anchored">Sources</h2>

<p>MyAnimeList Dataset (2019). TidyTuesday, April 23, 2019. Retrieved from: https://github.com/rfordatascience/tidytuesday/tree/main/data/2019/2019-04-23</p>
<p>MyAnimeList. (n.d.). <em>About MyAnimeList</em>. Retrieved from https://myanimelist.net/about.php</p>
<p>Clements, J., &amp; McCarthy, H. (2015). <em>The Anime Encyclopedia: A Century of Japanese Animation</em> (3rd ed.). Stone Bridge Press.</p>
<p>Condry, I. (2013). <em>The Soul of Anime: Collaborative Creativity and Japan’s Media Success Story</em>. Duke University Press.</p>
<p>Denison, R. (2015). <em>Anime: A History</em>. BFI/Palgrave Macmillan.</p>
<p>Steinberg, M. (2012). <em>Anime’s Media Mix: Franchising Toys and Characters in Japan</em>. University of Minnesota Press.</p>

<h2 id="editor-s-note" class="anchored">Editor’s note</h2>
<div class="art-editorial-note"><p><em>This report was researched, written, designed, and produced in active collaboration with Claude AI (Anthropic). The data pipeline, statistical analysis, chart design, written analysis, narrative structure, and visual styling were all developed through a directed partnership between human editorial judgment and AI execution. The research questions and brand vision are ours. The execution is a collaboration.</em></p>
<p><em>— Artometrics Editorial</em></p></div>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/anime" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>
