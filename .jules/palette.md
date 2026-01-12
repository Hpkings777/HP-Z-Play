## 2024-05-23 - [Accessible Icon-Only Buttons]
**Learning:**
Icon-only buttons (like "Favorite") often lack accessible names, making them invisible to screen readers. Additionally, toggle buttons need `aria-pressed` to communicate state.
Also observed that interactive elements inside cards (like "Play") should trigger card hover effects on focus to ensure the interface is predictable for keyboard users (`group-focus-within`).

**Action:**
Always verify icon-only buttons have `aria-label` and `title`. Use `aria-pressed` for toggles. Add `group-focus-within` to parent containers where `group-hover` reveals or moves content.
