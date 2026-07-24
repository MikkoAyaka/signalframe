# System contract

Use this reference for every Signalframe task. It specifies the decisions that make the system coherent; adapt implementation details to the target application's stack.

## Tokens and surfaces

```css
:root {
  --sf-canvas: #09090b;
  --sf-surface: rgba(23, 23, 23, 0.58);
  --sf-surface-strong: rgba(23, 23, 23, 0.82);
  --sf-line: rgba(255, 255, 255, 0.08);
  --sf-line-signal: rgba(239, 68, 68, 0.3);
  --sf-text: #fafafa;
  --sf-text-muted: #a3a3a3;
  --sf-text-quiet: #525252;
  --sf-signal: #ef4444;
  --sf-signal-soft: rgba(239, 68, 68, 0.16);
  --sf-radius-panel: 1rem;
  --sf-radius-control: 0.75rem;
  --sf-shadow-panel: 0 22px 64px -24px rgba(0, 0, 0, 0.9);
  --sf-shadow-signal: 0 0 36px -12px rgba(239, 68, 68, 0.32);
}
```

- Start with the canvas, a single raised surface plane, and content within that plane.
- Use `--sf-line` for boundaries. Add `--sf-line-signal` only for an active decision, live state, or primary action.
- Use the red signal to convey meaning. Success and warning need a label or icon as well as color.
- Prefer a tonal shift or border before a shadow. Avoid permanently glowing metrics, panels, and controls.

## Type and spacing

- Use `Manrope`, `Noto Sans SC`, and a non-serif system fallback for interface text.
- Use `JetBrains Mono`, `Noto Sans SC`, and a non-serif monospace fallback for labels, timestamps, shortcuts, raw values, and code.
- Keep user-facing text at 12px or above. Use 12px only for stable metadata; use 14px for compact UI and 16px or above for reading text.
- Reserve display type for page-level identity. Let the grid, line height, contrast, and spacing establish hierarchy before adding a typeface.
- Build spacing from a 4px rhythm. The common anchors are 4px, 12px, 24px, and 48px.

## Layout and information

- Give every page one obvious identity or data anchor.
- Make the current decision, comparison, risk, or action live on the active plane; keep provenance and configuration nearby but quiet.
- Use uneven grid spans when information density calls for them. Do not impose symmetric cards to decorate empty space.
- Group adjacent controls in a compact toolbar. Keep global actions outside the local toolbar.
- On narrow screens, stack or wrap controls below content rather than compressing the primary identity into an unreadable row.

## Motion

- Use 120-180ms for color, border, and icon feedback; 220-320ms for surface emphasis or disclosure; 360-500ms for route, card-stack, and large spatial transitions.
- Use one spatial cue at a time. Do not combine scale, blur, large translation, and opacity on the same content layer.
- For reordering, stacks, and carousels, render each destination with final background, depth, and content before it moves. Measure resting positions; never animate toward a guessed offset.
- A loop is reserved for an active process requiring ongoing attention. Repeatedly scanned content should not repeatedly enter from below.

## Validation

- Give icon-only controls accessible labels and visible keyboard focus.
- Preserve state meaning outside color through labels, text, icons, or position.
- Verify contrast, no horizontal page overflow, and a coherent layout at desktop and narrow mobile widths.
