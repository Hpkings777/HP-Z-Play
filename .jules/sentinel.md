## 2025-05-23 - Insecure Dev Server Configuration
**Vulnerability:** The Vite development server was configured with `server.fs.allow: ['..']`. This allowed the server to serve files from the parent directory of the project root. Since `host: '0.0.0.0'` was also set, this exposed the parent directory's contents to the network.
**Learning:** Default configurations or copied configurations can introduce risks. Always scope file access permissions to the minimum necessary directory (Project Root).
**Prevention:** Restrict file serving scope. Use `server.fs.allow: ['.']` or similar to limit access to the repository root.
