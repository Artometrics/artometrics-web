# Artometrics chart UI/design audit

This audit focuses on graphic design and casual-viewer usability rather than statistical truth.
It checks whether each chart has a clear headline/subtitle, useful hover/tap context, source credit, manageable label density, named legends, and enough editorial premise to feel publication-ready.

## UI summary

- Charts audited: 426
- Publication-ready: 426
- Needs polish: 0
- Rework before publishing: 0

## Most common UI/design issues

- editorial premise needs sharper framing: 220
- clear headline, source, hover context, and manageable density: 161
- dense plot needs simplification or stronger annotations: 25
- weak editorial premise: 22
- many traces can overwhelm casual viewers: 13
- many vertical categories risk cramped mobile labels: 5
- scatterplot may need clearer callouts: 3

## Articles with the most UI risk

| Rank | Article | Avg UI score | Rework | Polish | Weakest charts |
|---:|---|---:|---:|---:|---|
| 1 | `imperial` | 89.7 | 0 | 0 | chart3_extraction_gap (88); chart1_gdppc_all_empires (89); chart2_empire_lifespan_indexed (92) |
| 2 | `pokemon` | 89.7 | 0 | 0 | chart3_size_scatter (85); chart2_generation_ridgeline (88); chart1_stat_heatmap (96) |
| 3 | `airline-safety` | 91.4 | 0 | 0 | chart2_leaders (86); chart3_distribution (90); chart5_scatter (93) |
| 4 | `college-major-income` | 92.0 | 0 | 0 | chart2_leaders (86); chart4_gap (86); chart1_breakdown (94) |
| 5 | `readmitted` | 92.0 | 0 | 0 | chart3_penalty_by_ownership (86); chart1_states_penalized (90); chart2_err_by_condition (100) |
| 6 | `giant-the-artometrics-of-a-san-francisco-dynasty` | 92.3 | 0 | 0 | chart2_attendance (88); chart1_win_pct (93); chart3_payroll_wins (96) |
| 7 | `beyonce-taylor-lyrics` | 92.4 | 0 | 0 | chart_extra_mix (86); chart1_category (94); chart2_leaders (94) |
| 8 | `languages-glottolog` | 92.4 | 0 | 0 | chart_extra_mix (86); chart1_category (94); chart2_leaders (94) |
| 9 | `un-votes` | 92.4 | 0 | 0 | chart_extra_mix (86); chart1_category (94); chart2_leaders (94) |
| 10 | `simpsons-guest-stars` | 92.8 | 0 | 0 | chart_extra_mix (86); chart1_volume (90); chart2_leaders (94) |
| 11 | `broadway-musicals` | 93.6 | 0 | 0 | chart2_leaders (86); chart1_breakdown (94); chart3_distribution (94) |
| 12 | `ceo-departures` | 93.6 | 0 | 0 | chart2_leaders (86); chart1_breakdown (94); chart3_distribution (94) |
| 13 | `cetaceans` | 93.6 | 0 | 0 | chart1_volume (86); chart1_category (94); chart2_leaders (94) |
| 14 | `emmy-awards` | 93.6 | 0 | 0 | chart1_volume (86); chart1_category (94); chart2_leaders (94) |
| 15 | `fast-food-calories` | 93.6 | 0 | 0 | chart2_leaders (86); chart1_breakdown (94); chart3_distribution (94) |
| 16 | `hydro-wastewater` | 93.6 | 0 | 0 | chart2_leaders (86); chart1_breakdown (94); chart3_distribution (94) |
| 17 | `ramen-ratings` | 93.6 | 0 | 0 | chart2_leaders (86); chart1_breakdown (94); chart3_distribution (94) |
| 18 | `roman-emperors` | 93.6 | 0 | 0 | chart2_leaders (86); chart1_breakdown (94); chart3_distribution (94) |
| 19 | `wine-ratings` | 93.6 | 0 | 0 | chart2_leaders (86); chart1_breakdown (94); chart3_distribution (94) |
| 20 | `coffee-the-artometrics-of-java` | 93.7 | 0 | 0 | chart1_country_ridgeline (88); chart3_submetric_heatmap (96); chart2_quality_vs_retail (97) |
| 21 | `project-gutenberg` | 94.0 | 0 | 0 | chart1_category (94); chart2_leaders (94); chart3_category (94) |
| 22 | `caesar-the-psychonomics-of-emperor-julius` | 94.7 | 0 | 0 | chart2_rome_gdp (90); chart1_lta_radar (94); chart3_patronage_network (100) |
| 23 | `alcohol-consumption` | 94.8 | 0 | 0 | chart2_leaders (86); chart1_breakdown (94); chart3_distribution (94) |
| 24 | `all-the-pizza` | 94.8 | 0 | 0 | chart2_leaders (86); chart1_breakdown (94); chart3_distribution (94) |

