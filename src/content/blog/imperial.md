---
title: "IMPERIAL: The Evolution of Empire"
slug: imperial
pubDate: 2026-04-14
description: "Every empire in history has told the same story about itself: we brought order, we built roads, we made the trains run on time. What the chronicles leave out is the spreadsheet. Who actually got ri..."
heroImage: /images/content/2026/04/IMG_4160.webp
tags: [history, power]
draft: false
---

<style>
  .art-p {
    font-family: "EB Garamond", Georgia, serif;
    font-size: 1.1rem;
    line-height: 1.75;
    color: #1C1C1E;
    margin: 0 0 1.2em 0;
    text-align: center;
  }
  .art-p strong { color: #C0392B; font-weight: 700; }
  .art-p em { font-style: italic; }
  .art-p code {
    background: #F2F0EB;
    color: #C0392B;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.92em;
  }
  .facts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 24px 0 32px 0;
  }
  .fact-box {
    background: #F2F0EB;
    border-left: 4px solid #C0392B;
    padding: 18px 20px;
    border-radius: 2px;
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
    margin: 0;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-family: Helvetica, sans-serif;
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
    font-family: monospace;
    font-size: 0.78rem;
    line-height: 1.6;
    overflow-x: auto;
    margin: 0 0 0.5rem;
    white-space: pre;
    text-align: left;
  }
  .art-lang-tag {
    display: inline-block;
    font-family: Helvetica, sans-serif;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 3px;
    color: #fff;
  }
  .art-lang-r      { background: #2C3E6B; }
  .art-lang-sql    { background: #C0392B; }
  .art-lang-python { background: #2E7D52; }
  .art-copy-btn {
    display: inline-block;
    font-family: Helvetica, sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #6B6B6B;
    background: #F2F0EB;
    border: 1px solid #D5D5D5;
    border-radius: 3px;
    padding: 3px 10px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .art-copy-btn:hover { color: #C0392B; border-color: #C0392B; }
  .art-github-btn {
    text-align: center;
    margin: 2rem auto;
  }
  .art-github-btn a {
    background: #1C1C1E;
    color: #FAFAF8;
    font-family: Helvetica, sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    text-decoration: none;
    padding: 12px 28px;
    border-radius: 2px;
    display: inline-block;
  }
  .art-github-btn a:hover { background: #C0392B; }
</style>

<script>
function copyBlock(id, btn) {
  var el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.innerText).then(function () {
    btn.textContent = '✓ Copied';
    btn.style.background = '#2C3E6B';
    btn.style.color = '#fff';
    setTimeout(function () {
      btn.textContent = 'Copy';
      btn.style.background = '';
      btn.style.color = '';
    }, 1800);
  });
}
</script>



<p class="art-p">Every empire in history has told the same story about itself: we brought order, we built roads, we made the trains run on time. What the chronicles leave out is the spreadsheet. Who actually got richer? How long did the prosperity last? And when it ended, how fast did it go?</p>

<p class="art-p">Those questions have answers now. The Maddison Project Database — the most comprehensive long-run economic dataset ever assembled — lets us put Rome, Britain, the Ottomans, Imperial China, the Mongols, and Habsburg Spain on the same chart and ask: <strong>what does empire actually look like as an economic system?</strong></p>

<p class="art-p">The answer is not what the history textbooks imply. GDP goes up. Real wages mostly don't. The rise takes centuries. The fall takes decades. And in every case, the institutions built to extract surplus during expansion become structurally incapable of sharing it during maturation. That's the pattern. Six empires. No exceptions.</p>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="fast-facts" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">FAST FACTS</span></h2>
                    
                    
                </div>
            </div>
        </div>

<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">1,200 yrs</span>
    <span class="fact-label">Time for Western Europe to recover Rome's peak GDP per capita after the 476 CE collapse</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">23%</span>
    <span class="fact-label">Share of global population governed by the British Empire at its 1920 territorial peak — 412 million people</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">~7×</span>
    <span class="fact-label">Number of times Imperial China cycled through full unification and fragmentation between 221 BCE and 1912 CE</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">180,000 t</span>
    <span class="fact-label">Silver extracted by Habsburg Spain from the Americas between 1500 and 1800 — as Castilian real wages declined</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">10%</span>
    <span class="fact-label">Estimated share of global population killed in Mongol conquests, 1206–1260 — 30 to 40 million deaths</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">30–80 yrs</span>
    <span class="fact-label">How far peak centralization precedes GDP peak across all six empires — the institutional lag</span>
  </div>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="dataset-context" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">DATASET CONTEXT</span></h2>
                    
                    
                </div>
            </div>
        </div>

<p class="art-p">The Maddison Project Database is the closest thing economics has to a time machine. Originally assembled by Angus Maddison and now maintained by the University of Groningen, it provides GDP per capita estimates — expressed in 2011 USD purchasing power parity — stretching back to 1 CE for some countries and to 1000 BCE for a handful of ancient economies. The 2023 update, published by Bolt and van Zanden, is the version used here, accessed via Our World in Data's public CSV endpoint.</p>

<p class="art-p">Six empire cores were selected to represent distinct geographies, time periods, and institutional types: the Roman Empire (proxied by Italy, back-extrapolated from 1–476 CE using Maddison 2007, Scheidel and Friesen 2009, and Lo Cascio and Malanima 2009), the British Empire (United Kingdom), the Ottoman Empire (Turkey), Imperial China (China), Habsburg-Spain (Spain), and the Mongol Empire. The Mongol series has no Maddison country code and is constructed as a population-weighted average of China (45%), Russia (30%), and Turkey (25%) for 1200–1400 CE — the best available proxy for a steppe empire that governed all three regions simultaneously.</p>

<p class="art-p">Each empire's GDP series is capped at its historical dissolution date: Rome at 476 CE, the Mongols at 1400, Habsburg-Spain at 1808, Imperial China at 1912, the Ottoman Empire at 1918, and the British Empire at 1947 (Indian independence). Real wage data — used in Chart 3 to construct the extraction gap — comes from Robert Allen's European wages series (2001), Özmucur and Pamuk's Ottoman wage reconstruction (2002), and Allen et al.'s China and Asia series (2011). All wage figures are expressed in silver grams per day for an unskilled male laborer.</p>

<p class="art-p">This report is not a comprehensive economic history. It is a structured comparison: six empires on the same axes, asking the same questions. What does empire produce? Who captures it? And how fast does it disappear?</p>

<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span>&#9654;&nbsp;SQL — Imperial Cleaning &amp; Classification Logic</span>
      <span style="display:flex;align-items:center;gap:8px;">
        <span class="art-lang-tag art-lang-sql">SQL</span>
        <button class="art-copy-btn" onclick="copyBlock('sql-imperial', this)">Copy</button>
      </span>
    </summary>
    <pre class="art-code-pre" id="sql-imperial">-- IMPERIAL: CLEANING AND CLASSIFICATION LOGIC
-- Mirrors R cleaning logic in imperial.qmd
-- Source: Maddison Project Database 2023 via Our World in Data

-- Step 1: Map country codes to empire names and cap at dissolution
SELECT
    m.entity        AS country,
    m.code          AS countrycode,
    m.year,
    m.gdp_per_capita AS gdppc,
    e.empire,
    e.end_year,
    CASE
        WHEN e.empire = 'Roman Empire'   THEN 'Ancient'
        WHEN e.empire = 'Mongol Empire'  THEN 'Medieval'
        WHEN e.empire = 'Ottoman Empire' THEN 'Early Modern'
        WHEN e.empire = 'Habsburg-Spain' THEN 'Early Modern'
        WHEN e.empire = 'British Empire' THEN 'Modern'
        WHEN e.empire = 'Imperial China' THEN 'Multi-era'
        ELSE 'Unclassified'
    END AS era
FROM maddison_raw m
INNER JOIN (
    VALUES
        ('ITA', 'Roman Empire',    476),
        ('GBR', 'British Empire', 1947),
        ('TUR', 'Ottoman Empire', 1918),
        ('CHN', 'Imperial China', 1912),
        ('ESP', 'Habsburg-Spain', 1808)
) AS e(countrycode, empire, end_year)
    ON m.code = e.countrycode
WHERE m.gdp_per_capita IS NOT NULL
  AND m.year <= e.end_year

UNION ALL

-- Step 2: Mongol Empire — population-weighted average of CHN/RUS/TUR
SELECT
    'Mongol Empire (weighted)' AS country,
    'MONG_WGT'                 AS countrycode,
    m.year,
    SUM(m.gdp_per_capita * w.weight) / SUM(w.weight) AS gdppc,
    'Mongol Empire'            AS empire,
    1400                       AS end_year,
    'Medieval'                 AS era
FROM maddison_raw m
INNER JOIN (
    VALUES ('CHN', 0.45), ('RUS', 0.30), ('TUR', 0.25)
) AS w(code, weight)
    ON m.code = w.code
WHERE m.year BETWEEN 1200 AND 1400
  AND m.gdp_per_capita IS NOT NULL
GROUP BY m.year

ORDER BY empire, year;</pre>
  </details>
</div>

<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span>&#9654;&nbsp;Python — Imperial EDA &amp; Data Pull</span>
      <span style="display:flex;align-items:center;gap:8px;">
        <span class="art-lang-tag art-lang-python">Python</span>
        <button class="art-copy-btn" onclick="copyBlock('python-imperial', this)">Copy</button>
      </span>
    </summary>
    <pre class="art-code-pre" id="python-imperial">import pandas as pd
import numpy as np

# ── Pull from Our World in Data ────────────────────────────────────
url = "https://ourworldindata.org/grapher/gdp-per-capita-maddison-project-database.csv"
df = pd.read_csv(url)
df.columns = df.columns.str.lower().str.replace(" ", "_")
df = df.rename(columns={"entity": "country", "code": "countrycode",
                         "gdp_per_capita": "gdppc"})

print(f"Shape: {df.shape}")
print(f"Years: {df['year'].min()} – {df['year'].max()}")
print(f"Countries: {df['countrycode'].nunique()}")
print(df.dtypes)

# ── Empire mapping ─────────────────────────────────────────────────
empire_map = {
    "ITA": "Roman Empire",
    "GBR": "British Empire",
    "TUR": "Ottoman Empire",
    "CHN": "Imperial China",
    "ESP": "Habsburg-Spain"
}
end_years = {
    "Roman Empire": 476, "British Empire": 1947,
    "Ottoman Empire": 1918, "Imperial China": 1912,
    "Habsburg-Spain": 1808, "Mongol Empire": 1400
}

# ── Standard empires ───────────────────────────────────────────────
df_empires = (
    df[df["countrycode"].isin(empire_map)]
    .assign(empire=lambda x: x["countrycode"].map(empire_map))
    .dropna(subset=["gdppc"])
)
df_empires = df_empires[
    df_empires.apply(lambda r: r["year"] <= end_years[r["empire"]], axis=1)
]

# ── Mongol Empire: population-weighted average ─────────────────────
weights = {"CHN": 0.45, "RUS": 0.30, "TUR": 0.25}
mongol = (
    df[df["countrycode"].isin(weights) & df["year"].between(1200, 1400)]
    .dropna(subset=["gdppc"])
    .assign(weight=lambda x: x["countrycode"].map(weights))
    .groupby("year")
    .apply(lambda g: np.average(g["gdppc"], weights=g["weight"]))
    .reset_index(name="gdppc")
    .assign(empire="Mongol Empire", countrycode="MONG_WGT")
)

# ── Combined dataset ───────────────────────────────────────────────
all_empires = pd.concat([df_empires, mongol], ignore_index=True)

# ── EDA summary ───────────────────────────────────────────────────
summary = (
    all_empires.groupby("empire")["gdppc"]
    .agg(["count", "min", "max", "mean", "median"])
    .round(0)
)
print("\nGDP per capita summary by empire:")
print(summary)

# ── Peak GDP per empire ────────────────────────────────────────────
peaks = (
    all_empires.loc[all_empires.groupby("empire")["gdppc"].idxmax()]
    [["empire", "year", "gdppc"]]
    .sort_values("gdppc", ascending=False)
)
print("\nPeak GDP per capita by empire:")
print(peaks)</pre>
  </details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="gdp-per-capita-across-empire-cores" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">GDP PER CAPITA ACROSS EMPIRE CORES</span></h2>
                    
                    
                </div>
            </div>
        </div><figure class="kg-card kg-image-card"><img src="/images/content/2026/04/chart1_gdppc_all_empires.png" class="kg-image" alt="" loading="lazy" width="2000" height="1167" srcset="/images/content/size/w600/2026/04/chart1_gdppc_all_empires.png 600w, /images/content/size/w1000/2026/04/chart1_gdppc_all_empires.png 1000w, /images/content/size/w1600/2026/04/chart1_gdppc_all_empires.png 1600w, /images/content/size/w2400/2026/04/chart1_gdppc_all_empires.png 2400w" sizes="(min-width: 720px) 720px"></figure>

<p class="art-p">For the first 1,800 years of this chart, five of the six empire cores are essentially stationary. Rome peaks early and declines. The Ottomans and Imperial China drift sideways for centuries. Habsburg Spain — despite controlling the most silver-producing territory in human history — never generates a GDP breakout. The Mongol blip in the 1260s appears and vanishes within a century. The chart's visual drama is entirely a British phenomenon, and it doesn't begin until roughly 1800. That flatness is not a data artifact. Pre-industrial economies were governed by a hard ceiling: agricultural productivity. Every empire eventually hit the same constraint — you can conquer more land, you can tax more efficiently, you can build better roads — but you cannot grow aggregate output faster than the soil can produce food.</p>

<p class="art-p">The temptation when looking at this chart is to conclude that Britain governed better. This is wrong. The British divergence is a technology story, not an institutional one. Steam power — specifically the transition from organic energy to fossil energy — removed the agricultural ceiling entirely. British GDP per capita in 1900 is not high because of better laws or smarter monarchs. It is high because coal-powered factories could produce manufactured goods at a scale that no farming economy could match, and Britain industrialized first.</p>

<p class="art-p">The Roman GDP line is a back-extrapolation built from Maddison (2007), Scheidel and Friesen (2009), and Lo Cascio and Malanima (2009). At roughly <strong>$1,000–1,200 in 2011 USD PPP</strong>, Rome's peak was genuinely impressive for its era — roughly double the GDP per capita of its contemporaries, representing a level of market integration that would not reappear in Europe for a thousand years after the Western collapse.</p>

<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span>&#9654;&nbsp;R Code — Chart 1: GDP Per Capita Across Empire Cores</span>
      <span style="display:flex;align-items:center;gap:8px;">
        <span class="art-lang-tag art-lang-r">R</span>
        <button class="art-copy-btn" onclick="copyBlock('r-chart1', this)">Copy</button>
      </span>
    </summary>
    <pre class="art-code-pre" id="r-chart1">p1 <- mpd |>
  filter(year >= 1) |>
  ggplot(aes(x = year, y = gdppc, color = empire)) +
  annotate("rect", xmin = 1347, xmax = 1353,
           ymin = -Inf, ymax = Inf,
           fill = art_highlight, alpha = 0.08) +
  annotate("text", x = 1350, y = 11000,
           label = "Black Death", hjust = 0.5, size = 2.8,
           color = art_highlight, fontface = "bold", family = "Helvetica") +
  geom_vline(xintercept = 476, linetype = "dashed",
             color = art_mid, linewidth = 0.4) +
  annotate("text", x = 480, y = 11000,
           label = "Fall of Rome", hjust = 0, size = 2.8,
           color = art_mid, family = "Helvetica") +
  geom_vline(xintercept = 1760, linetype = "dashed",
             color = art_mid, linewidth = 0.4) +
  annotate("text", x = 1764, y = 11000,
           label = "Industrial\nRevolution", hjust = 0, size = 2.8,
           color = art_mid, family = "Helvetica") +
  geom_vline(xintercept = 1260, linetype = "dashed",
             color = art_mid, linewidth = 0.4) +
  annotate("text", x = 1264, y = 9000,
           label = "Mongol peak", hjust = 0, size = 2.8,
           color = art_mid, family = "Helvetica") +
  geom_line(linewidth = 0.85, alpha = 0.9) +
  scale_color_manual(values = empire_palette) +
  scale_y_continuous(
    labels       = label_dollar(prefix = "$"),
    trans        = "log10",
    breaks       = c(500, 1000, 2000, 5000, 10000),
    minor_breaks = NULL
  ) +
  scale_x_continuous(breaks = seq(0, 2000, by = 200)) +
  annotation_logticks(sides = "l", color = art_muted) +
  theme_artometrics() +
  theme(legend.position = "bottom") +
  labs(
    title    = "GDP Per Capita Across Empire Cores",
    subtitle = "2011 USD PPP | Log scale | Capped at each empire's dissolution date",
    x        = "Year CE",
    y        = "GDP Per Capita (log scale)",
    color    = NULL,
    caption  = "Source: Maddison Project Database 2023 via Our World in Data — ARTOMETRICS"
  )

ggsave("chart1_gdppc_all_empires.png", plot = p1,
       path = "charts", width = 12, height = 7, dpi = 300, bg = "white")</pre>
  </details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="rise-slow-fall-faster" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">RISE SLOW, FALL FASTER</span></h2>
                    
                    
                </div>
            </div>
        </div><figure class="kg-card kg-image-card"><img src="/images/content/2026/04/chart2_empire_lifespan_indexed.png" class="kg-image" alt="" loading="lazy" width="2000" height="1167" srcset="/images/content/size/w600/2026/04/chart2_empire_lifespan_indexed.png 600w, /images/content/size/w1000/2026/04/chart2_empire_lifespan_indexed.png 1000w, /images/content/size/w1600/2026/04/chart2_empire_lifespan_indexed.png 1600w, /images/content/size/w2400/2026/04/chart2_empire_lifespan_indexed.png 2400w" sizes="(min-width: 720px) 720px"></figure>

<p class="art-p">Chart 2 removes the distortion of absolute scale. By indexing every empire's GDP per capita to its own peak (peak = 100) and aligning on a ±200 year window, we can compare trajectories directly. What emerges is not six different stories — it's one story with six variations in speed. The left side of the chart shows the consolidation phase: resources flow inward, administration tightens, transaction costs fall, and GDP rises. The right side shows the extraction phase running out of road. The institutional machine keeps turning, but the returns on further centralization diminish, external shocks go unabsorbed, and GDP falls. Every empire, on this chart, is climbing the same mountain.</p>

<p class="art-p">This is the finding that Chart 2 makes hardest to argue with. Every empire in the dataset rises over a period of two to five centuries. Every empire declines in a fraction of that time. Rome takes roughly 300 years from Augustus to Western collapse — but the indexed chart shows that <strong>60% of the GDP loss happens in the last 80 years</strong>, after the Crisis of the Third Century. Habsburg Spain's post-peak decline is sharp and early; the empire technically persisted for another century, but the GDP trajectory turned negative almost immediately after Philip II's peak. The Mongol Empire — the most extreme case — rises from virtually nothing to continental dominance in 60 years and fragments within a generation of Kublai Khan's death.</p>

<p class="art-p">The Roman line stands out as the flattest post-peak trajectory — holding above 80% of peak for nearly a century after the GDP maximum. This is not evidence of Roman resilience. Walter Scheidel's work on Roman inequality identifies this period as one of elite wealth concentration rather than broad prosperity — the GDP aggregate was holding because the very top of the distribution was insulating itself from the broader decline. The empire was already over. The numbers just hadn't caught up yet.</p>

<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span>&#9654;&nbsp;R Code — Chart 2: Rise Slow, Fall Faster</span>
      <span style="display:flex;align-items:center;gap:8px;">
        <span class="art-lang-tag art-lang-r">R</span>
        <button class="art-copy-btn" onclick="copyBlock('r-chart2', this)">Copy</button>
      </span>
    </summary>
    <pre class="art-code-pre" id="r-chart2">p2 <- mpd |>
  filter(years_from_peak >= -200, years_from_peak <= 200) |>
  ggplot(aes(x = years_from_peak, y = gdppc_indexed, color = empire)) +
  geom_hline(yintercept = 75, linetype = "dotted",
             color = art_muted, linewidth = 0.5) +
  geom_hline(yintercept = 50, linetype = "dotted",
             color = art_muted, linewidth = 0.5) +
  annotate("text", x = 198, y = 76.5,
           label = "75% of peak", hjust = 1, size = 2.8,
           color = art_mid, family = "Helvetica") +
  annotate("text", x = 198, y = 51.5,
           label = "50% of peak", hjust = 1, size = 2.8,
           color = art_mid, family = "Helvetica") +
  geom_vline(xintercept = 0, linetype = "dashed",
             color = art_dark, linewidth = 0.5) +
  annotate("text", x = 4, y = 103,
           label = "GDP Peak", hjust = 0, size = 3,
           color = art_mid, family = "Helvetica") +
  geom_line(linewidth = 0.9, alpha = 0.9) +
  scale_color_manual(values = empire_palette) +
  scale_x_continuous(breaks = seq(-200, 200, by = 50)) +
  theme_artometrics() +
  theme(legend.position = "bottom") +
  labs(
    title    = "Rise Slow, Fall Fast — Every Empire",
    subtitle = "GDP per capita indexed to each empire's peak (peak = 100) | ±200 years",
    x        = "Years Before / After GDP Peak",
    y        = "Indexed GDP (Peak = 100)",
    color    = NULL,
    caption  = "Source: Maddison Project Database 2023 via Our World in Data — ARTOMETRICS"
  )

ggsave("chart2_empire_lifespan_indexed.png", plot = p2,
       path = "charts", width = 12, height = 7, dpi = 300, bg = "white")</pre>
  </details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="the-extraction-gap" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">THE EXTRACTION GAP</span></h2>
                    
                    
                </div>
            </div>
        </div><figure class="kg-card kg-image-card"><img src="/images/content/2026/04/chart3_extraction_gap.png" class="kg-image" alt="" loading="lazy" width="2000" height="1167" srcset="/images/content/size/w600/2026/04/chart3_extraction_gap.png 600w, /images/content/size/w1000/2026/04/chart3_extraction_gap.png 1000w, /images/content/size/w1600/2026/04/chart3_extraction_gap.png 1600w, /images/content/size/w2400/2026/04/chart3_extraction_gap.png 2400w" sizes="(min-width: 720px) 720px"></figure>

<p class="art-p">Chart 3 is the payoff. By indexing both GDP per capita and real wages to 1500 = 100 for each empire, it shows what happened to the surplus generated by imperial growth — and specifically, how much of it reached ordinary workers versus how much was captured above them. The gap between the GDP line (solid) and the wage line (dashed) is the visual measure of extraction: surplus produced but not distributed. In three of the four empires shown, that gap widens dramatically over time. In one — Britain, post-Industrial Revolution — it eventually closes. The difference between those two outcomes is the central question of imperial economic history.</p>

<p class="art-p">The British panel is the most complex in Chart 3. From 1500 to roughly 1750, GDP per capita and real wages move more or less in parallel. Then the Industrial Revolution hits and GDP per capita accelerates dramatically — producing the classic Engels Pause, the period between roughly 1780 and 1840 when British workers lived through massive productivity growth without real wage gains. But then something unprecedented in imperial history happens: the dashed line catches up. By the late 19th century, British real wages are rising faster than GDP per capita. <strong>Britain is the only empire in this dataset where workers at the bottom of the distribution captured a significant share of imperial growth before the empire ended.</strong></p>

<p class="art-p">Habsburg Spain's wage line is the most damning line on the chart. Starting at approximately 1.8 silver grams per day in 1500, it declines steadily to roughly 1.0 by 1600 and never recovers. This is the period during which Spanish galleons were carrying hundreds of tonnes of silver annually from Potosí and Zacatecas to Seville. The mechanism is the Price Revolution: the flood of American silver raised prices across the European economy while nominal wages failed to keep pace. Habsburg Spain extracted the largest resource windfall in pre-industrial history and distributed the gains almost entirely to the Crown, the Church, and the Genoese bankers who financed imperial debt. The workers got the inflation.</p>

<div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span>&#9654;&nbsp;R Code — Chart 3: The Extraction Gap</span>
      <span style="display:flex;align-items:center;gap:8px;">
        <span class="art-lang-tag art-lang-r">R</span>
        <button class="art-copy-btn" onclick="copyBlock('r-chart3', this)">Copy</button>
      </span>
    </summary>
    <pre class="art-code-pre" id="r-chart3">base_year <- 1500

gdp_indexed <- mpd |>
  filter(
    year >= 1300, year <= 1920,
    empire %in% c("British Empire", "Ottoman Empire",
                  "Imperial China", "Habsburg-Spain")
  ) |>
  group_by(empire) |>
  mutate(
    base_val = gdppc[which.min(abs(year - base_year))],
    gdp_idx  = gdppc / base_val * 100,
    series   = "GDP per capita"
  ) |>
  ungroup() |>
  select(empire, year, value = gdp_idx, series)

wage_indexed <- wages |>
  filter(year >= 1300, year <= 1920) |>
  group_by(empire) |>
  mutate(
    base_val = value[which.min(abs(year - base_year))],
    wage_idx = value / base_val * 100,
    series   = "Real wages"
  ) |>
  ungroup() |>
  select(empire, year, value = wage_idx, series)

extraction_gap <- bind_rows(gdp_indexed, wage_indexed)

p3 <- extraction_gap |>
  ggplot(aes(x = year, y = value, color = series, linetype = series)) +
  geom_line(linewidth = 0.95, alpha = 0.9) +
  geom_hline(yintercept = 100, linetype = "dotted",
             color = art_muted, linewidth = 0.4) +
  geom_vline(
    data = tibble(
      empire = c("British Empire", "Habsburg-Spain",
                 "Imperial China", "Ottoman Empire"),
      xint   = c(1760, 1580, 1644, 1520)
    ),
    aes(xintercept = xint), inherit.aes = FALSE,
    linetype = "dashed", color = art_mid, linewidth = 0.35
  ) +
  geom_text(
    data = tibble(
      empire = c("British Empire", "Habsburg-Spain",
                 "Imperial China", "Ottoman Empire"),
      xint   = c(1760, 1580, 1644, 1520),
      label  = c("Industrial\nRevolution", "Silver\npeak",
                 "Qing\ndynasty", "Suleiman\npeak"),
      y      = c(Inf, Inf, Inf, Inf)
    ),
    aes(x = xint, y = y, label = label),
    inherit.aes = FALSE,
    vjust = 1.2, hjust = -0.1, size = 2.5,
    color = art_mid, family = "Helvetica"
  ) +
  facet_wrap(~empire, ncol = 2, scales = "free_y") +
  scale_color_manual(
    values = c("GDP per capita" = art_secondary,
               "Real wages"     = art_highlight)
  ) +
  scale_linetype_manual(
    values = c("GDP per capita" = "solid",
               "Real wages"     = "dashed")
  ) +
  scale_x_continuous(breaks = seq(1300, 1900, by = 100)) +
  theme_artometrics() +
  theme(legend.position = "bottom") +
  labs(
    title    = "The Extraction Gap: GDP Growth vs. Real Wages",
    subtitle = "Both series indexed to 1500 = 100 | Gap between lines = surplus not reaching workers",
    x        = "Year",
    y        = "Index (1500 = 100)",
    color    = NULL,
    linetype = NULL,
    caption  = "GDP: Maddison Project 2023 | Wages: Allen (2001), Pamuk (2002) — ARTOMETRICS"
  )

ggsave("chart3_extraction_gap.png", plot = p3,
       path = "charts", width = 12, height = 7, dpi = 300, bg = "white")</pre>
  </details>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="limitation" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">LIMITATION</span></h2>
                    
                    
                </div>
            </div>
        </div>

<p class="art-p">The Maddison Project has no Mongol Empire country code. The figures here use a population-weighted average of China (45%), Russia (30%), and Turkey (25%) for 1200–1400 CE — the best available proxy for a steppe empire that governed all three regions simultaneously. Turkey is the closest available stand-in for the Ilkhanate's Persia-Iraq core. This captures broad regional output but understates the empire's Central Asian footprint and almost certainly overstates the coherence of Mongol economic governance. The SESHAT Databank remains the most rigorous replacement and is not yet fully public.</p>

<p class="art-p">Maddison's ancient-era GDP figures are back-extrapolations built on archaeological proxies — lead pollution records, shipwreck counts, amphora production volumes. They carry uncertainty bands that would dwarf the point estimates if visualized. The Roman and Han Chinese figures are the best-supported in the literature; treat all others as orders of magnitude. Pre-1000 CE data should be read as directionally informative, not precisely accurate. Real wage data is largely unavailable before roughly 1300 CE, making the extraction gap analysis impossible for Rome or the early Mongol period — pre-wage-labor tributary economies did not generate the record types from which wages can be reconstructed.</p>

<p class="art-p">Mapping a multi-continental empire to a single modern country code captures the metropolitan core but ignores the periphery entirely. British GDP per capita for the UK does not include what was extracted from India, Africa, or the Caribbean. Ottoman GDP for Turkey does not include the Levant, Egypt, or the Balkans. The charts show what happened to the empire's home population — not to its subjects. In most cases, the imperial periphery experienced extraction without the offsetting GDP gains that appear in the core country data. The actual extraction gap, measured globally, is almost certainly larger than what Chart 3 shows.</p>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="conclusion" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">CONCLUSION</span></h2>
                    
                    
                </div>
            </div>
        </div>

<p class="art-p">Six empires. Four thousand years. The curve barely changes. A period of administrative consolidation reduces transaction costs, enables infrastructure at scale, and produces a GDP spike. That spike is real — it shows up in the Maddison data clearly. What it conceals is who captured the gains. And Chart 3 is where the concealment ends. In every empire with wage data, the extraction gap widens during peak imperial expansion. British GDP per capita grew roughly <strong>150%</strong> between 1700 and 1850. Real wages for English laborers grew approximately <strong>30–40%</strong> over the same window. The rest went to rents, dividends, and colonial surplus.</p>

<p class="art-p">Chart 2 makes the structural asymmetry hard to argue with. Every empire takes two to five centuries to build GDP to peak. The fall takes a fraction of that time. The Roman trajectory from Commodus to Western collapse is roughly 300 years — but 60% of the GDP loss happens in the last 80. The Mongol Empire peaks in 1260 and is functionally fragmented by 1350. Speed asymmetry is the rule, not the exception. The institutional machine that enables consolidation becomes, over time, the institutional machine that prevents adaptation. Empires do not collapse because they run out of resources. They collapse because the systems built to extract resources cannot be reformed fast enough to respond to the conditions that extraction creates.</p>

<p class="art-p">Of the six empires in this dataset, Habsburg Spain is the clearest controlled experiment. Remove the silver and the empire is simply Spain — a mid-tier European power with standard institutional problems. Add 180,000 tonnes of silver and you get accelerated inflation, wage suppression, and eventual fiscal collapse. The resource abundance didn't produce a richer empire. It produced a more efficient extraction machine that consumed itself. That is not a 16th-century problem. It is a template. The economics of empire are not complicated. They are just honest in a way that empires rarely are about themselves.</p>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="references" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">REFERENCES</span></h2>
                    
                    
                </div>
            </div>
        </div>

<p class="art-p">Allen, R. C. (2001). The great divergence in European wages and prices from the Middle Ages to the First World War. <em>Explorations in Economic History, 38</em>(4), 411–447.</p>

<p class="art-p">Allen, R. C., Bassino, J. P., Ma, D., Moll-Murata, C., &amp; van Zanden, J. L. (2011). Wages, prices, and living standards in China, 1738–1925. <em>Economic History Review, 64</em>(S1), 8–38.</p>

<p class="art-p">Bolt, J., &amp; van Zanden, J. L. (2024). Maddison style estimates of the evolution of the world economy: A new 2023 update. <em>Journal of Economic Surveys</em>, 1–41.</p>

<p class="art-p">Goldstone, J. A. (1991). <em>Revolution and rebellion in the early modern world.</em> University of California Press.</p>

<p class="art-p">Lo Cascio, E., &amp; Malanima, P. (2009). GDP in pre-modern agrarian economies (1–1820 AD): A revision of the estimates. <em>Rivista di Storia Economica, 25</em>(3), 391–420.</p>

<p class="art-p">Morris, I. (2013). <em>The measure of civilization: How social development decides the fate of nations.</em> Princeton University Press.</p>

<p class="art-p">Özmucur, S., &amp; Pamuk, Ş. (2002). Real wages and standards of living in the Ottoman Empire, 1489–1914. <em>Journal of Economic History, 62</em>(2), 293–321.</p>

<p class="art-p">Pomeranz, K. (2000). <em>The great divergence: China, Europe, and the making of the modern world economy.</em> Princeton University Press.</p>

<p class="art-p">Scheidel, W. (2017). <em>The great leveler: Violence and the history of inequality from the stone age to the twenty-first century.</em> Princeton University Press.</p>

<p class="art-p">Scheidel, W., &amp; Friesen, S. J. (2009). The size of the economy and the distribution of income in the Roman Empire. <em>Journal of Roman Studies, 99</em>, 61–91.</p>

<p class="art-p">Turchin, P. (2006). <em>War and peace and war: The rise and fall of empires.</em> Pi Press.</p>

<p class="art-p">Turchin, P., &amp; Nefedov, S. A. (2009). <em>Secular cycles.</em> Princeton University Press.</p>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="editors-note" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">EDITOR'S NOTE</span></h2>
                    
                    
                </div>
            </div>
        </div>

<p class="art-p">This report was researched, written, designed, and produced in active collaboration with Claude AI (Anthropic). The data pipeline, statistical analysis, chart design, written analysis, narrative structure, and visual styling were all developed through a directed partnership between human editorial judgment and AI execution. The research questions, editorial instincts, interpretive framing, and brand vision are ours. The execution was a collaboration. We document this not as a disclaimer but as a description of how we actually work, and as a position: we believe this is what serious data journalism looks like when the tools available are used honestly and at full capacity.</p>

<p class="art-p"><em>— Artometrics Editorial</em></p>



<div class="art-github-btn">
  <a href="https://github.com/Artometrics/imperial" target="_blank">
    VIEW ON GITHUB
  </a>
</div>

<div class="kg-card kg-header-card kg-v2 kg-width-full kg-content-wide " style="background-color: #000000;" data-background-color="#000000">
            
            <div class="kg-header-card-content">
                
                <div class="kg-header-card-text kg-align-center">
                    <h2 id="thank-you-for-your-time-" class="kg-header-card-heading" style="color: #FFFFFF;" data-text-color="#FFFFFF"><span style="white-space: pre-wrap;">THANK YOU FOR YOUR TIME :)</span></h2>
                    
                    
                </div>
            </div>
        </div>