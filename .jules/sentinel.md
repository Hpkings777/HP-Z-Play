## 2024-01-14 - [Game Sandbox Isolation]
**Vulnerability:** Embedded games were loaded in an `iframe` without the `sandbox` attribute. Since games are served from the same origin (path-based routing), this allowed them full access to the parent application's `localStorage`, cookies, and DOM.
**Learning:** Even "local" content requires sandboxing if it's not fully trusted or if we want to enforce isolation. Same-origin `iframes` are transparent boundaries by default.
**Prevention:** Always use the `sandbox` attribute for `iframes` loading untrusted or semi-trusted content. Omit `allow-same-origin` to treat the content as a unique origin, blocking access to shared storage and DOM.
