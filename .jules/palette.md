## 2024-05-24 - [Dynamic Aria Labels in React]
**Learning:** Toggle buttons (like Favorite in `GameCard`) need dynamic `aria-label` and `title` attributes (e.g., 'Add to favorites' vs 'Remove from favorites') to properly convey state to assistive technology users, rather than a static label.
**Action:** Always check if a button's action changes based on state, and update accessibility attributes accordingly.
