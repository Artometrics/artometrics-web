# Artometrics chart corpus audit

This is a heuristic editorial audit of charts embedded in `src/content/blog/*.md`.
It is meant to prioritize design and chart-selection work, not to validate the math.

## Corpus summary

- Charts audited: 366
- Articles with charts: 77
- Keep: 153
- Rework: 199
- Drop candidates: 14

## Chart families

- bar-horizontal: 133
- line-marker: 83
- scatter: 56
- bar-vertical: 45
- distribution: 37
- line: 8
- heatmap: 3
- mixed: 1

## Lowest-scoring articles to review first

| Rank | Article | Avg score | Drop | Rework | Why first |
|---:|---|---:|---:|---:|---|
| 1 | `un-votes` | 58.6 | 2 | 3 | chart_extra_mix (drop candidate); chart2_leaders (drop candidate) |
| 2 | `beyonce-taylor-lyrics` | 60.4 | 1 | 4 | chart_extra_mix (drop candidate); chart5_frequency (rework) |
| 3 | `languages-glottolog` | 60.4 | 1 | 4 | chart_extra_mix (drop candidate); chart5_frequency (rework) |
| 4 | `college-major-income` | 64.0 | 1 | 3 | chart4_gap (drop candidate); chart2_leaders (rework) |
| 5 | `project-gutenberg` | 64.0 | 0 | 5 | chart5_frequency (rework); chart_top_names (rework) |
| 6 | `simpsons-guest-stars` | 65.8 | 1 | 3 | chart_extra_mix (drop candidate); chart5_frequency (rework) |
| 7 | `ramen-ratings` | 66.4 | 0 | 4 | chart4_gap (rework); chart3_distribution (rework) |
| 8 | `wine-ratings` | 66.4 | 0 | 4 | chart4_gap (rework); chart3_distribution (rework) |
| 9 | `hydro-wastewater` | 66.6 | 1 | 3 | chart2_leaders (drop candidate); chart3_distribution (rework) |
| 10 | `readmitted` | 67.7 | 1 | 1 | chart3_penalty_by_ownership (drop candidate); chart1_states_penalized (rework) |
| 11 | `broadway-musicals` | 68.2 | 0 | 4 | chart3_distribution (rework); chart2_leaders (rework) |
| 12 | `uk-museums` | 68.2 | 0 | 4 | chart3_distribution (rework); chart2_leaders (rework) |
| 13 | `airline-safety` | 68.4 | 0 | 4 | chart3_distribution (rework); chart2_leaders (rework) |
| 14 | `world-heritage-sites` | 69.0 | 0 | 3 | chart3_grouped_year (rework); chart2_leaders (rework) |
| 15 | `ceo-departures` | 69.2 | 0 | 4 | chart3_distribution (rework); chart2_leaders (rework) |
| 16 | `wealth-income` | 69.2 | 0 | 4 | chart3_distribution (rework); chart4_gap (rework) |
| 17 | `fast-food-calories` | 69.4 | 0 | 4 | chart3_distribution (rework); chart2_leaders (rework) |
| 18 | `cetaceans` | 70.2 | 0 | 4 | chart3_category (rework); chart1_volume (rework) |
| 19 | `emmy-awards` | 70.2 | 0 | 4 | chart3_category (rework); chart1_volume (rework) |
| 20 | `cia-world-factbook` | 70.6 | 1 | 2 | chart2_leaders (drop candidate); chart3_distribution (rework) |

## Weakest individual charts

