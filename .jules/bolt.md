## 2026-01-17 - Artificial Delays are UX Killers
**Learning:** The `Home` component had a 1200ms `setTimeout` purely to show a loading spinner, despite data being available synchronously. This degraded the user experience significantly for no technical reason.
**Action:** Always verify if a "loading" state is actually waiting for something. If data is local/synchronous, render immediately. Speed is a feature.
