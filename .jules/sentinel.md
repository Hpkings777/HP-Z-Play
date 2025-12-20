## 2024-05-23 - [Missing Iframe Sandbox]
**Vulnerability:** The game iframe in `app/GamePlayer.tsx` lacked the `sandbox` attribute, despite documentation/memory suggesting it was present. This allows embedded games full access to the browser environment (e.g., top-level navigation, plugins).
**Learning:** Documentation and memory can drift from the actual codebase. Always verify security controls in the code itself. "Trust but verify".
**Prevention:** Use automated checks or linting rules (like `react/iframe-missing-sandbox`) to enforce the presence of security attributes on sensitive elements.
