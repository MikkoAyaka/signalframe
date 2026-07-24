# Sparx UI

[![Build and deploy](https://github.com/MikkoAyaka/sparx-ui/actions/workflows/pages.yml/badge.svg)](https://github.com/MikkoAyaka/sparx-ui/actions/workflows/pages.yml)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-ea580c?logo=githubpages&logoColor=white)](https://mikkoayaka.github.io/sparx-ui/)
[![Last commit](https://img.shields.io/github/last-commit/MikkoAyaka/sparx-ui?label=last%20commit)](https://github.com/MikkoAyaka/sparx-ui/commits/main)
[![Stars](https://img.shields.io/github/stars/MikkoAyaka/sparx-ui?style=flat&label=stars)](https://github.com/MikkoAyaka/sparx-ui/stargazers)
[![Forks](https://img.shields.io/github/forks/MikkoAyaka/sparx-ui?style=flat&label=forks)](https://github.com/MikkoAyaka/sparx-ui/forks)
[![Open issues](https://img.shields.io/github/issues/MikkoAyaka/sparx-ui?label=issues)](https://github.com/MikkoAyaka/sparx-ui/issues)

Sparx UI is MikkoAyaka's portable dark interface system for high-signal products.

Sparx UI is a self-contained Vite + React project. Its source-owned primitives live at `src/sparx-ui/`.

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

Deploy the resulting `dist/` directory to any static host. The included GitHub Actions workflow automatically publishes `main` to GitHub Pages at `https://mikkoayaka.github.io/sparx-ui/`. No server runtime is required.

Pull requests run the same production build without deploying, so broken documentation builds are caught before they reach Pages.

## Documentation capabilities

- English and Simplified Chinese UI, with a persisted language choice.
- Shiki-highlighted TSX, CSS, and JSON code samples.
- Foundations for color, type, spatial depth, motion, accessibility, and product decisions.
- Source-owned React primitives and composition patterns.

## Adopt Sparx UI

Sparx UI supports two complementary adoption paths. The documentation site explains both in English and Simplified Chinese.

### 1. React component package

Install the public package in a React + Tailwind project:

```bash
npm install @mikkoayaka/sparx-ui
```

In a typical `src/index.css`, import Tailwind first, point Tailwind v4 at the distributed component classes, and then load the tokens:

```css
@import "tailwindcss";
@source "../node_modules/@mikkoayaka/sparx-ui/lib";
@import "@mikkoayaka/sparx-ui/tokens.css";
```

Import only the primitives a product needs:

```tsx
import { SparxPanel, SparxToolbar } from "@mikkoayaka/sparx-ui";
```

The package exports ESM React primitives, TypeScript declarations, and `tokens.css`. It expects React as a peer dependency. Add `motion/react` only when a product actually renders motion; `sparxMotion` remains framework-neutral transition configuration.

### 2. Agent skill

The repository includes [`skills/sparx-ui/SKILL.md`](skills/sparx-ui/SKILL.md), an agent skill for applying Sparx UI decisions during interface work. It directs an agent to inspect an existing interface, select only the needed primitives, preserve product identity unless a full restyle is requested, and validate hierarchy, responsive behavior, keyboard semantics, and motion.

Copy `skills/sparx-ui/` to the directory your agent discovers, then start a new session:

```bash
# Codex
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R ./skills/sparx-ui "${CODEX_HOME:-$HOME/.codex}/skills/"

# Claude Code
mkdir -p .claude/skills
cp -R ./skills/sparx-ui .claude/skills/
```

Then provide a concrete implementation objective, for example:

```text
Use $sparx-ui to refine the billing workspace. Preserve the existing product identity,
make the primary decision obvious, and verify desktop, mobile, keyboard, and state behavior.
```
