## 2026-10-18 - [Iframe Sandbox Isolation]
**Vulnerability:** Third-party games in `games/` were loaded in iframes without the `sandbox` attribute, potentially allowing access to the parent window's `localStorage`, cookies, and DOM if served from the same origin.
**Learning:** Even static sites serving user-uploaded or third-party content must strictly isolate that content. Relying on "it's just a game" is insufficient.
**Prevention:** Added `sandbox="allow-scripts allow-forms allow-pointer-lock allow-popups"` to the iframe in `app/GamePlayer.tsx`. Crucially omitted `allow-same-origin` to enforce origin isolation.
