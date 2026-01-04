## 2024-05-22 - [Keyboard Focus in Complex Cards]
**Learning:** Complex interactive cards (nested buttons, hover reveals) often leave keyboard users behind. Using `group-focus-within` alongside `group-hover` ensures that content hidden by default (like the "Play" button/info box) becomes visible when a user tabs into any element within the card, matching the mouse experience.
**Action:** When using `group-hover` to reveal content, always pair it with `group-focus-within` to ensure keyboard accessibility.
