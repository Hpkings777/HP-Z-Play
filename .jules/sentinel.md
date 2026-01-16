## 2024-05-23 - [Iframe Sandbox Missing]
**Vulnerability:** The game iframe in `GamePlayer.tsx` was missing the `sandbox` attribute, allowing embedded games full access to the parent window's DOM and same-origin resources like `localStorage`.
**Learning:** Even if the intent is to trust embedded content (e.g. "open source"), relying on implicit trust is dangerous. Embedded content should always be least-privilege.
**Prevention:** Always apply `sandbox` attributes to iframes hosting dynamic content, explicitly listing only the permissions required (e.g., `allow-scripts`). Avoid `allow-same-origin` unless strictly necessary for functionality.
