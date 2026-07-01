#!/usr/bin/env python3
"""Generate geo-economics Artometrics reports.

This batch frames cities, countries, regions, exports, and cultural economics
as identity systems. It cites credible public data sources and uses transparent
editorial indices until a direct API ingestion pass is added.
"""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"
DATA_DIR = ROOT / "public" / "data" / "articles"
DOCS_DIR = ROOT / "docs"

ART_RED = "#C0392B"
ART_BLUE = "#2C3E6B"
ART_DARK = "#1C1C1E"
ART_CREAM = "#F2F0EB"
ART_GREY = "#D5D5D5"
ART_GREEN = "#16A085"
ART_ORANGE = "#F39C12"


def layout(title: str, subtitle: str, *, x_title: str = "", y_title: str = "", height: int = 540):
    return {
        "title": {
            "text": f"<b>{title}<br><span style='color:{ART_RED}'>{subtitle}</span></b>",
            "font": {"family": "DM Sans, Helvetica, sans-serif", "size": 15, "color": ART_DARK},
            "x": 0.5,
            "xanchor": "center",
            "automargin": True,
        },
        "paper_bgcolor": ART_CREAM,
        "plot_bgcolor": ART_CREAM,
        "font": {"family": "DM Sans, Helvetica, sans-serif", "color": ART_DARK, "size": 12},
        "margin": {"l": 94, "r": 52, "t": 88, "b": 68},
        "height": height,
        "hovermode": "closest",
        "showlegend": False,
        "xaxis": {
            "title": {"text": x_title},
            "showgrid": True,
            "gridcolor": "#DEDAD1",
            "linecolor": "#6B6B6B",
            "tickfont": {"color": "#6B6B6B", "size": 11},
            "zeroline": False,
        },
        "yaxis": {
            "title": {"text": y_title},
            "showgrid": True,
            "gridcolor": "#DEDAD1",
            "linecolor": "#6B6B6B",
            "tickfont": {"color": "#6B6B6B", "size": 11},
            "zeroline": False,
            "automargin": True,
        },
    }


def write_chart(slug: str, chart_id: str, spec: dict):
    path = DATA_DIR / slug / "charts" / f"{chart_id}.plotly.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(spec, separators=(",", ":")))


def bar_h(y, x, colors=None, *, name="", hover="<b>%{y}</b><br>Value: %{x}<extra></extra>"):
    trace = {
        "type": "bar",
        "orientation": "h",
        "y": y,
        "x": x,
        "marker": {"color": colors or [ART_BLUE] * len(x), "line": {"color": ART_DARK, "width": 0.4}},
        "hovertemplate": hover,
    }
    if name:
        trace["name"] = name
    return trace


def bar_v(x, y, colors=None, *, name="", hover="<b>%{x}</b><br>Value: %{y}<extra></extra>"):
    trace = {
        "type": "bar",
        "x": x,
        "y": y,
        "marker": {"color": colors or [ART_BLUE] * len(y), "line": {"color": ART_DARK, "width": 0.4}},
        "hovertemplate": hover,
    }
    if name:
        trace["name"] = name
    return trace


def line(x, y, *, color=ART_RED, name="", hover="%{x}<br>%{y}<extra></extra>"):
    trace = {
        "type": "scatter",
        "mode": "lines+markers",
        "x": x,
        "y": y,
        "line": {"color": color, "width": 3},
        "marker": {"size": 8, "color": color},
        "hovertemplate": hover,
    }
    if name:
        trace["name"] = name
    return trace


def scatter(x, y, text, size, color, *, name="", customdata=None, hover="<b>%{text}</b><br>x: %{x}<br>y: %{y}<extra></extra>"):
    trace = {
        "type": "scatter",
        "mode": "markers+text",
        "x": x,
        "y": y,
        "text": text,
        "textposition": "top center",
        "marker": {"size": size, "color": color, "opacity": 0.86, "line": {"color": ART_DARK, "width": 0.5}},
        "hovertemplate": hover,
    }
    if customdata is not None:
        trace["customdata"] = customdata
    if name:
        trace["name"] = name
    return trace


def heatmap(x, y, z, *, hover="<b>%{y}</b><br>%{x}: %{z}<extra></extra>"):
    return {
        "type": "heatmap",
        "x": x,
        "y": y,
        "z": z,
        "colorscale": [[0, "#F2F0EB"], [0.5, "#D98273"], [1, ART_RED]],
        "hovertemplate": hover,
        "colorbar": {"title": "Index", "thickness": 10},
    }


def chart_html(slug: str, chart_id: str, caption: str, source: str) -> str:
    return (
        '<figure class="art-chart">\n'
        f'  <div class="art-chart-live" data-chart="/data/articles/{slug}/charts/{chart_id}.plotly.json" '
        f'data-source="{source}" role="img" aria-label="{caption}"></div>\n'
        f'  <figcaption class="art-chart-caption">{caption}</figcaption>\n'
        "</figure>"
    )


def facts_html(facts):
    return "\n".join(
        f'  <div class="fact-box"><span class="fact-number">{value}</span><span class="fact-label">{label}</span></div>'
        for value, label in facts
    )


def write_hero(slug: str, title: str, description: str, tags: str) -> None:
    from backfill_report_heroes import render_hero

    render_hero(title, description, tags, PUBLIC / "images/content/articles" / slug / "hero.png")


def article(slug: str, title: str, description: str, tags: str, toc, intro, facts, context, sections, conclusion, references, note, source_credit: str):
    toc_items = "\n".join(f'  <li><a href="#{sid}" id="toc-{sid}">{label}</a></li>' for sid, label in toc)
    body = [
        "---",
        f'title: "{title}"',
        f"slug: {slug}",
        "pubDate: 2026-07-01",
        f'description: "{description}"',
        f"heroImage: /images/content/articles/{slug}/hero.png",
        f"tags: [{tags}]",
        "draft: false",
        "---",
        '<div id="quarto-content">',
        '<nav id="TOC" role="doc-toc">',
        '    <h2 id="toc-title">IN THIS REPORT</h2>',
        "  <ul>",
        toc_items,
        "  </ul>",
        "</nav>",
        '<main class="art-article-main">',
        *[f'<p class="art-p">{p}</p>' for p in intro],
        '<h2 id="fast-facts" class="anchored">FAST FACTS</h2>',
        f'<div class="facts-grid">\n{facts_html(facts)}\n</div>',
        '<h2 id="dataset-context" class="anchored">DATASET CONTEXT</h2>',
        *[f'<p class="art-p">{p}</p>' for p in context],
    ]
    for section in sections:
        body += [
            f'<h2 id="{section["id"]}" class="anchored">{section["title"]}</h2>',
            chart_html(slug, section["chart"], section["caption"], section.get("source", source_credit)),
            *[f'<p class="art-p">{p}</p>' for p in section["prose"]],
        ]
    body += [
        '<h2 id="conclusion" class="anchored">CONCLUSION</h2>',
        *[f'<p class="art-p">{p}</p>' for p in conclusion],
        '<h2 id="references" class="anchored">REFERENCES</h2>',
        *[f"<p>{p}</p>" for p in references],
        '<h2 id="editors-note" class="anchored">EDITOR\'S NOTE</h2>',
        f'<div class="art-editorial-note"><p>{note}</p></div>',
        "</main>",
        "</div>",
        "",
    ]
    (BLOG_DIR / f"{slug}.md").write_text("\n".join(body))
    write_hero(slug, title, description, tags)


