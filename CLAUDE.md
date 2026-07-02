# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static HTML teaching workspace for simplified Mandarin Chinese characters (hanzi). No build step, no framework, no dependencies. The live site is at **https://hanzi.fullstack.cat**.

## Local development

Serve `public_html/` with any static server:

```
python3 -m http.server 8080 --directory public_html
```

## Deploying

```
./deploy.sh
```

Uses `rsync` to push `public_html/` to the Hostinger VPS (`hostinger` SSH alias, remote path `/home/hanzi.fullstack.cat/public_html/`). Requires the `hostinger` host to be configured in `~/.ssh/config`.

The server sends a 7-day `Cache-Control` header on `style.css`. Every page links shared assets with a cache-busting query string (`style.css?v=2`, `quiz.js?v=2`, `nav.js?v=2`) — bump the version number across all pages whenever `style.css`, `quiz.js`, or `nav.js` changes, or returning visitors won't see the update for up to a week.

## Structure

```
public_html/          — everything here gets deployed
  assets/
    style.css         — shared stylesheet
    quiz.js           — shared interactive widgets
  lessons/
    NNNN-slug.html    — numbered lessons, zero-padded to 4 digits
  reference/
    components-glossary.html — cumulative reference table, grows with each lesson
  index.html          — home page / lesson index
  .htaccess           — HTTP→HTTPS redirect, www→non-www, SPA fallback to index.html
deploy.sh             — deployment script (not deployed, stays in repo root)
```

## Adding a new lesson

1. Copy an existing lesson HTML as a template into `public_html/lessons/`; name it `NNNN-slug.html` (next number in sequence).
2. Update the `<title>` kicker, `<h1>`, and body content.
3. Add nav links at the bottom: previous lesson ← and → next lesson, plus the glossary link, plus `<a href="../index.html">← Home</a>`.
4. Update `public_html/reference/components-glossary.html`: add new rows to all three tables (components, compound characters, words/numbers) with a `<a href="../lessons/NNNN-slug.html">Lesson N</a>` in the "First taught" column.
5. Add the lesson to the list in `public_html/index.html`.

## HTML conventions

**Char cards** — display a component with its variant form, pinyin, meaning, stroke count:
```html
<div class="char-card">
  <div class="glyph">人</div>
  <div class="variant">亻 (left side)</div>  <!-- use &nbsp; if no variant -->
  <div class="pinyin">rén</div>
  <div class="meaning">person</div>
  <div class="strokes">2 strokes</div>
</div>
```

**Flashcards** — click to reveal; handled automatically by `quiz.js`:
```html
<div class="flashcard">
  <div class="front">人 / 亻</div>
  <div class="back">rén — person</div>
</div>
```

**Multiple-choice quiz** — `data-answer` is 1-indexed (first button = 1):
```html
<div class="quiz-mc" data-answer="2">
  <p class="quiz-question">Question text?</p>
  <div class="quiz-options">
    <button>Wrong</button>
    <button>Correct</button>
    <button>Wrong</button>
    <button>Wrong</button>
  </div>
  <p class="quiz-feedback"></p>
</div>
```

**Component breakdown diagram**:
```html
<div class="breakdown">
  <span class="piece">亻</span><span class="op">+</span><span class="piece">木</span><span class="eq">=</span><span class="result">休</span>
</div>
```

**Other semantic elements**: `.callout` (highlighted note; add `.tip` for green accent), `.sidenote` (smaller muted text), `.ask-teacher` (italic closing prompt), `ol.stroke-steps` with `.stroke-glyph` spans.

## CSS design system

Tufte-influenced. Core CSS custom properties (in `:root`):

| Variable | Purpose |
|---|---|
| `--paper` / `--ink` | Background / text |
| `--accent` / `--accent-soft` | Red accent (links, card highlights) |
| `--good` / `--good-soft` | Green (correct quiz answers) |
| `--bad` / `--bad-soft` | Red (wrong quiz answers) |
| `--rule` | Border/divider color |

Chinese glyphs use `font-family: 'Noto Serif SC', 'Songti SC', serif`. Apply via `.glyph-cell` in tables or the `.hanzi` / `.han` utility classes in inline text.

Print styles hide interactive elements (`.quiz-mc`, `.flashcard`, `nav.lesson-nav`, `.ask-teacher`).
