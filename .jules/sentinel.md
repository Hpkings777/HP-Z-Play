## 2025-05-17 - [Missing Iframe Sandbox]
**Vulnerability:** The game player component used an `iframe` to load third-party game content without the `sandbox` attribute.
**Learning:** Even when documentation or memory suggests a security control exists, it must be verified in the code. Regressions or initial oversights can leave critical paths exposed.
**Prevention:** Always verify security assumptions by inspecting the code source of truth. Use automated tests to assert the presence of security attributes on critical elements like iframes.
