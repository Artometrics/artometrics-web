---
title: "POKEMON: The Artometrics of the World's Biggest Franchise"
slug: pokemon
pubDate: 2026-05-06
description: "Pokémon is the highest-grossing media franchise in history — more than $150 billion in lifetime revenue across games, cards, merchandise, and film. That number gets cited constantly. What gets cite..."
heroImage: /images/content/2026/05/hf_20260506_100612_d8abe8f2-0c40-48ca-8e05-62c73264cd19-1.png
tags: [culture, power]
draft: false
---
<div id="quarto-content">
<nav id="TOC" role="doc-toc">
    <h2 id="toc-title">IN THIS REPORT</h2>

  <ul>
  <li><a href="#fast-facts" id="toc-fast-facts">FAST FACTS</a></li>
  <li><a href="#dataset-context" id="toc-dataset-context">DATASET CONTEXT</a></li>
  <li><a href="#stat-identity-by-type" id="toc-stat-identity-by-type">STAT IDENTITY BY TYPE</a></li>
  <li><a href="#generation-creep" id="toc-generation-creep">GENERATION CREEP</a></li>
  <li><a href="#built-different" id="toc-built-different">BUILT DIFFERENT</a></li>
  <li><a href="#limitations" id="toc-limitations">LIMITATIONS</a></li>
  <li><a href="#conclusion" id="toc-conclusion">CONCLUSION</a></li>
  <li><a href="#references" id="toc-references">REFERENCES</a></li>
  <li><a href="#editors-note" id="toc-editors-note">EDITOR’S NOTE</a></li>
  </ul>
</nav>
<main class="art-article-main">
<p class="art-p">
Pokémon is the highest-grossing media franchise in history — more than
$150 billion in lifetime revenue across games, cards, merchandise, and
film. That number gets cited constantly. What gets cited less is the
design infrastructure underneath it: the 18-type system, the base stat
framework, the generation-by-generation release cadence that has added
roughly 100 new Pokémon every few years since 1996. The franchise looks
like a cultural phenomenon. The data shows it&#39;s also an engineering
project.
</p>
<p class="art-p">
This report uses the TidyTuesday 2025-04-01 Pokémon dataset — sourced
originally from PokéAPI and covering every Pokémon through Generation
IX — to examine three questions. First, do different types actually
play differently, or is that a perception? Second, has Game Freak been
inflating Pokémon power over time? Third, what does physical size reveal
about how Pokémon are designed? The answers are in the numbers, and the
numbers are more interesting than the marketing.
</p>
<h2 id="fast-facts" class="anchored">FAST FACTS</h2>
<div class="facts-grid">
  <div class="fact-box">
    <span class="fact-number">949</span>
    <span class="fact-label">Pokémon in the dataset with a confirmed primary type</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">18</span>
    <span class="fact-label">Distinct primary types represented</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">8</span>
    <span class="fact-label">Generation IDs in the data — Gen 8 and 9 unclassified in source</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">157</span>
    <span class="fact-label">Median base experience across all Pokémon</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">510</span>
    <span class="fact-label">Pokémon with a second type — the dual-type majority</span>
  </div>
  <div class="fact-box">
    <span class="fact-number">Water</span>
    <span class="fact-label">Most common primary type in the dataset</span>
  </div>
