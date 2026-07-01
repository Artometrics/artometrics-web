# Artometrics chart UI/design audit

This audit focuses on graphic design and casual-viewer usability rather than statistical truth.
It checks whether each chart has a clear headline/subtitle, useful hover/tap context, source credit, manageable label density, named legends, and enough editorial premise to feel publication-ready.

## UI summary

- Charts audited: 426
- Publication-ready: 403
- Needs polish: 23
- Rework before publishing: 0

## Most common UI/design issues

- editorial premise needs sharper framing: 219
- runtime supplies fallback hover/tap context; custom hover recommended: 181
- clear headline, source, hover context, and manageable density: 104
- uses caption as rendered headline; custom subtitle recommended: 64
- runtime names missing legend series; custom legend labels recommended: 27
- dense plot needs simplification or stronger annotations: 25
- weak editorial premise: 23
- many traces can overwhelm casual viewers: 13
- runtime hides dense always-visible labels; manual callouts recommended: 7
- many vertical categories risk cramped mobile labels: 5
- scatterplot may need clearer callouts: 3

## Articles with the most UI risk

| Rank | Article | Avg UI score | Rework | Polish | Weakest charts |
|---:|---|---:|---:|---:|---|
| 1 | `pokemon` | 76.7 | 0 | 3 | chart3_size_scatter (73); chart2_generation_ridgeline (76); chart1_stat_heatmap (81) |
| 2 | `imperial` | 77.7 | 0 | 3 | chart3_extraction_gap (76); chart1_gdppc_all_empires (77); chart2_empire_lifespan_indexed (80) |
| 3 | `readmitted` | 79.3 | 0 | 2 | chart1_states_penalized (75); chart3_penalty_by_ownership (75); chart2_err_by_condition (88) |
| 4 | `giant-the-artometrics-of-a-san-francisco-dynasty` | 80.3 | 0 | 2 | chart2_attendance (76); chart1_win_pct (81); chart3_payroll_wins (84) |
| 5 | `coffee-the-artometrics-of-java` | 80.7 | 0 | 2 | chart1_country_ridgeline (76); chart3_submetric_heatmap (81); chart2_quality_vs_retail (85) |
| 6 | `warrior-the-artometrics-of-a-golden-state-dynasty` | 83.7 | 0 | 1 | chart1_win_pct_timeline (79); chart2_three_point_revolution (84); chart3_73_win_context (88) |
| 7 | `franchise` | 84.0 | 0 | 2 | chart1_top20_revenue (79); chart2_revenue_per_year (81); chart3b_disney_consolidated (85) |
| 8 | `h3-the-artometrics-of-a-youtube-dynasty` | 84.0 | 0 | 0 | chart1_era_timeline (84); chart2_duration_drift (84); chart3_reddit_activity (84) |
| 9 | `anime` | 85.3 | 0 | 1 | chart1_releases_by_year (80); chart2_studio_consistency (88); chart3_genre_map (88) |
| 10 | `caesar-the-psychonomics-of-emperor-julius` | 85.7 | 0 | 1 | chart2_rome_gdp (78); chart3_patronage_network (88); chart1_lta_radar (91) |
| 11 | `simpsons-guest-stars` | 87.0 | 0 | 1 | chart_extra_mix (81); chart1_volume (85); chart2_leaders (89) |
| 12 | `beyonce-taylor-lyrics` | 88.0 | 0 | 1 | chart_extra_mix (81); chart2_leaders (89); chart3_category (89) |
| 13 | `languages-glottolog` | 88.0 | 0 | 1 | chart_extra_mix (81); chart2_leaders (89); chart3_category (89) |
| 14 | `un-votes` | 88.0 | 0 | 1 | chart_extra_mix (81); chart2_leaders (89); chart3_category (89) |
| 15 | `cetaceans` | 88.4 | 0 | 1 | chart1_volume (81); chart2_leaders (89); chart3_category (89) |
| 16 | `emmy-awards` | 88.4 | 0 | 1 | chart1_volume (81); chart2_leaders (89); chart3_category (89) |
| 17 | `airline-safety` | 88.6 | 0 | 0 | chart3_distribution (84); chart2_leaders (86); chart5_scatter (87) |
| 18 | `college-major-income` | 90.0 | 0 | 0 | chart2_leaders (86); chart4_gap (86); chart3_distribution (88) |
| 19 | `project-gutenberg` | 90.2 | 0 | 0 | chart2_leaders (89); chart3_category (89); chart5_frequency (89) |
| 20 | `ceo-departures` | 90.8 | 0 | 0 | chart2_leaders (86); chart3_distribution (88); chart1_breakdown (92) |
| 21 | `fast-food-calories` | 90.8 | 0 | 0 | chart2_leaders (86); chart3_distribution (88); chart1_breakdown (92) |
| 22 | `hydro-wastewater` | 90.8 | 0 | 0 | chart2_leaders (86); chart3_distribution (88); chart1_breakdown (92) |
| 23 | `broadway-musicals` | 91.6 | 0 | 0 | chart2_leaders (86); chart3_distribution (88); chart1_breakdown (92) |
| 24 | `ramen-ratings` | 91.6 | 0 | 0 | chart2_leaders (86); chart3_distribution (88); chart1_breakdown (92) |

