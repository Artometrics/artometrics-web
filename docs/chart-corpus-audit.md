# Artometrics chart corpus audit

This is a heuristic editorial audit of charts embedded in `src/content/blog/*.md`.
It is meant to prioritize design and chart-selection work, not to validate the math.

## Corpus summary

- Charts audited: 321
- Articles with charts: 68
- Keep: 128
- Rework: 173
- Drop candidates: 20

## Chart families

- bar-horizontal: 115
- line-marker: 79
- scatter: 44
- distribution: 37
- bar-vertical: 34
- line: 8
- heatmap: 3
- mixed: 1

## Lowest-scoring articles to review first

| Rank | Article | Avg score | Drop | Rework | Why first |
|---:|---|---:|---:|---:|---|
| 1 | `un-votes` | 57.0 | 2 | 3 | chart_extra_mix (drop candidate); chart2_leaders (drop candidate) |
| 2 | `beyonce-taylor-lyrics` | 58.8 | 1 | 4 | chart_extra_mix (drop candidate); chart5_frequency (rework) |
| 3 | `languages-glottolog` | 58.8 | 1 | 4 | chart_extra_mix (drop candidate); chart5_frequency (rework) |
| 4 | `college-major-income` | 61.6 | 2 | 2 | chart4_gap (drop candidate); chart2_leaders (drop candidate) |
| 5 | `project-gutenberg` | 61.6 | 1 | 4 | chart_top_names (drop candidate); chart5_frequency (rework) |
| 6 | `ramen-ratings` | 64.0 | 1 | 3 | chart4_gap (drop candidate); chart2_leaders (rework) |
| 7 | `wine-ratings` | 64.0 | 1 | 3 | chart4_gap (drop candidate); chart2_leaders (rework) |
| 8 | `hydro-wastewater` | 64.2 | 1 | 3 | chart2_leaders (drop candidate); chart4_gap (rework) |
| 9 | `simpsons-guest-stars` | 65.0 | 1 | 3 | chart_extra_mix (drop candidate); chart5_frequency (rework) |
| 10 | `broadway-musicals` | 65.8 | 0 | 4 | chart2_leaders (rework); chart4_gap (rework) |
| 11 | `uk-museums` | 65.8 | 0 | 4 | chart2_leaders (rework); chart4_gap (rework) |
| 12 | `airline-safety` | 66.0 | 0 | 4 | chart2_leaders (rework); chart4_gap (rework) |
| 13 | `readmitted` | 66.3 | 1 | 1 | chart3_penalty_by_ownership (drop candidate); chart1_states_penalized (rework) |
| 14 | `ceo-departures` | 66.8 | 0 | 4 | chart2_leaders (rework); chart4_gap (rework) |
| 15 | `fast-food-calories` | 67.0 | 0 | 4 | chart2_leaders (rework); chart4_gap (rework) |
| 16 | `world-heritage-sites` | 67.4 | 0 | 4 | chart3_grouped_year (rework); chart2_leaders (rework) |
| 17 | `wealth-income` | 68.4 | 0 | 4 | chart4_gap (rework); chart3_distribution (rework) |
| 18 | `cetaceans` | 68.6 | 1 | 3 | chart3_category (drop candidate); chart2_leaders (rework) |
| 19 | `emmy-awards` | 68.6 | 1 | 3 | chart3_category (drop candidate); chart2_leaders (rework) |
| 20 | `cia-world-factbook` | 69.8 | 1 | 2 | chart2_leaders (drop candidate); chart3_distribution (rework) |

## Weakest individual charts