## Lowest-scoring chart UI findings

| UI | Verdict | Article | Chart | Kind | Caption | Issues |
|---:|---|---|---|---|---|---|
| 85 | publication-ready | `pokemon` | `chart3_size_scatter` | scatter | Pokémon size is design language, not just biology | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations; scatterplot may need clearer callouts |
| 86 | publication-ready | `airline-safety` | `chart2_leaders` | bar-horizontal | United / Continental * leads at 7,139,291,291 — 3,091,881,806 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `alcohol-consumption` | `chart2_leaders` | bar-horizontal | Namibia leads at 376 — 338 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `all-the-pizza` | `chart2_leaders` | bar-horizontal | Crust Stone Oven Pizza leads at 50.0 — 40.0 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `beyonce-taylor-lyrics` | `chart_extra_mix` | bar-vertical | If I let you go is the most repeated line in the extract | weak editorial premise |
| 86 | publication-ready | `big-mac-index` | `chart3_distribution` | bar-vertical | Distribution of Big Mac dollar prices — all 1,386 country-year observations | weak editorial premise |
| 86 | publication-ready | `billboard-top-100` | `chart2_leaders` | bar-horizontal | (Quarter To Four) Stomp leads at 100 — 100 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `broadway-musicals` | `chart2_leaders` | bar-horizontal | Springsteen On Broadway leads at 509 — 182 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `ceo-departures` | `chart2_leaders` | bar-horizontal | CONVERSANT INC leads at 2.50 — 2.00 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `cetaceans` | `chart1_volume` | bar-vertical | Records By Period | editorial premise needs sharper framing; dense plot needs simplification or stronger annotations; many vertical categories risk cramped mobile labels |
| 86 | publication-ready | `cia-world-factbook` | `chart2_leaders` | bar-horizontal | China leads at 1,355,692,576 — 199,415,584 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `college-major-income` | `chart2_leaders` | bar-horizontal | PSYCHOLOGY leads at 48,207 — 26,912 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `college-major-income` | `chart4_gap` | bar-horizontal | Low wage jobs vs median by Major category | weak editorial premise |
| 86 | publication-ready | `emmy-awards` | `chart1_volume` | bar-vertical | Records By Period | editorial premise needs sharper framing; dense plot needs simplification or stronger annotations; many vertical categories risk cramped mobile labels |
| 86 | publication-ready | `exercise-usa` | `chart2_leaders` | bar-horizontal | Colorado leads at 32.0 — 28.5 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `fast-food-calories` | `chart2_leaders` | bar-horizontal | 20 piece Buttermilk Crispy Chicken Tenders leads at 2,430 — 1,315 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `global-life-expectancy` | `chart3_distribution` | bar-vertical | Distribution of life expectancy — all 17,894 country-year observations | weak editorial premise |
| 86 | publication-ready | `hydro-wastewater` | `chart2_leaders` | bar-horizontal | Singapore leads at 223,683 — 56,849 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `languages-glottolog` | `chart_extra_mix` | bar-vertical | Identifier fields are metadata rather than a reader-facing thesis | weak editorial premise |
| 86 | publication-ready | `ramen-ratings` | `chart2_leaders` | bar-horizontal | TTL leads at 5.00 — 5.00 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `readmitted` | `chart3_penalty_by_ownership` | bar-vertical | For-profit hospitals are penalized slightly more often, but every ownership type has a broad no-penalty base | editorial premise needs sharper framing; dense plot needs simplification or stronger annotations; many vertical categories risk cramped mobile labels |
| 86 | publication-ready | `roman-emperors` | `chart2_leaders` | bar-horizontal | Constantine the Great leads at 31.0 — 20.0 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `sherlock-holmes` | `chart2_leaders` | bar-horizontal | The Yellow Face leads at 13.0 — 12.0 marks the median among the top dozen | weak editorial premise |
| 86 | publication-ready | `simpsons-guest-stars` | `chart_extra_mix` | bar-vertical | 24 is the most repeated season in the extract | weak editorial premise |
| 86 | publication-ready | `un-votes` | `chart_extra_mix` | bar-vertical | Country codes add metadata rather than a new thesis | weak editorial premise |
| 86 | publication-ready | `wine-ratings` | `chart2_leaders` | bar-horizontal | Château Léoville Barton 2010 Saint-Julien leads at 100 — 100 marks the median among the top dozen | weak editorial premise |
| 88 | publication-ready | `coffee-the-artometrics-of-java` | `chart1_country_ridgeline` | line | Ethiopia doesn’t just lead — it occupies a different part of the distribution entirely | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 88 | publication-ready | `giant-the-artometrics-of-a-san-francisco-dynasty` | `chart2_attendance` | line-marker | Candlestick Park was bad in ways that are hard to fully communicate to anyone who didn’t sit through a night game there | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 88 | publication-ready | `imperial` | `chart3_extraction_gap` | line | Chart 3 is the payoff | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 88 | publication-ready | `pokemon` | `chart2_generation_ridgeline` | line | Later generations widen the power distribution | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 89 | publication-ready | `imperial` | `chart1_gdppc_all_empires` | line | For the first 1,800 years of this chart, five of the six empire cores are essentially stationary | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 90 | publication-ready | `airline-safety` | `chart3_distribution` | distribution | Avail seat km per week by Type of event | editorial premise needs sharper framing; dense plot needs simplification or stronger annotations |
| 90 | publication-ready | `caesar-the-psychonomics-of-emperor-julius` | `chart2_rome_gdp` | line-marker | The most important feature of this chart is not Caesar’s era — it is what comes after it | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 90 | publication-ready | `readmitted` | `chart1_states_penalized` | bar-vertical | Nearly half of all hospital-condition pairs in this dataset carry an excess readmission ratio above 1.0 | editorial premise needs sharper framing; many vertical categories risk cramped mobile labels |
| 90 | publication-ready | `simpsons-guest-stars` | `chart1_volume` | bar-vertical | Records By Period | editorial premise needs sharper framing; many vertical categories risk cramped mobile labels |
| 91 | publication-ready | `warrior-the-artometrics-of-a-golden-state-dynasty` | `chart1_win_pct_timeline` | line-marker | Win Pct Timeline | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 92 | publication-ready | `anime` | `chart1_releases_by_year` | line | Releases By Year | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 92 | publication-ready | `imperial` | `chart2_empire_lifespan_indexed` | line | Empire Lifespan Indexed | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 93 | publication-ready | `airline-safety` | `chart5_scatter` | scatter | Avail seat km per week vs N events | dense plot needs simplification or stronger annotations; scatterplot may need clearer callouts |
| 93 | publication-ready | `giant-the-artometrics-of-a-san-francisco-dynasty` | `chart1_win_pct` | line-marker | The New York Giants were one of the best franchises in baseball for the first half of the twentieth century | many traces can overwhelm casual viewers; dense plot needs simplification or stronger annotations |
| 94 | publication-ready | `airline-safety` | `chart1_breakdown` | bar-horizontal | Avail seat km per week by Airline | editorial premise needs sharper framing |
| 94 | publication-ready | `airline-safety` | `chart4_gap` | bar-horizontal | Avail seat km per week vs median by Type of event | editorial premise needs sharper framing |
| 94 | publication-ready | `alcohol-consumption` | `chart1_breakdown` | bar-horizontal | Beer servings by Country | editorial premise needs sharper framing |
| 94 | publication-ready | `alcohol-consumption` | `chart3_distribution` | bar-vertical | Beer servings Distribution | editorial premise needs sharper framing |
| 94 | publication-ready | `all-the-pizza` | `chart1_breakdown` | bar-horizontal | Price range min by Name | editorial premise needs sharper framing |
| 94 | publication-ready | `all-the-pizza` | `chart3_distribution` | bar-vertical | Price range min Distribution | editorial premise needs sharper framing |
| 94 | publication-ready | `awards-prestige-economy-oscars-grammys-nobels` | `chart4_attention_concentration` | bar-vertical | The public remembers faces and names before institutional categories | editorial premise needs sharper framing |
| 94 | publication-ready | `awards-prestige-economy-oscars-grammys-nobels` | `chart5_gatekeeping_vs_discovery` | scatter | Awards still decide which works get a second life | editorial premise needs sharper framing |
| 94 | publication-ready | `beyonce-taylor-lyrics` | `chart1_category` | bar-horizontal | Beyoncé dominates with 22,616 records | editorial premise needs sharper framing |
| 94 | publication-ready | `beyonce-taylor-lyrics` | `chart2_leaders` | bar-horizontal | Top Song name | editorial premise needs sharper framing |
| 94 | publication-ready | `beyonce-taylor-lyrics` | `chart3_category` | bar-vertical | Beyoncé is the largest bucket with 22,616 records | editorial premise needs sharper framing |
| 94 | publication-ready | `beyonce-taylor-lyrics` | `chart5_frequency` | distribution | Most song name entities appear only once; a small head revisits repeatedly | editorial premise needs sharper framing |
| 94 | publication-ready | `big-mac-index` | `chart2_leaders` | bar-horizontal | Top 12 countries by average Big Mac dollar price (all years combined) | editorial premise needs sharper framing |
| 94 | publication-ready | `biketown-bikeshare` | `chart2_leaders` | bar-horizontal | Design Week Portland Pop Up - Disabled leads at 40.6 — 29.0 marks the median among the top dozen | editorial premise needs sharper framing |
| 94 | publication-ready | `biketown-bikeshare` | `chart3_distribution` | distribution | Duration min by TripType | editorial premise needs sharper framing |
| 94 | publication-ready | `biketown-bikeshare` | `chart4_gap` | bar-horizontal | Duration min vs median by TripType | editorial premise needs sharper framing |
| 94 | publication-ready | `billboard-hot-100` | `chart2_leaders` | bar-horizontal | Top 12 songs by total weeks at number one | editorial premise needs sharper framing |
| 94 | publication-ready | `billboard-hot-100` | `chart3_distribution` | distribution | Distribution of run lengths for the most frequent number-one artists | editorial premise needs sharper framing |
| 94 | publication-ready | `billboard-hot-100` | `chart4_gap` | bar-horizontal | Artist average run length vs the global median (2 weeks) | editorial premise needs sharper framing |
| 94 | publication-ready | `billboard-top-100` | `chart1_breakdown` | bar-horizontal | Week position by Song | editorial premise needs sharper framing |
| 94 | publication-ready | `billboard-top-100` | `chart3_distribution` | bar-vertical | Week position Distribution | editorial premise needs sharper framing |
| 94 | publication-ready | `board-games` | `chart2_leaders` | bar-horizontal | Small World Designer Edition leads at 9.00 — 8.78 marks the median among the top dozen | editorial premise needs sharper framing |
| 94 | publication-ready | `board-games` | `chart3_distribution` | distribution | Average rating by Category | editorial premise needs sharper framing |
| 94 | publication-ready | `board-games` | `chart4_gap` | bar-horizontal | Average rating vs median by Category | editorial premise needs sharper framing |
| 94 | publication-ready | `broadway-musicals` | `chart1_breakdown` | bar-horizontal | Avg ticket price by Show | editorial premise needs sharper framing |
| 94 | publication-ready | `broadway-musicals` | `chart3_distribution` | distribution | Avg ticket price by Theatre | editorial premise needs sharper framing |
| 94 | publication-ready | `broadway-musicals` | `chart4_gap` | bar-horizontal | Avg ticket price vs median by Theatre | editorial premise needs sharper framing |
| 94 | publication-ready | `caesar-the-psychonomics-of-emperor-julius` | `chart1_lta_radar` | mixed | Caesar’s LTA profile has a distinctive asymmetric shape that makes the psychonomic argument visible before you read a word | editorial premise needs sharper framing |
| 94 | publication-ready | `california-vs-texas-state-rivalry` | `chart1_why_compared` | bar-horizontal | California and Texas are rival systems because both are big enough to feel like countries | editorial premise needs sharper framing |
| 94 | publication-ready | `california-vs-texas-state-rivalry` | `chart5_rivalry_questions` | bar-vertical | The useful California-Texas questions are about irreplaceable exports, talent, climate, and who benefits | editorial premise needs sharper framing |
| 94 | publication-ready | `celtics-the-artometrics-of-institutional-winning` | `chart1_banner_density` | bar-vertical | Celtics NBA titles by decade | editorial premise needs sharper framing |
| 94 | publication-ready | `celtics-the-artometrics-of-institutional-winning` | `chart2_title_ceiling` | bar-horizontal | NBA championships by major franchise | editorial premise needs sharper framing |
| 94 | publication-ready | `celtics-the-artometrics-of-institutional-winning` | `chart4_drought_pressure` | bar-vertical | Selected Celtics championship gaps | editorial premise needs sharper framing |
| 94 | publication-ready | `ceo-departures` | `chart1_breakdown` | bar-horizontal | Max tenure ceodb by Coname | editorial premise needs sharper framing |
| 94 | publication-ready | `ceo-departures` | `chart3_distribution` | distribution | Max tenure ceodb by Interim coceo | editorial premise needs sharper framing |

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

