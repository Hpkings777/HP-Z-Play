## 2025-05-23 - [Missing Game Sandbox]
**Vulnerability:** Game iframe lacked `sandbox` attribute.
**Learning:** Even trusted/local content should be sandboxed (Defense in Depth). Documentation/Memory said it was there, but code didn't match.
**Prevention:** Verify security controls in code, don't rely on documentation/memory. Use linter rules to enforce `sandbox` on `iframe`.