| Score | Verdict | Article | Chart | Kind | Caption | Reasons |
|---:|---|---|---|---|---|---|
| 40 | drop candidate | `beyonce-taylor-lyrics` | `chart_extra_mix` | bar-vertical | Line | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 40 | drop candidate | `languages-glottolog` | `chart_extra_mix` | bar-vertical | Id | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 40 | drop candidate | `simpsons-guest-stars` | `chart_extra_mix` | bar-vertical | Season | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 40 | drop candidate | `un-votes` | `chart_extra_mix` | bar-vertical | Country code | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 44 | drop candidate | `readmitted` | `chart3_penalty_by_ownership` | bar-vertical | Penalty By Ownership | bar-vertical chart; multi-series context; generated filler chart id; repeats chart family in article |
| 47 | drop candidate | `cia-world-factbook` | `chart2_leaders` | bar-horizontal | Top Country | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point; example article needs manual math/editorial review |
| 47 | drop candidate | `college-major-income` | `chart4_gap` | bar-horizontal | Low wage jobs vs median by Major category | bar-horizontal chart; strong analytical frame; generic caption; repeats chart family in article; example article needs manual math/editorial review |
| 51 | drop candidate | `alcohol-consumption` | `chart2_leaders` | bar-horizontal | Top Country | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 51 | drop candidate | `hydro-wastewater` | `chart2_leaders` | bar-horizontal | Top COUNTRY | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 51 | drop candidate | `ramen-ratings` | `chart4_gap` | bar-horizontal | Stars vs median by Country | bar-horizontal chart; strong analytical frame; generic caption; repeats chart family in article |
| 51 | drop candidate | `un-votes` | `chart2_leaders` | bar-horizontal | Top Country | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 51 | drop candidate | `wine-ratings` | `chart4_gap` | bar-horizontal | Points vs median by Country | bar-horizontal chart; strong analytical frame; generic caption; repeats chart family in article |
| 54 | drop candidate | `project-gutenberg` | `chart_top_names` | bar-horizontal | Top Subject | bar-horizontal chart; repeats chart family in article |
| 56 | drop candidate | `cetaceans` | `chart3_category` | bar-vertical | Transfer | bar-vertical chart; repeats chart family in article |
| 56 | drop candidate | `college-major-income` | `chart2_leaders` | bar-horizontal | Top Major | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point; example article needs manual math/editorial review |
| 56 | drop candidate | `emmy-awards` | `chart3_category` | bar-vertical | Type | bar-vertical chart; repeats chart family in article |
| 57 | drop candidate | `big-mac-index` | `chart3_distribution` | bar-vertical | Distribution of Big Mac dollar prices — all 1,386 country-year observations | bar-vertical chart; generic caption |
| 57 | drop candidate | `global-life-expectancy` | `chart3_distribution` | bar-vertical | Distribution of life expectancy — all 17,894 country-year observations | bar-vertical chart; generic caption |
| 57 | drop candidate | `hurricanes-puerto-rico` | `chart3_distribution` | bar-vertical | Value Distribution | bar-vertical chart; generic caption |
| 57 | drop candidate | `us-tuition` | `chart3_distribution` | bar-vertical | Value Distribution | bar-vertical chart; generic caption |
| 58 | rework | `beyonce-taylor-lyrics` | `chart5_frequency` | distribution | Appearance Spread | distribution chart |
| 58 | rework | `franchise` | `chart3b_disney_consolidated` | bar-horizontal | Disney Consolidated | bar-horizontal chart; multi-series context; repeats chart family in article |
| 58 | rework | `languages-glottolog` | `chart5_frequency` | distribution | Appearance Spread | distribution chart |
| 58 | rework | `project-gutenberg` | `chart5_frequency` | distribution | Appearance Spread | distribution chart |
| 58 | rework | `simpsons-guest-stars` | `chart5_frequency` | distribution | Appearance Spread | distribution chart |
| 58 | rework | `super-bowl-ads` | `chart3_distribution` | distribution | View count by Kind | distribution chart |
| 58 | rework | `un-votes` | `chart5_frequency` | distribution | Appearance Spread | distribution chart |
| 59 | rework | `caesar-the-psychonomics-of-emperor-julius` | `chart1_lta_radar` | mixed | Lta Radar | mixed chart; multi-series context |
| 60 | rework | `airline-safety` | `chart2_leaders` | bar-horizontal | Top Airline | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `airline-safety` | `chart4_gap` | bar-horizontal | Avail seat km per week vs median by Type of event | bar-horizontal chart; strong analytical frame; repeats chart family in article |
| 60 | rework | `all-the-pizza` | `chart2_leaders` | bar-horizontal | Top Name | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `beyonce-taylor-lyrics` | `chart2_leaders` | bar-horizontal | Top Song name | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `billboard-top-100` | `chart2_leaders` | bar-horizontal | Top Song | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `broadway-musicals` | `chart2_leaders` | bar-horizontal | Top Show | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `broadway-musicals` | `chart4_gap` | bar-horizontal | Avg ticket price vs median by Theatre | bar-horizontal chart; strong analytical frame; repeats chart family in article |
| 60 | rework | `ceo-departures` | `chart2_leaders` | bar-horizontal | Top Coname | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `ceo-departures` | `chart4_gap` | bar-horizontal | Max tenure ceodb vs median by Interim coceo | bar-horizontal chart; strong analytical frame; repeats chart family in article |
| 60 | rework | `cetaceans` | `chart2_leaders` | bar-horizontal | Top Species | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `comic-characters` | `chart3_distribution` | distribution | Appearances by Publisher | distribution chart; multi-series context |
| 60 | rework | `craft-beer-usa` | `chart2_leaders` | bar-horizontal | Top Name | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `emmy-awards` | `chart2_leaders` | bar-horizontal | Top Title | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `exercise-usa` | `chart2_leaders` | bar-horizontal | Top State | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `fast-food-calories` | `chart2_leaders` | bar-horizontal | Top Item | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `fast-food-calories` | `chart4_gap` | bar-horizontal | Calories vs median by Restaurant | bar-horizontal chart; strong analytical frame; repeats chart family in article |
| 60 | rework | `hydro-wastewater` | `chart4_gap` | bar-horizontal | WASTE DIS vs median by LEVEL | bar-horizontal chart; strong analytical frame; repeats chart family in article |
| 60 | rework | `languages-glottolog` | `chart2_leaders` | bar-horizontal | Top Name | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `netflix-titles` | `chart3_distribution` | distribution | Duration by Type | distribution chart; multi-series context |
| 60 | rework | `project-gutenberg` | `chart2_leaders` | bar-horizontal | Top Subject | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `radio-stations` | `chart2_leaders` | bar-horizontal | Top Call sign | bar-horizontal chart; repeats chart family in article; ranking chart needs a sharper editorial point |
| 60 | rework | `radio-stations` | `chart4_gap` | bar-horizontal | Frequency vs median by Format | bar-horizontal chart; strong analytical frame; repeats chart family in article |

## Editorial guidance

- Keep charts that show change over time, concentration, dispersion with context, or a surprising relationship.
- Rework generic leaderboards into claims: who is leading, by how much, and why that matters.
- Drop repeated chart families inside the same article unless the second version answers a different question.
- Prefer portrait/mobile-friendly story cards for social sharing: headline, subtitle, plot, source, and one annotation.
- The next manual pass should start with low-scoring articles and replace filler charts with fewer, stronger figures.

