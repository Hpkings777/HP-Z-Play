## 2025-05-02 - Legacy Game Eval Usage
**Vulnerability:** `games/chess/chess.js` used `eval()` to parse JSON data fetched via XHR.
**Learning:** Legacy code copied into the project (like HTML5 games) often contains outdated and insecure patterns that bypass modern build pipelines because they are treated as static assets.
**Prevention:** Audit third-party or legacy code modules for `eval()`, `new Function()`, and `document.write()`. Use `JSON.parse()` for data.
