#!/usr/bin/env python3
"""Generate the first Artometrics sports canon batch.

The batch is intentionally curated: small, sourced from public reference
records, and built around five distinct editorial charts per article.
"""

from __future__ import annotations

import json
from pathlib import Path
from textwrap import dedent


ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"
DATA_DIR = ROOT / "public" / "data" / "articles"
DOCS_DIR = ROOT / "docs"

ART_RED = "#C0392B"
ART_BLUE = "#2C3E6B"
ART_DARK = "#1C1C1E"
ART_MID = "#6B6B6B"
ART_CREAM = "#F2F0EB"
ART_GREY = "#D5D5D5"


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
        "margin": {"l": 84, "r": 52, "t": 88, "b": 64},
        "height": height,
        "hovermode": "closest",
        "showlegend": False,
        "xaxis": {
            "title": {"text": x_title},
            "showgrid": True,
            "gridcolor": "#DEDAD1",
            "linecolor": ART_MID,
            "tickfont": {"color": ART_MID, "size": 11},
            "zeroline": False,
        },
        "yaxis": {
            "title": {"text": y_title},
            "showgrid": True,
            "gridcolor": "#DEDAD1",
            "linecolor": ART_MID,
            "tickfont": {"color": ART_MID, "size": 11},
            "zeroline": False,
            "automargin": True,
        },
    }


def write_chart(slug: str, chart_id: str, spec: dict):
    path = DATA_DIR / slug / "charts" / f"{chart_id}.plotly.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(spec, separators=(",", ":")))


def bar_h(y, x, colors=None, *, hover="%{y}<br>%{x}<extra></extra>"):
    return {
        "type": "bar",
        "orientation": "h",
        "y": y,
        "x": x,
        "marker": {
            "color": colors or [ART_BLUE] * len(x),
            "line": {"color": ART_DARK, "width": 0.4},
        },
        "hovertemplate": hover,
    }


def bar_v(x, y, colors=None, *, hover="%{x}<br>%{y}<extra></extra>"):
    return {
        "type": "bar",
        "x": x,
        "y": y,
        "marker": {
            "color": colors or [ART_BLUE] * len(y),
            "line": {"color": ART_DARK, "width": 0.4},
        },
        "hovertemplate": hover,
    }


def line(x, y, *, color=ART_RED, name="", hover="%{x}<br>%{y}<extra></extra>"):
    return {
        "type": "scatter",
        "mode": "lines+markers",
        "x": x,
        "y": y,
        "name": name,
        "line": {"color": color, "width": 3},
        "marker": {"size": 8, "color": color},
        "hovertemplate": hover,
    }


def scatter(x, y, text, size, color, *, hover="%{text}<br>x=%{x}<br>y=%{y}<extra></extra>"):
    return {
        "type": "scatter",
        "mode": "markers+text",
        "x": x,
        "y": y,
        "text": text,
        "textposition": "top center",
        "marker": {
            "size": size,
            "color": color,
            "opacity": 0.86,
            "line": {"color": ART_DARK, "width": 0.5},
        },
        "hovertemplate": hover,
    }


def chart_html(slug: str, chart_id: str, caption: str) -> str:
    return (
        '<figure class="art-chart">\n'
        f'  <div class="art-chart-live" data-chart="/data/articles/{slug}/charts/{chart_id}.plotly.json" '
        f'role="img" aria-label="{caption}"></div>\n'
        f'  <figcaption class="art-chart-caption">{caption}</figcaption>\n'
        "</figure>"
    )


def facts_html(facts):
    return "\n".join(
        f'  <div class="fact-box"><span class="fact-number">{value}</span><span class="fact-label">{label}</span></div>'
        for value, label in facts
    )


def article(slug: str, title: str, description: str, tags: str, toc, intro, facts, context, sections, conclusion, references, note):
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
            chart_html(slug, section["chart"], section["caption"]),
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


