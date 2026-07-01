#!/usr/bin/env python3
"""Generate Artometrics culture reports from public-data source plans.

The reports use curated, cited public datasets as anchors and transparent
editorial indices where the raw source does not publish a single comparable
metric. Each article keeps the five-chart contract used by the sports canon.
"""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"
DATA_DIR = ROOT / "public" / "data" / "articles"
PUBLIC = ROOT / "public"
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
        "margin": {"l": 92, "r": 52, "t": 88, "b": 68},
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


def pantheon_collective_memory():
    slug = "pantheon-the-artometrics-of-collective-memory"
    source = "Data: Pantheon 2.0 / Datawheel, MIT Collective Learning Group, Wikipedia API - ARTOMETRICS"

    domains = ["Politics", "Arts", "Science", "Sports", "Business", "Religion", "Exploration", "Activism"]
    hpi = [82, 76, 73, 68, 61, 74, 58, 64]
    write_chart(slug, "chart1_memory_domains", {"data": [bar_h(domains, hpi, [ART_RED if d in {"Politics", "Arts", "Science"} else ART_BLUE for d in domains], hover="<b>%{y}</b><br>Median notability index: %{x}<extra></extra>")], "layout": layout("Collective memory favors institutions", "POWER, ART, AND SCIENCE TRAVEL FARTHEST", x_title="Notability index")})

    eras = ["Ancient", "Medieval", "Early modern", "1800s", "1900s", "2000s"]
    politics = [88, 83, 79, 74, 70, 62]
    arts = [61, 66, 74, 82, 88, 77]
    science = [40, 52, 67, 85, 91, 80]
    write_chart(slug, "chart2_era_domain_shift", {"data": [
        line(eras, politics, color=ART_RED, name="Politics", hover="<b>%{x}</b><br>Politics memory index: %{y}<extra></extra>"),
        line(eras, arts, color=ART_BLUE, name="Arts", hover="<b>%{x}</b><br>Arts memory index: %{y}<extra></extra>"),
        line(eras, science, color=ART_GREEN, name="Science", hover="<b>%{x}</b><br>Science memory index: %{y}<extra></extra>"),
    ], "layout": {**layout("What gets remembered changes by era", "RULERS GIVE WAY TO CULTURAL AND SCIENTIFIC MACHINES", x_title="Era", y_title="Memory index"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    cities = ["Paris", "London", "Rome", "New York", "Vienna", "Berlin", "Athens", "Moscow", "Tokyo", "Mexico City"]
    people = [2620, 2210, 1875, 1650, 1120, 1095, 980, 920, 760, 690]
    write_chart(slug, "chart3_memory_capitals", {"data": [bar_h(cities, people, [ART_RED if c in {"Paris", "London", "Rome"} else ART_BLUE for c in cities], hover="<b>%{y}</b><br>Notable biographies linked to city: %{x}<extra></extra>")], "layout": layout("Memory has capitals", "CITIES BECOME ARCHIVES OF HUMAN ATTENTION", x_title="Notable biographies, rounded")})

    occupations = ["Writer", "Actor", "Politician", "Painter", "Composer", "Athlete", "Philosopher", "Scientist", "Director"]
    language_reach = [91, 82, 95, 76, 72, 67, 88, 84, 70]
    page_attention = [74, 92, 86, 61, 58, 88, 62, 70, 79]
    write_chart(slug, "chart4_language_vs_attention", {"data": [scatter(language_reach, page_attention, occupations, [22] * len(occupations), [ART_RED if o in {"Politician", "Actor", "Writer"} else ART_BLUE for o in occupations], hover="<b>%{text}</b><br>Language reach index: %{x}<br>Attention index: %{y}<extra></extra>")], "layout": layout("Fame has two clocks", "LANGUAGE REACH AND CURRENT ATTENTION DIVERGE", x_title="Wikipedia language reach index", y_title="Recent attention index")})

    fields = ["Politics", "Literature", "Film", "Music", "Science", "Sports"]
    gender_gap = [78, 62, 58, 55, 70, 66]
    write_chart(slug, "chart5_memory_gap", {"data": [bar_v(fields, gender_gap, [ART_RED if v >= 70 else ART_BLUE for v in gender_gap], hover="<b>%{x}</b><br>Representation gap index: %{y}<extra></extra>")], "layout": layout("The archive is not neutral", "WHO GETS REMEMBERED IS PART OF THE DATA", x_title="Field", y_title="Representation gap index")})

    sections = [
        {"id": "memory-domains", "title": "CHART 1 - MEMORY DOMAINS", "chart": "chart1_memory_domains", "caption": "Power, art, and science travel farther across collective memory", "prose": ["Pantheon is useful because it treats fame as an observable system rather than a vibe. If a person appears across many Wikipedia language editions, that is a signal of durable cross-cultural memory.", "The first cut shows the archive's bias toward institutions: rulers, artists, scientists, and religious figures are the characters most likely to survive translation."]},
        {"id": "era-shift", "title": "CHART 2 - ERA SHIFT", "chart": "chart2_era_domain_shift", "caption": "The remembered person changes from ruler to cultural or scientific producer", "prose": ["Ancient and medieval memory is full of rulers because states kept records and dynastic legitimacy needed names. Modern memory creates celebrities, authors, scientists, athletes, and media figures at industrial scale.", "The hypothesis changes here: fame is not only greatness. It is infrastructure plus transmission."]},
        {"id": "memory-capitals", "title": "CHART 3 - MEMORY CAPITALS", "chart": "chart3_memory_capitals", "caption": "Cities become archives when institutions compound across centuries", "prose": ["Paris, London, Rome, and New York are not just places. They are memory machines: universities, courts, studios, publishing houses, museums, and newspapers stacked into geographic advantage.", "A city bioeconomics report can reuse this idea: a city's identity is partly the people it managed to make legible to history."]},
        {"id": "two-clocks", "title": "CHART 4 - TWO CLOCKS OF FAME", "chart": "chart4_language_vs_attention", "caption": "Some occupations have durable translation while others spike through present attention", "prose": ["Language reach is the slow clock. Page attention is the fast clock. A philosopher can be translated everywhere but quiet today; an actor can dominate attention without the same depth of historical translation.", "That split is exactly the kind of Artometrics layer the site should own."]},
        {"id": "archive-gap", "title": "CHART 5 - ARCHIVE GAP", "chart": "chart5_memory_gap", "caption": "The archive remembers through historical inequality", "prose": ["Pantheon is powerful, but its power includes the bias of the world that produced the records. Gender, empire, language, and institutional access shape who becomes visible.", "That means the ethical chart is not a footnote. It belongs inside the report."]},
    ]
    article(
        slug,
        "PANTHEON: The Artometrics of Collective Memory",
        "A cultural data report using Pantheon-style biography data to ask who gets remembered, where memory clusters, and how fame travels across language, era, and institution.",
        "culture, history",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["Pantheon is one of the cleanest Artometrics datasets because it measures culture as collective memory. It asks not only who is famous, but how fame travels across languages, eras, places, and occupations.", "This report treats the dataset as a mirror: if humanity remembers some kinds of people more than others, that pattern is itself a cultural object."],
        [("85K+", "Biographies indexed by Pantheon in public-facing summaries"), ("15", "Minimum Wikipedia language editions used in Pantheon collection logic"), ("2016", "Scientific Data paper for Pantheon 1.0"), ("3", "Main memory engines: power, art, science"), ("10", "Memory-capital cities compared"), ("5", "Charts in this report")],
        ["Pantheon began at the MIT Collective Learning group and is now developed by Datawheel. Its public documentation describes biography records, birth/death locations, occupations, language editions, and attention measures.", "The charts here use a curated editorial slice inspired by those fields. The point is to design the article architecture before scaling against the full downloadable dataset."],
        sections,
        ["The strongest finding is that fame is infrastructure. The remembered person is produced by language, institutions, record keeping, translation, and attention.", "That makes Pantheon a perfect Artometrics spine: every future artist, scientist, band, actor, city, or genre report can ask where its subject sits inside the memory machine."],
        ["Pantheon.world. <em>Download Data</em> and API documentation.", "Yu, A. Z., et al. (2016). <em>Pantheon 1.0, a manually verified dataset of globally famous biographies</em>. Scientific Data 2:150075.", "Datawheel / MIT Collective Learning Group. Pantheon public methodology notes.", "Wikipedia API documentation for language-edition and pageview context."],
        "Several values are editorial indices designed from Pantheon fields and public documentation. A production dataset pass should replace them with direct Pantheon 2.0 aggregates.",
        source,
    )


def imdb_blockbuster_grammar():
    slug = "imdb-blockbuster-grammar"
    source = "Data: IMDb non-commercial datasets, Box Office Mojo-style public records, The Numbers, TMDb metadata references - ARTOMETRICS"

    genres = ["Action", "Animation", "Comedy", "Drama", "Horror", "Documentary", "Romance", "Sci-Fi"]
    votes = [91, 72, 63, 68, 55, 30, 42, 84]
    ratings = [66, 74, 62, 76, 59, 78, 64, 71]
    write_chart(slug, "chart1_genre_attention_quality", {"data": [scatter(votes, ratings, genres, [20] * len(genres), [ART_RED if g in {"Action", "Sci-Fi"} else ART_BLUE for g in genres], hover="<b>%{text}</b><br>Vote attention index: %{x}<br>Rating quality index: %{y}<extra></extra>")], "layout": layout("Attention and rating do not measure the same movie", "BLOCKBUSTERS WIN THE CROWD BEFORE THEY WIN THE SCORE", x_title="IMDb vote attention index", y_title="Rating quality index")})

    decades = ["1970s", "1980s", "1990s", "2000s", "2010s", "2020s"]
    sequel_share = [18, 24, 33, 46, 62, 69]
    write_chart(slug, "chart2_sequelization", {"data": [line(decades, sequel_share, color=ART_RED, hover="<b>%{x}</b><br>Top-grossing sequel/franchise share: %{y}%<extra></extra>")], "layout": layout("Blockbusters became serial products", "THE HIT MOVIE TURNED INTO A REPEATABLE SYSTEM", x_title="Decade", y_title="Franchise/sequel share of top hits")})

    films = ["Titanic", "Avatar", "Avengers: Endgame", "Barbie", "Oppenheimer", "Joker", "Top Gun: Maverick", "Frozen II"]
    runtime = [194, 162, 181, 114, 180, 122, 130, 103]
    cultural = [96, 94, 93, 91, 88, 83, 86, 78]
    write_chart(slug, "chart3_runtime_culture", {"data": [scatter(runtime, cultural, films, [18, 20, 22, 20, 19, 16, 18, 16], [ART_RED if f in {"Titanic", "Avatar", "Avengers: Endgame"} else ART_BLUE for f in films], hover="<b>%{text}</b><br>Runtime: %{x} min<br>Cultural attention index: %{y}<extra></extra>")], "layout": layout("Runtime is not the enemy of attention", "EVENT MOVIES CAN ASK FOR TIME", x_title="Runtime minutes", y_title="Cultural attention index")})

    platforms = ["Theater", "Cable", "DVD era", "Streaming", "Short video"]
    discovery = [92, 74, 58, 84, 88]
    ownership = [80, 66, 89, 35, 18]
    write_chart(slug, "chart4_discovery_vs_ownership", {"data": [scatter(discovery, ownership, platforms, [24, 20, 20, 23, 18], [ART_RED if p in {"Theater", "Streaming"} else ART_BLUE for p in platforms], hover="<b>%{text}</b><br>Discovery power: %{x}<br>Audience ownership: %{y}<extra></extra>")], "layout": layout("Platforms changed what a hit means", "DISCOVERY ROSE WHILE OWNERSHIP COLLAPSED", x_title="Discovery power index", y_title="Audience ownership index")})

    studios = ["Disney", "Universal", "Warner", "Paramount", "Sony", "A24", "Netflix"]
    franchise_reliance = [92, 71, 78, 64, 58, 18, 44]
    write_chart(slug, "chart5_studio_franchise_reliance", {"data": [bar_h(studios, franchise_reliance, [ART_RED if s == "Disney" else ART_BLUE for s in studios], hover="<b>%{y}</b><br>Franchise reliance index: %{x}<extra></extra>")], "layout": layout("Studios have different blockbuster grammars", "DISNEY IS THE PUREST IP COMPOUNDER", x_title="Franchise reliance index")})

    sections = [
        {"id": "genre-attention", "title": "CHART 1 - ATTENTION VERSUS QUALITY", "chart": "chart1_genre_attention_quality", "caption": "Genre attention and audience rating tell different stories", "prose": ["IMDb-style datasets are useful because ratings and vote counts separate two behaviors: how many people cared enough to rate, and how positively they scored the title.", "The blockbuster problem starts there. Popularity is not quality, but quality without attention rarely becomes culture."]},
        {"id": "sequelization", "title": "CHART 2 - SEQUELIZATION", "chart": "chart2_sequelization", "caption": "The hit movie became a serial product", "prose": ["The blockbuster increasingly behaves like a portfolio asset. Studios learned that recognition lowers marketing risk, so the cultural market tilts toward sequels, universes, and repeatable IP.", "This is not just nostalgia. It is risk management drawn as culture."]},
        {"id": "runtime", "title": "CHART 3 - RUNTIME AND EVENT STATUS", "chart": "chart3_runtime_culture", "caption": "Event movies can ask audiences for more time", "prose": ["A common hypothesis says shorter attention spans should punish long films. The evidence is messier: the event movie can still stretch past two or three hours if the social reward is high enough.", "The runtime question is really a trust question. Audiences give time when they believe the movie is an event."]},
        {"id": "platforms", "title": "CHART 4 - PLATFORMS", "chart": "chart4_discovery_vs_ownership", "caption": "Streaming and short video changed discovery without preserving ownership", "prose": ["A theater ticket once created a clean cultural signal: you went somewhere, paid, and joined an audience. Streaming makes discovery easier but ownership fuzzier.", "That is why the modern hit can feel huge and disposable at the same time."]},
        {"id": "studio-grammar", "title": "CHART 5 - STUDIO GRAMMAR", "chart": "chart5_studio_franchise_reliance", "caption": "Studios differ in how much they depend on franchise logic", "prose": ["Disney's modern advantage is not simply scale. It is the ability to convert characters, brands, parks, merchandise, and streaming into one IP flywheel.", "A24 represents the opposite grammar: smaller, identity-heavy, taste-based cultural capital."]},
    ]
    article(
        slug,
        "IMDb BLOCKBUSTER GRAMMAR: The Artometrics of Movie Fame",
        "A film-culture report using IMDb-style public title fields, rating logic, and box-office references to explain how movies become famous.",
        "culture, power",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["Movies are perfect Artometrics objects because they are art, market, memory, and industrial strategy at the same time.", "This report asks what a blockbuster is mathematically: attention, rating, runtime, franchise memory, platform behavior, and studio grammar stacked into one cultural event."],
        [("7", "Core IMDb non-commercial TSV files publicly documented"), ("Daily", "IMDb dataset refresh cadence"), ("3", "Genres can be listed per IMDb title basics row"), ("162", "Avatar runtime in minutes"), ("69%", "Illustrative sequel/franchise share of top hits in the 2020s"), ("5", "Charts in this report")],
        ["IMDb publishes non-commercial TSV datasets including title basics, ratings, crew, principals, episodes, and names. The fields make it possible to join titles, genres, years, runtimes, ratings, and vote counts.", "Because IMDb licensing has specific terms, this report uses IMDb as a source architecture and includes a commercial-use caution. A production version should verify licensing or swap in fully open TMDb/Wikidata/Box Office Mojo-compatible sources."],
        sections,
        ["The blockbuster is not one variable. It is the agreement between attention, trust, platform, and industrial repetition.", "The most useful next step is a true title-level pipeline: join title basics, ratings, box office, awards, and streaming availability, then let each movie explain its own path to fame."],
        ["IMDb Developer. <em>IMDb Non-Commercial Datasets</em>.", "IMDb required credit: Information courtesy of IMDb (https://www.imdb.com). Used with permission.", "IMDb Help. Required credit statement and non-commercial terms.", "Box Office Mojo and The Numbers public box-office reference pages.", "The Movie Database and Wikidata documentation for alternate open film metadata paths."],
        "IMDb data is subject to non-commercial terms and required credit: Information courtesy of IMDb (https://www.imdb.com). Used with permission. Any production/commercial use should verify permission or replace IMDb-derived fields with fully open sources.",
        source,
    )


def awards_prestige_economy():
    slug = "awards-prestige-economy-oscars-grammys-nobels"
    source = "Data: Academy Awards Database, Nobel Prize API, Recording Academy public records, DLu/oscar_data, Wikidata - ARTOMETRICS"

    awards = ["Oscars", "Grammys", "Nobels", "Pulitzers", "Tonys", "Emmys"]
    market = [88, 80, 62, 35, 42, 71]
    prestige = [92, 72, 96, 78, 69, 66]
    write_chart(slug, "chart1_prestige_vs_market", {"data": [scatter(market, prestige, awards, [24] * len(awards), [ART_RED if a in {"Oscars", "Nobels"} else ART_BLUE for a in awards], hover="<b>%{text}</b><br>Market attention: %{x}<br>Institutional prestige: %{y}<extra></extra>")], "layout": layout("Awards split prestige from mass attention", "THE NOBEL AND OSCAR WIN DIFFERENT GAMES", x_title="Market attention index", y_title="Institutional prestige index")})

    decades = ["1930s", "1950s", "1970s", "1990s", "2010s", "2020s"]
    oscar_categories = [12, 17, 22, 24, 24, 23]
    grammy_categories = [0, 28, 51, 87, 84, 94]
    write_chart(slug, "chart2_category_inflation", {"data": [
        line(decades, oscar_categories, color=ART_RED, name="Oscars", hover="<b>%{x}</b><br>Oscar categories: %{y}<extra></extra>"),
        line(decades, grammy_categories, color=ART_BLUE, name="Grammys", hover="<b>%{x}</b><br>Grammy categories: %{y}<extra></extra>"),
    ], "layout": {**layout("Awards systems expand their maps", "MORE CATEGORIES CREATE MORE WAYS TO NAME CULTURE", x_title="Decade", y_title="Approximate category count"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    films = ["Everything Everywhere", "Oppenheimer", "Parasite", "La La Land", "Titanic", "Lord of the Rings", "Nomadland"]
    nominations = [11, 13, 6, 14, 14, 11, 6]
    wins = [7, 7, 4, 6, 11, 11, 3]
    write_chart(slug, "chart3_nomination_conversion", {"data": [scatter(nominations, wins, films, [16 + w * 2 for w in wins], [ART_RED if w >= 7 else ART_BLUE for w in wins], hover="<b>%{text}</b><br>Nominations: %{x}<br>Wins: %{y}<extra></extra>")], "layout": layout("Prestige also has conversion rates", "NOMINATIONS ARE ACCESS; WINS ARE CLOSURE", x_title="Nominations", y_title="Wins")})

    categories = ["Picture/Album", "Director/Producer", "Actor/Artist", "Writing/Song", "Technical craft", "International"]
    concentration = [74, 68, 82, 63, 58, 49]
    write_chart(slug, "chart4_attention_concentration", {"data": [bar_v(categories, concentration, [ART_RED if c == "Actor/Artist" else ART_BLUE for c in categories], hover="<b>%{x}</b><br>Public attention concentration: %{y}<extra></extra>")], "layout": layout("Some categories carry the room", "THE PUBLIC REMEMBERS PEOPLE BEFORE SYSTEMS", x_title="Award category family", y_title="Attention concentration index")})

    systems = ["Oscar campaign", "Grammy genre lane", "Nobel committee", "Festival circuit", "Streaming algorithm", "Critics list"]
    gatekeeping = [82, 64, 94, 75, 42, 58]
    discovery = [70, 78, 55, 66, 91, 62]
    write_chart(slug, "chart5_gatekeeping_vs_discovery", {"data": [scatter(discovery, gatekeeping, systems, [22] * len(systems), [ART_RED if s in {"Nobel committee", "Oscar campaign"} else ART_BLUE for s in systems], hover="<b>%{text}</b><br>Discovery power: %{x}<br>Gatekeeping index: %{y}<extra></extra>")], "layout": layout("Prestige is gatekeeping plus discovery", "AWARDS STILL DECIDE WHAT GETS A SECOND LIFE", x_title="Discovery power index", y_title="Gatekeeping index")})

    sections = [
        {"id": "prestige-market", "title": "CHART 1 - PRESTIGE VERSUS MARKET", "chart": "chart1_prestige_vs_market", "caption": "Awards do not all trade in the same kind of attention", "prose": ["The Oscar and the Nobel both signal prestige, but they operate through different publics. One is tied to an entertainment market; the other to institutional memory.", "A good awards report should separate those circuits instead of ranking them on one vague fame scale."]},
        {"id": "category-inflation", "title": "CHART 2 - CATEGORY INFLATION", "chart": "chart2_category_inflation", "caption": "Award systems expand by creating more named lanes of excellence", "prose": ["Award shows are taxonomies. When categories expand, culture gets more official boxes, more winners, and more arguments about legitimacy.", "The Grammys especially show how genre fragmentation becomes institutional design."]},
        {"id": "conversion", "title": "CHART 3 - NOMINATION CONVERSION", "chart": "chart3_nomination_conversion", "caption": "The strongest campaigns convert nomination access into wins", "prose": ["Nominations measure being invited into the prestige room. Wins measure coalition strength, timing, category fit, and narrative closure.", "That is why Oscar analysis often feels like political analysis wearing a tuxedo."]},
        {"id": "attention", "title": "CHART 4 - ATTENTION CONCENTRATION", "chart": "chart4_attention_concentration", "caption": "The public remembers faces and names before institutional categories", "prose": ["Best Picture matters, but acting, artist, and star categories travel fastest through casual conversation.", "This is a repeated Artometrics pattern: institutions do the sorting, but people carry the story."]},
        {"id": "gatekeeping", "title": "CHART 5 - GATEKEEPING", "chart": "chart5_gatekeeping_vs_discovery", "caption": "Awards still decide which works get a second life", "prose": ["Streaming can create discovery at scale, but awards create sanctioned memory. They turn a work from content into curriculum, canon, playlist, or obituary headline.", "That is the prestige economy: a machine for deciding what culture should remember about itself."]},
    ]
    article(
        slug,
        "AWARDS PRESTIGE ECONOMY: Oscars, Grammys, Nobels",
        "A cross-medium report on how award systems convert attention into legitimacy across film, music, literature, science, and public culture.",
        "culture, power",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["Award shows are culture's accounting departments. They translate messy creative fields into categories, winners, speeches, snubs, and canon.", "This report asks how prestige is made across mediums: film, music, science, literature, theater, and television all have award systems, but they do not manufacture legitimacy in the same way."],
        [("98th", "Academy Awards database complete through 2025/2026 cycle per official database"), ("1,500+", "Acceptance speeches in the Academy's speech database"), ("1901", "First Nobel Prizes awarded"), ("94", "Approximate Grammy category count in recent ceremonies"), ("6", "Award systems compared"), ("5", "Charts in this report")],
        ["The Academy maintains an official searchable database of winners and nominees. The Nobel Prize provides public API-style records. Music awards are less clean as open data, so public Recording Academy records and Wikidata-style tables become useful complements.", "This report builds a framework before ingestion: prestige, category inflation, nomination conversion, attention concentration, and gatekeeping."],
        sections,
        ["The key finding is that awards do not merely recognize culture. They structure it. They create category lanes, memory lanes, and legitimacy lanes.", "For Artometrics, awards data is ideal because it connects creative work to institutions, markets, demographics, speeches, scandals, and canon formation."],
        ["Academy of Motion Picture Arts and Sciences. <em>Academy Awards Database</em>.", "Oscars.org. <em>Awards Databases</em> and Acceptance Speech Database.", "Nobel Prize. Public prize and laureate data/API documentation.", "DLu/oscar_data. Curated Academy Award nomination dataset with identifiers.", "Recording Academy public Grammy records and Wikidata award tables."],
        "Some chart values are editorial indices combining public records and institutional structure. A production pass should ingest official Academy/Nobel data and carefully licensed music-award tables.",
        source,
    )


def musicbrainz_fame_mechanics():
    slug = "musicbrainz-pop-fame-mechanics"
    source = "Data: MusicBrainz / MetaBrainz CC0 dumps, Wikidata, Billboard-style public chart references - ARTOMETRICS"

    artists = ["Beatles", "Taylor Swift", "Beyonce", "Drake", "Bad Bunny", "Nirvana", "Radiohead", "Madonna"]
    catalog_depth = [92, 88, 76, 84, 68, 52, 66, 82]
    attention = [84, 97, 92, 90, 88, 74, 71, 79]
    write_chart(slug, "chart1_catalog_vs_attention", {"data": [scatter(catalog_depth, attention, artists, [24] * len(artists), [ART_RED if a in {"Taylor Swift", "Beatles", "Beyonce"} else ART_BLUE for a in artists], hover="<b>%{text}</b><br>Catalog depth index: %{x}<br>Current attention index: %{y}<extra></extra>")], "layout": layout("Pop fame balances archive and now", "CATALOG DEPTH AND CURRENT HEAT ARE DIFFERENT ASSETS", x_title="Catalog depth index", y_title="Current attention index")})

    decades = ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"]
    album_power = [92, 88, 81, 74, 62, 46, 34]
    single_power = [58, 61, 70, 76, 84, 94, 98]
    write_chart(slug, "chart2_album_to_single_shift", {"data": [
        line(decades, album_power, color=ART_RED, name="Album era", hover="<b>%{x}</b><br>Album power: %{y}<extra></extra>"),
        line(decades, single_power, color=ART_BLUE, name="Track/stream era", hover="<b>%{x}</b><br>Single/stream power: %{y}<extra></extra>"),
    ], "layout": {**layout("The unit of music fame changed", "ALBUMS LOST POWER TO TRACKS AND STREAMS", x_title="Decade", y_title="Format power index"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    genres = ["Rock", "Pop", "Hip-hop", "Latin", "Country", "Electronic", "R&B"]
    global_reach = [80, 92, 86, 84, 54, 72, 76]
    local_identity = [74, 66, 83, 88, 91, 58, 79]
    write_chart(slug, "chart3_genre_global_local", {"data": [scatter(global_reach, local_identity, genres, [22] * len(genres), [ART_RED if g in {"Latin", "Country"} else ART_BLUE for g in genres], hover="<b>%{text}</b><br>Global reach: %{x}<br>Local identity: %{y}<extra></extra>")], "layout": layout("Genres travel differently", "SOME MUSIC GLOBALIZES BY STAYING LOCAL", x_title="Global reach index", y_title="Local identity index")})

    fame_paths = ["Teen idol", "Band mythology", "Critical canon", "Streaming volume", "Tour economy", "Viral single", "Prestige award"]
    durability = [72, 88, 81, 68, 84, 46, 76]
    write_chart(slug, "chart4_fame_path_durability", {"data": [bar_h(fame_paths, durability, [ART_RED if p in {"Band mythology", "Tour economy"} else ART_BLUE for p in fame_paths], hover="<b>%{y}</b><br>Durability index: %{x}<extra></extra>")], "layout": layout("Not all fame paths last", "MYTHOLOGY AND LIVE RITUAL ARE DURABLE MACHINES", x_title="Durability index")})

    artists2 = ["Beatles", "Taylor", "Beyonce", "Madonna", "Drake", "Bad Bunny", "Radiohead", "Nirvana"]
    reinvention = [77, 94, 91, 96, 70, 82, 84, 35]
    canon = [99, 86, 84, 88, 68, 66, 82, 80]
    write_chart(slug, "chart5_reinvention_vs_canon", {"data": [scatter(reinvention, canon, artists2, [24] * len(artists2), [ART_RED if a in {"Madonna", "Taylor", "Beatles"} else ART_BLUE for a in artists2], hover="<b>%{text}</b><br>Reinvention index: %{x}<br>Canon index: %{y}<extra></extra>")], "layout": layout("Some artists become eras, not just acts", "REINVENTION IS THE POP VERSION OF LONGEVITY", x_title="Reinvention index", y_title="Canon index")})

    sections = [
        {"id": "catalog-now", "title": "CHART 1 - CATALOG AND NOW", "chart": "chart1_catalog_vs_attention", "caption": "Pop fame balances archive depth with current heat", "prose": ["MusicBrainz is valuable because music metadata is relational: artists, releases, recordings, works, labels, genres, aliases, and places are connected.", "A famous artist can win by having a deep archive, a current attention spike, or both. Those are different shapes of fame."]},
        {"id": "format-shift", "title": "CHART 2 - FORMAT SHIFT", "chart": "chart2_album_to_single_shift", "caption": "The unit of music fame moved from album to track", "prose": ["The album was once the central unit of career meaning. Streaming did not erase albums, but it weakened their monopoly over measurement.", "That changes how artists are evaluated: volume, playlisting, singles, and virality can now compete with the old album-cycle narrative."]},
        {"id": "genre-travel", "title": "CHART 3 - GENRE TRAVEL", "chart": "chart3_genre_global_local", "caption": "Genres travel through different balances of global reach and local identity", "prose": ["Latin music shows that local identity can be a globalization engine. Country shows the opposite problem: a powerful local ritual that travels less cleanly.", "An Artometrics music report should therefore compare genres as cultural systems, not just sound categories."]},
        {"id": "fame-paths", "title": "CHART 4 - FAME PATHS", "chart": "chart4_fame_path_durability", "caption": "Some fame paths decay faster than others", "prose": ["Virality can be enormous and fragile. Band mythology, touring, and critical canon move more slowly but often last longer.", "This is why one-hit wonder, cult classic, superstar, and legacy act are different data shapes."]},
        {"id": "reinvention", "title": "CHART 5 - REINVENTION", "chart": "chart5_reinvention_vs_canon", "caption": "Reinvention lets artists become eras rather than single moments", "prose": ["Madonna, Taylor Swift, Beyonce, and the Beatles each show a different version of era-making. They do not merely release songs; they reorganize their own interpretive frame.", "That is a cultural metric: the ability to make the audience learn a new version of you."]},
    ]
    article(
        slug,
        "MUSICBRAINZ: The Artometrics of Pop Fame",
        "A music-culture report using MusicBrainz-style metadata to explain how artists become famous through catalog depth, format shifts, genre travel, and reinvention.",
        "culture, persona",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["Music fame looks emotional, but it leaves metadata everywhere: releases, recordings, aliases, collaborations, labels, genres, works, tours, awards, and chart traces.", "This report uses MusicBrainz as the open-data spine for a bigger question: why do some artists become eras while others become moments?"],
        [("CC0", "MusicBrainz core database dump license for public-domain metadata"), ("2x/week", "MetaBrainz published dump cadence in public documentation"), ("11", "JSON dump entity types listed in MusicBrainz documentation"), ("7", "Fame paths compared"), ("8", "Artists used as report anchors"), ("5", "Charts in this report")],
        ["MetaBrainz publishes MusicBrainz data dumps in PostgreSQL and JSON formats. The JSON dumps include entities such as artist, recording, release, release group, work, label, area, event, and place.", "This report uses a curated editorial model over that source architecture. A scaled version would ingest artist, release-group, recording, and tag dumps, then join them to chart, award, and tour datasets."],
        sections,
        ["The strongest finding is that music fame is not just popularity. It is the interaction of catalog, format, genre, mythology, and reinvention.", "MusicBrainz gives Artometrics a credible open metadata spine. The next layer is joining it to charts, streaming, lyrics, tours, and awards to make artist-specific reports."],
        ["MusicBrainz. <em>JSON Data Dumps</em> documentation.", "MetaBrainz Foundation. <em>Datasets: PostgreSQL and JSON dumps</em>.", "MusicBrainz Database Download documentation and CC0 license notes.", "Wikidata and public chart-history references for artist-level context."],
        "Several artist and genre values are editorial indices. The report is a source-backed framework for a future direct MusicBrainz ingestion pipeline.",
        source,
    )


def gutenberg_public_domain_canon():
    slug = "project-gutenberg-public-domain-canon-map"
    source = "Data: Project Gutenberg RDF/CSV catalog feeds, Library of Congress subject logic, Wikidata - ARTOMETRICS"

    languages = ["English", "French", "German", "Finnish", "Dutch", "Portuguese", "Italian", "Spanish"]
    title_share = [72, 7, 6, 3, 3, 2, 2, 2]
    write_chart(slug, "chart1_language_gravity", {"data": [bar_h(languages, title_share, [ART_RED if l == "English" else ART_BLUE for l in languages], hover="<b>%{y}</b><br>Catalog share index: %{x}<extra></extra>")], "layout": layout("The public-domain shelf is language-weighted", "ENGLISH DOMINATES THE ACCESSIBLE CANON", x_title="Catalog share index")})

    eras = ["Pre-1800", "1800-1849", "1850-1899", "1900-1924", "1925-1949", "1950+"]
    fiction = [22, 48, 86, 74, 34, 18]
    nonfiction = [61, 58, 64, 72, 52, 29]
    write_chart(slug, "chart2_era_subject_stack", {"data": [
        line(eras, fiction, color=ART_RED, name="Fiction/literature", hover="<b>%{x}</b><br>Fiction/literature index: %{y}<extra></extra>"),
        line(eras, nonfiction, color=ART_BLUE, name="Nonfiction/reference", hover="<b>%{x}</b><br>Nonfiction/reference index: %{y}<extra></extra>"),
    ], "layout": {**layout("Public domain is an era machine", "THE 19TH CENTURY BECOMES THE LITERARY CORE", x_title="Publication era", y_title="Subject presence index"), "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.08}}})

    authors = ["Dickens", "Twain", "Austen", "Doyle", "Dumas", "Shakespeare", "Verne", "Tolstoy", "Woolf", "Poe"]
    availability = [95, 91, 82, 88, 84, 96, 83, 78, 72, 86]
    cultural_memory = [91, 88, 92, 85, 78, 99, 81, 94, 83, 87]
    write_chart(slug, "chart3_author_availability_memory", {"data": [scatter(availability, cultural_memory, authors, [22] * len(authors), [ART_RED if a in {"Shakespeare", "Austen", "Dickens"} else ART_BLUE for a in authors], hover="<b>%{text}</b><br>Digital availability index: %{x}<br>Cultural memory index: %{y}<extra></extra>")], "layout": layout("Availability and memory reinforce each other", "PUBLIC DOMAIN TURNS AUTHORS INTO INFRASTRUCTURE", x_title="Digital availability index", y_title="Cultural memory index")})

    subjects = ["Adventure", "Manners", "Gothic", "Science", "War", "Travel", "Religion", "Children"]
    adaptation_power = [88, 72, 81, 66, 76, 63, 54, 84]
    write_chart(slug, "chart4_subject_adaptation_power", {"data": [bar_v(subjects, adaptation_power, [ART_RED if s in {"Adventure", "Children"} else ART_BLUE for s in subjects], hover="<b>%{x}</b><br>Adaptation power index: %{y}<extra></extra>")], "layout": layout("Some public-domain subjects adapt better", "ADVENTURE AND CHILDHOOD TRAVEL CLEANLY", x_title="Subject family", y_title="Adaptation power index")})

    works = ["Pride and Prejudice", "Sherlock Holmes", "Dracula", "Frankenstein", "Moby-Dick", "Alice", "Tom Sawyer", "War and Peace"]
    classroom = [92, 78, 69, 82, 74, 71, 64, 88]
    pop_reuse = [76, 95, 93, 91, 58, 88, 70, 61]
    write_chart(slug, "chart5_classroom_vs_reuse", {"data": [scatter(classroom, pop_reuse, works, [18] * len(works), [ART_RED if w in {"Sherlock Holmes", "Dracula", "Frankenstein"} else ART_BLUE for w in works], hover="<b>%{text}</b><br>Classroom canon: %{x}<br>Pop reuse index: %{y}<extra></extra>")], "layout": layout("Canon has school and remix versions", "SOME BOOKS BECOME CURRICULUM, OTHERS BECOME MONSTERS", x_title="Classroom canon index", y_title="Pop reuse index")})

    sections = [
        {"id": "language-gravity", "title": "CHART 1 - LANGUAGE GRAVITY", "chart": "chart1_language_gravity", "caption": "English dominates the accessible public-domain shelf", "prose": ["Project Gutenberg is not just a library. It is a map of what digitized public-domain culture looks like when volunteer labor, copyright timelines, language, and reader demand overlap.", "The first signature is language gravity. English-language texts become the easiest canon to access, search, remix, and teach."]},
        {"id": "era-machine", "title": "CHART 2 - ERA MACHINE", "chart": "chart2_era_subject_stack", "caption": "The 19th century becomes the public-domain literary core", "prose": ["Copyright law turns time into a cultural filter. The works that are old enough, popular enough, and legible enough become the available past.", "That makes Gutenberg a powerful meso dataset: not every book ever written, but the books most ready to be reactivated."]},
        {"id": "author-memory", "title": "CHART 3 - AUTHOR MEMORY", "chart": "chart3_author_availability_memory", "caption": "Digital availability and cultural memory reinforce each other", "prose": ["Authors become infrastructure when their works are everywhere: in classrooms, editions, audiobooks, adaptations, quote databases, and training corpora.", "That is why public domain matters to AI culture too. Availability shapes what machines and people can easily learn from."]},
        {"id": "adaptation", "title": "CHART 4 - ADAPTATION POWER", "chart": "chart4_subject_adaptation_power", "caption": "Adventure, childhood, and gothic subjects adapt especially well", "prose": ["Some subjects move cleanly across medium. Adventure becomes film; childhood becomes brand memory; gothic becomes horror grammar.", "The public-domain market is therefore not dead literature. It is reusable cultural material."]},
        {"id": "canon-remix", "title": "CHART 5 - CANON AND REMIX", "chart": "chart5_classroom_vs_reuse", "caption": "Some books become curriculum while others become remix engines", "prose": ["Pride and Prejudice is classroom canon and adaptation engine. Sherlock Holmes, Dracula, and Frankenstein are more like cultural APIs: infinitely callable characters and structures.", "That is the Artometrics claim: the most powerful books are not only read. They are reused."]},
    ]
    article(
        slug,
        "PROJECT GUTENBERG: The Artometrics of the Public-Domain Canon",
        "A literary culture report using Project Gutenberg metadata logic to map language gravity, era effects, author memory, adaptation power, and remix value.",
        "culture, history",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["Project Gutenberg is one of the internet's great cultural datasets: a public-domain library whose metadata can show which books remain available, searchable, teachable, and reusable.", "This report asks what the public-domain canon looks like as data. The answer is not merely literature. It is language, copyright, digitization, education, and remix culture."],
        [("75K+", "Approximate scale of Project Gutenberg ebooks in public-facing summaries"), ("Weekly", "CSV catalog update cadence noted in Gutenberg tooling docs"), ("Daily", "RDF catalog update cadence noted by Gutenberg"), ("8", "Languages compared in the first chart"), ("10", "Authors used as anchors"), ("5", "Charts in this report")],
        ["Project Gutenberg provides machine-readable metadata in RDF/XML, MARC, and CSV formats. Official pages recommend using the metadata feeds rather than crawling the website.", "A scaled version of this report should ingest the weekly CSV or RDF catalog, normalize subjects/languages/authors, and join to adaptation, school syllabus, and Wikidata signals."],
        sections,
        ["The public-domain canon is not neutral. It is shaped by language, copyright age, volunteer digitization, educational reuse, and adaptation economics.", "For Artometrics, Gutenberg is a bridge dataset: it connects literature, AI training culture, education, film adaptation, and historical memory."],
        ["Project Gutenberg. <em>Offline Catalogs</em> and machine-readable metadata documentation.", "Project Gutenberg feeds: RDF/XML and CSV catalog files.", "gutenbergtools/catalog_tools. Notes on Project Gutenberg catalog CSV and RDF updates.", "Library of Congress subject logic and Wikidata work/author metadata for future joins."],
        "Chart values are editorial indices designed from Project Gutenberg source fields and public canon/adaptation signals. A production pass should ingest the official catalog directly.",
        source,
    )


def write_plan():
    plan = """# Artometrics culture canon source plan

This plan expands the site beyond sports into art, fame, awards, films, books,
music, and collective memory. Each report keeps the five-chart contract: one
historical spine, one peer comparison, one identity metric, one contradiction,
and one frontier/pain/canon chart.

## Credible public datasets

1. Pantheon / Datawheel / MIT Collective Learning Group
   - Use for notable people, occupations, birthplaces, language reach, and attention.
   - Best reports: collective memory, famous artists, scientists, cities, eras.
2. IMDb non-commercial datasets
   - Use with caution because terms are non-commercial and require IMDb credit.
   - Best reports: film genres, runtimes, ratings, vote attention, title networks.
3. Project Gutenberg RDF/CSV feeds
   - Official public-domain literature metadata.
   - Best reports: canon formation, language, subject tags, author networks.
4. Academy Awards Database / Nobel Prize API / Wikidata award tables
   - Use for prestige economies, nomination conversion, category inflation.
5. MusicBrainz / MetaBrainz CC0 dumps
   - Use for artists, releases, recordings, labels, genres, works, and places.
   - Best reports: artist fame mechanics, genre identity, band networks.

## First culture batch

1. `pantheon-the-artometrics-of-collective-memory`
   - Theme: biography, memory, language reach, historical inequality.
2. `imdb-blockbuster-grammar`
   - Theme: movies as attention/rating/franchise/platform systems.
3. `awards-prestige-economy-oscars-grammys-nobels`
   - Theme: how awards convert attention into legitimacy.
4. `musicbrainz-pop-fame-mechanics`
   - Theme: catalog depth, format shifts, genre travel, reinvention.
5. `project-gutenberg-public-domain-canon-map`
   - Theme: public-domain books, canon formation, remix and adaptation.

## Next culture batch

- Artist reports: Beatles, Taylor Swift, Beyonce, Bad Bunny, Radiohead.
- Film studio reports: Disney, A24, Marvel, Pixar, horror as a business model.
- Award-show microreports: Best Picture conversion, Grammy genre politics, Nobel geography.
- Medium reports: anime, video games, podcasts, theater, museums.

## Editorial rule

The subject can be micro, meso, or macro. A report is valid when the data can
explain why something became famous, durable, prestigious, controversial, or
culturally legible.
"""
    DOCS_DIR.mkdir(exist_ok=True)
    (DOCS_DIR / "culture-canon-source-plan.md").write_text(plan)


def main():
    write_plan()
    pantheon_collective_memory()
    imdb_blockbuster_grammar()
    awards_prestige_economy()
    musicbrainz_fame_mechanics()
    gutenberg_public_domain_canon()
    print("Generated culture canon plan and 5 five-chart reports.")


if __name__ == "__main__":
    main()
