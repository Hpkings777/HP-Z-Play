# Palette's Journal

## 2025-05-23 - [Fake Loaders Kill Delight]
**Learning:** The "performance optimization" subtitle was contradicted by a 1200ms `setTimeout` artificial loader. Users perceive "fast" as "instant", not "cool spinner". Removing the fake loader improved LCP by 1.2s and made the app feel snappier.
**Action:** Always check `useEffect` in "loading" states to see if the delay is artificial. Real performance is better than perceived "loading" polish.

## 2025-05-23 - [Nested Interactive Focus]
**Learning:** `group-hover` works great for mouse users to reveal content, but keyboard users are left in the dark. Using `group-focus-within` on the parent container allows the content to reveal when a child (like the "Play" button) receives focus, maintaining parity between mouse and keyboard experiences.
**Action:** When using `group-hover` to reveal interactive elements, always pair it with `group-focus-within`.
