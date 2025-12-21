## 2025-12-21 - [Zustand Granular Selectors & List Memoization]
**Learning:** Subscribing to the entire Zustand store in list items (`useStore()`) causes O(N) re-renders for every single state update.
**Action:** Always use granular selectors (e.g., `useStore(s => s.favorites.includes(id))`) inside list components and wrap them in `React.memo` to ensure O(1) updates.
