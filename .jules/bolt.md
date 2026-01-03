## 2026-01-03 - [Zustand Granular Selectors]
**Learning:** Subscribing to the entire Zustand store (e.g., `const { val } = useStore()`) triggers re-renders on *any* store update, even unrelated ones. This is critical for list items like `GameCard`.
**Action:** Always use granular selectors (e.g., `useStore(s => s.val)`) or derived selectors (e.g., `useStore(s => s.list.includes(id))`) to rely on strict equality checks and prevent unnecessary re-renders.
