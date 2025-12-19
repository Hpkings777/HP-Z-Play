## 2025-05-18 - Switch Accessibility Pattern
**Learning:** Custom toggle switches built with `<button>` elements must explicitly define `role="switch"` and `aria-checked` state to be properly announced by screen readers. A simple `onClick` handler is insufficient for non-visual users to understand the component's function and state.
**Action:** Always wrap custom toggles in a `<button>` (not a `<div>`) and ensure `role="switch"`, `aria-checked`, and a descriptive `aria-label` are present.
