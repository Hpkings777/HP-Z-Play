## 2024-05-23 - [Optimizing List Re-renders]
**Learning:** Zustand's default `useStore()` hook subscribes to the entire state object. When using it in list items (like `GameCard`), any state change (even unrelated ones like `xp` or `stats`) triggers a re-render of every item in the list, causing massive "re-render storms."
**Action:** Always use granular selectors (e.g., `state => state.favorites.includes(id)`) combined with `React.memo` for list items to ensure they only re-render when their specific data changes.