## Lowest-scoring chart UI findings

| UI | Verdict | Article | Chart | Kind | Caption | Issues |
|---:|---|---|---|---|---|---|
| 73 | needs polish | `pokemon` | `chart3_size_scatter` | scatter | Pokémon size is design language, not just biology | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations; scatterplot may need clearer callouts |
| 75 | needs polish | `readmitted` | `chart1_states_penalized` | bar-vertical | Nearly half of all hospital-condition pairs in this dataset carry an excess readmission ratio above 1.0 | uses caption as rendered headline; custom subtitle recommended; editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; runtime hides dense always-visible labels; manual callouts recommended; many vertical categories risk cramped mobile labels |
| 75 | needs polish | `readmitted` | `chart3_penalty_by_ownership` | bar-vertical | Penalty By Ownership | uses caption as rendered headline; custom subtitle recommended; weak editorial premise; dense plot needs simplification or stronger annotations; many vertical categories risk cramped mobile labels |
| 76 | needs polish | `coffee-the-artometrics-of-java` | `chart1_country_ridgeline` | line | Ethiopia doesn’t just lead — it occupies a different part of the distribution entirely | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 76 | needs polish | `giant-the-artometrics-of-a-san-francisco-dynasty` | `chart2_attendance` | line-marker | Candlestick Park was bad in ways that are hard to fully communicate to anyone who didn’t sit through a night game there | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 76 | needs polish | `imperial` | `chart3_extraction_gap` | line | Chart 3 is the payoff | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 76 | needs polish | `pokemon` | `chart2_generation_ridgeline` | line | Later generations widen the power distribution | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 77 | needs polish | `imperial` | `chart1_gdppc_all_empires` | line | For the first 1,800 years of this chart, five of the six empire cores are essentially stationary | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 78 | needs polish | `caesar-the-psychonomics-of-emperor-julius` | `chart2_rome_gdp` | line-marker | The most important feature of this chart is not Caesar’s era — it is what comes after it | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 79 | needs polish | `franchise` | `chart1_top20_revenue` | bar-horizontal | Pokémon at $91B is not just the top of this chart — it is a different kind of number | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; runtime hides dense always-visible labels; manual callouts recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 79 | needs polish | `warrior-the-artometrics-of-a-golden-state-dynasty` | `chart1_win_pct_timeline` | line-marker | Win Pct Timeline | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 80 | needs polish | `anime` | `chart1_releases_by_year` | line | Releases By Year | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 80 | needs polish | `imperial` | `chart2_empire_lifespan_indexed` | line | Empire Lifespan Indexed | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 81 | needs polish | `beyonce-taylor-lyrics` | `chart_extra_mix` | bar-vertical | If I let you go is the most repeated line in the extract | uses caption as rendered headline; custom subtitle recommended; weak editorial premise; runtime supplies fallback hover/tap context; custom hover recommended |
| 81 | needs polish | `cetaceans` | `chart1_volume` | bar-vertical | Records By Period | uses caption as rendered headline; custom subtitle recommended; editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended; dense plot needs simplification or stronger annotations; many vertical categories risk cramped mobile labels |
| 81 | needs polish | `coffee-the-artometrics-of-java` | `chart3_submetric_heatmap` | heatmap | Ethiopia doesn’t just score higher overall — it scores higher on every single sub-metric | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; runtime hides dense always-visible labels; manual callouts recommended; dense plot needs simplification or stronger annotations |
| 81 | needs polish | `emmy-awards` | `chart1_volume` | bar-vertical | Records By Period | uses caption as rendered headline; custom subtitle recommended; editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended; dense plot needs simplification or stronger annotations; many vertical categories risk cramped mobile labels |
| 81 | needs polish | `franchise` | `chart2_revenue_per_year` | line-marker | Revenue Per Year | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; runtime hides dense always-visible labels; manual callouts recommended; dense plot needs simplification or stronger annotations |
| 81 | needs polish | `giant-the-artometrics-of-a-san-francisco-dynasty` | `chart1_win_pct` | line-marker | The New York Giants were one of the best franchises in baseball for the first half of the twentieth century | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 81 | needs polish | `languages-glottolog` | `chart_extra_mix` | bar-vertical | Identifier fields are metadata rather than a reader-facing thesis | uses caption as rendered headline; custom subtitle recommended; weak editorial premise; runtime supplies fallback hover/tap context; custom hover recommended |
| 81 | needs polish | `pokemon` | `chart1_stat_heatmap` | heatmap | Type identity is visible in the stat profile | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; runtime hides dense always-visible labels; manual callouts recommended; dense plot needs simplification or stronger annotations |
| 81 | needs polish | `simpsons-guest-stars` | `chart_extra_mix` | bar-vertical | 24 is the most repeated season in the extract | uses caption as rendered headline; custom subtitle recommended; weak editorial premise; runtime supplies fallback hover/tap context; custom hover recommended |
| 81 | needs polish | `un-votes` | `chart_extra_mix` | bar-vertical | Country codes add metadata rather than a new thesis | uses caption as rendered headline; custom subtitle recommended; weak editorial premise; runtime supplies fallback hover/tap context; custom hover recommended |
| 84 | publication-ready | `airline-safety` | `chart3_distribution` | distribution | Avail seat km per week by Type of event | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended; dense plot needs simplification or stronger annotations |
| 84 | publication-ready | `big-mac-index` | `chart3_distribution` | bar-vertical | Distribution of Big Mac dollar prices — all 1,386 country-year observations | weak editorial premise; runtime supplies fallback hover/tap context; custom hover recommended |
| 84 | publication-ready | `giant-the-artometrics-of-a-san-francisco-dynasty` | `chart3_payroll_wins` | line-marker | The scatter plot covers 32 seasons of Giants payroll history, and the first thing it tells you is that money and wins have never... | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; many traces can overwhelm casual viewers |
| 84 | publication-ready | `global-life-expectancy` | `chart3_distribution` | bar-vertical | Distribution of life expectancy — all 17,894 country-year observations | weak editorial premise; runtime supplies fallback hover/tap context; custom hover recommended |
| 84 | publication-ready | `h3-the-artometrics-of-a-youtube-dynasty` | `chart1_era_timeline` | line-marker | The shape of this chart tells you almost everything you need to know about the H3 Podcast’s commercial arc | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; dense plot needs simplification or stronger annotations |
| 84 | publication-ready | `h3-the-artometrics-of-a-youtube-dynasty` | `chart2_duration_drift` | line-marker | When H3 launched the podcast in 2017, the median episode ran 42 minutes | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; dense plot needs simplification or stronger annotations |
| 84 | publication-ready | `h3-the-artometrics-of-a-youtube-dynasty` | `chart3_reddit_activity` | line-marker | The indexed chart removes the raw scale difference between subreddits and asks a cleaner question: when did each community spike... | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; dense plot needs simplification or stronger annotations |
| 84 | publication-ready | `warrior-the-artometrics-of-a-golden-state-dynasty` | `chart2_three_point_revolution` | line | Three Point Revolution | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; dense plot needs simplification or stronger annotations |
| 85 | publication-ready | `coffee-the-artometrics-of-java` | `chart2_quality_vs_retail` | scatter | Quality Vs Retail | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended; scatterplot may need clearer callouts |
| 85 | publication-ready | `franchise` | `chart3b_disney_consolidated` | bar-horizontal | Add them up and Disney’s true total is $426 billion | uses caption as rendered headline; custom subtitle recommended; editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 85 | publication-ready | `simpsons-guest-stars` | `chart1_volume` | bar-vertical | Records By Period | uses caption as rendered headline; custom subtitle recommended; editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended; many vertical categories risk cramped mobile labels |
| 86 | publication-ready | `airline-safety` | `chart2_leaders` | bar-horizontal | United / Continental * leads at 7,139,291,291 — 3,091,881,806 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `alcohol-consumption` | `chart2_leaders` | bar-horizontal | Namibia leads at 376 — 338 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `all-the-pizza` | `chart2_leaders` | bar-horizontal | Crust Stone Oven Pizza leads at 50.0 — 40.0 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `billboard-top-100` | `chart2_leaders` | bar-horizontal | (Quarter To Four) Stomp leads at 100 — 100 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `broadway-musicals` | `chart2_leaders` | bar-horizontal | Springsteen On Broadway leads at 509 — 182 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `ceo-departures` | `chart2_leaders` | bar-horizontal | CONVERSANT INC leads at 2.50 — 2.00 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `cia-world-factbook` | `chart2_leaders` | bar-horizontal | China leads at 1,355,692,576 — 199,415,584 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `college-major-income` | `chart2_leaders` | bar-horizontal | PSYCHOLOGY leads at 48,207 — 26,912 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `college-major-income` | `chart4_gap` | bar-horizontal | Low wage jobs vs median by Major category | weak editorial premise |
| 86 | publication-ready | `exercise-usa` | `chart2_leaders` | bar-horizontal | Colorado leads at 32.0 — 28.5 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `fast-food-calories` | `chart2_leaders` | bar-horizontal | 20 piece Buttermilk Crispy Chicken Tenders leads at 2,430 — 1,315 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `hydro-wastewater` | `chart2_leaders` | bar-horizontal | Singapore leads at 223,683 — 56,849 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `ramen-ratings` | `chart2_leaders` | bar-horizontal | TTL leads at 5.00 — 5.00 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `roman-emperors` | `chart2_leaders` | bar-horizontal | Constantine the Great leads at 31.0 — 20.0 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `sherlock-holmes` | `chart2_leaders` | bar-horizontal | The Yellow Face leads at 13.0 — 12.0 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `wine-ratings` | `chart2_leaders` | bar-horizontal | Château Léoville Barton 2010 Saint-Julien leads at 100 — 100 marks the median among the top dozen | weak editorial premise |
| 87 | publication-ready | `airline-safety` | `chart5_scatter` | scatter | Avail seat km per week vs N events | runtime supplies fallback hover/tap context; custom hover recommended; dense plot needs simplification or stronger annotations; scatterplot may need clearer callouts |
| 88 | publication-ready | `anime` | `chart2_studio_consistency` | line-marker | Every studio on this chart has produced at least one great show | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended |
| 88 | publication-ready | `anime` | `chart3_genre_map` | line-marker | The genre map plots every major genre against two axes: how popular its titles are (X, log-reversed so most popular is right), and... | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended |
| 88 | publication-ready | `biketown-bikeshare` | `chart3_distribution` | distribution | Duration min by TripType | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `billboard-hot-100` | `chart3_distribution` | distribution | Distribution of run lengths for the most frequent number-one artists | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `board-games` | `chart3_distribution` | distribution | Average rating by Category | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `broadway-musicals` | `chart3_distribution` | distribution | Avg ticket price by Theatre | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `caesar-the-psychonomics-of-emperor-julius` | `chart3_patronage_network` | scatter | The network chart makes the psychonomic argument structural | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended |
| 88 | publication-ready | `ceo-departures` | `chart3_distribution` | distribution | Max tenure ceodb by Interim coceo | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `college-major-income` | `chart3_distribution` | distribution | Low wage jobs by Major category | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `fast-food-calories` | `chart3_distribution` | distribution | Calories by Restaurant | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `horror-movie-profit` | `chart3_distribution` | distribution | Domestic gross by Genre | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `horror-movies` | `chart3_distribution` | distribution | Vote average by Primary genre | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `hydro-wastewater` | `chart3_distribution` | distribution | WASTE DIS by LEVEL | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `incarceration-trends` | `chart3_distribution` | distribution | Population by Region | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `medium-articles` | `chart3_distribution` | distribution | Reading time by Publication | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `national-park-visits` | `chart3_distribution` | distribution | Visitors by Region | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `netflix-engagement` | `chart3_distribution` | distribution | Hours viewed by Source | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `nuclear-explosions` | `chart3_distribution` | distribution | Magnitude body by Purpose | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `nyc-restaurant-inspections` | `chart3_distribution` | distribution | Score by Grade | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `pixar-films` | `chart5_runtime_vs_rt` | scatter | Runtime vs Rotten Tomatoes | uses caption as rendered headline; custom subtitle recommended; editorial premise needs sharper framing; runtime hides dense always-visible labels; manual callouts recommended |
| 88 | publication-ready | `radio-stations` | `chart3_distribution` | distribution | Frequency by Format | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `ramen-ratings` | `chart3_distribution` | distribution | Stars by Country | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |
| 88 | publication-ready | `readmitted` | `chart2_err_by_condition` | line-marker | Err By Condition | uses caption as rendered headline; custom subtitle recommended; runtime supplies fallback hover/tap context; custom hover recommended; runtime names missing legend series; custom legend labels recommended |
| 88 | publication-ready | `rolling-stone-albums` | `chart3_distribution` | distribution | Rank 2003 by Type | editorial premise needs sharper framing; runtime supplies fallback hover/tap context; custom hover recommended |

## Automated rework already applied

- Runtime now hides dense always-visible scatter labels and moves them into hover/tap.
- Runtime now supplies default hover templates when Plotly JSON lacks useful hover context.
- Runtime now names missing legend series as `Series N` so legends are never blank.
- Runtime already locks zoom/pan, hides the modebar, preserves top headline/subtitle, and shows chart source credits from `data-source` or report references.

## Manual rework standard

- Replace generic captions like `Top Country` or `Relationship` with a claim.
- Prefer one annotated insight over many unlabeled points.
- Remove filler charts (`chart_extra`, `chart_pad`, `chart_fallback`) unless rewritten around a real thesis.
- Keep five-chart packages only when all five charts answer different reader questions.

