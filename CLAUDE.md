# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Velira** — a hormone intelligence brand for women. No build step, no framework, no dependencies. Pure HTML, CSS, and vanilla JS.

## Files

- `index.html` — homepage (hero, pillars, resources, newsletter, footer)
- `about.html` — About Us page
- `notes.html` — Notes/legal page
- `css/styles.css` — all styles, mobile-first with breakpoints at 768px and 1024px
- `js/main.js` — newsletter form handler, scroll animations, hamburger nav toggle
- `js/translations.js` — 6 languages (EN, ES, DE, HI, AR, FR), ~35 keys each

## Deploying

Changes go live via GitHub Pages at `https://glitterunicornsparkles.github.io/glitteruniclesparkles.github.io/`

Workflow: edit files → `git add` + `git commit` → user pushes via GitHub Desktop.

---

## Feature Flags

Two toggles live at the **very top of `js/main.js`** in the `SITE_CONFIG` object. Edit only those two `true`/`false` values — no other files need touching.

| Flag | `false` (default) | `true` |
|------|-------------------|--------|
| `MULTILANG` | English-only — language selector hidden | All 6 languages, selector visible |
| `APP_SECTION` | App zone hidden; hero CTA → `/quiz`; newsletter zone pink; label reads "Join Velira! Get one hormone insight every Thursday! Join 20,000+ women" | App zone visible; hero CTA → `#newsletter`; newsletter zone grey; label reads "Or get one hormone insight every Thursday! Join 20,000+ women" |

**Current defaults:** Both `false` — English only, no app section.

### Implementation rule — `applyFlags` must always run last

`applyFlags()` is a **named function**, not an IIFE. It must be called **after every `setLanguage()` call**, because `setLanguage()` loops over all `[data-i18n]` elements and resets their `textContent` — which overwrites any custom text `applyFlags` has set. The call sites in `main.js` are:
1. After `setLanguage(saved)` in the "load saved language" IIFE at page start
2. After `setLanguage(btn.dataset.lang)` in the language selector click handler

**Never** convert `applyFlags` back to an IIFE or move it above `setLanguage`. The order must be: `setLanguage()` → `applyFlags()`.

---

## Testing Checklist

Run these checks before every commit that touches `js/main.js`, `css/styles.css`, or `index.html`.

### Feature flag acceptance tests

Always test **both** localStorage states:

| Step | How |
|------|-----|
| **Fresh state** | Open in a private/incognito window (no localStorage) |
| **Returning user** | In console: `localStorage.setItem('velira-lang','en')`, then reload |

For each state, verify:

**`APP_SECTION: false` (default)**
- [ ] App zone (pink "Get the App" bar) is **not visible**
- [ ] Hero CTA button links to `/quiz` (inspect `href`)
- [ ] Newsletter zone background is **pink** (not grey)
- [ ] Newsletter headline reads exactly: **"Join Velira! Get one hormone insight every Thursday! Join 20,000+ women"**

**`APP_SECTION: true`**
- [ ] App zone is **visible**
- [ ] Hero CTA links to `#newsletter`
- [ ] Newsletter zone background is **grey**
- [ ] Newsletter headline reads: **"Or get one hormone insight every Thursday! Join 20,000+ women"**

**`MULTILANG: false` (default)**
- [ ] Language selector (globe icon) is **not visible**

**`MULTILANG: true`**
- [ ] Language selector is **visible**
- [ ] Switching to any language and back: newsletter headline is still correct per `APP_SECTION` flag

### Desktop layout (768px+)
- [ ] "EMAIL" label and "WHATSAPP" label start at the same top position
- [ ] "Subscribe" and "Join on WhatsApp" buttons sit at the same bottom position
- [ ] "No spam. No supplements to sell. Unsubscribe anytime." is on **one line** (no line break)

### Post-mortem: why the label text failed on first attempt

`applyFlags` was written as an IIFE and placed at the top of `main.js`. It ran first and correctly set the label text. But further down the file, the "load saved language" block called `setLanguage('en')` (triggered by any previously saved language in localStorage). `setLanguage()` resets **all** `[data-i18n]` elements to their translation values — overwriting the custom label text `applyFlags` had set. The IIFE had already finished and could not re-run. The flag appeared to "do nothing" because the reset happened silently after it.

**Lesson:** Any DOM override that targets a `[data-i18n]` element must run **after** all `setLanguage()` calls — never before.

---

## Brand Rules (non-negotiable)