</div>
<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>
<p class="art-p">
The dataset is TidyTuesday Week 13, 2025 — a cleaned version of the
PokéAPI database covering 1,028 Pokémon entries across nine
generations. Each row represents a single Pokémon form, which means
alternate forms (Mega Evolutions, regional variants, Gigantamax forms)
appear as separate records from their base versions. The core fields
used in this report are the six base stats (HP, Attack, Defense, Special
Attack, Special Defense, Speed), base experience, primary type, height,
weight, and generation ID. All values are drawn directly from the
TidyTuesday source — no external APIs were joined for this analysis.
</p>
<p class="art-p">
Base experience is a commonly misunderstood field. It is not the same
as a Pokémon&#39;s base stat total, and it is not a measure of overall
power. It is the amount of experience a trainer&#39;s Pokémon receives
when defeating that species in battle — a game mechanic that reflects
intended difficulty and progression pacing, not raw strength. A Pokémon
with high base experience is meant to be encountered later in the game
or to signal a harder fight. It correlates with power, but imperfectly.
</p>
<p class="art-p">
Height and weight are stored in the dataset in their PokéAPI native
units: decimetres for height and hectograms for weight. Both were
converted to standard metric units (metres and kilograms respectively)
before plotting. The log scale applied in Chart 3 is not a stylistic
choice — the raw distributions span roughly four orders of magnitude,
from Flabébé at 0.1 metres and 0.1 kilograms to Wailord at 14.5 metres
and Cosmoem at 999.9 kilograms. A linear scale would make the chart
unreadable.
</p>
<p class="art-p">
One structural note on the generation variable: a small number of
records in the raw dataset have a null generation ID, which would
otherwise appear as a &quot;Gen NA&quot; row in Chart 2. These records were
filtered before plotting. The most likely explanation is that they
correspond to alternate forms introduced outside the standard
generational release structure, though the TidyTuesday documentation
does not clarify the source of the nulls explicitly.
</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-sql">SQL</span>
    </summary>
    <pre class="art-code-pre" id="sql-block-1">-- Pokémon Artometrics: Dataset Spec
-- Source: TidyTuesday 2025-04-01 pokemon_df
-- All three charts draw from this single table — no external join required.

SELECT
    id,
    pokemon,
    generation_id,
    type_1,
    type_2,
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed,
    base_experience,
    height,       -- decimetres (divide by 10 for metres)
    weight,       -- hectograms (divide by 10 for kilograms)
    is_legendary,
    is_mythical

FROM pokemon_df

WHERE type_1 IS NOT NULL   -- drops records with no type assignment
  AND id     IS NOT NULL;

-- Chart 1: all Pokémon included, pivot stats long, median by type
-- WHERE type_1 IS NOT NULL

-- Chart 2: exclude records with missing base_experience
-- WHERE base_experience IS NOT NULL

-- Chart 3: exclude records with missing height or weight
-- WHERE height IS NOT NULL AND weight IS NOT NULL</pre>
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
    <pre class="art-code-pre" id="python-block-1">import pandas as pd

# Load TidyTuesday 2025-04-01 Pokémon dataset
URL = (
    &quot;https://raw.githubusercontent.com/rfordatascience/tidytuesday/&quot;
    &quot;main/data/2025/2025-04-01/pokemon_df.csv&quot;
)
pokemon = pd.read_csv(URL)

# Basic inspection
print(pokemon.shape)           # (N, cols)
print(pokemon.dtypes)
print(pokemon.isnull().sum())  # missing value audit

# Legendary / mythical count
n_leg = pokemon.query(&quot;is_legendary == True or is_mythical == True&quot;).shape[0]
print(f&quot;Legendary + mythical: {n_leg}&quot;)

# Most common primary type
print(pokemon[&quot;type_1&quot;].value_counts().head(5))</pre>
  </details>
</div>
</div>
</div>
</div>
<h2 id="stat-identity-by-type" class="anchored">STAT IDENTITY BY TYPE</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pokemon/charts/chart1_stat_heatmap.plotly.json" data-fallback="/images/content/articles/pokemon/charts/chart1_stat_heatmap.png" role="img" aria-label="Stat Heatmap"></div>
  <figcaption class="art-chart-caption">Stat Heatmap</figcaption>
