# Artometrics chart corpus audit

This is a heuristic editorial audit of charts embedded in `src/content/blog/*.md`.
It is meant to prioritize design and chart-selection work, not to validate the math.

## Corpus summary

- Charts audited: 426
- Articles with charts: 89
- Keep: 184
- Rework: 220
- Drop candidates: 22

## Chart families

- bar-horizontal: 145
- line-marker: 95
- scatter: 77
- bar-vertical: 55
- distribution: 37
- line: 8
- heatmap: 8
- mixed: 1

## Lowest-scoring articles to review first

| Rank | Article | Avg score | Drop | Rework | Why first |
|---:|---|---:|---:|---:|---|
| 1 | `beyonce-taylor-lyrics` | 60.4 | 1 | 4 | chart_extra_mix (drop candidate); chart5_frequency (rework) |
| 2 | `languages-glottolog` | 60.4 | 1 | 4 | chart_extra_mix (drop candidate); chart5_frequency (rework) |
| 3 | `un-votes` | 60.4 | 1 | 4 | chart_extra_mix (drop candidate); chart5_frequency (rework) |
| 4 | `college-major-income` | 62.2 | 2 | 2 | chart2_leaders (drop candidate); chart4_gap (drop candidate) |
| 5 | `project-gutenberg` | 64.0 | 0 | 5 | chart5_frequency (rework); chart_top_names (rework) |
| 6 | `ramen-ratings` | 64.6 | 1 | 3 | chart2_leaders (drop candidate); chart4_gap (rework) |
| 7 | `wine-ratings` | 64.6 | 1 | 3 | chart2_leaders (drop candidate); chart4_gap (rework) |
| 8 | `simpsons-guest-stars` | 65.8 | 1 | 3 | chart_extra_mix (drop candidate); chart5_frequency (rework) |
| 9 | `broadway-musicals` | 66.4 | 1 | 3 | chart2_leaders (drop candidate); chart3_distribution (rework) |
| 10 | `airline-safety` | 66.6 | 1 | 3 | chart2_leaders (drop candidate); chart3_distribution (rework) |
| 11 | `hydro-wastewater` | 66.6 | 1 | 3 | chart2_leaders (drop candidate); chart3_distribution (rework) |
| 12 | `ceo-departures` | 67.4 | 1 | 3 | chart2_leaders (drop candidate); chart3_distribution (rework) |
| 13 | `wealth-income` | 67.4 | 0 | 4 | chart2_leaders (rework); chart3_distribution (rework) |
| 14 | `fast-food-calories` | 67.6 | 1 | 3 | chart2_leaders (drop candidate); chart3_distribution (rework) |
| 15 | `uk-museums` | 68.2 | 0 | 4 | chart3_distribution (rework); chart2_leaders (rework) |
| 16 | `cia-world-factbook` | 68.8 | 1 | 2 | chart2_leaders (drop candidate); chart3_distribution (rework) |
| 17 | `world-heritage-sites` | 69.0 | 0 | 3 | chart3_grouped_year (rework); chart2_leaders (rework) |
| 18 | `cetaceans` | 70.2 | 0 | 4 | chart3_category (rework); chart1_volume (rework) |
| 19 | `emmy-awards` | 70.2 | 0 | 4 | chart3_category (rework); chart1_volume (rework) |
| 20 | `roman-emperors` | 70.8 | 1 | 3 | chart2_leaders (drop candidate); chart3_distribution (rework) |

## Weakest individual charts

