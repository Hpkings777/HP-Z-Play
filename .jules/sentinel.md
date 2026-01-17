## 2026-01-17 - Game Isolation Strategy
**Vulnerability:** Legacy games with insecure patterns (XHR, eval) running in same-origin iframes could access application storage and auth tokens.
**Learning:** Omission of `allow-same-origin` in sandbox attribute is critical for isolating untrusted content served from the same domain, even if it breaks persistence features (localStorage) within the iframe.
**Prevention:** Always sandbox iframes embedding third-party or legacy content, explicitly reviewing the need for `allow-same-origin`.