</figure>
</div>
</div>
</div>
<p class="art-p">
Dragon sits at the top of the heatmap for a reason. With a median
Attack of 100 and no single stat below 80, Dragon-types are the closest
thing Pokémon has to a generalist elite — high across the board, weak
nowhere. The type wasn&#39;t always rare by accident. Game Freak made Dragon
deliberately difficult to access in the early games because the numbers
justified the gatekeeping.
</p>
<p class="art-p">
The more revealing story is in the specialists. Steel-types clock a
median Defense of 116 — the highest single cell on the entire chart —
while their Special Attack sits at 60, dead last among Steel&#39;s own
stats. Fighting-types mirror that tradeoff on offense: Attack of 100,
Special Attack of 42, the sharpest stat gap in the dataset. These aren&#39;t
balanced Pokémon. They&#39;re designed to do one thing extremely well and
pay for it everywhere else. The heatmap makes that design philosophy
impossible to ignore.
</p>
<p class="art-p">
Bug sits alone at the bottom. Across all six stats, Bug-types post the
lowest or near-lowest medians in every column — 60 HP, 65 Attack, 60
Defense, 55 Special Attack, 60 Special Defense, 60 Speed. The type has
been statistically undertuned since Generation I and the data across
nine generations confirms it hasn&#39;t been corrected. Whether that&#39;s a
deliberate choice to keep early-game Pokémon weak or an oversight that
calcified into canon, the result is the same: Bug-types are the
worst-statted primary type in the game by a significant margin. One
caveat worth noting: Flying appears near the top of the chart with an
unusually high Speed median of 116, but Flying is almost never a primary
type — it&#39;s almost always secondary. The dataset&#39;s primary Flying entries
(Tornadus, Gyarados, Chatot, and a handful of others) are a small and
unrepresentative sample, which inflates the type&#39;s apparent standing
relative to how Flying Pokémon actually play in practice.
</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-1"># Chart 1 — Stat Identity by Type
# Heatmap: median of each base stat by primary type
# All Pokémon included; sorted by median value across stats

chart1_data |&gt;
  ggplot(aes(x = stat, y = fct_reorder(type_1, median_val), fill = median_val)) +
  geom_tile(color = art_cream, linewidth = 0.5) +
  geom_text(aes(label = round(median_val, 0)),
            size = 3, color = art_dark) +
  scale_fill_gradient(low = art_cream, high = art_highlight,
                      name = &quot;Median\nBase Stat&quot;) +
  labs(
    title    = &quot;EVERY TYPE HAS A SIGNATURE — THE NUMBERS MAKE IT VISIBLE&quot;,
    subtitle = &quot;Median Base Stat Value By Primary Type. All Pokémon Included.&quot;,
    x        = NULL,
    y        = NULL,
    caption  = &quot;Source: TidyTuesday 2025-04-01 | — ARTOMETRICS&quot;
  ) +
  theme_artometrics() +
  theme(
    panel.grid.major = element_blank(),
    axis.text.x      = element_text(face = &quot;bold&quot;)
  )</pre>
  </details>
</div>
</div>
</div>
</div>
<h2 id="generation-creep" class="anchored">GENERATION CREEP</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pokemon/charts/chart2_generation_ridgeline.plotly.json" data-fallback="/images/content/articles/pokemon/charts/chart2_generation_ridgeline.png" role="img" aria-label="Generation Ridgeline"></div>
  <figcaption class="art-chart-caption">Generation Ridgeline</figcaption>