- Name: **Velira**
- Brand statement: **Hormone Intelligence** — ALWAYS translated into the local language as two separate words. NEVER merged into one compound word.
  - English: **Hormone Intelligence**
  - German: **Hormon Intelligenz** (NOT "Hormonintelligenz")
  - Spanish: **Inteligencia Hormonal** (two words ✓)
  - French: **Intelligence Hormonale** (two words ✓)
  - Hindi: **हार्मोन इंटेलिजेंस** (two words ✓)
  - Arabic: **الذكاء الهرموني** (two words ✓)
  - Rule: Translate the concept naturally in each language, but never allow the two words to be merged or compounded.
- Instagram: [@Velira_Me](https://www.instagram.com/Velira_Me)
- Tone: editorial, premium, science-backed — not wellness-fluffy

---

## Design & Style Guide

These rules are **religious**. Every element across every page must match exactly. No exceptions, no approximations.

---

### Colours

ALWAYS use CSS variables. NEVER use raw hex values anywhere in CSS.

| Token | Hex | Usage |
|-------|-----|-------|
| `--forest-deep` | `#0f2318` | Primary dark background, dark buttons, dark text on light |
| `--forest-mid` | `#2a5240` | Borders, dividers, section separators |
| `--forest` | `#1a3a2a` | Hover state on dark backgrounds |
| `--pink` | `#e8a0b4` | Primary accent: App zone background, pink button bg, CTA text on dark |
| `--pink-deep` | `#c4607e` | Hover state on pink elements |
| `--mint` | `#a8d5c2` | Text on dark backgrounds, dark button label colour |
| `--mint-dark` | `#7ab5a0` | Body copy on dark backgrounds |
| `--cream` | `#f8f4f0` | Headings on dark backgrounds |
| `--grey` | `#e5e3e1` | Light section backgrounds (newsletter grey zone) |
| `--muted` | `#6a9a88` | De-emphasised labels (stat sublabels) |

---

### Typography

Fonts loaded from Google Fonts: `Cormorant Garamond` (`--font-display`) and `DM Sans` (`--font-body`).

| Element | Font | Size | Weight | Style | Colour |
|---------|------|------|--------|-------|--------|
| Hero h1 | Cormorant Garamond | `clamp(3.2rem, 11vw, 5.5rem)` | 300 | normal, `<em>` italic | `--cream` |
| Eyebrow (hero label above h1) | Cormorant Garamond | 0.9rem | 400 | **uppercase**, letter-spacing 0.15em | `--mint` |
| Hero sub-paragraph | DM Sans | 0.95rem | 300 | normal | `--mint-dark` |
| Section label (e.g. "WHAT WE COVER") | DM Sans | 0.6rem | 500 | uppercase, letter-spacing 0.2em | `--pink` or `--mint` |
| Section title (e.g. "The three pillars…") | Cormorant Garamond | `clamp(1.6rem, 4vw, 2.2rem)` | 300 | normal | `--cream` |
| Pillar h3 ("Mind", "Body", "Heart") | Cormorant Garamond | 1.6rem | 400 | normal | `--cream` |
| Pillar body text | DM Sans | 0.88rem | 300 | normal | `--mint-dark` |
| Page title — Notes/About (e.g. "NOTES") | DM Sans | 1.1rem | 500 | uppercase, letter-spacing 0.2em | `--pink` |
| Block sub-headings — Notes/About | Cormorant Garamond | 1.3rem | 300 | **italic** | `--cream` |
| Body text — Notes/About | DM Sans | 0.88rem | 300 | normal, line-height 1.75 | `--mint-dark` |
| Zone label (newsletter "Get Personalised…") | Cormorant Garamond | 1.4rem | 700 | normal | `--forest-deep` |
| Form label ("EMAIL", "WHATSAPP") | DM Sans | 0.6rem | 500 | uppercase, letter-spacing 0.15em | `--forest-deep` at 0.4 opacity |
| Nav links | DM Sans | 0.75–0.8rem | 400 | uppercase, letter-spacing 0.1em | `--mint` |
| Stat numbers | Cormorant Garamond | 2rem+ | 300 | normal | `--cream` |
| Stat labels | DM Sans | 0.6rem | 500 | uppercase, letter-spacing 0.08em | `--muted` |
| Footer tagline | DM Sans | 0.88rem | 300 | normal | `--mint-dark` |

---

### Buttons — ALL buttons site-wide, religious compliance required

Every button on the site must match this spec. Check all 4 button types every time you change any button.

**Shared rules (apply to ALL buttons):**
- `border-radius: 50px` — pill shape. NO square corners anywhere, ever.
- `min-height: 50px`
- `display: flex; align-items: center; justify-content: center;` — text must be perfectly centred
- `width: 100%` on mobile; `width: auto` or `width: 100%` on desktop depending on context
- Font: DM Sans, 0.75rem, weight 500, uppercase, `letter-spacing: 0.12em`
- `text-decoration: underline` with `text-decoration-color` matching the button text colour
- `text-underline-offset: 3px`
- `transition: background 0.2s`

**Pink button** (`.btn-primary`, `.res-btn`) — used on dark backgrounds:
- `background: var(--pink)` | `color: var(--forest-deep)`
- `text-decoration-color: var(--forest-deep)`
- Hover: `background: var(--pink-deep)`

**Dark button** (`.nl-app-btn`, `.nl-zone-submit`) — used on light/pink backgrounds:
- `background: var(--forest-deep)` | `color: var(--mint)`
- `text-decoration-color: var(--mint)`
- Hover: `background: var(--forest)`

---

### Inputs / Form fields

- `border-radius: 50px` — pill, matches buttons
- `background: rgba(15,35,24,0.06)` | `border: 0.5px solid rgba(15,35,24,0.2)`
- Font: DM Sans 0.88rem | `color: var(--forest-deep)`
- Placeholder: `color: rgba(15,35,24,0.35)`
- Full border on all sides — no bottom-border-only

---

### Newsletter Section

**Mobile (stacked, 375px):**
1. Pink zone (`.nl-app-zone`) — "Get Personalised Hormone Intelligence in your life" (zone label) + sub-text + dark pill CTA "Get the App"
2. Grey zone (`.nl-news-zone`) — full-width header with "Or get one hormone insight every Thursday! Join 20,000+ women", then Email form, then WhatsApp form (stacked), then "No spam. No supplements to sell. / Unsubscribe anytime." centred

**Desktop (768px+):**
1. Full-width pink bar — zone label left, "Get the App" pill CTA right (2-col grid)
2. Full-width grey header row — zone label spanning both columns
3. Two-col grey — Email (left col) | WhatsApp (right col), separated by `0.5px solid rgba(15,35,24,0.1)`
4. "No spam." note centred below both cols

---

### Notes / About pages

- Page title: DM Sans 1.1rem uppercase `--pink` (all caps, small, letter-spaced)
- Block sub-headings: Cormorant Garamond 1.3rem italic weight 300 `--cream`
- Body paragraphs: DM Sans 0.88rem `--mint-dark`, line-height 1.75, weight 300
- **Separator lines between blocks:** `border-top: 0.5px solid var(--forest-mid)` on `.notes-block + .notes-block`

---

### Section Separators

All section and block separators use: `0.5px solid var(--forest-mid)` (`#2a5240`).
Never use raw hex. Never use 1px — always 0.5px for the hairline aesthetic.

---

### Spacing

- Mobile section padding: `2.5–3rem 1.25rem`
- Tablet+ padding: `4–5rem 4rem`
- Notes/About inner padding: `3rem 1.25rem` mobile, `5rem 4rem` tablet+

---

## CSS Architecture

Mobile-first. Base styles target 375px. Two breakpoints:
- `@media (min-width: 768px)` — tablet: nav links visible, 3-col pillars, side-by-side newsletter, notes max-width
- `@media (min-width: 1024px)` — desktop: larger section padding

Design tokens in `:root`. NEVER use raw values.

---

## Translations

6 languages: EN, ES, DE, HI, AR, FR. Keys in `js/translations.js`.

**Hard rules:**
1. "Hormone Intelligence" must be **translated** in every language, but **always as two separate words** — never compounded. See the Brand Rules section for the correct form in each language.
2. Translations must sound natural in each language — not word-for-word literal. If a phrase doesn't work naturally, rephrase it to carry the same meaning naturally in that language.
3. Never re-translate or regenerate existing keys unless specifically asked. Only edit the key being changed.

---

## Token Efficiency Rules

1. **Never rewrite `js/translations.js` in full.** Only use `Edit` to change specific keys.
2. **Use `Edit` for all existing files** — only use `Write` for brand new files.
3. **Read only the section you need** — use `offset` + `limit` on large files.
4. **No sub-agents for exploration** when file paths are already known.
5. **Consistency checks are mandatory.** If a button style changes, ALL buttons change. If a font changes, ALL matching elements change. Never apply a style to one component without checking every other matching component.
6. **Alert the user** if a task requires reading or rewriting large files (>200 lines) — say "⚠️ This will use significant tokens — confirm?" before proceeding.
