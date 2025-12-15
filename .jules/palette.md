## 2024-05-24 - Interactive Card Accessibility
**Learning:** `div` elements with `onClick` handlers are invisible to keyboard users and screen readers unless explicitly given `role="button"` (or "link"), `tabIndex={0}`, and proper keyboard event handlers (Enter/Space).
**Action:** When using non-interactive elements as clickable cards, ensure they have `role="button"`, `tabIndex={0}`, and handle `onKeyDown`. Ideally, wrap in a semantic `<Link>` or `<button>`.

## 2024-05-24 - Nested Interactive Elements
**Learning:** Placing buttons inside a clickable card creates a "nested interactive" problem. Keyboard navigation becomes tricky as the user might not be able to tab to inner buttons easily if the container captures events or if the structure is confusing.
**Action:** Use `stopPropagation` on inner buttons, and ensure they are reachable in the tab order. Ensure the container's action doesn't override the inner button's action for keyboard users (e.g. Enter on the container shouldn't trigger if an inner button is focused).
