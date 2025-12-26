## 2025-12-26 - [Unsandboxed Game Iframes]
**Vulnerability:** The game player `iframe` lacked the `sandbox` attribute, giving external or internal game code full access to the browser session (top-level navigation, etc.).
**Learning:** Even "trusted" internal games should be sandboxed to least privilege to prevent accidental or malicious actions (like frame busting or stealing focus in unexpected ways). The memory implied it was sandboxed, but the code was not, highlighting the importance of verifying documentation against implementation.
**Prevention:** Always apply `sandbox` to iframes loading content, starting with strict defaults and adding capabilities (allow-scripts, allow-same-origin) only as needed.
