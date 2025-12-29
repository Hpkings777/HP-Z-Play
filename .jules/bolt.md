## 2024-05-23 - [Preventing List Re-renders with Zustand Selectors]
**Learning:** Components subscribing to the entire Zustand store (e.g., `const { val } = useStore()`) re-render on *any* store update. For large lists like `GameCard`s, this causes massive unnecessary re-renders when interacting with unrelated state (like stats or achievements).
**Action:** Always use granular selectors (e.g., `useStore(s => s.val)`) and `React.memo` for list items to ensure they only re-render when their specific data changes.
