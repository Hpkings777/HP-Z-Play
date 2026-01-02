## 2024-05-23 - [Icon-Only Buttons & Keyboard Focus]
**Learning:** Icon-only buttons (like 'Favorite') must have dynamic `aria-label` attributes to convey state changes to screen readers. Additionally, hover-based visual reveals (like card info boxes) are inaccessible to keyboard users unless paralleled with `group-focus-within` or similar focus-based selectors.
**Action:** Always pair `aria-label` with state logic for toggle buttons, and systematically add `group-focus-within` variants whenever `group-hover` is used for content visibility.