| Score | Verdict | Article | Chart | Kind | Caption | Reasons |
|---:|---|---|---|---|---|---|
| 44 | drop candidate | `beyonce-taylor-lyrics` | `chart_extra_mix` | bar-vertical | Line | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 44 | drop candidate | `languages-glottolog` | `chart_extra_mix` | bar-vertical | Id | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 44 | drop candidate | `simpsons-guest-stars` | `chart_extra_mix` | bar-vertical | Season | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 44 | drop candidate | `un-votes` | `chart_extra_mix` | bar-vertical | Country code | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 48 | drop candidate | `readmitted` | `chart3_penalty_by_ownership` | bar-vertical | Penalty By Ownership | bar-vertical chart; multi-series context; generated filler chart id; repeats chart family in article |
| 51 | drop candidate | `cia-world-factbook` | `chart2_leaders` | bar-horizontal | Top Country | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point; example article needs manual math/editorial review |
| 55 | drop candidate | `alcohol-consumption` | `chart2_leaders` | bar-horizontal | Top Country | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `college-major-income` | `chart4_gap` | bar-horizontal | Low wage jobs vs median by Major category | bar-horizontal chart; strong analytical frame; generic caption; repeats chart family in article; example article needs manual math/editorial review |
| 55 | drop candidate | `hydro-wastewater` | `chart2_leaders` | bar-horizontal | Top COUNTRY | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `un-votes` | `chart2_leaders` | bar-horizontal | Top Country | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 57 | drop candidate | `big-mac-index` | `chart3_distribution` | bar-vertical | Distribution of Big Mac dollar prices — all 1,386 country-year observations | bar-vertical chart; generic caption |
| 57 | drop candidate | `global-life-expectancy` | `chart3_distribution` | bar-vertical | Distribution of life expectancy — all 17,894 country-year observations | bar-vertical chart; generic caption |
| 57 | drop candidate | `hurricanes-puerto-rico` | `chart3_distribution` | bar-vertical | Value Distribution | bar-vertical chart; generic caption |
| 57 | drop candidate | `us-tuition` | `chart3_distribution` | bar-vertical | Value Distribution | bar-vertical chart; generic caption |
| 58 | rework | `beyonce-taylor-lyrics` | `chart5_frequency` | distribution | Appearance Spread | distribution chart |
| 58 | rework | `languages-glottolog` | `chart5_frequency` | distribution | Appearance Spread | distribution chart |
| 58 | rework | `project-gutenberg` | `chart5_frequency` | distribution | Appearance Spread | distribution chart |
| 58 | rework | `simpsons-guest-stars` | `chart5_frequency` | distribution | Appearance Spread | distribution chart |
| 58 | rework | `super-bowl-ads` | `chart3_distribution` | distribution | View count by Kind | distribution chart |
| 58 | rework | `un-votes` | `chart5_frequency` | distribution | Appearance Spread | distribution chart |
| 59 | rework | `caesar-the-psychonomics-of-emperor-julius` | `chart1_lta_radar` | mixed | Lta Radar | mixed chart; multi-series context |
| 59 | rework | `ramen-ratings` | `chart4_gap` | bar-horizontal | Stars vs median by Country | bar-horizontal chart; strong analytical frame; generic caption; repeats chart family in article |
| 59 | rework | `wine-ratings` | `chart4_gap` | bar-horizontal | Points vs median by Country | bar-horizontal chart; strong analytical frame; generic caption; repeats chart family in article |
| 60 | rework | `cetaceans` | `chart3_category` | bar-vertical | Transfer | bar-vertical chart; repeats chart family in article |
| 60 | rework | `college-major-income` | `chart2_leaders` | bar-horizontal | Top Major | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point; example article needs manual math/editorial review |
| 60 | rework | `comic-characters` | `chart3_distribution` | distribution | Appearances by Publisher | distribution chart; multi-series context |
| 60 | rework | `emmy-awards` | `chart3_category` | bar-vertical | Type | bar-vertical chart; repeats chart family in article |
| 60 | rework | `netflix-titles` | `chart3_distribution` | distribution | Duration by Type | distribution chart; multi-series context |
| 60 | rework | `web-page-metrics` | `chart3_distribution` | distribution | P50 by Client | distribution chart; multi-series context |
| 60 | rework | `world-heritage-sites` | `chart3_grouped_year` | bar-vertical | Value by year and Country | bar-vertical chart; multi-series context; generic caption |
| 61 | rework | `airline-safety` | `chart3_distribution` | distribution | Avail seat km per week by Type of event | distribution chart; multi-series context |
| 61 | rework | `hydro-wastewater` | `chart3_distribution` | distribution | WASTE DIS by LEVEL | distribution chart; multi-series context |
| 61 | rework | `nuclear-explosions` | `chart2_leaders` | bar-horizontal | Top Country | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `world-heritage-sites` | `chart2_leaders` | bar-horizontal | Top Country | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 62 | rework | `biketown-bikeshare` | `chart3_distribution` | distribution | Duration min by TripType | distribution chart; multi-series context |
| 62 | rework | `celtics-the-artometrics-of-institutional-winning` | `chart1_banner_density` | bar-vertical | Celtics NBA titles by decade | bar-vertical chart; ranking chart needs a sharper editorial point |
| 62 | rework | `ceo-departures` | `chart3_distribution` | distribution | Max tenure ceodb by Interim coceo | distribution chart; multi-series context |
| 62 | rework | `cetaceans` | `chart1_volume` | bar-vertical | Records By Period | bar-vertical chart; ranking chart needs a sharper editorial point |
| 62 | rework | `cia-world-factbook` | `chart3_distribution` | bar-vertical | Population Distribution | bar-vertical chart; example article needs manual math/editorial review |
| 62 | rework | `dodgers-the-artometrics-of-baseballs-modern-machine` | `chart1_pennant_machine` | bar-vertical | Dodgers pennants by decade | bar-vertical chart; ranking chart needs a sharper editorial point |
| 62 | rework | `emmy-awards` | `chart1_volume` | bar-vertical | Records By Period | bar-vertical chart; ranking chart needs a sharper editorial point |
| 62 | rework | `incarceration-trends` | `chart3_distribution` | distribution | Population by Region | distribution chart; multi-series context |
| 62 | rework | `netflix-engagement` | `chart3_distribution` | distribution | Hours viewed by Source | distribution chart; multi-series context |
| 62 | rework | `patriots-the-artometrics-of-the-system-dynasty` | `chart4_conference_gate` | bar-horizontal | AFC championship appearances since 2001 | bar-horizontal chart; repeats chart family in article |
| 62 | rework | `project-gutenberg` | `chart_top_names` | bar-horizontal | Top Subject | bar-horizontal chart; repeats chart family in article |
| 62 | rework | `simpsons-guest-stars` | `chart1_volume` | bar-vertical | Records By Period | bar-vertical chart; ranking chart needs a sharper editorial point |
| 62 | rework | `yankees-the-artometrics-of-baseballs-empire` | `chart1_banner_clusters` | bar-vertical | World Series titles by decade | bar-vertical chart; ranking chart needs a sharper editorial point |
| 63 | rework | `billboard-hot-100` | `chart3_distribution` | distribution | Distribution of run lengths for the most frequent number-one artists | distribution chart; multi-series context |
| 63 | rework | `board-games` | `chart3_distribution` | distribution | Average rating by Category | distribution chart; multi-series context |
| 63 | rework | `broadway-musicals` | `chart3_distribution` | distribution | Avg ticket price by Theatre | distribution chart; multi-series context |

## Editorial guidance

- Keep charts that show change over time, concentration, dispersion with context, or a surprising relationship.
- Rework generic leaderboards into claims: who is leading, by how much, and why that matters.
- Drop repeated chart families inside the same article unless the second version answers a different question.
- Prefer portrait/mobile-friendly story cards for social sharing: headline, subtitle, plot, source, and one annotation.
- The next manual pass should start with low-scoring articles and replace filler charts with fewer, stronger figures.

