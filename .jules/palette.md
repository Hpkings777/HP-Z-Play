## 2025-10-26 - [Interactive Focus Visibility]
**Learning:**
Simply relying on `focus-visible:ring` is insufficient for components that reveal content on hover (like card info boxes). Keyboard users need `group-focus-within` on the container to trigger the same reveal animations as `group-hover`. Without this, users tab into invisible or obscured buttons, creating a confusing experience.

**Action:**
When using `group-hover` for revealing content, always pair it with `group-focus-within` on the parent container to ensure keyboard users can perceive and interact with the revealed content.
