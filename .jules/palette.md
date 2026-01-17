## 2024-03-24 - Dynamic ARIA Labels in Lists
**Learning:** In list views where multiple items have identical primary action buttons (like "Play"), static ARIA labels (e.g., "Play") are insufficient for screen reader context.
**Action:** Always include the item's unique identifier (e.g., title) in the ARIA label (e.g., "Play Chess") to allow users to distinguish between actions in a list.