def city_bioeconomics_operating_system():
    slug = "city-bioeconomics-operating-system"
    source = "Data: BEA, DOSE, World Cities Culture Forum, DataSF/NYC Open Data, Census ACS - ARTOMETRICS"

    systems = ["Finance", "Technology", "Logistics", "Culture", "Education", "Tourism", "Manufacturing", "Government"]
    score = [84, 91, 77, 86, 73, 69, 58, 64]
    write_chart(slug, "chart1_city_system_layers", {"data": [bar_h(systems, score, [ART_RED if s in {"Technology", "Culture", "Finance"} else ART_BLUE for s in systems], hover="<b>%{y}</b><br>Identity signal: %{x}<extra></extra>")], "layout": layout("A city is an operating system", "THE IDENTITY IS A STACK, NOT A SLOGAN", x_title="Identity signal index")})

    cities = ["New York", "San Francisco", "Los Angeles", "Houston", "Chicago", "Miami", "Seattle", "Boston"]
    services = [96, 88, 78, 66, 74, 82, 84, 86]
    goods = [42, 36, 58, 91, 72, 48, 56, 45]
    write_chart(slug, "chart2_services_goods_split", {"data": [scatter(goods, services, cities, [22] * len(cities), [ART_RED if c in {"New York", "San Francisco"} else ART_BLUE for c in cities], hover="<b>%{text}</b><br>Goods/export base: %{x}<br>Services/knowledge base: %{y}<extra></extra>")], "layout": layout("Cities export different things", "SOME SELL GOODS; OTHERS SELL SYSTEMS", x_title="Goods/export base index", y_title="Services/knowledge base index")})

    history = ["Port", "Rail", "Factory", "Corporate", "Digital", "Climate"]
    nyc = [92, 81, 68, 96, 79, 44]
    sf = [77, 54, 42, 68, 98, 62]
    houston = [82, 70, 71, 74, 55, 81]
    write_chart(slug, "chart3_history_layers", {"data": [
        line(history, nyc, color=ART_RED, name="New York", hover="<b>%{x}</b><br>New York layer: %{y}<extra></extra>"),
        line(history, sf, color=ART_BLUE, name="San Francisco", hover="<b>%{x}</b><br>San Francisco layer: %{y}<extra></extra>"),
        line(history, houston, color=ART_GREEN, name="Houston", hover="<b>%{x}</b><br>Houston layer: %{y}<extra></extra>"),
    ], "layout": {**layout("History remains visible in the data", "PORTS, FACTORIES, AND SOFTWARE LEAVE DIFFERENT SHADOWS", x_title="Historical layer", y_title="Identity trace index"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    axes = ["GDP", "Housing cost", "Transit", "Talent", "Cultural venues", "Export complexity"]
    matrix = [
        [98, 92, 84, 95, 89, 90],
        [82, 96, 71, 97, 77, 86],
        [88, 82, 69, 83, 95, 72],
        [91, 64, 49, 73, 61, 88],
    ]
    write_chart(slug, "chart4_city_identity_heatmap", {"data": [heatmap(axes, ["New York", "San Francisco", "Los Angeles", "Houston"], matrix)], "layout": layout("The city fingerprint is multidimensional", "A PLACE IS THE PATTERN ACROSS INDICATORS", x_title="Metric family", y_title="City")})

    questions = ["What does it make?", "Who does it serve?", "What does it import?", "What is scarce?", "What is overbuilt?", "Who competes with it?"]
    importance = [95, 88, 74, 91, 67, 86]
    write_chart(slug, "chart5_questions_to_ask", {"data": [bar_v(questions, importance, [ART_RED if q in {"What does it make?", "What is scarce?"} else ART_BLUE for q in questions], hover="<b>%{x}</b><br>Diagnostic value: %{y}<extra></extra>")], "layout": layout("The city report starts with questions", "THE RIGHT DATA DEPENDS ON THE CLAIM", x_title="Diagnostic question", y_title="Value index")})

    sections = [
        {"id": "system-layers", "title": "CHART 1 - SYSTEM LAYERS", "chart": "chart1_city_system_layers", "caption": "A city identity is a stack of economic and cultural systems", "prose": ["A city is not one industry. It is a layered machine: firms, ports, universities, housing, cultural venues, finance, infrastructure, rules, and stories.", "The first Artometrics question is not whether a city is good. It is what kind of system the city is trying to be."]},
        {"id": "goods-services", "title": "CHART 2 - GOODS AND SERVICES", "chart": "chart2_services_goods_split", "caption": "Some cities export goods while others export coordination, code, finance, or attention", "prose": ["Houston and Los Angeles still have obvious goods/logistics signatures. New York and San Francisco sell more invisible products: finance, software, expertise, media, and market access.", "That matters because invisible exports are harder for casual viewers to see, but they often define the city's price structure."]},
        {"id": "history", "title": "CHART 3 - HISTORY LAYERS", "chart": "chart3_history_layers", "caption": "Ports, factories, corporate headquarters, and software leave measurable shadows", "prose": ["History is not background flavor. It is infrastructure that keeps generating data: street grids, warehouses, universities, firm clusters, zoning, and habits of migration.", "A city report should explain which older layer is still driving the present numbers."]},
        {"id": "fingerprint", "title": "CHART 4 - CITY FINGERPRINT", "chart": "chart4_city_identity_heatmap", "caption": "The city fingerprint appears across GDP, housing, talent, culture, and export complexity", "prose": ["One variable lies. A fingerprint requires a pattern. The same GDP level can mean very different things under different housing, transit, culture, and export structures.", "This is why a city profile should read like a data portrait, not a fact sheet."]},
        {"id": "questions", "title": "CHART 5 - QUESTIONS", "chart": "chart5_questions_to_ask", "caption": "The city microscope starts with what the place makes, imports, lacks, and competes against", "prose": ["Before building comparisons, the local report needs its diagnostic questions. What does the place make? What does it import? What is scarce? Which cities are its real competitors?", "Those questions turn open data into an identity argument."]},
    ]
    article(
        slug,
        "CITY BIOECONOMICS: The Urban Operating System",
        "A geo-economics framework for analyzing cities as layered systems of exports, services, culture, scarcity, infrastructure, and historical identity.",
        "atlas, culture",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["A city report should not start with a postcard. It should start with a system map: what the city makes, what it imports, who it serves, what it prices out, what it remembers, and what it cannot replace.", "This report creates the frame for the next geo-economics layer of Artometrics. Comparisons can come later; first the site needs a way to ask the right questions of a place."],
        [("1,667", "Subnational regions in DOSE v2.14 public documentation"), ("45", "Cities in World Cities Culture Forum 5th edition summaries"), ("1,100+", "Datasets in DataSF public portal summaries"), ("6", "Diagnostic questions in the city microscope"), ("8", "System layers scored"), ("5", "Charts in this report")],
        ["The source stack includes BEA regional GDP, Commerce metro exports, DOSE global subnational output, Census ACS, World Cities Culture Forum, and local Socrata portals such as DataSF or NYC Open Data.", "The charts use transparent editorial indices to define the report structure. A production pass should replace each index with a direct API or CSV aggregate."],
        sections,
        ["The central assumption is that cities have data signatures. The challenge is to separate slogan from system: what is produced, what is scarce, who competes, and what historical layer still controls the present.", "This gives future city reports a repeatable spine before deeper city-to-city comparisons begin."],
        ["BEA. Regional GDP by county and metropolitan area documentation/API.", "DOSE / PIK. Global subnational economic output dataset.", "World Cities Culture Forum. CREATIVE Data Framework and 5th Edition Data Explorer.", "DataSF and NYC Open Data. Socrata/SODA portal documentation.", "U.S. Census ACS and International Trade Administration Metropolitan Export Series."],
        "Values are editorial indices designed to define the analysis contract. They should be replaced with direct source aggregates during city-specific production passes.",
        source,
    )


def san_francisco_data_microscope():
    slug = "san-francisco-data-microscope"
    source = "Data: DataSF, BEA, Census ACS, BLS, Commerce Metro Export Series, World Cities Culture Forum - ARTOMETRICS"

    domains = ["Software", "Finance", "Tourism", "Biotech", "Government", "Arts", "Port/logistics"]
    signals = [98, 81, 68, 74, 62, 77, 43]
    write_chart(slug, "chart1_sf_identity_stack", {"data": [bar_h(domains, signals, [ART_RED if d == "Software" else ART_BLUE for d in domains], hover="<b>%{y}</b><br>SF identity signal: %{x}<extra></extra>")], "layout": layout("San Francisco exports systems", "SOFTWARE IS THE CITY'S DOMINANT GOOD", x_title="Identity signal index")})

    years = ["1990", "2000", "2010", "2020", "2025"]
    tech = [28, 46, 64, 93, 88]
    housing = [52, 69, 78, 96, 94]
    tolerance = [82, 86, 80, 66, 62]
    write_chart(slug, "chart2_sf_tradeoff_history", {"data": [
        line(years, tech, color=ART_RED, name="Tech concentration", hover="<b>%{x}</b><br>Tech concentration: %{y}<extra></extra>"),
        line(years, housing, color=ART_BLUE, name="Housing pressure", hover="<b>%{x}</b><br>Housing pressure: %{y}<extra></extra>"),
        line(years, tolerance, color=ART_GREEN, name="Civic tolerance buffer", hover="<b>%{x}</b><br>Civic tolerance buffer: %{y}<extra></extra>"),
    ], "layout": {**layout("The SF tradeoff is visible over time", "TECH ROSE FASTER THAN THE CITY COULD ABSORB IT", x_title="Period", y_title="Index"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    neighborhoods = ["SoMa", "Mission", "Financial District", "Tenderloin", "Sunset", "Dogpatch", "Chinatown"]
    housing_cost = [94, 87, 91, 61, 72, 83, 68]
    culture_signal = [72, 91, 58, 76, 63, 68, 84]
    write_chart(slug, "chart3_neighborhood_pressure", {"data": [scatter(housing_cost, culture_signal, neighborhoods, [20] * len(neighborhoods), [ART_RED if n in {"Mission", "SoMa"} else ART_BLUE for n in neighborhoods], hover="<b>%{text}</b><br>Housing pressure: %{x}<br>Culture signal: %{y}<extra></extra>")], "layout": layout("Neighborhoods carry different stress signatures", "CULTURE AND COST DO NOT RISE EVENLY", x_title="Housing pressure index", y_title="Culture signal index")})

    competitors = ["Seattle", "New York", "Boston", "Austin", "Los Angeles", "Denver"]
    talent = [88, 92, 86, 78, 80, 67]
    cost = [76, 90, 74, 62, 82, 58]
    write_chart(slug, "chart4_sf_competitor_set", {"data": [scatter(cost, talent, competitors, [21] * len(competitors), [ART_RED if c in {"New York", "Seattle"} else ART_BLUE for c in competitors], hover="<b>%{text}</b><br>Cost pressure: %{x}<br>Talent ecosystem: %{y}<extra></extra>")], "layout": layout("SF competes with talent ecosystems", "THE RIVAL IS NOT JUST ANOTHER CITY; IT IS ANOTHER LABOR MARKET", x_title="Cost pressure index", y_title="Talent ecosystem index")})

    questions = ["Can it build?", "Can it retain artists?", "Can downtown convert?", "Can transit recover?", "Can AI stay local?", "Can biotech scale?"]
    urgency = [96, 82, 90, 78, 92, 72]
    write_chart(slug, "chart5_sf_open_questions", {"data": [bar_v(questions, urgency, [ART_RED if q in {"Can it build?", "Can AI stay local?"} else ART_BLUE for q in questions], hover="<b>%{x}</b><br>Question urgency: %{y}<extra></extra>")], "layout": layout("The SF report is a set of open questions", "THE DATA STORY IS ABOUT ABSORPTION CAPACITY", x_title="Question", y_title="Urgency index")})

    sections = [
        {"id": "identity-stack", "title": "CHART 1 - IDENTITY STACK", "chart": "chart1_sf_identity_stack", "caption": "San Francisco exports software, finance coordination, and cultural permission", "prose": ["The simplest wrong answer is that San Francisco exports apps. The deeper answer is that it exports systems: venture risk, engineering labor, platform logic, taste, and institutional permission for strange ideas.", "That is why the city can be small in population but enormous in economic imagination."]},
        {"id": "tradeoff", "title": "CHART 2 - TRADEOFF HISTORY", "chart": "chart2_sf_tradeoff_history", "caption": "Technology concentration rose faster than the city could absorb housing pressure", "prose": ["The SF story is not only success. It is absorption capacity. A small peninsula city generated global software wealth while underbuilding the physical city needed to metabolize that wealth.", "The assumption to test later is whether housing, downtown vacancy, transit, and cultural retention are symptoms of the same bottleneck."]},
        {"id": "neighborhoods", "title": "CHART 3 - NEIGHBORHOOD PRESSURE", "chart": "chart3_neighborhood_pressure", "caption": "Culture and cost rise unevenly across the neighborhood map", "prose": ["A citywide average misses the point. SoMa, the Mission, Chinatown, the Tenderloin, and the Sunset each carry a different mixture of price, memory, commerce, and political meaning.", "The DataSF layer matters because the city is small enough for block-level data to change the argument."]},
        {"id": "competitors", "title": "CHART 4 - COMPETITOR SET", "chart": "chart4_sf_competitor_set", "caption": "San Francisco competes against other talent ecosystems, not generic cities", "prose": ["Seattle is a software competitor. New York is a capital and talent competitor. Boston is a research competitor. Austin is a cost/relocation competitor.", "The right competitor depends on the variable being contested."]},
        {"id": "questions", "title": "CHART 5 - OPEN QUESTIONS", "chart": "chart5_sf_open_questions", "caption": "The SF data story is about whether the city can absorb its own invention machine", "prose": ["The next report should not merely rank San Francisco. It should ask whether the city can build housing, refill downtown, retain artists, keep AI local, and connect biotech to the same regional engine.", "That is the bioeconomics question: can a place survive the metabolism of its own strongest trait?"]},
    ]
    article(
        slug,
        "SAN FRANCISCO DATA MICROSCOPE: The City as an Invention Machine",
        "A city-identity report framing San Francisco through software exports, housing pressure, neighborhood signals, competitors, and open civic questions.",
        "atlas, culture",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["San Francisco is a perfect city microscope because its contradictions are measurable: a small city with enormous software output, extreme housing pressure, intense cultural mythology, and a regional economy larger than its municipal boundary.", "This report does not try to finish the comparison yet. It defines the questions a serious SF data portrait has to ask."],
        [("1,100+", "DataSF public portal dataset scale in public summaries"), ("7", "Identity domains scored"), ("6", "Open questions for the next SF production pass"), ("3", "Core tradeoff signals: tech, housing, tolerance"), ("6", "Competitor cities framed"), ("5", "Charts in this report")],
        ["DataSF provides Socrata/SODA API access to city datasets, including registered businesses, building permits, 311 cases, public safety, transportation, housing, and civic operations. Regional identity requires adding BEA, Census ACS, BLS, Commerce export data, and Bay Area transportation sources.", "These charts are a framework pass: they show what the SF report should test when direct APIs are pulled."],
        sections,
        ["The main claim is that San Francisco's identity is an invention machine constrained by physical absorption. The city makes ideas, companies, and cultural permission faster than it makes space.", "That claim can later be tested against building permits, business registrations, office vacancy, transit recovery, migration, venture capital, payroll, and cultural venue data."],
        ["DataSF / SF.gov. Open Data portal and developer documentation.", "Socrata / SODA API documentation.", "BEA. Metropolitan GDP and regional data.", "U.S. Census ACS. Housing, income, commuting, and demographic tables.", "International Trade Administration. Metropolitan Export Series.", "World Cities Culture Forum. CREATIVE Data Framework."],
        "Values are editorial indices for a source-backed framework. They should be replaced with direct DataSF, BEA, Census, BLS, and export aggregates in the full city-specific report.",
        source,
    )


def national_export_identity_atlas():
    slug = "national-export-identity-atlas"
    source = "Data: OEC, UN Comtrade, World Bank WDI, OECD, IMF, World Bank TCdata360 - ARTOMETRICS"

    countries = ["China", "Germany", "United States", "Japan", "South Korea", "India", "Brazil", "Saudi Arabia"]
    complexity = [94, 96, 89, 97, 92, 58, 47, 35]
    export_value = [98, 82, 78, 64, 58, 51, 42, 45]
    write_chart(slug, "chart1_complexity_vs_scale", {"data": [scatter(export_value, complexity, countries, [22] * len(countries), [ART_RED if c in {"Germany", "Japan", "China"} else ART_BLUE for c in countries], hover="<b>%{text}</b><br>Export scale: %{x}<br>Complexity index: %{y}<extra></extra>")], "layout": layout("Export identity has scale and complexity", "BIG IS NOT ALWAYS COMPLEX; COMPLEX IS NOT ALWAYS BIG", x_title="Export scale index", y_title="Economic complexity index")})

    products = ["Electronics", "Vehicles", "Oil/gas", "Pharma", "Agriculture", "Textiles", "Aircraft", "Software/services"]
    identity = [91, 84, 78, 72, 63, 58, 76, 88]
    write_chart(slug, "chart2_product_identity", {"data": [bar_h(products, identity, [ART_RED if p in {"Electronics", "Software/services"} else ART_BLUE for p in products], hover="<b>%{y}</b><br>Identity power: %{x}<extra></extra>")], "layout": layout("Some products become national symbols", "EXPORTS ARE MATERIAL CULTURE", x_title="Identity power index")})

    eras = ["1980", "1990", "2000", "2010", "2020", "2025"]
    manufacturing = [72, 78, 84, 88, 82, 80]
    services = [43, 48, 56, 68, 81, 86]
    resource = [79, 70, 66, 62, 72, 69]
    write_chart(slug, "chart3_global_export_shift", {"data": [
        line(eras, manufacturing, color=ART_RED, name="Manufacturing", hover="<b>%{x}</b><br>Manufacturing system: %{y}<extra></extra>"),
        line(eras, services, color=ART_BLUE, name="Services/IP", hover="<b>%{x}</b><br>Services/IP system: %{y}<extra></extra>"),
        line(eras, resource, color=ART_GREEN, name="Resources", hover="<b>%{x}</b><br>Resource system: %{y}<extra></extra>"),
    ], "layout": {**layout("The export frontier moved toward systems", "SERVICES AND IP NOW COMPETE WITH FACTORIES AND RESOURCES", x_title="Period", y_title="Global export-system index"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    country_rows = ["Germany", "Japan", "South Korea", "Brazil", "Saudi Arabia"]
    cols = ["Machines", "Vehicles", "Chemicals", "Resources", "Food", "Services"]
    z = [
        [95, 96, 86, 22, 34, 64],
        [92, 94, 61, 19, 28, 58],
        [98, 78, 66, 18, 24, 62],
        [34, 28, 42, 78, 91, 41],
        [18, 16, 35, 99, 19, 48],
    ]
    write_chart(slug, "chart4_export_fingerprint", {"data": [heatmap(cols, country_rows, z)], "layout": layout("Every country has an export fingerprint", "THE MIX MATTERS MORE THAN THE TOP LINE", x_title="Export family", y_title="Country")})

    questions = ["What does it sell?", "Who buys it?", "What inputs does it need?", "What could replace it?", "What carries prestige?", "What is vulnerable?"]
    score = [96, 88, 84, 91, 73, 94]
    write_chart(slug, "chart5_country_questions", {"data": [bar_v(questions, score, [ART_RED if q in {"What does it sell?", "What is vulnerable?"} else ART_BLUE for q in questions], hover="<b>%{x}</b><br>Diagnostic value: %{y}<extra></extra>")], "layout": layout("The country report starts with dependency", "EXPORTS SHOW WHAT A NATION NEEDS THE WORLD TO BELIEVE", x_title="Diagnostic question", y_title="Value index")})

    sections = [
        {"id": "scale-complexity", "title": "CHART 1 - SCALE AND COMPLEXITY", "chart": "chart1_complexity_vs_scale", "caption": "Countries differ by export scale and product complexity", "prose": ["The OEC lens is powerful because exports reveal what a country can reliably make and sell into the world. Scale and complexity are different forms of power.", "A country can be large because it sells a lot of one thing, or complex because it sells many hard-to-make things. Those identities behave differently under stress."]},
        {"id": "product-identity", "title": "CHART 2 - PRODUCT IDENTITY", "chart": "chart2_product_identity", "caption": "Some export categories become national symbols", "prose": ["Cars, electronics, oil, pharmaceuticals, software, and food are not just commodities. They become reputational shorthand.", "That is the cultural economics layer: exports can become part of national mythology."]},
        {"id": "frontier", "title": "CHART 3 - EXPORT FRONTIER", "chart": "chart3_global_export_shift", "caption": "The frontier moved from resources to factories to systems and IP", "prose": ["The last generation of globalization did not erase goods. It added services, software, intellectual property, finance, and standards to the export conversation.", "This is why a modern country report must track both containers and code."]},
        {"id": "fingerprint", "title": "CHART 4 - FINGERPRINT", "chart": "chart4_export_fingerprint", "caption": "The export fingerprint is the mix, not just the headline product", "prose": ["Germany and Japan look similar through machines and vehicles, but Brazil and Saudi Arabia have very different resource/food signatures. The fingerprint matters because it reveals dependency structure.", "The question is not only what a place sells. It is what would break if the world stopped buying it."]},
        {"id": "dependency", "title": "CHART 5 - DEPENDENCY QUESTIONS", "chart": "chart5_country_questions", "caption": "A country identity report asks what the world buys, substitutes, and depends on", "prose": ["The export report should end with vulnerability. Who buys the product? Which inputs are imported? What competitor can replace it? What product carries prestige beyond money?", "Those questions turn trade data into identity analysis."]},
    ]
    article(
        slug,
        "NATIONAL EXPORT IDENTITY ATLAS",
        "A country-level geo-economics report framing exports as identity: what nations sell, what they need, what competitors can replace, and what products carry prestige.",
        "atlas, power",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["Countries are often described through flags, leaders, and GDP. Exports give a different portrait: what the world pays the country to do.", "This report defines the country-identity lens before deeper comparisons: products, customers, inputs, complexity, vulnerability, and prestige."],
        [("200+", "Countries/zones covered in UN Comtrade-style trade systems"), ("5,000+", "Products in OEC-style trade classifications"), ("HS", "Harmonized System product code architecture"), ("6", "Diagnostic country questions"), ("8", "Export families or countries highlighted"), ("5", "Charts in this report")],
        ["The source stack includes OEC API, UN Comtrade, World Bank WDI, OECD, IMF, and national statistics offices. OEC provides a particularly useful API layer for country/product trade flows and economic complexity.", "These charts use editorial indices to define the future production structure. A full pass should pull product-level exports by country and compute revealed comparative advantage, concentration, and partner dependence."],
        sections,
        ["The main claim is that exports are identity under constraint. They show what a country can do at scale, what the world believes it is good for, and what vulnerabilities sit behind its prestige.", "Later comparison reports can use this atlas to rank countries by complexity, concentration, cultural export power, and substitutability."],
        ["OEC. API and international trade data documentation.", "UN Comtrade. API and subscription documentation.", "World Bank. World Development Indicators.", "OECD Data Explorer.", "IMF data portals and national statistical agencies."],
        "Values are editorial indices built from public source logic. They are intended to define the report questions before direct OEC/Comtrade ingestion.",
        source,
    )


def cultural_exports_geoeconomics():
    slug = "cultural-exports-geoeconomics"
    source = "Data: UNESCO, World Bank, WIPO, MusicBrainz, IMDb/TMDb references, World Cities Culture Forum - ARTOMETRICS"

    countries = ["United States", "South Korea", "Japan", "United Kingdom", "France", "India", "Nigeria", "Brazil"]
    cultural_reach = [98, 88, 84, 82, 76, 79, 64, 68]
    goods_export = [82, 73, 81, 66, 58, 61, 42, 49]
    write_chart(slug, "chart1_soft_power_trade", {"data": [scatter(goods_export, cultural_reach, countries, [22] * len(countries), [ART_RED if c in {"United States", "South Korea", "Japan"} else ART_BLUE for c in countries], hover="<b>%{text}</b><br>Goods/export base: %{x}<br>Cultural reach: %{y}<extra></extra>")], "layout": layout("Cultural exports are economic signals", "SOFT POWER TRAVELS BESIDE GOODS POWER", x_title="Goods/export base index", y_title="Cultural reach index")})

    mediums = ["Film/TV", "Music", "Games/anime", "Fashion", "Food", "Sports", "Literature", "Design"]
    exportability = [91, 88, 84, 71, 77, 80, 63, 68]
    write_chart(slug, "chart2_medium_exportability", {"data": [bar_h(mediums, exportability, [ART_RED if m in {"Film/TV", "Music"} else ART_BLUE for m in mediums], hover="<b>%{y}</b><br>Exportability index: %{x}<extra></extra>")], "layout": layout("Some cultural media travel cleaner", "SCREEN AND SONG SCALE FASTER THAN PLACE-BOUND CULTURE", x_title="Exportability index")})

    years = ["1990", "2000", "2010", "2020", "2025"]
    korea = [22, 36, 61, 88, 92]
    japan = [71, 76, 79, 85, 86]
    india = [58, 64, 68, 74, 79]
    write_chart(slug, "chart3_asian_cultural_wave", {"data": [
        line(years, korea, color=ART_RED, name="South Korea", hover="<b>%{x}</b><br>Korean cultural reach: %{y}<extra></extra>"),
        line(years, japan, color=ART_BLUE, name="Japan", hover="<b>%{x}</b><br>Japanese cultural reach: %{y}<extra></extra>"),
        line(years, india, color=ART_GREEN, name="India", hover="<b>%{x}</b><br>Indian cultural reach: %{y}<extra></extra>"),
    ], "layout": {**layout("Cultural waves have different clocks", "KOREA ACCELERATED; JAPAN COMPOUNDED; INDIA SCALED", x_title="Period", y_title="Global cultural reach index"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    cities = ["Los Angeles", "Seoul", "Tokyo", "London", "Paris", "Mumbai", "Lagos", "Sao Paulo"]
    production = [98, 84, 88, 82, 73, 86, 64, 67]
    distribution = [96, 82, 78, 88, 72, 69, 55, 58]
    write_chart(slug, "chart4_city_cultural_pipeline", {"data": [scatter(production, distribution, cities, [22] * len(cities), [ART_RED if c in {"Los Angeles", "Seoul", "Tokyo"} else ART_BLUE for c in cities], hover="<b>%{text}</b><br>Production base: %{x}<br>Distribution reach: %{y}<extra></extra>")], "layout": layout("Cultural export cities need production and distribution", "THE CITY IS THE LAUNCHPAD FOR NATIONAL SOFT POWER", x_title="Production base index", y_title="Distribution reach index")})

    questions = ["What travels?", "Who translates it?", "Who monetizes it?", "What city produces it?", "What platform scales it?", "What becomes identity?"]
    value = [94, 82, 89, 86, 91, 96]
    write_chart(slug, "chart5_culture_export_questions", {"data": [bar_v(questions, value, [ART_RED if q in {"What travels?", "What becomes identity?"} else ART_BLUE for q in questions], hover="<b>%{x}</b><br>Diagnostic value: %{y}<extra></extra>")], "layout": layout("Cultural exports need their own trade questions", "ATTENTION IS THE CARGO", x_title="Question", y_title="Value index")})

    sections = [
        {"id": "soft-power", "title": "CHART 1 - SOFT POWER AND TRADE", "chart": "chart1_soft_power_trade", "caption": "Cultural exports travel alongside goods and services exports", "prose": ["A country can export cars, chips, oil, or software. It can also export characters, songs, films, cuisine, style, and celebrity.", "The economic identity report should include both because culture changes the world's willingness to pay attention."]},
        {"id": "mediums", "title": "CHART 2 - MEDIUM EXPORTABILITY", "chart": "chart2_medium_exportability", "caption": "Screen and song scale faster than place-bound culture", "prose": ["Film, television, and music travel cleanly across platforms. Food, fashion, sport, and literature travel too, but often need more translation, institutions, or physical infrastructure.", "That means a cultural export strategy is partly a medium strategy."]},
        {"id": "waves", "title": "CHART 3 - CULTURAL WAVES", "chart": "chart3_asian_cultural_wave", "caption": "South Korea accelerated, Japan compounded, and India scaled through different cultural clocks", "prose": ["Korean pop culture shows fast strategic acceleration. Japan shows long compounding through anime, games, design, and technology. India shows scale through film, diaspora, language, and music.", "The comparison is not who is better. It is which mechanism makes the culture travel."]},
        {"id": "cities", "title": "CHART 4 - CULTURAL PIPELINE CITIES", "chart": "chart4_city_cultural_pipeline", "caption": "Cultural export cities combine production base with distribution reach", "prose": ["Los Angeles is a production and distribution machine. Seoul is a coordinated cultural export platform. Tokyo is a design, games, anime, and consumer-culture engine.", "This is where city reports meet country reports: the national export often has an urban launchpad."]},
        {"id": "questions", "title": "CHART 5 - CULTURAL TRADE QUESTIONS", "chart": "chart5_culture_export_questions", "caption": "Cultural exports ask what travels, who translates it, and what becomes identity", "prose": ["The data question is not just revenue. What travels? Who translates it? Which platform scales it? Which city produces it? Which symbol becomes national identity?", "Those questions turn culture into a measurable export system without reducing it to money alone."]},
    ]
    article(
        slug,
        "CULTURAL EXPORTS: The Geo-Economics of Soft Power",
        "A cultural economics report framing films, music, games, food, fashion, and media as exports that shape national and city identity.",
        "culture, atlas",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["Culture is an export category even when it does not pass through a port. A song, show, game, cuisine, meme, fashion house, or sports star can change what a country means in the global imagination.", "This report defines the cultural-export question before deeper comparisons: what travels, where it is produced, who monetizes it, and how it becomes identity."],
        [("8", "Countries and cultural-export systems highlighted"), ("8", "Mediums scored for exportability"), ("6", "Diagnostic cultural trade questions"), ("45", "Global cities in World Cities Culture Forum 5th edition summaries"), ("3", "Asian cultural wave paths compared"), ("5", "Charts in this report")],
        ["The source stack includes UNESCO cultural statistics, WIPO creative-industry indicators, World Bank and OECD services data, MusicBrainz, IMDb/TMDb-style film metadata, Wikidata, and World Cities Culture Forum.", "The charts use editorial indices to define the report structure. A direct production pass should join cultural trade, platform, awards, tourism, and city infrastructure data."],
        sections,
        ["The core claim is that attention is cargo. Cultural exports carry a country's symbols into global markets, and those symbols can change tourism, language learning, fashion, food demand, and diplomatic perception.", "Future comparisons can rank cultural-export systems by reach, monetization, translation, city infrastructure, and durability."],
        ["UNESCO Institute for Statistics and UNESCO cultural trade references.", "WIPO creative economy and intellectual property indicators.", "World Cities Culture Forum. CREATIVE Data Framework.", "MusicBrainz / MetaBrainz dumps.", "IMDb/TMDb/Wikidata public metadata references.", "World Bank and OECD services/export datasets."],
        "Values are editorial indices. They define the cultural export framework before direct UNESCO/WIPO/platform/city data ingestion.",
        source,
    )


def california_texas_state_rivalry():
    slug = "california-vs-texas-state-rivalry"
    source = "Data: BEA, Census ACS, BLS, IRS migration summaries, OEC/ITA exports, state budget documents - ARTOMETRICS"

    categories = ["GDP scale", "Population", "Tax burden debate", "Migration attention", "Energy role", "Tech role", "Cultural output"]
    ca = [96, 94, 88, 82, 46, 94, 91]
    tx = [86, 88, 62, 91, 96, 76, 68]
    write_chart(slug, "chart1_why_compared", {"data": [
        bar_h(categories, ca, [ART_RED] * len(categories), name="California", hover="<b>%{y}</b><br>California: %{x}<extra></extra>"),
        bar_h(categories, tx, [ART_BLUE] * len(categories), name="Texas", hover="<b>%{y}</b><br>Texas: %{x}<extra></extra>"),
    ], "layout": {**layout("California and Texas are compared because they are rival systems", "SCALE IS THE SIMILARITY; GOVERNANCE IS THE CONTRAST", x_title="Index"), "barmode": "group", "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.05}}})

    years = ["2000", "2005", "2010", "2015", "2020", "2025"]
    ca_model = [92, 94, 91, 96, 98, 95]
    tx_model = [61, 66, 72, 78, 86, 90]
    write_chart(slug, "chart2_growth_story", {"data": [
        line(years, ca_model, color=ART_RED, name="California knowledge/IP model", hover="<b>%{x}</b><br>California model strength: %{y}<extra></extra>"),
        line(years, tx_model, color=ART_BLUE, name="Texas growth/energy model", hover="<b>%{x}</b><br>Texas model strength: %{y}<extra></extra>"),
    ], "layout": {**layout("The rivalry is also a model competition", "ONE COMPOUNDS KNOWLEDGE; THE OTHER COMPOUNDS GROWTH CAPACITY", x_title="Period", y_title="Model strength index"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    sectors = ["Software/IP", "Energy", "Entertainment", "Aerospace", "Agriculture", "Logistics", "Advanced manufacturing"]
    z = [
        [98, 46, 96, 82, 72, 68, 79],
        [76, 98, 48, 74, 78, 91, 82],
    ]
    write_chart(slug, "chart3_export_fingerprint", {"data": [heatmap(sectors, ["California", "Texas"], z)], "layout": layout("Their export fingerprints explain the argument", "SOFTWARE AND CULTURE VERSUS ENERGY AND LOGISTICS IS TOO SIMPLE, BUT USEFUL", x_title="Export/industry family", y_title="State")})

    variables = ["Housing cost", "Tax salience", "Wage ceiling", "Business formation", "Power grid risk", "Climate risk", "Cultural magnetism"]
    ca_values = [96, 90, 94, 83, 58, 86, 95]
    tx_values = [64, 62, 78, 91, 82, 88, 71]
    write_chart(slug, "chart4_hidden_tradeoffs", {"data": [scatter(ca_values, tx_values, variables, [22] * len(variables), [ART_RED if v in {"Housing cost", "Cultural magnetism"} else ART_BLUE for v in variables], hover="<b>%{text}</b><br>California intensity: %{x}<br>Texas intensity: %{y}<extra></extra>")], "layout": layout("The hidden tradeoff is not only taxes", "COST, RISK, WAGES, AND CULTURE MOVE TOGETHER", x_title="California intensity", y_title="Texas intensity")})

    questions = ["Is migration tax-driven?", "Which exports are irreplaceable?", "What does each import?", "Which model handles climate?", "Where does talent compound?", "Who benefits from growth?"]
    importance = [86, 93, 79, 91, 95, 88]
    write_chart(slug, "chart5_rivalry_questions", {"data": [bar_v(questions, importance, [ART_RED if q in {"Which exports are irreplaceable?", "Where does talent compound?"} else ART_BLUE for q in questions], hover="<b>%{x}</b><br>Comparison value: %{y}<extra></extra>")], "layout": layout("The real comparison starts after the slogan", "TAXES ARE ONLY THE ENTRY POINT", x_title="Question", y_title="Comparison value index")})

    sections = [
        {"id": "why-compared", "title": "CHART 1 - WHY THEY ARE COMPARED", "chart": "chart1_why_compared", "caption": "California and Texas are rival systems because both are big enough to feel like countries", "prose": ["People compare California and Texas because they are not merely states. They are competing governance models, labor markets, export systems, media stories, and migration symbols.", "The easy version is taxes. The more useful version is absorption: how each state turns land, labor, energy, culture, and institutions into growth."]},
        {"id": "growth-model", "title": "CHART 2 - GROWTH MODEL", "chart": "chart2_growth_story", "caption": "California compounds knowledge while Texas compounds growth capacity", "prose": ["California's model is IP-heavy: software, entertainment, venture capital, universities, design, and talent networks. Texas has a capacity model: energy, land, logistics, lower-cost growth, and business relocation.", "That is why the rivalry persists even when the states are not substitutable."]},
        {"id": "fingerprint", "title": "CHART 3 - EXPORT FINGERPRINT", "chart": "chart3_export_fingerprint", "caption": "The states overlap in scale but diverge in what they export to the world", "prose": ["California sells attention, code, entertainment, agriculture, hardware, and high-end coordination. Texas sells energy, logistics, industrial growth, and increasingly technology-adjacent capacity.", "The chart shows why the same GDP conversation hides very different machinery."]},
        {"id": "tradeoffs", "title": "CHART 4 - HIDDEN TRADEOFFS", "chart": "chart4_hidden_tradeoffs", "caption": "The rivalry is about cost, climate, wages, culture, and risk, not taxes alone", "prose": ["California's high cost is real. Texas's energy and climate exposure are real. California's wage ceiling and cultural magnetism are real. Texas's business formation and logistics advantages are real.", "A serious comparison keeps all of those variables in the frame at once."]},
        {"id": "questions", "title": "CHART 5 - WHAT TO ASK NEXT", "chart": "chart5_rivalry_questions", "caption": "The useful California-Texas questions are about irreplaceable exports, talent, climate, and who benefits", "prose": ["The surprise question is not 'which state is better?' It is which parts of each state are impossible for the other to copy.", "That gives later reports a sharper path: migration, taxes, exports, housing, climate, and cultural production should be tested as a system."]},
    ]
    article(
        slug,
        "CALIFORNIA VS TEXAS: The Artometrics of Rival State Systems",
        "A comparative geo-economics report on why California and Texas are paired in public debate, what they share, and where their economies, exports, risks, and identities diverge.",
        "atlas, power",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["California and Texas are the most common American state comparison because each is large enough to represent a theory of the country. One is the expensive knowledge-and-culture machine; the other is the growth-and-capacity machine.", "This report does not settle the rivalry. It defines why the rivalry exists and what a serious data comparison should test next."],
        [("2", "State systems compared"), ("7", "Rivalry dimensions scored"), ("7", "Export/industry families compared"), ("6", "Next comparison questions"), ("5", "Charts in this report"), ("0", "Simple answers accepted")],
        ["The source stack for a full production pass includes BEA state GDP by industry, Census ACS population and migration, IRS migration summaries, BLS employment, state tax/budget documents, OEC/ITA export tables, and climate/energy data.", "The charts use editorial indices to frame the argument before direct ingestion. The point is to avoid reducing the rivalry to one tax variable."],
        sections,
        ["California and Texas are competitors because they are two different answers to the same American question: how should scale, growth, talent, land, energy, and culture be organized?", "The most important finding is that the comparison is valid, but usually under-asked. Taxes are visible; export identity, climate risk, talent compounding, and cultural magnetism explain more."],
        ["BEA. State GDP by industry.", "U.S. Census ACS and population estimates.", "IRS migration data summaries.", "BLS state employment statistics.", "International Trade Administration and OEC export references.", "State budget and tax agency documents."],
        "Values are editorial indices intended to structure a later direct-data production pass. They should be replaced with source aggregates before making formal rankings.",
        source,
    )


def new_york_vs_san_francisco_city_systems():
    slug = "new-york-vs-san-francisco-city-systems"
    source = "Data: BEA, Census ACS, DataSF, NYC Open Data, BLS, World Cities Culture Forum, PitchBook-style public venture references - ARTOMETRICS"

    axes = ["Finance", "Software", "Media", "Culture", "Housing pressure", "Transit dependence", "Global command", "Startup density"]
    ny = [98, 76, 94, 95, 90, 96, 99, 72]
    sf = [68, 98, 72, 84, 96, 72, 78, 99]
    write_chart(slug, "chart1_command_vs_lab", {"data": [
        bar_h(axes, ny, [ART_RED] * len(axes), name="New York", hover="<b>%{y}</b><br>New York: %{x}<extra></extra>"),
        bar_h(axes, sf, [ART_BLUE] * len(axes), name="San Francisco", hover="<b>%{y}</b><br>San Francisco: %{x}<extra></extra>"),
    ], "layout": {**layout("New York is command; San Francisco is lab", "BOTH EXPORT COORDINATION, BUT AT DIFFERENT SCALES", x_title="City identity index"), "barmode": "group", "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.05}}})

    periods = ["Port city", "Industrial", "Corporate", "Digital", "Post-pandemic", "AI era"]
    nyc = [96, 86, 98, 82, 74, 80]
    sf = [74, 48, 64, 98, 72, 95]
    write_chart(slug, "chart2_history_timing", {"data": [
        line(periods, nyc, color=ART_RED, name="New York", hover="<b>%{x}</b><br>New York layer: %{y}<extra></extra>"),
        line(periods, sf, color=ART_BLUE, name="San Francisco", hover="<b>%{x}</b><br>San Francisco layer: %{y}<extra></extra>"),
    ], "layout": {**layout("The cities peak on different historical layers", "NEW YORK COMPOUNDS COMMAND; SF COMPOUNDS PARADIGM SHIFTS", x_title="Historical layer", y_title="Layer strength index"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    outputs = ["Capital allocation", "Software platforms", "Advertising/media", "Fashion/art", "AI labs", "Universities", "Tourism", "Public markets"]
    z = [
        [99, 68, 96, 94, 71, 84, 96, 98],
        [72, 99, 74, 78, 98, 86, 68, 73],
    ]
    write_chart(slug, "chart3_output_fingerprint", {"data": [heatmap(outputs, ["New York", "San Francisco"], z)], "layout": layout("The output fingerprint explains the pairing", "BOTH SELL INTANGIBLE SYSTEMS, BUT DIFFERENT ONES", x_title="Output family", y_title="City")})

    pressures = ["Housing", "Office reset", "Transit stress", "Talent churn", "Public disorder narrative", "Cultural retention"]
    ny_pressure = [90, 82, 75, 78, 72, 86]
    sf_pressure = [96, 91, 79, 88, 84, 82]
    write_chart(slug, "chart4_pressure_pairing", {"data": [scatter(ny_pressure, sf_pressure, pressures, [22] * len(pressures), [ART_RED if p in {"Housing", "Office reset"} else ART_BLUE for p in pressures], hover="<b>%{text}</b><br>New York pressure: %{x}<br>San Francisco pressure: %{y}<extra></extra>")], "layout": layout("Their pain rhymes but does not match", "THE SAME POST-2020 WORDS HIDE DIFFERENT SYSTEMS", x_title="New York pressure index", y_title="San Francisco pressure index")})

    questions = ["Which city commands capital?", "Which city invents platforms?", "Which absorbs talent better?", "Which can build housing?", "Which culture renews faster?", "Which exports status?"]
    value = [92, 94, 88, 91, 84, 89]
    write_chart(slug, "chart5_city_comparison_questions", {"data": [bar_v(questions, value, [ART_RED if q in {"Which city commands capital?", "Which city invents platforms?"} else ART_BLUE for q in questions], hover="<b>%{x}</b><br>Diagnostic value: %{y}<extra></extra>")], "layout": layout("The comparison is command versus invention", "THE ANSWER CHANGES BY OUTPUT", x_title="Question", y_title="Diagnostic value")})

    sections = [
        {"id": "command-lab", "title": "CHART 1 - COMMAND VERSUS LAB", "chart": "chart1_command_vs_lab", "caption": "New York commands capital and culture while San Francisco prototypes new systems", "prose": ["New York and San Francisco are compared because both export invisible value: finance, media, software, talent, coordination, status, and ideas.", "The difference is posture. New York is the command center; San Francisco is the laboratory."]},
        {"id": "history", "title": "CHART 2 - HISTORY TIMING", "chart": "chart2_history_timing", "caption": "New York compounds older command layers while San Francisco spikes around paradigm shifts", "prose": ["New York's power is layered and old: port, finance, media, corporate headquarters, immigration, culture. San Francisco's modern power is sharper and more episodic: software, venture capital, platforms, AI.", "That is why both cities feel globally central while operating on different clocks."]},
        {"id": "fingerprint", "title": "CHART 3 - OUTPUT FINGERPRINT", "chart": "chart3_output_fingerprint", "caption": "The cities both export intangible systems but not the same systems", "prose": ["New York exports capital allocation, status, media, fashion, finance, and market legitimacy. San Francisco exports software platforms, venture risk, AI, and a cultural permission structure for invention.", "The pairing is valid because both cities sell coordination more than physical goods."]},
        {"id": "pressures", "title": "CHART 4 - PRESSURE PAIRING", "chart": "chart4_pressure_pairing", "caption": "Post-2020 pressures rhyme across the two cities but come from different causes", "prose": ["Both cities talk about office vacancy, housing, disorder narratives, transit, and talent churn. But the same words are not the same system.", "New York's office reset sits inside a giant command economy. San Francisco's sits inside a smaller city whose downtown was overexposed to tech-office rhythms."]},
        {"id": "questions", "title": "CHART 5 - WHAT TO ASK NEXT", "chart": "chart5_city_comparison_questions", "caption": "The useful comparison asks which city commands, invents, absorbs, builds, renews, and exports status", "prose": ["The surprise is that neither city simply beats the other. The answer changes by output: capital, platforms, culture, housing, talent, or status.", "This gives future city reports a linked framework instead of isolated profiles."]},
    ]
    article(
        slug,
        "NEW YORK VS SAN FRANCISCO: Command City and Invention City",
        "A comparative city report asking why New York and San Francisco are discussed together, what they share, and where their economic and cultural systems diverge.",
        "atlas, culture",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["New York and San Francisco are not peers by population or geography, but they are peers in the market for invisible power. They both export coordination, talent, symbols, and future-facing industries.", "This report asks why they belong in the same conversation and what people miss when they compare them only by rent, taxes, or office vacancy."],
        [("2", "Global intangible-output cities compared"), ("8", "Identity axes scored"), ("6", "Shared pressure narratives tested"), ("5", "Charts in this comparison"), ("0", "Single-variable answers"), ("1", "Core contrast: command versus invention")],
        ["The source stack includes BEA metro GDP, Census ACS, BLS employment, DataSF, NYC Open Data, World Cities Culture Forum, public venture-capital references, transit agencies, and office-market summaries.", "The report uses editorial indices to define the comparison frame before direct API ingestion. It also references the San Francisco Data Microscope as the local profile layer."],
        sections,
        ["The central finding is that New York and San Francisco are comparable because both sell systems more than goods. The difference is that New York legitimizes and commands while San Francisco invents and prototypes.", "That means the richer comparison is not which city is better, but which system each city is best at producing."] ,
        ["BEA. Metropolitan GDP and regional industry data.", "U.S. Census ACS.", "BLS metro employment data.", "DataSF and NYC Open Data Socrata portals.", "World Cities Culture Forum CREATIVE Data Framework.", "Transit agency and office-market public summaries."],
        "Values are editorial indices designed to structure a later direct-data comparison. They should be replaced with source aggregates for formal ranking.",
        source,
    )


def export_superpowers_comparison():
    slug = "export-superpowers-us-china-germany"
    source = "Data: OEC, UN Comtrade, World Bank, OECD, IMF, BEA, Eurostat, national statistics offices - ARTOMETRICS"

    axes = ["Scale", "Complexity", "Services/IP", "Manufacturing", "Vehicles/machinery", "Consumer platform power", "Supply-chain centrality"]
    us = [90, 88, 98, 72, 68, 96, 78]
    china = [99, 82, 66, 99, 78, 84, 98]
    germany = [72, 97, 74, 88, 99, 61, 86]
    write_chart(slug, "chart1_three_export_models", {"data": [
        line(axes, us, color=ART_RED, name="United States", hover="<b>%{x}</b><br>United States: %{y}<extra></extra>"),
        line(axes, china, color=ART_BLUE, name="China", hover="<b>%{x}</b><br>China: %{y}<extra></extra>"),
        line(axes, germany, color=ART_GREEN, name="Germany", hover="<b>%{x}</b><br>Germany: %{y}<extra></extra>"),
    ], "layout": {**layout("Three export superpowers, three models", "PLATFORM, FACTORY, AND MACHINE SYSTEMS", x_title="Export identity axis", y_title="Index"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    product = ["Software/IP", "Electronics", "Vehicles", "Machinery", "Pharma", "Energy", "Consumer goods"]
    z = [
        [98, 72, 61, 66, 83, 79, 65],
        [64, 99, 79, 86, 52, 62, 97],
        [71, 74, 99, 98, 78, 43, 58],
    ]
    write_chart(slug, "chart2_product_fingerprint", {"data": [heatmap(product, ["United States", "China", "Germany"], z)], "layout": layout("Product fingerprints explain the rivalry", "THE TOP LINE HIDES THREE DIFFERENT MACHINES", x_title="Export family", y_title="Country")})

    dependencies = ["Semiconductors", "Energy", "Consumer demand", "High-skill labor", "Allied markets", "Shipping lanes"]
    us_dep = [88, 62, 94, 91, 82, 71]
    china_dep = [96, 81, 91, 74, 76, 92]
    germany_dep = [74, 89, 76, 86, 98, 79]
    write_chart(slug, "chart3_dependency_risk", {"data": [
        bar_h(dependencies, us_dep, [ART_RED] * len(dependencies), name="United States", hover="<b>%{y}</b><br>U.S. dependency: %{x}<extra></extra>"),
        bar_h(dependencies, china_dep, [ART_BLUE] * len(dependencies), name="China", hover="<b>%{y}</b><br>China dependency: %{x}<extra></extra>"),
        bar_h(dependencies, germany_dep, [ART_GREEN] * len(dependencies), name="Germany", hover="<b>%{y}</b><br>Germany dependency: %{x}<extra></extra>"),
    ], "layout": {**layout("Export strength creates dependency risk", "EVERY SUPERPOWER HAS A BOTTLENECK", x_title="Dependency risk index"), "barmode": "group", "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.05}}})

    countries = ["United States", "China", "Germany", "Japan", "South Korea", "India", "Mexico", "Vietnam"]
    substitution = [72, 64, 81, 78, 76, 58, 62, 54]
    indispensability = [94, 96, 86, 82, 78, 63, 61, 55]
    write_chart(slug, "chart4_substitutability", {"data": [scatter(substitution, indispensability, countries, [22] * len(countries), [ART_RED if c in {"United States", "China", "Germany"} else ART_BLUE for c in countries], hover="<b>%{text}</b><br>Substitutability: %{x}<br>Indispensability: %{y}<extra></extra>")], "layout": layout("The strongest exporters are hard to replace in different ways", "INDISPENSABILITY IS NOT THE OPPOSITE OF SUBSTITUTION", x_title="Substitutability index", y_title="Indispensability index")})

    questions = ["Who owns standards?", "Who controls factories?", "Who captures margins?", "Who absorbs shocks?", "Who has allies?", "Who can be replaced?"]
    q = [94, 92, 96, 88, 84, 91]
    write_chart(slug, "chart5_superpower_questions", {"data": [bar_v(questions, q, [ART_RED if item in {"Who captures margins?", "Who can be replaced?"} else ART_BLUE for item in questions], hover="<b>%{x}</b><br>Strategic value: %{y}<extra></extra>")], "layout": layout("The comparison is strategic, not just economic", "EXPORTS SHOW POWER, DEPENDENCE, AND REPLACEABILITY", x_title="Question", y_title="Strategic value")})

    sections = [
        {"id": "models", "title": "CHART 1 - THREE MODELS", "chart": "chart1_three_export_models", "caption": "The United States, China, and Germany represent platform, factory, and machine export systems", "prose": ["These countries are compared because they sit near the center of the global production system, but they do not do the same job.", "The United States captures software, IP, finance, and platform margins. China coordinates manufacturing scale and supply chains. Germany specializes in complex machinery, vehicles, and industrial trust."]},
        {"id": "fingerprints", "title": "CHART 2 - PRODUCT FINGERPRINTS", "chart": "chart2_product_fingerprint", "caption": "The export fingerprints show three different machines under the same global headline", "prose": ["A GDP or export total can make the countries look like comparable blocks. The product mix reveals the real comparison.", "This is the core Artometrics move: replace vague rivalry with system fingerprints."]},
        {"id": "dependencies", "title": "CHART 3 - DEPENDENCY RISK", "chart": "chart3_dependency_risk", "caption": "Export strength creates different bottlenecks for each superpower", "prose": ["The U.S. depends on talent, semiconductor chains, and consumer/platform demand. China depends on energy, shipping lanes, chips, and global buyers. Germany depends on allied markets, energy inputs, and industrial continuity.", "The strongest systems are not invulnerable. They are specialized."]},
        {"id": "substitution", "title": "CHART 4 - SUBSTITUTABILITY", "chart": "chart4_substitutability", "caption": "The strongest exporters are hard to replace for different reasons", "prose": ["China is hard to replace because of scale and supply-chain integration. Germany is hard to replace because of industrial trust and precision. The U.S. is hard to replace because of standards, platforms, capital, and demand.", "The surprise is that replaceability is product-specific, not country-wide."]},
        {"id": "questions", "title": "CHART 5 - STRATEGIC QUESTIONS", "chart": "chart5_superpower_questions", "caption": "The useful comparison asks who owns standards, factories, margins, shocks, allies, and substitutes", "prose": ["The question is not simply who exports more. It is who captures margins, who controls chokepoints, who absorbs shocks, and who can be replaced.", "That moves the report from economics into power."]},
    ]
    article(
        slug,
        "EXPORT SUPERPOWERS: United States, China, Germany",
        "A comparative country report on why the U.S., China, and Germany are discussed together, and how their export systems differ by platforms, factories, machinery, dependencies, and replaceability.",
        "atlas, power",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["The United States, China, and Germany are often placed in the same economic conversation because each represents a central export system. But the systems are different: platform power, manufacturing scale, and industrial precision.", "This report builds the comparison layer for country reports: not who is bigger, but what kind of global function each country performs."],
        [("3", "Export superpower systems compared"), ("7", "Export identity axes"), ("6", "Dependency risks scored"), ("8", "Countries placed on substitutability map"), ("5", "Charts in this report"), ("1", "Core question: who is replaceable?")],
        ["The production version should use OEC/UN Comtrade product exports, partner concentration, World Bank/OECD services and GDP data, IMF macro context, and national industry statistics.", "This framework pass uses editorial indices to define the analytical comparison before direct product-level ingestion."],
        sections,
        ["The main finding is that export superpowers are not rivals in one single market. They are rival system architectures.", "The best comparison asks what each country makes hard for the world to replace, and what each country secretly depends on to keep that power."],
        ["OEC. International trade and economic complexity API.", "UN Comtrade. Product and partner trade data.", "World Bank WDI.", "OECD Data Explorer.", "IMF data portals.", "BEA, Eurostat, and national statistical agency publications."],
        "Values are editorial indices. They define the comparison before direct OEC/Comtrade/World Bank ingestion and should not be read as formal rankings.",
        source,
    )


def write_plan():
    plan = """# Artometrics geo-economics canon source plan

This plan defines the city, country, region, export, and cultural-economics
layer. The first goal is not to make final rankings. It is to ask better
questions: what does a place make, sell, import, lack, remember, price, and
export culturally?

## Credible public datasets

1. OEC / Observatory of Economic Complexity
   - Country/product exports, trade partners, HS products, complexity.
   - Best reports: national export identity, competitor products, export risk.
2. UN Comtrade
   - Official trade flows by country, product, partner, year/month.
   - Best reports: import/export dependency, partner concentration, commodity shocks.
3. BEA Regional and International Trade Administration Metro Export Series
   - U.S. metro GDP, industry, income, and goods exports.
   - Best reports: U.S. city economic fingerprints.
4. DOSE / PIK Subnational Economic Output
   - Global subnational GRP, population, sectoral output, climate variables.
   - Best reports: global region identity and city-region productivity.
5. World Bank WDI, OECD, IMF
   - Country macro indicators, services, finance, development, productivity.
6. World Cities Culture Forum
   - Culture infrastructure, creative economy, participation, venues, policy.
7. Local open data portals such as DataSF, NYC Open Data, LA GeoHub
   - Permits, businesses, 311, transit, public safety, housing, parks, finance.

## First geo-economics batch

1. `city-bioeconomics-operating-system`
   - Theme: cities as layered systems of exports, scarcity, culture, history.
2. `san-francisco-data-microscope`
   - Theme: SF as an invention machine constrained by housing and absorption.
3. `national-export-identity-atlas`
   - Theme: countries as export fingerprints and dependency systems.
4. `cultural-exports-geoeconomics`
   - Theme: culture as soft-power trade and city/country identity.

## First comparison batch

1. `california-vs-texas-state-rivalry`
   - Theme: rival state systems, taxes as entry point, exports, migration, climate, talent.
2. `new-york-vs-san-francisco-city-systems`
   - Theme: command city versus invention city, intangible exports, post-2020 pressures.
3. `export-superpowers-us-china-germany`
   - Theme: platform, factory, and machine export systems.

## Question contract

Every city/country report should answer:

- What does it make?
- What does it sell to the outside world?
- What does it import or depend on?
- Which region or city acts as the production engine?
- What is scarce or overpriced?
- What is historically inherited?
- Who are its true competitors and why?
- What does the data show that contradicts the slogan?

## Comparison contract

Every comparison report should answer:

- Why are these places discussed in the same conversation?
- What similarity makes the comparison tempting?
- What difference makes the comparison misleading?
- Which historical layer explains the rivalry?
- Which exports, jobs, or cultural products make them competitors?
- What would a casual reader expect the data to show?
- What does the data show that is less obvious?
- Which report should this comparison link back to?

## Next geo batch

- City microscopes: New York, Los Angeles, Houston, Miami, Chicago, Seattle, Boston.
- Country reports: United States, China, Germany, Japan, South Korea, India, Brazil.
- Export reports: semiconductors, oil/gas, aircraft, entertainment, software, food.
- Region reports: Bay Area, Sun Belt, Northeast Corridor, Great Lakes, Gulf Coast.

## Editorial rule

The report should feel like a data portrait of a place. Comparisons are useful,
but first the place needs an internal model: its goods, services, culture,
history, dependencies, and contradictions.
"""
    DOCS_DIR.mkdir(exist_ok=True)
    (DOCS_DIR / "geo-economics-canon-source-plan.md").write_text(plan)


def main():
    write_plan()
    city_bioeconomics_operating_system()
    san_francisco_data_microscope()
    national_export_identity_atlas()
    cultural_exports_geoeconomics()
    california_texas_state_rivalry()
    new_york_vs_san_francisco_city_systems()
    export_superpowers_comparison()
    print("Generated geo-economics canon plan, 4 identity reports, and 3 comparison reports.")


if __name__ == "__main__":
    main()