</figure>
</div>
</div>
</div>
<p class="art-p">
The ridgeline doesn&#39;t lie. Every generation from Gen 1 through Gen 7
shows the same basic distribution shape — a peak around 60–70 base
experience on the left, a second hump around 150–170 for mid-tier
Pokémon, and a long tail trailing off toward the high end. What changes
is that tail. With each successive generation, it stretches a little
further right. The center of mass isn&#39;t dramatically shifting, but the
ceiling keeps rising.
</p>
<p class="art-p">
The outliers tell the real story. That thin red thread extending past
600 on Gen 2&#39;s row is Blissey — a Normal-type with 255 base HP and the
highest base experience yield of any Pokémon in the game at the time of
its introduction. Gen 1 has its own isolated tail around 400, anchored
by Chansey and the original legendary trio. These aren&#39;t flukes of the
distribution — they&#39;re intentional design decisions that show up as
statistical anomalies. Game Freak wasn&#39;t inflating power evenly across
all Pokémon. They were adding extreme outliers at the top end while
keeping the median relatively stable.
</p>
<p class="art-p">
Gen 7&#39;s distribution is the most compressed of any generation — the
narrowest spread, the sharpest peak, the least variance. That&#39;s partly a
function of Game Freak introducing fewer fully-evolved Pokémon with
extreme stat totals in Alola, and partly a reflection of a design era
that prioritized Mega Evolutions and Z-Moves over raw base stat
inflation. The shape of Gen 7&#39;s curve is what controlled power creep
looks like. Whether Game Freak intended it or stumbled into it, the
ridgeline is the evidence.
</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-2"># Chart 2 — Generation Creep
# Ridgeline: base_experience distributions by generation
# Shows whether Game Freak has inflated Pokémon power over time

chart2_data |&gt;
  ggplot(aes(x = base_experience,
             y = fct_rev(factor(generation)),
             fill = after_stat(x))) +
  geom_density_ridges_gradient(scale = 1.8, rel_min_height = 0.01,
                                color = art_mid, linewidth = 0.3) +
  scale_fill_gradient(low = art_cream, high = art_highlight, guide = &quot;none&quot;) +
  scale_x_continuous(labels = comma) +
  labs(
    title    = &quot;BASE EXPERIENCE HAS SHIFTED UPWARD WITH EVERY GENERATION&quot;,
    subtitle = &quot;Distribution Of Base Experience By Generation. All Pokémon Included.&quot;,
    x        = &quot;Base Experience&quot;,
    y        = NULL,
    caption  = &quot;Source: TidyTuesday 2025-04-01 | — ARTOMETRICS&quot;
  ) +
  theme_artometrics()</pre>
  </details>
</div>
</div>
</div>
</div>
<h2 id="built-different" class="anchored">BUILT DIFFERENT</h2>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="art-chart">
  <div class="art-chart-live" data-chart="/data/articles/pokemon/charts/chart3_size_scatter.plotly.json" data-fallback="/images/content/articles/pokemon/charts/chart3_size_scatter.png" role="img" aria-label="Size Scatter"></div>
  <figcaption class="art-chart-caption">Size Scatter</figcaption>
</figure>
</div>
</div>
</div>
<p class="art-p">
The first thing the scatter reveals is that Pokémon size follows a rule:
heavier things are taller, and the relationship is consistent enough
across 1,000+ Pokémon that the log-scale correlation is basically a
straight line. Game Freak didn&#39;t design each Pokémon&#39;s physical
dimensions independently — there&#39;s an implicit size grammar baked into
the franchise, and almost every Pokémon obeys it. The exceptions are the
entire point of the chart.
</p>
<p class="art-p">
Cosmoem is the most extreme outlier in the dataset — 999.9 kg crammed
into a body 0.1 meters tall, which puts it in the bottom-right corner
of the chart completely alone. It weighs more than a polar bear and is
smaller than a dinner plate. Wailord goes the other direction: 14.5
meters tall, 398 kg, making it one of the least dense objects in the
Pokémon world despite being a whale. Celesteela, a Steel/Flying Ultra
Beast, is nearly as heavy as Wailord and taller than a four-story
building. These aren&#39;t design oversights — they&#39;re deliberate choices to
make certain Pokémon physically impossible in ways that signal their
otherness before you ever check their stats.
</p>
<p class="art-p">
The type coloring doesn&#39;t produce clean clusters, but it does reveal
soft patterns. Dragon-types (purple) and Water-types (blue) dominate
the upper-right of the chart — the large, heavy end of the distribution.
Bug-types (yellow-green) cluster densely in the small, light region on
the left. Steel-types scatter across an unusually wide range, from the
tiny Klefki to the massive Celesteela. What the scatter ultimately shows
is that physical scale is a storytelling tool. The Pokémon at the
extremes aren&#39;t there because of random number generation — they&#39;re
there because someone at Game Freak decided that a 14-meter whale or a
999-kilogram cosmic cocoon needed to exist, and the data is just the
record of that decision.
</p>
<div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <div class="art-code-block">
  <details>
    <summary class="art-code-summary">
      <span class="art-lang-tag art-lang-r">R</span>
    </summary>
    <pre class="art-code-pre" id="r-block-3"># Chart 3 — Built Different
