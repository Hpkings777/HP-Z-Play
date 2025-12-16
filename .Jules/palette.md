# Palette's Journal

## 2025-05-21 - Accessible Icon Buttons
**Learning:** Icon-only buttons (like Favorites or Back) are invisible to screen readers without explicit labels, creating a frustrating "mystery meat" navigation experience for assistive technology users.
**Action:** Always wrap icon-only buttons with `aria-label` describing the action, and consider adding a `title` tooltip for mouse users to reinforce the meaning.