def yankees():
    slug = "yankees-the-artometrics-of-baseballs-empire"
    decades = ["1920s", "1930s", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"]
    titles = [3, 5, 4, 6, 2, 2, 0, 3, 2, 0, 0]
    write_chart(slug, "chart1_banner_clusters", {"data": [bar_v(decades, titles, [ART_RED if v >= 3 else ART_BLUE for v in titles])], "layout": layout("The Yankees did not win evenly", "THE EMPIRE ARRIVED IN CLUSTERS", x_title="Decade", y_title="World Series titles")})

    clubs = ["Athletics", "Red Sox", "Giants", "Dodgers", "Cardinals", "Yankees"]
    club_titles = [9, 9, 8, 7, 11, 27]
    write_chart(slug, "chart2_empire_gap", {"data": [bar_h(clubs, club_titles, [ART_BLUE] * 5 + [ART_RED])], "layout": layout("Baseball's title gap is still enormous", "THE YANKEES ARE A DIFFERENT SCALE", x_title="World Series titles")})

    drought_teams = ["Yankees", "Dodgers pre-2020", "Cubs pre-2016", "Red Sox pre-2004", "White Sox pre-2005"]
    droughts = [15, 31, 108, 86, 88]
    write_chart(slug, "chart3_drought_context", {"data": [bar_h(drought_teams, droughts, [ART_RED] + [ART_BLUE] * 4)], "layout": layout("In the Bronx, 15 years feels like failure", "DROUGHT IS RELATIVE TO EXPECTATION", x_title="Years between titles or active drought")})

    years = [1996, 1998, 1999, 2000, 2003, 2009, 2012, 2017, 2019, 2022, 2024]
    payroll_rank = [1, 2, 1, 1, 1, 1, 1, 2, 3, 3, 2]
    result_score = [4, 4, 4, 4, 2, 4, 1, 2, 2, 1, 2]
    write_chart(slug, "chart4_money_conversion", {"data": [scatter(years, payroll_rank, [str(y) for y in years], [12 + s * 5 for s in result_score], [ART_RED if s == 4 else ART_BLUE for s in result_score], hover="%{text}<br>Payroll rank: %{y}<extra></extra>")], "layout": {**layout("Money still buys contention", "BUT IT NO LONGER BUYS OCTOBER CERTAINTY", x_title="Season", y_title="Payroll rank (lower is richer)"), "yaxis": {**layout("", "")["yaxis"], "autorange": "reversed", "title": {"text": "Payroll rank (lower is richer)"}}}})

    eras = ["Ruth/Gehrig", "DiMaggio", "Mantle", "Steinbrenner I", "Core Four", "Post-2009"]
    pennants = [7, 10, 9, 4, 6, 1]
    rings = [4, 8, 5, 2, 5, 0]
    write_chart(slug, "chart5_pennant_conversion", {"data": [
        bar_h(eras, pennants, [ART_GREY] * len(eras), hover="%{y}<br>Pennants: %{x}<extra></extra>"),
        bar_h(eras, rings, [ART_RED] * len(eras), hover="%{y}<br>Titles: %{x}<extra></extra>"),
    ], "layout": {**layout("The machine was built for pennants", "RINGS ARE THE HARDER CONVERSION", x_title="Pennants and titles"), "barmode": "overlay", "showlegend": True, "legend": {"orientation": "h", "x": 0.5, "xanchor": "center", "y": 1.04}}})

    sections = [
        {"id": "banner-clusters", "title": "CHART 1 - BANNER CLUSTERS", "chart": "chart1_banner_clusters", "caption": "World Series titles by decade", "prose": ["The Yankees are remembered as a permanent empire, but the banners arrived in bursts. The 1930s, 1940s, and 1950s did the compounding. Later eras mostly managed the expectation created by that original surplus.", "Hypothesis confirmed: the franchise's identity is not merely winning; it is historical clustering so dense that ordinary contention now reads as decline."]},
        {"id": "empire-gap", "title": "CHART 2 - THE EMPIRE GAP", "chart": "chart2_empire_gap", "caption": "World Series titles compared with other historic MLB franchises", "prose": ["The Yankees do not lead baseball by a normal margin. They sit closer to a separate category: not the best team in a ranking, but the institution that defines the ranking.", "For a baseball obsessive, this is the conversation: whether the Yankees are a team or a standard of measurement."]},
        {"id": "drought-context", "title": "CHART 3 - DROUGHT IS RELATIVE", "chart": "chart3_drought_context", "caption": "Championship droughts in context", "prose": ["A 15-year drought is not historically large. It only feels enormous because Yankee time is compressed. Other franchises waited lifetimes; the Yankees experience a decade and a half as institutional malfunction.", "That emotional gap is measurable: expectation changes the meaning of the same number."]},
        {"id": "money-conversion", "title": "CHART 4 - MONEY AND OCTOBER", "chart": "chart4_money_conversion", "caption": "Payroll rank and postseason outcome markers", "prose": ["The post-1990s Yankees still spend like an empire. What changed is conversion. The payroll rank remains elite; the championship output does not.", "This is the modern front-office problem: capital is necessary, but it is no longer sufficiently rare to guarantee separation."]},
        {"id": "pennant-conversion", "title": "CHART 5 - PENNANTS TO RINGS", "chart": "chart5_pennant_conversion", "caption": "Pennants and World Series titles by Yankee era", "prose": ["The old Yankees converted pennants into titles with terrifying efficiency. The later story is messier: enough appearances to preserve mythology, not enough rings to refresh it.", "The dynasty was not just talent. It was conversion under pressure."]},
    ]
    article(
        slug,
        "YANKEES: The Artometrics of Baseball's Empire",
        "The Yankees are not merely baseball's most decorated franchise. They are the sport's benchmark for expectation, drought, payroll pressure, and historical scale.",
        "atlas, power",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        [
            "The New York Yankees are what happens when winning stops being an achievement and becomes an operating requirement. Twenty-seven World Series titles do not merely decorate the franchise; they distort the measurement system around it.",
            "This report tests a simple hypothesis: Yankee exceptionalism is not only the number of championships. It is the mismatch between their historical surplus and the modern difficulty of converting money into October certainty.",
        ],
        [("27", "World Series championships, the most in Major League Baseball"), ("40", "American League pennants, the deepest October archive in the sport"), ("2009", "Most recent World Series title"), ("15", "Active title drought entering 2025"), ("5", "Titles from the Core Four era, 1996-2009"), ("1923", "First Yankee championship, the Ruth-era ignition point")],
        [
            "The charts use curated public-reference records from Baseball Reference, Retrosheet-style season summaries, Lahman historical tables, and widely cited payroll/value rankings. The intent is not to replace a play-by-play model; it is to quantify franchise identity at the institutional scale.",
            "A baseball professional would look for conversion: how money becomes wins, how wins become postseason chances, and how postseason chances become flags. A fan mostly feels the gap between mythology and the current roster. This report puts both conversations on the same page.",
        ],
        sections,
        ["The Yankees are still rich, still relevant, and still structurally advantaged. The data does not say the empire is dead. It says the monopoly on conversion is gone.", "That is the modern Yankee paradox: the franchise remains baseball's reference point even when it is no longer baseball's final boss."],
        ["Baseball Reference. <em>New York Yankees Franchise History</em>.", "Lahman, S. <em>Lahman Baseball Database</em>.", "Forbes. <em>MLB Team Valuations</em>, historical rankings.", "Retrosheet and Baseball Almanac championship/pennant records."],
        "This report uses public historical records and rounded franchise-era summaries. Payroll-rank points are editorial markers, not a complete salary model.",
    )


def lakers():
    slug = "lakers-the-artometrics-of-basketball-glamour"
    decades = ["1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"]
    titles = [1, 5, 0, 1, 5, 0, 4, 1, 1]
    write_chart(slug, "chart1_titles_by_decade", {"data": [bar_v(decades, titles, [ART_RED if v >= 4 else ART_BLUE for v in titles])], "layout": layout("Laker history moves in star cycles", "BANNERS ARRIVE WHEN ERAS ALIGN", x_title="Decade", y_title="NBA titles")})

    peers = ["76ers", "Pistons", "Warriors", "Bulls", "Spurs", "Lakers", "Celtics"]
    peer_titles = [3, 3, 7, 6, 5, 17, 18]
    write_chart(slug, "chart2_title_race", {"data": [bar_h(peers, peer_titles, [ART_BLUE] * 5 + [ART_RED, ART_BLUE])], "layout": layout("The NBA title race is a two-name argument", "LAKERS AND CELTICS SET THE CEILING", x_title="Championships")})

    eras = ["Mikan", "West/Wilt", "Showtime", "Shaq/Kobe", "Kobe/Pau", "LeBron/AD"]
    era_titles = [5, 1, 5, 3, 2, 1]
    write_chart(slug, "chart3_star_engines", {"data": [bar_h(eras, era_titles, [ART_RED if v >= 5 else ART_BLUE for v in era_titles])], "layout": layout("The Lakers are a star-delivery system", "EVERY TRUE DYNASTY HAS A FACE", x_title="Titles in era")})

    finals_decades = ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"]
    finals = [6, 7, 3, 8, 1, 6, 1, 1]
    write_chart(slug, "chart4_finals_frequency", {"data": [line(finals_decades, finals)], "layout": layout("Los Angeles keeps returning to the final table", "FINALS FREQUENCY IS THE REAL BRAND ASSET", x_title="Decade", y_title="Finals appearances")})

    gap_labels = ["1954-72", "1972-80", "1988-2000", "2002-09", "2010-20"]
    gaps = [18, 8, 12, 7, 10]
    write_chart(slug, "chart5_banner_gaps", {"data": [bar_v(gap_labels, gaps, [ART_RED if v >= 12 else ART_BLUE for v in gaps])], "layout": layout("Even glamour has winter", "THE BRAND SURVIVES THE GAPS", x_title="Title gap", y_title="Years")})

    sections = [
        {"id": "titles-by-decade", "title": "CHART 1 - BANNER CYCLES", "chart": "chart1_titles_by_decade", "caption": "Lakers championships by decade", "prose": ["The Lakers do not win as a smooth institution. They win in eras: Mikan, Showtime, Shaq and Kobe, Kobe and Pau, LeBron and Davis.", "The data confirms the folklore. Los Angeles is not a steady-state winner; it is a machine for converting transcendent stars into concentrated title runs."]},
        {"id": "title-race", "title": "CHART 2 - THE TWO-NAME CEILING", "chart": "chart2_title_race", "caption": "NBA championships by major franchise", "prose": ["The Lakers-Celtics comparison is not sports-talk filler. It is the actual shape of NBA history. Everyone else is fighting for the second tier.", "For an NBA expert, the argument is not whether the Lakers are elite. It is how often glamour can rebuild itself before the market advantage decays."]},
        {"id": "star-engines", "title": "CHART 3 - STAR ENGINES", "chart": "chart3_star_engines", "caption": "Championships by defining Lakers star era", "prose": ["The Lakers' front office product is not simply basketball. It is star gravity. When the right face arrives, the rest of the system suddenly makes sense.", "The risky part is visible too: between stars, the franchise can look ordinary faster than its brand admits."]},
        {"id": "finals-frequency", "title": "CHART 4 - FINAL TABLE FREQUENCY", "chart": "chart4_finals_frequency", "caption": "Finals appearances by decade", "prose": ["Championships are rare, but appearances show institutional access. The Lakers have repeatedly returned to the final table across tactical eras, ownership eras, and league economics.", "That is the real glamour metric: not invincibility, but recurring invitation."]},
        {"id": "banner-gaps", "title": "CHART 5 - WINTER IN LOS ANGELES", "chart": "chart5_banner_gaps", "caption": "Selected gaps between Lakers championships", "prose": ["The Lakers have winters. They just rarely become permanent seasons. The brand's advantage is patience with a recruitment magnet attached.", "The chart is a reminder that even the most glamorous franchise needs the next organizing star."]},
    ]
    article(
        slug,
        "LAKERS: The Artometrics of Basketball Glamour",
        "The Lakers are basketball's glamour machine: a franchise that converts stars, market gravity, and expectation into recurring championship eras.",
        "culture, power",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["The Los Angeles Lakers are what happens when winning and celebrity become the same operating system. Other teams develop stars. The Lakers absorb them, frame them, and turn them into eras.", "This report tests whether the Laker mystique is sentimental mythology or a measurable structure. The answer is both: glamour does not guarantee winning, but it repeatedly lowers the cost of becoming relevant again."],
        [("17", "NBA championships in franchise history"), ("32", "Approximate Finals appearances, the league's deepest final-round archive"), ("5", "Titles in the Showtime decade"), ("6", "Defining title eras from Mikan to LeBron/AD"), ("1949", "First championship season"), ("2020", "Most recent championship")],
        ["The report uses public NBA championship records, Basketball Reference franchise histories, and league-reference summaries. Era buckets are editorial groupings around the players and teams most responsible for each title window.", "Professionals would ask how a franchise repeatedly reopens title windows. Fans ask why the jersey seems to summon stars. The charts show the same mechanism from two angles: market gravity plus historical proof."],
        sections,
        ["The Lakers' advantage is not that they avoid decline. It is that decline rarely destroys the recruitment story. The next star can always imagine becoming the next chapter.", "That is why Lakers data looks less like a franchise line and more like a sequence of Hollywood acts: fade-out, casting, title run, repeat."],
        ["Basketball Reference. <em>Los Angeles Lakers Franchise Index</em>.", "NBA.com historical championship records.", "Sports Reference and Basketball Reference Finals appearance summaries."],
        "Finals-appearance counts are rounded to the conventional franchise-history record; era labels are editorial groupings used to clarify the franchise's star-cycle pattern.",
    )


def cowboys():
    slug = "cowboys-the-artometrics-of-americas-team"
    eras = ["Landry 1970s", "Aikman 1990s", "Post-1995"]
    super_bowls = [2, 3, 0]
    write_chart(slug, "chart1_titles_by_era", {"data": [bar_h(eras, super_bowls, [ART_BLUE, ART_RED, ART_GREY])], "layout": layout("America's Team stopped winning titles in 1995", "THE BRAND KEPT COMPOUNDING ANYWAY", x_title="Super Bowl wins")})

    teams = ["Chiefs", "Patriots", "Steelers", "49ers", "Eagles", "Cowboys"]
    playoff_wins_since_1996 = [17, 30, 16, 16, 15, 5]
    values = [4.9, 7.4, 5.3, 6.8, 6.6, 10.1]
    write_chart(slug, "chart2_value_vs_playoffs", {"data": [scatter(values, playoff_wins_since_1996, teams, [28, 36, 26, 28, 26, 42], [ART_BLUE, ART_BLUE, ART_BLUE, ART_BLUE, ART_BLUE, ART_RED], hover="%{text}<br>Value: $%{x}B<br>Playoff wins since 1996: %{y}<extra></extra>")], "layout": layout("The Cowboys are the outlier brand", "VALUE AND PLAYOFF OUTPUT DECOUPLED", x_title="Estimated franchise value ($B)", y_title="Playoff wins since 1996")})

    decades = ["1970s", "1980s", "1990s", "2000s", "2010s", "2020s"]
    p_wins = [14, 4, 12, 1, 3, 1]
    write_chart(slug, "chart3_playoff_wins_decade", {"data": [bar_v(decades, p_wins, [ART_RED if v >= 10 else ART_BLUE for v in p_wins])], "layout": layout("The playoff machine shut down", "DALLAS HAS NOT REPLACED ITS OLD OCTOBER ENGINE", x_title="Decade", y_title="Playoff wins")})

    qbs = ["Staubach", "Aikman", "Romo", "Prescott"]
    win_pct = [0.746, 0.570, 0.614, 0.640]
    write_chart(slug, "chart4_qb_eras", {"data": [bar_h(qbs, win_pct, [ART_RED, ART_BLUE, ART_BLUE, ART_BLUE], hover="%{y}<br>Win pct: %{x:.3f}<extra></extra>")], "layout": layout("Quarterback stability was not the problem", "POSTSEASON CONVERSION WAS", x_title="Regular-season win percentage as starter")})

    drought_teams = ["Cowboys", "Dolphins", "Commanders", "Bears", "Jets"]
    drought = [29, 39, 32, 39, 55]
    write_chart(slug, "chart5_conference_drought", {"data": [bar_h(drought_teams, drought, [ART_RED] + [ART_BLUE] * 4)], "layout": layout("The drought is no longer small", "NFC TITLE-GAME ABSENCE HAS BECOME IDENTITY", x_title="Years since last conference championship appearance")})

    sections = [
        {"id": "titles-by-era", "title": "CHART 1 - TITLES BY ERA", "chart": "chart1_titles_by_era", "caption": "Cowboys Super Bowl wins by defining era", "prose": ["The Cowboys' title history is concentrated in two old engines: Landry's 1970s and the Aikman-Smith-Irvin 1990s. Since then, the Super Bowl column is empty.", "The hypothesis is already visible: Dallas did not stop being important when it stopped winning titles. That is precisely the Artometrics problem."]},
        {"id": "value-vs-playoffs", "title": "CHART 2 - BRAND OUTLIER", "chart": "chart2_value_vs_playoffs", "caption": "Estimated franchise value and playoff wins since 1996", "prose": ["The Cowboys are the strangest point in modern football economics: the richest brand with a modest recent playoff archive.", "For a football expert, this is where the conversation gets interesting. The organization is elite at monetizing attention and only average at converting January chances."]},
        {"id": "playoff-machine", "title": "CHART 3 - THE OLD OCTOBER ENGINE", "chart": "chart3_playoff_wins_decade", "caption": "Cowboys playoff wins by decade", "prose": ["The 1970s and 1990s still carry the franchise memory. The decades after do not match the logo's gravity.", "This is not a losing franchise in the ordinary sense. It is a famous franchise whose postseason production no longer fits its public size."]},
        {"id": "qb-eras", "title": "CHART 4 - QUARTERBACK ERA PARADOX", "chart": "chart4_qb_eras", "caption": "Regular-season win percentage by quarterback era", "prose": ["Quarterback competence has not been absent. Romo and Prescott produced enough regular-season winning to keep Dallas nationally relevant.", "The missing variable is conversion: turning stable quarterback play into deep playoff survival."]},
        {"id": "conference-drought", "title": "CHART 5 - THE CONFERENCE WALL", "chart": "chart5_conference_drought", "caption": "Years since selected teams reached a conference championship game", "prose": ["The Cowboys' NFC championship drought now belongs in the same chart as franchises fans instinctively associate with frustration.", "That is the mirror the data holds up: Dallas is not cursed by invisibility. It is cursed by being watched."]},
    ]
    article(
        slug,
        "COWBOYS: The Artometrics of America's Team",
        "The Dallas Cowboys are the NFL's clearest separation between brand value and postseason conversion: a global sports machine with an old championship engine.",
        "atlas, power",
        [("fast-facts", "FAST FACTS"), ("dataset-context", "DATASET CONTEXT")] + [(s["id"], s["title"]) for s in sections] + [("conclusion", "CONCLUSION"), ("references", "REFERENCES"), ("editors-note", "EDITOR'S NOTE")],
        ["The Dallas Cowboys are no longer just a football team. They are a national attention market. Every season begins with disproportionate coverage, disproportionate expectation, and the same question: when does brand gravity become football gravity again?", "This report tests the Cowboys paradox: the most valuable franchise in American sports has not reached a conference championship game since the 1995 season. The data story is not losing. It is non-conversion under maximum visibility."],
        [("5", "Super Bowl championships"), ("1995", "Most recent Super Bowl-winning season"), ("29", "Years since last NFC championship appearance entering 2025"), ("$10B+", "Widely cited estimated franchise value range"), ("3", "Super Bowls from the 1990s Aikman-Smith-Irvin core"), ("0", "Conference championship appearances since the 1995 season")],
        ["The report uses public Pro Football Reference playoff records, Sports Reference franchise summaries, and Forbes-style franchise valuation estimates. Values are rounded because the analysis depends on order of magnitude, not accounting precision.", "A front-office analyst would call this a conversion problem. A Cowboys fan would call it pain. Artometrics treats both as measurable: the gap between attention and January output."],
        sections,
        ["The Cowboys are not a failed sports business. They may be the most successful sports business in America. That is why the football gap is so stark.", "The numbers say America's Team has mastered demand. The unfinished work is turning demand back into postseason supply."],
        ["Pro Football Reference. <em>Dallas Cowboys Franchise Encyclopedia</em>.", "Forbes. <em>NFL Team Valuations</em>, recent estimates.", "Sports Reference playoff and quarterback starter records.", "NFL historical postseason records."],
        "Franchise values are rounded public estimates. Quarterback win percentages are conventional starter-record summaries and should be interpreted as era indicators, not individual value models.",
    )


def write_plan():
    plan = dedent(
        """
        # Artometrics sports canon source plan

        This plan turns the Warriors/Giants model into a repeatable sports-report system:
        every article gets five charts, but each chart must answer a different editorial
        question: history, peer comparison, efficiency, pain/volatility, and identity.

        ## First canon batch

        1. `yankees-the-artometrics-of-baseballs-empire`
           - Theme: empire, expectation, payroll conversion.
           - Sources: Baseball Reference, Lahman, Retrosheet/Baseball Almanac, Forbes.
        2. `lakers-the-artometrics-of-basketball-glamour`
           - Theme: star cycles, glamour, recurring Finals access.
           - Sources: Basketball Reference, NBA history, Sports Reference.
        3. `cowboys-the-artometrics-of-americas-team`
           - Theme: brand value versus postseason conversion.
           - Sources: Pro Football Reference, NFL records, Forbes.

        ## Chart contract

        Each report receives:

        - Chart 1: historical spine (titles, wins, eras, or long-run trend)
        - Chart 2: peer comparison (where this subject sits against the field)
        - Chart 3: identity metric (what makes the subject culturally/statistically itself)
        - Chart 4: contradiction chart (money vs wins, brand vs output, talent vs conversion)
        - Chart 5: pain, gap, or frontier chart (what fans/professionals argue about)

        ## Scale-up order

        - NBA: Lakers, Celtics, Warriors, Knicks, Spurs, Bulls, Heat, Clippers, Kings.
        - MLB: Yankees, Giants, Dodgers, Red Sox, Cubs, A's, Mets, Cardinals, Braves.
        - NFL: Cowboys, Patriots, Chiefs, 49ers, Steelers, Packers, Browns, Lions, Jets.
        - NHL: Canadiens, Maple Leafs, Rangers, Bruins, Red Wings, Penguins, Oilers.
        - Global: Real Madrid, Barcelona, Manchester United, Liverpool, Bayern, PSG.
        - Individual sports: Serena, Federer, Nadal, Djokovic, Tiger, Magnus, Kasparov.

        ## Editorial rule

        A chart is not included because it exists. A chart is included because it changes
        the conversation between an Artometrician and an expert fan.
        """
    ).strip()
    DOCS_DIR.mkdir(exist_ok=True)
    (DOCS_DIR / "sports-canon-source-plan.md").write_text(plan + "\n")


def main():
    write_plan()
    yankees()
    lakers()
    cowboys()
    print("Generated sports canon plan and 3 five-chart reports.")


if __name__ == "__main__":
    main()
