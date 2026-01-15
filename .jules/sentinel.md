## 2025-01-15 - [Eval Usage in Legacy Games]
**Vulnerability:** Found `eval()` used to parse JSON data in `games/chess/chess.js`.
**Learning:** Legacy codebases or imported third-party games may use outdated and insecure practices like `eval` for JSON parsing or dynamic code loading.
**Prevention:** Audit all imported game code for `eval`, `new Function`, and `innerHTML`. Use `JSON.parse` for data and refactor dynamic loading if possible.
