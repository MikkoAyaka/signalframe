# Components

Read this reference only when choosing or implementing primitives. Import from `@mikkoayaka/signalframe` and bring only the components the target interface needs.

```tsx
import {
  SignalChip,
  SignalDataRow,
  SignalEmptyState,
  SignalIconButton,
  SignalMetric,
  SignalPanel,
  SignalProgress,
  SignalSectionHeading,
  SignalToolbar,
  signalMotion,
} from "@mikkoayaka/signalframe";
```

| Primitive | Use it for | Avoid it when |
| --- | --- | --- |
| `SignalPanel` | One meaningful surface or a bounded work area. | Adding a decorative inner card with no new hierarchy. |
| `SignalChip` | Compact status, category, and stable metadata. | A primary action or long prose. |
| `SignalIconButton` | A compact, familiar action inside a toolbar. Always provide `aria-label`. | A primary action that needs a text label. |
| `SignalDataRow` | A scannable identity, context, metadata, and trailing state row. | Multi-paragraph details or a full settings form. |
| `SignalEmptyState` | A quiet explanation of absence plus one next action. | Blocking an otherwise usable view. |
| `SignalMetric` | One decision-driving number with an optional change or detail. | A decorative dashboard number without context. |
| `SignalProgress` | A labelled finite progress or completion state. | Indeterminate background activity; use an appropriate status instead. |
| `SignalSectionHeading` | A section title, explanatory context, and optional local action. | A compact field label. |
| `SignalToolbar` | Related local controls acting on the same surface. | Global navigation or unrelated page actions. |
| `signalMotion` | Shared timing and easing values for a motion library. | A substitute for defining source, destination, or resting layout. |

## Composition example

```tsx
<SignalPanel tone="quiet" className="p-6">
  <SignalSectionHeading
    eyebrow="Pipeline"
    title="Qualified revenue"
    description="Review the opportunities that need a decision this week."
  />
  <div className="mt-6 flex items-start justify-between gap-4">
    <SignalMetric label="Forecast" value="$482k" delta="+8.4%" tone="success" />
    <SignalToolbar label="Pipeline controls">
      <SignalIconButton aria-label="Filter opportunities">...</SignalIconButton>
    </SignalToolbar>
  </div>
</SignalPanel>
```

Start with the section heading, panel, or toolbar that describes the actual hierarchy. Add chips, rows, metrics, and progress only when each carries a distinct decision or state.
