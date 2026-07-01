# Artometrics report quality audit

This audit checks article-level publication readiness: structure, source clarity, explanatory tone, chart-caption specificity, report length, and generated-prose artifacts.
It is intentionally heuristic; use it as an editorial checklist, not as a substitute for human review.

## Summary

- Reports audited: 89
- Publication-ready: 89
- Needs editorial polish: 0
- Rework before publishing: 0

## Most common issues

- complete structure, clear teaching path, sources, and claim-style charts: 54
- thin prose for a five-chart report: 22
- expected 5 charts, found 3: 9
- missing required sections: DATASET CONTEXT: 3
- abstract language may outpace concrete explanation: 1
- expected 5 charts, found 4: 1

## Lowest-scoring reports

| Score | Verdict | Report | Words | Charts | Issues |
|---:|---|---|---:|---:|---|
| 84 | publication-ready | `export-superpowers-us-china-germany` | 641 | 5 | abstract language may outpace concrete explanation; thin prose for a five-chart report |
| 92 | publication-ready | `alcohol-consumption` | 646 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `anime` | 2741 | 3 | expected 5 charts, found 3 |
| 92 | publication-ready | `awards-prestige-economy-oscars-grammys-nobels` | 631 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `caesar-the-psychonomics-of-emperor-julius` | 3578 | 3 | expected 5 charts, found 3 |
| 92 | publication-ready | `celtics-the-artometrics-of-institutional-winning` | 605 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `cetaceans` | 612 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `coffee-the-artometrics-of-java` | 3261 | 3 | expected 5 charts, found 3 |
| 92 | publication-ready | `dodgers-the-artometrics-of-baseballs-modern-machine` | 630 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `emmy-awards` | 621 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `exercise-usa` | 644 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `franchise` | 3455 | 4 | expected 5 charts, found 4 |
| 92 | publication-ready | `giant-the-artometrics-of-a-san-francisco-dynasty` | 3397 | 3 | expected 5 charts, found 3 |
| 92 | publication-ready | `h3-the-artometrics-of-a-youtube-dynasty` | 3626 | 3 | expected 5 charts, found 3 |
| 92 | publication-ready | `imperial` | 4145 | 3 | expected 5 charts, found 3 |
| 92 | publication-ready | `incarceration-trends` | 649 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `languages-glottolog` | 640 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `lego-database` | 648 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `musicbrainz-pop-fame-mechanics` | 643 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `national-export-identity-atlas` | 644 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `patriots-the-artometrics-of-the-system-dynasty` | 626 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `pokemon` | 3014 | 3 | expected 5 charts, found 3 |
| 92 | publication-ready | `project-gutenberg` | 616 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `radio-stations` | 647 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `ramen-ratings` | 642 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `readmitted` | 2938 | 3 | expected 5 charts, found 3 |
| 92 | publication-ready | `roman-emperors` | 648 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `school-diversity` | 643 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `simpsons-guest-stars` | 633 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `un-votes` | 629 | 5 | thin prose for a five-chart report |
| 92 | publication-ready | `warrior-the-artometrics-of-a-golden-state-dynasty` | 3530 | 3 | expected 5 charts, found 3 |
| 92 | publication-ready | `web-page-metrics` | 629 | 5 | thin prose for a five-chart report |
| 96 | publication-ready | `big-mac-index` | 1152 | 5 | missing required sections: DATASET CONTEXT |
| 96 | publication-ready | `billboard-hot-100` | 1289 | 5 | missing required sections: DATASET CONTEXT |
| 96 | publication-ready | `global-life-expectancy` | 1283 | 5 | missing required sections: DATASET CONTEXT |
| 100 | publication-ready | `airline-safety` | 708 | 5 | complete structure, clear teaching path, sources, and claim-style charts |
| 100 | publication-ready | `all-the-pizza` | 677 | 5 | complete structure, clear teaching path, sources, and claim-style charts |
| 100 | publication-ready | `beyonce-taylor-lyrics` | 651 | 5 | complete structure, clear teaching path, sources, and claim-style charts |
| 100 | publication-ready | `biketown-bikeshare` | 673 | 5 | complete structure, clear teaching path, sources, and claim-style charts |
| 100 | publication-ready | `billboard-top-100` | 657 | 5 | complete structure, clear teaching path, sources, and claim-style charts |

## Teacher-of-the-year checklist

- Start with the reader's question, not the dataset's column names.
- Explain what a metric means before asking the reader to care about it.
- Make every chart caption a claim, not a field label.
- Show the expert path (source, assumptions, caveats) without blocking the beginner path.
- Avoid grand abstractions unless the next sentence cashes them out into a mechanism or data point.
- Distinguish observed source data, derived metrics, and editorial indices.
- Keep five-chart reports focused: each chart should answer a different reader question.
- If a chart is a framework or hypothesis map, say so plainly.
