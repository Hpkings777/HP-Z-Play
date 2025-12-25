## 2024-05-23 - [Prevent Accidental Secret Injection in Client Bundles]
**Vulnerability:** Use of `define` in `vite.config.ts` to inject `process.env` variables without filtering can expose server-side secrets (like API keys) to the client-side code. Even if currently unused, they become part of the build artifact.
**Learning:** Vite's `define` feature performs static replacement. Injecting `process.env.SOME_KEY` with a value from the build environment hardcodes that secret into the public JavaScript bundle.
**Prevention:** Avoid mapping `process.env` keys in `vite.config.ts` unless they are explicitly intended for public client consumption (e.g., prefixed with `VITE_` or confirmed public). Review `vite.config.ts` `define` blocks during security audits.
