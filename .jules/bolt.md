## 2024-05-23 - [Zustand Granular Selectors]
**Learning:** Selecting the entire state in a list component (e.g. `const { favorites } = useThemeStore()`) causes *every* item to re-render when *any* part of the state changes, or when the selected slice changes reference.
**Action:** Always use granular selectors (e.g. `useStore(s => s.favorites.includes(id))`) inside components rendered in a list to leverage strict equality checks and prevent cascading re-renders. Wrap list items in `React.memo` to ensure prop changes are also checked.
