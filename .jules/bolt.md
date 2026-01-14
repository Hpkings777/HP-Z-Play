## 2025-05-18 - Zustand Global Subscription Bottleneck
**Learning:** Subscribing to the entire Zustand store (`const { x } = useStore()`) in a list item component (`GameCard`) caused O(N) re-renders (110 renders instead of 1) whenever *any* global state changed (e.g., stats, XP), drastically impacting performance on the Home screen.
**Action:** Always use granular selectors (e.g., `state => state.favorites.includes(id)`) for list components and wrap them in `React.memo` to ensure stable props and selectors prevent unnecessary updates.

## 2025-05-18 - TypeScript Type Mismatch in Memoized Component
**Learning:** `React.memo` returns a `MemoExoticComponent`, which is not assignable to `React.FC`. Assigning it to a variable typed as `React.FC` causes a TypeScript error that `vite build` might ignore (if strict type checking is skipped).
**Action:** Do not explicitly type the variable as `React.FC` when using `React.memo`. Instead, let TypeScript infer the type or use `React.NamedExoticComponent`.
