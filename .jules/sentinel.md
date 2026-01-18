## 2026-01-18 - Legacy Game Eval Usage
**Vulnerability:** Found `eval()` being used to parse JSON data (`meshes/board.json`) in the legacy Chess game implementation (`games/chess/chess.js`).
**Learning:** Legacy code often predates modern JSON standards or was written without security context, using `eval` as a quick parser. The codebase also uses `eval` (via `new Function`) for a custom module loading system, which complicates full remediation.
**Prevention:** Always use `JSON.parse()` for parsing JSON. For legacy code imports, a migration to standard ES modules or a bundler is required to eliminate dynamic code execution.
