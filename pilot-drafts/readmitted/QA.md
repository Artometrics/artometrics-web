# READMITTED — QA checklist (pilot)

**Report:** https://artometrics.com/readmitted/  
**Repo:** https://github.com/Artometrics/readmitted  
**Date:** 2026-07-02

## Chart pairs (PNG + Plotly JSON)

| Chart | PNG | Plotly JSON | Status |
|-------|-----|-------------|--------|
| chart1_states_penalized | yes | yes | Pass |
| chart2_err_by_condition | yes | yes | Pass |
| chart3_penalty_by_ownership | yes | yes | Pass |

## Static vs interactive consistency

- **Chart 1:** State ordering and national-average reference line (48.1%) match between PNG and web Plotly. Hover shows percent penalized per state.
- **Chart 2:** Condition ERR ordering preserved; Hip/Knee leads at 1.00485. Web chart uses same values as editorial prose.
- **Chart 3:** Stacked ownership tiers use Artometrics palette (`#2C3E6B`, `#7F8FA6`, `#E07B54`, `#C0392B`). For-profit bar shows heavier High/Medium share vs non-profit.

## Prose enhancements applied

- Opening lede cites ACA origins, Krumholz research, MedPAC critique of the 30-day window
- Chart sections name specific systems (HCA, Tenet, Steward, RWJBarnabas, Mass General Brigham)
- Each chart has a claim-style caption plus a **What to take away** insight box
- References expanded with MedPAC Chapter 9

## Chart design (v2)

- Value labels on state bars; national-average reference line annotated
- Chart 2 uses lollipop layout with Hip/Knee callout annotation
- Chart 3 horizontal stacked bars with for-profit High-tier label
- ARTOMETRICS brand mark baked into Plotly annotations
- Save/Share toolbar overlays chart (top-right); Plotly native download on desktop hover

## Site features verified

- [x] Sync copies PNG → `public/images/.../charts/`
- [x] Sync copies JSON → `public/data/.../charts/`
- [x] Per-chart **Save PNG** toolbar on article pages
- [x] Per-chart **Share chart** sheet (Web Share API + X/LinkedIn/copy link)

## Pending approval before GitHub push

- Push updated `charts/` folder to `Artometrics/readmitted` on `main`
- Optional: re-render `readmitted.html` via Quarto locally