| Score | Verdict | Article | Chart | Kind | Caption | Reasons |
|---:|---|---|---|---|---|---|
| 44 | drop candidate | `beyonce-taylor-lyrics` | `chart_extra_mix` | bar-vertical | If I let you go is the most repeated line in the extract | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 44 | drop candidate | `languages-glottolog` | `chart_extra_mix` | bar-vertical | Identifier fields are metadata rather than a reader-facing thesis | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 44 | drop candidate | `simpsons-guest-stars` | `chart_extra_mix` | bar-vertical | 24 is the most repeated season in the extract | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 44 | drop candidate | `un-votes` | `chart_extra_mix` | bar-vertical | Country codes add metadata rather than a new thesis | bar-vertical chart; generated filler chart id; repeats chart family in article |
| 51 | drop candidate | `cia-world-factbook` | `chart2_leaders` | bar-horizontal | China leads at 1,355,692,576 — 199,415,584 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point; example article needs manual math/editorial review |
| 51 | drop candidate | `college-major-income` | `chart2_leaders` | bar-horizontal | PSYCHOLOGY leads at 48,207 — 26,912 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point; example article needs manual math/editorial review |
| 55 | drop candidate | `airline-safety` | `chart2_leaders` | bar-horizontal | United / Continental * leads at 7,139,291,291 — 3,091,881,806 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `alcohol-consumption` | `chart2_leaders` | bar-horizontal | Namibia leads at 376 — 338 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `all-the-pizza` | `chart2_leaders` | bar-horizontal | Crust Stone Oven Pizza leads at 50.0 — 40.0 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `billboard-top-100` | `chart2_leaders` | bar-horizontal | (Quarter To Four) Stomp leads at 100 — 100 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `broadway-musicals` | `chart2_leaders` | bar-horizontal | Springsteen On Broadway leads at 509 — 182 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `ceo-departures` | `chart2_leaders` | bar-horizontal | CONVERSANT INC leads at 2.50 — 2.00 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `college-major-income` | `chart4_gap` | bar-horizontal | Low wage jobs vs median by Major category | bar-horizontal chart; strong analytical frame; generic caption; repeats chart family in article; example article needs manual math/editorial review |
| 55 | drop candidate | `exercise-usa` | `chart2_leaders` | bar-horizontal | Colorado leads at 32.0 — 28.5 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `fast-food-calories` | `chart2_leaders` | bar-horizontal | 20 piece Buttermilk Crispy Chicken Tenders leads at 2,430 — 1,315 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `hydro-wastewater` | `chart2_leaders` | bar-horizontal | Singapore leads at 223,683 — 56,849 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `ramen-ratings` | `chart2_leaders` | bar-horizontal | TTL leads at 5.00 — 5.00 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `roman-emperors` | `chart2_leaders` | bar-horizontal | Constantine the Great leads at 31.0 — 20.0 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `sherlock-holmes` | `chart2_leaders` | bar-horizontal | The Yellow Face leads at 13.0 — 12.0 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 55 | drop candidate | `wine-ratings` | `chart2_leaders` | bar-horizontal | Château Léoville Barton 2010 Saint-Julien leads at 100 — 100 marks the median among the top dozen | bar-horizontal chart; generic caption; repeats chart family in article; ranking chart needs a sharper editorial point |
| 57 | drop candidate | `big-mac-index` | `chart3_distribution` | bar-vertical | Distribution of Big Mac dollar prices — all 1,386 country-year observations | bar-vertical chart; generic caption |
| 57 | drop candidate | `global-life-expectancy` | `chart3_distribution` | bar-vertical | Distribution of life expectancy — all 17,894 country-year observations | bar-vertical chart; generic caption |
| 58 | rework | `beyonce-taylor-lyrics` | `chart5_frequency` | distribution | Most song name entities appear only once; a small head revisits repeatedly | distribution chart |
| 58 | rework | `languages-glottolog` | `chart5_frequency` | distribution | Most languages appear once while a small head repeats | distribution chart |
| 58 | rework | `project-gutenberg` | `chart5_frequency` | distribution | Repeated subjects reveal the reusable canon | distribution chart |
| 58 | rework | `simpsons-guest-stars` | `chart5_frequency` | distribution | Most guest star entities appear only once; a small head revisits repeatedly | distribution chart |
| 58 | rework | `super-bowl-ads` | `chart3_distribution` | distribution | View count by Kind | distribution chart |
| 58 | rework | `un-votes` | `chart5_frequency` | distribution | Country appearances follow a long-tail pattern | distribution chart |
| 59 | rework | `caesar-the-psychonomics-of-emperor-julius` | `chart1_lta_radar` | mixed | Caesar’s LTA profile has a distinctive asymmetric shape that makes the psychonomic argument visible before you read a word | mixed chart; multi-series context |
| 59 | rework | `ramen-ratings` | `chart4_gap` | bar-horizontal | Stars vs median by Country | bar-horizontal chart; strong analytical frame; generic caption; repeats chart family in article |
| 59 | rework | `wine-ratings` | `chart4_gap` | bar-horizontal | Points vs median by Country | bar-horizontal chart; strong analytical frame; generic caption; repeats chart family in article |
| 60 | rework | `cetaceans` | `chart3_category` | bar-vertical | US is the largest bucket with 2,172 records | bar-vertical chart; repeats chart family in article |
| 60 | rework | `comic-characters` | `chart3_distribution` | distribution | Appearances by Publisher | distribution chart; multi-series context |
| 60 | rework | `emmy-awards` | `chart3_category` | bar-vertical | Nominee is the largest bucket with 23,739 records | bar-vertical chart; repeats chart family in article |
| 60 | rework | `netflix-titles` | `chart3_distribution` | distribution | Duration by Type | distribution chart; multi-series context |
| 60 | rework | `web-page-metrics` | `chart3_distribution` | distribution | P50 by Client | distribution chart; multi-series context |
| 60 | rework | `world-heritage-sites` | `chart3_grouped_year` | bar-vertical | Value by year and Country | bar-vertical chart; multi-series context; generic caption |
| 61 | rework | `airline-safety` | `chart3_distribution` | distribution | Avail seat km per week by Type of event | distribution chart; multi-series context |
| 61 | rework | `biketown-bikeshare` | `chart2_leaders` | bar-horizontal | Design Week Portland Pop Up - Disabled leads at 40.6 — 29.0 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `board-games` | `chart2_leaders` | bar-horizontal | Small World Designer Edition leads at 9.00 — 8.78 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `christmas-songs` | `chart2_leaders` | bar-horizontal | BETTER DAYS leads at 20.0 — 17.0 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `comic-characters` | `chart2_leaders` | bar-horizontal | Spider-Man (Peter Parker) leads at 4,043 — 2,377 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `global-plastic-waste` | `chart2_leaders` | bar-horizontal | Qatar leads at 118,396 — 67,799 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `horror-movies` | `chart2_leaders` | bar-horizontal | The House Guest leads at 10.0 — 10.0 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `hurricanes-puerto-rico` | `chart2_leaders` | bar-horizontal | Texas leads at 983 — 621 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `hydro-wastewater` | `chart3_distribution` | distribution | WASTE DIS by LEVEL | distribution chart; multi-series context |
| 61 | rework | `incarceration-trends` | `chart2_leaders` | bar-horizontal | DC leads at 190,209 — 24,944 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `lego-database` | `chart2_leaders` | bar-horizontal | World Map leads at 11,695 — 5,792 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `medium-articles` | `chart2_leaders` | bar-horizontal | My month-long quest to become a chess master from scratch leads at 100 — 68.0 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |
| 61 | rework | `national-park-visits` | `chart2_leaders` | bar-horizontal | Golden Gate leads at 14,554,750 — 5,151,270 marks the median among the top dozen | bar-horizontal chart; generic caption; ranking chart needs a sharper editorial point |

## Editorial guidance

- Keep charts that show change over time, concentration, dispersion with context, or a surprising relationship.
- Rework generic leaderboards into claims: who is leading, by how much, and why that matters.
- Drop repeated chart families inside the same article unless the second version answers a different question.
- Prefer portrait/mobile-friendly story cards for social sharing: headline, subtitle, plot, source, and one annotation.
- The next manual pass should start with low-scoring articles and replace filler charts with fewer, stronger figures.

