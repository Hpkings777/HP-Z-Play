## 2025-12-15 - [Missing Iframe Sandbox]
**Vulnerability:** The game player component (`GamePlayer.tsx`) embedded games using an `iframe` without a `sandbox` attribute. Since games are served from the same origin, this allowed them full access to the top-level window, including the ability to redirect the user to malicious sites (`window.top.location = ...`).
**Learning:** Even "internal" or "static" content, if complex (like 3rd party games), should be treated with least privilege. Trusting content just because it's hosted on the same domain can be dangerous if that content is sourced from third parties.
**Prevention:** Always apply the `sandbox` attribute to iframes embedding content, even (and especially) when it's same-origin, to restrict capabilities like top-level navigation.