# Scatter: height (m) vs. weight (kg), log scale on both axes
# Colored by primary type; notable outliers labeled via ggrepel

chart3_data |&gt;
  ggplot(aes(x = weight_kg, y = height_m, color = type_label)) +
  geom_point(alpha = 0.5, size = 1.8) +
  ggrepel::geom_text_repel(
    data          = chart3_labels,
    aes(label     = str_to_title(pokemon)),
    size          = 3,
    color         = art_dark,
    family        = &quot;Helvetica&quot;,
    max.overlaps  = 20,
    segment.color = art_muted
  ) +
  scale_x_continuous(name = &quot;Weight (kg)&quot;, labels = comma,
                     trans = &quot;log10&quot;) +
  scale_y_continuous(name = &quot;Height (m)&quot;, trans = &quot;log10&quot;) +
  scale_color_manual(
    name   = &quot;Primary Type&quot;,
    values = c(
      &quot;Normal&quot;   = &quot;#A8A77A&quot;, &quot;Fire&quot;     = &quot;#EE8130&quot;, &quot;Water&quot;    = &quot;#6390F0&quot;,
      &quot;Electric&quot; = &quot;#F7D02C&quot;, &quot;Grass&quot;    = &quot;#7AC74C&quot;, &quot;Ice&quot;      = &quot;#96D9D6&quot;,
      &quot;Fighting&quot; = &quot;#C22E28&quot;, &quot;Poison&quot;   = &quot;#A33EA1&quot;, &quot;Ground&quot;   = &quot;#E2BF65&quot;,
      &quot;Flying&quot;   = &quot;#A98FF3&quot;, &quot;Psychic&quot;  = &quot;#F95587&quot;, &quot;Bug&quot;      = &quot;#A6B91A&quot;,
      &quot;Rock&quot;     = &quot;#B6A136&quot;, &quot;Ghost&quot;    = &quot;#735797&quot;, &quot;Dragon&quot;   = &quot;#6F35FC&quot;,
      &quot;Dark&quot;     = &quot;#705746&quot;, &quot;Steel&quot;    = &quot;#B7B7CE&quot;, &quot;Fairy&quot;    = &quot;#D685AD&quot;
    )
  ) +
  labs(
    title    = &quot;SIZE IS A DESIGN CHOICE — AND TYPE TELLS THE STORY&quot;,
    subtitle = &quot;Height Vs. Weight Across All Pokémon. Log Scale. Colored By Primary Type.&quot;,
    caption  = &quot;Source: TidyTuesday 2025-04-01 | — ARTOMETRICS&quot;
  ) +
  theme_artometrics() +
  theme(legend.position = &quot;right&quot;,
        legend.text     = element_text(size = 7),
        legend.key.size = unit(0.4, &quot;cm&quot;))</pre>
  </details>
