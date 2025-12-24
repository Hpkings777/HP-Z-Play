## 2025-12-24 - [Missing Iframe Sandbox]
**Vulnerability:** The game player iframe lacked the `sandbox` attribute, giving embedded games full access to the parent window context.
**Learning:** Even trusted internal content (like games in `games/`) should be sandboxed to prevent accidental or malicious access to user data (localStorage, cookies) and to enforce least privilege.
**Prevention:** Always apply the `sandbox` attribute to iframes loading content, especially third-party or user-generated content, with the minimum required permissions.
