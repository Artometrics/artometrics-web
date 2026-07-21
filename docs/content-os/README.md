# Artometrics Content OS

Editorial production system for Artometrics: **topic → research → analysis → package → publish → distribute**.

This folder is the control plane. The Expo app remains the reader surface.

## Pipeline (target)

| Stage | Input | Output |
|-------|--------|--------|
| 1. Brief | Topic + desk | Keyword brief (`briefs/*.json`) |
| 2. Style | Brief + [STYLE_GUIDE](./STYLE_GUIDE.md) | Banner prompt, section plan, tone |
| 3. Analyze | Dataset / CSV / notes | Charts + findings (existing engine / Quarto) |
| 4. Write | Findings + brief | HTML report draft (`drafts/<slug>/`) |
| 5. Banner | Style + keywords | Hero image (Higgsfield) |
| 6. Publish | Draft | `src/content/blog/<slug>.md` + `npm run content` |
| 7. AEO | Published corpus | `public/llms.txt`, meta, internal links |
| 8. Extend *(later)* | Article | Narration, shorts, social posts, magazine PDF |

## Commands

```bash
# New keyword brief
npm run cos:brief -- --slug my-topic --desk culture --title "My Topic"

# Scaffold draft article HTML from a brief
npm run cos:scaffold -- --brief docs/content-os/briefs/my-topic.json

# Print Higgsfield banner prompt for a brief
npm run cos:banner-prompt -- --brief docs/content-os/briefs/my-topic.json

# Publish a draft into the live content tree (draft:true by default)
npm run cos:publish -- --slug my-topic

# Rebuild AEO llms.txt from published posts
npm run cos:llms
```

## Phase 0 (this PR)

- Style guide encoding Artometrics HTML, color, pacing, citation rules
- Keyword brief schema + template + pilot brief
- Scaffold / publish / banner-prompt / llms.txt scripts
- Crawlable article HTML on Expo web (AEO)

## Later phases

- Keyword research connectors (SEO APIs)
- Full data→chart→prose agent loop (wraps `artometrics_engine.py`)
- Supabase media library for banners / audio / exports
- ElevenLabs narration + Buffer social push
- Magazine PDF / short-form packagers
