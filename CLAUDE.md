# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Velira** — a hormone intelligence brand for women. No build step, no framework, no dependencies. Pure HTML, CSS, and vanilla JS.

## Files

- `index.html` — single page, all content
- `css/styles.css` — all styles, mobile-first with breakpoints at 768px and 1024px
- `js/main.js` — newsletter form handler, scroll animations, hamburger nav toggle

## Deploying

Changes go live via GitHub Pages at `https://glitterunicornsparkles.github.io/glitteruniclesparkles.github.io/`

Workflow: edit files → `git add` + `git commit` → user pushes via GitHub Desktop.

## CSS Architecture

Mobile-first. Base styles target mobile (375px). Two breakpoints:
- `@media (min-width: 768px)` — tablet: nav links visible, 3-column pillars grid, side-by-side newsletter form
- `@media (min-width: 1024px)` — desktop: larger section padding

Design tokens in `:root` — always use CSS variables (`--forest`, `--pink`, `--mint`, `--cream`, etc.) never raw colour values.

Fonts: `Cormorant Garamond` (display/headings, variable `--font-display`) and `DM Sans` (body, `--font-body`) loaded from Google Fonts.

## Brand

- Name: **Velira**
- Instagram: [@Velira_Me](https://www.instagram.com/Velira_Me)
- Tone: editorial, premium, science-backed — not wellness-fluffy