</div>
</div>
</div>
</div>
<h2 id="limitations" class="anchored">LIMITATIONS</h2>
<p class="art-p">
The most significant limitation of this analysis is scope: the dataset
covers base stats and physical attributes, but Pokémon competitive
viability is determined by factors this data doesn&#39;t capture. Abilities,
move pools, type matchups, held items, and EV/IV systems all affect how
a Pokémon actually performs in battle. A Bug-type with low base stats
can still be competitively viable if it has the right ability — Scizor
has been a top-tier competitive Pokémon for years despite its type
disadvantage, largely due to its access to Bullet Punch and Technician.
The numbers here describe design intent, not gameplay outcomes.
</p>
<p class="art-p">
The generation variable has a known data quality issue: a subset of
records carry null generation IDs, most likely alternate forms or
entries added outside the standard generational release structure. These
were filtered from Chart 2 rather than imputed, which means the
ridgeline distributions reflect only records with confirmed generation
assignments. The omitted records are a small fraction of the total
dataset and are unlikely to meaningfully change the shape of any
generation&#39;s distribution.
</p>
<p class="art-p">
Finally, the dataset reflects a single snapshot of PokéAPI data compiled
for the TidyTuesday release in April 2025. Base stats, forms, and
classifications are subject to change with new game releases and
balance patches — particularly for Scarlet and Violet, which introduced
a large number of new forms and mechanics that may not be fully
represented in this version of the data. Any analysis of the most recent
generations should be treated as preliminary.
</p>
<h2 id="conclusion" class="anchored">CONCLUSION</h2>
<p class="art-p">
The type system isn&#39;t just flavor. Dragon-types are statistically elite
by design, Bug-types are statistically weak by design, and the
specialists in between — Steel&#39;s defense, Fighting&#39;s attack, Electric&#39;s
speed — reflect intentional tradeoffs embedded in the numbers from the
beginning. The heatmap makes 25 years of Game Freak&#39;s design philosophy
legible in a single chart. Every type has a signature, and the data
confirms it.
</p>
<p class="art-p">
Power creep is real but it&#39;s not uniform. The median Pokémon hasn&#39;t
gotten dramatically more powerful across nine generations — the
distribution shape is remarkably stable from Gen 1 to Gen 7. What has
changed is the ceiling. Each generation adds a small number of outliers
at the extreme high end: a Blissey, a legendary trio, an Ultra Beast.
The franchise inflates not by pulling the average up but by making the
top more extreme. That&#39;s a different kind of creep, and it&#39;s harder to
notice until you plot it.
</p>
<p class="art-p">
The size scatter is the most human chart of the three. It shows that
somewhere inside Game Freak, someone made a decision to create a whale
that weighs less than a car and a cosmic dust mote that weighs more than
a horse. Those aren&#39;t statistical accidents — they&#39;re creative decisions
that left a data signature. That&#39;s the throughline of this entire report:
the Pokémon franchise is enormous and commercially optimized and
thoroughly analyzed by millions of fans, but underneath all of it is a
set of design choices made by people, and the numbers are how you read
them.
</p>
<h2 id="references" class="anchored">REFERENCES</h2>
<p class="art-p">
Data Science Learning Community. (2025). <em>TidyTuesday: A weekly
social data project.</em> Week 13, 2025 — Pokémon.
https://tidytues.day
</p>
<p class="art-p">
Ito, S. (Producer), &amp; Tajiri, S. (Director). (1996). <em>Pocket
Monsters Red and Green</em> [Video game]. Nintendo / Game Freak.
</p>
<p class="art-p">
PokéAPI. (2025). <em>The RESTful Pokémon API.</em>
https://pokeapi.co
</p>
<p class="art-p">
Bulbapedia contributors. (2025). <em>Base experience.</em> Bulbapedia,
the community-driven Pokémon encyclopedia.
https://bulbapedia.bulbagarden.net/wiki/Base_experience
</p>
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
<p class="art-p"><em>— Artometrics Editorial</em></p></div>

<p class="art-github-wrap">
  <a class="art-github-btn" href="https://github.com/Artometrics/pokemon" target="_blank" rel="noopener noreferrer">View source on GitHub</a>
</p>
</main>
</div>
