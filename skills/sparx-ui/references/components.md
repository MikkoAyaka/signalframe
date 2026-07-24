# Components

Read this reference only when choosing or implementing primitives. Import from `@mikkoayaka/sparx-ui` and bring only the components the target interface needs.

```tsx
import {
  SparxChip,
  SparxDataRow,
  SparxEmptyState,
  SparxIconButton,
  SparxMetric,
  SparxPanel,
  SparxProgress,
  SparxSectionHeading,
  SparxToolbar,
  sparxMotion,
} from "@mikkoayaka/sparx-ui";
```

| Primitive | Use it for | Avoid it when |
| --- | --- | --- |
| `SparxPanel` | One meaningful surface or a bounded work area. | Adding a decorative inner card with no new hierarchy. |
| `SparxChip` | Compact status, category, and stable metadata. | A primary action or long prose. |
| `SparxIconButton` | A compact, familiar action inside a toolbar. Always provide `aria-label`. | A primary action that needs a text label. |
| `SparxDataRow` | A scannable identity, context, metadata, and trailing state row. | Multi-paragraph details or a full settings form. |
| `SparxEmptyState` | A quiet explanation of absence plus one next action. | Blocking an otherwise usable view. |
| `SparxMetric` | One decision-driving number with an optional change or detail. | A decorative dashboard number without context. |
| `SparxProgress` | A labelled finite progress or completion state. | Indeterminate background activity; use an appropriate status instead. |
| `SparxSectionHeading` | A section title, explanatory context, and optional local action. | A compact field label. |
| `SparxToolbar` | Related local controls acting on the same surface. | Global navigation or unrelated page actions. |
| `sparxMotion` | Shared timing and easing values for a motion library. | A substitute for defining source, destination, or resting layout. |

## Composition example

```tsx
<SparxPanel tone="quiet" className="p-6">
  <SparxSectionHeading
    eyebrow="Pipeline"
    title="Qualified revenue"
    description="Review the opportunities that need a decision this week."
  />
  <div className="mt-6 flex items-start justify-between gap-4">
    <SparxMetric label="Forecast" value="$482k" delta="+8.4%" tone="success" />
    <SparxToolbar label="Pipeline controls">
      <SparxIconButton aria-label="Filter opportunities">...</SparxIconButton>
    </SparxToolbar>
  </div>
</SparxPanel>
```

Start with the section heading, panel, or toolbar that describes the actual hierarchy. Add chips, rows, metrics, and progress only when each carries a distinct decision or state.
