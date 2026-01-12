# Sentinel Journal

## 2024-05-23 - [Missing Iframe Sandbox]
**Vulnerability:** The game iframe in `app/GamePlayer.tsx` lacked the `sandbox` attribute, granting embedded games full access to the parent origin.
**Learning:** Memory suggested controls were present ("Strictly omitted allow-same-origin"), but code inspection revealed the attribute was entirely missing. Trust code over memory.
**Prevention:** Always verify security controls in the actual codebase, especially for critical boundaries like iframes.
