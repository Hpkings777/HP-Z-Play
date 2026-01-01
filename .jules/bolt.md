## 2024-05-23 - [Optimizing List Re-renders]
**Learning:** Using `React.memo` with granular Zustand selectors (`state.favorites.includes(id)`) drastically reduces re-renders in large lists. Without this, subscribing to the entire store (`useThemeStore()`) causes *every* item to re-render on *any* state change.
**Action:** Always verify memoization and state selection strategy for list components. Use strict equality selectors for derived boolean states.
