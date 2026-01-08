## 2024-05-22 - [Accessibilty Pattern: Interactive Cards]
**Learning:** Nested interactive elements (buttons inside clickable cards) create keyboard navigation traps and confusion for screen readers if not handled carefully.
**Action:** When using clickable cards, ensure internal buttons have explicit ARIA labels and focus states. Use `group-focus-within` to reveal content that usually reveals on hover, ensuring keyboard users can access hidden actions.
