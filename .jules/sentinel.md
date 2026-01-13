## 2025-10-26 - Missing Sandbox on Game Iframes
**Vulnerability:** The `iframe` used in `app/GamePlayer.tsx` to load games lacked the `sandbox` attribute.
**Learning:** Even when games are hosted locally (same origin), failing to sandbox them gives them full access to the parent application's DOM, `localStorage`, and session cookies. This violates the principle of least privilege and isolation.
**Prevention:** Always apply `sandbox="allow-scripts allow-forms allow-popups allow-pointer-lock"` to iframes loading third-party or untrusted content. Strictly omit `allow-same-origin` unless absolutely necessary and the content is fully trusted.
