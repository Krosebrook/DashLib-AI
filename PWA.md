# PWA Implementation Details (v3.8)

## Installability
- **Manifest**: Located at `/manifest.json`.
- **Display Mode**: `standalone` for a native-app feel.
- **Start URL**: `./index.html`.
- **Icons**: Utilizes high-resolution maskable icons for cross-platform compatibility.
- **Custom Prompt**: Implements a non-intrusive "Add to Home Screen" prompt triggered by user engagement.

## Caching Strategy (sw.js)
We employ a robust **Stale-While-Revalidate (SWR)** strategy:
1. **Static Assets**: Core app shell (HTML, TSX, Manifest) is cached on install.
2. **External Dependencies**: Imports from `esm.sh` and Google Fonts are cached dynamically upon first fetch.
3. **Navigation Fallback**: All navigation requests are rerouted to `/index.html` via the Service Worker to support SPA routing in offline mode.
4. **Gemini API**: Explicitly excluded from caching to ensure fresh AI responses and security.

## Offline Behavior
- **Registry Access**: The dashboard template library remains fully browsable offline.
- **Interactive Sandboxes**: The Security and A/B Model sandboxes are functional offline as they use local simulation logic.
- **AI Features**: Magic Generator and AI Advisor require an active internet connection for LLM inference.

## Update Strategy
The Service Worker uses `skipWaiting()` and `clients.claim()` to ensure that updates (e.g., v3.8) are applied immediately when detected, minimizing version fragmentation.

---
© 2026 DashLib AI PWA Hub.
