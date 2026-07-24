# Signalframe

[![Build and deploy](https://github.com/MikkoAyaka/signalframe/actions/workflows/pages.yml/badge.svg)](https://github.com/MikkoAyaka/signalframe/actions/workflows/pages.yml)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-ea580c?logo=githubpages&logoColor=white)](https://mikkoayaka.github.io/signalframe/)
[![Last commit](https://img.shields.io/github/last-commit/MikkoAyaka/signalframe?label=last%20commit)](https://github.com/MikkoAyaka/signalframe/commits/main)
[![Stars](https://img.shields.io/github/stars/MikkoAyaka/signalframe?style=flat&label=stars)](https://github.com/MikkoAyaka/signalframe/stargazers)
[![Forks](https://img.shields.io/github/forks/MikkoAyaka/signalframe?style=flat&label=forks)](https://github.com/MikkoAyaka/signalframe/forks)
[![Open issues](https://img.shields.io/github/issues/MikkoAyaka/signalframe?label=issues)](https://github.com/MikkoAyaka/signalframe/issues)

Signalframe is MikkoAyaka's portable dark interface system for high-signal products.

Signalframe is a self-contained Vite + React project. Its source-owned primitives live at `src/design-system/`.

## Run locally

```bash
npm install
npm run dev
```

The documentation site starts at `http://127.0.0.1:4174`.

## Build and publish

```bash
npm run build
```

Deploy the resulting `dist/` directory to any static host. The included GitHub Actions workflow automatically publishes `main` to GitHub Pages at `https://mikkoayaka.github.io/signalframe/`. No server runtime is required.

Pull requests run the same production build without deploying, so broken documentation builds are caught before they reach Pages.

## Documentation capabilities

- English and Simplified Chinese UI, with a persisted language choice.
- Shiki-highlighted TSX, CSS, and JSON code samples.
- Foundations for color, type, spatial depth, motion, accessibility, and product decisions.
- Source-owned React primitives and composition patterns.

## Reuse in another React + Tailwind project

1. Copy `src/design-system/` into the target project.
2. Import `tokens.css` after Tailwind in the target global stylesheet.
3. Copy only the primitives required by the product: `SignalPanel`, `SignalChip`, `SignalIconButton`, and `SignalSectionHeading`.
4. Use the composition rules in the documentation site rather than copying a finished screen wholesale.

The primitives intentionally depend only on React and Tailwind utility classes. They do not require a runtime design-system provider or an external component library.
