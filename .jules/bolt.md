## 2026-01-16 - [Global Store Subscription in List Components]
**Learning:** `useThemeStore` contains unrelated data (theme, stats, favorites). Components like `GameCard` subscribing to it without selectors re-render on *any* store change (e.g. theme toggle), causing O(n) re-renders for lists.
**Action:** Always use `useShallow` or granular selectors when subscribing to the global store in list items. Wrap list items in `React.memo`.
