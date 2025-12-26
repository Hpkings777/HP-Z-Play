## 2024-05-23 - [Optimizing Component Re-renders with Granular Selectors]
**Learning:** Using `useStore(state => state.value)` causes the component to subscribe to the *return value* of the selector. By default, Zustand uses strict equality (`===`) to check if the return value changed.
**Action:** Always use granular selectors for boolean checks (e.g., `state => state.favorites.includes(id)`) instead of subscribing to the whole list (`const { favorites } = useStore()`), especially in list components like `GameCard`.
