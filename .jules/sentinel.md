## 2024-05-23 - [Iframe Sandbox Strategy]
**Vulnerability:** Embedded games in iframes lacked the `sandbox` attribute, potentially allowing malicious games to access the parent window or perform frame busting.
**Learning:** While `allow-scripts` + `allow-same-origin` weakens the sandbox (allowing the iframe to remove its own sandbox), it is often necessary for complex HTML5 games. However, omitting `allow-top-navigation` is a crucial defense-in-depth measure to prevent the game from redirecting the user away from the platform.
**Prevention:** Always apply `sandbox` with the minimum necessary permissions. Explicitly document why `allow-same-origin` is needed and ensure `allow-top-navigation` remains disabled unless absolutely required and user-initiated.
