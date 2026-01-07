# Sentinel Journal

## 2025-02-17 - Unsafe Eval in Legacy Game Code
**Vulnerability:** Found `eval()` usage in `games/chess/chess.js` to parse JSON data. This allows arbitrary code execution if the source file is compromised.
**Learning:** Legacy code or third-party games often contain outdated practices like `eval()` for JSON parsing, which was common before `JSON.parse` became standard.
**Prevention:** Always audit external or legacy scripts for `eval()`, `document.write()`, and `innerHTML`. Use `JSON.parse()` for data parsing.
