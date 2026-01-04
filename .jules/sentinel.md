## 2024-03-22 - [Iframe Sandbox Security]
**Vulnerability:** Game iframes were missing the `sandbox` attribute, allowing potential access to `window.parent.localStorage` via `allow-same-origin` behavior or direct access if served from same origin.
**Learning:** Even with `games/` served from the same origin, omitting `sandbox` grants full privileges. Adding `sandbox` without `allow-same-origin` places the iframe in a unique origin, blocking storage access effectively.
**Prevention:** Always apply strict `sandbox` attributes to iframes loading content, especially if that content is technically "same-origin" but logically untrusted (like 3rd party games).
