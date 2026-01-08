## 2024-05-23 - [Missing Iframe Sandbox in GamePlayer]
**Vulnerability:** The game player iframe lacked the `sandbox` attribute, allowing embedded games (served from the same origin) to potentially access `localStorage`, cookies, and other sensitive data.
**Learning:** Even when serving trusted content, the Principle of Least Privilege should apply. Same-origin iframes have full access by default.
**Prevention:** Always apply `sandbox` attribute to iframes displaying third-party or potentially untrusted content. Explicitly define allowed permissions and avoid `allow-same-origin` unless absolutely necessary.
