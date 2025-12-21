# Sentinel's Journal

## 2024-05-22 - Missing Iframe Sandbox
**Vulnerability:** Game iframe lacks `sandbox` attribute
**Learning:** Even when documentation says features are sandboxed, code must be verified. The memory explicitly stated games were sandboxed, but the code in `GamePlayer.tsx` showed otherwise.
**Prevention:** Always verify security claims in documentation against actual implementation. Use automated tests to check for security attributes.
