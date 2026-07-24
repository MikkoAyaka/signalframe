---
name: sparx-ui
description: Apply Sparx UI's dark interface system to React product interfaces. Use when implementing or refining information-dense views, selecting Sparx UI primitives, translating Sparx UI layouts and motion into an existing product, or reviewing a React interface for hierarchy, responsive behavior, and interaction quality.
---

# Sparx UI

Use the system to make high-signal work easier to scan and act on. Preserve the target product's own identity unless the request explicitly calls for a full Sparx UI restyle.

## Workflow

1. Inspect the target application's framework, styling stack, existing visual language, page hierarchy, interactive states, and narrow-screen behavior.
2. Read [references/system.md](references/system.md) before choosing styles or changing layout. Treat its constraints as the system contract.
3. Read [references/components.md](references/components.md) when selecting or implementing primitives.
4. Establish the primary decision or identity anchor before adding decoration. Start from tokens and one or two primitives; do not transplant a complete screen.
5. Implement with the target project's established conventions. Keep the source and destination visible when changing spatial state, then settle to one stable resting geometry.
6. Validate desktop and narrow widths, keyboard focus and labels, semantic state beyond color, readable contrast, and the absence of horizontal overflow.

## Non-negotiable constraints

- Use a quiet dark canvas and a single red signal for meaningful state or action; do not turn every surface into a signal.
- Establish hierarchy before decoration. Do not nest translucent cards unless the nesting represents a real change in hierarchy.
- Use hairline borders and restrained depth for primary surfaces. Prefer tonal separation before adding a shadow.
- Keep all user-facing text at 12px or larger. Use non-serif fallbacks for CJK and metadata; never introduce a serif fallback.
- Give direct manipulation and motion a source, destination, and stable rest state. Animate between measured resting positions, never guessed offsets.
- Keep repeated reading surfaces stable. Do not add entrance animation to information users repeatedly scan.

## Delivery

State which hierarchy, primitive, and motion choices were made. Call out any deliberate deviation from the system contract and why it serves the target product. Do not claim that an unverified visual behavior was tested.
