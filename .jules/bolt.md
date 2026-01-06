## 2024-05-23 - [Stale Memory Discrepancy]
**Learning:** The memory stated that `GameCard` was already optimized with granular selectors and `React.memo`, but the actual code revealed it was subscribing to the entire store without memoization. This suggests a regression or that the memory described an intended state rather than the actual state.
**Action:** Always verify "facts" from memory against the actual codebase before assuming optimization status. Correct code to match the intended optimized state.
