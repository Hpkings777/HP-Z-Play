## 2024-05-23 - [Icon-Only Buttons]
**Learning:** Icon-only buttons (like Favorites/Bell) often lack accessible names, confusing screen reader users. They also miss tooltips for mouse users.
**Action:** Always add `aria-label` and `title` to icon-only buttons. The `title` provides a native tooltip and `aria-label` ensures screen reader support.
