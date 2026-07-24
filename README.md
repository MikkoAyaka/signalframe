# Signalframe

Signalframe is MikkoAyaka's portable dark interface system for high-signal products. It captures the shared visual and interaction grammar of Resume Portfolio and SparX AoE4 GameBox.

The directory is a self-contained Vite + React project. Its source-owned primitives live at `src/design-system/`; it can be moved into a separate repository and deployed without the parent resume project.

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
4. Use the composition rules in the documentation site rather than reproducing the resume page structure.

The primitives intentionally depend only on React and Tailwind utility classes. They do not require a runtime design-system provider or an external component library.
