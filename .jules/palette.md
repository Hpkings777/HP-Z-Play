## 2024-05-23 - [Dynamic ARIA Labels for Toggle Buttons]
**Learning:** Toggle buttons (like Favorite in `GameCard` and `ThemeToggle`) use dynamic `aria-label` and `title` attributes (e.g., 'Add to favorites' vs 'Remove from favorites', 'Switch to dark mode') to convey state to assistive technology.
**Action:** Always check if a button changes state and update its `aria-label` dynamically to describe the *action* that will happen, not just the current state. Use `title` for mouse users.
