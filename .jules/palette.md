## 2024-03-24 - [Keyboard Focus & Content Visibility]
**Learning:** Elements that reveal content on hover (via `group-hover`) must also use `group-focus-within` to remain accessible to keyboard users. Without this, tabbing into the hidden content (e.g., buttons inside a card) may cause the container to close or remain hidden, confusing the user.
**Action:** Always pair `group-hover:class` with `group-focus-within:class` for container elements that hide/show interactive children.
