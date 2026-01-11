## 2024-05-23 - [Keyboard Accessibility for Hover Interactions]
**Learning:** Elements that use `group-hover` to reveal content (like cards) must also use `group-focus-within`. Without it, keyboard users who tab into the card can interact with hidden elements but can't see them.
**Action:** Always pair `group-hover:class` with `group-focus-within:class` for visibility/layout changes.
